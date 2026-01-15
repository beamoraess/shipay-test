import type { FilterInputProps } from "../types/product";

export function FilterInput({ value, onChange }: FilterInputProps) {
  return (
    <div className="space-y-2">
      <label htmlFor="product-filter" className="text-sm text-slate-400">
        Filtrar produtos
      </label>

      <input
        id="product-filter"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Digite para filtrar"
        className="
          w-full rounded-xl border border-white/10
          bg-slate-800 px-3 py-2
          text-white placeholder:text-slate-500
          focus:outline-none focus:ring-2 focus:ring-indigo-500
        "
      />
    </div>
  );
}
