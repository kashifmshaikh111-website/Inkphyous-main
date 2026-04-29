import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, LayoutGrid, Layers } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import products from "../Utils/Products";
import { useLanguage } from "../components/LanguageContext";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [colorMap, setColorMap] = useState(() => {
    const initial = {};
    products.forEach((p, i) => {
      initial[i] = p.availableColors[0] || null;
    });
    return initial;
  });
  const [imageKey, setImageKey] = useState(0);
  const [viewMode, setViewMode] = useState("carousel");
  const [lastInteractionTime, setLastInteractionTime] = useState(null);

  const selectedColor = colorMap[currentIndex] || null;
  const setSelectedColor = (color) => {
    setColorMap((prev) => ({ ...prev, [currentIndex]: color }));
  };

  const { language, t } = useLanguage();
  const navigate = useNavigate();

  const activeProduct = products[currentIndex];

  useEffect(() => {
    if (isHovering) return;

    const interval = setInterval(() => {
      if (!lastInteractionTime || Date.now() - lastInteractionTime > 6000) {
        setCurrentIndex((prev) => (prev + 1) % products.length);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovering, lastInteractionTime]);

  useEffect(() => {
    setImageKey((k) => k + 1);
  }, [currentIndex]);

  const nextProduct = () => {
    setLastInteractionTime(Date.now());
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevProduct = () => {
    setLastInteractionTime(Date.now());
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const getPosition = (i) => {
    if (i === currentIndex) return "center";
    if (i === (currentIndex - 1 + products.length) % products.length)
      return "left";
    if (i === (currentIndex + 1) % products.length) return "right";
    return "hidden";
  };

  const variants = {
    center: (isPants) => ({
      x: 0,
      scale: isPants ? 1.1 : 1.3,
      opacity: 1,
      zIndex: 3,
      filter: "blur(0px)",
    }),
    left: {
      x: "-28vw",
      scale: 0.65,
      opacity: 0.3,
      zIndex: 2,
      filter: "blur(8px) grayscale(0.5)",
    },
    right: {
      x: "28vw",
      scale: 0.65,
      opacity: 0.3,
      zIndex: 2,
      filter: "blur(8px) grayscale(0.5)",
    },
    hidden: {
      opacity: 0,
      scale: 0.6,
      zIndex: 1,
      filter: "blur(10px)",
    },
  };

  const getImageByColor = (product, color) => {
    if (!color || !product.hasVariants) return product.image;
    const variant = product.variants.find(
      (v) => v.color.toLowerCase() === color.toLowerCase()
    );
    return variant?.image || product.image;
  };

  const handleSeeMore = () => {
    let targetId = activeProduct.id;

    if (selectedColor && activeProduct.hasVariants) {
      const variant = activeProduct.variants.find(
        (v) => v.color.toLowerCase() === selectedColor.toLowerCase()
      );
      if (variant) targetId = variant.id;
    }

    navigate(`/product/${targetId}?name=${encodeURIComponent(activeProduct.name)}`);
  };

  const imageVariants = {
    initial: { y: 80, opacity: 0, scale: 0.95 },
    animate: { y: 0, opacity: 1, scale: 1 },
    exit: { y: -60, opacity: 0, scale: 0.95 },
  };

  const getGridImageByColor = (product, color) => {
    if (!color || !product.hasVariants) return product.image;
    const variant = product.variants.find(
      (v) => v.color.toLowerCase() === color.toLowerCase()
    );
    return variant?.image || product.image;
  };

  const handleGridProductClick = (product, color) => {
    let targetId = product.id;
    if (color && product.hasVariants) {
      const variant = product.variants.find(
        (v) => v.color.toLowerCase() === color.toLowerCase()
      );
      if (variant) targetId = variant.id;
    }
    navigate(`/product/${targetId}?name=${encodeURIComponent(product.name)}`);
  };

  return (
    <div
      className="cursor-default relative w-full bg-[#ececeb] text-[#0f172a] flex flex-col"
      style={{
        height: viewMode === "grid" ? "auto" : "calc(100dvh / 0.75)",
        minHeight: viewMode === "grid" ? "100dvh" : undefined,
        overflow: viewMode === "grid" ? "auto" : "hidden",
      }}
    >

      {/* Background gradient */}
      <div className="fixed inset-0 -z-20">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 160% 80% at 50% 10%, #ffffff 0%, #f6f6f4 35%, #ececeb 65%, #e5e5e3 100%)",
          }}
        />
      </div>

      {/* VIEW TOGGLE — top right */}
      <div className="fixed top-20 right-6 z-50 flex gap-1 bg-white/80 backdrop-blur-md rounded-lg p-1 shadow-lg border border-gray-200">
        <button
          onClick={() => setViewMode("grid")}
          className={`p-2.5 rounded-md transition-all duration-200 cursor-pointer ${
            viewMode === "grid"
              ? "bg-gray-900 text-white shadow-sm"
              : "text-gray-400 hover:text-gray-700"
          }`}
        >
          <LayoutGrid size={18} />
        </button>
        <button
          onClick={() => setViewMode("carousel")}
          className={`p-2.5 rounded-md transition-all duration-200 cursor-pointer ${
            viewMode === "carousel"
              ? "bg-gray-900 text-white shadow-sm"
              : "text-gray-400 hover:text-gray-700"
          }`}
        >
          <Layers size={18} />
        </button>
      </div>

      {viewMode === "carousel" ? (
        <>
          {/* Main content area — fills all available space */}
          <div
            className="relative w-full flex-1 flex flex-col items-center"
            style={{
              paddingTop: "90px",
              minHeight: 0,
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >

            {/* CAROUSEL — takes most of the space */}
            <div className="relative w-full flex-1 flex items-center justify-center" style={{ minHeight: 0 }}>

              {/* LEFT BUTTON */}
              <button
                onClick={prevProduct}
                className="group absolute left-[4%] md:left-[8%] lg:left-[12%] xl:left-[15%] z-40 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full 
                           bg-[#ececeb]
                           transition-all duration-300 
                           hover:bg-red-500 hover:scale-110
                           cursor-pointer"
                style={{ boxShadow: '6px 6px 12px #d1d1cf, -6px -6px 12px #ffffff' }}
              >
                <ChevronLeft className="text-black transition-colors duration-300 group-hover:text-white" />
              </button>

              {/* CAROUSEL CONTENT */}
              <div className="relative w-full h-full flex items-center justify-center" style={{ minHeight: 0 }}>

                <AnimatePresence>
                  {products.map((product, i) => {
                    const position = getPosition(i);
                    const isCenter = i === currentIndex;
                    const isPants =
                      product.name.toLowerCase().includes("pant") ||
                      product.name.toLowerCase().includes("jhort") ||
                      product.category?.toLowerCase()?.includes("pant") ||
                      product.category?.toLowerCase()?.includes("jhort");

                    return (
                      <motion.div
                        key={product.id}
                        className="absolute flex items-center justify-center"
                        custom={isPants}
                        variants={variants}
                        animate={position}
                        initial={false}
                        transition={{
                          duration: 0.6,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        {isCenter ? (
                          <AnimatePresence mode="wait">
                            <motion.img
                              key={getImageByColor(product, selectedColor)}
                              src={getImageByColor(product, selectedColor)}
                              alt={product.name}
                              variants={imageVariants}
                              initial="initial"
                              animate="animate"
                              exit="exit"
                              transition={{
                                duration: 0.45,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                              className="object-contain drop-shadow-2xl relative z-10"
                              style={{
                                height: isPants ? "66vh" : "75vh",
                                maxHeight: isPants ? "800px" : "900px",
                              }}
                            />
                          </AnimatePresence>
                        ) : (
                          <img
                            src={getImageByColor(product, colorMap[i])}
                            alt={product.name}
                            className="object-contain drop-shadow-2xl relative z-10"
                            style={{ height: "55vh", maxHeight: "600px" }}
                          />
                        )}
                        
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

              </div>

              {/* RIGHT BUTTON */}
              <button
                onClick={nextProduct}
                className="group absolute right-[4%] md:right-[8%] lg:right-[12%] xl:right-[15%] z-40 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full 
                           bg-[#ececeb]
                           transition-all duration-300 
                           hover:bg-red-500 hover:scale-110
                           cursor-pointer"
                style={{ boxShadow: '6px 6px 12px #d1d1cf, -6px -6px 12px #ffffff' }}
              >
                <ChevronRight className="text-black transition-colors duration-300 group-hover:text-white" />
              </button>

            </div>

            {/* PRODUCT INFO — compact, sits at bottom of content area */}
            <div className="relative flex flex-col items-center text-center px-6 max-w-2xl pb-2 z-10 w-full" style={{ flexShrink: 0 }}>
              
              {/* ANIMATED CONTENT CONTAINER (with fixed min-height to prevent button jumping) */}
              <div className="min-h-[160px] md:min-h-[180px] w-full flex flex-col items-center justify-start">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProduct.id}
                    className="flex flex-col items-center w-full"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={{
                      initial: { opacity: 0 },
                      animate: { opacity: 1, transition: { duration: 0.1 } },
                      exit: { opacity: 0, transition: { duration: 0.2 } }
                    }}
                  >
                    {/* TITLE */}
                    <div className="overflow-visible mb-4 md:mb-5 pt-1">
                      <motion.h1
                        className="text-4xl title md:text-5xl lg:text-6xl font-bold"
                        variants={{
                          initial: { y: "100%", opacity: 0 },
                          animate: { y: "0%", opacity: 1, transition: { delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                          exit: { y: "-50%", opacity: 0, transition: { duration: 0.2, ease: "easeIn" } }
                        }}
                      >
                        {language === "ar" && activeProduct.name_ar
                          ? activeProduct.name_ar
                          : activeProduct.name}
                      </motion.h1>
                    </div>

                    {/* DESCRIPTION */}
                    <div className="overflow-visible mb-4 md:mb-5">
                      <motion.p
                        className="text-base md:text-lg lg:text-xl text-black/70 tracking-wide font-medium"
                        variants={{
                          initial: { y: "100%", opacity: 0 },
                          animate: { y: "0%", opacity: 1, transition: { delay: 0.25, duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
                          exit: { y: "-50%", opacity: 0, transition: { duration: 0.2, ease: "easeIn" } }
                        }}
                      >
                        {language === "ar" && activeProduct.summary_ar
                          ? activeProduct.summary_ar
                          : activeProduct.summary}
                      </motion.p>
                    </div>

                    {/* COLORS */}
                    <div className="overflow-visible mb-4 md:mb-5 pt-2">
                      <motion.div
                        className="flex gap-5"
                        variants={{
                          initial: { y: "100%", opacity: 0, scale: 0.8 },
                          animate: { y: "0%", opacity: 1, scale: 1, transition: { delay: 0, duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
                          exit: { y: "-50%", opacity: 0, scale: 0.9, transition: { duration: 0.2, ease: "easeIn" } }
                        }}
                      >
                        {activeProduct.availableColors.map((color, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setSelectedColor(color);
                              setImageKey((k) => k + 1);
                              setLastInteractionTime(Date.now());
                            }}
                            className={`w-6 h-6 rounded-full transition ${
                              selectedColor === color ? "scale-165 border-2 border-black" : ""
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* FIXED BUTTON */}
              <div className="overflow-visible mt-2 relative z-10">
                <button
                  onClick={handleSeeMore}
                  className="px-10 py-3.5 rounded-full bg-[#1f2937] text-white text-sm tracking-wider uppercase hover:bg-red-500 transition cursor-pointer"
                >
                  {t("seeMore")}
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* GRID VIEW */
        <div className="w-full px-4 sm:px-6 lg:px-8 pt-28 pb-12">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {products.map((product, i) => {
              const gridColor = colorMap[i] || product.availableColors[0];
              return (
                <motion.div
                  key={product.id}
                  className="group bg-white rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  onClick={() => handleGridProductClick(product, gridColor)}
                >
                  {/* Image container */}
                  <div className="relative aspect-square bg-[#f5f5f4] flex items-center justify-center p-6 overflow-hidden">
                    <img
                      src={getGridImageByColor(product, gridColor)}
                      alt={product.name}
                      className="object-contain h-full w-full drop-shadow-lg group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Product info */}
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-xs font-semibold text-red-500 uppercase tracking-wider mb-0.5">
                          {product.brand}
                        </p>
                        <h3 className="text-sm sm:text-base font-bold text-gray-900 title">
                          {language === "ar" && product.name_ar ? product.name_ar : product.name}
                        </h3>
                      </div>
                      <p className="text-sm sm:text-base font-bold text-gray-900">
                        ₹{product.discountPriceINR || product.priceINR}
                      </p>
                    </div>

                    {/* Color dots */}
                    <div className="flex gap-2 mt-2">
                      {product.availableColors.map((color, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            setColorMap((prev) => ({ ...prev, [i]: color }));
                          }}
                          className={`w-4 h-4 rounded-full border transition-all duration-200 cursor-pointer ${
                            gridColor === color
                              ? "border-gray-900 scale-125 shadow-sm"
                              : "border-gray-300 hover:border-gray-500"
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      )}

      {/* FOOTER — integrated into the Home page layout, pinned at bottom */}
      <div className="w-full flex justify-end items-center px-12 py-4" style={{ flexShrink: 0 }}>
        <div className="flex gap-8 text-[18px] font-semibold text-black/80">
          <a href="/contact" className="hover:text-red-500 transition title">{t("contact")}</a>
          <a href="/legal" className="hover:text-red-500 transition title">{t("legalities")}</a>
          <a href="https://instagram.com/inkphyous" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition title">{t("social")}</a>
        </div>
      </div>
    </div>
  );
}