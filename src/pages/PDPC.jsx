"use client";

import { useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import products from "../Utils/Products";
import { motion } from "framer-motion";

export default function PDPC() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const variantId = searchParams.get("variantId");
  const [selectedSize, setSelectedSize] = useState("");

  let product = null;
  let selectedVariant = null;

  for (const p of products) {
    if (p.id === parseInt(id)) {
      product = p;
      selectedVariant =
        p.variants.find((v) => v.id === variantId) || p.variants[0];
      break;
    }
  }

  if (!product || !selectedVariant)
    return (
      <div className="text-center py-16 text-gray-800 text-xl">
        Product not found
      </div>
    );

  // Temporary: repeat same image 4 times
  const images = selectedVariant.images && selectedVariant.images.length > 0
    ? selectedVariant.images
    : Array(4).fill(selectedVariant.image);

  return (
    <div className="relative min-h-screen bg-white flex flex-col">
      {/* Scrollable Image Section */}
      <div className="flex-grow overflow-y-auto">
        {images.map((img, index) => (
          <div key={index} className="w-full h-screen flex justify-center">
            <img
              src={img}
              alt={`${product.name} - ${index + 1}`}
              className="w-full h-full object-contain "
            />
          </div>
        ))}
      </div>

      {/* Sticky Footer */}
      <div className="w-full fixed bottom-0 left-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-between items-center">
        {/* LEFT SIDE */}
        <div>
          <p className="text-lg font-extrabold text-red-500 uppercase">
            Feed Your Soul
          </p>
          <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
          <p className="text-xl font-semibold text-gray-800">
            ₹{selectedVariant.priceINR}
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
          >
            <option value="">Select size</option>
            {product.sizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>

          <motion.button
            className={`px-6 py-2 rounded-full text-lg uppercase tracking-wider transition-colors ${
              selectedSize
                ? "bg-gray-900 text-white hover:bg-gray-700"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
            whileHover={{ scale: selectedSize ? 1.05 : 1 }}
            whileTap={{ scale: selectedSize ? 0.95 : 1 }}
            disabled={!selectedSize}
            onClick={() => {
              if (selectedSize)
                navigate(
                  `/checkout?productId=${product.id}&variantId=${selectedVariant.id}&size=${selectedSize}`
                );
            }}
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </div>
  );
}
