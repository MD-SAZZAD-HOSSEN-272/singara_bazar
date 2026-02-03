"use client";

import { useEffect, useState } from "react";

export default function Cart({handleCardPage, cart}) {

    
  const total = cart.reduce((sum, item) => sum + item.quantityPrice, 0);

  return (
    <div onClick={handleCardPage} className="fixed z-10 top-20 right-5 lg:right-16 bg-[#f6339a]/20 backdrop px-5 py-1 cursor-pointer rounded-xl shadow-lg">
      🛒 Items: {cart.length} <br />
      💰 Total: ৳{total}
    </div>
  );
}
