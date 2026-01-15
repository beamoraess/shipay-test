import type { Product } from "../types/product";
export function filterProducts(
  products: Product[],
  searchTerm: string
): Product[] {
  const query = searchTerm.trim().toLowerCase();

  if (!query) return products;

  return products.filter((product) =>
    product.name.toLowerCase().includes(query)
  );
}
