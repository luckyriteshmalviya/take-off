import type { Handler, HandlerEvent } from "@netlify/functions";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

// Format private key correctly (replace literal \n with actual newlines)
const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

let doc: GoogleSpreadsheet | null = null;
let lastFetchTime = 0;
let cachedBanners: string[] = [];

// Cache duration: 1 minute
const CACHE_DURATION_MS = 60 * 1000;

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
    "Access-Control-Allow-Methods": "GET, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  try {
    const now = Date.now();
    // Return cached banners if within cache duration
    if (now - lastFetchTime < CACHE_DURATION_MS && cachedBanners.length > 0) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ banners: cachedBanners }),
      };
    }

    const document = await getDoc();
    await document.loadInfo();
    
    // Find the sheet by title
    const sheet = document.sheetsByTitle["Coupons"];
    if (!sheet) {
      throw new Error("Sheet named 'Coupons' not found.");
    }

    const rows = await sheet.getRows();
    
    const activeBanners: string[] = [];
    
    for (const row of rows) {
      const isActive = row.get("IsActive")?.trim().toLowerCase() === "yes";
      const showBanner = row.get("ShowBanner")?.trim().toLowerCase() === "yes";
      const message = row.get("BannerMessage")?.trim();
      
      if (isActive && showBanner && message) {
        activeBanners.push(message);
      }
    }

    // Update cache
    cachedBanners = activeBanners;
    lastFetchTime = now;

    return {
      statusCode: 200,
      headers: {
        ...headers,
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
      },
      body: JSON.stringify({ banners: cachedBanners }),
    };

  } catch (error: any) {
    console.error("Error fetching active offers:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Failed to load active offers", details: error.message }),
    };
  }
};

export { handler };
