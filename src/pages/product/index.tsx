import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import ProductViews from "@/views/Product";

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
    categoryId: number;
}

interface Category {
    id: number;
    name: string;
    image: string;
}

const ProductPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [titleFilter, setTitleFilter] = useState<string>("");
    const [priceMin, setPriceMin] = useState<number | null>(null);
    const [priceMax, setPriceMax] = useState<number | null>(null);

    const router = useRouter();
    const { push } = useRouter();

    const fetchCategories = useCallback(async () => {
    try {
        const response = await fetch("https://api.escuelajs.co/api/v1/categories");
        if (!response.ok) throw new Error("Failed to fetch categories");

        const data = await response.json();
        setCategories(data);
        } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Error fetching categories");
        }
    }, []);

    const fetchProducts = useCallback(async () => {
        try {
        let url = "https://api.escuelajs.co/api/v1/products/?";
        const filters: string[] = [];

        if (titleFilter) filters.push(`title=${titleFilter}`);
        if (priceMin !== null) filters.push(`price_min=${priceMin}`);
        if (priceMax !== null) filters.push(`price_max=${priceMax}`);
        if (selectedCategory !== null) filters.push(`categoryId=${selectedCategory}`);

        if (filters.length > 0) url += filters.join("&");

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        setProducts(data);
        setLoading(false);
        } catch (error) {
        console.error("Error fetching products:", error);
        setError("Error fetching products");
        setLoading(false);
        }
    }, [titleFilter, priceMin, priceMax, selectedCategory]);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
        push('/auth/login');
        }
        
        fetchCategories();
        fetchProducts();
    }, [fetchCategories, fetchProducts]);



    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
      <div>
        <ProductViews products={products} />
      </div>
    )
};

export default ProductPage;
