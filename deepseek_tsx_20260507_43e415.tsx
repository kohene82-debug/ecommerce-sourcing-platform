'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const handleSearch = (e: React.FormEvent) => { e.preventDefault(); if (query.trim()) router.push(`/search/${encodeURIComponent(query)}`); };
  return (
    <form onSubmit={handleSearch} className="relative">
      <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search any product..." className="w-full px-4 py-2 pl-10 rounded-lg border dark:bg-dark-200" />
      <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
    </form>
  );
}