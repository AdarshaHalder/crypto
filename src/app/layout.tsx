import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import ClientProviders from '@/components/ClientProviders';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ChadWallet — Trade Like a Chad',
  description: 'The fastest Solana trading wallet. Real-time charts, instant swaps, zero complexity.',
  openGraph: {
    title: 'ChadWallet — Trade Like a Chad',
    description: 'The fastest Solana trading wallet. Real-time charts, instant swaps, zero complexity.',
    images: ['/og.png'],
  },
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
