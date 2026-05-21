'use client';
import { useCart } from '@/lib/hooks/useCart';
import Link from 'next/link';
import Image from 'next/image';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();
  if (cart.length === 0) {
    return <div className="text-center py-12">Your cart is empty. <Link href="/search" className="text-primary-600">Start shopping</Link></div>;
  }
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item.product.id} className="flex gap-4 p-4 border rounded-lg">
              <div className="relative w-24 h-24"><Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover rounded" /></div>
              <div className="flex-1"><h3 className="font-semibold">{item.product.name}</h3><p>${item.product.finalPrice}</p></div>
              <input type="number" value={item.quantity} onChange={e => updateQuantity(item.product.id, parseInt(e.target.value))} className="w-20 border rounded px-2" />
              <button onClick={() => removeFromCart(item.product.id)} className="text-red-500">Remove</button>
            </div>
          ))}
        </div>
        <div className="bg-gray-50 dark:bg-dark-200 p-6 rounded-lg h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2"><span>Subtotal</span><span>${totalPrice.toFixed(2)}</span></div>
          <div className="flex justify-between mb-2"><span>Shipping</span><span>Calculated at checkout</span></div>
          <div className="border-t pt-2 mt-2"><div className="flex justify-between font-bold"><span>Total</span><span>${totalPrice.toFixed(2)}</span></div></div>
          <Link href="/checkout" className="block text-center mt-4 bg-primary-600 text-white py-3 rounded-lg">Proceed to Checkout</Link>
        </div>
      </div>
    </div>
  );
}