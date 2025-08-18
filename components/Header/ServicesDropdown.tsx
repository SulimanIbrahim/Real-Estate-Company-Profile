'use client';

import { useSelector } from 'react-redux';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { RootState } from '../../store';

interface ServicesDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const ServicesDropdown = ({ isOpen, onClose }: ServicesDropdownProps) => {
  const { services, isLoading } = useSelector((state: RootState) => state.services);
  const params = useParams();
  const locale = params.locale as string;

  if (!isOpen) return null;

  return (
    <>
      {/* Invisible overlay to close dropdown when clicking outside */}
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
      ></div>
      
      {/* Full-width dropdown positioned from screen edge */}
      <div className="fixed top-20 left-0 right-0 w-full bg-amber-900/95 backdrop-blur-sm shadow-2xl z-50">
        <div className="container mx-auto px-4 py-8">
          {isLoading ? (
            <div className="text-center">
              <div className="loading-spinner mx-auto"></div>
              <p className="text-white mt-4">Loading services...</p>
            </div>
          ) : services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {services.map((service) => (
                <Link
                  key={service.documentId}
                  href={`/${locale}/services/${service.slug}`}
                  className="block p-4 rounded-lg hover:bg-amber-800/50 transition-all duration-300 group"
                  onClick={onClose}
                >
                  <h4 className="text-white font-semibold text-base mb-2 group-hover:text-amber-200 transition-colors">
                    {service.title}
                  </h4>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-white">No services available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ServicesDropdown;
