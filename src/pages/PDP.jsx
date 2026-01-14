"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, ArrowLeft, Plus } from "lucide-react";
import products from "../Utils/Products";
import { IndianRupee } from 'lucide-react';

// Helper function to find the product and selected variant
const getProductAndVariant = (id) => {
  let product = null;
  let selectedVariant = null;

  for (const p of products) {
    if (p.id === parseInt(id)) {
      product = p;
      selectedVariant = p.variants[0];
      break;
    }
    const variant = p.variants.find((v) => v.id === id);
    if (variant) {
      product = p;
      selectedVariant = variant;
      break;
    }
  }
  return { product, selectedVariant };
};

// Hero Carousel Component
function HeroCarousel({ variants, activeIndex, setActiveIndex }) {
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % variants.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [variants.length, setActiveIndex]);

  const getVariantStyle = (index) => {
    const isCurrent = index === activeIndex;
    const isNext = index === (activeIndex + 1) % variants.length;
    const isPrev = index === (activeIndex - 1 + variants.length) % variants.length;

    const base = {
      position: "absolute",
      transition: "all 1s cubic-bezier(0.25, 0.1, 0.25, 1)",
      transformOrigin: "center center",
    };

    if (isCurrent)
      return {
        ...base,
        zIndex: 10,
        filter: "blur(0px)",
        transform: "translateX(-50%) scale(1.4)",
        left: "50%",
        opacity: 1,
      };

    if (isNext)
      return {
        ...base,
        zIndex: 5,
        filter: "blur(3px)",
        transform: "translateX(40%) scale(0.6)",
        left: "50%",
        opacity: 0.5,
      };

    if (isPrev)
      return {
        ...base,
        zIndex: 5,
        filter: "blur(3px)",
        transform: "translateX(-140%) scale(0.6)",
        left: "50%",
        opacity: 0.5,
      };

    return { display: "none" };
  };

  return (
    <div className="relative mt-8 sm:mt-12 md:mt-16 w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] flex justify-center items-center overflow-hidden">
      {variants.map((variant, index) => (
        <motion.div
          key={variant.id}
          className="cursor-pointer flex justify-center items-center"
          animate={getVariantStyle(index)}
          initial={false}
          onClick={() => navigate(`/product/${variant.id}`)}
        >
          <img
            src={variant.image}
            alt={variant.name}
            className="h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] xl:h-[600px] w-fit object-contain"
          />
        </motion.div>
      ))}
    </div>
  );
}

function Accordion({ title, content, isOpen, onClick }) {
  const renderContent = () => {
    if (title === "Size Chart" && typeof content === "object" && content !== null) {
      const { title: chartTitle, header, measurements } = content;
      const rows = Object.entries(measurements);

      return (
        <div className="pt-2 space-y-2">
          <p className="text-sm sm:text-md">
            To assist you in selecting the most accurate fit, please refer to the
            product measurement details provided for each item.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-red-500 text-xs sm:text-sm md:text-md">
              <thead>
                <tr>
                  {header.map((head, index) => (
                    <th key={index} className="border border-gray-500 p-1 sm:p-2 text-left">
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
                      <td key={index} className="border border-gray-500 p-1 sm:p-2">
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
    } else if (title === "Shipping Policy" && Array.isArray(content)) {
      return (
        <div className="pt-2">
          <ul className="list-disc pl-5 space-y-2 text-sm sm:text-md text-gray-800">
            {content.map((item, index) => (
              <li key={index} className="marker:text-black">
                {item.includes("Shipping Policy") ? (
                  <p className="inline">
                    Read our full{" "}
                    <span className="text-red-600 font-semibold cursor-pointer hover:underline">
                      Shipping Policy
                    </span>{" "}
                    for more details
                  </p>
                ) : (
                  item
                )}
              </li>
            ))}
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
        className="flex flex-row-reverse justify-between items-center w-full py-3 sm:py-4 text-right text-base sm:text-lg text-gray-800 focus:outline-none hover:text-red-500 transition-colors"
      >
        <span className="flex-1 uppercase font-semibold text-right hover:text-red-500 transition-colors">
          {title}
        </span>

        <Plus
          className={`h-5 w-5 sm:h-6 sm:w-6 mr-2 transition-transform ${
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
            className="overflow-hidden pb-4 text-gray-600 text-right"
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
  const [scrollY, setScrollY] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [activeVariantId, setActiveVariantId] = useState("");
  const [activeAccordion, setActiveAccordion] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const defaultId = products[0]?.variants[0]?.id || "v1_black";
  const productId = id || defaultId;

  const { product, selectedVariant } = getProductAndVariant(productId);

  useEffect(() => {
    if (selectedVariant) {
      setActiveVariantId(selectedVariant.id);
    }
  }, [selectedVariant]);

  if (!product || !selectedVariant)
    return (
      <div className="text-center py-16 text-gray-800 text-lg sm:text-xl">
        Product not found
      </div>
    );

  const activeVariantIndex = product.variants.findIndex(
    (v) => v.id === activeVariantId
  );
  const productImages = product.variants.map((v) => ({
    id: v.id,
    url: v.image,
    color: v.color,
  }));

  const handleVariantClick = (variantId) => {
    setActiveVariantId(variantId);
  };

  const accordionItems = [
    { title: "Details", content: product.details },
    { title: "Shipping Policy", content: product.shippingPolicy },
    { title: "Size Chart", content: product.sizeChart },
  ];

  return (
    <section className="min-h-screen bg-white flex flex-col items-center justify-start relative">
      {/* Hero Carousel */}
      <div
        className="w-full fixed top-0 z-10"
        style={{
          filter: `blur(${Math.min(scrollY / 100, 10)}px)`,
          transition: "filter 0.3s ease",
        }}
      >
        <HeroCarousel
          variants={product.variants}
          activeIndex={activeVariantIndex !== -1 ? activeVariantIndex : 0}
          setActiveIndex={() => {}}
        />
      </div>

      {/* Product Content */}
      <div className="w-full sm:w-[90%] lg:w-[85%] xl:w-[80%] px-4 sm:px-6 mt-[350px] sm:mt-[450px] md:mt-[550px] lg:mt-[650px] xl:mt-[700px] z-20 relative py-6 sm:py-8 md:py-12">

        <div className="flex flex-col md:flex-row items-start gap-8 sm:gap-12 md:gap-16 lg:gap-20 xl:gap-28">

          {/* LEFT COLUMN: IMAGES */}
          <div className="w-full md:w-1/2 flex flex-col items-start space-y-4 sm:space-y-6">
            <div className="text-left">
              <p className="text-xl sm:text-2xl md:text-3xl mb-1 sm:mb-2 secondary leading-relaxed mt-2 font-extrabold text-red-500">
                {product.brand}
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl title font-extrabold tracking-wider text-gray-800">
                {product.hasVariants
                  ? `${product.variants[0].name}`
                  : product.name}
              </h2>
            </div>

            {/* Images */}
            <AnimatePresence>
              {productImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  className="w-full bg-white p-2 cursor-pointer"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => handleVariantClick(image.id)}
                >
                  <img
                    src={image.url}
                    alt={`${product.name} ${image.color}`}
                    className="w-full h-auto object-contain"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* RIGHT COLUMN — DESCRIPTION, PRICE, SIZE, ETC */}
          <div className="w-full md:w-1/2 md:sticky md:top-20 self-start flex flex-col gap-2">
            <div className="flex justify-end gap-2">
              <p className="text-4xl sm:text-5xl md:text-6xl flex items-center font-extrabold text-gray-900 ml-auto">
                <IndianRupee size={32} className="sm:w-10 sm:h-10" strokeWidth={3}/>{product.discountPriceINR || product.priceINR}
              </p>
            </div>

            <div className="flex flex-col items-end gap-2">
              {/* Color & Size Row */}
              <div className="flex items-center justify-end space-x-2 sm:space-x-3">
                {/* Colors */}
                <div className="flex space-x-1.5 sm:space-x-2">
                  {product.variants.slice(0, 3).map((variant) => {
                    const isSelected = activeVariantId === variant.id;
                    return (
                      <motion.button
                        key={variant.id}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 ${
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
                </div>

                {/* Size Select */}
                <div className="w-24 sm:w-28">
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="w-full p-1.5 sm:p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 text-base sm:text-lg md:text-xl"
                  >
                    <option value="">Size</option>
                    {product.sizeOptions.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Add to cart */}
              <div className="flex justify-end gap-2 mt-2 w-full">
                <motion.button
                  className={`flex-1 sm:flex-none px-6 sm:px-8 md:px-12 py-3 sm:py-4 rounded-full text-base sm:text-lg md:text-xl uppercase tracking-wider transition-colors ${
                    selectedSize
                      ? "bg-gray-800 text-white hover:bg-gray-700"
                      : "bg-gray-400 text-gray-200 cursor-not-allowed"
                  }`}
                  whileHover={{ scale: selectedSize ? 1.05 : 1 }}
                  whileTap={{ scale: selectedSize ? 0.95 : 1 }}
                  disabled={!selectedSize}
                  onClick={() => {
                    if (selectedSize)
                      navigate(
                        `/checkout?productId=${product.id}&variantId=${selectedVariant.id}&size=${selectedSize}`
                      );
                  }}
                >
                  Add to Cart
                </motion.button>

                <motion.button
                  className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 p-2 flex justify-center items-center rounded-full border border-gray-300 text-gray-700 hover:bg-red-500 hover:text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart className="h-5 w-5 sm:h-6 sm:w-6" />
                </motion.button>
              </div>
            </div>

            <div className="text-left mt-4 sm:mt-6 pb-2">
              <p className="text-sm sm:text-base md:text-lg text-justify text-gray-800 leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>

            {/* Accordions */}
            <div className="mt-4">
              {accordionItems.map((item) => (
                <Accordion
                  key={item.title}
                  title={item.title}
                  content={item.content}
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
    </section>
  );
}