import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

  return (
    <div
      className="cursor-default relative w-full bg-[#ececeb] text-[#0f172a] flex flex-col"
      style={{
        height: "calc(100dvh / 0.75)",
        overflow: "hidden",
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
                       bg-white/70 backdrop-blur border border-gray-300 shadow-lg 
                       transition-all duration-300 
                       hover:bg-red-500 hover:border-white hover:scale-110
                       cursor-pointer"
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
                          className="object-contain drop-shadow-2xl"
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
                        className="object-contain drop-shadow-2xl"
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
                       bg-white/70 backdrop-blur border border-gray-300 shadow-lg 
                       transition-all duration-300 
                       hover:bg-red-500 hover:border-white hover:scale-110
                       cursor-pointer"
          >
            <ChevronRight className="text-black transition-colors duration-300 group-hover:text-white" />
          </button>

        </div>

        {/* PRODUCT INFO — compact, sits at bottom of content area */}
        <div className="relative flex flex-col items-center text-center px-6 max-w-2xl pb-2 z-10" style={{ flexShrink: 0 }}>
          <h1 className="text-4xl title md:text-5xl lg:text-6xl font-bold mb-2 md:mb-3">
            {language === "ar" && activeProduct.name_ar
              ? activeProduct.name_ar
              : activeProduct.name}
          </h1>

          <p className="text-sm md:text-base text-black/60 mb-4 md:mb-5">
            {language === "ar" && activeProduct.summary_ar
              ? activeProduct.summary_ar
              : activeProduct.summary}
          </p>

          {/* COLORS */}
          <div className="flex gap-5 mb-5 md:mb-6">
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
          </div>

          <button
            onClick={handleSeeMore}
            className="px-10 py-3.5 rounded-full bg-[#1f2937] text-white text-sm tracking-wider uppercase hover:bg-red-500 transition cursor-pointer"
          >
            {t("seeMore")}
          </button>
        </div>
      </div>

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