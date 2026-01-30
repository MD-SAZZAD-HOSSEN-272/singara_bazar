"use client";

import useAxiosSecure from "@/app/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Swal from "sweetalert2";

export default function AdminOrders() {
    const axiosSecure = useAxiosSecure();

    const { data: orders = [], isLoading, refetch } = useQuery({
        queryKey: ["orders"],
        queryFn: async () => {
            const res = await axiosSecure.get("/api/get_all_orders");
            return res.data;
        },
    });

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Delete Order?",
            text: "This order will be permanently removed!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, delete it!",
        });

        if (!confirm.isConfirmed) return;

        try {
            await axiosSecure.delete(`/api/orders/delete/${id}`);
            Swal.fire("Deleted!", "Order removed successfully", "success");
            refetch();
        } catch (error) {
            Swal.fire("Error!", "Failed to delete order", "error");
        }
    };

    const handleUpdate = (id) => {
        Swal.fire({
            title: "Update Order",
            text: `Here you can add update logic for order ID: ${id}`,
            icon: "info",
        });
    };

    const handleDetails = (order) => {
        Swal.fire({
            title: "Order Details",
            html: `
        <strong>Name:</strong> ${order.name} <br/>
        <strong>Email:</strong> ${order.email} <br/>
        <strong>Items:</strong> ${order.orderData.length} <br/>
        <strong>Total:</strong> ৳${order.orderData.reduce(
                (sum, i) => sum + i.quantityPrice,
                0
            )}
      `,
            icon: "info",
            confirmButtonText: "Close",
        });
    };

    if (isLoading) {
        return <p className="text-white p-6">Loading orders...</p>;
    }

    if (!orders.length) {
        return <p className="text-white p-6">No orders found.</p>;
    }

    return (
        <div className="min-h-screen p-6 bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900">
            <h1 className="text-3xl font-bold text-white mb-6">🧾 All Orders</h1>

            <div className="flex flex-col gap-5">
                {orders.map((order) => {
                    const total = order.orderData.reduce(
                        (sum, item) => sum + item.quantityPrice,
                        0
                    );

                    return (
                        <div
                            key={order._id}
                            className="bg-gradient-to-r from-purple-50/50 to-white/20 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-xl"
                        >
                            {/* Header */}
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                                <div>
                                    <h2 className="text-xl font-bold text-white">
                                        {order.name}
                                    </h2>
                                    <p className="text-sm text-purple-800">{order.email}</p>
                                </div>

                                {/* Buttons */}
                                <div className="flex flex-wrap gap-4 mt-2 md:mt-0">
                                    {/* Details Button */}
                                    <button
                                        onClick={() => handleDetails(order)}
                                        className="
      px-6 py-2 text-sm font-semibold rounded-full
      bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-700
      text-white
      shadow-lg
      hover:brightness-110 hover:shadow-2xl
      transition
      w-full md:w-auto
      focus:outline-none focus:ring-4 focus:ring-indigo-400
    "
                                    >
                                        Details
                                    </button>

                                    {/* Update Button */}
                                    <button
                                        onClick={() => handleUpdate(order._id)}
                                        className="
      px-6 py-2 text-sm font-semibold rounded-full
      bg-gradient-to-r from-green-400 via-green-500 to-teal-600
      text-white
      shadow-lg
      hover:brightness-110 hover:shadow-2xl
      transition
      w-full md:w-auto
      focus:outline-none focus:ring-4 focus:ring-green-400
    "
                                    >
                                        Update
                                    </button>

                                    {/* Delete Button */}
                                    <button
                                        onClick={() => handleDelete(order._id)}
                                        className="
      px-6 py-2 text-sm font-semibold rounded-full
      bg-gradient-to-r from-red-500 via-pink-600 to-red-600
      text-white
      shadow-lg
      hover:brightness-110 hover:shadow-2xl
      transition
      w-full md:w-auto
      focus:outline-none focus:ring-4 focus:ring-red-400
    "
                                    >
                                        Delete
                                    </button>
                                </div>


                            </div>

                            {/* Items */}
                            <div className="flex flex-col gap-4 overflow-x-auto">
                                {order.orderData.map((item) => (
                                    <div
                                        key={item.id}
                                        className="bg-white/80 rounded-xl p-4 flex gap-4 items-center shadow-md hover:shadow-xl transition"
                                    >
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            width={70}
                                            height={70}
                                            className="rounded-lg object-cover"
                                        />

                                        <div className="flex-1">
                                            <h3 className="font-semibold text-purple-900">
                                                {item.name}
                                            </h3>
                                            <p className="text-sm text-purple-700">
                                                {item.description}
                                            </p>

                                            <div className="flex justify-between mt-2 text-sm text-purple-800 font-medium">
                                                <span>Qty: {item.quantity}</span>
                                                <span>৳{item.quantityPrice}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="flex justify-between items-center mt-6 border-t border-white/30 pt-4">
                                <span className="text-purple-800 font-medium">
                                    Total Items: {order.orderData.length}
                                </span>
                                <span className="text-xl font-bold text-white">
                                    Total: ৳{total}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
