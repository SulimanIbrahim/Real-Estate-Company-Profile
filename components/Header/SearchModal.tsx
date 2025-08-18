'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { toggleSearch } from '../../store/slices/appSlice';
import { setQuery, setResults, setSearchLoading } from '../../store/slices/searchSlice';
import { fetchFromStrapi, getStrapiMedia } from '../../lib/strapi';
import Image from 'next/image';

const SearchModal = () => {
  const t = useTranslations('search');
  const dispatch = useDispatch();
  const { isSearchOpen } = useSelector((state: RootState) => state.app);
  const { query, results, isLoading, hasSearched } = useSelector((state: RootState) => state.search);

  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      dispatch(setResults([]));
      return;
    }

    dispatch(setSearchLoading(true));
    
    try {
      // Search team members and services with updated structure
      const [teamData, servicesData] = await Promise.all([
        fetchFromStrapi('/team-members?populate=*&filters[name][$containsi]=' + searchQuery),
        fetchFromStrapi('/services?populate=*&filters[title][$containsi]=' + searchQuery)
      ]);

      const teamResults = teamData.data?.map((member: any) => ({
        id: member.documentId,
        title: member.name,
        type: 'team' as const,
        description: member.role,
        image: getStrapiMedia(member.image?.url),
      })) || [];

      const serviceResults = servicesData.data?.map((service: any) => ({
        id: service.documentId,
        title: service.title,
        type: 'service' as const,
        description: service.description,
        image: getStrapiMedia(service.icon?.url),
      })) || [];

      dispatch(setResults([...teamResults, ...serviceResults]));
    } catch (error) {
      console.error('Search error:', error);
      dispatch(setResults([]));
    } finally {
      dispatch(setSearchLoading(false));
    }
  };

  const handleInputChange = (value: string) => {
    dispatch(setQuery(value));
    
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeout = setTimeout(() => {
      handleSearch(value);
    }, 300);
    
    setSearchTimeout(timeout);
  };

  const teamResults = results.filter(r => r.type === 'team');
  const serviceResults = results.filter(r => r.type === 'service');

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 pt-20">
        <div className="max-w-2xl mx-auto bg-dark-gray rounded-lg shadow-2xl">
          {/* Search Input */}
          <div className="p-6 border-b border-gray-700">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder={t('placeholder')}
                className="w-full bg-dark border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-primary-brown"
                autoFocus
              />
              <button
                onClick={() => dispatch(toggleSearch())}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Search Results */}
          <div className="max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="loading-spinner mx-auto"></div>
              </div>
            ) : hasSearched && results.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                {t('no_results')}
              </div>
            ) : (
              <div className="p-4">
                {query && hasSearched && (
                  <p className="text-sm text-gray-400 mb-4">
                    {t('results_for')}: "{query}"
                  </p>
                )}

                {/* Team Results */}
                {teamResults.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-primary-brown font-semibold mb-3">{t('team_members')}</h3>
                    <div className="space-y-2">
                      {teamResults.map((result) => (
                        <div
                          key={result.id}
                          className="flex items-center p-3 rounded-lg hover:bg-dark cursor-pointer transition-colors"
                        >
                          {result.image && (
                            <Image
                              src={result.image}
                              alt={result.title}
                              width={40}
                              height={40}
                              className="rounded-full mr-3"
                              unoptimized
                            />
                          )}
                          <div>
                            <h4 className="text-white font-medium">{result.title}</h4>
                            <p className="text-gray-400 text-sm">{result.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Service Results */}
                {serviceResults.length > 0 && (
                  <div>
                    <h3 className="text-primary-brown font-semibold mb-3">{t('services')}</h3>
                    <div className="space-y-2">
                      {serviceResults.map((result) => (
                        <div
                          key={result.id}
                          className="flex items-center p-3 rounded-lg hover:bg-dark cursor-pointer transition-colors"
                        >
                          {result.image && (
                            <Image
                              src={result.image}
                              alt={result.title}
                              width={40}
                              height={40}
                              className="rounded-lg mr-3"
                              unoptimized
                            />
                          )}
                          <div>
                            <h4 className="text-white font-medium">{result.title}</h4>
                            <p className="text-gray-400 text-sm line-clamp-2">{result.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
