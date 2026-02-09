# 💻 Laptop Store

A full-stack e-commerce web application for buying and managing laptops. Built with React, TypeScript, Node.js, Express, and MongoDB.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Documentation](#api-documentation)
  - [Authentication](#authentication)
  - [Laptops](#laptops)
  - [Orders](#orders)
  - [Reviews](#reviews)
  - [Users](#users)
  - [Brands](#brands)
- [Screenshots](#screenshots)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Project Overview

Laptop Store is a modern e-commerce platform that enables users to browse, search, and purchase laptops online. The application features a user-friendly interface for customers and a comprehensive admin panel for managing inventory, orders, and brands.

### Key Capabilities:
- **Customer Portal**: Browse laptops, view detailed specifications, add to cart, place orders, and write reviews
- **Admin Panel**: Manage laptop inventory, brands, orders, and view statistics
- **Authentication**: Secure JWT-based authentication with role-based access control
- **Search & Filter**: Advanced filtering by brand, CPU, GPU, RAM, and price
- **Order Management**: Track orders from pending to delivered status

## ✨ Features

### For Customers:
- 🔐 User registration and authentication
- 🔍 Search and filter laptops by specifications
- 🛒 Shopping cart functionality
- 📦 Order placement and tracking
- ⭐ Product reviews and ratings
- 👤 User profile management

### For Administrators:
- 📊 Admin dashboard with statistics
- 💻 Add, update, and delete laptop inventory
- 🏢 Manage brands
- 📋 View and update order status
- 📈 Brand statistics and analytics

## 🛠 Tech Stack

### Frontend:
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Mantine UI** - Component library
- **React Router** - Client-side routing
- **TanStack Query** - Data fetching and caching
- **Zustand** - State management
- **Axios** - HTTP client

### Backend:
- **Node.js** - Runtime environment
- **Express 5** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Zod** - Schema validation
- **Nodemailer** - Email service

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (v5 or higher) - Running locally or a MongoDB Atlas account

## 🚀 Setup Instructions

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   
   Create a `.env` file in the backend directory by copying `.env.example`:
   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your configuration:
   ```env
   MONGO_URI=mongodb://localhost:27017/laptop-store
   FRONTEND_URL=http://localhost:5173
   PORT=5000
   SECRET_KEY=your-secret-key-here
   ```

   Replace `your-secret-key-here` with a secure random string.

4. **Start MongoDB:**
   
   Make sure MongoDB is running on your system:
   ```bash
   # macOS
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   
   # Windows
   # Start MongoDB service from Services panel
   ```

5. **Start the backend server:**

   For development (with auto-reload):
   ```bash
   npm run dev
   ```

   For production:
   ```bash
   npm start
   ```

   The backend will start on `http://localhost:5000`

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   
   Create a `.env` file in the frontend directory by copying `.env.example`:
   ```bash
   cp .env.example .env
   ```

   Update the `.env` file:
   ```env
   VITE_BACKEND_URL=http://localhost:5000
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

   The frontend will start on `http://localhost:5173`

5. **Build for production:**
   ```bash
   npm run build
   ```

   Preview the production build:
   ```bash
   npm run preview
   ```

## 📚 API Documentation

Base URL: `http://localhost:5000/api`

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "full_name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890",
  "address": "123 Main St, City, Country"
}
```

**Response (201 Created):**
```json
{
  "message": "User registered successfully"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "userID": "507f1f77bcf86cd799439011",
  "role": "customer"
}
```

#### Logout
```http
POST /api/auth/logout
```

**Response (200 OK):**
```json
{
  "message": "Logout successful"
}
```

#### Check Auth Status
```http
GET /api/auth/status
```

**Response (200 OK):**
```json
{
  "isLoggedIn": true,
  "userID": "507f1f77bcf86cd799439011",
  "role": "customer"
}
```

### Laptops

#### Get All Laptops (with filters)
```http
GET /api/laptops?brand=<brand_id>&cpu=<cpu_name>&gpu=<gpu_name>&ram=<ram_size>&minPrice=<min>&maxPrice=<max>&page=<page>&limit=<limit>
```

**Query Parameters:**
- `brand` - Filter by brand ID
- `cpu` - Filter by CPU name
- `gpu` - Filter by GPU name
- `ram` - Filter by RAM size (in GB)
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

**Response (200 OK):**
```json
{
  "laptops": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "model_name": "Dell XPS 15",
      "price": 1499.99,
      "specifications": {
        "cpu": "Intel Core i7-11800H",
        "ram": 16,
        "storage": "512GB SSD",
        "gpu": "NVIDIA RTX 3050"
      },
      "stock_quantity": 10,
      "brand_id": {
        "_id": "507f1f77bcf86cd799439012",
        "brand_name": "Dell",
        "country": "USA"
      }
    }
  ],
  "total": 50,
  "page": 1,
  "totalPages": 5
}
```

#### Get Laptop by ID
```http
GET /api/laptops/id/:id
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "model_name": "Dell XPS 15",
  "price": 1499.99,
  "specifications": {
    "cpu": "Intel Core i7-11800H",
    "ram": 16,
    "storage": "512GB SSD",
    "gpu": "NVIDIA RTX 3050"
  },
  "stock_quantity": 10,
  "brand_id": {
    "_id": "507f1f77bcf86cd799439012",
    "brand_name": "Dell",
    "country": "USA"
  }
}
```

#### Get Filter Parameters
```http
GET /api/laptops/filterParams
```

Returns available filter options (CPUs, GPUs, RAM sizes, brands).

**Response (200 OK):**
```json
{
  "cpus": ["Intel Core i7-11800H", "AMD Ryzen 7 5800H"],
  "gpus": ["NVIDIA RTX 3050", "AMD Radeon RX 6600M"],
  "rams": [8, 16, 32, 64],
  "brands": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "brand_name": "Dell"
    }
  ]
}
```

#### Add Laptop (Admin Only)
```http
POST /api/laptops
Authorization: Bearer <token>
Content-Type: application/json

{
  "model_name": "Lenovo ThinkPad X1",
  "price": 1299.99,
  "specifications": {
    "cpu": "Intel Core i5-1135G7",
    "ram": 16,
    "storage": "512GB SSD",
    "gpu": "Intel Iris Xe"
  },
  "stock_quantity": 20,
  "brand_id": "507f1f77bcf86cd799439012"
}
```

**Response (201 Created):**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "model_name": "Lenovo ThinkPad X1",
  "price": 1299.99,
  ...
}
```

#### Update Laptop Stock (Admin Only)
```http
PATCH /api/laptops/:id/stock
Authorization: Bearer <token>
Content-Type: application/json

{
  "stock_quantity": 25
}
```

#### Delete Laptop (Admin Only)
```http
DELETE /api/laptops/:id
Authorization: Bearer <token>
```

### Orders

#### Create Order
```http
POST /api/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [
    {
      "laptop_id": "507f1f77bcf86cd799439011",
      "quantity": 2,
      "unit_price": 1499.99
    }
  ],
  "total_price": 2999.98,
  "status": "pending"
}
```

**Response (201 Created):**
```json
{
  "_id": "507f1f77bcf86cd799439014",
  "user_id": "507f1f77bcf86cd799439010",
  "items": [...],
  "total_price": 2999.98,
  "status": "pending",
  "order_date": "2024-01-15T10:30:00.000Z"
}
```

#### Get User Orders
```http
GET /api/orders
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439014",
    "user_id": "507f1f77bcf86cd799439010",
    "order_date": "2024-01-15T10:30:00.000Z",
    "status": "pending",
    "total_price": 2999.98,
    "items": [...]
  }
]
```

#### Get All Orders (Admin Only)
```http
GET /api/orders/all
Authorization: Bearer <token>
```

#### Update Order Status (Admin Only)
```http
PATCH /api/orders/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "shipping"
}
```

Status options: `"pending"`, `"shipping"`, `"delievered"`

#### Refund Order Item
```http
PATCH /api/orders/:id/refund
Authorization: Bearer <token>
Content-Type: application/json

{
  "laptop_id": "507f1f77bcf86cd799439011"
}
```

### Reviews

#### Add Review
```http
POST /api/reviews
Authorization: Bearer <token>
Content-Type: application/json

{
  "laptop_id": "507f1f77bcf86cd799439011",
  "rating": 5,
  "comment": "Excellent laptop! Great performance."
}
```

**Response (201 Created):**
```json
{
  "_id": "507f1f77bcf86cd799439015",
  "user_id": "507f1f77bcf86cd799439010",
  "laptop_id": "507f1f77bcf86cd799439011",
  "rating": 5,
  "comment": "Excellent laptop! Great performance.",
  "created_at": "2024-01-15T10:30:00.000Z"
}
```

#### Get Reviews for Laptop
```http
GET /api/reviews/laptop/:laptopId
```

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439015",
    "user_id": {
      "_id": "507f1f77bcf86cd799439010",
      "full_name": "John Doe"
    },
    "laptop_id": "507f1f77bcf86cd799439011",
    "rating": 5,
    "comment": "Excellent laptop! Great performance.",
    "created_at": "2024-01-15T10:30:00.000Z"
  }
]
```

#### Delete Review
```http
DELETE /api/reviews/:id
Authorization: Bearer <token>
```

### Users

#### Get User by ID
```http
GET /api/users/:id
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439010",
  "full_name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "address": "123 Main St, City, Country",
  "role": "customer",
  "created_at": "2024-01-01T00:00:00.000Z"
}
```

#### Get User Orders
```http
GET /api/users/:id/orders
Authorization: Bearer <token>
```

#### Get User Reviews
```http
GET /api/users/:id/reviews
Authorization: Bearer <token>
```

#### Update User Profile
```http
PATCH /api/users/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "full_name": "John Updated",
  "phone": "+1234567891",
  "address": "456 New St, City, Country"
}
```

### Brands

#### Get All Brands
```http
GET /api/brands
```

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "brand_name": "Dell",
    "country": "USA"
  },
  {
    "_id": "507f1f77bcf86cd799439013",
    "brand_name": "HP",
    "country": "USA"
  }
]
```

#### Get Brand by ID
```http
GET /api/brands/:id
```

#### Get Brand Statistics
```http
GET /api/brands/stats/:id
```

Returns statistics about the brand including number of laptops, average price, etc.

#### Add Brand (Admin Only)
```http
POST /api/brands
Authorization: Bearer <token>
Content-Type: application/json

{
  "brand_name": "Lenovo",
  "country": "China"
}
```

#### Delete Brand (Admin Only)
```http
DELETE /api/brands/:id
Authorization: Bearer <token>
```

## 📸 Screenshots

### Home Page
*The main landing page displaying featured laptops and navigation to browse the catalog.*

![Home Page](./screenshots/homepage.png)

The home page welcomes users with a clean, modern interface showcasing:
- Navigation bar with search functionality
- Featured laptop listings
- Quick access to brands and categories
- Login/Register options

---

### Laptop Catalog with Filters
*Browse all available laptops with advanced filtering options.*

![Laptop Catalog](./screenshots/catalog.png)

The catalog page features:
- Grid view of all laptops
- Filter sidebar (by brand, CPU, GPU, RAM, price range)
- Sort options (price, name, newest)
- Pagination for easy navigation
- Quick view of specifications and prices

---

### Laptop Detail Page
*Detailed view of a laptop with specifications, reviews, and purchase options.*

![Laptop Detail](./screenshots/laptop-detail.png)

The detail page displays:
- High-resolution laptop images
- Complete specifications (CPU, GPU, RAM, Storage)
- Price and stock availability
- Add to cart button
- Customer reviews and ratings
- Related products

---

### Shopping Cart
*Review your selected items before checkout.*

![Shopping Cart](./screenshots/cart.png)

The shopping cart includes:
- List of selected laptops
- Quantity adjustments
- Price calculations
- Total amount
- Proceed to checkout button
- Remove items option

---

### User Profile
*Manage your account information and view order history.*

![User Profile](./screenshots/profile.png)

The profile page shows:
- User information (name, email, phone, address)
- Edit profile functionality
- Order history
- Review history
- Account settings

---

### Order History
*Track all your past and current orders.*

![Order History](./screenshots/orders.png)

Order history displays:
- List of all orders
- Order status (pending, shipping, delivered)
- Order date and total amount
- View order details
- Request refund option

---

### Admin Dashboard
*Comprehensive admin panel for managing the store (Admin only).*

![Admin Dashboard](./screenshots/admin-dashboard.png)

The admin dashboard provides:
- Key metrics and statistics
- Total sales overview
- Active orders count
- Inventory status
- Quick actions for management tasks

---

### Admin - Laptop Management
*Add, edit, or remove laptops from inventory (Admin only).*

![Admin Laptop Management](./screenshots/admin-laptops.png)

Laptop management features:
- Add new laptop form
- Edit existing laptops
- Update stock quantities
- Delete laptops
- View all laptop details

---

### Admin - Brand Management
*Manage laptop brands (Admin only).*

![Admin Brand Management](./screenshots/admin-brands.png)

Brand management includes:
- Add new brands
- View brand statistics
- Edit brand information
- Delete brands

---

### Login Page
*Secure authentication for users.*

![Login Page](./screenshots/login.png)

Login page features:
- Email and password fields
- Remember me option
- Link to registration page
- Password recovery option

---

### Registration Page
*New user registration with validation.*

![Registration Page](./screenshots/register.png)

Registration form includes:
- Full name input
- Email validation
- Password strength requirements
- Phone number validation
- Address field
- Terms and conditions

---

## 📁 Project Structure

```
laptop-store/
├── backend/
│   ├── src/
│   │   ├── config/          # Database and app configuration
│   │   ├── controller/      # Request handlers
│   │   │   └── dto/        # Data Transfer Objects
│   │   ├── middleware/      # Authentication & validation middleware
│   │   ├── model/          # Mongoose schemas
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Utility functions
│   │   └── app.js          # Express app configuration
│   ├── server.js           # Server entry point
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── app/            # App configuration and routing
│   │   ├── components/     # Reusable UI components
│   │   ├── features/       # Feature-specific code
│   │   ├── pages/          # Page components
│   │   ├── shared/         # Shared utilities and types
│   │   └── main.tsx        # Application entry point
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── .env.example
│
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

---

## 👥 Authors

- **CoffeeSi** - [GitHub](https://github.com/CoffeeSi)
- **fallendwn** - Contributor

## 🙏 Acknowledgments

- Mantine UI for the beautiful component library
- MongoDB for the robust database solution
- The React and Node.js communities

---

For any questions or issues, please open an issue on the [GitHub repository](https://github.com/CoffeeSi/laptop-store/issues).
