import { NextRequest } from 'next/server';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
  colors: string[];
  sizes: string[];
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  try {
    // Fetch products from the public JSON file
    const response = await fetch(`${request.nextUrl.origin}/products.json`);
    const productsData: Product[] = await response.json();
    
    let filteredProducts = productsData;

    if (category && category !== 'All') {
      filteredProducts = productsData.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
    }

    return Response.json(filteredProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    return Response.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}