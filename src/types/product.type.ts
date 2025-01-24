export interface ProductType {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
    categoryId: number;
    category?: CategoryType;
}

export interface CategoryType {
    id: number;
    name: string;
    image: string;
    category: string;
}

export interface ProductPageProps {
  productsData: ProductType[];
  categoriesData: CategoryType[];
}

export interface DetailProductPageProps {
  initialProduct: ProductType | null;
  error: string | null;
}