import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProductsView } from "@/components/products-view";
import { Product } from "@/types";

export default async function ProtectedPage() {
  const supabase = await createClient();
  const products2 = await supabase.from("products").select("*")
  
  // Verificar si el usuario está autenticado
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    // Redirige al login si no está autenticado
    redirect("/auth/login");
  }

  return (
    <div >
      <div className="px-5 w-full max-w-5xl py-5 flex flex-col gap-4">      
        <h1 className="font-bold text-4xl">Products</h1>
        <ProductsView initialProducts={(products2.data as Product[]) ?? []} />
      </div>
    </div>
  );
}
