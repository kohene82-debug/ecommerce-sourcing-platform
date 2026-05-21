'use client';
import Link from 'next/link';
import { useAuth } from '@/lib/hooks/useAuth';
import { useCart } from '@/lib/hooks/useCart';
import { useWishlist } from '@/lib/hooks/useWishlist';
import { useTheme } from 'next-themes';
import { ShoppingCartIcon, HeartIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const { totalItems } = useCart();
  const { wishlist } = useWishlist();
  const { theme, setTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-dark-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        <Link href="/" className="text-xl font-bold text-primary-600">GlobalSourcing</Link>
        <div className="flex items-center gap-4">
          <Link href="/search">Search</Link>
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </button>
          <Link href="/wishlist" className="relative"><HeartIcon className="h-6 w-6" />{wishlist.length>0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{wishlist.length}</span>}</Link>
          <Link href="/cart" className="relative"><ShoppingCartIcon className="h-6 w-6" />{totalItems>0 && <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{totalItems}</span>}</Link>
          {user ? <button onClick={signOut}>Sign Out</button> : <Link href="/login">Sign In</Link>}
        </div>
      </div>
    </nav>
  );
}