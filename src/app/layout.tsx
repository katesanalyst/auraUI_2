import type { Metadata, Viewport } from 'next';
import { SessionProvider } from 'next-auth/react';
import ThemeProvider from '@/components/ThemeProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Spike Admin - Next.js Dashboard',
  description: 'Spike Admin Template - Responsive, PWA-ready dashboard',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Spike Admin',
  },
  formatDetection: { telephone: false },
  openGraph: {
    type: 'website',
    siteName: 'Spike Admin',
    title: 'Spike Admin Dashboard',
    description: 'Responsive admin dashboard template',
  },
};

export const viewport: Viewport = {
  themeColor: '#0085db',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body>
        <SessionProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </SessionProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
