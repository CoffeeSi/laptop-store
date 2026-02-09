# Screenshots Guide

This directory should contain screenshots of the Laptop Store application.

## Required Screenshots

Please add the following screenshots to this directory:

### Customer Features:
1. `homepage.png` - Main landing page with navigation and featured laptops
2. `catalog.png` - Laptop catalog page with filters and grid view
3. `laptop-detail.png` - Individual laptop detail page with specs and reviews
4. `search-page.png` - Search results page
5. `cart.png` - Shopping cart with items
6. `profile.png` - User profile page
7. `orders.png` - Order history page
8. `login.png` - Login page
9. `register.png` - Registration page
10. `brands.png` - All brands page
11. `brand-detail.png` - Individual brand page

### Admin Features:
12. `admin-dashboard.png` - Admin dashboard with statistics
13. `admin-laptops.png` - Laptop inventory management
14. `admin-orders.png` - Order management interface
15. `admin-brands.png` - Brand management interface

## Screenshot Specifications

- **Format:** PNG (preferred) or JPEG
- **Recommended Resolution:** 1920x1080 or 1440x900
- **Browser:** Use a modern browser (Chrome, Firefox, Safari, or Edge)
- **Zoom Level:** 100% (default)
- **Content:** Ensure sample data is visible and realistic

## How to Capture Screenshots

1. **Set up the application:**
   ```bash
   # Start backend (Terminal 1)
   cd backend
   npm run dev
   
   # Start frontend (Terminal 2)
   cd frontend
   npm run dev
   ```

2. **Populate test data:**
   - Create an admin account (set role to "admin" in database)
   - Add 3-5 brands (Dell, HP, Lenovo, Apple, ASUS)
   - Add 10-15 laptops with varied specs and prices
   - Create a customer account
   - Add items to cart
   - Place 2-3 test orders
   - Write 3-5 reviews on different laptops

3. **Capture each screenshot:**
   - Navigate to the relevant page
   - Use browser's built-in screenshot tool or external tool:
     - **Windows:** Snipping Tool or Win + Shift + S
     - **macOS:** Command + Shift + 4
     - **Linux:** Gnome Screenshot or Spectacle
     - **Browser:** Right-click → "Capture Screenshot" (Firefox) or use DevTools
   
4. **Name files correctly:**
   - Use lowercase with hyphens
   - Match the filenames listed above
   - Example: `admin-dashboard.png`, not `Admin Dashboard.PNG`

5. **Verify image quality:**
   - Check that text is readable
   - Ensure no sensitive information is visible
   - Confirm proper lighting/contrast
   - Validate that key features are visible

## Tips for Great Screenshots

- **Use realistic data:** Avoid "test123" or Lorem Ipsum
- **Show functionality:** Demonstrate features in action (e.g., filters applied, items in cart)
- **Multiple states:** Consider capturing both empty and populated states where relevant
- **Responsive views:** Optionally add mobile screenshots if the app is responsive
- **Annotations:** You can add arrows or highlights to emphasize key features (optional)

## After Adding Screenshots

Update the main `README.md` file to replace the placeholder sections with actual image links:

```markdown
### Home Page
![Home Page](./screenshots/homepage.png)
*The main landing page displaying featured laptops with navigation and search.*
```

## Alternative: Video Demo

If taking multiple screenshots is time-consuming, consider recording a short video demo:
- Screen recording showing the main features
- 2-3 minutes covering key functionality
- Upload to YouTube or similar platform
- Add link to README

---

**Note:** This directory currently contains placeholder guidance. Once screenshots are added, you can remove this guide file.
