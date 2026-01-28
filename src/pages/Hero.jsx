"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { useNavigate } from "react-router-dom";
import products from "../Utils/Products";
import { Rewind } from "lucide-react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useCart } from "../components/CartContext";
import { ArrowLeft, ArrowRight, LayoutGrid, Sparkles } from "lucide-react";

// ================== CART NOTIFICATION ==================
function CartNotification({ product, onClose }) {
  if (!product) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="fixed top-20 right-4 p-4 bg-gray-800 text-gray-100 rounded-lg flex items-center space-x-4 z-[200]"
    >
      <img
        src={product.image}
        alt={product.name}
        className="h-12 w-12 object-cover rounded"
      />
      <div>
        <p className="font-semibold">{product.name} added to cart!</p>
        <p className="text-sm">Proceed to checkout to complete your purchase.</p>
      </div>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-100">
        <XMarkIcon className="h-5 w-5" />
      </button>
    </motion.div>
  );
}

// ================== COLOR CHANGE NOTIFICATION ==================
function ColorChangeNotification({ color, onClose }) {
  if (!color) return null;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-full shadow-lg z-[200] flex items-center gap-2"
    >
      <div className="w-4 h-4 rounded-full bg-white/30 animate-pulse"></div>

    </motion.div>
  );
}

// ================== GOOEY BUTTON EFFECT ==================
function GooeyButton({ text, onClick }) {
  const buttonRef = useRef(null);
  const createParticles = () => {
    const button = buttonRef.current;
    if (!button) return;
    const particleCount = 12;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("span");
      particle.classList.add("gooey-particle");
      particle.style.setProperty("--x", `${(Math.random() - 0.5) * 200}px`);
      particle.style.setProperty("--y", `${(Math.random() - 0.5) * 200}px`);
      particle.style.setProperty("--delay", `${Math.random() * 0.2}s`);
      button.appendChild(particle);
      setTimeout(() => particle.remove(), 800);
    }
  };
  const handleClick = (e) => {
    createParticles();
    onClick(e);
  };
  return (
    <>
      <style>
        {`
          .gooey-button {
            position: relative;
            overflow: hidden;
            color: white;
            background: #1f2937;
            border: none;
            border-radius: 9999px;
            cursor: pointer;
            transition: background 0.3s;
            font-weight: 500;
          }
          .gooey-button:hover {
            background: #e11d48;
          }
          .gooey-particle {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 10px;
            height: 10px;
            background: white;
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(0);
            animation: gooey-explode 0.8s ease-out forwards;
            animation-delay: var(--delay);
          }
          @keyframes gooey-explode {
            0% { opacity: 1; transform: translate(-50%, -50%) scale(0); }
            50% { transform: translate(calc(-50% + var(--x)), calc(-50% + var(--y))) scale(1.2); opacity: 1; }
            100% { transform: translate(calc(-50% + var(--x)), calc(-50% + var(--y))) scale(0); opacity: 0; }
          }
        `}
      </style>
      <button
        ref={buttonRef}
        onClick={handleClick}
        className="gooey-button px-8 py-3 text-sm sm:text-lg uppercase tracking-wider"
      >
        {text}
      </button>
    </>
  );
}

// ================== PRODUCT INFO (MODIFIED) ==================
function ProductInfo({ activeProduct, activeVariantImage, onVariantSelect }) {
  const navigate = useNavigate();

  if (!activeProduct) return null;

  // Get unique variants (one entry per color)
  const uniqueVariants = activeProduct.variants
    ? activeProduct.variants.reduce((acc, variant) => {
      if (!acc.some(item => item.color === variant.color)) {
        acc.push(variant);
      }
      return acc;
    }, [])
    : [];

  // Helper to get a suitable Tailwind color class
  const getColorClass = (colorName) => {
    switch (colorName.toLowerCase()) {
      case 'black': return 'bg-gray-900 border-gray-700';
      case 'pink': return 'bg-pink-500 border-pink-400';
      case 'grey': return 'bg-gray-400 border-gray-300';
      case 'green': return 'bg-green-600 border-green-500';
      case 'white': return 'bg-white border-gray-400';
      case 'blue': return 'bg-blue-600 border-blue-500';
      default: return 'bg-gray-500 border-gray-400';
    }
  };

  // Determine the currently active color for highlighting
  const activeImageUrl = activeVariantImage || activeProduct.image;
  const activeColor = activeProduct.variants?.find(v => v.image === activeImageUrl)?.color || activeProduct.color;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeProduct.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="text-center w-full max-w-5xl mx-auto backdrop-blur-sm rounded-2xl p-6"
      >
        {/* PRODUCT TITLE */}
        {/* PRODUCT TITLE */}
        <motion.h2
          className="text-xl sm:text-2xl title md:text-5xl lg:text-7xl font-bold tracking-wider text-gray-900 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {activeProduct.name}
        </motion.h2>
        {uniqueVariants.length > 0 && (
          <div className="flex items-center  justify-center mb-4 gap-3 flex-shrink-0">
            {uniqueVariants.map((variant) => (
              <motion.button
                key={variant.id}
                onClick={() => {
                  console.log('🎨 Color clicked:', variant.color, 'Image:', variant.image);
                  onVariantSelect(variant.image, variant.color);
                }}
                className={`w-7 h-7 rounded-full border-2 transition-all duration-300 ${getColorClass(variant.color)} ${variant.color === activeColor
                  ? 'ring-2 ring-offset-2 ring-gray-900 scale-110'
                  : 'hover:scale-105 opacity-70 hover:opacity-100'
                  }`}
                title={variant.color}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
              />
            ))}
          </div>
        )}
        {/* DESCRIPTION WITH COLOR VARIANTS */}

        {/* PRODUCT DESCRIPTION */}
        <p className="text-gray-600 secondary text-sm sm:text-base md:text-lg leading-relaxed flex-1 text-center ">
          {activeProduct.summary}
        </p>

        {/* VARIANT COLOR CIRCLES */}


        {/* SEE MORE BUTTON */}
        <div className="flex justify-center gap-4 w-full mt-4">
          <GooeyButton
            text="See More"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/product/${activeProduct.id}`);
            }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ================== TAB SWITCHER ==================
function TabSwitcher({ activeTab, setActiveTab, onShopClick, onCarouselClick }) {
  return (
    <motion.div
      className="fixed top-20 right-4 sm:top-24 sm:right-8 z-50 bg-white/90 backdrop-blur-lg border border-gray-200 rounded-full p-1 flex gap-1 scale-90 sm:scale-100 origin-top-right shadow-sm"
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.button
        onClick={onShopClick}
        className={`relative px-4 py-2 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${activeTab === 'shop' ? 'text-white' : 'text-gray-700 hover:text-gray-900'
          }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {activeTab === 'shop' && (
          <motion.div
            layoutId="activeTab"
            className="absolute inset-0 bg-gradient-to-r from-red-500 to-rose-600 rounded-full shadow-lg"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
        <LayoutGrid className="h-3 w-3 sm:h-4 sm:w-4 relative z-10" />
      </motion.button>

      <motion.button
        onClick={onCarouselClick}
        className={`relative px-4 py-2 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${activeTab === 'carousel' ? 'text-white' : 'text-gray-700 hover:text-gray-900'
          }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {activeTab === 'carousel' && (
          <motion.div
            layoutId="activeTab"
            className="absolute inset-0 bg-gradient-to-r from-red-500 to-rose-600 rounded-full shadow-lg"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
        <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 relative z-10" />
      </motion.button>
    </motion.div>
  );
}

// ================== PRODUCT LISTING ==================
function ProductListing({ products, navigate, onBackClick }) {
  return (
    <motion.div
      className="p-4 sm:p-8 w-full text-gray-900 pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="cursor-pointer rounded-lg overflow-hidden transition-all duration-300 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <div className="w-full h-52 sm:h-64 bg-gray-100 overflow-hidden relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="mt-3 flex justify-between items-start px-1">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">{product.name}</h3>
              <p className="text-base sm:text-lg font-semibold text-gray-800">
                ₹{product.discountPriceINR}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ================== MAIN CAROUSEL (FIXED) ==================
function MainCarousel({ products, activeIndex, setActiveIndex, activeVariantImage }) {
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + products.length) % products.length);
  const handleNext = () => setActiveIndex((prev) => (prev + 1) % products.length);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % products.length);
    }, 70000);
    return () => clearInterval(interval);
  }, [products.length, setActiveIndex]);

  // Adjust style for responsive
  const getProductStyle = (index) => {
    const isCurrent = index === activeIndex;
    const isNext = index === (activeIndex + 1) % products.length;
    const isPrev = index === (activeIndex - 1 + products.length) % products.length;

    // We can use generic transforms that work reasonably well on both
    // But for mobile, translateX might need to be smaller if standard px
    // Percentages are better.
    let base = {
      position: "absolute",
      transition: "all 1s cubic-bezier(0.25, 0.1, 0.25, 1)",
      transformOrigin: "center center",
    };

    if (isCurrent)
      return { ...base, zIndex: 10, transform: "translateX(-50%) scale(1)", left: "50%", opacity: 1 };
    if (isNext)
      return { ...base, zIndex: 5, transform: "translateX(20%) scale(0.6)", left: "50%", opacity: 0.5 };
    if (isPrev)
      return { ...base, zIndex: 5, transform: "translateX(-120%) scale(0.6)", left: "50%", opacity: 0.5 };
    return { display: "none" };
  };

  return (
    <div
      className="relative w-full h-[45vh] sm:h-[600px] flex justify-center items-center mt-8 sm:mt-0"
      data-scroll
      data-scroll-speed="2"
    >
      {products.map((product, i) => {
        const isCurrent = i === activeIndex;
        const displayImage = (isCurrent && activeVariantImage) ? activeVariantImage : product.image;

        return (
          <motion.div
            key={product.id}
            className="absolute top-1/2 -translate-y-1/2 w-[280px] h-[350px] sm:w-[400px] sm:h-[500px] flex justify-center items-center pointer-events-none"
            animate={{
              ...getProductStyle(i),
              // Override scale for active item on desktop vs mobile if needed
              transform: i === activeIndex
                ? "translateX(-50%) scale(1)" // Mobile default
                : getProductStyle(i).transform
            }}
            initial={false}
          >
            <div className="relative w-full h-full flex justify-center items-center pointer-events-auto">
              {/* Bottom Glow + Floating Shadow */}
              <div className="absolute bottom-10 w-[70%] h-[40px] bg-black/30 blur-2xl rounded-full opacity-70 animate-pulse z-0 hidden sm:block"></div>

              {/* Soft Ambient Background Light */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-gray-200/10 to-gray-400/0 blur-3xl z-0"></div>

              {/* Product Image with AnimatePresence ONLY for active product */}
              {isCurrent ? (
                <AnimatePresence mode="wait">
                  <motion.img
                    key={displayImage}
                    src={displayImage}
                    alt={product.name}
                    className="relative w-full h-full object-contain drop-shadow-xl sm:drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)] z-20"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                  />
                </AnimatePresence>
              ) : (
                <img
                  src={product.image}
                  alt={product.name}
                  className="relative w-full h-full object-contain drop-shadow-xl z-20 opacity-60 grayscale-[0.5]"
                />
              )}
            </div>
          </motion.div>
        );
      })}

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full backdrop-blur-md border bg-white/30 flex items-center justify-center hover:bg-red-500 transition group z-30"
      >
        <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6 text-gray-900 group-hover:text-white transition-colors" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full backdrop-blur-md border bg-white/30 flex items-center justify-center hover:bg-red-500 transition group z-30"
      >
        <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 text-gray-900 group-hover:text-white transition-colors" />
      </button>
    </div>
  );
}

// ================== MAIN HOME COMPONENT (FIXED) ==================
export default function Home() {
  const [activeTab, setActiveTab] = useState('carousel');
  const [activeProduct, setActiveProduct] = useState(null);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [activeVariantImage, setActiveVariantImage] = useState(null);
  const [notification, setNotification] = useState(null);
  const [colorNotification, setColorNotification] = useState(null);
  const containerRef = useRef(null);
  const locoScrollRef = useRef(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Build category map
  const categoryMap = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});

  const categoryOnlyItems = Object.entries(categoryMap).map(([category, count]) => ({
    label: (
      <>
        {category}
        <sup style={{ fontSize: "0.5em", position: "relative", top: "-1.5em", left: "0.5em" }}>
          {count}
        </sup>
      </>
    ),
    category,
  }));

  const navItems = [...categoryOnlyItems, { label: "Shop All", category: "all" }];

  const isShopAllView = activeTab === 'shop';
  const selectedCategory = isShopAllView ? "all" : navItems[selectedCategoryIndex]?.category || "all";
  const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter((p) => p.category === selectedCategory);

  // Locomotive Scroll setup
  useEffect(() => {
    if (!isShopAllView && containerRef.current && !locoScrollRef.current) {
      locoScrollRef.current = new LocomotiveScroll({
        el: containerRef.current,
        smooth: true,
        smartphone: { smooth: true },
        tablet: { smooth: true },
      });
    } else if (isShopAllView && locoScrollRef.current) {
      locoScrollRef.current.destroy();
      locoScrollRef.current = null;
    }

    return () => locoScrollRef.current?.destroy();
  }, [isShopAllView]);

  // Update active product and reset variant when index changes
  useEffect(() => {
    const product = filteredProducts[activeProductIndex];
    if (product && product.id !== activeProduct?.id) {
      console.log('📦 Setting active product to:', product.name);
      setActiveProduct(product);
      setActiveVariantImage(product.image); // Reset to default image only when product changes

      // Auto-advance to next category if at end
      if (activeProductIndex === filteredProducts.length - 1 && selectedCategory !== "all") {
        setTimeout(() => {
          const nextIndex = (selectedCategoryIndex + 1) % categoryOnlyItems.length;
          setSelectedCategoryIndex(nextIndex);
          setActiveProductIndex(0);
        }, 2000);
      }
    }
  }, [activeProductIndex, selectedCategory, selectedCategoryIndex]);

  const handleShopClick = () => {
    setActiveTab('shop');
    setSelectedCategoryIndex(navItems.findIndex(item => item.category === "all"));
  };

  const handleCarouselClick = () => {
    setActiveTab('carousel');
    setSelectedCategoryIndex(0);
    setActiveProductIndex(0);
  };

  // Handler for variant color selection with notification
  const handleVariantSelect = useCallback((variantImage, colorName) => {
    console.log('✅ Variant selected - Image:', variantImage, 'Color:', colorName);

    if (!variantImage) {
      console.error('❌ No variant image provided!');
      return;
    }

    setActiveVariantImage(variantImage);

    // Show color change notification
    setColorNotification(colorName);
    setTimeout(() => {
      setColorNotification(null);
    }, 2000);
  }, []);

  // Debug: Log current state
  useEffect(() => {
    console.log('📊 Current State:', {
      activeProduct: activeProduct?.name,
      activeVariantImage,
      activeProductIndex,
    });
  }, [activeProduct, activeVariantImage, activeProductIndex]);

  return (
    <section className="relative bg-gray-100 min-h-screen flex justify-center items-start overflow-hidden text-gray-900 pt-24">
      <TabSwitcher
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onShopClick={handleShopClick}
        onCarouselClick={handleCarouselClick}
      />

      <div className="flex-1 flex justify-center w-full">
        <motion.div
          className={`w-full max-w-7xl ${isShopAllView ? "overflow-y-auto h-screen hide-scrollbar" : ""
            }`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          ref={containerRef}
          data-scroll-container
        >
          <AnimatePresence mode="wait">
            {isShopAllView ? (
              <ProductListing
                key="shop-all"
                products={products}
                navigate={navigate}
                onBackClick={handleCarouselClick}
              />
            ) : (
              <motion.div key="carousel-view" className="space-y-8">
                <MainCarousel
                  products={filteredProducts}
                  activeIndex={activeProductIndex}
                  setActiveIndex={setActiveProductIndex}
                  activeVariantImage={activeVariantImage}
                />
                <ProductInfo
                  activeProduct={activeProduct}
                  activeVariantImage={activeVariantImage}
                  onVariantSelect={handleVariantSelect}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* NOTIFICATIONS */}
      <AnimatePresence>
        {notification && (
          <CartNotification
            product={notification}
            onClose={() => setNotification(null)}
          />
        )}
      </AnimatePresence>


    </section>
  );
}