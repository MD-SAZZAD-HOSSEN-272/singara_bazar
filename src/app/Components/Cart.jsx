"use client";

import { useEffect, useState } from "react";

export default function Cart({handleCardPage, cart}) {

    
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div onClick={handleCardPage} className="fixed top-20 right-16 px-5 py-1 border cursor-pointer rounded-xl shadow-lg">
      🛒 Items: {cart.length} <br />
      💰 Total: ৳{total}
    </div>
  );
}
