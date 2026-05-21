'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '@/lib/hooks/useCart';
import { useWishlist } from '@/lib/hooks/useWishlist';
import type { Product } from '@/types/product';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative aspect-square">
          <Image src={product.images[0]} alt={product.name} fill className="object-cover rounded-xl" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-3xl text-primary-600 font-bold">${product.finalPrice}</span>
            <span className="text-gray-500 line-through">${product.marketAveragePrice}</span>
            <span className="text-green-600">Save {product.savingsPercentage}%</span>
          </div>
          <div className="mb-4">
            <span className="font-semibold">Supplier:</span> {product.supplierName}
            {product.supplierVerified && <span className="ml-2 text-green-600">✓ Verified</span>}
          </div>
          <div className="mb-4">
            <label className="block mb-2">Quantity</label>
            <input type="number" min="1" value={quantity} onChange={e => setQuantity(parseInt(e.target.value))} className="w-24 px-3 py-2 border rounded" />
          </div>
          <div className="flex gap-4">
            <button onClick={() => addToCart(product, quantity)} className="flex-1 bg-primary-600 text-white py-3 rounded-lg font-semibold">Add to Cart</button>
            <button onClick={() => addToWishlist(product)} className="px-6 py-3 border rounded-lg">❤️ Wishlist</button>
          </div>
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Product Details</h3>
            <p className="text-gray-600">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}