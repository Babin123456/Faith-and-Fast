# Faith & Fast E-commerce

![Logo](client/src/assets/logo-light.png)

A comprehensive, high-performance E-commerce platform built for speed, security, and seamless user experience.

## Overview
Faith & Fast is a modern e-commerce solution designed to provide users with a smooth shopping journey and administrators with powerful management tools. From product discovery to secure checkout, every step is optimized for performance and reliability.

## Features

### User Features
- **Secure Authentication**: JWT-based login/signup with email verification (OTP).
- **Product Discovery**: Advanced search and filtering (category, color, size, price).
- **Shopping Experience**: Dynamic cart, wishlist, and real-time product reviews.
- **Order Management**: Comprehensive checkout flow (COD & Online), order tracking, and history.
- **Profile Management**: Address book, profile updates, and password security.

### Admin Features
- **Dashboard**: Real-time analytics and overview.
- **Product Management**: Full CRUD operations with multi-image upload.
- **User Management**: Role assignments and account status control.
- **Order Management**: Update order statuses, tracking info, and history.
- **Discounts/Coupons**: Create and manage promotional codes.

## Tech Stack
- **Frontend**: React 18, Vite, Redux Toolkit, Tailwind CSS, Framer Motion, Material UI.
- **Backend**: Node.js, Express, MongoDB, Mongoose.
- **Services**: Cloudinary (Media), Razorpay (Payments), Brevo (Email), Vercel (Deployment).

## Folder Structure
```
.
├── client/                 # Frontend React Application (Vite)
│   ├── public/             # Static assets
│   └── src/
│       ├── api/            # Axios instance and interceptors
│       ├── assets/         # Styles and local images
│       ├── pages/          # Page components
│       ├── store/          # Redux Toolkit slices
│       └── App.jsx         # Main routing
└── server/                 # Backend Node.js API
    ├── config/             # DB and Service configurations
    ├── controllers/        # Request logic
    ├── middleware/         # Security and Auth middlewares
    ├── models/             # Mongoose schemas
    ├── route/              # API routes
    └── utils/              # Helpers and templates
```

## Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd project-folder
```

### 2. Install Dependencies
```bash
# Frontend
cd client && npm install

# Backend
cd ../server && npm install
```

### 3. Environment Variables
Refer to `FINAL_AUDIT_REPORT.md` for a complete list of required production environment variables.

### 4. Run the Project
```bash
# Start Backend (server/)
npm run dev

# Start Frontend (client/)
npm run dev
```

## Deployment Guide

### Vercel (Frontend)
1. Import the repository to Vercel.
2. Set **Root Directory** to `client`.
3. Configure the following **Build Settings**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add all required `VITE_` environment variables.

### Backend
1. Deploy to **Railway** or **Render**.
2. Set the start command to `node index.js`.
3. Add all required backend environment variables.

## Contributing
Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License
This project is licensed under the ISC License.

## Author Information
**Project Admin**: Faith & Fast Team
**Developer**: Jules (Senior Staff Software Engineer)
