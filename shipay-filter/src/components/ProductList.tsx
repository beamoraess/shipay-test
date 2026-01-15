import type { ProductListProps } from "../types/product";

export function ProductList({ products, query }: ProductListProps) {
  if (products.length === 0) {
    return (
      <p className="mt-4 rounded-xl border border-dashed border-white/10 p-4 text-sm text-slate-400">
        Nenhum produto encontrado
        {query.trim() && ` para “${query.trim()}”`}.
      </p>
    );
  }

  return (
    <ul className="mt-4 space-y-2">
      {products.map((p) => (
        <li
          key={p.id}
          className="
            flex items-center justify-between
            rounded-xl border border-white/10
            bg-slate-800 px-4 py-3
            text-white
            hover:bg-slate-700 transition
          "
        >
          <span className="font-medium">{p.name}</span>
          <span className="text-xs text-slate-400">ID {p.id}</span>
        </li>
      ))}
    </ul>
  );
}
