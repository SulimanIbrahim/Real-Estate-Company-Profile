import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { ReduxProvider } from '../../components/providers/ReduxProvider';
import { Toaster } from 'react-hot-toast';
import { DM_Sans } from 'next/font/google';
import '../globals.css';

const dmSans = DM_Sans({ 
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-dm-sans'
});

const locales = ['en', 'ar'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  
  if (!locales.includes(locale as any)) notFound();

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className={`${dmSans.variable} font-dm-sans`}>
        <ReduxProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Toaster 
              position="top-right"
              toastOptions={{
                style: {
                  background: '#2a2a2a',
                  color: '#fff',
                  border: '1px solid #8B4513',
                  fontFamily: 'DM Sans, sans-serif',
                },
              }}
            />
            {children}
          </NextIntlClientProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
