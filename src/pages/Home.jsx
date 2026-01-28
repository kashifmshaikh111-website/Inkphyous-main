import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import products from '../Utils/Products';
import Footer from '../components/Footer';
import { useLanguage } from '../components/LanguageContext';

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [imageKey, setImageKey] = useState(0);
  const [lastInteractionTime, setLastInteractionTime] = useState(null);
  const { language, t } = useLanguage();

  const navigate = useNavigate();

  const activeProduct = products[currentIndex];
  const prevIndex = (currentIndex - 1 + products.length) % products.length;
  const nextIndex = (currentIndex + 1) % products.length;

  // Auto rotate (pauses for 10 seconds after user interaction)
  useEffect(() => {
    if (isHovering) return;

    // Function to check if we should auto-rotate
    const shouldRotate = () => {
      if (!lastInteractionTime) return true; // No interaction yet, rotate
      const timeSinceInteraction = Date.now() - lastInteractionTime;
      return timeSinceInteraction >= 6000; // 6 seconds have passed
    };

    // Check every second if we should start rotating
    const checkInterval = setInterval(() => {
      if (shouldRotate()) {
        setCurrentIndex((prev) => (prev + 1) % products.length);
      }
    }, 4000); // Check every 4 seconds (rotation interval)

    return () => clearInterval(checkInterval);
  }, [isHovering, lastInteractionTime, products.length]);

  // Reset color when product changes
  useEffect(() => {
    setSelectedColor(null);
    setImageKey((k) => k + 1);
  }, [currentIndex]);

  const nextProduct = () =>
    setCurrentIndex((prev) => (prev + 1) % products.length);

  const prevProduct = () =>
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);

  const getImageByColor = (product, color) => {
    if (!color || !product.hasVariants) return product.image;
    const variant = product.variants.find(
      (v) => v.color.toLowerCase() === color.toLowerCase()
    );
    return variant?.image || product.image;
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden text-[#0f172a]">

      {/* GLOBAL BACKGROUND SYSTEM */}
      <div className="fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-[#ececeb]" />
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 120% 80% at 50% 10%,
                #ffffff 0%,
                #f6f6f4 35%,
                #ececeb 65%,
                #e5e5e3 100%)
            `
          }}
        />
      </div>

      {/* HERO SECTION - Full bleed */}
      <section
        className="relative w-full h-[64vh] md:h-[68vh] flex justify-center pt-20"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Product container - weighted lower, not centered */}
        <div className="relative w-full h-full flex justify-center pt-[6vh]">
          {/* Left Arrow */}
          <button
            onClick={prevProduct}
            className="absolute left-[8%] md:left-[12%] top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-[#E6E6E6]/90 backdrop-blur-md text-black hover:text-white hover:bg-red-500 transition-all duration-300 shadow-lg flex items-center justify-center cursor-pointer transform hover:scale-110"
            aria-label="Previous product"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* HERO PRODUCT SYSTEM */}
          <div className="relative w-full h-full flex items-center justify-center">
            {[prevIndex, currentIndex, nextIndex].map((index) => {
              const product = products[index];
              const isCenter = index === currentIndex;
              const isLeft = index === prevIndex;

              return (
                <div
                  key={product.id}
                  className={`absolute transition-all duration-1000 ease-out ${isCenter ? 'opacity-100 z-20' : 'opacity-40 z-10'
                    }`}
                  style={{
                    filter: isCenter
                      ? 'brightness(1) contrast(1) saturate(1)'
                      : 'blur(14px) saturate(0.6) brightness(1.1)',
                    transform: isCenter
                      ? 'translateX(0) translateY(0px) scale(1.2)'
                      : isLeft
                        ? 'translateX(-350px) scale(0.75)'
                        : 'translateX(350px) scale(0.75)',
                  }}
                >
                  <img
                    key={product.id}
                    src={
                      isCenter
                        ? getImageByColor(product, selectedColor)
                        : product.image
                    }
                    alt={product.name}
                    className={`object-contain transition-all duration-1000 relative z-10 ${isCenter
                      ? 'h-[65vh] md:h-[68vh] w-auto'
                      : 'h-[44vh] w-auto'
                      }`}
                    style={{
                      filter: 'none',
                      boxShadow: 'none',
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextProduct}
            className="absolute right-[8%] md:right-[12%] top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-[#E6E6E6]/90 backdrop-blur-md text-black hover:text-white hover:bg-red-500 transition-all duration-300 shadow-lg flex items-center justify-center cursor-pointer transform hover:scale-110"
            aria-label="Next product"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>

      {/* PRODUCT INFO */}
      <div className="mt-6 pb-12 px-8 relative z-20 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight title text-[#0f172a]">
          {language === 'ar' && activeProduct.name_ar ? activeProduct.name_ar : activeProduct.name}
        </h1>

        {/* Product Description */}
        <p className="mt-3 text-base text-black/80 max-w-2xl mx-auto leading-relaxed">
          {language === 'ar' && activeProduct.summary_ar ? activeProduct.summary_ar : activeProduct.summary}
        </p>

        {/* Color Selection */}
        <div className="flex justify-center gap-4 py-3">
          {activeProduct.availableColors.map((color, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedColor(color);
                setImageKey((k) => k + 1);
                setLastInteractionTime(Date.now());
              }}
              className={`w-5 h-5 rounded-full border transition-all duration-300 ${selectedColor === color
                ? 'scale-110 border-[#0f172a]'
                : 'border-transparent hover:scale-105'
                }`}
              style={{
                backgroundColor:
                  color === 'Black' ? '#0f172a' :
                    color === 'Pink' ? '#ec4899' :
                      color === 'Grey' ? '#9ca3af' :
                        color === 'Green' ? '#10b981' :
                          color === 'White' ? '#fff' :
                            color === 'Blue' ? '#3b82f6' : '#ccc',
                boxShadow: selectedColor === color ? '0 0 0 2px white, 0 0 0 3px #0f172a' : 'none'
              }}
              title={color}
            />
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex gap-2 mt-1 mb-4">
          {products.map((_, idx) => (
            <span
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-1.5 h-1.5 rounded-full cursor-pointer transition-colors duration-300 ${idx === currentIndex ? 'bg-black/80' : 'bg-black/10 hover:bg-black/20'
                }`}
            />
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={() => {
            navigate(
              `/product/${activeProduct.id}?name=${encodeURIComponent(
                activeProduct.name
              )}`
            );
          }}
          className="px-8 py-3 rounded-full bg-[#1f2937] text-white text-[11px] font-semibold tracking-[0.25em] hover:bg-[#ef4444] hover:scale-105 hover:shadow-lg transition-all duration-300 ease-out cursor-pointer"
        >
          {t('seeMore')}
        </button>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
