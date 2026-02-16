"use client";

export default function ProductDetailsModal({
  onClose,
  modalDetails: product = {},
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl bg-white/90 backdrop-blur-xl shadow-xl animate-modal">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 rounded-full bg-white/80 p-2 text-gray-700 hover:bg-[#b657e4] hover:text-white transition"
        >
          ✕
        </button>

        {/* Image */}
        {product.image && (
          <div className="relative">
            <img
              src={product.image}
              alt={product.name || "Product image"}
              className="h-72 w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Title & Price */}
          <div className="flex items-start justify-between">
            {product.name && (
              <h2 className="text-2xl font-semibold text-gray-900">
                {product.name}
              </h2>
            )}

            {product.price && (
              <span className="rounded-full bg-gradient-to-r from-[#b657e4] to-[#e459ae] px-4 py-1 text-white text-sm font-medium shadow">
                ৳ {product.price}
              </span>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <p className="text-sm text-gray-600 leading-relaxed">
              {product.description}
            </p>
          )}

          {/* Admin Meta Info */}
          <div className="rounded-2xl border border-gray-200 bg-white/70 p-4 space-y-2 text-xs">
            {product.addedBy && (
              <p className="flex justify-between">
                <span className="text-gray-500">Added by</span>
                <span className="font-medium text-gray-800 truncate">
                  {product.addedBy}
                </span>
              </p>
            )}

            {product.date && (
              <p className="flex justify-between">
                <span className="text-gray-500">Added date</span>
                <span className="font-medium text-gray-800">
                  {new Date(product.date).toLocaleString()}
                </span>
              </p>
            )}

            {product.updatedBy && (
              <p className="flex justify-between">
                <span className="text-gray-500">Last updated by</span>
                <span className="font-semibold text-[#b657e4] truncate">
                  {product.updatedBy}
                </span>
              </p>
            )}

            {product.updatedAt && (
              <p className="flex justify-between">
                <span className="text-gray-500">Last update date</span>
                <span className="font-semibold text-[#e459ae]">
                  {new Date(product.updatedAt).toLocaleString()}
                </span>

              </p>
            )}
          </div>

          {/* Footer */}
          <div className="pt-2">
            <button
              onClick={onClose}
              className="w-full rounded-xl border border-gray-300 py-3 text-sm font-medium hover:bg-gray-100 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Animation */}
      <style jsx>{`
        .animate-modal {
          animation: modalIn 0.25s ease-out;
        }
        @keyframes modalIn {
          from {
            transform: scale(0.95) translateY(16px);
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
