// import { products } from "@/api/data/product";
import { AuthButton } from "@/components/auth-button";
import { ProductsView } from "@/components/products-view";
import { ThemeSwitcher } from"@/components/theme-switcher";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Product } from "@/types";

export default async function Home() {
  const supabase = await createClient();
  const products2 = await supabase.from("products").select("*")

  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-10 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/"}>Ecommerce</Link>
            </div>
            <div className="flex gap-4">
              <AuthButton/>
              <ThemeSwitcher />
            </div>
          </div>
        </nav>        
      </div>
      <div className="px-5 w-full max-w-5xl py-5 flex flex-col gap-4">
        <h1 className="font-bold text-4xl">Products</h1>
        <ProductsView initialProducts={(products2.data as Product[]) ?? []} />
      </div>

    </main>
  );
}
