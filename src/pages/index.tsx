import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { ProductPageProps, ProductType, CategoryType } from "@/types/product.type";
import HomeViews from "@/views/Home";


const fetcher = (url: string) => fetch(url).then((res) => res.json());

const HomePage: React.FC<ProductPageProps> = ({ categoriesData, productsData }) => {
  const [products, setProducts] = useState<ProductType[]>(productsData || []);
  const [categories, setCategories] = useState<CategoryType[]>(categoriesData || []);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [titleFilter, setTitleFilter] = useState<string>("");
  const [priceMin, setPriceMin] = useState<number | null>(null);
  const [priceMax, setPriceMax] = useState<number | null>(null);
  const router = useRouter();

  const fetcher = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();
    
    // Parse and clean up images for each product
    if (Array.isArray(data)) {
      return data.map((product: any) => {
        if (Array.isArray(product.images)) {
          product.images = product.images.map((image: any) => {
            if (typeof image === "string" && image.trim() !== "") {
              try {
                // Check if the string is a valid JSON array
                if (image.startsWith("[") && image.endsWith("]")) {
                  const parsedImage = JSON.parse(image);
                  if (Array.isArray(parsedImage)) {
                    return parsedImage[0]; // Use the first image from the parsed array
                  }
                }
                return image; // If not a valid array, fallback to the original string
              } catch (error) {
                console.error("Error parsing image:", error);
                return image; // If parsing fails, fallback to the original string
              }
            }
            return image; // If not a string or empty, return as-is
          });
        }
        return product;
      });
    }
    return data;
  };
  

  const { data: categoriesDataSWR, error: categoriesError } = useSWR(
    "https://api.escuelajs.co/api/v1/categories",
    fetcher
  );

  const { data: productsDataSWR, error: productsError } = useSWR(
    () => {
      let url = "https://api.escuelajs.co/api/v1/products/?";
      const filters: string[] = [];
      if (titleFilter) filters.push(`title=${titleFilter}`);
      if (priceMin !== null) filters.push(`price_min=${priceMin}`);
      if (priceMax !== null) filters.push(`price_max=${priceMax}`);
      if (selectedCategory !== null) filters.push(`categoryId=${selectedCategory}`);
      if (filters.length > 0) url += filters.join("&");
      return url;
    },
    fetcher
  );

  useEffect(() => {
    if (categoriesError) {
      console.error("Error fetching categories:", categoriesError);
      setError("Error fetching categories");
    } else if (categoriesDataSWR) {
      setCategories(categoriesDataSWR);
    }
  }, [categoriesError, categoriesDataSWR]);

  useEffect(() => {
    if (productsError) {
      console.error("Error fetching products:", productsError);
      setError("Error fetching products");
      setLoading(false);
    } else if (productsDataSWR) {
      setProducts(productsDataSWR);
      setLoading(false);
    }
  }, [productsError, productsDataSWR]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Head>
        <title>ShopSmart</title>
      </Head>
      <HomeViews products={products} categories={categories} />
    </div>
  );
}

export async function getServerSideProps() {
  const categoriesRes = await fetch("https://api.escuelajs.co/api/v1/categories");
  const categoriesData = await categoriesRes.json();

  const productsRes = await fetch("https://api.escuelajs.co/api/v1/products");
  const productsData = await productsRes.json();

  // No need to parse images as JSON anymore
  const cleanedProducts = productsData.map((product: any) => {
    if (Array.isArray(product.images) && typeof product.images[0] === "string") {
      const imageString = product.images[0].trim();

      // If the image string is empty or invalid, set a fallback image
      if (!imageString) {
        product.images = ["/public/fallback-image.jpg"];
      }
    }
    return product;
  });

  return {
    props: {
      categoriesData,
      productsData: cleanedProducts,
    },
  };
}

export default HomePage

