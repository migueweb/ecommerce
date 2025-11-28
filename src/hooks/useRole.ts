"use client";

import { useEffect, useState } from "react";
import { createClient} from "@/lib/supabase/client";

export function useRole() {
  const supabase = createClient();
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    async function loadRole() {
      setIsLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setRole(null);
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      setIsAuthenticated(true);

      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .single();

      setRole(data?.role ?? null);
      setIsLoading(false);
    }

    loadRole();
  }, []);

  return {
    role,
    isAdmin: role === "admin",
    isAuthenticated,
    isLoading,
  };
}
