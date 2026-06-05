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

## Architecture
The project follows a clean, modular architecture:
- **Client**: Separated by pages, components, store (Redux slices), and api services.
- **Server**: MVC pattern with dedicated routes, controllers, models, and middleware.

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
Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGODB_URL=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=3d
COOKIE_EXPIRE=5
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
RAZORPAY_KEY_ID=your_razorpay_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
BREVO_API_KEY=your_brevo_key
FRONTEND_URL=http://localhost:5173
```

Create a `.env` file in the `client` directory:
```env
VITE_BACKEND_URL=http://localhost:5000
VITE_RAZORPAY_KEY_ID=your_razorpay_id
```

### 4. Run the Project
```bash
# Start Backend (server/)
npm run dev

# Start Frontend (client/)
npm run dev
```

## Folder Structure
```
.
├── client/                 # Frontend React Application
│   ├── public/             # Static assets
│   └── src/
│       ├── api/            # Axios instance and API calls
│       ├── assets/         # Images and icons
│       ├── pages/          # Page components (Admin, Auth, Products, etc.)
│       ├── store/          # Redux Toolkit slices
│       └── App.jsx         # Main application component
└── server/                 # Backend Node.js Application
    ├── config/             # Database, Razorpay, and Email configs
    ├── controllers/        # Request handlers
    ├── middleware/         # Auth, Admin, and Error middlewares
    ├── models/             # Mongoose schemas
    ├── route/              # API route definitions
    ├── utils/              # Helper functions and templates
    └── index.js            # Server entry point
```

## API Documentation

### Auth & User
- `POST /api/user/register` - User registration
- `POST /api/user/login` - User login
- `GET /api/user/me` - Get current user details
- `PUT /api/user/update-user` - Update profile

### Products
- `GET /api/product/get` - List products with pagination
- `GET /api/product/get/:productId` - Product details
- `POST /api/product/create` - Create product (Admin)
- `PUT /api/product/update/:_id` - Update product (Admin)

### Orders & Payments
- `POST /api/order/create` - Create new order
- `GET /api/order/myorder` - User's order history
- `POST /api/payment/razorpay/order` - Create Razorpay order

## Contributing
Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License
This project is licensed under the ISC License.

## Author Information
**Project Admin**: Faith & Fast Team
**Developer**: Jules (Senior Staff Software Engineer)
