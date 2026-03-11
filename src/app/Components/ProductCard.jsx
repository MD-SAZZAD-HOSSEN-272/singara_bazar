"use client";

export default function ProductCard({ product, onDetails, setPurchaseModal }) {
  return (
    <div className="bg-white/90 rounded-xl shadow-lg p-5 hover:scale-105 transition-all duration-300 ease-linear">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="h-40 w-full object-cover rounded-lg"
        />
        {
          product.quantity === 0 && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-lg">
              <span className="text-white text-lg font-semibold">Out of Stock</span>
            </div>
          )
        }
      </div>

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
        disabled={product.quantity === 0}
          onClick={() => { setPurchaseModal(product) }}
          className={`flex-1 py-2 rounded  ${product.quantity === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700 cursor-pointer'}`}
        >
          Purchase
        </button>
      </div>
    </div>
  );
}
