import React from "react";

const Footer = () => {
  return (
    <footer
      className="py-6 relative w-full shrink-0 translation-all duration-300"
      style={{
        background: 'transparent',
        color: '#000000', // Pure black for maximum visibility
      }}
    >
      <div className="w-full px-12">

        {/* Footer links aligned to RIGHT edge */}
        <div className="flex justify-end items-center gap-8 text-lg font-normal tracking-wide">

          {/* Contact Link */}
          <a
            href="contact"
            className="transition-colors duration-200"
            style={{ ':hover': { color: '#0f172a' } }}
            onMouseEnter={(e) => e.target.style.color = '#0f172a'}
            onMouseLeave={(e) => e.target.style.color = 'inherit'}
          >
            Contact
          </a>

          {/* Legalities Link */}
          <a
            href="/legal"
            className="transition-colors duration-200"
            onMouseEnter={(e) => e.target.style.color = '#0f172a'}
            onMouseLeave={(e) => e.target.style.color = 'inherit'}
          >
            Legalities
          </a>

          {/* Social Link */}
          <a
            href="https://instagram.com/inkphyous"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-200"
            onMouseEnter={(e) => e.target.style.color = '#0f172a'}
            onMouseLeave={(e) => e.target.style.color = 'inherit'}
          >
            Social
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;