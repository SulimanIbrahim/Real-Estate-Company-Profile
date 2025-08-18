'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { fetchVideos } from '../../store/slices/videosSlice';
import { getStrapiMedia } from '../../lib/strapi';
import Image from 'next/image';

const HeroSection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { videos, isLoading, isLoaded } = useSelector((state: RootState) => state.videos);
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  // Fetch videos once when component mounts
  useEffect(() => {
    if (!isLoaded) {
      dispatch(fetchVideos());
    }
  }, [dispatch, isLoaded]);

  // Auto-play slides - cycle through videos and their media
  useEffect(() => {
    if (videos.length > 0) {
      const interval = setInterval(() => {
        const currentVideo = videos[currentSlide];
        const maxMediaIndex = currentVideo.background.length - 1;
        
        if (currentMediaIndex < maxMediaIndex) {
          // Move to next media in current video
          setCurrentMediaIndex(prev => prev + 1);
        } else {
          // Move to next video and reset media index
          setCurrentSlide((prev) => (prev + 1) % videos.length);
          setCurrentMediaIndex(0);
        }
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(interval);
    }
  }, [videos.length, currentSlide, currentMediaIndex]);

  const handleSlideChange = (videoIndex: number) => {
    setCurrentSlide(videoIndex);
    setCurrentMediaIndex(0); // Reset to first media when changing video
  };

  const nextSlide = () => {
    if (videos.length > 0) {
      const currentVideo = videos[currentSlide];
      const maxMediaIndex = currentVideo.background.length - 1;
      
      if (currentMediaIndex < maxMediaIndex) {
        setCurrentMediaIndex(prev => prev + 1);
      } else {
        setCurrentSlide((prev) => (prev + 1) % videos.length);
        setCurrentMediaIndex(0);
      }
    }
  };

  const prevSlide = () => {
    if (videos.length > 0) {
      if (currentMediaIndex > 0) {
        setCurrentMediaIndex(prev => prev - 1);
      } else {
        const prevVideoIndex = (currentSlide - 1 + videos.length) % videos.length;
        setCurrentSlide(prevVideoIndex);
        setCurrentMediaIndex(videos[prevVideoIndex].background.length - 1);
      }
    }
  };

  // Get current video and media
  const currentVideo = videos.length > 0 ? videos[currentSlide] : null;
  const currentMedia = currentVideo && currentVideo.background.length > 0 
    ? currentVideo.background[currentMediaIndex] 
    : null;
  const backgroundMediaUrl = currentMedia ? getStrapiMedia(currentMedia.url) : null;

  return (
    <section className="relative min-h-screen overflow-hidden font-dm-sans">
      {/* Background Video or Image */}
      <div className="absolute inset-0">
        {isLoading ? (
          // Loading state
          <div className="w-full h-full bg-gray-900 flex items-center justify-center">
            <div className="loading-spinner"></div>
          </div>
        ) : backgroundMediaUrl && currentMedia?.mime?.startsWith('video/') ? (
          // Video background
          <video
            key={`${currentVideo?.documentId}-${currentMedia?.id}`}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={backgroundMediaUrl} type={currentMedia.mime} />
            {/* Fallback image if video fails */}
            <Image
              src="/images/hero-bg.jpg"
              alt="City Background"
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </video>
        ) : backgroundMediaUrl ? (
          // Image background (if not video)
          <Image
            src={backgroundMediaUrl}
            alt={currentMedia?.alternativeText || currentVideo?.title || "Background"}
            fill
            className="object-cover"
            priority
            unoptimized
          />
        ) : (
          // Default fallback image
          <Image
            src="/images/hero-bg.jpg"
            alt="City Background"
            fill
            className="object-cover"
            priority
            unoptimized
          />
        )}
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-amber-900/50 to-transparent"></div>
      </div>

      {/* Navigation Dots - Hidden on mobile */}
      <div className="absolute left-4 lg:left-8 top-1/2 transform -translate-y-1/2 z-20 hidden md:block">
        <div className="flex flex-col space-y-3 lg:space-y-4">
          {videos.length > 0 ? (
            videos.map((video, videoIndex) => (
              <div key={video.documentId} className="flex flex-col space-y-2">
                {/* Main video dot */}
                <button
                  onClick={() => handleSlideChange(videoIndex)}
                  className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full transition-all duration-300 ${
                    videoIndex === currentSlide ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
                
                {/* Sub-dots for media in current video */}
                {videoIndex === currentSlide && video.background.length > 1 && (
                  <div className="flex flex-col space-y-1 ml-1 lg:ml-2">
                    {video.background.map((_, mediaIndex) => (
                      <button
                        key={mediaIndex}
                        onClick={() => setCurrentMediaIndex(mediaIndex)}
                        className={`w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full transition-all duration-300 ${
                          mediaIndex === currentMediaIndex ? 'bg-amber-200' : 'bg-white/30 hover:bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            // Fallback dots when no videos
            [0, 1, 2, 3, 4].map((index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))
          )}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
          {/* Left Content */}
          <div className="max-w-2xl text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 lg:mb-6 leading-tight font-dm-sans">
              {currentVideo?.title || 'Lorem Ipsum'}
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-gray-200 mb-6 lg:mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0 font-dm-sans">
              {currentVideo?.description || 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s'}
            </p>
            
            <button className="bg-white text-black px-6 lg:px-8 py-3 lg:py-4 rounded-lg font-semibold text-base lg:text-lg hover:bg-gray-100 transition-colors duration-300 font-dm-sans">
              Read More
            </button>
          </div>

          {/* Right Content - Man Image (Hidden on mobile) */}
          <div className="hidden lg:flex justify-center lg:justify-end">
            <div className="relative">
              {/* Background Card */}
              <div className="bg-amber-800/80 rounded-lg p-6 lg:p-8 backdrop-blur-sm">
                <div className="relative w-64 h-80 lg:w-80 lg:h-96 overflow-hidden rounded-lg">
                  <Image
                    src="/images/avatar.png"
                    alt="Professional Man"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-2 lg:left-4 top-1/2 transform -translate-y-1/2 z-20 text-white hover:text-amber-200 transition-colors"
      >
        <svg className="w-6 h-6 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button 
        onClick={nextSlide}
        className="absolute right-2 lg:right-4 top-1/2 transform -translate-y-1/2 z-20 text-white hover:text-amber-200 transition-colors"
      >
        <svg className="w-6 h-6 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Media Counter - Responsive positioning */}
      {currentVideo && currentVideo.background.length > 1 && (
        <div className="absolute bottom-4 lg:bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-black/50 text-white px-3 lg:px-4 py-1 lg:py-2 rounded-full text-xs lg:text-sm">
            {currentMediaIndex + 1} / {currentVideo.background.length}
          </div>
        </div>
      )}

      {/* Mobile dots indicator */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2 md:hidden">
        {videos.length > 0 ? (
          videos.map((_, videoIndex) => (
            <button
              key={videoIndex}
              onClick={() => handleSlideChange(videoIndex)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                videoIndex === currentSlide ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))
        ) : (
          [0, 1, 2, 3, 4].map((index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default HeroSection;
