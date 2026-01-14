import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import products from '../Utils/Products';

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // 🔥 Color variant state
  const [selectedColor, setSelectedColor] = useState(null);
  const [imageKey, setImageKey] = useState(0);

  const navigate = useNavigate();

  const activeProduct = products[currentIndex];
  const prevIndex = (currentIndex - 1 + products.length) % products.length;
  const nextIndex = (currentIndex + 1) % products.length;

  // 🔁 Auto rotate
  useEffect(() => {
    if (isHovering) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [isHovering]);

  // 🔄 Reset color when product changes
  useEffect(() => {
    setSelectedColor(null);
    setImageKey((k) => k + 1);
  }, [currentIndex]);

  const nextProduct = () =>
    setCurrentIndex((prev) => (prev + 1) % products.length);

  const prevProduct = () =>
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);

  // 🎯 Get image from variants using color
  const getImageByColor = (product, color) => {
    if (!color || !product.hasVariants) return product.image;

    const variant = product.variants.find(
      (v) => v.color.toLowerCase() === color.toLowerCase()
    );

    return variant?.image || product.image;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 flex flex-col">
      <section className="flex-1 flex items-center justify-center px-4">
        <div
          className="w-full max-w-7xl mx-auto text-center"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* ================= CAROUSEL ================= */}
          <div className="relative mt-12 flex items-center justify-center mb-10 w-full">
            {/* Prev */}
            <button
              onClick={prevProduct}
              className="absolute left-0 z-30 p-2 md:p-3 bg-white border rounded-full shadow hover:scale-110 transition"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Images */}
            <div className="relative w-full h-[460px] flex items-center justify-center overflow-hidden">
              {[prevIndex, currentIndex, nextIndex].map((index) => {
                const product = products[index];

                let positionClasses = '';
                if (index === currentIndex) {
                  positionClasses =
                    'translate-x-0 scale-110 opacity-100 z-20';
                } else if (index === prevIndex) {
                  positionClasses =
                    '-translate-x-[340px] md:-translate-x-[420px] scale-90 opacity-50 z-10';
                } else {
                  positionClasses =
                    'translate-x-[340px] md:translate-x-[420px] scale-90 opacity-50 z-10';
                }

                return (
                  <div
                    key={product.id}
                    className={`absolute transition-all duration-700 ease-in-out ${positionClasses}`}
                  >
                    <img
                      key={`${product.id}-${imageKey}`}
                      src={
                        index === currentIndex
                          ? getImageByColor(product, selectedColor)
                          : product.image
                      }
                      alt={product.name}
                      className={`w-[18rem] sm:w-[20rem] md:w-[22rem] object-contain drop-shadow-2xl
                        ${index === currentIndex ? 'animate-slideUp' : ''}`}
                    />
                  </div>
                );
              })}
            </div>

            {/* Next */}
            <button
              onClick={nextProduct}
              className="absolute right-0 z-30 p-2 md:p-3 bg-white border rounded-full shadow hover:scale-110 transition"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>

          {/* ================= PRODUCT INFO ================= */}
          <div className="max-w-3xl mx-auto animate-fadeIn">
            <h1 className="text-3xl title  sm:text-4xl md:text-6xl font-serif mb-4">
              {activeProduct.name}
            </h1>

            {/* 🎨 COLORS */}
            <div className="flex justify-center gap-3 mb-6">
              {activeProduct.availableColors.map((color, idx) => (
                <span
                  key={idx}
                  onClick={() => {
                    setSelectedColor(color);
                    setImageKey((k) => k + 1);
                  }}
                  className={`w-5 h-5 rounded-full border cursor-pointer transition
                    ${selectedColor === color ? 'ring-2 ring-black scale-110' : ''}`}
                  style={{
                    backgroundColor:
                      color === 'Black'
                        ? '#000'
                        : color === 'Pink'
                        ? '#ec4899'
                        : color === 'Grey'
                        ? '#9ca3af'
                        : color === 'Green'
                        ? '#10b981'
                        : color === 'White'
                        ? '#fff'
                        : color === 'Blue'
                        ? '#3b82f6'
                        : '#ccc',
                  }}
                />
              ))}
            </div>

            <p className="text-gray-600 text-base sm:text-xl mb-6">
              {activeProduct.summary}
            </p>

            {/* SEE MORE */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(
                  `/product/${activeProduct.id}?name=${encodeURIComponent(
                    activeProduct.name
                  )}`
                );
              }}
              className="px-6 py-3 bg-black text-white text-lg rounded-full hover:bg-red-500 transition uppercase tracking-wider"
            >
              See More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
