import type { Handler, HandlerEvent } from "@netlify/functions";
import Razorpay from "razorpay";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

// Fail fast if keys are not configured
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  throw new Error("RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET environment variables are required");
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  "https://take-off-trampoline.netlify.app",
  "http://localhost:8888",
  "http://localhost:8080",
];

interface OrderRequestBody {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  numberOfPersons: number;
  visitDate: string;       // "YYYY-MM-DD"
  pricePerPerson: number;  // Base price
  couponCode?: string;     // Optional coupon code
}

// ── Holiday configuration (keep in sync with src/lib/pricing.ts) ─────
const holidayConfig: Record<number, string[]> = {
  2026: [
    "2026-04-03",
    "2026-04-14",
    "2026-05-28",
    "2026-06-26",
    "2026-08-28",
    "2026-09-04",
    "2026-10-02",
    "2026-10-20",
    "2026-12-25",
    "2026-12-31",
  ],
};

const holidaySet = new Set(Object.values(holidayConfig).flat());

const getExpectedPricePerPerson = (dateStr: string): number => {
  if (holidaySet.has(dateStr)) return 1000;
  const [yyyy, mm, dd] = dateStr.split("-").map(Number);
  const date = new Date(yyyy, mm - 1, dd);
  const day = date.getDay(); // 0 = Sun, 6 = Sat
  return day === 0 || day === 6 ? 1000 : 800;
};

const getDayType = (dateStr: string): string => {
  if (holidaySet.has(dateStr)) return "Holiday";
  const [yyyy, mm, dd] = dateStr.split("-").map(Number);
  const date = new Date(yyyy, mm - 1, dd);
  const day = date.getDay();
  return day === 0 || day === 6 ? "Weekend" : "Weekday";
};

// --- Google Sheets Helper ---
const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
let doc: GoogleSpreadsheet | null = null;

const getDoc = async () => {
  if (!doc) {
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !privateKey || !process.env.GOOGLE_SHEET_ID) {
      throw new Error("Google Sheets environment variables are missing.");
    }
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
  }
  return doc;
};

const validateCoupon = async (code: string, baseTotal: number, numberOfPersons: number): Promise<{ isValid: boolean; discountAmount: number; finalTotal: number }> => {
  try {
    const document = await getDoc();
    await document.loadInfo();
    const sheet = document.sheetsByTitle["Coupons"];
    if (!sheet) return { isValid: false, discountAmount: 0, finalTotal: baseTotal };

    const rows = await sheet.getRows();
    const matchingRow = rows.find(row => row.get("Code")?.trim().toUpperCase() === code.trim().toUpperCase());

    if (!matchingRow) return { isValid: false, discountAmount: 0, finalTotal: baseTotal };

    const isActive = matchingRow.get("IsActive")?.trim().toLowerCase() === "yes";
    if (!isActive) return { isValid: false, discountAmount: 0, finalTotal: baseTotal };

    const type = matchingRow.get("Type")?.trim().toLowerCase(); // "percentage" or "flat"
    const amount = parseFloat(matchingRow.get("Amount") || "0");

    let finalTotal = baseTotal;
    let discountAmount = 0;

    if (type === "percentage") {
      discountAmount = (baseTotal * amount) / 100;
      finalTotal = baseTotal - discountAmount;
    } else if (type === "flat") {
      discountAmount = amount;
      finalTotal = baseTotal - discountAmount;
    } else if (type === "fixed") {
      // Amount represents the new price per person
      finalTotal = amount * numberOfPersons;
      discountAmount = baseTotal - finalTotal;
    }

    if (finalTotal < 0) finalTotal = 0;

    return { isValid: true, discountAmount, finalTotal };

  } catch (err) {
    console.error("Error validating coupon:", err);
    return { isValid: false, discountAmount: 0, finalTotal: baseTotal };
  }
};

const handler: Handler = async (event: HandlerEvent) => {
  const requestOrigin = event.headers.origin || "";
  const allowedOrigin = ALLOWED_ORIGINS.includes(requestOrigin)
    ? requestOrigin
    : ALLOWED_ORIGINS[0];

  const headers = {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  try {
    if (!event.body) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Request body is required" }) };
    }

    const {
      customerName,
      customerEmail,
      customerPhone,
      numberOfPersons,
      visitDate,
      couponCode,
    }: OrderRequestBody = JSON.parse(event.body);

    if (!customerName || !customerEmail || !numberOfPersons) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Missing required fields" }) };
    }

    if (numberOfPersons < 1 || numberOfPersons > 20) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Number of persons must be between 1 and 20" }) };
    }

    if (!visitDate || !/^\d{4}-\d{2}-\d{2}$/.test(visitDate)) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "A valid visit date is required (YYYY-MM-DD)" }) };
    }

    const expectedPrice = getExpectedPricePerPerson(visitDate);
    const baseTotal = numberOfPersons * expectedPrice;
    
    // Apply Coupon Logic
    let finalTotal = baseTotal;
    let appliedCoupon = null;

    if (couponCode) {
      const couponResult = await validateCoupon(couponCode, baseTotal, numberOfPersons);
      if (couponResult.isValid) {
        finalTotal = couponResult.finalTotal;
        appliedCoupon = couponCode;
      } else {
        // Reject the order if they sent a coupon code but it was invalid (prevents checkout bypass)
        return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid or expired coupon code" }) };
      }
    }

    const totalAmountPaise = Math.round(finalTotal * 100);

    const order = await razorpay.orders.create({
      amount: totalAmountPaise,
      currency: "INR",
      receipt: `takeoff_${Date.now()}`,
      notes: {
        customerName,
        customerEmail,
        customerPhone,
        numberOfPersons: numberOfPersons.toString(),
        visitDate,
        basePricePerPerson: expectedPrice.toString(),
        dayType: getDayType(visitDate),
        couponCode: appliedCoupon || "None",
        discountAmount: couponCode ? (baseTotal - finalTotal).toString() : "0"
      },
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        order_id: order.id,
        amount: order.amount,
        currency: order.currency,
        key_id: process.env.RAZORPAY_KEY_ID,
      }),
    };
  } catch (error: unknown) {
    console.error("Razorpay order creation error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Unable to create order. Please try again." }),
    };
  }
};

export { handler };
