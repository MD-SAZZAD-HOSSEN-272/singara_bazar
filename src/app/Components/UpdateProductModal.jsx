"use client";

import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

export default function UpdateProductModal({
  updateModla: product = {},
  currentUser,
  onUpdate,
  onClose,
}) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });

  // Load existing data
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        price: product.price || "",
        image: product.image || "",
        description: product.description || "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const updatedProduct = {
      ...formData,
      updatedBy: currentUser,
      updatedAt: new Date().toISOString(),
    };
    onUpdate(updatedProduct, product._id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg rounded-3xl bg-gradient-to-br from-[#b657e4]/40 to-[#e459ae]/40 shadow-2xl backdrop-blur-xl animate-modal">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 backdrop-blur-sm bg-white/50 rounded-t-3xl">
          <h2 className="text-xl font-semibold">
            Update Product
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-[#b657e4]/20 cursor-pointer transition text-gray-700 hover:text-white"
          >
            <IoMdClose size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-4 px-6 py-5 text-white">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product name"
            className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-[#b657e4] focus:ring-1 focus:ring-[#e459ae] focus:outline-none transition"
          />

          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-[#b657e4] focus:ring-1 focus:ring-[#e459ae] focus:outline-none transition"
          />

          <input
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-[#b657e4] focus:ring-1 focus:ring-[#e459ae] focus:outline-none transition"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Product description"
            rows={4}
            className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-[#b657e4] focus:ring-1 focus:ring-[#e459ae] focus:outline-none transition"
          />
        </div>

        {/* Footer */}
        <div className="flex gap-4 border-t border-gray-200 px-6 py-4">
          <button
            onClick={handleSubmit}
            className="flex-1 rounded-2xl bg-gradient-to-r from-[#b657e4] cursor-pointer to-[#e459ae] py-3 font-medium text-white hover:opacity-90 transition shadow-md"
          >
            Save Changes
          </button>

          <button
            onClick={onClose}
            className="flex-1 rounded-2xl border border-[#b657e4] py-3 font-medium text-white cursor-pointer hover:bg-[#e459ae]/20 transition"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Animation */}
      <style jsx>{`
        .animate-modal {
          animation: modalIn 0.3s ease-out;
        }
        @keyframes modalIn {
          from {
            transform: scale(0.9) translateY(20px);
            opacity: 0;
          }
          to {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
