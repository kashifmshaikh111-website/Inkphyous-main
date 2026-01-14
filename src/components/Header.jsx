"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CircleUserRound, X, Search, ChevronDown, ArrowLeft } from "lucide-react";
import { HeartIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import { TbPaperBag } from "react-icons/tb";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center, Environment } from "@react-three/drei";

// 3D Model Component
function SpinningModel({ url }) {
  const group = useRef();
  const { scene } = useGLTF(url);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.5;
  });

  return (
    <Center>
      <group ref={group} scale={30}>
        <primitive object={scene} />
      </group>
    </Center>
  );
}

export default function Header({ openShopAll }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("En");
  const [isScrolled, setIsScrolled] = useState(false);

  const { cartItems, lastAddedItem } = useCart();
  const cartDropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const langDropdownRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIsCartOpen(false);
    setIsSearchOpen(false);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    setIsSidebarOpen(false);
    setIsSearchOpen(false);
  };

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const closeCartDropdown = () => setIsCartOpen(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (cartDropdownRef.current && !cartDropdownRef.current.contains(event.target))
        closeCartDropdown();
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target))
        setIsLangOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (lastAddedItem) {
      setIsNotificationVisible(true);
      const timer = setTimeout(() => setIsNotificationVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [lastAddedItem]);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cartItemCount = cartItems.length;
const isProductPage =
  location.pathname.includes("/product") ||
  location.pathname.includes("/contact") ||
  location.pathname.includes("/legal");

  const searchVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: { width: "180px", opacity: 1, transition: { duration: 0.3 } },
    exit: { width: 0, opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <>
      {/* Notification */}
      <AnimatePresence>
        {isNotificationVisible && lastAddedItem && (
          <motion.div
            className="fixed top-4 right-4 z-[100] bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center text-sm space-x-2"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
          >
            <TbPaperBag className="h-6 w-6" />
            <span>
              Added <b>{lastAddedItem.name}</b> to your cart!
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header
       className={`bg-white h-[50px] py-6  text-black fixed top-0 left-0 w-full z-50 transition-all duration-300`}

      >
        <div className="mx-auto px-4 mt-2 flex items-center justify-between relative">

          {/* Mobile Menu */}
         

          {/* Back Button */}
          {isProductPage && (
            <motion.div
              onClick={() => navigate(-1)}
              className="absolute left-20 top-1/2 -translate-y-1/2 flex items-center gap-2 cursor-pointer hover:text-red-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="p-2 bg-white rounded-full shadow-sm border">
                <ArrowLeft className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium">Back</span>
            </motion.div>
          )}

          {/* Center 3D Logo */}
          <div
            onClick={() => navigate("/")}
            className="absolute md:mt-4 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px] h-[120px] cursor-pointer"
          >
            <Canvas camera={{ position: [0, 2, 10], fov: 50 }}>
              <ambientLight intensity={0.8} />
              <directionalLight position={[5, 5, 5]} intensity={1} />
              <SpinningModel url="/pendant.glb" />
              <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
              <Environment preset="sunset" />
            </Canvas>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4 ml-auto relative">

            {/* Search Field */}
            <AnimatePresence>
              {isSearchOpen && (
                <motion.div
                  variants={searchVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex items-center"
                >
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search..."
                    className="p-2 border border-gray-300 rounded-md text-sm focus:outline-none w-full"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* <button onClick={toggleSearch} className="p-2 cursor-pointer hover:text-red-500">
              <Search className="h-6 w-6" />
            </button>

            <CircleUserRound className="h-6 w-6 cursor-pointer hover:text-red-500" /> */}

            {/* Cart */}
            {/* <button onClick={toggleCart} className="relative p-1 cursor-pointer hover:text-red-500">
              <TbPaperBag className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -right-1 -top-1 bg-red-500 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button> */}

            {/* Language Dropdown */}
            <div className="relative z-500" ref={langDropdownRef}>
              {/* <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center text-sm font-medium cursor-pointer hover:text-red-500"
              >
                {selectedLang}
                <ChevronDown className="h-6 w-6 ml-1" />
              </button> */}

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded-md shadow-lg text-md"
                  >
                    <button
                      onClick={() => {
                        setSelectedLang("En");
                        setIsLangOpen(false);
                      }}
                      className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      English
                    </button>

                    <button
                      onClick={() => {
                        setSelectedLang("Ar");
                        setIsLangOpen(false);
                      }}
                      className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      Arabic
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
