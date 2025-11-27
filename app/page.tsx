// import { products } from "@/api/data/product";
import { AuthButton } from "@/components/auth-button";
import ProductList from "@/components/ProductList";
import { ThemeSwitcher } from"@/components/theme-switcher";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Product } from "@/types";

export default async function Home() {
  const supabase = await createClient();
  const products2 = await supabase.from("products").select("*")
  console.log(products2);

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
      <div className="container">
        <h2>Productos</h2>
        <ProductList products={products2.data as Product[]} />
      </div>

    </main>
  );
}
