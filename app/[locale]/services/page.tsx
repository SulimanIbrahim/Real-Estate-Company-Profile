'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { fetchFromStrapi, getStrapiMedia } from '../../../lib/strapi';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';

interface Service {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string;
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

export default function ServicesPage() {
  const t = useTranslations('services');
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await fetchFromStrapi('/services?populate=*');
        console.log('Fetched services for page:', data.data);
        
        if (data && data.data && data.data.length > 0) {
          setServices(data.data);
        } else {
          // Fallback services data
          setServices([
            {
              id: 1,
              documentId: 'legal-consultation',
              title: 'Legal Consultation Services',
              slug: 'legal-consultation',
              description: 'Professional legal advice and consultation for individuals and businesses. Our experienced lawyers provide comprehensive guidance on various legal matters.',
              icon: null,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              publishedAt: new Date().toISOString()
            },
            {
              id: 2,
              documentId: 'foreign-investment',
              title: 'Foreign Investment Services',
              slug: 'foreign-investment',
              description: 'Expert guidance for foreign investors looking to establish business presence. We help navigate regulatory requirements and investment opportunities.',
              icon: null,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              publishedAt: new Date().toISOString()
            },
            {
              id: 3,
              documentId: 'contracts',
              title: 'Contracts',
              slug: 'contracts',
              description: 'Contract drafting, review, and negotiation services. We ensure your agreements are legally sound and protect your interests.',
              icon: null,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              publishedAt: new Date().toISOString()
            },
            {
              id: 4,
              documentId: 'corporate-governance',
              title: 'Corporate Governance Services',
              slug: 'corporate-governance',
              description: 'Comprehensive corporate governance solutions to ensure compliance and effective management structures for your organization.',
              icon: null,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              publishedAt: new Date().toISOString()
            },
            {
              id: 5,
              documentId: 'intellectual-property',
              title: 'Intellectual Property',
              slug: 'intellectual-property',
              description: 'Protection and enforcement of intellectual property rights including patents, trademarks, and copyrights.',
              icon: null,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              publishedAt: new Date().toISOString()
            },
            {
              id: 6,
              documentId: 'arbitration',
              title: 'Arbitration',
              slug: 'arbitration',
              description: 'Alternative dispute resolution services to resolve conflicts efficiently outside of traditional court proceedings.',
              icon: null,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              publishedAt: new Date().toISOString()
            }
          ]);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="loading-spinner mx-auto"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark">
      <Header />
      
      {/* Hero Section */}
      <section className="py-32 bg-gradient-to-r from-primary-brown to-primary-dark-brown">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Our Services
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Comprehensive legal services tailored to meet your needs. Our experienced team provides 
            professional guidance across various areas of law.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link
                key={service.documentId}
                href={`/services/${service.slug}`}
                className="group"
              >
                <div className="bg-dark-gray border border-gray-700 rounded-lg p-8 hover:border-primary-brown transition-all duration-300 group-hover:transform group-hover:scale-105">
                  {/* Service Icon */}
                  {service.icon ? (
                    <div className="relative w-16 h-16 mb-6">
                      <Image
                        src={getStrapiMedia(service.icon.url) || '/images/placeholder.svg'}
                        alt={service.title}
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 mb-6 bg-primary-brown/20 rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8 text-primary-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                  )}

                  {/* Service Title */}
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary-brown transition-colors">
                    {service.title}
                  </h3>

                  {/* Service Description */}
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Learn More Link */}
                  <div className="flex items-center text-primary-brown group-hover:text-primary-light-brown transition-colors">
                    <span className="font-medium">Learn More</span>
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
