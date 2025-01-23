import Link from 'next/link';
import React, { useState } from 'react';
import { useCart } from "@/context/CartContext"; 

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
    categoryId: number;
}

const ProductViews = ({ products }: { products: Product[] }) => {
    const [titleFilter, setTitleFilter] = useState('');
    const [priceMin, setPriceMin] = useState<number | null>(null);
    const [priceMax, setPriceMax] = useState<number | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const categories: any[] = []; 
    // const products: any[] = []; 
    const { addToCart } = useCart();

    const handleAddToCart = (product: Product) => {
        const productWithQuantity = { ...product, quantity: 1 };
        addToCart(productWithQuantity);
        alert(`${product.title} has been added to your cart!`);
    };

    return (
        <div>
        <h1 className="text-2xl font-bold mb-4 text-center">Products</h1>

        {/* Filter Section */}
        <div>
            <input
            type="text"
            placeholder="Filter by title"
            value={titleFilter}
            onChange={(e) => setTitleFilter(e.target.value)}
            className="p-2 border rounded mr-4"
            />
            <input
            type="number"
            placeholder="Min Price"
            value={priceMin || ""}
            onChange={(e) => setPriceMin(Number(e.target.value))}
            className="p-2 border rounded mr-4"
            />
            <input
            type="number"
            placeholder="Max Price"
            value={priceMax || ""}
            onChange={(e) => setPriceMax(Number(e.target.value))}
            className="p-2 border rounded"
            />
            <select
            value={selectedCategory || ""}
            onChange={(e) => setSelectedCategory(Number(e.target.value))}
            className="p-2 border rounded ml-4"
            >
            <option value="">All Categories</option>
            {categories.map((category) => (
                <option key={category.id} value={category.id}>
                {category.name}
                </option>
            ))}
            </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 py-4">
            {products.map((product) => (
            <div
                key={product.id}
                className="border rounded-md p-4 shadow-sm hover:shadow-lg transition"
            >
                <Link href={`/product/${product.id}`}>
                    <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-48 object-cover rounded-md hover:shadow-lg"
                    />
                    <h2 className="text-lg font-bold mt-2">{product.title}</h2>
                </Link>
                <p>Price: ${product.price}</p>
                <button
                onClick={() => handleAddToCart(product)}
                className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                Add to Cart
                </button>
            </div>
            ))}
        </div>
        </div>
    );
};

export default ProductViews;