import React from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-8 sm:py-12 md:py-0 md:px-0">
            {/* GRID SECTION */}
            <div className="w-full grid grid-cols-1 md:grid-cols-[49%_52%]">

                {/* LEFT SIDE */}
                <div className="flex flex-col text-center justify-center px-4 sm:px-6 md:px-12 py-8 sm:py-10 md:py-12 relative z-10">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-black title">
                        Reset Password
                    </h1>

                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed max-w-md mx-auto">
                        Enter the email address associated with your account and we'll send you a link to reset your password.
                    </p>
                </div>

                {/* RIGHT SIDE */}
                <div className="relative px-4 sm:px-6 md:px-12 py-8 sm:py-10 md:py-12 border-t md:border-t-0 md:border-l border-red-500 flex flex-col justify-center">
                    <div className="flex flex-col text-right space-y-3 sm:space-y-4">

                        {/* EMAIL */}
                        <input
                            type="email"
                            placeholder="Email"
                            className="border text-right border-gray-400 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base text-gray-700 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        />

                        {/* SUBMIT BUTTON */}
                        <div className="pt-4 flex flex-col items-end gap-4">
                            <button
                                className="w-full sm:w-auto text-center border border-[#1a1a1a] py-3 sm:py-3.5 px-8 sm:px-12 text-sm sm:text-base text-white bg-[#1a1a1a] hover:bg-red-500 hover:border-red-500 transition-all duration-300 rounded-none font-bold uppercase tracking-widest cursor-pointer shadow-md transform hover:scale-105"
                            >
                                Send Reset Link
                            </button>

                            <button
                                onClick={() => navigate('/login')}
                                className="text-sm text-gray-500 hover:text-red-500 transition-colors font-medium border-b border-transparent hover:border-red-500"
                            >
                                Back to Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
