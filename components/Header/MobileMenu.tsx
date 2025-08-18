'use client';

import { useDispatch, useSelector } from 'react-redux';
import { useTranslations } from 'next-intl';
import { RootState } from '../../store';
import { toggleMobileMenu } from '../../store/slices/appSlice';
import LanguageSelector from '../LanguageSelector/LanguageSelector';

const MobileMenu = () => {
  const dispatch = useDispatch();
  const { isMobileMenuOpen } = useSelector((state: RootState) => state.app);
  const { services } = useSelector((state: RootState) => state.services);
  const t = useTranslations('header');

  if (!isMobileMenuOpen) return null;

  const closeMenu = () => {
    dispatch(toggleMobileMenu());
  };

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={closeMenu}
      ></div>

      {/* Menu Content */}
      <div className="absolute top-0 right-0 rtl:right-auto rtl:left-0 h-full w-80 max-w-[90vw] bg-amber-900 shadow-2xl transform transition-transform duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-amber-800">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3 rtl:mr-0 rtl:ml-3">
              <div className="text-amber-900 font-bold text-lg">⚖</div>
            </div>
            <div className="text-white">
              <div className="font-bold">{t('title')}</div>
              <div className="text-sm opacity-80">{t('subtitle')}</div>
            </div>
          </div>
          <button
            onClick={closeMenu}
            className="text-white hover:text-amber-200 transition-colors p-2"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <div className="flex flex-col p-6 space-y-4">
          <a
            href="/"
            onClick={closeMenu}
            className="text-white hover:text-amber-200 transition-colors font-medium py-3 border-b border-amber-800/50"
          >
            {t('home')}
          </a>

          <a
            href="#about"
            onClick={closeMenu}
            className="text-white hover:text-amber-200 transition-colors font-medium py-3 border-b border-amber-800/50"
          >
            {t('about')}
          </a>

          {/* Services Submenu */}
          <div className="border-b border-amber-800/50 pb-3">
            <div className="text-white font-medium py-3 mb-2">{t('services')}</div>
            <div className="pl-4 rtl:pl-0 rtl:pr-4 space-y-2 max-h-60 overflow-y-auto">
              {services.map((service) => (
                <a
                  key={service.documentId}
                  href={`/services/${service.slug}`}
                  onClick={closeMenu}
                  className="block text-amber-100 hover:text-white transition-colors py-2 text-sm"
                >
                  {service.title}
                </a>
              ))}
            </div>
          </div>

          <a
            href="#blog"
            onClick={closeMenu}
            className="text-white hover:text-amber-200 transition-colors font-medium py-3 border-b border-amber-800/50"
          >
            {t('blog')}
          </a>

          <a
            href="#team"
            onClick={closeMenu}
            className="text-white hover:text-amber-200 transition-colors font-medium py-3 border-b border-amber-800/50"
          >
            {t('team')}
          </a>

          <a
            href="#contact"
            onClick={closeMenu}
            className="text-white hover:text-amber-200 transition-colors font-medium py-3 border-b border-amber-800/50"
          >
            {t('contact')}
          </a>

          {/* Book Appointment Button */}
          <button
            onClick={closeMenu}
            className="w-full bg-white text-amber-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors mt-6"
          >
            {t('bookAppointment')}
          </button>

          {/* Language Selector */}
          <div className="pt-4">
            <LanguageSelector />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
