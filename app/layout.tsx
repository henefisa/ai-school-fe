import type React from 'react';
import type { Metadata } from 'next';
import { ReactQueryClientProvider } from '@/components/react-query-client-provider';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { StoreProvider } from '@/zustand/store';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EduManage - School Management System',
  description: 'A comprehensive platform for school management',
  generator: 'v0.dev',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang='en'>
        <body className={inter.className}>
          <StoreProvider>{children}</StoreProvider>
          <Toaster />
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
