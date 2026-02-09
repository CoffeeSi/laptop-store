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

> **Note:** To add screenshots, run the application and capture images of the following features:

### 1. Home Page
*The main landing page displaying featured laptops and navigation to browse the catalog.*

**Features to capture:**
- Navigation bar with search functionality
- Featured laptop listings
- Quick access to brands and categories
- Login/Register options
- Hero section with call-to-action

---

### 2. Laptop Catalog with Filters
*Browse all available laptops with advanced filtering options.*

**Features to capture:**
- Grid view of all laptops with cards showing:
  - Laptop image
  - Model name and brand
  - Price
  - Key specifications
- Filter sidebar with options for:
  - Brand selection
  - CPU filter
  - GPU filter
  - RAM size filter
  - Price range slider
- Sort dropdown (price, name, newest)
- Pagination controls

---

### 3. Laptop Detail Page
*Detailed view of a laptop with specifications, reviews, and purchase options.*

**Features to capture:**
- Large laptop image/gallery
- Model name and brand
- Price and stock availability indicator
- Complete specifications section:
  - CPU details
  - GPU information
  - RAM capacity
  - Storage type and size
- Add to cart button with quantity selector
- Customer reviews section with:
  - Star ratings
  - Review comments
  - User names and dates
- Related products carousel

---

### 4. Search Results Page
*Search functionality with results display.*

**Features to capture:**
- Search bar with query
- Search results grid
- Number of results found
- Filter options applied to search
- "No results" state (if applicable)

---

### 5. Shopping Cart
*Review your selected items before checkout.*

**Features to capture:**
- List of cart items showing:
  - Laptop thumbnail
  - Model name
  - Unit price
  - Quantity controls (+/-)
  - Subtotal per item
  - Remove button
- Cart summary section:
  - Subtotal
  - Tax (if applicable)
  - Total amount
- Proceed to checkout button
- Continue shopping link
- Empty cart state

---

### 6. User Profile
*Manage your account information and view order history.*

**Features to capture:**
- User information display:
  - Full name
  - Email address
  - Phone number
  - Delivery address
  - Account creation date
  - User role badge
- Edit profile button/form
- Tabs or sections for:
  - Personal information
  - Order history preview
  - Review history preview
- Save changes button

---

### 7. Order History
*Track all your past and current orders.*

**Features to capture:**
- Table/list of orders showing:
  - Order ID
  - Order date
  - Status badge (pending/shipping/delivered)
  - Total amount
  - Number of items
  - View details button
- Order detail modal/page:
  - Ordered items list
  - Shipping address
  - Order timeline
  - Refund option (if available)
- Filter orders by status
- Empty orders state

---

### 8. Product Reviews
*View and submit reviews for laptops.*

**Features to capture:**
- Review list showing:
  - User avatar/initial
  - User name
  - Star rating
  - Review date
  - Review comment
- Add review form (for logged-in users):
  - Star rating selector
  - Comment text area
  - Submit button
- Average rating display
- Review count
- Delete option (for own reviews)

---

### 9. Login Page
*Secure authentication for users.*

**Features to capture:**
- Login form with:
  - Email input field
  - Password input field
  - "Show password" toggle
  - Remember me checkbox (if applicable)
  - Login button
- Link to registration page
- Forgot password link (if implemented)
- Error messages (e.g., invalid credentials)
- Success state (if showing validation)

---

### 10. Registration Page
*New user registration with validation.*

**Features to capture:**
- Registration form with:
  - Full name field
  - Email field with validation
  - Password field with strength indicator
  - Confirm password field
  - Phone number field
  - Address text area
  - Terms and conditions checkbox
  - Register button
- Link to login page
- Field validation errors
- Success message

---

### 11. Admin Dashboard (Admin Only)
*Comprehensive admin panel for managing the store.*

**Features to capture:**
- Dashboard overview with cards showing:
  - Total revenue
  - Total orders count
  - Active orders
  - Total laptops in inventory
  - Total registered users
- Recent orders table preview
- Quick action buttons:
  - Add new laptop
  - Add new brand
  - View all orders
- Navigation sidebar with admin sections
- Statistics charts (if implemented)

---

### 12. Admin - Laptop Management (Admin Only)
*Add, edit, or remove laptops from inventory.*

**Features to capture:**
- Laptop inventory table showing:
  - Laptop thumbnail
  - Model name
  - Brand
  - Price
  - Stock quantity
  - CPU/GPU/RAM specs
  - Action buttons (Edit, Delete)
- Add new laptop form with fields:
  - Model name
  - Brand dropdown
  - Price input
  - CPU input
  - GPU input
  - RAM input
  - Storage input
  - Stock quantity
  - Submit button
- Edit laptop modal
- Delete confirmation dialog
- Stock update interface

---

### 13. Admin - Order Management (Admin Only)
*View and manage all customer orders.*

**Features to capture:**
- All orders table showing:
  - Order ID
  - Customer name
  - Order date
  - Status dropdown (pending/shipping/delivered)
  - Total amount
  - Items count
  - Actions (View details, Update status)
- Order details modal
- Status update controls
- Filter by status dropdown
- Search orders functionality

---

### 14. Admin - Brand Management (Admin Only)
*Manage laptop brands.*

**Features to capture:**
- Brands list/table showing:
  - Brand name
  - Country of origin
  - Number of laptops
  - Action buttons (View stats, Edit, Delete)
- Add new brand form:
  - Brand name input
  - Country input
  - Submit button
- Brand statistics page showing:
  - Total laptops for brand
  - Average price
  - Total stock
  - Popular models
- Delete confirmation dialog

---

### 15. Brands Page
*Browse all available laptop brands.*

**Features to capture:**
- Grid of brand cards with:
  - Brand logo or name
  - Country flag/name
  - Number of available laptops
  - View brand link
- Individual brand page showing:
  - Brand information
  - All laptops from the brand
  - Brand statistics

---

### Instructions for Adding Screenshots:

1. **Start the application:**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

2. **Populate test data:**
   - Create an admin account
   - Add several brands
   - Add multiple laptops with various specifications
   - Create a regular user account
   - Place some test orders
   - Add reviews to products

3. **Capture screenshots:**
   - Use your browser's screenshot tool or a tool like Snipping Tool, Lightshot, or macOS Screenshot
   - Save screenshots in the `screenshots/` directory
   - Use descriptive filenames (e.g., `homepage.png`, `admin-dashboard.png`, `laptop-detail.png`)
   - Recommended resolution: 1920x1080 or 1440x900
   - Format: PNG for clarity

4. **Update README:**
   - Replace the feature descriptions above with actual screenshot links
   - Use the format: `![Description](./screenshots/filename.png)`
   - Add brief captions explaining what's shown

5. **Example screenshot insertion:**
   ```markdown
   ### Home Page
   ![Home Page](./screenshots/homepage.png)
   *The main landing page displaying featured laptops with navigation and search.*
   ```

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
