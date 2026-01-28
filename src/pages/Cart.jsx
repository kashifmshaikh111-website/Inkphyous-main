import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/CartContext";
import { useLanguage } from "../components/LanguageContext";
import { Trash2, Plus, Minus, ArrowLeft } from "lucide-react";

const Cart = () => {
    const navigate = useNavigate();
    const { cartItems, removeFromCart, updateQuantity } = useCart();
    const { t } = useLanguage();

    const subtotal = cartItems.reduce((total, item) => {
        const price = item.discountPriceINR || item.priceINR || 0;
        return total + (price * (item.quantity || 1));
    }, 0);

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 pt-32 pb-12 md:px-0 relative">
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-4 left-4 sm:top-8 sm:left-8 z-[60] flex items-center gap-3 group cursor-pointer"
                >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center group-hover:border-red-500 transition-all duration-300">
                        <ArrowLeft size={20} className="text-gray-600 group-hover:text-red-500 transition-colors" strokeWidth={1.5} />
                    </div>
                    <span className="font-medium text-sm sm:text-base text-gray-600 group-hover:text-red-500 transition-colors">{t('back')}</span>
                </button>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl">
                    <div className="flex flex-col text-center md:text-left justify-center px-4 sm:px-6 md:px-12 py-8 sm:py-10 md:py-12">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 text-gray-900">
                            {t('shoppingBag')}
                        </h1>
                        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                            {t('emptyBagMessage')}
                        </p>
                    </div>

                    <div className="relative px-4 sm:px-6 md:px-12 py-8 sm:py-10 md:py-12 border-t md:border-t-0 md:border-l-2 border-red-500 flex flex-col justify-center">
                        <button
                            onClick={() => navigate(-1)}
                            className="w-full py-6 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 font-bold uppercase tracking-widest text-lg"
                        >
                            {t('continueShopping')}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full flex flex-col bg-white relative">
            <button
                onClick={() => navigate(-1)}
                className="absolute top-4 left-4 sm:top-8 sm:left-8 z-[70] flex items-center gap-3 group cursor-pointer"
            >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center group-hover:border-red-500 transition-all duration-300">
                    <ArrowLeft size={20} className="text-gray-600 group-hover:text-red-500 transition-colors" strokeWidth={1.5} />
                </div>
                <span className="font-medium text-sm sm:text-base text-gray-600 group-hover:text-red-500 transition-colors">{t('back')}</span>
            </button>

            <div className="flex-1 flex flex-col w-full pt-32 md:pt-36 px-4 md:px-0">

                <div className="w-full h-[65vh] grid grid-cols-1 md:grid-cols-[49%_48%] overflow-hidden mb-12">

                    {/* LEFT SIDE */}
                    <div className="flex flex-col items-center justify-center p-8 text-center h-full">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black title">
                            {t('shoppingBag')}
                        </h1>
                        <p className="text-lg text-gray-700">
                            {t('itemsInBag', { count: cartItems.length, itemText: cartItems.length === 1 ? t('item') : t('items') })}
                        </p>
                    </div>

                    {/* RIGHT SIDE - SCROLLABLE ITEMS IN CARDS */}
                    <div className="h-full border-l border-red-500 flex flex-col px-4 overflow-hidden relative">
                        <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 py-4">
                            {cartItems.map((item, index) => {
                                const isSingleItem = cartItems.length === 1;
                                return (
                                    <div key={index} className={`bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow flex w-full ${isSingleItem ? 'h-[60vh]' : 'h-52'}`}>
                                        {/* Product Image - Left Side */}
                                        <div className={`w-1/3 overflow-hidden flex items-center justify-center bg-white rounded-l`}>
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className={`w-full h-full object-contain ${isSingleItem ? 'p-6' : 'p-2'}`}
                                            />
                                        </div>

                                        {/* Product Details - Right Side */}
                                        <div className={`w-2/3 flex flex-col justify-center ${isSingleItem ? 'p-8 gap-6' : 'p-4 gap-3'}`}>
                                            <div className={`${isSingleItem ? 'space-y-4' : 'space-y-2'}`}>
                                                <h3 className={`${isSingleItem ? 'text-3xl' : 'text-xl'} font-bold text-gray-900`}>{item.name}</h3>

                                                {item.color && (
                                                    <p className={`${isSingleItem ? 'text-lg' : 'text-sm'} text-gray-600`}>{t('color')}: <span className="font-medium">{item.color}</span></p>
                                                )}
                                                {item.size && (
                                                    <p className={`${isSingleItem ? 'text-lg' : 'text-sm'} text-gray-600`}>{t('size')}: <span className="font-medium">{item.size}</span></p>
                                                )}

                                                <div className={`border-t border-gray-200 ${isSingleItem ? 'pt-4' : 'pt-2'}`}>
                                                    <p className={`${isSingleItem ? 'text-4xl' : 'text-2xl'} font-bold text-gray-900`}>
                                                        ₹{(item.discountPriceINR || item.priceINR) * (item.quantity || 1)}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Quantity Controls & Delete */}
                                            <div className="flex items-center justify-between">
                                                <div className={`flex items-center border border-gray-300 rounded ${isSingleItem ? '' : 'h-8'}`}>
                                                    <button
                                                        onClick={() => updateQuantity(index, Math.max(1, (item.quantity || 1) - 1))}
                                                        className={`${isSingleItem ? 'p-3' : 'px-2 h-full'} hover:bg-gray-100 transition flex items-center justify-center`}
                                                    >
                                                        <Minus className={`${isSingleItem ? 'w-5 h-5' : 'w-3 h-3'}`} />
                                                    </button>
                                                    <span className={`${isSingleItem ? 'px-6 py-2 text-lg min-w-[3rem]' : 'px-3 text-sm min-w-[2rem]'} font-medium text-center flex items-center justify-center`}>{item.quantity || 1}</span>
                                                    <button
                                                        onClick={() => updateQuantity(index, (item.quantity || 1) + 1)}
                                                        className={`${isSingleItem ? 'p-3' : 'px-2 h-full'} hover:bg-gray-100 transition flex items-center justify-center`}
                                                    >
                                                        <Plus className={`${isSingleItem ? 'w-5 h-5' : 'w-3 h-3'}`} />
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() => removeFromCart(index)}
                                                    className={`text-gray-400 hover:text-red-500 transition cursor-pointer ${isSingleItem ? 'p-3' : 'p-2'}`}
                                                >
                                                    <Trash2 className={`${isSingleItem ? 'w-6 h-6' : 'w-4 h-4'}`} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* ORDER SUMMARY */}
                <div className="w-full flex justify-center pb-8">
                    <div className="w-full sm:w-auto sm:min-w-[400px] md:w-[600px] lg:w-[800px] xl:w-[1000px] border-t-2 border-gray-300 pt-6 space-y-4">
                        <div className="flex justify-between text-sm text-gray-600 font-medium">
                            <span>{t('subtotal')}</span>
                            <span>₹{subtotal}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 font-medium">
                            <span>{t('shipping')}</span>
                            <span className="text-green-600">{t('free')}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold text-black border-t border-gray-200 pt-3">
                            <span>{t('total')}</span>
                            <span>₹{subtotal}</span>
                        </div>

                        <div className="space-y-3 pt-4">
                            <button
                                onClick={() => navigate('/checkout')}
                                className="w-full py-5 bg-black text-white hover:bg-red-500 transition-all duration-300 font-bold uppercase tracking-widest cursor-pointer text-sm"
                            >
                                {t('checkout')}
                            </button>

                            <button
                                onClick={() => navigate(-1)}
                                className="w-full py-5 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 font-semibold uppercase tracking-wider cursor-pointer text-sm"
                            >
                                {t('continueShopping')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;