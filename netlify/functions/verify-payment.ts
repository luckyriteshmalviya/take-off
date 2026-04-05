import type { Handler, HandlerEvent } from "@netlify/functions";
import crypto from "crypto";

// Fail fast if key secret is not configured
if (!process.env.RAZORPAY_KEY_SECRET) {
  throw new Error("RAZORPAY_KEY_SECRET environment variable is required");
}

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  "https://take-off-trampoline.netlify.app",
  "http://localhost:8888",
  "http://localhost:8080",
];

interface VerifyRequestBody {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

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
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    }: VerifyRequestBody = JSON.parse(event.body);

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Missing payment verification fields" }),
      };
    }

    // Generate expected signature using HMAC SHA256
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    // Compare signatures
    const isValid = generatedSignature === razorpay_signature;

    if (!isValid) {
      console.error("Payment verification failed: signature mismatch");
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          verified: false,
          error: "Payment verification failed",
        }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        verified: true,
        payment_id: razorpay_payment_id,
        order_id: razorpay_order_id,
      }),
    };
  } catch (error: unknown) {
    console.error("Payment verification error:", error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Unable to verify payment. Please contact support.",
      }),
    };
  }
};

export { handler };
