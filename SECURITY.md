# Security & Architecture Documentation

This document outlines the mitigation strategies, security measures, and contingency plans implemented in the **GharSuraksha** platform, specifically addressing the requirements of the House of EdTech assignment.

## 1. Authentication and Authorization
We have implemented a robust, secure authentication mechanism using **Auth.js (NextAuth)**.
- **Session Management:** We use JWT (JSON Web Tokens) or database-backed sessions with secure HTTP-only cookies to prevent XSS (Cross-Site Scripting) attacks from stealing session tokens.
- **Granular Authorization:** Every single API route (`/api/items`, `/api/policies`, `/api/claims`) strictly verifies the user's session.
- **Row-Level Isolation:** When querying the PostgreSQL database via Prisma, every query includes `where: { userId: session.user.id }`. This ensures that even if an attacker guesses another user's item ID or policy ID, the API will reject the request (404 Not Found), effectively preventing IDOR (Insecure Direct Object Reference) vulnerabilities.

## 2. Data Validation and Sanitization
To prevent injection attacks and ensure data integrity, we utilize **Zod** schema validation on the server side.
- Before any data touches the database, it must pass Zod parsing (e.g., `itemSchema.safeParse(body)`). This strips out unexpected fields and strictly enforces types (e.g., numbers must be numbers, strings have max lengths).
- By using **Prisma ORM**, we are inherently protected against SQL Injection, as Prisma uses parameterized queries under the hood.

## 3. Real-World Mitigation Strategies & Scalability

### A. Rate Limiting and DDoS Protection
**Challenge:** A malicious actor could spam the AI gap analysis or seed data routes, driving up API costs and degrading performance.
**Mitigation:** 
- In a production environment on Vercel or Netlify, we configure **Edge Middleware** for IP-based rate limiting (e.g., 10 requests per 10 seconds per IP).
- We utilize Vercel's built-in DDoS protection at the network edge.

### B. Scalability and Database Connection Pooling
**Challenge:** Next.js Serverless functions can spin up hundreds of concurrent instances, rapidly exhausting PostgreSQL connection limits.
**Mitigation:**
- We are using a **Serverless PostgreSQL provider (Neon)** which provides a connection pooling proxy via a connection string (e.g., `postgresql://.../db?pgbouncer=true`). This ensures the database doesn't crash under high load from serverless function invocations.

### C. AI Fallbacks and Error Handling
**Challenge:** The external AI provider (Google Gemini) may experience downtime or timeouts, breaking the Policy Parsing or AI Advisor features.
**Mitigation:**
- **Graceful Degradation:** All AI calls are wrapped in `try/catch` blocks. If the AI service fails, the user is presented with a standard fallback form (e.g., manual policy entry) rather than a white screen of death.
- **Timeouts:** We enforce strict timeouts on AI fetch requests to ensure the UI doesn't hang indefinitely.

### D. Data Privacy & Image Storage
**Challenge:** Users are uploading sensitive insurance policies and photos of their home.
**Mitigation:**
- Uploaded files would be stored in secure, private S3 buckets (or Vercel Blob) with pre-signed, temporary URLs for access.
- We adhere strictly to the principle of least privilege, ensuring no public access to the raw bucket URLs.

## Conclusion
By combining Next.js 15 Server Components, Auth.js, Zod validation, and Prisma ORM, GharSuraksha provides a highly secure, scalable, and robust architecture that is ready for production deployment.
