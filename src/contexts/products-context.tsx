"use client";

import { create } from "zustand";
import { Product } from "@/types";

type ProductsState = {
  products: Product[];
};

type ProductsActions = {
  setInitial: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
};

export const useProductsStore = create<ProductsState & ProductsActions>(
  (set) => ({
    products: [],
    setInitial: (products) => set({ products }),
    addProduct: (product) =>
      set((state) => ({
        products: [
          ...state.products.filter((p) => p.id !== product.id),
          product,
        ],
      })),
    updateProduct: (product) =>
      set((state) => ({
        products: state.products.map((p) =>
          p.id === product.id ? { ...p, ...product } : p
        ),
      })),
    deleteProduct: (id) =>
      set((state) => ({
        products: state.products.filter((product) => product.id !== id),
      })),
  })
);
