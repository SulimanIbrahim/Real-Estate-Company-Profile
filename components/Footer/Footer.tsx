'use client';

import { useTranslations } from 'next-intl';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { postToStrapi } from '../../lib/strapi';
import toast from 'react-hot-toast';
import { useState } from 'react';

const Footer = () => {
  const t = useTranslations('footer');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subscriptionSchema = Yup.object({
    email: Yup.string()
      .email(t('emailInvalid') || 'Invalid email address')
      .required(t('emailRequired') || 'Email is required'),
  });

  const handleSubscription = async (values: { email: string }, { setSubmitting, resetForm, setFieldError }: any) => {
    if (isSubmitting) return; // Prevent double submission
    
    setIsSubmitting(true);
    setSubmitting(true);

    try {
      // Check if email already exists
      const existingSubscriber = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/subscribers?filters[email][$eq]=${values.email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (existingSubscriber.ok) {
        const data = await existingSubscriber.json();
        if (data.data && data.data.length > 0) {
          setFieldError('email', t('emailExists') || 'Email already subscribed');
          toast.error(t('emailExists') || 'Email already subscribed');
          return;
        }
      }

      // Subscribe new email
      await postToStrapi('/subscribers', {
        data: {
          email: values.email,
          subscribed_at: new Date().toISOString(),
        }
      });
      
      toast.success(t('subscribeSuccess') || 'Successfully subscribed!');
      resetForm();
    } catch (error: any) {
      console.error('Subscription error:', error);
      
      let errorMessage = t('subscribeError') || 'Subscription failed. Please try again.';
      
      if (error.response?.status === 400) {
        errorMessage = t('emailExists') || 'Email already subscribed.';
      } else if (error.response?.status === 500) {
        errorMessage = t('serverError') || 'Server error. Please try again later.';
      } else if (!navigator.onLine) {
        errorMessage = t('networkError') || 'Network error. Please check your connection.';
      }
      
      toast.error(errorMessage);
      setFieldError('email', errorMessage);
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  return (
    <footer className="font-dm-sans" style={{ background: 'linear-gradient(to right, #4B261547, #4B2615AD)' }}>
      {/* Newsletter and Social Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          
          {/* Newsletter Subscription */}
          <div className="flex items-center mb-4 md:mb-0 w-full md:w-auto">
            <Formik
              initialValues={{ email: '' }}
              validationSchema={subscriptionSchema}
              onSubmit={handleSubscription}
            >
              {({ isSubmitting: formSubmitting, errors, touched }) => (
                <Form className="flex items-center w-full md:w-auto">
                  <div className="flex flex-col md:flex-row items-start md:items-center w-full md:w-auto">
                    <div className="flex w-full md:w-auto">
                      <Field
                        type="email"
                        name="email"
                        placeholder={t('emailPlaceholder') || 'Email'}
                        disabled={isSubmitting || formSubmitting}
                        className="px-4 py-2 rounded-l-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none font-dm-sans border-r-0 w-full md:w-auto disabled:opacity-50"
                      />
                      <button
                        type="submit"
                        disabled={isSubmitting || formSubmitting}
                        className="bg-amber-900 hover:bg-amber-800 text-white px-6 py-2 rounded-r-lg transition-colors duration-300 font-dm-sans font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                        style={{ backgroundColor: '#4B2615' }}
                      >
                        {isSubmitting || formSubmitting ? (
                          <>
                            <div className="loading-spinner w-4 h-4 mr-2"></div>
                            {t('subscribing') || 'Subscribing...'}
                          </>
                        ) : (
                          t('subscribe') || 'Subscribe'
                        )}
                      </button>
                    </div>
                    {errors.email && touched.email && (
                      <p className="text-red-300 text-sm mt-2 md:mt-0 md:ml-2">{errors.email}</p>
                    )}
                  </div>
                </Form>
              )}
            </Formik>
          </div>

          {/* Social Links and Contacts */}
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <span className="text-white font-dm-sans">{t('contacts')}</span>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4 rtl:space-x-reverse">
              {/* Twitter */}
              <a 
                href="#" 
                className="text-white hover:text-white/80 transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a 
                href="#" 
                className="text-white hover:text-white/80 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* Google+ */}
              <a 
                href="#" 
                className="text-white hover:text-white/80 transition-colors"
                aria-label="Google Plus"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.635 10.909v2.619h4.187c-.171 1.125-.841 2.08-1.799 2.72v2.256h2.911c1.704-1.558 2.686-3.856 2.686-6.575 0-.635-.057-1.247-.164-1.836l-5.621-.184zm0 0"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Separator Line */}
      <div className="border-t border-white/20"></div>

      {/* Navigation Links Section */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          
          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center md:justify-start items-center space-x-8 rtl:space-x-reverse mb-4 md:mb-0">
            <a href="#about" className="text-white hover:text-white/80 transition-colors font-dm-sans">
              {t('about')}
            </a>
            <a href="#strategy" className="text-white hover:text-white/80 transition-colors font-dm-sans">
              {t('strategy')}
            </a>
            <a href="#advantages" className="text-white hover:text-white/80 transition-colors font-dm-sans">
              {t('advantages')}
            </a>
            <a href="#social-responsibility" className="text-white hover:text-white/80 transition-colors font-dm-sans">
              {t('socialResponsibility')}
            </a>
            <a href="#services" className="text-white hover:text-white/80 transition-colors font-dm-sans">
              {t('services')}
            </a>
          </div>

          {/* Copyright */}
          <div>
            <p className="text-white/80 text-sm font-dm-sans">
              {t('copyright')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
