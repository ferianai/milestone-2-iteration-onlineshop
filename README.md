# ShopSmart - Online Store Application [SHOPSMART](https://shopsmart-mauve.vercel.app)

ShopSmart is a dynamic and interactive online store application built with **Next.js**, **TypeScript**, and **Tailwind CSS**. This project showcases essential features of a modern e-commerce platform, including user authentication, product browsing, and a shopping cart system.

## Overview of the Application

ShopSmart is designed to provide users with a seamless online shopping experience. Users can browse products, view details, filter by categories, add items to their cart, and manage their shopping process efficiently. The application integrates a backend API for dynamic data fetching and includes essential features like authentication and responsive design.

## Features Implemented

1. **User Authentication**: Login and register functionality using a backend API.
2. **Product Browsing**: View a list of products with details fetched from an API.
3. **Product Categories**: Filter products by categories.
4. **Shopping Cart**: Add products to the cart and manage the shopping list.
5. **Home Page**: Features a carousel of popular products and a section for random products.
6. **Product Detail Page**: Displays detailed information about a selected product, including multiple images and a description.
7. **Image Parsing**: Added functionality to handle image parsing for product images. If product images are returned as stringified JSON, the code parses and extracts the valid image URLs.

## Installation Instructions

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/shopsmart.git
   cd shopsmart
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

   The application will be running at [http://localhost:3000](http://localhost:3000).

## Testing Methodologies Used

- **Jest**: The project uses **Jest** for unit and integration testing. Tests are written to ensure that components and functions work as expected.
- **React Testing Library**: For testing React components, **React Testing Library** is used in conjunction with Jest to simulate user interactions and assert the behavior of the components.
- **End-to-End Testing**: Not implemented yet but can be added using frameworks like **Cypress** or **Playwright** for simulating real user scenarios.

### Running Tests

To run the test suite, execute the following command:

```bash
npm run test
```

### Running Test Coverage

To check the code coverage of your tests, run:

```bash
npm run test:coverage
```

#### Test Results

```plaintext
Node.js v18.20.6
-----------------------------|---------|----------|---------|---------|--------------------
File                         | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-----------------------------|---------|----------|---------|---------|--------------------
All files                    |   83.67 |    65.51 |      60 |   83.67 |
 components/layouts/AppShell |     100 |      100 |     100 |     100 |
  index.tsx                  |     100 |      100 |     100 |     100 |
 components/layouts/Footer   |   96.37 |      100 |      50 |   96.37 |
  index.tsx                  |   96.37 |      100 |      50 |   96.37 | 6-10
 components/layouts/Navbar   |   83.58 |    66.66 |      50 |   83.58 |
  index.tsx                  |   83.58 |    66.66 |      50 |   83.58 | 18-26,56-57
 pages/about                 |     100 |      100 |     100 |     100 |
  index.tsx                  |     100 |      100 |     100 |     100 |
 pages/product               |   70.19 |       55 |      50 |   70.19 |
  index.tsx                  |   70.19 |       55 |      50 |   70.19 | 52-53,62-64,77-102
 pages/users                 |      66 |      100 |      50 |      66 |
  index.tsx                  |      66 |      100 |      50 |      66 | 11-27
-----------------------------|---------|----------|---------|---------|--------------------

Test Suites: 6 passed, 6 total
Tests:       19 passed, 19 total
Snapshots:   5 passed, 5 total
Time:        2.372 s
```

## Technologies Used

- **Next.js** (with TypeScript) for server-side rendering and static site generation.
- **Tailwind CSS** for styling the components with utility-first CSS.
- **SWR** for data fetching and caching.
- **Context API** for state management, specifically for the shopping cart.
- **Jest** and **React Testing Library** for testing.
- **Node.js** and **npm** for package management and running the development server.

## API

The application uses the API provided by: **FakeAPI Platzi** ([https://fakeapi.platzi.com/](https://fakeapi.platzi.com/))

## Screenshots or Demo Links

### Product Listing Page

![Product Listing](public/images/product-listing.png)

### Product Detail Page

![Product Detail](public/images/product-detail.png)

### Demo Link

You can view the live demo of the application here:  
[Live Demo Link](http://localhost:3000) (Only available when running locally).

for login use user :

```
    Name    : ana
    Email   : ana@mail.co
    Pass    : 123456
```

if login failed, try register new account.

---

## Directory Structure

```
ShopSmart/
├── .next/                      # Next.js build output
├── .SWC/                       # SWC build cache
├── coverage/                   # Jest test coverage reports
├── node_modules/               # Project dependencies
├── public/                     # Public assets such as images, icons
├── src/                        # Source folder containing application code
      ├── components/           # Reusable React components
      ├── context/              # CartContext and provider
      ├── lib/                  # Utility functions
      ├── mocks/                # Mock data for testing
      ├── pages/                # Next.js pages (Product, Product Detail, etc.)
      ├── styles/               # Global and component-specific styles
      ├── TS types/             # TypeScript type definitions
      ├── views/                # Views for product and other pages
      ├── middlewares.ts        # Middlewares for request handling
├── .gitignore                  # Git ignore file
├── jest.config.ts              # Jest configuration
├── jest.setup.ts               # Jest setup file
├── next-env.d.ts               # Next.js TypeScript environment types
├── next.config.ts              # Next.js configuration
├── package-lock.json           # npm lock file for exact dependency versions
├── package.json                # npm package file
├── postcss.config.mjs          # PostCSS configuration
├── README.md                   # Project overview and instructions
├── tailwind.config.ts          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

## Deploy on Vercel

Deploying the ShopSmart application on Vercel is straightforward:

1. **Create a Vercel Account**: Sign up at [Vercel](https://vercel.com/) if you don't already have an account.

2. **Install Vercel CLI (Optional)**: To deploy via CLI, install the Vercel CLI:

   ```bash
   npm install -g vercel
   ```

3. **Link Your Project**:

   ```bash
   vercel
   ```

   Follow the prompts to link your project to your Vercel account.

4. **Push to GitHub**:
   Ensure your code is pushed to a GitHub repository. Vercel integrates seamlessly with GitHub, and you can deploy your app directly from your repository.

5. **Deploy the Application**:

   - Log in to your Vercel dashboard.
   - Click **New Project** and import your GitHub repository.
   - Configure the project settings (if needed) and click **Deploy**.

6. **View Your Application**:
   After deployment, Vercel will provide a live link to your application.

7. **Deployment Link** : [shopsmart](https://shopsmart-mauve.vercel.app)

For more details, refer to the official [Vercel Documentation](https://vercel.com/docs).
