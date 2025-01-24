// src/mocks/handlers.ts
import { rest } from 'msw';
import type { User, Product, Category } from "../types/types";

export const handlers = [
  rest.get("/api/user", (req: any, res: any, ctx: any) => {
    const mockUser: User = {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Developer",
    };

    return res(ctx.status(200), ctx.json(mockUser));
  }),
];

// src/mocks/productHandlers.ts
export const productHandlers = [
  rest.get('https://api.escuelajs.co/api/v1/products', (req: any, res: any, ctx: any) => {
    const mockProduct: Product = {
      id: 1,
      title: "Red Shirt",
      price: 19.99,
      description: "A red shirt for men",
      images: ["https://example.com/shirt.jpg"],
    };
    
    return res(ctx.status(200), ctx.json(mockProduct));
  })
];

export const categoryHandlers = [
  rest.get('https://api.escuelajs.co/api/v1/categories', (req: any, res: any, ctx: any) => {
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

    return res(ctx.status(200), ctx.json(mockCategories));  // Return an array of categories
  })
];
