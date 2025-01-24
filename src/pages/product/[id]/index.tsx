// pages/products/[id].tsx
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useCart } from "@/context/CartContext"; 
import { ProductType, DetailProductPageProps } from '@/types/product.type';

const DetailProductPage = ({ initialProduct, error }: DetailProductPageProps) => {
  const { addToCart } = useCart();

  if (error) {
    return <div className="container mx-auto p-6 text-red-500">{error}</div>;
  }

  if (!initialProduct) {
    return <div className="container mx-auto p-6">Product not found.</div>;
  }

  const handleAddToCart = (product: ProductType) => {
    const productWithQuantity = { ...product, quantity: 1 };
    addToCart(productWithQuantity);
    alert(`${product.title} has been added to your cart!`);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">{initialProduct.title}</h1>
      <div className="text-center mb-6">
        <img
          src={initialProduct.images[0] || "/fallback-image.jpg"}
          alt={initialProduct.title}
          className="w-full h-64 object-cover rounded-md"
        />
        <p className="mt-4 text-xl">${initialProduct.price}</p>
        <p className="mt-2">{initialProduct.description}</p>
      </div>

      <div className="flex justify-center gap-4 text-center mb-6">
        <button
          onClick={() => handleAddToCart(initialProduct)}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
        Add to Cart
        </button>
        <Link href="/product">
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Back to Products
          </button>
        </Link>
      </div>
    </div>
  );
};

// Fetch product server-side
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  try {
    const response = await fetch(`https://api.escuelajs.co/api/v1/products/${encodeURIComponent(id)}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch product. Status: ${response.status}`);
    }

    const product = await response.json();

    // Fix the `images` field if it contains a JSON-encoded string
    if (Array.isArray(product.images) && typeof product.images[0] === "string") {
      try {
        product.images = JSON.parse(product.images[0]);
      } catch (e) {
        console.error("Failed to parse images:", e);
        product.images = [];
      }
    }

    return {
      props: {
        initialProduct: product,
        error: null,
      },
    };
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error("Error fetching product:", errorMessage);

    return {
      props: {
        initialProduct: null,
        error: "Failed to fetch product",
      },
    };
  }
};


export default DetailProductPage;
