import Link from 'next/link';
import { useState } from 'react';
import { useCart } from "@/context/CartContext"; 
import { ProductType, CategoryType } from '@/types/product.type';
import { Button } from '@/components/ui/button';

const HomeViews = ({ products, categories }: { products: ProductType[], categories: CategoryType[] }) => {
    const [titleFilter, setTitleFilter] = useState('');
    const [priceMin, setPriceMin] = useState<number | null>(null);
    const [priceMax, setPriceMax] = useState<number | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const { addToCart } = useCart();

    const handleAddToCart = (product: ProductType) => {
        const productWithQuantity = { ...product, quantity: 1 };
        addToCart(productWithQuantity);
        alert(`${product.title} has been added to your cart!`);
    };

    // Filtering logic
    const filteredProducts = products.filter((product) => {
        const matchesTitle = product.title.toLowerCase().includes(titleFilter.toLowerCase());
        const matchesPrice =
            (priceMin === null || product.price >= priceMin) && 
            (priceMax === null || product.price <= priceMax);
        const matchesCategory = selectedCategory === null || product.categoryId === selectedCategory;
        return matchesTitle && matchesPrice && matchesCategory;
    });

    return (
        <div>
            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 py-4">
                {filteredProducts.length === 0 ? (
                    <p className="col-span-full text-center">No products found matching your criteria.</p>
                ) : (
                    filteredProducts.map((product) => {
                        // Find the category object based on categoryId
                        const productCategory = categories.find(category => category.id === product.categoryId);

                        return (
                            <div
                                key={product.id}
                                className="border rounded-md p-4 shadow-sm hover:shadow-lg transition"
                            >
                                <Link href={`/product/${product.id}`}>
                                    <img
                                        loading="lazy"
                                        src={
                                            product.images[0] && product.images[0].startsWith("http")
                                                ? product.images[0]
                                                : "/fallback-image.jpg"
                                        }
                                        alt={product.title || "Product image"}
                                        className="w-full h-48 object-cover rounded-md hover:shadow-lg"
                                    />
                                    <h2 className="text-lg font-bold mt-2">{product.title}</h2>
                                </Link>
                                <p>Category: {productCategory ? productCategory.name : 'Unknown'}</p>
                                <p>Price: ${product.price}</p>
                                <p>Description: {product.description || 'No description available.'}</p>
                                {/* <button
                                    onClick={() => handleAddToCart(product)}
                                    className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                >
                                    Add to Cart
                                </button> */}
                                <Button onClick={() => handleAddToCart(product)}>Add to Cart</Button>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default HomeViews;
