import { google } from "@ai-sdk/google";

// Use Google Gemini as the AI provider (free tier)
// Set GOOGLE_GENERATIVE_AI_API_KEY in your .env.local
export const aiModel = google("gemini-2.0-flash");
export const aiVisionModel = google("gemini-2.0-flash");
