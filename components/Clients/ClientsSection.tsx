'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { fetchFromStrapi, getStrapiMedia } from '../../lib/strapi';
import Image from 'next/image';

interface Client {
  id: string;
  attributes: {
    name: string;
    logo: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    testimonial: string;
    website?: string;
    industry?: string;
  };
}

const ClientsSection = () => {
  const t = useTranslations('clients');
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientsData = async () => {
      try {
        const data = await fetchFromStrapi('/clients?populate=*');
        setClients(data.data || []);
      } catch (error) {
        console.error('Error fetching clients data:', error);
        // Fallback data based on the design
        setClients([
          {
            id: '1',
            attributes: {
              name: 'TechCorp Solutions',
              logo: { data: { attributes: { url: '/images/placeholder.svg' } } },
              testimonial: 'Outstanding service and exceptional results. The team delivered beyond our expectations with innovative solutions that transformed our business.',
              website: 'https://techcorp.com',
              industry: 'Technology'
            }
          },
          {
            id: '2',
            attributes: {
              name: 'Innovation Labs',
              logo: { data: { attributes: { url: '/images/placeholder.svg' } } },
              testimonial: 'Professional team that understood our vision perfectly. Their attention to detail and commitment to quality is unmatched.',
              website: 'https://innovationlabs.com',
              industry: 'Research & Development'
            }
          },
          {
            id: '3',
            attributes: {
              name: 'Global Dynamics',
              logo: { data: { attributes: { url: '/images/placeholder.svg' } } },
              testimonial: 'Reliable partner for all our digital transformation needs. They consistently deliver high-quality solutions on time and within budget.',
              website: 'https://globaldynamics.com',
              industry: 'Consulting'
            }
          },
          {
            id: '4',
            attributes: {
              name: 'Future Enterprises',
              logo: { data: { attributes: { url: '/images/placeholder.svg' } } },
              testimonial: 'Innovative approach to problem-solving. Their expertise helped us modernize our entire digital infrastructure.',
              website: 'https://futureenterprises.com',
              industry: 'Enterprise'
            }
          },
          {
            id: '5',
            attributes: {
              name: 'Digital First Co.',
              logo: { data: { attributes: { url: '/images/placeholder.svg' } } },
              testimonial: 'Exceptional creativity and technical excellence. They brought our digital vision to life with stunning results.',
              website: 'https://digitalfirst.com',
              industry: 'Digital Marketing'
            }
          },
          {
            id: '6',
            attributes: {
              name: 'StartUp Nexus',
              logo: { data: { attributes: { url: '/images/placeholder.svg' } } },
              testimonial: 'Perfect partner for scaling our business. Their scalable solutions grew with us from startup to enterprise.',
              website: 'https://startupnexus.com',
              industry: 'Startup'
            }
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchClientsData();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-dark-gray">
        <div className="container mx-auto px-4 text-center">
          <div className="loading-spinner mx-auto"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="clients" className="py-20 bg-dark-gray">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {clients.map((client) => (
            <div
              key={client.id}
              className="card-dark p-8 text-center hover:transform hover:scale-105 transition-all duration-300 group"
            >
              {/* Client Logo */}
              <div className="relative w-24 h-24 mx-auto mb-6">
                <Image
                  src={getStrapiMedia(client.attributes.logo?.data?.attributes?.url) || '/images/placeholder.svg'}
                  alt={client.attributes.name}
                  fill
                  className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>

              {/* Client Name */}
              <h3 className="text-xl font-bold text-white mb-2">
                {client.attributes.name}
              </h3>

              {/* Industry */}
              {client.attributes.industry && (
                <p className="text-primary-brown text-sm font-medium mb-4">
                  {client.attributes.industry}
                </p>
              )}

              {/* Testimonial */}
              <p className="text-gray-300 italic mb-6 leading-relaxed text-sm">
                "{client.attributes.testimonial}"
              </p>

              {/* Website Link */}
              {client.attributes.website && (
                <a
                  href={client.attributes.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary-brown hover:text-primary-light-brown transition-colors font-medium"
                >
                  Visit Website
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Client Logos Carousel */}
        <div className="mt-16 overflow-hidden">
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Trusted by Leading Brands
          </h3>
          <div className="flex space-x-12 animate-scroll">
            {[...clients, ...clients].map((client, index) => (
              <div
                key={`${client.id}-${index}`}
                className="flex-shrink-0 w-32 h-16 relative opacity-50 hover:opacity-100 transition-opacity"
              >
                <Image
                  src={getStrapiMedia(client.attributes.logo?.data?.attributes?.url) || '/images/client-logo.png'}
                  alt={client.attributes.name}
                  fill
                  className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default ClientsSection;
