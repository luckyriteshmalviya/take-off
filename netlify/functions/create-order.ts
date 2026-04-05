import type { Handler, HandlerEvent } from "@netlify/functions";
import Razorpay from "razorpay";

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
  pricePerPerson: number;  // 800 (weekday) or 1000 (weekend/holiday) — server re-validates this
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
  // 2027: ["2027-01-01", "2027-12-25"]
};

const holidaySet = new Set(Object.values(holidayConfig).flat());

/**
 * Server-side price validation.
 * Saturday (6), Sunday (0), or holidays cost ₹1000/person; weekdays cost ₹800/person.
 */
const getExpectedPricePerPerson = (dateStr: string): number => {
  if (holidaySet.has(dateStr)) return 1000;
  const [yyyy, mm, dd] = dateStr.split("-").map(Number);
  const date = new Date(yyyy, mm - 1, dd);
  const day = date.getDay(); // 0 = Sun, 6 = Sat
  return day === 0 || day === 6 ? 1000 : 800;
};

/** Returns "Holiday" | "Weekend" | "Weekday" */
const getDayType = (dateStr: string): string => {
  if (holidaySet.has(dateStr)) return "Holiday";
  const [yyyy, mm, dd] = dateStr.split("-").map(Number);
  const date = new Date(yyyy, mm - 1, dd);
  const day = date.getDay();
  return day === 0 || day === 6 ? "Weekend" : "Weekday";
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
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    if (!event.body) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Request body is required" }),
      };
    }

    const {
      customerName,
      customerEmail,
      customerPhone,
      numberOfPersons,
      visitDate,
    }: OrderRequestBody = JSON.parse(event.body);

    // Validation
    if (!customerName || !customerEmail || !numberOfPersons) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Missing required fields" }),
      };
    }

    if (numberOfPersons < 1 || numberOfPersons > 20) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: "Number of persons must be between 1 and 20",
        }),
      };
    }

    if (!visitDate || !/^\d{4}-\d{2}-\d{2}$/.test(visitDate)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "A valid visit date is required (YYYY-MM-DD)" }),
      };
    }

    // Server-side price determination — prevents client-side price manipulation
    const expectedPrice = getExpectedPricePerPerson(visitDate);
    const pricePerPersonPaise = expectedPrice * 100; // convert ₹ to paise
    const totalAmount = numberOfPersons * pricePerPersonPaise;

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: totalAmount,
      currency: "INR",
      receipt: `takeoff_${Date.now()}`,
      notes: {
        customerName,
        customerEmail,
        customerPhone,
        numberOfPersons: numberOfPersons.toString(),
        visitDate,
        pricePerPerson: expectedPrice.toString(),
        dayType: getDayType(visitDate),
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
      body: JSON.stringify({
        error: "Unable to create order. Please try again.",
      }),
    };
  }
};

export { handler };
