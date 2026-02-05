"use client";

export default function ProductDetailsModal({ onClose, modalDetails: product = {} }) {

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl animate-scaleIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-black cursor-pointer"
        >
          ✕
        </button>

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.title}
          className="h-64 w-full rounded-xl object-cover"
        />

        {/* Product Info */}
        <div className="mt-4">
          <h2 className="text-2xl font-bold">{product.title}</h2>

          <p className="mt-2 text-xl font-semibold text-green-600">
            ৳ {product.price}
          </p>

          <p className="mt-3 text-sm text-gray-600">
            {product.description}
          </p>

          {/* Actions */}
          <div className="mt-6 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 rounded-xl border border-gray-300 py-3 hover:bg-gray-100 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* Animation */}
      <style jsx>{`
        .animate-scaleIn {
          animation: scaleIn 0.25s ease-out;
        }
        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
