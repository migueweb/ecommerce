import { createClient } from "@/lib/supabase/server";
import { updateSession } from "./src/lib/supabase/middleware";

import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  //return await updateSession(request);
  
  
  const response = await updateSession(request);

  if(request.nextUrl.pathname === "/" || request.nextUrl.pathname.startsWith("/auth")) {
    const supabase = await createClient();
    
    const { data, error } = await supabase.auth.getClaims();

    if (error) {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }

    // when the user has an active session redirect to an especif route (optional)
    // if (data?.claims) {
    //   return NextResponse.redirect(new URL("/optional", request.url))
    // }
  }
  

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    "/auth/:path*",
  ],
};
