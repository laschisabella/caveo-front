import axios from "axios";
import { ProductI } from "@/types/Product";

const BASE_URL = "https://fakestoreapi.com";

export const fetchPaginatedProducts = async (
  page: number,
  limit: number
): Promise<ProductI[]> => {
  try {
    const response = await axios.get<ProductI[]>(`${BASE_URL}/products`);
    const allProducts = response.data;

    const simulatedProducts = Array(5).fill(allProducts).flat();

    const start = page * limit;
    const end = start + limit;

    return simulatedProducts.slice(start, end);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return [];
  }
};
