// src/components/ui/ProductCard.tsx

import { Product } from "../../src/types";
import { FC } from "react";

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
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

        <p className="text-gray-600">{product.description}</p>

        <p className="text-gray-900 font-bold mt-2">${product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
