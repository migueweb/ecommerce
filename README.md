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