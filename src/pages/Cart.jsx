import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/CartContext";
import { Trash2, Plus, Minus, ArrowLeft } from "lucide-react";

const Cart = () => {
    const navigate = useNavigate();
    const { cartItems, removeFromCart, updateQuantity } = useCart();

    const subtotal = cartItems.reduce((total, item) => {
        const price = item.discountPriceINR || item.priceINR || 0;
        return total + (price * (item.quantity || 1));
    }, 0);

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 pt-32 pb-12 md:px-0 relative">
                <button
                    onClick={() => navigate('/')}
                    className="absolute top-4 left-4 sm:top-8 sm:left-8 flex items-center gap-2 text-gray-800 hover:text-red-500 transition-all duration-300 group z-[60] cursor-pointer transform hover:scale-110"
                >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-800 flex items-center justify-center group-hover:bg-red-500 group-hover:text-white group-hover:border-red-500 transition-all">
                        <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
                    </div>
                    <span className="font-medium text-sm sm:text-base">Back</span>
                </button>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl">
                    <div className="flex flex-col text-center md:text-left justify-center px-4 sm:px-6 md:px-12 py-8 sm:py-10 md:py-12">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 text-gray-900">
                            Shopping Bag
                        </h1>
                        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                            Your bag is empty. Start adding items to get started!
                        </p>
                    </div>

                    <div className="relative px-4 sm:px-6 md:px-12 py-8 sm:py-10 md:py-12 border-t md:border-t-0 md:border-l-2 border-red-500 flex flex-col justify-center">
                        <button
                            onClick={() => navigate('/')}
                            className="w-full py-6 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 font-bold uppercase tracking-widest text-lg"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full flex flex-col bg-white relative">
            <button
                onClick={() => navigate('/')}
                className="absolute top-6 left-6 z-[60] flex items-center gap-2 text-gray-800 hover:text-red-500 transition-all duration-300 group cursor-pointer"
            >
                <div className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center group-hover:bg-red-500 group-hover:text-white group-hover:border-red-500 transition-all">
                    <ArrowLeft size={18} />
                </div>
                <span className="font-medium text-base">Back</span>
            </button>

            <div className="flex-1 flex flex-col w-full pt-20 px-4 md:px-0">

                <div className="w-full h-[65vh] grid grid-cols-1 md:grid-cols-[49%_48%] overflow-hidden mb-12">

                    {/* LEFT SIDE */}
                    <div className="flex flex-col items-center justify-center p-8 text-center h-full">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black title">
                            Shopping Bag
                        </h1>
                        <p className="text-lg text-gray-700">
                            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your bag
                        </p>
                    </div>

                    {/* RIGHT SIDE - SCROLLABLE ITEMS IN CARDS */}
                    <div className="h-full border-l border-red-500 flex flex-col px-4 overflow-hidden relative">
                        <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 py-4">
                            {cartItems.map((item, index) => (
                                <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow flex h-[60vh] w-full">
                                    {/* Product Image - Left Side */}
                                    <div className="w-1/2 overflow-hidden flex items-center justify-center bg-white rounded-l">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-contain p-6"
                                        />
                                    </div>

                                    {/* Product Details - Right Side */}
                                    <div className="w-1/2 p-8 flex flex-col justify-center gap-6">
                                        <div className="space-y-4">
                                            <h3 className="text-3xl font-bold text-gray-900">{item.name}</h3>

                                            {item.color && (
                                                <p className="text-lg text-gray-600">Color: <span className="font-medium">{item.color}</span></p>
                                            )}
                                            {item.size && (
                                                <p className="text-lg text-gray-600">Size: <span className="font-medium">{item.size}</span></p>
                                            )}

                                            <div className="border-t border-gray-200 pt-4">
                                                <p className="text-4xl font-bold text-gray-900">
                                                    ₹{(item.discountPriceINR || item.priceINR) * (item.quantity || 1)}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Quantity Controls & Delete */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center border-2 border-gray-300 rounded">
                                                <button
                                                    onClick={() => updateQuantity(index, Math.max(1, (item.quantity || 1) - 1))}
                                                    className="p-3 hover:bg-gray-100 transition"
                                                >
                                                    <Minus className="w-5 h-5" />
                                                </button>
                                                <span className="px-6 py-2 text-lg font-medium min-w-[3rem] text-center">{item.quantity || 1}</span>
                                                <button
                                                    onClick={() => updateQuantity(index, (item.quantity || 1) + 1)}
                                                    className="p-3 hover:bg-gray-100 transition"
                                                >
                                                    <Plus className="w-5 h-5" />
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => removeFromCart(index)}
                                                className="text-gray-400 hover:text-red-500 transition p-3"
                                            >
                                                <Trash2 className="w-6 h-6" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ORDER SUMMARY */}
                <div className="w-full flex justify-center pb-8">
                    <div className="w-full sm:w-auto sm:min-w-[400px] md:w-[600px] lg:w-[800px] xl:w-[1000px] border-t-2 border-gray-300 pt-6 space-y-4">
                        <div className="flex justify-between text-sm text-gray-600 font-medium">
                            <span>Subtotal</span>
                            <span>₹{subtotal}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 font-medium">
                            <span>Shipping</span>
                            <span className="text-green-600">Free</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold text-black border-t border-gray-200 pt-3">
                            <span>Total</span>
                            <span>₹{subtotal}</span>
                        </div>

                        <div className="space-y-3 pt-4">
                            <button
                                onClick={() => navigate('/checkout')}
                                className="w-full py-5 bg-black text-white hover:bg-red-500 transition-all duration-300 font-bold uppercase tracking-widest cursor-pointer text-sm"
                            >
                                Checkout
                            </button>

                            <button
                                onClick={() => navigate('/')}
                                className="w-full py-5 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 font-semibold uppercase tracking-wider cursor-pointer text-sm"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;