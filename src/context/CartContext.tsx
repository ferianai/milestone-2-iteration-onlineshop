import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

// Typing the product object
interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
    quantity: number;
}

// Typing the CartContextType
interface CartContextType {
    cart: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (id: number) => void;
    updateCartQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
}

// Creating the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Custom hook to use the CartContext
export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
    };

// Typing CartProvider's props
interface CartProviderProps {
    children: ReactNode;
}

// CartProvider component to manage cart state
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cart, setCart] = useState<Product[]>([]);

  // Sync cart state with localStorage
    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
        setCart(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // Add product to cart or increment quantity if it already exists
    const addToCart = (product: Product) => {
        setCart((prevCart) => {
        const existingProduct = prevCart.find((item) => item.id === product.id);
        if (existingProduct) {
            return prevCart.map((item) =>
            item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
        }
        return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    // Remove product from cart
    const removeFromCart = (id: number) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    // Update product quantity in cart
    const updateCartQuantity = (id: number, quantity: number) => {
        setCart((prevCart) =>
        prevCart.map((item) =>
            item.id === id ? { ...item, quantity } : item
        )
        );
    };

    // Clear the cart
    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider
        value={{ cart, addToCart, removeFromCart, updateCartQuantity, clearCart }}
        >
        {children}
        </CartContext.Provider>
    );
};
