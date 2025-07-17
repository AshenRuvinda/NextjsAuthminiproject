import { Inter } from 'next/font/google';
import '../app/globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-inter',
});

export const metadata = {
  title: 'Auth App',
  description: 'Advanced Login and Register System with Next.js and MongoDB',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}