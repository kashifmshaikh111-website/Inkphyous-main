import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../components/LanguageContext";

const Register = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-8 sm:py-12 md:py-0 md:px-0">
            {/* GRID SECTION */}
            <div className="w-full grid grid-cols-1 md:grid-cols-[49%_52%]">

                {/* LEFT SIDE */}
                {/* LEFT SIDE */}
                <div className="flex flex-col text-center justify-center px-4 sm:px-6 md:px-12 py-8 sm:py-10 md:py-12 relative z-10">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-black title">
                        {t('createAccount')}
                    </h1>

                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        {t('alreadyHaveAccount')}
                        <span
                            className="text-red-500 font-bold cursor-pointer hover:underline"
                            onClick={() => navigate('/login')}
                        >
                            {" "}{t('login')}
                        </span>
                    </p>
                </div>

                {/* RIGHT SIDE */}
                <div className="relative px-4 sm:px-6 md:px-12 py-8 sm:py-10 md:py-12 border-t md:border-t-0 md:border-l border-red-500 flex flex-col justify-center">
                    <div className="flex flex-col text-right space-y-3 sm:space-y-4">

                        {/* NAME */}
                        <input
                            type="text"
                            placeholder={t('fullName')}
                            className="border text-right border-gray-400 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base text-gray-700 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        />

                        {/* EMAIL */}
                        <input
                            type="email"
                            placeholder={t('email')}
                            className="border text-right border-gray-400 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base text-gray-700 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        />

                        {/* PASSWORD */}
                        <input
                            type="password"
                            placeholder={t('password')}
                            className="border text-right border-gray-400 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base text-gray-700 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        />

                        {/* CONFIRM PASSWORD */}
                        <input
                            type="password"
                            placeholder={t('confirmPassword')}
                            className="border text-right border-gray-400 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base text-gray-700 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* SUBMIT BUTTON SECTION */}
            <div className="mt-6 sm:mt-8 flex flex-col items-center w-full px-4 space-y-4">
                {/* REGISTER BUTTON */}
                <button
                    className="w-full sm:w-auto sm:min-w-[400px] md:w-[600px] lg:w-[800px] xl:w-[1000px] text-center border border-[#1a1a1a] py-3 sm:py-3.5 px-8 sm:px-12 text-sm sm:text-base text-white bg-[#1a1a1a] hover:bg-red-500 hover:border-red-500 transition-all duration-300 rounded-none font-bold uppercase tracking-widest cursor-pointer shadow-md transform hover:scale-105"
                >
                    {t('register')}
                </button>
            </div>
        </div>
    );
};

export default Register;
