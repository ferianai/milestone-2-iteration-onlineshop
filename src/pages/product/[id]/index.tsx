// pages/products/[id].tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
}

const ProductPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id } = router.query; // Get the product ID from the URL

  useEffect(() => {
    if (id) {
      fetchProduct(id as string); // fetch product by ID
    }
  }, [id]);

  const fetchProduct = async (productId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`https://api.escuelajs.co/api/v1/products/${productId}`);
      if (!response.ok) throw new Error("Product not found");
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      setError("Failed to fetch product");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (!product) return <div>Product not found</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">{product.title}</h1>
      <div className="text-center mb-6">
        <img src={product.images[0]} alt={product.title} className="w-full h-64 object-cover rounded-md" />
        <p className="mt-4 text-xl">${product.price}</p>
        <p className="mt-2">{product.description}</p>
      </div>

      <div className="text-center">
        <Link href="/products" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Back to Products
        </Link>
      </div>
    </div>
  );
};

export default ProductPage;
