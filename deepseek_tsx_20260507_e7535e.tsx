import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import Toast from '@/components/common/Toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Global Sourcing AI - Smart Ecommerce Platform',
  description: 'AI-powered product sourcing from China, UK, and Germany. Get the best prices with verified suppliers.',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <Toast />
        </Providers>
      </body>
    </html>
  );
}