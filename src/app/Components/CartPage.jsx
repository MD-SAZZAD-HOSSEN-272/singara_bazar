"use client";

import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { ClientPageRoot } from "next/dist/client/components/client-page";
import { placeOrders } from "../api/purchases_items/route";

export default function CartPage({cardPageHaldeler, realtimeParchasesData, cartData, updateCart}) {
  
const [currentUser, setCurrentUser] = useState(null)


 useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); // user থাকুক বা null
    });

    return () => unsubscribe(); // cleanup
  }, []);


  console.log(currentUser)


  // ➕ Increase quantity
  const increaseQuantity = (id) => {
    const updated = cartData.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1, quantityPrice: (item.quantity + 1) * item.price }
        : item
    );
    updateCart(updated);
    realtimeParchasesData()
  };

  // ➖ Decrease quantity (min 1)
  const decreaseQuantity = (id) => {
    const updated = cartData.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1, quantityPrice: (item.quantity - 1) * item.price }
        : item
    );
    updateCart(updated);
    realtimeParchasesData()
  };

  // ❌ Delete item
  const deleteItem = (id) => {
    const updated = cartData.filter((item) => item.id !== id);
    updateCart(updated);
    realtimeParchasesData()
  };

  // 💰 Total price
  const totalPrice = cartData.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );


  const handleOrderPlace = async () => {
    const orderDataStructure = {
      name: currentUser.displayName,
      email: currentUser.email,
      orderData: cartData
    }

    const res = await placeOrders(orderDataStructure)
    const result = await res.json()
    console.log(result)
  }

  return (
    <main className={` fixed  z-10 ${cardPageHaldeler ? 'right-0 opacity-100' : '-right-96 opacity-0'}
     bg-gradient-to-br from-[#a855f7] via-[#c084fc] to-[#ec4899] rounded-xl h-fit p-8 transition-all duration-500 ease-in-out`}>
      <h1 className="text-4xl font-bold text-white text-center mb-10 ">
        View Purchases
      </h1>

      {cartData.length === 0 ? (
        <p className="text-white text-center text-xl">
          Your cart is empty
        </p>
      ) : (
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
          {cartData.map((item, index) => (
            <div
              key={index}
              className="flex gap-10 items-center justify-between border-b py-4"
            >
              {/* Item Info */}
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded object-cover"
                />
                <div>
                  <h2 className="text-lg font-semibold text-black">
                    {item.name}
                  </h2>
                  <p className="text-gray-900">
                    ৳{item.price}
                  </p>
                </div>
              </div>

              {/* Quantity + Delete */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="px-3 py-1 bg-gray-500 rounded hover:bg-gray-300"
                >
                  −
                </button>

                <span className="font-semibold text-black">
                  {item.quantity}
                </span>

                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="px-3 py-1 bg-gray-500 rounded hover:bg-gray-300"
                >
                  +
                </button>

                <button
                  onClick={() => deleteItem(item.id)}
                  className="text-red-500 hover:text-red-700 text-lg"
                >
                  ❌
                </button>
              </div>
            </div>
          ))}

          {/* Footer */}
          <div className="flex justify-between text-black items-center mt-6">
            <h2 className="text-2xl font-bold">
              Total: ৳{totalPrice}
            </h2>

            <button
              onClick={() => handleOrderPlace()}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
