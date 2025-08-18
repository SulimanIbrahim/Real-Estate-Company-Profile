'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { fetchFromStrapi, getStrapiMedia } from '../../../../lib/strapi';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../../../components/Header/Header';
import Footer from '../../../../components/Footer/Footer';

interface Service {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string;
  content?: string;
  icon: {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    url: string;
  } | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export default function ServicePage() {
  const params = useParams();
  const slug = params.slug as string;
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        // Fetch specific service by slug
        const data = await fetchFromStrapi(`/services?populate=*&filters[slug][$eq]=${slug}`);
        
        if (data && data.data && data.data.length > 0) {
          setService(data.data[0]);
        } else {
          // Fallback service data based on slug
          const fallbackServices: { [key: string]: Service } = {
            // 'legal-consultation': {
            //   id: 1,
            //   documentId: 'legal-consultation',
            //   title: 'Legal Consultation Services',
            //   slug: 'legal-consultation',
            //   description: 'Law Firm is one of the leading legal offices that offer exceptional advocacy services for both individuals and companies. Our mission is to provide comprehensive and specialized legal support to meet our clients\' needs and offer the best legal solutions in various cases and legal fields, we provide our legal consultations services as a follow:',
            //   content: 'General Legal Consultations\n\nAt Law Firm, we provide comprehensive legal consultations covering all legal aspects that our clients may encounter in their daily lives or business activities. Our goal is to offer accurate legal advice based on a deep understanding of local and international laws.\n\nCorporate Legal Consultations\n\nWe at the Law Firm understand the importance of legal consultations for companies in building and enhancing their businesses.\n\nOur advisory services about:\n- Establishing and registering companies.\n- All types of contracts and agreements.\n- Commercial disputes.\n- Compliance with local and international laws and regulations.\n\nIndividual Legal Consultations\n\nLaw Firm offers customized advisory services for individuals, including:\n\n- Family issues such as divorce, alimony, and custody.\n- Real estate matters like buying, selling, and renting properties.\n- Employment issues such as hiring and wrongful termination.\n- Criminal cases and defending personal rights.\n\nAt Law Firm, we aim to provide the best legal services to ensure your rights and offer effective legal solutions. Contact us today to receive professional and comprehensive legal consultation.',
            //   icon: null,
            //   createdAt: new Date().toISOString(),
            //   updatedAt: new Date().toISOString(),
            //   publishedAt: new Date().toISOString()
            // }
          };

          setService(fallbackServices[slug] || null);
        }

      } catch (error) {
        console.error('Error fetching service:', error);
        setService(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchService();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="loading-spinner mx-auto"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Service Not Found</h1>
          <p className="text-gray-600 mb-8">The service you're looking for doesn't exist.</p>
          <Link
            href="/services"
            className="bg-primary-brown hover:bg-primary-dark-brown text-white px-6 py-3 rounded-lg transition-colors duration-300 inline-block"
          >
            View All Services
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section with Background Image */}
      <section className="relative h-96 bg-gray-900">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Legal Services"
            fill
            className="object-cover"
            priority
            unoptimized
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <div className="mb-8">
            <Link 
              href="/services"
              className="inline-flex items-center text-gray-600 hover:text-primary-brown transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </Link>
          </div>

          {/* Service Title */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {service.title}
            </h1>
          </div>

          {/* Service Content */}
          <div className="max-w-4xl">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              {/* Description */}
              <p className="text-gray-700 leading-relaxed mb-8 text-justify">
                {service.description}
              </p>

              {/* Content Sections */}
              {service.content && (
                <div className="space-y-8">
                  {service.content.split('\n\n').map((section, index) => {
                    const lines = section.split('\n');
                    const title = lines[0];
                    const content = lines.slice(1).join('\n');

                    if (title.includes('General Legal Consultations') || 
                        title.includes('Corporate Legal Consultations') || 
                        title.includes('Individual Legal Consultations')) {
                      return (
                        <div key={index} className="mb-8">
                          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                            <div className="w-3 h-3 bg-amber-900 rounded-full mr-3"></div>
                            {title}
                          </h2>
                          
                          <div className="ml-6 bg-gray-50 p-6 rounded-lg">
                            {content.split('\n').map((line, lineIndex) => {
                              if (line.startsWith('- ')) {
                                return (
                                  <div key={lineIndex} className="mb-2 text-gray-700">
                                    {line.substring(2)}
                                  </div>
                                );
                              } else if (line.trim()) {
                                return (
                                  <p key={lineIndex} className="text-gray-700 leading-relaxed mb-4 text-justify">
                                    {line}
                                  </p>
                                );
                              }
                              return null;
                            })}
                          </div>
                        </div>
                      );
                    } else if (title.includes('Our advisory services about:')) {
                      return (
                        <div key={index} className="mb-6">
                          <p className="text-gray-700 font-medium mb-4">{title}</p>
                          <div className="ml-4 space-y-2">
                            {content.split('\n').filter(line => line.startsWith('- ')).map((item, itemIndex) => (
                              <div key={itemIndex} className="text-gray-700">
                                {item.substring(2)}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <p key={index} className="text-gray-700 leading-relaxed text-justify">
                          {section}
                        </p>
                      );
                    }
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
