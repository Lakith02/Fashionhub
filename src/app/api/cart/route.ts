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

interface CartItem {
  id: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

// In-memory cart storage (would typically use a database in production)
const carts: Record<string, CartItem[]> = {};

export async function POST(request: NextRequest) {
  try {
    const { productId, selectedColor, selectedSize } = await request.json();
    
    // In a real app, you would get the session/user ID here
    // For this example, we'll use a placeholder user ID
    const userId = 'default-user'; // This would be from session/auth in a real app
    
    // Get product details from our products.json
    const productResponse = await fetch(`${request.nextUrl.origin}/products.json`);
    const productsData: Product[] = await productResponse.json();
    
    const product = productsData.find((p) => p.id === productId);
    
    if (!product) {
      return Response.json({ error: 'Product not found' }, { status: 404 });
    }
    
    // Initialize user's cart if it doesn't exist
    if (!carts[userId]) {
      carts[userId] = [];
    }
    
    // Check if product is already in cart
    const existingItemIndex = carts[userId].findIndex(item => item.id === productId);
    
    if (existingItemIndex >= 0) {
      // Update quantity if already in cart
      carts[userId][existingItemIndex].quantity += 1;
    } else {
      // Add new item to cart
      const newItem: CartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        selectedColor,
        selectedSize
      };
      
      carts[userId].push(newItem);
    }
    
    return Response.json({
      message: 'Item added to cart successfully',
      cart: carts[userId],
      itemAdded: carts[userId][existingItemIndex >= 0 ? existingItemIndex : carts[userId].length - 1]
    });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    return Response.json({ error: 'Failed to add item to cart' }, { status: 500 });
  }
}

// GET endpoint to retrieve cart contents
export async function GET(request: NextRequest) {
  try {
    // For this example, we'll use a placeholder user ID
    const userId = 'default-user'; // This would be from session/auth in a real app
    
    const userCart = carts[userId] || [];
    
    return Response.json({
      cart: userCart,
      itemCount: userCart.length,
      totalItems: userCart.reduce((sum, item) => sum + item.quantity, 0)
    });
  } catch (error) {
    console.error('Error retrieving cart:', error);
    return Response.json({ error: 'Failed to retrieve cart' }, { status: 500 });
  }
}

// DELETE endpoint to remove an item from the cart
export async function DELETE(request: NextRequest) {
  try {
    const { productId } = await request.json();
    
    // For this example, we'll use a placeholder user ID
    const userId = 'default-user'; // This would be from session/auth in a real app
    
    if (!carts[userId]) {
      return Response.json({ error: 'Cart not found' }, { status: 404 });
    }
    
    // Filter out the item to be removed
    carts[userId] = carts[userId].filter(item => item.id !== productId);
    
    return Response.json({
      message: 'Item removed from cart successfully',
      cart: carts[userId],
      itemCount: carts[userId].length,
      totalItems: carts[userId].reduce((sum, item) => sum + item.quantity, 0)
    });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    return Response.json({ error: 'Failed to remove item from cart' }, { status: 500 });
  }
}

// PUT endpoint to update item quantity in the cart
export async function PUT(request: NextRequest) {
  try {
    const { productId, quantity } = await request.json();
    
    // For this example, we'll use a placeholder user ID
    const userId = 'default-user'; // This would be from session/auth in a real app
    
    if (!carts[userId]) {
      return Response.json({ error: 'Cart not found' }, { status: 404 });
    }
    
    const itemIndex = carts[userId].findIndex(item => item.id === productId);
    
    if (itemIndex === -1) {
      return Response.json({ error: 'Item not found in cart' }, { status: 404 });
    }
    
    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      carts[userId] = carts[userId].filter(item => item.id !== productId);
    } else {
      // Update quantity
      carts[userId][itemIndex].quantity = quantity;
    }
    
    return Response.json({
      message: 'Cart updated successfully',
      cart: carts[userId],
      itemCount: carts[userId].length,
      totalItems: carts[userId].reduce((sum, item) => sum + item.quantity, 0)
    });
  } catch (error) {
    console.error('Error updating cart:', error);
    return Response.json({ error: 'Failed to update cart' }, { status: 500 });
  }
}