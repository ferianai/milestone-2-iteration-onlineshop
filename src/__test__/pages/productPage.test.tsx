import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductPage from "@/pages/product";
import { Product, Category } from "@/types/types";
import { CartProvider } from "@/context/CartContext"; // Assuming CartProvider is required
import { setupServer } from "msw/node";
import { rest } from "msw";
import { useRouter } from "next/router";
import userEvent from "@testing-library/user-event";

// Mock data
const mockCategories: Category[] = [
  {
    id: 1, 
    name: "Clothing",
    image: "",
  },
  {
    id: 2, 
    name: "Electronics",
    image: "",
  },
];

const mockProducts: Product[] = [
  {
    id: 1,
    title: "Red Shirt",
    price: 19.99,
    description: "A red shirt for men",
    images: ["https://example.com/shirt.jpg"],
  },
  {
    id: 2,
    title: "Blue Jeans",
    price: 49.99,
    description: "A pair of blue jeans for sale",
    images: ["https://example.com/jeans.jpg"],
  },
  {
    id: 3,
    title: "Yellow Hat",
    price: 9.99,
    description: "A yellow hat for sale",
    images: ["https://example.com/hat.jpg"],
  },
];

// Mock router for next/router
jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    pathname: "/product",
  }),
}));

// Setup MSW mock server to simulate API requests
const server = setupServer(
  rest.get("https://api.escuelajs.co/api/v1/categories", (req, res, ctx) => {
    return res(ctx.json(mockCategories));
  }),
  rest.get("https://api.escuelajs.co/api/v1/products", (req, res, ctx) => {
    return res(ctx.json(mockProducts));
  })
);

// Test lifecycle hooks
beforeAll(() => server.listen()); // Start mock server before all tests
afterAll(() => server.close()); // Stop mock server after all tests
afterEach(() => {
  server.resetHandlers(); // Reset mock server handlers after each test
  jest.clearAllMocks(); // Clear all mocks after each test
}); 

describe("ProductPage", () => {
  beforeEach(() => {
    // Mocking localStorage.getItem to simulate a token
    localStorage.setItem("access_token", "mock-token");

    // Mock the useRouter function
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      pathname: "/product",
    });
  });

  // Basic rendering tests
  describe("Basic Rendering", () => {
    it("renders the page and checks for products", async () => {
      render(
        <CartProvider> {/* Wrap in CartProvider */}
          <ProductPage productsData={mockProducts} categoriesData={mockCategories} />
        </CartProvider>
      );

      // Get only h2 elements (product titles)
      const productTitles = screen.getAllByRole("heading", { level: 2 });
      expect(productTitles).toHaveLength(mockProducts.length); // Expecting a heading for each product

      // Optionally, check the first product title (just an example)
      expect(productTitles[0]).toHaveTextContent("Red Shirt");
    });

    it("should render category names", async () => {
      render(
        <CartProvider> {/* Wrap in CartProvider */}
          <ProductPage productsData={mockProducts} categoriesData={mockCategories} />
        </CartProvider>
      );
      
      // Check that categories are rendered by name
      mockCategories.forEach((category) => {
        expect(screen.getByText(category.name)).toBeInTheDocument();
      });
    });
  });

  //Error handling tests
  describe("Error Handling", () => {
    it("should show an error message when fetching categories fails", async () => {
      server.use(
        rest.get("https://api.escuelajs.co/api/v1/categories", (req, res, ctx) => {
          return res(ctx.status(500), ctx.json({ message: "Server Error" }));
        })
      );

      render(
        <CartProvider>
          <ProductPage productsData={mockProducts} categoriesData={[]} />
        </CartProvider>
      );

      // Wait for the error to appear
      await waitFor(() => screen.getByText("Error fetching categories"));
    });

    it("should show an error message when fetching products fails", async () => {
      server.use(
        rest.get("https://api.escuelajs.co/api/v1/products", (req, res, ctx) => {
          return res(ctx.status(500), ctx.json({ message: "Server Error" }));
        })
      );

      render(
        <CartProvider>
          <ProductPage productsData={[]} categoriesData={mockCategories} />
        </CartProvider>
      );

      // Wait for the error to appear
      await waitFor(() => screen.getByText("Error fetching products"));
    });
  });

  // Authentication tests
  describe("Authentication", () => {
    it("redirects to login page if access_token is not present", () => {
      // Remove the access token to trigger the redirect
      localStorage.removeItem("access_token");

      render(
        <CartProvider>
          <ProductPage productsData={mockProducts} categoriesData={mockCategories} />
        </CartProvider>
      );

      // Check if the router push was called to redirect to login page
      expect(useRouter().push).toHaveBeenCalledWith("/auth/login");
    });
  });
});
