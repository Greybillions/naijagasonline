import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/contexts/CartContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'NaijaGasOnline | Nigeria’s No.1 Oil & Gas Marketplace',
  description:
    'Buy gas cylinders, accessories, and oil products online. NaijaGasOnline is Nigeria’s first digital marketplace for oil and gas products, offering fast delivery, top brands, and secure payments.',
  keywords: [
    'gas delivery Nigeria',
    'NaijaGasOnline',
    'oil and gas marketplace',
    'cooking gas',
    'buy gas cylinder',
    'digital gas store',
    'LPG Nigeria',
  ],
  authors: [{ name: 'NaijaGasOnline Team', url: 'https://naijagasonline.com' }],
  creator: 'NaijaGasOnline',
  metadataBase: new URL('https://naijagasonline.com'),
  openGraph: {
    title: 'NaijaGasOnline | Digital Gas Marketplace',
    description:
      'Shop gas cylinders, accessories, and more. Safe and fast delivery across Nigeria.',
    url: 'https://naijagasonline.com',
    siteName: 'NaijaGasOnline',
    images: [
      {
        url: 'https://naijagasonline.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'NaijaGasOnline - Gas Delivery in Nigeria',
      },
    ],
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NaijaGasOnline',
    description:
      'Nigeria No.1 Online Gas Marketplace. NaijaGasOnline is Nigeria&apos first digital marketplace for oil and gas products.',
    creator: '@naijagasonline', // update with your actual Twitter handle if you have
    images: ['https://naijagasonline.com/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
