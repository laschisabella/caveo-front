import { ProductI } from "@/types/Product";
import apiClient from "./api/fakeStoreApi";

export const fetchPaginatedProducts = async (
  page: number,
  limit: number
): Promise<ProductI[]> => {
  const response = await apiClient.get<ProductI[]>("/products");
  const allProducts = response.data;

  // Duplicar os produtos para simular mais itens
  const simulatedProducts = Array(5) // Multiplica por 5 (100 produtos no total)
    .fill(allProducts)
    .flat();

  // Aplicar lógica de paginação manual
  const start = page * limit;
  const end = start + limit;

  return simulatedProducts.slice(start, end);
};
