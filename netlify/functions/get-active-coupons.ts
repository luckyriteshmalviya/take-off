import type { Handler, HandlerEvent } from "@netlify/functions";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

let doc: GoogleSpreadsheet | null = null;

// Simple in-memory cache (60 seconds)
let cachedCoupons: ActiveCoupon[] = [];
let lastFetchTime = 0;
const CACHE_DURATION_MS = 60 * 1000;

interface ActiveCoupon {
  code: string;
  type: string;
  amount: number;
  label: string;
}

const ALLOWED_ORIGINS = [
  "https://take-off-trampoline.netlify.app",
  "http://localhost:8888",
  "http://localhost:8080",
];

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

function buildLabel(type: string, amount: number): string {
  if (type === "percentage") return `${amount}% OFF`;
  if (type === "fixed") return `₹${amount}/person`;
  if (type === "flat") return `₹${amount} OFF`;
  return `${amount} OFF`;
}

const handler: Handler = async (event: HandlerEvent) => {
  const requestOrigin = event.headers.origin || "";
  const allowedOrigin = ALLOWED_ORIGINS.includes(requestOrigin)
    ? requestOrigin
    : ALLOWED_ORIGINS[0];

  const headers = {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  try {
    const now = Date.now();
    if (now - lastFetchTime < CACHE_DURATION_MS && cachedCoupons.length > 0) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ coupons: cachedCoupons }),
      };
    }

    const document = await getDoc();
    await document.loadInfo();
    const sheet = document.sheetsByTitle["Coupons"];

    if (!sheet) {
      throw new Error("Sheet named 'Coupons' not found.");
    }

    const rows = await sheet.getRows();
    const activeCoupons: ActiveCoupon[] = [];

    for (const row of rows) {
      const isActive = row.get("IsActive")?.trim().toLowerCase() === "yes";
      if (!isActive) continue;

      const code = row.get("Code")?.trim();
      const type = row.get("Type")?.trim().toLowerCase();
      const amount = parseFloat(row.get("Amount") || "0");

      if (code && type && amount > 0) {
        activeCoupons.push({
          code,
          type,
          amount,
          label: buildLabel(type, amount),
        });
      }
    }

    cachedCoupons = activeCoupons;
    lastFetchTime = now;

    return {
      statusCode: 200,
      headers: {
        ...headers,
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
      },
      body: JSON.stringify({ coupons: cachedCoupons }),
    };
  } catch (error: any) {
    console.error("Error fetching active coupons:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Failed to load coupons", details: error.message }),
    };
  }
};

export { handler };
