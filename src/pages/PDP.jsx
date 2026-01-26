"use client";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import products from "../Utils/Products";
import { Plus, Heart, IndianRupee } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "../components/CartContext";


// Helper to get product and specific variant
const getProductAndVariant = (id) => {
  if (!id) return { product: null, selectedVariant: null };
  const [productId, variantColor] = id.split("_");
  let product = products.find((p) => String(p.id) === String(productId) || String(p.id) === String(id));
  if (!product) product = products.find((p) => p.variants?.some((v) => v.id === id));
  if (!product) return { product: null, selectedVariant: null };
  const selectedVariant = product.variants?.find((v) => v.id === id) || product.variants?.[0];
  return { product, selectedVariant };
};

// Accordion Component
function Accordion({ title, content, isOpen, onClick }) {
  const renderContent = () => {
    if (title === "Size Chart" && typeof content === "object" && content !== null) {
      const { header, measurements } = content;
      const rows = Object.entries(measurements);
      return (
        <div className="pt-2 space-y-2">
          <p className="text-sm">To assist you in selecting the most accurate fit, please refer to the product measurement details provided for each item.</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 text-xs">
              <thead>
                <tr>{header.map((head, index) => (<th key={index} className="border border-gray-200 p-2 text-left bg-gray-50">{head}</th>))}</tr>
              </thead>
              <tbody>
                {rows.map(([key, values]) => (
                  <tr key={key}>
                    <td className="border border-gray-200 p-2 font-medium">{key}</td>
                    {values.map((val, index) => (<td key={index} className="border border-gray-200 p-2">{val}</td>))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else {
      const contentArray = Array.isArray(content) ? content : typeof content === "object" && content !== null ? Object.entries(content).map(([key, value]) => `${key}: ${value}`) : [content];
      return (<div className="pt-2"><ul className="list-disc pl-5 space-y-1 text-sm">{contentArray.map((item, index) => (<li key={index}>{item}</li>))}</ul></div>);
    }
  };

  return (
    <div className="w-full border-t border-gray-200 py-4">
      <button onClick={onClick} className="flex justify-between items-center w-full text-left text-[16px] uppercase tracking-wide font-medium text-gray-900 focus:outline-none hover:text-gray-600 transition-colors">
        <span>{title}</span>
        <Plus className={`h-4 w-4 transition-transform ${isOpen ? "rotate-45" : "rotate-0"}`} />
      </button>
      <AnimatePresence>
        {isOpen && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden pt-2 text-gray-600">{renderContent()}</motion.div>)}
      </AnimatePresence>
    </div>
  );
}

export default function ProductDisplay() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState("");
  const [activeVariantId, setActiveVariantId] = useState("");
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [scrollPos, setScrollPos] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  const defaultId = products[0]?.variants[0]?.id || "v1_black";
  const productId = id || defaultId;
  const { product, selectedVariant } = getProductAndVariant(productId);

  useEffect(() => {
    if (selectedVariant) setActiveVariantId(selectedVariant.id);
  }, [selectedVariant]);

  // Scroll listener for background blur
  useEffect(() => {
    const handleScroll = () => {
      setScrollPos(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Apply blur and fade-in to background product on scroll
  useEffect(() => {
    const bg = document.querySelector(".product-bg");
    if (!bg) return;

    const onScroll = () => {
      const scrollY = window.scrollY;
      const blur = Math.min(scrollY / 120, 18);
      const opacity = Math.min(scrollY / 300, 0.25); // Fade in from 0 to 0.25
      bg.style.filter = `blur(${blur}px)`;
      bg.style.opacity = opacity;
    };

    // Set initial state
    bg.style.opacity = 0;

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [selectedVariant]);

  if (!product || !selectedVariant) {
    return <div className="text-center py-16 text-gray-800">Product not found</div>;
  }

  const handleVariantClick = (variantId) => {
    setActiveVariantId(variantId);
    navigate(`/product/${variantId}`);
  };

  const accordionItems = [
    { title: "Details", content: product.details },
    { title: "Shipping Policy", content: product.shippingPolicy },
    { title: "Size Chart", content: product.sizeChart },
  ];

  // Calculate blur based on scroll
  const blurAmount = Math.min(scrollPos / 40, 15); // Progressive blur, max 15px

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden text-[#0f172a]">
      {/* GLOBAL BACKGROUND SYSTEM - Matches Home */}
      <div className="fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-[#ececeb]" />
        <div
          className="absolute inset-0 transition-filter duration-75 ease-out"
          style={{
            background: `
              radial-gradient(ellipse 120% 80% at 50% 10%,
                #ffffff 0%,
                #f6f6f4 35%,
                #ececeb 65%,
                #e5e5e3 100%)
            `,
          }}
        />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-24 items-start">

          {/* LEFT COLUMN: VISUALS */}
          <div className="flex-1 w-full flex flex-col items-center relative">
            {/* Product Visual Wrapper */}
            <div className="relative h-[80vh] flex items-center justify-center w-full mb-12">
              {/* Background clone */}
              {/* Background clone removed */}

              {/* Foreground main product */}
              <motion.img
                key={selectedVariant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                src={selectedVariant.image}
                alt={selectedVariant.name}
                className="product-main relative w-[75%] h-auto object-contain"
                style={{ zIndex: 2 }}
              />
            </div>

            {/* Thumbnails - Minimal */}
            <div className="flex gap-4 mt-8">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => handleVariantClick(variant.id)}
                  className={`relative group transition-all duration-300 ${activeVariantId === variant.id ? "opacity-100 scale-110" : "opacity-50 hover:opacity-80"
                    }`}
                >
                  <img
                    src={variant.image}
                    alt={variant.color}
                    className="h-24 w-24 object-contain"
                  />
                  {activeVariantId === variant.id && (
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-black rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: DETAILS */}
          <div className="w-full md:w-[480px] lg:w-[520px] pt-4 md:pt-12">

            {/* Brand Header */}
            <h2 className="text-[16px] font-bold tracking-[0.2em] text-black/40 uppercase mb-4">
              Inkphyous
            </h2>

            {/* Title */}
            <h1 className="text-[48px] md:text-[56px] leading-[1.1] font-bold text-gray-900 tracking-tight mb-2">
              {product.hasVariants ? product.variants[0].name : product.name}
            </h1>

            {/* Sub-details */}
            <div className="text-[14px] tracking-widest text-[#0f172a]/60 uppercase mb-8 ml-1">
              {product.category || 'Collection 2024'}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-10 ml-1">
              <span className="text-[30px] font-medium text-gray-900 flex items-center">
                <IndianRupee size={28} strokeWidth={2} />
                {product.discountPriceINR || product.priceINR}
              </span>
              <span className="text-[14px] text-gray-500 font-normal">
                Tax included. Free shipping.
              </span>
            </div>

            {/* Selections Container */}
            <div className="space-y-8 mb-12 ml-1">

              {/* Colors */}
              <div>
                <span className="text-[13px] font-bold text-gray-400 uppercase tracking-widest block mb-3">
                  Color — <span className="text-black">{selectedVariant.color}</span>
                </span>
                <div className="flex flex-wrap gap-3">
                  {product.variants.slice(0, 3).map((variant) => {
                    const isSelected = activeVariantId === variant.id;
                    return (
                      <button
                        key={variant.id}
                        onClick={() => handleVariantClick(variant.id)}
                        className={`w-8 h-8 rounded-full transition-all duration-200 ${isSelected
                          ? "ring-1 ring-black ring-offset-2 scale-110"
                          : "hover:scale-110 opacity-80 hover:opacity-100"
                          }`}
                        style={{ backgroundColor: variant.color }}
                        title={variant.color}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <span className="text-[13px] font-bold text-gray-400 uppercase tracking-widest block mb-3">
                  Size
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.sizeOptions.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[56px] h-14 px-4 flex items-center justify-center text-[16px] font-medium transition-all duration-200 border ${selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-gray-200 text-gray-600 hover:border-black"
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-16 ml-1">
              <button
                className={`flex-1 h-[56px] flex items-center justify-center text-[16px] font-bold uppercase tracking-[0.15em] transition-all duration-300 ${selectedSize
                  ? "bg-[#0f172a] text-white hover:bg-black hover:shadow-lg"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                disabled={!selectedSize}
                onClick={() => {
                  if (selectedSize) {
                    // Add item to cart with all details
                    addToCart({
                      id: selectedVariant.id,
                      name: product.name,
                      image: selectedVariant.image,
                      color: selectedVariant.color,
                      size: selectedSize,
                      priceINR: product.priceINR,
                      discountPriceINR: product.discountPriceINR,
                      quantity: 1
                    });

                    // Show notification
                    setShowNotification(true);
                    setTimeout(() => setShowNotification(false), 3000);
                  }
                }}
              >
                {selectedSize ? 'Add to Bag' : 'Select Size'}
              </button>

              <button className="w-[52px] h-[52px] flex items-center justify-center border border-gray-200 text-gray-400 hover:border-black hover:text-red-500 transition-colors duration-300">
                <Heart size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Description */}
            <div className="prose prose-sm text-gray-600 mb-12 ml-1 leading-relaxed">
              <p className="whitespace-pre-line font-light text-[16px]">
                {product.description}
              </p>
            </div>

            {/* Accordions */}
            <div className="border-t border-gray-100 pt-2 ml-1">
              {accordionItems.map((item) => (
                <Accordion
                  key={item.title}
                  title={item.title}
                  content={item.content}
                  isOpen={activeAccordion === item.title}
                  onClick={() => setActiveAccordion(activeAccordion === item.title ? null : item.title)}
                />
              ))}
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
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-semibold">Added to bag!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}