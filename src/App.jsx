import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Opener from "./components/3DModel";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home"
import Header from "./components/Header";
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
import Footer from "./components/Footer";
import LogoScene from "./components/LogoScene";
import "./App.css";

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const navigate = useNavigate();

  const handleIntroComplete = () => {
    setShowIntro(false);
    navigate('/'); // Ensure we start at Home
  };

  // Show logo intro first
  if (showIntro) {
    return (
      <div className="app-container">
        <div className="scene-container">
          <LogoScene onIntroComplete={handleIntroComplete} />
        </div>
      </div>
    );
  }

  // After intro, show main website
  return (
    <div
      style={{
        zoom: "75%",
        animation: "fadeIn 1200ms ease-out",
        opacity: 1
      }}
    >
      {/* Always show Header */}
      < Header />

      <Routes>
        {/* <Route path="/" element={<Welcome />} /> */}
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
      <Analytics />
    </div >
  );
}

export default App;
