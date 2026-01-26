"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CircleUserRound, X, Search, ChevronDown, ArrowLeft } from "lucide-react";
import { HeartIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import { TbPaperBag } from "react-icons/tb";
import InphyousLogo from "./InphyousLogo";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center, Environment } from "@react-three/drei";

// 3D Model Component
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
  // ... (state and hooks remain the same) ...
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

      {/* Floating Editorial Header */}
      <header className="fixed top-0 left-0 w-full z-50">
        <div className="px-14 py-6">
          <div className="flex items-center justify-between relative">

            {/* LEFT — BRAND */}
            <Link
              to="/"
              className={`hover:opacity-80 transition ${(location.pathname.includes("/contact") || location.pathname.includes("/legal"))
                ? "invisible pointer-events-none"
                : ""
                }`}
            >
              <InphyousLogo height="44" />
            </Link>

            {/* Center 3D Logo - Absolutely positioned but within the same vertical alignment */}
            <div
              onClick={() => navigate("/")}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[150px] cursor-pointer pointer-events-auto flex items-center justify-center"
              style={{ marginTop: '10.5px' }}
            >
              <Canvas camera={{ position: [0, 2, 10], fov: 50 }}>
                <ambientLight intensity={0.8} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                <SpinningModel url="/pendant.glb" />
                <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
                <Environment preset="sunset" />
              </Canvas>
            </div>

            {/* RIGHT — ICONS */}
            <div
              className="
                flex items-center gap-8
                text-[18px]
                font-semibold
                leading-none
                text-black/85
              "
            >
              {/* Login Link */}
              <button
                onClick={() => navigate('/login')}
                className="flex items-center leading-none hover:text-red-500 transition font-semibold cursor-pointer title"
              >
                Account
              </button>

              {/* Cart Icon */}
              <button className="flex items-center leading-none hover:text-red-500 transition relative font-semibold cursor-pointer title">
                Bag
                {cartItemCount > 0 && (
                  <span className="absolute -right-2 -top-1 w-1.5 h-1.5 bg-red-500 rounded-full" />
                )}
              </button>

              {/* Language Dropdown */}
              <div className="relative" ref={langDropdownRef}>
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center gap-1 font-semibold leading-none hover:text-red-500 transition cursor-pointer title"
                >
                  {selectedLang}
                  <ChevronDown className="w-4 h-4" strokeWidth={2.5} />
                </button>

                {/* Dropdown Menu */}
                {isLangOpen && (
                  <div className="absolute right-0 top-full mt-4 bg-white border border-black/10 rounded-lg shadow-lg py-3 min-w-[160px] z-50">
                    <button
                      onClick={() => {
                        setSelectedLang("EN");
                        setIsLangOpen(false);
                      }}
                      className="w-full px-7 py-3.5 text-left text-[16px] hover:text-red-500 transition font-medium cursor-pointer title"
                    >
                      English
                    </button>
                    <button
                      onClick={() => {
                        setSelectedLang("AR");
                        setIsLangOpen(false);
                      }}
                      className="w-full px-7 py-3.5 text-left text-[16px] hover:text-red-500 transition font-medium cursor-pointer title"
                    >
                      Arabic
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </header>
    </>
  );
}
