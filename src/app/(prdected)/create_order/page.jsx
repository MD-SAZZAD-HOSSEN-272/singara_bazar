"use client";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/Components/firebase";
import { oreders } from "@/app/action/orders/Order";

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

    useEffect(() => {
        const unsubscibts = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const uid = user.uid;
                setCurrentUser(user)
                // ...
            } else {
                setCurrentUser(null)
                // User is signed out
                // ...
            }
        });

        return () => unsubscibts()
    }, [])

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

        if (!cigaretteName || !quantity) {
            setOrderTaking(false)
            return Swal.fire({
                icon: "error",
                title: "Must fill all fields",
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
        <div className="relative min-h-screen flex w-full items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 overflow-hidden">
            {/* Floating Singara Animation */}
            {Array.from({ length: 8 }).map((_, i) => (
                <div
                    key={i}
                    className={`absolute w-20 h-20  rounded-full animate-float`}
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${5 + Math.random() * 5}s`,
                    }}
                >
                    <a href="https://imgbb.com/"><img src="https://i.ibb.co.com/SwrFTKVg/singara.png" alt="singara" border="0" /></a>
                </div>
            ))}

            {/* Form Container */}
            <div className="w-full max-w-md bg-white/20 backdrop-blur-lg border border-white/30 rounded-3xl shadow-2xl p-8 relative z-10">
                <h2 className="text-4xl font-extrabold text-center text-white mb-6 tracking-wide">
                    Singara Order
                </h2>

                <h1 className="text-2xl font-semibold text-white mb-8 text-center">
                    Hello, {currentUser?.displayName}
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Employee Name */}
                    <div>
                        <label className="text-white text-sm mb-2 block font-medium">
                            Employee Name (can't change your name)
                        </label>
                        <input
                            type="text"
                            placeholder="Enter employee name"
                            className="w-full rounded-2xl px-4 py-3 bg-white/90 text-gray-900 font-medium placeholder-gray-400 focus:ring-2 focus:ring-indigo-400 outline-none transition"
                            value={currentUser?.displayName}
                            readOnly
                        />
                    </div>

                    {/* Singara Name */}
                    <div>
                        <label className="text-white text-sm mb-2 block font-medium">
                            Singara Name
                        </label>
                        <select
                            className="w-full rounded-2xl px-4 py-3 bg-white/90 text-gray-900 font-medium focus:ring-2 focus:ring-indigo-400 outline-none transition"
                            value={cigaretteName}
                            onChange={(e) => {
                                setCigaretteName(e.target.value);
                                setQuantity("");
                                setAmount(0);
                            }}
                        >
                            <option value="">Select Item</option>
                            {Object.keys(cigarettePrices).map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Quantity */}
                    <div>
                        <label className="text-white text-sm mb-2 block font-medium">
                            Quantity
                        </label>
                        <input
                            required
                            type="number"
                            inputMode="numeric"
                            placeholder="Enter quantity"
                            className="w-full rounded-2xl px-4 py-3 bg-white/90 text-gray-900 font-medium placeholder-gray-400 focus:ring-2 focus:ring-indigo-400 outline-none transition"
                            value={quantity}
                            onChange={(e) => handleQuantityChange(e.target.value)}
                        />
                    </div>

                    {/* Amount */}
                    {quantity && Number(quantity) > 0 && (
                        <div>
                            <label className="text-white text-sm mb-2 block font-medium">
                                Total Amount
                            </label>
                            <div className="w-full rounded-2xl px-4 py-3 bg-amber-400 font-bold text-gray-900 text-lg text-center shadow-md">
                                ৳ {amount}
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-3 rounded-2xl bg-black/80 text-white font-semibold hover:bg-black transition-all duration-300 shadow-lg"
                    >
                        {orderTaking ? 'Taking Order...' : 'Submit Order'}
                    </button>
                </form>
            </div>
        </div>


    );
}
