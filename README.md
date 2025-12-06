

A full-stack web application for showcasing products with enquiry functionality. Built with a Node.js/Express backend and a React frontend.

## Features

- Product Catalog: Browse products with search and category filtering
- Pagination: Navigate through products efficiently
- Product Details: View detailed information about each product
- Enquiry System: Submit enquiries about products through a modal form
- Responsive Design: Works on desktop and mobile devices
- RESTful API: Backend provides clean API endpoints for products and enquiries

## Tech Stack

### Backend
- Node.js with Express.js
- MySQL database with mysql2
- CORS for cross-origin requests
- dotenv for environment variables
- body-parser for request parsing

### Frontend
- React 19 with Vite
- React Router for navigation
- Axios for API calls
- CSS Modules for styling
- ESLint for code linting

## Project Structure

```
fustack(gvcc)/
├── backend/
│   ├── db/
│   │   └── db.js              # Database connection
│   ├── routes/
│   │   ├── products.js        # Product API routes
│   │   └── enquiries.js       # Enquiry API routes
│   ├── index.js               # Main server file
│   ├── schema.sql             # Database schema
│   ├── seed.js                # Database seeding script
│   ├── seedData.js            # Sample product data
│   ├── package.json
│   └── .env                   # Environment variables
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js         # Axios configuration
│   │   ├── components/
│   │   │   ├── productCard/   # Product card component
│   │   │   └── enquiryForm/   # Enquiry form modal
│   │   ├── pages/
│   │   │   ├── ProductsList.jsx   # Product listing page
│   │   │   └── ProductDetails.jsx # Product details page
│   │   ├── styles/            # Global styles
│   │   ├── App.jsx            # Main app component
│   │   └── main.jsx           # App entry point
│   ├── vite.config.js         # Vite configuration
│   ├── package.json
│   └── index.html
└── README.md
```

## API Endpoints

### Products
- `GET /api/products` - Get all products (with optional search, category, page, limit params)
- `GET /api/products/:id` - Get product by ID

### Enquiries
- `POST /api/enquiries` - Submit a new enquiry
- `GET /api/enquiries` - Get all enquiries (admin view)

## Database Schema

### Products Table
- `id` (INT, PRIMARY KEY, AUTO_INCREMENT)
- `name` (VARCHAR(255), NOT NULL)
- `category` (VARCHAR(100))
- `short_desc` (VARCHAR(500))
- `long_desc` (TEXT)
- `price` (DECIMAL(10,2))
- `image_url` (VARCHAR(500))
- `created_at` (DATETIME, DEFAULT CURRENT_TIMESTAMP)

### Enquiries Table
- `id` (INT, PRIMARY KEY, AUTO_INCREMENT)
- `product_id` (INT, FOREIGN KEY)
- `name` (VARCHAR(255), NOT NULL)
- `email` (VARCHAR(255), NOT NULL)
- `phone` (VARCHAR(20))
- `message` (TEXT, NOT NULL)
- `created_at` (DATETIME, DEFAULT CURRENT_TIMESTAMP)

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   - Create a MySQL database named `gvcc_products_db`
   - Update the `.env` file with your database credentials (default provided)

4. Seed the database:
   ```bash
   npm run seed
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```
   The server will run on http://localhost:3001

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The app will be available at http://localhost:5173

## Usage

1. Open http://localhost:5173 in your browser
2. Browse products on the home page
3. Use search and category filters to find specific products
4. Click on a product card to view details
5. Click "Enquire Now" to submit an enquiry about a product
6. Fill out the enquiry form and submit

## Development

### Running Tests
```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm run lint
```

### Building for Production
```bash
# Frontend
cd frontend
npm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request
