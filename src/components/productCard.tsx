"use client"

import { FC, useState } from "react";
import { Product } from "@/types";
import { useRole } from "@/hooks/useRole";
import { UpdateProductDialog } from "./update-product-dialog";
import { useProductsStore } from "@/contexts/products-context";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { isAdmin, isLoading, isAuthenticated } = useRole();
  const deleteProduct = useProductsStore((state) => state.deleteProduct);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleDelete = () => {
    deleteProduct(product.id);
    setConfirmOpen(false);
  };
  
  return (
    <div className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition">
      {/* Imagen del producto */}
      {product.image_url && (
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      )}

      <div className="mt-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>

        <p className="text-gray-600 dark:text-gray-500">
          {product.description}
        </p>

        <p className="text-gray-900 font-bold mt-2 dark:text-gray-200">
          ${product.price}
        </p>
      </div>

      {isLoading && isAuthenticated && (
        <div className="mt-4 flex gap-2">
          <div className="h-10 w-28 rounded-md bg-gray-200 dark:bg-gray-700 animate-pulse" />
          <div className="h-10 w-24 rounded-md bg-gray-200 dark:bg-gray-700 animate-pulse" />
        </div>
      )}
      {!isLoading && isAdmin && (
        <div className="mt-4 flex gap-2">
          <UpdateProductDialog product={product} />
          <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
            <DialogTrigger asChild>
              <Button
                variant="destructive"
                className="bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:text-white dark:hover:bg-red-800"
              >
                Delete
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm deletion</DialogTitle>
                <DialogDescription>
                  This action will delete the product locally. Are you sure?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setConfirmOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  className="bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:text-white dark:hover:bg-red-800"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}

    </div>
  );
};

export default ProductCard;
