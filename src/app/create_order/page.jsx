"use client";
import { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { oreders } from "../action/orders/Order";
import { auth } from "../Components/firebase";

export default function OrderForm() {

  const cigarettePrices = {
    Singara: 12,
  };
  const route = useRouter()

 

  const [cigaretteName, setCigaretteName] = useState("");
  const [quantity, setQuantity] = useState(""); // string
  const [amount, setAmount] = useState(0);
  const [orderTaking, setOrderTaking] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)


  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      setCurrentUser(user)
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

  console.log(currentUser)

  const handleQuantityChange = (value) => {
    // Remove leading zeros
    const cleanValue = value.replace(/^0+/, "");
    setQuantity(cleanValue);

    const price = cigarettePrices[cigaretteName] || 0;
    setAmount(price * Number(cleanValue || 0));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Form reload বন্ধ করে
    setOrderTaking(true)

    // সব data object এ নিয়ে আসা
    if (quantity < 1 || quantity > 5) {
      setOrderTaking(false)
      return Swal.fire({
        title: "Quantity must be between 1 and 5",
        showClass: {
          popup: `
        animate__animated
        animate__fadeInUp
        animate__faster
      `
        },
        hideClass: {
          popup: `
        animate__animated
        animate__fadeOutDown
        animate__faster
      `
        }
      });
    }

    const orderData = {
      employeeName: currentUser?.displayName,
      employeeEmail: currentUser?.email,
      cigaretteName,
      quantity: Number(quantity || 0),
      amount,
      date: new Date()
    };

    const res = await oreders(orderData);
    console.log(res)
    if (res.insertedId) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
      });
      route.push('order')
      setOrderTaking(false)
    }
  }

  return (
    <div className="min-h-screen flex w-full items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-lg border border-white/30 rounded-3xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          singara Order
        </h2>
        <h1 className="text-3xl font-bold">Hello {currentUser?.displayName}</h1>
        <form onSubmit={handleSubmit} className="mt-5">
          {/* Employee Name */}
          <div className="mb-5">
            <label className="text-white text-sm mb-1 block">
              Employee Name
            </label>
            <input
              type="text"
              placeholder="Enter employee name"
              className="w-full rounded-xl px-4 py-3 bg-white/80 text-gray-900 focus:bg-white outline-none"
              value={currentUser?.displayName}

            />
          </div>

          {/* Cigarette Name */}
          <div className="mb-5">
            <label className="text-white text-sm mb-1 block">
              Singara Name
            </label>
            <select
              className="w-full rounded-xl px-4 py-3 bg-white/80 text-gray-900 focus:bg-white outline-none"
              value={cigaretteName}
              onChange={(e) => {
                setCigaretteName(e.target.value);
                setQuantity("");
                setAmount(0);
              }}
            >
              <option value="">Select Singara</option>
              {Object.keys(cigarettePrices).map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity */}
          <div className="mb-5">
            <label className="text-white text-sm mb-1 block">Quantity</label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="Enter quantity"
              className="w-full rounded-xl px-4 py-3 bg-white/80 text-gray-900 focus:bg-white outline-none"
              value={quantity}
              onChange={(e) => handleQuantityChange(e.target.value)}
            />
          </div>

          {/* Amount */}
          {quantity && Number(quantity) > 0 && (
            <div className="mb-7">
              <label className="text-white text-sm mb-1 block">Total Amount</label>
              <div className="w-full rounded-xl px-4 py-3 bg-amber-300 font-bold text-gray-900 text-lg">
                ৳ {amount}
              </div>
            </div>
          )}

          <button type="submit" className="w-full py-3 rounded-xl bg-black/80 text-white font-semibold hover:bg-black transition">
            {orderTaking ? 'Taking Order.....' : 'Submit Order'}
          </button>
        </form>
      </div>
    </div>
  );
}
