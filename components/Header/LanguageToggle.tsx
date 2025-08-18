'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useDispatch } from 'react-redux';
import { setLanguage } from '../../store/slices/appSlice';

const LanguageToggle = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const dispatch = useDispatch();

  const handleLanguageChange = (newLocale: 'en' | 'ar') => {
    dispatch(setLanguage(newLocale));
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div className="flex items-center bg-dark-gray rounded-lg p-1">
      <button
        onClick={() => handleLanguageChange('en')}
        className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
          locale === 'en'
            ? 'bg-primary-brown text-white'
            : 'text-gray-300 hover:text-white'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => handleLanguageChange('ar')}
        className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
          locale === 'ar'
            ? 'bg-primary-brown text-white'
            : 'text-gray-300 hover:text-white'
        }`}
      >
        عربي
      </button>
    </div>
  );
};

export default LanguageToggle;
