import { DM_Sans } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({ 
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-dm-sans'
});

export const metadata = {
  title: 'Interview Task',
  description: 'A multilingual website built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} font-dm-sans`}>{children}</body>
    </html>
  );
}
