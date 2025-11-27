import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ProductList from "@/components/ProductList";
import { Product } from "@/types";

export default async function ProtectedPage() {
  const supabase = await createClient();
  const products2 = await supabase.from("products").select("*")
  console.log(products2);
  
  // Verificar si el usuario está autenticado
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    // Redirige al login si no está autenticado
    redirect("/auth/login");
  }

  return (
    <div >
      <div className="container">      
      <h2>Productos</h2>
        <ProductList products={products2.data as Product[]} />
      </div>
    </div>
  );
}
