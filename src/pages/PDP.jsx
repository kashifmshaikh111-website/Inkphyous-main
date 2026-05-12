"use client";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import products from "../Utils/Products";
import { Plus, Heart, IndianRupee, ChevronLeft, ChevronRight, LayoutGrid, Square, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "../components/CartContext";
import { useLanguage } from "../components/LanguageContext";

const getProductAndVariant = (id) => {
  if (!id) return { product: null, selectedVariant: null };
  const [productId] = id.split("_");
  let product = products.find(
    (p) => String(p.id) === String(productId) || String(p.id) === String(id)
  );
  if (!product)
    product = products.find((p) => p.variants?.some((v) => v.id === id));
  if (!product) return { product: null, selectedVariant: null };
  const selectedVariant =
    product.variants?.find((v) => v.id === id) || product.variants?.[0];
  return { product, selectedVariant };
};

function HeroCarousel({ productId, variants, activeIndex: propActiveIndex, onVariantChange, category }) {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(propActiveIndex);

  // Sync internal state when the prop changes (e.g. from color picker)
  useEffect(() => {
    setActiveIndex(propActiveIndex);
  }, [propActiveIndex]);

  const prevVariant = () => {
    const newIndex = (activeIndex - 1 + variants.length) % variants.length;
    setActiveIndex(newIndex);
    onVariantChange(variants[newIndex].id);
  };

  const nextVariant = () => {
    const newIndex = (activeIndex + 1) % variants.length;
    setActiveIndex(newIndex);
    onVariantChange(variants[newIndex].id);
  };

  const getVariantStyle = (index) => {
    let diff = index - activeIndex;
    if (diff > variants.length / 2) diff -= variants.length;
    if (diff < -variants.length / 2) diff += variants.length;

    const absDiff = Math.abs(diff);

    const base = {
      position: "absolute",
      left: "50%",
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] }
    };

    // Offset 0 (Active)
    if (diff === 0) {
      return {
        ...base,
        x: "-50%",
        scale: 1.3,
        opacity: 1,
        zIndex: 10,
        filter: "blur(0px)",
      };
    }
    
    // Offset 1 (Right)
    if (diff === 1 || (variants.length === 2 && index !== activeIndex && diff === -1)) {
      return {
        ...base,
        x: "35%",
        scale: 0.65,
        opacity: 0.3,
        zIndex: 5,
        filter: "blur(12px) grayscale(0.8)",
      };
    }

    // Offset -1 (Left)
    if (diff === -1) {
      return {
        ...base,
        x: "-135%",
        scale: 0.65,
        opacity: 0.3,
        zIndex: 5,
        filter: "blur(12px) grayscale(0.8)",
      };
    }

    // Exit Strategy
    return {
      ...base,
      x: diff > 0 ? "250%" : "-350%",
      scale: 0.5,
      opacity: 0,
      zIndex: 1,
      filter: "blur(15px) grayscale(1)",
    };
  };

  return (
    <div className="relative mt-4 sm:mt-6 md:mt-8 w-full h-[300px] sm:h-[370px] md:h-[440px] lg:h-[510px] xl:h-[570px] flex justify-center items-center overflow-visible">

      {/* LEFT BUTTON */}
      <button
        onClick={prevVariant}
        className="group absolute left-4 sm:left-50 z-40 w-14 h-14 flex items-center justify-center rounded-full
                   bg-[#ebebeb]
                   transition-all duration-300
                   hover:scale-110
                   cursor-pointer border-none"
        style={{ top: "50%", transform: "translateY(-50%)", boxShadow: '8px 8px 16px #d1d1d1, -8px -8px 16px #ffffff' }}
      >
        <ChevronLeft className="text-black transition-colors duration-300" size={20} strokeWidth={3} />
      </button>

      {variants.map((variant, index) => (
        <motion.div
          key={variant.id}
          className="cursor-pointer flex justify-center items-center absolute"
          animate={getVariantStyle(index)}
          initial={false}
          onClick={() => navigate(`/product/${variant.id}`)}
        >
          <img
            src={variant.image}
            alt={variant.name}
            className={`
              ${category === 'Jerseys' 
                ? 'h-[280px] sm:h-[350px] md:h-[420px] lg:h-[490px] xl:h-[550px]' 
                : 'h-[210px] sm:h-[260px] md:h-[310px] lg:h-[360px] xl:h-[420px]'
              } 
              w-auto object-contain drop-shadow-2xl relative z-10
            `}
          />
          {/* HEAVIER AESTHETIC BLOOM SHADOW */}
          <div 
            className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 w-[90%] h-[50px] z-0 pointer-events-none"
            style={{ 
              background: "radial-gradient(ellipse at center, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0) 80%)",
              filter: "blur(18px)",
              opacity: 1
            }}
          ></div>
        </motion.div>
      ))}

      {/* RIGHT BUTTON */}
      <button
        onClick={nextVariant}
        className="group absolute right-4 sm:right-50 z-40 w-14 h-14 flex items-center justify-center rounded-full
                   bg-[#ebebeb]
                   transition-all duration-300
                   hover:scale-110
                   cursor-pointer border-none"
        style={{ top: "50%", transform: "translateY(-50%)", boxShadow: '8px 8px 16px #d1d1d1, -8px -8px 16px #ffffff' }}
      >
        <ChevronRight className="text-black transition-colors duration-300" size={20} strokeWidth={3} />
      </button>
    </div>
  );
}

function Accordion({ title, content, isOpen, onClick, type }) {
  const renderContent = () => {
    if (
      type === "sizeChart" &&
      typeof content === "object" &&
      content !== null
    ) {
      const { header, measurements } = content;
      const rows = Object.entries(measurements);
      return (
        <div className="pt-2 space-y-2">
          <p className="text-sm sm:text-md">
            To assist you in selecting the most accurate fit, please refer to
            the product measurement details provided for each item.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-red-500 text-xs sm:text-sm md:text-md">
              <thead>
                <tr>
                  {header.map((head, index) => (
                    <th
                      key={index}
                      className="border border-gray-500 p-1 sm:p-2 text-left"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map(([key, values]) => (
                  <tr key={key}>
                    <td className="border border-gray-500 p-1 sm:p-2 font-medium">
                      {key}
                    </td>
                    {values.map((val, index) => (
                      <td
                        key={index}
                        className="border border-gray-500 p-1 sm:p-2"
                      >
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else if (type === "shippingPolicy") {
      const contentArray = Array.isArray(content)
        ? content
        : typeof content === "object" && content !== null
        ? Object.entries(content).map(([key, value]) => `${key}: ${value}`)
        : [content];
      return (
        <div className="pt-2">
          <ul className="list-disc pl-5 space-y-1 text-sm sm:text-md">
            {contentArray.map((item, index) => {
              if (typeof item === 'string' && (item.includes("Shipping Policy") || item.includes("سياسة الشحن"))) {
                const keyword = item.includes("Shipping Policy") ? "Shipping Policy" : "سياسة الشحن";
                const parts = item.split(keyword);
                return (
                  <li key={index}>
                    {parts[0]}
                    <Link
                      to="/legal?tab=shipping"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-500 underline cursor-pointer hover:text-red-700 transition-colors"
                    >
                      {keyword}
                    </Link>
                    {parts.slice(1).join(keyword)}
                  </li>
                );
              }
              return <li key={index}>{item}</li>;
            })}
          </ul>
        </div>
      );
    } else {
      const contentArray = Array.isArray(content)
        ? content
        : typeof content === "object" && content !== null
        ? Object.entries(content).map(([key, value]) => `${key}: ${value}`)
        : [content];
      return (
        <div className="pt-2">
          <ul className="list-disc pl-5 space-y-1 text-sm sm:text-md">
            {contentArray.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return (
    <div className="w-full border-t border-red-500">
      <button
        onClick={onClick}
        className="flex justify-between items-center w-full py-3 sm:py-4 text-left text-base sm:text-lg text-gray-800 focus:outline-none hover:text-red-500 transition-colors cursor-pointer"
      >
        <span className="flex-1 uppercase font-semibold text-left hover:text-red-500 transition-colors">
          {title}
        </span>
        <Plus
          className={`h-5 w-5 sm:h-6 sm:w-6 ml-2 transition-transform ${
            isOpen ? "rotate-45" : "rotate-0"
          } hover:text-red-500`}
          style={{ strokeWidth: 3 }}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden pb-4 text-gray-600 text-left"
          >
            {renderContent()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProductDisplay() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { t, language } = useLanguage();

  const [selectedSize, setSelectedSize] = useState("");
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [heroActiveIndex, setHeroActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState("stack");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Core state for the active variant to prevent full-page unmounts
  const [activeVariantId, setActiveVariantId] = useState("");

  const defaultId = products[0]?.variants[0]?.id || "v1_black";
  const initialId = id || defaultId;
  
  // Get product based on the current active variant ID
  const { product, selectedVariant } = getProductAndVariant(activeVariantId || initialId);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      setActiveVariantId(id);
    }
  }, [id]);

  useEffect(() => {
    if (selectedVariant) {
      const idx = product?.variants?.findIndex(
        (v) => v.id === selectedVariant.id
      );
      if (idx !== -1) setHeroActiveIndex(idx);
    }
  }, [selectedVariant, product]);

  const handleVariantChange = (newId) => {
    setActiveVariantId(newId);
    // Update URL silently
    window.history.replaceState(null, "", `/product/${newId}`);
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!product || !selectedVariant) {
    return (
      <div className="text-center py-16 text-gray-800 text-lg sm:text-xl">
        {t("productNotFound")}
      </div>
    );
  }

  const productImages = product.variants
    .filter((v) => v.id === activeVariantId)
    .flatMap((v) => {
      if (v.images && v.images.length > 0) {
        return v.images.map((imgUrl, idx) => ({
          id: `${v.id}_img${idx}`,
          url: imgUrl,
          color: v.color,
          variantId: v.id,
        }));
      }
      return [{ id: v.id, url: v.image, color: v.color, variantId: v.id }];
    });

  const handleVariantClick = (variantId) => {
    setActiveVariantId(variantId);
    const idx = product.variants.findIndex((v) => v.id === variantId);
    if (idx !== -1) setHeroActiveIndex(idx);
    navigate(`/product/${variantId}`);
  };

  const handleImageClick = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => setLightboxIndex(null);
  const prevLightbox = () => setLightboxIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  const nextLightbox = () => setLightboxIndex((prev) => (prev + 1) % productImages.length);

  // Close lightbox on Escape key + hide body scroll
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    const handleKey = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevLightbox();
      if (e.key === "ArrowRight") nextLightbox();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, productImages.length]);

  const toggleWishlist = () => setIsWishlisted((prev) => !prev);

  const accordionItems = [
    {
      title: t("details"),
      content:
        language === "ar" && product.details_ar
          ? product.details_ar
          : product.details,
      type: "details",
    },
    {
      title: t("shippingPolicy"),
      content:
        language === "ar" && product.shippingPolicy_ar
          ? product.shippingPolicy_ar
          : product.shippingPolicy,
      type: "shippingPolicy",
    },
    {
      title: t("sizeChart"),
      content:
        language === "ar" && product.sizeChart_ar
          ? product.sizeChart_ar
          : product.sizeChart,
      type: "sizeChart",
    },
  ];

  return (
    <section className="cursor-default min-h-screen flex flex-col items-center justify-start relative bg-[#ebebeb]">
      {/* Fixed blurring Hero Carousel */}
      <div
        className="w-full fixed top-[60px] z-10"
        style={{
          filter: `blur(${Math.min(scrollY / 100, 10)}px)`,
          transition: "filter 0.3s ease",
        }}
      >
        <HeroCarousel
          productId={product.id}
          variants={product.variants}
          activeIndex={heroActiveIndex}
          onVariantChange={handleVariantChange}
          category={product.category}
        />
      </div>

      {/* Main content scrolls over carousel */}
      <div className="w-full sm:w-[90%] lg:w-[85%] xl:w-[80%] px-4 sm:px-6 mt-[380px] sm:mt-[460px] md:mt-[540px] lg:mt-[610px] xl:mt-[670px] z-20 relative py-6 sm:py-8 md:py-12">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 sm:gap-12 md:gap-16 lg:gap-20 xl:gap-28">

          {/* LEFT COLUMN: stacked or grid product images */}
          <div className="w-full md:w-1/2 flex flex-col items-start space-y-4 sm:space-y-6">
            <div className="w-full flex justify-start items-end">
              <div className="text-left">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedVariant.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                  >
                    <p className="text-xl sm:text-2xl md:text-3xl mb-1 sm:mb-2 secondary leading-relaxed mt-2 font-extrabold text-red-500">
                      Inkphyous
                    </p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl title font-extrabold tracking-wider text-gray-800">
                      {language === "ar" && product.name_ar
                        ? product.name_ar
                        : product.hasVariants
                        ? selectedVariant.name
                        : product.name}
                    </h2>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="flex flex-col space-y-4 sm:space-y-6 w-full">
              <AnimatePresence>
                {productImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    className="w-full bg-white cursor-pointer shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)] transition-shadow duration-300 overflow-hidden"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onClick={() => handleImageClick(index)}
                  >
                    <img
                      src={image.url}
                      alt={`${product.name} ${image.color}`}
                      className="w-full h-auto object-cover"
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT COLUMN: sticky details panel */}
          <div className="w-full md:w-1/2 md:sticky md:top-20 self-start flex flex-col">

            {/* Price */}
            <div className="flex justify-end gap-2">
              <p className="text-4xl sm:text-5xl md:text-6xl flex items-center font-extrabold text-gray-900 ml-auto">
                <IndianRupee
                  size={32}
                  className="sm:w-10 sm:h-10"
                  strokeWidth={3}
                />
                {product.discountPriceINR || product.priceINR}
              </p>
            </div>

            {/* Color swatches + size selector */}
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center justify-end space-x-2 sm:space-x-3">
                <motion.div layoutId={`colors-${product.id}`} className="flex space-x-1.5 sm:space-x-2">
                  {product.variants.slice(0, 3).map((variant) => {
                    const isSelected = activeVariantId === variant.id;
                    return (
                      <motion.button
                        key={variant.id}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 cursor-pointer ${
                          isSelected
                            ? "border-gray-900 scale-110"
                            : "border-gray-300"
                        }`}
                        style={{ backgroundColor: variant.color }}
                        onClick={() => handleVariantClick(variant.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title={variant.color}
                      />
                    );
                  })}
                </motion.div>

                {/* Size dropdown */}
                <div className="w-24 sm:w-28">
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="w-full p-1.5 sm:p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 text-base sm:text-lg md:text-xl cursor-pointer"
                  >
                    <option value="">{t("sizeCaps") || "Size"}</option>
                    {product.sizeOptions.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Add to Cart + Wishlist */}
              <div className="flex justify-end gap-2 mt-2 w-full">
                <motion.button
                  className={`flex-1 sm:flex-none px-6 sm:px-8 md:px-12 py-3 sm:py-4 rounded-full text-base sm:text-lg md:text-xl uppercase tracking-wider transition-colors ${
                    selectedSize
                      ? "bg-gray-800 text-white hover:bg-red-500 cursor-pointer"
                      : "bg-gray-400 text-gray-200 cursor-not-allowed"
                  }`}
                  whileHover={{ scale: selectedSize ? 1.05 : 1 }}
                  whileTap={{ scale: selectedSize ? 0.95 : 1 }}
                  disabled={!selectedSize}
                  onClick={() => {
                    if (selectedSize) {
                      addToCart({
                        id: selectedVariant.id,
                        name: product.name,
                        image: selectedVariant.image,
                        color: selectedVariant.color,
                        size: selectedSize,
                        priceINR: product.priceINR,
                        discountPriceINR: product.discountPriceINR,
                        quantity: 1,
                      });
                      setShowNotification(true);
                      setTimeout(() => setShowNotification(false), 3000);
                    }
                  }}
                >
                  {selectedSize ? t("addToBag") : t("selectSize")}
                </motion.button>

                <motion.button
                  className={`h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 p-2 flex justify-center items-center rounded-full border transition-all duration-300 cursor-pointer ${
                    isWishlisted
                      ? "bg-red-500 border-red-500 text-white"
                      : "border-gray-300 text-gray-700 hover:bg-red-500 hover:border-red-500 hover:text-white"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleWishlist}
                >
                  <Heart
                    className={`h-5 w-5 sm:h-6 sm:w-6 ${
                      isWishlisted ? "fill-current" : ""
                    }`}
                  />
                </motion.button>
              </div>
            </div>

            <div className="mt-4 sm:mt-6 bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100">
              {/* Description */}
              <div className="text-left mb-6">
                <p className="text-sm sm:text-base md:text-lg text-justify text-gray-800 leading-relaxed whitespace-pre-line">
                  {(() => {
                    const cleanName = selectedVariant?.name.trim().split(/\s+/).slice(1).join(' ') || '';
                    return (language === "ar" && product.description_ar
                      ? product.description_ar
                      : product.description
                    )
                      .replace(/["“”'‘]?\(Concept name\)["“”'’]?/g, `"${cleanName}"`)
                      .replace(/["“”'‘]?\(اسم المفهوم\)["“”'’]?/g, `"${cleanName}"`)
                      .replace(/Concept embroidery/g, `${cleanName} embroidery`)
                      .replace(/تطريز المفهوم/g, `تطريز ${cleanName}`);
                  })()}
                </p>
              </div>

              {/* Accordions */}
              <div>
                {accordionItems.map((item) => (
                  <Accordion
                    key={item.title}
                    title={item.title}
                    content={item.content}
                    type={item.type}
                    isOpen={activeAccordion === item.title}
                    onClick={() =>
                      setActiveAccordion(
                        activeAccordion === item.title ? null : item.title
                      )
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-4 rounded-lg shadow-xl z-50 flex items-center gap-3"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="font-semibold">{t("addedToBag")}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULL-SCREEN LIGHTBOX — Fear of God style */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-white overflow-y-auto hide-scrollbar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="fixed top-6 right-6 z-50 p-4 transition-transform hover:scale-110 cursor-pointer mix-blend-difference text-white"
            >
              <X size={32} strokeWidth={1.5} />
            </button>

            {/* Image counter */}
            <div className="fixed top-8 left-8 z-50 text-sm font-light tracking-[0.2em] mix-blend-difference text-white">
              {lightboxIndex + 1} / {productImages.length}
            </div>

            {/* Previous button */}
            {productImages.length > 1 && (
              <button
                onClick={prevLightbox}
                className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 p-4 transition-transform hover:scale-110 cursor-pointer mix-blend-difference text-white"
              >
                <ChevronLeft size={44} strokeWidth={1} />
              </button>
            )}

            {/* Main image — full width, scrollable */}
            <AnimatePresence mode="wait">
              <motion.img
                key={lightboxIndex}
                src={productImages[lightboxIndex]?.url}
                alt={`${product.name} fullscreen`}
                className="w-full h-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              />
            </AnimatePresence>

            {/* Next button */}
            {productImages.length > 1 && (
              <button
                onClick={nextLightbox}
                className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 p-4 transition-transform hover:scale-110 cursor-pointer mix-blend-difference text-white"
              >
                <ChevronRight size={44} strokeWidth={1} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}