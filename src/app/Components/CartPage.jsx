"use client";

import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { placeOrders } from "../api/purchases_items/route";
import { IoMdClose } from "react-icons/io";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function CartPage({ cardPageHaldeler, realtimeParchasesData, cartData, updateCart, handleCardPage }) {

  const [currentUser, setCurrentUser] = useState(null)
  const route = useRouter()


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

  console.log(totalPrice)


  const handleOrderPlace = async () => {
    const orderDataStructure = {
      name: currentUser?.displayName,
      email: currentUser?.email,
      orderData: cartData,   // array of items
      totalPrice: totalPrice // separate field
    };

    const res = await placeOrders(orderDataStructure)
    if (res.insertedId) {
      Swal.fire({
        title: "Order Placed",
        icon: "success",
        draggable: true
      });
      localStorage.removeItem('items');
      route.push('personal_order')
    }
  }

  return (
    <main className={` fixed  z-10 ${cardPageHaldeler ? 'right-0 opacity-100' : '-right-96 opacity-0'}
     bg-gradient-to-br from-[#a855f7] via-[#c084fc] to-[#ec4899] rounded-xl h-fit p-8 transition-all duration-500 ease-in-out`}>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-white text-center mb-10 ">
          View Purchases
        </h1>
        <button onClick={() => handleCardPage()} className="px-4 cursor-pointer font-bold py-3 rounded-xl bg-white text-black"><IoMdClose /></button>
      </div>

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
                  className="px-3 py-1 bg-gray-500 rounded hover:bg-gray-600 cursor-pointer"
                >
                  −
                </button>

                <span className="font-semibold text-black">
                  {item.quantity}
                </span>

                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="px-3 py-1 bg-gray-500 rounded hover:bg-gray-600 cursor-pointer"
                >
                  +
                </button>

                <button
                  onClick={() => deleteItem(item.id)}
                  className="text-red-500 hover:text-red-700 text-lg cursor-pointer"
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
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition cursor-pointer"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
