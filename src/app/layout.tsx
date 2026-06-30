import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import Navbar from '@/components/Navbar';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PPOB Enterprise - Platform Pembayaran Otomatis',
  description: 'Website PPOB Enterprise dengan UI Premium seperti DANA',
  generator: 'Next.js',
  keywords: [
    'PPOB',
    'pembayaran',
    'pulsa',
    'listrik',
    'internet',
    'reseller',
    'affiliate',
  ],
  authors: [{ name: 'Abdika Pratama' }],
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://ppob-enterprise.com',
    siteName: 'PPOB Enterprise',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <SessionProvider>
          <Navbar />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
