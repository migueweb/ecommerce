"use client";

import { useEffect } from "react";
import ProductList from "./ProductList";
import { Product } from "@/types";
import { useProductsStore } from "@/contexts/products-context";
import { useRole } from "@/hooks/useRole";
import { CreateProductDialog } from "./create-product-dialog";

function ProductsListContent() {
  const products = useProductsStore((state) => state.products);
  const { isAdmin } = useRole();

  return (
    <div className="flex flex-col gap-4">
      {isAdmin && (
        <div className="flex justify-end">
          <CreateProductDialog />
        </div>
      )}
      <ProductList products={products} />
    </div>
  );
}

export function ProductsView({ initialProducts }: { initialProducts: Product[] }) {
  const setInitial = useProductsStore((state) => state.setInitial);

  useEffect(() => {
    setInitial(initialProducts);
  }, [initialProducts, setInitial]);

  return (
    <ProductsListContent />
  );
}
