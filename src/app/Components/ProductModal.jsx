"use client";

export default function ProductModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-md">
        <img
          src={product.image}
          className="w-full h-48 object-cover rounded"
        />

        <h2 className="text-2xl font-bold text-black mt-4">{product.name}</h2>
        <p className="mt-2 text-gray-600">{product.description}</p>
        <p className="mt-2 font-semibold text-gray-900">Price: ৳{product.price}</p>

        <button
          onClick={onClose}
          className="mt-5 w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}