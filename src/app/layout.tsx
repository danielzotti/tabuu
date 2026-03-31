import type { Metadata, Viewport } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import { QueryProvider } from '@/providers/query-provider';
import { ReactNode } from 'react';
import { PWAManager } from '@/features/pwa/components/pwa-manager';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: 'Tabuu',
  description: 'Sfida i tuoi amici nel gioco di parole più divertente e frenetico.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Tabuu',
  },
  icons: {
    icon: '/icon-192x192.png',
    apple: '/icon-192x192.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#a21caf',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="it" className="dark">
      <body
        className={`${outfit.variable} font-sans antialiased bg-zinc-950 text-zinc-50 min-h-screen selection:bg-fuchsia-500/30`}
      >
        <QueryProvider>
          <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
            {/* Background ambient light */}
            <div className="absolute top-1/2 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 opacity-20 blur-[100px] bg-gradient-to-tr from-fuchsia-600 to-indigo-600 rounded-full pointer-events-none" />
            <main className="w-full max-w-md p-4">{children}</main>
            <PWAManager />
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
