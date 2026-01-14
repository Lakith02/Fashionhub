This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## documentation

Test Instructions 
Target stack: 
React 19.2, Next.js 16.1, TypeScript 5.9, Tailwind CSS 4.1, CSS Grid and Flexbox 
Goal 
Build a single production quality mobile responsive Product Details flow that matches the Figma UI 
provided. Use Next.js API Routes for the minimal backend surface. This will evaluate React, Next.js, 
TypeScript, Tailwind, layout skills, and simple server integration. 
Visual reference 
Use the exact UI reference. Match layout, spacing, typography, and component behavior as closely as 
possible. 
Required deliverables 
1. Public GitHub repo with meaningful commits. 
2. README with run steps, build steps, and deployment instructions. Include any decisions or 
shortcuts. 
3. A working app locally. Deployment to Vercel or similar is optional but encouraged. 
4. Short demo screencast 1 to 3 minutes showing the product page, add to cart, and order create 
flow. 
Required features (minimal) 
Frontend 
• Product detail screen (mobile) matching the provided UI, including: product image, rounded corners, 
size selector, color swatches, price, add to cart. 
• Responsive layout that looks correct on small screens. 
• Persist selected size and color in cart items. 
API (Next.js API Routes) 
• GET /api/products — returns product list or seeded product JSON 
• GET /api/products/:id — product detail 
• POST /api/cart — add item to session backed cart or in memory store 
• POST /api/orders — create order from cart, simulate payment success and return order id 
Notes on backend and services 
• You may use an in memory store, a local JSON file, or a light DB. In memory or file based storage is 
acceptable for passing. 
• Protect cart and order routes with a simple session or mock auth. Full OAuth is not required. A seeded 
test user is fine. 
• Images may be served from public folder, repo, or any CDN. 
What we must see in the submission 
• UI visually matches the provided product details screen and is responsive. 
• Add to cart and create order flows work end to end via the API routes. 
• Code is typed with TypeScript for main models. 
• README explains how to run locally and how to seed data. Include env.example for any env vars you 
use.