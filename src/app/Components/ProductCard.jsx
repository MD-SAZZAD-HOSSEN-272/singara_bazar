"use client";

export default function ProductCard({ product, onDetails, handlePurchasesButton }) {
  return (
    <div className="bg-white/90 rounded-xl shadow-lg p-5 hover:scale-105 transition">
      <img
        src={product.image}
        alt={product.name}
        className="h-40 w-full object-cover rounded-lg"
      />

      <h2 className="text-xl font-semibold mt-4 text-black">{product.name}</h2>
      <p className="text-gray-600">৳{product.price}</p>

      <div className="flex gap-3 mt-4">
        <button
          onClick={() => onDetails(product)}
          className="flex-1 bg-purple-600 text-white py-2 rounded hover:bg-purple-700 cursor-pointer"
        >
          Details
        </button>

        <button
          onClick={() => handlePurchasesButton(product)}
          className="flex-1 bg-pink-500 text-white py-2 rounded hover:bg-pink-600"
        >
          Purchase
        </button>
      </div>
    </div>
  );
}
