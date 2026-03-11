"use client";

export default function Cart({ handleCardPage, cart }) {
  const total = cart.reduce((sum, item) => sum + item.quantityPrice, 0);

  return (
    <>
      {/* Desktop view */}
      <div
        onClick={handleCardPage}
        className="hidden lg:block fixed z-10 top-20 right-16 bg-[#f6339a]/20 backdrop-blur px-5 py-2 cursor-pointer rounded-xl shadow-lg"
      >
        🛒 Items: {cart.length} <br />
        💰 Total: ৳{total}
      </div>

      {/* Mobile & Tablet view */}
      <div
        onClick={handleCardPage}
        className="lg:hidden fixed z-10 top-20 right-5 bg-[#f6339a]/30 backdrop-blur px-3 py-2 cursor-pointer rounded-full shadow-lg flex items-center gap-2"
      >
        <span className="text-xl">🛒</span>
        <span className="text-sm font-semibold">{cart.length}</span>
      </div>
    </>
  );
}
