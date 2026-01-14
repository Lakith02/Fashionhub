import { NextRequest } from 'next/server';

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
    const { deliveryAddress, paymentMethod } = await request.json();
    
    // In a real app, you would get the session/user ID here
    // For this example, we'll use a placeholder user ID
    const userId = 'default-user'; // This would be from session/auth in a real app
    
    // Get user's cart
    const userCart = carts[userId] || [];
    
    if (userCart.length === 0) {
      return Response.json({ error: 'Cart is empty' }, { status: 400 });
    }
    
    // Calculate total
    const totalAmount = userCart.reduce((sum, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      return sum + (price * item.quantity);
    }, 0);
    
    // Generate a random order ID
    const orderId = '#' + Math.floor(100000 + Math.random() * 900000).toString();
    
    // Simulate successful payment processing
    // In a real app, you would integrate with a payment provider here
    
    // Clear the user's cart after successful order
    carts[userId] = [];
    
    // Return order confirmation
    return Response.json({
      orderId,
      deliveryAddress,
      paymentMethod,
      totalAmount: `$${totalAmount.toFixed(2)}`,
      items: userCart,
      status: 'confirmed',
      message: 'Order placed successfully'
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return Response.json({ error: 'Failed to create order' }, { status: 500 });
  }
}