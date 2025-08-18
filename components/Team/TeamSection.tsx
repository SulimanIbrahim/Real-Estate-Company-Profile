'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { fetchFromStrapi, getStrapiMedia } from '../../lib/strapi';
import Image from 'next/image';

interface TeamMember {
  id: number;
  documentId: string;
  name: string;
  role: string;
  bio: string;
  image: {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    url: string;
  };
  social_links?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  } | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

const TeamSection = () => {
  const t = useTranslations('team');
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const data = await fetchFromStrapi('/team-members?populate=*');
        console.log('Fetched team data:', data.data);
        
        if (data && data.data && data.data.length > 0) {
          setMembers(data.data);
        } else {
          // Use fallback data if Strapi returns no data
          setMembers([
            {
              id: 1,
              documentId: 'fallback-1',
              name: 'Name Here 1',
              role: 'POSITION HERE',
              bio: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
              image: {
                id: 1,
                documentId: 'fallback-img-1',
                name: 'avatar.png',
                alternativeText: null,
                caption: null,
                url: '/images/avatar.png'
              },
              social_links: { linkedin: '#', github: '#' },
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              publishedAt: new Date().toISOString()
            },
            {
              id: 2,
              documentId: 'fallback-2',
              name: 'Name Here 2',
              role: 'POSITION HERE',
              bio: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
              image: {
                id: 2,
                documentId: 'fallback-img-2',
                name: 'avatar.png',
                alternativeText: null,
                caption: null,
                url: '/images/avatar.png'
              },
              social_links: { linkedin: '#', twitter: '#' },
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              publishedAt: new Date().toISOString()
            },
            {
              id: 3,
              documentId: 'fallback-3',
              name: 'Name Here 3',
              role: 'POSITION HERE',
              bio: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
              image: {
                id: 3,
                documentId: 'fallback-img-3',
                name: 'avatar.png',
                alternativeText: null,
                caption: null,
                url: '/images/avatar.png'
              },
              social_links: { linkedin: '#' },
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              publishedAt: new Date().toISOString()
            }
          ]);
        }
      } catch (error) {
        console.error('Error fetching team data:', error);
        // Fallback data when Strapi is not available
        setMembers([
          {
            id: 1,
            documentId: 'fallback-1',
            name: 'Name Here 1',
            role: 'POSITION HERE',
            bio: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            image: {
              id: 1,
              documentId: 'fallback-img-1',
              name: 'avatar.png',
              alternativeText: null,
              caption: null,
              url: '/images/avatar.png'
            },
            social_links: { linkedin: '#', github: '#' },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            publishedAt: new Date().toISOString()
          },
          {
            id: 2,
            documentId: 'fallback-2',
            name: 'Name Here 2',
            role: 'POSITION HERE',
            bio: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            image: {
              id: 2,
              documentId: 'fallback-img-2',
              name: 'avatar.png',
              alternativeText: null,
              caption: null,
              url: '/images/avatar.png'
            },
            social_links: { linkedin: '#', twitter: '#' },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            publishedAt: new Date().toISOString()
          },
          {
            id: 3,
            documentId: 'fallback-3',
            name: 'Name Here 3',
            role: 'POSITION HERE',
            bio: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            image: {
              id: 3,
              documentId: 'fallback-img-3',
              name: 'avatar.png',
              alternativeText: null,
              caption: null,
              url: '/images/avatar.png'
            },
            social_links: { linkedin: '#' },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            publishedAt: new Date().toISOString()
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  const nextSlide = () => {
    if (currentIndex < members.length - 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <div className="loading-spinner mx-auto"></div>
        </div>
      </section>
    );
  }

  if (!members || members.length === 0) {
    return (
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">No team members found.</p>
        </div>
      </section>
    );
  }

  const visibleMembers = members.slice(currentIndex, currentIndex + 3);

  return (
    <section id="team" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-brown mb-4">
            Our Team
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum 
            has been the industry's standard dummy text ever since the 1500s
          </p>
        </div>

        {/* Team Cards Container */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all ${
              currentIndex === 0 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-gray-50 hover:shadow-xl'
            }`}
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            disabled={currentIndex >= members.length - 3}
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all ${
              currentIndex >= members.length - 3 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-gray-50 hover:shadow-xl'
            }`}
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Team Grid */}
          <div className="mx-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {visibleMembers.map((member) => {
                // Safety check for member structure
                if (!member) {
                  return null;
                }

                return (
                  <div
                    key={member.documentId}
                    className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    {/* Member Image */}
                    <div className="bg-[#643F2E] relative h-80 overflow-hidden">
                      <Image
                        src={getStrapiMedia(member.image?.url) || '/images/avatar.png'}
                        alt={member.name || 'Team Member'}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        unoptimized
                      />
                    </div>

                    {/* Member Info */}
                    <div className="p-6 text-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {member.name || 'Name Here'}
                      </h3>
                      
                      <p className="text-gray-500 font-medium mb-4 uppercase tracking-wide text-sm">
                        {member.role || 'POSITION HERE'}
                      </p>

                      {/* Contact Icons */}
                      <div className="flex justify-center space-x-4">
                        {/* WhatsApp */}
                        <a
                          href={member.social_links?.linkedin || "#"}
                          className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-green-100 transition-colors group"
                        >
                          <svg className="w-5 h-5 text-gray-600 group-hover:text-green-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.351"/>
                          </svg>
                        </a>

                        {/* Phone */}
                        <a
                          href="#"
                          className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors group"
                        >
                          <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </a>

                        {/* Email */}
                        <a
                          href={member.social_links?.github || "#"}
                          className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-red-100 transition-colors group"
                        >
                          <svg className="w-5 h-5 text-gray-600 group-hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
