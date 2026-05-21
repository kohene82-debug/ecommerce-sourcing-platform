'use client';
import { useState } from 'react';
import { useCart } from '@/lib/hooks/useCart';
import { StripePayment } from '@/components/checkout/StripePayment';
import { useAuth } from '@/lib/hooks/useAuth';

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [orderId, setOrderId] = useState<string | null>(null);

  const createOrder = async () => {
    const res = await fetch('/api/orders/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user?.uid, items: cart, total: totalPrice }),
    });
    const data = await res.json();
    setOrderId(data.orderId);
    return data.orderId;
  };

  if (!orderId) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <button onClick={createOrder} className="w-full bg-primary-600 text-white py-3 rounded-lg">Proceed to Payment</button>
      </div>
    );
  }

  return <StripePayment amount={totalPrice} orderId={orderId} onSuccess={() => { clearCart(); window.location.href = '/orders'; }} />;
}