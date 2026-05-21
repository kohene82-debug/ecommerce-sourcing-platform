'use client';

import { ThemeProvider } from 'next-themes';
import { AuthProvider } from '@/lib/hooks/useAuth';
import { CartProvider } from '@/lib/hooks/useCart';
import { WishlistProvider } from '@/lib/hooks/useWishlist';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <PayPalScriptProvider
              options={{
                clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
                currency: 'USD',
                intent: 'capture',
              }}
            >
              {children}
            </PayPalScriptProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}