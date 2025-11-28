"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useProductsStore } from "@/contexts/products-context";

type FormState = {
  sku: string;
  name: string;
  brand: string;
  quantity: string;
  price: string;
  isActive: boolean;
  category: string;
  image_url: string;
  description: string;
  tags: string;
  width: string;
  height: string;
  depth: string;
};

const textareaClassName =
  "flex min-h-[96px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const parseOptionalNumber = (value: string) => {
  if (value === "") return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

export function CreateProductDialog() {
  const addProduct = useProductsStore((state) => state.addProduct);
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initialState: FormState = useMemo(
    () => ({
      sku: "",
      name: "",
      brand: "",
      quantity: "",
      price: "",
      isActive: true,
      category: "",
      image_url: "",
      description: "",
      tags: "",
      width: "",
      height: "",
      depth: "",
    }),
    []
  );

  const [formState, setFormState] = useState<FormState>(initialState);

  const handleInputChange =
    (field: keyof FormState) =>
    (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void => {
      setFormState((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const resetForm = () => {
    setFormState(initialState);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const tags = formState.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

      const dimensions = {
        width: parseOptionalNumber(formState.width),
        height: parseOptionalNumber(formState.height),
        depth: parseOptionalNumber(formState.depth),
      };

      const payload: Product = {
        id: Date.now(),
        sku: formState.sku.trim(),
        name: formState.name.trim(),
        brand: formState.brand.trim(),
        quantity: Number(formState.quantity) || 0,
        price: Number(formState.price) || 0,
        isActive: formState.isActive,
        category: formState.category.trim(),
        image_url: formState.image_url.trim(),
        description: formState.description.trim() || undefined,
        tags: tags.length ? tags : undefined,
        dimensions:
          Object.values(dimensions).some((value) => value !== undefined)
            ? dimensions
            : undefined,
        createdAt: new Date(),
      };

      addProduct(payload);
      setOpen(false);
      resetForm();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unexpected error creating product";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">New product</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create product</DialogTitle>
          <DialogDescription>
            Add a new product locally. This does not persist to the server.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formState.name}
                onChange={handleInputChange("name")}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sku">SKU</Label>
              <Input
                id="sku"
                value={formState.sku}
                onChange={handleInputChange("sku")}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="brand">Brand</Label>
              <Input
                id="brand"
                value={formState.brand}
                onChange={handleInputChange("brand")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={formState.category}
                onChange={handleInputChange("category")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formState.price}
                onChange={handleInputChange("price")}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="0"
                value={formState.quantity}
                onChange={handleInputChange("quantity")}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image_url">Image URL</Label>
              <Input
                id="image_url"
                value={formState.image_url}
                onChange={handleInputChange("image_url")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                value={formState.tags}
                placeholder="comma,separated,tags"
                onChange={handleInputChange("tags")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                type="number"
                min="0"
                step="0.01"
                value={formState.width}
                onChange={handleInputChange("width")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                type="number"
                min="0"
                step="0.01"
                value={formState.height}
                onChange={handleInputChange("height")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="depth">Depth</Label>
              <Input
                id="depth"
                type="number"
                min="0"
                step="0.01"
                value={formState.depth}
                onChange={handleInputChange("depth")}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isActive"
                checked={formState.isActive}
                onCheckedChange={(checked) =>
                  setFormState((prev) => ({
                    ...prev,
                    isActive: Boolean(checked),
                  }))
                }
              />
              <Label htmlFor="isActive" className="leading-none">
                Active product
              </Label>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              className={textareaClassName}
              value={formState.description}
              onChange={handleInputChange("description")}
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
