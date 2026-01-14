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

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Extract the product ID from the URL
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/');
    const productId = pathParts[pathParts.length - 1]; // Get the last part of the path
    
    // Fetch products from the public JSON file
    const response = await fetch(`${url.origin}/products.json`);
    const productsData: Product[] = await response.json();
    
    // Find the specific product
    const product = productsData.find(p => p.id === productId);
    
    if (!product) {
      return Response.json({ error: 'Product not found' }, { status: 404 });
    }

    return Response.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return Response.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}