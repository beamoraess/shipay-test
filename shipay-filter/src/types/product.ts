export type Product = {
  id: number;
  name: string;
};

export type ProductListProps = {
  products: Product[];
  query: string;
};

export type FilterInputProps = {
  value: string;
  onChange: (value: string) => void;
};
