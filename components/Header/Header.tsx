'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { toggleSearch, toggleMobileMenu } from '../../store/slices/appSlice';
import { fetchServices } from '../../store/slices/servicesSlice';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import SearchModal from './SearchModal';
import ServicesDropdown from './ServicesDropdown';
import MobileMenu from './MobileMenu';
import Image from 'next/image';

const Header = () => {
  const t = useTranslations('header');
  const dispatch = useDispatch<AppDispatch>();
  const { isMobileMenuOpen } = useSelector((state: RootState) => state.app);
  const { isLoaded } = useSelector((state: RootState) => state.services);
  
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch services once when component mounts
  useEffect(() => {
    if (!isLoaded) {
      dispatch(fetchServices());
    }
  }, [dispatch, isLoaded]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100); // Change background after 100px scroll
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleServicesMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsServicesOpen(true);
  };

  const handleServicesMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 200);
  };

  const handleDropdownMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleDropdownMouseLeave = () => {
    setIsServicesOpen(false);
  };

  const closeServicesDropdown = () => {
    setIsServicesOpen(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-amber-900/95 backdrop-blur-md shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="flex items-center">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-lg flex items-center justify-center mr-3">
                  <div className="text-amber-900 font-bold text-lg lg:text-xl">⚖</div>
                </div>
                <div className="text-white">
                  <div className="text-base lg:text-lg font-bold">{t('title')}</div>
                  <div className="text-xs lg:text-sm opacity-80">{t('subtitle')}</div>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 rtl:space-x-reverse">
              <a href="/" className="text-white hover:text-amber-200 transition-colors font-medium text-sm lg:text-base">
                {t('home')}
              </a>
              
              <a href="#about" className="text-white hover:text-amber-200 transition-colors font-medium text-sm lg:text-base">
                {t('about')}
              </a>
              
              <div 
                ref={servicesRef}
                className="relative"
                onMouseEnter={handleServicesMouseEnter}
                onMouseLeave={handleServicesMouseLeave}
              >
                <button 
                  className="text-white hover:text-amber-200 transition-colors flex items-center font-medium text-sm lg:text-base"
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                >
                  {t('services')}
                  <svg 
                    className={`w-4 h-4 ml-1 rtl:ml-0 rtl:mr-1 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div
                  onMouseEnter={handleDropdownMouseEnter}
                  onMouseLeave={handleDropdownMouseLeave}
                >
                  <ServicesDropdown 
                    isOpen={isServicesOpen} 
                    onClose={closeServicesDropdown}
                  />
                </div>
              </div>

              <a href="#blog" className="text-white hover:text-amber-200 transition-colors font-medium text-sm lg:text-base">
                {t('blog')}
              </a>
              
              <a href="#team" className="text-white hover:text-amber-200 transition-colors font-medium text-sm lg:text-base">
                {t('team')}
              </a>
              
              <a href="#contact" className="text-white hover:text-amber-200 transition-colors font-medium text-sm lg:text-base">
                {t('contact')}
              </a>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2 lg:space-x-4 rtl:space-x-reverse">
              {/* Search Button */}
              <button
                onClick={() => dispatch(toggleSearch())}
                className="text-white hover:text-amber-200 transition-colors p-2"
                aria-label={t('search')}
              >
                <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Book Appointment Button - Hidden on mobile */}
              <button className="hidden sm:block bg-transparent border border-white text-white px-3 lg:px-6 py-2 rounded hover:bg-white hover:text-black transition-all duration-300 font-medium text-xs lg:text-base">
                {t('bookAppointment')}
              </button>

              {/* Language Selector */}
              <LanguageSelector />

              {/* Mobile Menu Button */}
              <button
                onClick={() => dispatch(toggleMobileMenu())}
                className="md:hidden text-white hover:text-amber-200 transition-colors p-2"
                aria-label={t('menu')}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal />
      
      {/* Mobile Menu */}
      <MobileMenu />
    </>
  );
};

export default Header;
