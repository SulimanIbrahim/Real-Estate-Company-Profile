'use client';

import { useState, useEffect } from 'react';
import { fetchFromStrapi, getStrapiMedia } from '../../lib/strapi';
import Image from 'next/image';

interface Testimonial {
  id: number;
  documentId: string;
  name: string;
  position: string;
  company: string;
  testimonial: string;
  image: {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    url: string;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await fetchFromStrapi('/testimonials?populate=*');
        console.log('Fetched testimonials data:', data.data);
        
        if (data && data.data && data.data.length > 0) {
          setTestimonials(data.data);
        } else {
          // Use fallback data if Strapi returns no data
          setTestimonials([
            {
              id: 1,
              documentId: 'fallback-testimonial-1',
              name: 'Mohammed Saif',
              position: 'CEO/Company',
              company: 'Al Safar and Partners',
              testimonial: 'With the help of the hospitable staff of Al Safar and Partners I was able to get my work done without any hassle. The help I received helped me a great deal to overcome the issues that I faced. I was always updated about my case and my queries never went unanswered.',
              image: {
                id: 1,
                documentId: 'fallback-testimonial-img-1',
                name: 'avatar.png',
                alternativeText: null,
                caption: null,
                url: '/images/avatar.png'
              },
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              publishedAt: new Date().toISOString()
            },
            {
              id: 2,
              documentId: 'fallback-testimonial-2',
              name: 'Ahmed Ali',
              position: 'Director/Business',
              company: 'Tech Solutions',
              testimonial: 'Outstanding legal services with professional approach. The team provided excellent guidance throughout our business setup process. Highly recommend their expertise in corporate law.',
              image: {
                id: 2,
                documentId: 'fallback-testimonial-img-2',
                name: 'avatar.png',
                alternativeText: null,
                caption: null,
                url: '/images/avatar.png'
              },
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              publishedAt: new Date().toISOString()
            },
            {
              id: 3,
              documentId: 'fallback-testimonial-3',
              name: 'Fatima Hassan',
              position: 'Managing Partner',
              company: 'Investment Group',
              testimonial: 'Exceptional legal counsel that helped us navigate complex investment regulations. Their knowledge of local and international law is impressive.',
              image: {
                id: 3,
                documentId: 'fallback-testimonial-img-3',
                name: 'avatar.png',
                alternativeText: null,
                caption: null,
                url: '/images/avatar.png'
              },
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              publishedAt: new Date().toISOString()
            }
          ]);
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        // Fallback data when Strapi is not available
        setTestimonials([
          {
            id: 1,
            documentId: 'fallback-testimonial-1',
            name: 'Mohammed Saif',
            position: 'CEO/Company',
            company: 'Al Safar and Partners',
            testimonial: 'With the help of the hospitable staff of Al Safar and Partners I was able to get my work done without any hassle. The help I received helped me a great deal to overcome the issues that I faced. I was always updated about my case and my queries never went unanswered.',
            image: {
              id: 1,
              documentId: 'fallback-testimonial-img-1',
              name: 'avatar.png',
              alternativeText: null,
              caption: null,
              url: '/images/avatar.png'
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            publishedAt: new Date().toISOString()
          },
          {
            id: 2,
            documentId: 'fallback-testimonial-2',
            name: 'Ahmed Ali',
            position: 'Director/Business',
            company: 'Tech Solutions',
            testimonial: 'Outstanding legal services with professional approach. The team provided excellent guidance throughout our business setup process. Highly recommend their expertise in corporate law.',
            image: {
              id: 2,
              documentId: 'fallback-testimonial-img-2',
              name: 'avatar.png',
              alternativeText: null,
              caption: null,
              url: '/images/avatar.png'
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            publishedAt: new Date().toISOString()
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (loading) {
    return (
      <section className="py-20" style={{ background: 'linear-gradient(to right, #4B261547, #4B2615AD)' }}>
        <div className="container mx-auto px-4 text-center">
          <div className="loading-spinner mx-auto"></div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) return null;

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20" style={{ background: 'linear-gradient(to right, #4B261547, #4B2615AD)' }}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What our clients are saying
          </h2>
          <p className="text-lg text-white/90 max-w-3xl leading-relaxed">
            Our clients range from individual investors, to local, international as well as fortune 500 companies.
            Our clients range from individual investors, to local, international as well as fortune 500 companies.
          </p>
        </div>

        {/* Testimonial Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Client Image */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-80 h-96 rounded-lg overflow-hidden" style={{ backgroundColor: '#4B2615' }}>
              <Image
                src={getStrapiMedia(currentTestimonial.image?.url) || '/images/avatar.png'}
                alt={currentTestimonial.name || 'Client'}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>

          {/* Testimonial Text */}
          <div className="space-y-6">
            <blockquote className="text-lg md:text-xl text-white/90 leading-relaxed">
              "{currentTestimonial.testimonial}"
            </blockquote>

            {/* Client Info */}
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">
                {currentTestimonial.name}
              </h3>
              <p className="text-white/80">
                {currentTestimonial.position}
              </p>
            </div>

            {/* Navigation Arrows */}
            <div className="flex space-x-4 pt-8 justify-end">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full hover:bg-black/20 flex items-center justify-center transition-colors group"
                style={{ backgroundColor: '#4B261580' }}
              >
                <svg 
                  className="w-6 h-6 text-white group-hover:text-white/80" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center transition-colors group"
              >
                <svg 
                  className="w-6 h-6 text-amber-900 group-hover:text-amber-800" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
