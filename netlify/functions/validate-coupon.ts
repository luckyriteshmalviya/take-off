import type { Handler, HandlerEvent } from "@netlify/functions";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

let doc: GoogleSpreadsheet | null = null;

// Allowed origins for CORS
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
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Request body required" }) };
    }

    const { code } = JSON.parse(event.body);

    if (!code) {
      return { statusCode: 400, headers, body: JSON.stringify({ isValid: false }) };
    }

    const document = await getDoc();
    await document.loadInfo();
    const sheet = document.sheetsByTitle["Coupons"];
    
    if (!sheet) {
      throw new Error("Sheet named 'Coupons' not found.");
    }

    const rows = await sheet.getRows();
    const matchingRow = rows.find(row => row.get("Code")?.trim().toUpperCase() === code.trim().toUpperCase());

    if (!matchingRow) {
      return { statusCode: 200, headers, body: JSON.stringify({ isValid: false }) };
    }

    const isActive = matchingRow.get("IsActive")?.trim().toLowerCase() === "yes";
    if (!isActive) {
      return { statusCode: 200, headers, body: JSON.stringify({ isValid: false }) };
    }

    const type = matchingRow.get("Type")?.trim().toLowerCase();
    const amount = parseFloat(matchingRow.get("Amount") || "0");

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        isValid: true,
        type,
        amount
      }),
    };
  } catch (error: any) {
    console.error("Error validating coupon:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Failed to validate coupon" }),
    };
  }
};

export { handler };
