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

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    // Use the extracted product ID from params
    // Fetch products from the public JSON file
    const response = await fetch(`${request.nextUrl.origin}/products.json`);
    const productsData: Product[] = await response.json();
    
    // Find the specific product
    const product = productsData.find(p => p.id === id);
    
    if (!product) {
      return Response.json({ error: 'Product not found' }, { status: 404 });
    }

    return Response.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return Response.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}