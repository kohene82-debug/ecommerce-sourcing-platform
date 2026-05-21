'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ProductCard from '@/components/common/ProductCard';
import LoadingSkeleton from '@/components/common/LoadingSkeleton';
import type { Product, SearchFilters } from '@/types/product';

export default function SearchPage() {
  const params = useParams();
  const query = params.query as string;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<SearchFilters>({});

  useEffect(() => {
    performSearch();
  }, [query, filters]);

  const performSearch = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, filters }),
      });
      const data = await res.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Search: {decodeURIComponent(query)}</h1>
      {loading ? <LoadingSkeleton /> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      )}
    </div>
  );
}