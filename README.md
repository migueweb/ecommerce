# `E-commerce` 


 A simple e-commerce application built with Next.js and Supabase, including user authentication, global state, and product browsing functionality.

Production deployment: https://ecommerce-riwi.vercel.app/

---

## Project technologies

- [Next.js](https://nextjs.org/)
- React
- TypeScript
- Supabase
- Tailwind CSS 
- PostCSS
- [shadcn](https://ui.shadcn.com/) (UI lib)
- Lucide React (icons)
- Zustand (Global state managment)

### Requeriments
+ Node >=22
+ A [supabase](https://supabase.com/) account

## Development set up
1. Install dependencies.
```
npm install
```

2. Copy `.env.example` to `.env.local`:
```
cp .env.example .env.local
```

> For local development create a new Supabase project

3. Update the following at `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
NEXT_PUBLIC_SUPABASE_ANON_KEY=[INSERT SUPABASE PROJECT API ANON KEY]
```

4. You can now run the Next.js local development server:

```bash
npm run dev
```

`Ecommerce` should now be running on [localhost:3000](http://localhost:3000/).

## Project structure

```
├── app/ # App Router (pages and API routes)
│ ├── auth/ # Authentication flows
│ │ ├── login/ # Login page
│ │ ├── sign-up/ # User registration
│ │ ├── forgot-password/ # Password recovery
│ │ └── ... # Other flows (confirmation, error, etc.)
│ ├── home/ # Home page
│ ├── layout.tsx # Root layout
│ └── page.tsx # Landing page (/)
│
├── src/
│ ├── api/ # Backend logic (e.g., user data)
│ ├── components/ # Reusable components
│ │ ├── ui/ # Primitive UI components (shadcn/ui)
│ │ ├── auth/ # Auth forms and buttons
│ │ └── ... # Other components (products, buttons, etc.)
│ ├── lib/ # Utilities and config
│ │ └── supabase/ # Supabase integration
│ └── types/ # TypeScript types (product, user)
│
├── middleware.ts # Route protection (authentication)
│
└── ... # Configuration (Tailwind, Next.js, etc.)
```

## Custom Hooks

 - useAuthStore (example location: src/store/auth-store.ts)

    Manages global authentication state using Zustand.

    Provides actions and selectors for session, login, logout, and user info.

- useProducts (example location: src/hooks/useProducts.ts)

    Fetches product lists and product details from Supabase.

    Handles loading and error states for UI consumption.

These hooks centralize business logic and make components simpler and reusable.

## Main UI Components

- Navbar (example: src/components/navbar.tsx)

    Navigation between routes, responsive behavior, and user menu.

- ProductCard (example: src/components/products/ProductCard.tsx)

    Displays product image, title, price, and quick actions (add to cart, view details).

## uthentication behaviour

- Supabase email/password authentication.

- Session persistence handled by Supabase client.

- Middleware (middleware.ts) protects pages that require authentication and redirects unauthenticated users to the login page.


## Contributors

- Miguel Amador
- Eduado Pertuz
- Jaider Rodriguez
- Dylan Sanchez
- Maria Viloria

