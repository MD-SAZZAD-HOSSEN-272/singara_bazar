// app/users/[id]/page.jsx
"use client";

import { auth } from "@/app/Components/firebase";
import OrderSkeleton from "@/app/Components/Skeleton/OrderSkeleton";
import useAxiosSecure from "@/app/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UserDetails() {
    const axiosSecure = useAxiosSecure();
    const [currentUser, setCurrentUser] = useState(null);

    // Track current user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user); // user থাকুক বা null
        });
        return () => unsubscribe(); // cleanup
    }, []);

    // Fetch user orders
    const { data, isLoading } = useQuery({
        queryKey: ["user", currentUser?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/get_orders?email=${currentUser?.email}`);
            return res.data;
        },
        enabled: !!currentUser?.email,
    });

    console.log(data)

    if (isLoading) return <div className=" min-h-screen bg-gradient-to-br from-[#8E2DE2] via-[#A855F7] to-[#EC4899] p-8 pt-36">
        <div className="max-w-7xl mx-auto gap-10 space-y-5">
            {Array.from({ length: 3 }).map((_, i) => (
                <OrderSkeleton key={i} />
            ))}
        </div>
    </div>;

    return (
        <div className="py-28 min-h-screen w-full bg-gradient-to-b from-[#9b5cff] to-[#f062c0]">
            <div className="max-w-6xl mx-auto px-4 ">
                {(!data || data.length === 0) && (
                    <div className="flex justify-center items-center w-full min-h-96 mt-32">
                        <div className="text-center bg-white/70 backdrop-blur-md 
                    border border-white/40 shadow-xl 
                    rounded-2xl px-10 py-12 max-w-md space-y-5">

                            {/* Icon */}
                            <div className="flex justify-center mb-6">
                                <div className="w-16 h-16 rounded-full 
                        bg-gradient-to-br from-purple-500 to-pink-500 
                        flex items-center justify-center text-white text-2xl shadow-lg">
                                    📦
                                </div>
                            </div>

                            {/* Text */}
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                No Orders Yet
                            </h3>

                            <p className="text-gray-600 text-sm">
                                You haven’t placed any orders yet.
                                Once you do, they’ll appear here.
                            </p>

                            {/* Button (optional) */}
                            <Link href='items' className=" px-6 py-3 rounded-full 
                         bg-gradient-to-r from-purple-500 to-pink-500 
                         text-white font-medium shadow-md 
                         hover:scale-105 transition-transform">
                                Start Shopping
                            </Link>
                        </div>
                    </div>
                )}

                {/* 🔝 USER INFO HEADER */}
                {data?.length > 0 && (
                    <div className="mb-12 p-8 rounded-2xl bg-white border shadow-lg w-fit">
                        <h2 className="text-4xl font-extrabold text-gray-900">
                            {data[0]?.name}
                        </h2>
                        <p className="text-gray-600 mt-2 text-lg">
                            {data[0]?.email}
                        </p>
                    </div>
                )}

                {/* 📦 ORDERS */}
                <div className="space-y-12">
                    {data?.map((items, orderIndex) => (
                        <div
                            key={items._id || orderIndex}
                            className="bg-white border rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
                        >
                            {/* Order header */}
                            <div className="px-6 py-4 border-b bg-gray-50 rounded-t-2xl flex justify-between items-center">
                                <h3 className="text-xl font-bold text-gray-800">
                                    Order #{orderIndex + 1}
                                </h3>
                                {items?.date && (
                                    <span className="text-sm text-gray-500 flex gap-3">
                                        {new Date(items.date).toLocaleDateString()}
                                        <span>{new Date(items.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    </span>
                                )}
                            </div>

                            {/* Items */}
                            <div className="p-6">
                                {(!items?.orderData || items.orderData.length === 0) && (
                                    <p className="text-center text-gray-400">
                                        No items found
                                    </p>
                                )}

                                {Array.isArray(items?.orderData) && (
                                    <>
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {items.orderData.map((item, index) => (
                                                <li
                                                    key={index}
                                                    className="group flex gap-5 p-5 border rounded-xl bg-gray-50 
                                                   hover:bg-white hover:border-orange-400 
                                                   hover:shadow-lg transition-all duration-300"
                                                >
                                                    {/* Image */}
                                                    <div className="relative overflow-hidden rounded-lg">
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className="w-28 h-28 object-cover 
                                                           group-hover:scale-110 transition-transform duration-300"
                                                        />
                                                    </div>

                                                    {/* Content */}
                                                    <div className="flex-1">
                                                        <h4 className="text-xl font-semibold text-gray-900">
                                                            {item.name}
                                                        </h4>

                                                        <p className="text-sm text-gray-600 mt-1">
                                                            {item.description}
                                                        </p>

                                                        <div className="flex justify-between items-center mt-4">
                                                            <span className="text-lg font-bold text-orange-600">
                                                                ৳ {item.price}
                                                            </span>

                                                            {item.quantity && (
                                                                <span className="text-sm font-medium text-gray-700 bg-white px-3 py-1 rounded-full shadow">
                                                                    Qty: {item.quantity}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Total Price */}
                                        <div className="mt-6 text-right px-2">
                                            <span className="text-xl font-bold text-green-600">
                                                Total: ৳ {items.totalPrice}
                                            </span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
