import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, LayoutGroup } from "framer-motion";

import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LogoScene from "./components/LogoScene";

import Home from "./pages/Home";
import ProductDisplay from "./pages/PDP";
import Checkout from "./pages/Checkout";
import PDPC from "./pages/PDPC";
import Legal from "./pages/Legal";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Cart from "./pages/Cart";

import { Analytics } from "@vercel/analytics/react";
import "./App.css";

function App() {
  const [showIntro, setShowIntro] = useState(() => window.location.pathname === "/");
  const navigate = useNavigate();
  const location = useLocation();

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  useEffect(() => {
    document.body.style.cursor = "default";
  }, []);

  // ✅ Detect PDPC route
  const isPDPCPage = location.pathname.startsWith("/pdpc");
  const isHomePage = location.pathname === "/";

  // ✅ Intro screen
  if (showIntro) {
    return (
      <div className="app-container">
        <div className="scene-container">
          <LogoScene onIntroComplete={handleIntroComplete} />
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div
        className="min-h-screen flex flex-col"
        style={{
          zoom: "75%",
          animation: "fadeIn 1200ms ease-out",
          opacity: 1,
        }}
      >
        {/* HEADER */}
        <Header />

        {/* MAIN CONTENT */}
        <div className="flex-grow">
          <LayoutGroup>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDisplay />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/pdpc/:id" element={<PDPC />} />
                <Route path="/legal" element={<Legal />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </AnimatePresence>
          </LayoutGroup>
        </div>

        {/* FOOTER (hidden on PDPC and Home — Home has its own integrated footer) */}
        {!isPDPCPage && !isHomePage && <Footer />}

        <Analytics />
      </div>
    </ErrorBoundary>
  );
}

export default App;