import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../components/LanguageContext';
import { getLegalContent } from '../Utils/LegalData';

export default function LegalitiesPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activePage, setActivePage] = useState('home');

  const renderHome = () => (
    <div className="min-h-screen pt-32 pb-12 bg-white flex items-center justify-center px-4 relative">
      {/* BACK BUTTON */}
      <button
        onClick={() => navigate('/')}
        className="fixed top-4 left-4 sm:top-8 sm:left-8 z-[60] flex items-center gap-3 group cursor-pointer"
      >
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center group-hover:border-red-500 transition-all duration-300">
          <ArrowLeft size={20} className="text-gray-600 group-hover:text-red-500 transition-colors" strokeWidth={1.5} />
        </div>
        <span className="font-medium text-sm sm:text-base text-gray-600 group-hover:text-red-500 transition-colors">{t('back')}</span>
      </button>

      <div className="w-full grid grid-cols-1 md:grid-cols-[49%_52%] mt-16 sm:mt-0">
        {/* Left Section - Legalities */}
        <div className="w-full flex justify-center md:items-center md:justify-center p-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl title font-bold text-gray-900 tracking-tight text-center">
            {t('legalities')}
          </h1>
        </div>

        {/* Right Section - Buttons */}
        <div className="w-full flex title flex-col items-center justify-center space-y-4 sm:space-y-6 lg:space-y-8 p-8 border-t md:border-t-0 md:border-l border-red-500">
          <button
            onClick={() => setActivePage('privacy')}
            className="block text-xl sm:text-2xl title font-semibold text-gray-700 hover:text-red-500 cursor-pointer transition-colors duration-300 text-center"
          >
            {t('privacyPolicy')}
          </button>

          <button
            onClick={() => setActivePage('terms')}
            className="block text-xl sm:text-2xl title font-semibold text-gray-700 hover:text-red-500 cursor-pointer transition-colors duration-300 text-center"
          >
            {t('termsConditions')}
          </button>

          <button
            onClick={() => setActivePage('shipping')}
            className="block text-xl sm:text-2xl title font-semibold text-gray-700 hover:text-red-500 cursor-pointer transition-colors duration-300 text-center"
          >
            {t('shippingPolicy')}
          </button>

          <button
            onClick={() => setActivePage('returns')}
            className="block text-xl sm:text-2xl title font-semibold text-gray-700 hover:text-red-500 cursor-pointer transition-colors duration-300 text-center"
          >
            {t('returnExchangePolicy')}
          </button>
        </div>
      </div>
    </div>
  );


  const renderPolicyPage = (title, content) => (
    <div className="min-h-screen pt-32 pb-12 bg-white px-4 sm:px-6 md:px-8 relative">
      {/* BACK BUTTON */}
      <button
        onClick={() => setActivePage('home')}
        className="fixed top-4 left-4 sm:top-8 sm:left-8 z-[60] flex items-center gap-3 group cursor-pointer"
      >
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center group-hover:border-red-500 transition-all duration-300">
          <ArrowLeft size={20} className="text-gray-600 group-hover:text-red-500 transition-colors" strokeWidth={1.5} />
        </div>
        <span className="font-medium text-sm sm:text-base text-gray-600 group-hover:text-red-500 transition-colors">{t('back')}</span>
      </button>

      <div className="w-full sm:w-[95%] mt-16 sm:mt-6 lg:w-[90%] mx-auto">
        {/* Page Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl title font-bold text-gray-900 text-center mb-8 sm:mb-10 md:mb-12">
          {title}
        </h1>

        {/* Sections - Responsive layout */}
        <div className="space-y-8 sm:space-y-10 md:space-y-12">
          {content.sections.map((section, idx) => (
            <div
              key={idx}
              id={`section-${idx}`}
              className="flex flex-col lg:grid lg:grid-cols-[22%_1px_1fr] gap-4 lg:gap-x-6 items-start"
            >
              {/* Left Title cell */}
              <div className="w-full lg:pr-4">
                <a
                  href={`#section-${idx}`}
                  className="block text-left text-lg sm:text-xl font-extrabold text-gray-900 leading-snug hover:text-rose-600 transition"
                >
                  {section.title}
                </a>
              </div>

              {/* Divider cell - Horizontal on mobile, Vertical on desktop */}
              <div className="w-full lg:w-px h-px lg:h-auto lg:self-stretch">
                <div className="w-full lg:w-px h-px lg:h-full bg-red-500" />
              </div>

              {/* Content cell */}
              <div className="w-full text-left">
                <div className="text-gray-700 text-base sm:text-lg leading-relaxed space-y-4">
                  <div className="[&_ul]:ml-4 sm:[&_ul]:ml-6 [&_ul]:list-disc [&_ul]:text-left [&_ol]:ml-4 sm:[&_ol]:ml-6 [&_ol]:text-left">
                    {section.content}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );




  const { language } = useLanguage();
  const { shippingContent, termsContent, returnsContent, privacyContent } = getLegalContent(language, t);

  if (activePage === 'home') {
    return renderHome();
  } else if (activePage === 'privacy') {
    return renderPolicyPage(t('privacyPolicy'), privacyContent);
  } else if (activePage === 'terms') {
    return renderPolicyPage(t('termsConditions'), termsContent);
  } else if (activePage === 'shipping') {
    return renderPolicyPage(t('shippingPolicy'), shippingContent);
  } else if (activePage === 'returns') {
    return renderPolicyPage(t('returnExchangePolicy'), returnsContent);
  }
}