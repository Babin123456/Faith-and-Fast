# Production Deployment Checklist - Faith & Fast

Follow these steps meticulously to transition the project from its current state to a successful production launch.

## 1. Code Stabilization
- [ ] **Fix Critical Bug #1**: Destructure `req.body` in `server/controllers/productController.js`.
- [ ] **Fix Critical Bug #2**: Correct route mapping for `/resend-otp` in `server/route/userRoute.js`.
- [ ] **Fix Bug #3**: Synchronize controller update keys with the `User` model schema (camelCase vs snake_case).
- [ ] **Remove Logs**: Scrub all `console.log` statements containing sensitive user data.

## 2. Environment Configuration
- [ ] **Frontend**: Ensure `VITE_BACKEND_URL` is set to the production API URL.
- [ ] **Backend**:
    - [ ] Set `NODE_ENV=production`.
    - [ ] Update `FRONTEND_URL` to match the Vercel production domain.
    - [ ] Update `MONGODB_URL` to a production-grade cluster.

## 3. Vercel Frontend Settings
- [ ] Set **Root Directory** to `client`.
- [ ] Set **Build Command** to `npm run build`.
- [ ] Set **Output Directory** to `dist`.
- [ ] Add `client/vercel.json` to handle SPA routing (rewrites).

## 4. Security Hardening
- [ ] Set `secure: true` and `sameSite: "Strict"` for authentication cookies in production.
- [ ] Ensure all API endpoints are protected by appropriate middleware (`auth`, `admin`).
- [ ] Verify `helmet` is active and properly configured for CORS and CSP.

## 5. Media & Assets
- [ ] Verify Cloudinary folder structure (`ff` folder) exists and is accessible.
- [ ] Update email templates with production assets and links (replace `localhost` with the live domain).

## 6. Pre-Flight Check
- [ ] Run `npm run build` locally in the `client` directory.
- [ ] Test the full Checkout flow (COD) in the staging environment.
- [ ] Verify Admin dashboard can create and update products without error.

## 7. Go Live
- [ ] Deploy backend to Railway/Render.
- [ ] Trigger final Vercel deployment.
- [ ] Monitor logs for 24 hours for any `500` errors.
