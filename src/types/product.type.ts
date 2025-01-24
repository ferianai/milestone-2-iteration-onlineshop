export interface ProductType {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
    categoryId: number;
}

export interface CategoryType {
    id: number;
    name: string;
    image: string;
}

export interface ProductPageProps {
  productsData: ProductType[];
  categoriesData: CategoryType[];
}
