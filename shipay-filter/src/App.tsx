import { useMemo, useState } from "react";
import { FilterInput } from "./components/FilterInput";
import { ProductList } from "./components/ProductList";
import { filterProducts } from "./utils/filterProducts";
import { products } from "./data/products";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = useMemo(() => {
    return filterProducts(products, searchTerm);
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <main className="w-full max-w-lg rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-xl">
        <header className="flex items-baseline justify-between mb-4">
          <h1 className="text-lg font-semibold text-white">
            Produtos transacionais
          </h1>
          <span className="text-xs text-slate-400">
            {filteredProducts.length} de {products.length}
          </span>
        </header>

        <div className="mb-4">
          <FilterInput value={searchTerm} onChange={setSearchTerm} />
        </div>

        <ProductList products={filteredProducts} query={searchTerm} />
      </main>
    </div>
  );
}
