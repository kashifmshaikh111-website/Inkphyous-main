import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import products from '../Utils/Products';
import Footer from '../components/Footer';

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [imageKey, setImageKey] = useState(0);

  const navigate = useNavigate();

  const activeProduct = products[currentIndex];
  const prevIndex = (currentIndex - 1 + products.length) % products.length;
  const nextIndex = (currentIndex + 1) % products.length;

  // Auto rotate
  useEffect(() => {
    if (isHovering) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovering]);

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
    <div
      className="min-h-screen w-full flex flex-col relative"
      style={{
        // Global background - slightly darkened for contrast separation (Fix 3)
        background: '#ececeb',
      }}
    >
      {/* DIRECTIONAL lighting - Pulled upward and tighter (Fix 2) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 100% 60% at 50% 15%, 
              rgba(255, 255, 255, 1.0) 0%,
              rgba(250, 250, 248, 0.8) 25%,
              rgba(240, 240, 238, 0.4) 45%,
              transparent 70%)
          `,
        }}
      />



      {/* Main Content - Hero section */}
      <section
        className="flex-1 flex items-center justify-center relative pt-20 pb-4"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Left Arrow */}
        <button
          onClick={prevProduct}
          className="absolute left-[5%] md:left-[10%] lg:left-[15%] z-30 p-3 bg-white/60 backdrop-blur-sm border border-gray-300/30 rounded-full 
            shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300 hover:bg-white/80"
          aria-label="Previous product"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Product Display - 3 Products with Center Focus - Narrowed Container (Fix 4) */}
        <div className="relative w-full max-w-5xl h-full max-h-[60vh] flex items-center justify-center">
          {[prevIndex, currentIndex, nextIndex].map((index) => {
            const product = products[index];
            const isCenter = index === currentIndex;
            const isLeft = index === prevIndex;

            return (
              <div
                key={product.id}
                className={`absolute transition-all duration-1000 ease-out ${isCenter
                  ? 'translate-x-0 scale-100 opacity-100 z-20'
                  : isLeft
                    ? '-translate-x-[380px] scale-75 opacity-40 z-10' // Adjusted: A bit further away
                    : 'translate-x-[380px] scale-75 opacity-40 z-10'  // Adjusted: A bit further away
                  }`}
                style={{
                  filter: isCenter
                    ? 'none'
                    : 'blur(5px) brightness(1.1) contrast(0.8) saturate(0.7)', // Fix 2: Reduced blur (hinted shapes)
                }}
              >
                {/* Atmospheric light around hero product - Refined */}
                {isCenter && (
                  <>
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.2) 40%, transparent 65%)',
                        transform: 'scale(1.4)',
                        filter: 'blur(50px)',
                        zIndex: -1,
                      }}
                    />
                    <div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
                      style={{
                        width: '85%',
                        height: '50px',
                        background: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.12) 0%, rgba(0, 0, 0, 0.05) 50%, transparent 80%)',
                        filter: 'blur(25px)',
                        transform: 'translateY(130%) translateX(-50%)',
                        zIndex: -1,
                      }}
                    />
                  </>
                )}

                <img
                  key={`${product.id}-${imageKey}`}
                  src={
                    isCenter
                      ? getImageByColor(product, selectedColor)
                      : product.image
                  }
                  alt={product.name}
                  className={`object-contain transition-all duration-1000 ${isCenter
                    ? 'h-[55vh] md:h-[65vh] w-auto'
                    : 'h-[32vh] w-auto'
                    }`}
                  style={{
                    filter: isCenter
                      ? 'drop-shadow(0 50px 50px rgba(0, 0, 0, 0.25))' // Visible Soft Anchor
                      : 'none'
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextProduct}
          className="absolute right-[5%] md:right-[10%] lg:right-[15%] z-30 p-3 bg-white/60 backdrop-blur-sm border border-gray-300/30 rounded-full 
            shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300 hover:bg-white/80"
          aria-label="Next product"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </section>

      {/* Bottom Product Info */}
      <div className="pb-4 px-8 relative z-30 shrink-0">
        <div className="text-center space-y-3 mb-4">
          {/* Fix 1: Richer black text */}
          <h1
            className="text-4xl md:text-6xl font-bold tracking-tight title"
            style={{ color: '#0f172a' }} // Ink / Charcoal
          >
            {activeProduct.name}
          </h1>

          <p
            className="text-sm uppercase tracking-widest"
            style={{ color: '#475569' }} // Slate 600 - Richer than gray-500
          >
            {activeProduct.brand} | {activeProduct.category}
          </p>

          <div className="flex justify-center gap-4 py-2">
            {activeProduct.availableColors.map((color, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedColor(color);
                  setImageKey((k) => k + 1);
                }}
                className={`w-6 h-6 rounded-full border-2 transition-all duration-300 ${selectedColor === color
                  ? 'scale-110'
                  : 'border-gray-400 hover:scale-105' // Darker border
                  }`}
                style={{
                  borderColor: selectedColor === color ? '#0f172a' : undefined, // Ink border
                  backgroundColor:
                    color === 'Black' ? '#0f172a' : // Ink black
                      color === 'Pink' ? '#ec4899' :
                        color === 'Grey' ? '#9ca3af' :
                          color === 'Green' ? '#10b981' :
                            color === 'White' ? '#fff' :
                              color === 'Blue' ? '#3b82f6' : '#ccc',
                }}
                title={color}
              />
            ))}
          </div>

          <button
            onClick={() => {
              navigate(
                `/product/${activeProduct.id}?name=${encodeURIComponent(
                  activeProduct.name
                )}`
              );
            }}
            className="mt-4 px-12 py-3 bg-gray-800 text-white text-sm font-medium rounded-full 
              hover:bg-gray-700 transition-all duration-300 uppercase tracking-widest
              shadow-md hover:shadow-lg"
          >
            View Details
          </button>
        </div>
      </div>

      {/* Footer - Resting in the "Calm Zone" (Shadow Floor) */}
      <div
        className="w-full relative z-40 mt-auto"
        style={{
          // Fix 3: Visual weight via darker background zone
          background: 'linear-gradient(to top, rgba(0,0,0,0.03) 0%, transparent 100%)',
          borderTop: '1px solid rgba(0,0,0,0.02)' // Subtle edge alignment
        }}
      >
        <Footer />
      </div>
    </div>
  );
}
