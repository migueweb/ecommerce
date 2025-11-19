# `E-commerce` 

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