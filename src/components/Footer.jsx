import React from "react";

const Footer = () => {
  return (
    <footer className="w-full secondary bg-white text-black p-4 sm:p-6 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6 text-xs tracking-wide">
        
        {/* Empty spacer for desktop layout */}
        <div className="hidden md:block mb-0 md:mb-12"></div>

        {/* Links Section */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center md:justify-end gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-18 text-base sm:text-lg w-full md:w-auto">
          
          {/* Currency Selector
          <select className="bg-transparent outline-none cursor-pointer text-base sm:text-lg border-none focus:ring-0 text-center sm:text-left order-1">
            <option>India (INR ₹)</option>
            <option>UAE (EUR €)</option>
          </select> */}
          
          {/* Contact Link */}
          <a 
            href="contact" 
            className="hover:opacity-60 transition-opacity hover:underline order-2"
          >
            Contact
          </a>
          
          {/* Legalities Link */}
          <a 
            href="/legal" 
            className="hover:opacity-60 transition-opacity hover:underline order-3"
          >
            Legalities
          </a>
          
          {/* Social Link */}
          <a
            href="https://instagram.com/inkphyous"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-60 transition-opacity hover:underline order-4"
          >
            Social
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;