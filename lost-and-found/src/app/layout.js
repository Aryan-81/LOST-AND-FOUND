// src/app/layout.js
'use client'

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';
import './globals.css';

export default function RootLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === '') {
      router.push('/home');
    }
  }, [router]);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
