import type { Metadata } from 'next';
import { Poppins, Luckiest_Guy } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'PlaySafe',
  description: 'Personalized AI-driven sports injury prevention and performance optimization for young athletes.',
};

const fontBody = Poppins({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
});

const fontHeadline = Luckiest_Guy({
  subsets: ['latin'],
  variable: '--font-headline',
  weight: '400',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("font-body antialiased", fontBody.variable, fontHeadline.variable)}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
