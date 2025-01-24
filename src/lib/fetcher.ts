// lib/fetcher.ts

export const fetcher = async (url: string) => {
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
  