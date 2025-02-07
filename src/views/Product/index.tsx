import Link from 'next/link';
import { useState } from 'react';
import { useCart } from "@/context/CartContext"; 
import { ProductType, CategoryType } from '@/types/product.type';
import { Button } from '@/components/ui/button';

const ProductViews = ({ products, categories }: { products: ProductType[], categories: CategoryType[] }) => {
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
            {/* Filter Section */}
            <div className="mb-4">
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
                    {categories?.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 py-4">
                {filteredProducts.length === 0 ? (
                    <p className="col-span-full text-center">No products found matching your criteria.</p>
                ) : (
                    filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            className="flex flex-col border rounded-md p-4 shadow-sm hover:shadow-lg transition"
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
                            <p>Price: ${product.price}</p>
                            <Button onClick={() => handleAddToCart(product)} className=''> Add to Cart</Button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ProductViews;
