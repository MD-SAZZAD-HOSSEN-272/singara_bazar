"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UpdateForm from "../Components/UpdateFrom";

async function fetchOrders() {
  const res = await fetch("/api/orders");
  console.log(res)
  if (!res.ok) throw new Error("Failed to fetch orders");
  return await res.json();
}



export default function OrdersPage() {

  const [modal, setModal] = useState(null)

  const [singleData, setSinglData] = useState({})
  const [buttonValue, setButtonValue] = useState('')


  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  // State for date filtering
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0] // yyyy-mm-dd
  );
  const [filteredOrders, setFilteredOrders] = useState([]);

  // Filter orders by selected date


  useEffect(() => {
    if (!Array.isArray(data)) {
      setFilteredOrders([]);
      return;
    }

    const filtered = data.filter((order) => {
      if (!order?.date) return false;

      const d = new Date(order.date);
      if (isNaN(d.getTime())) return false;

      const orderDay = d.toISOString().split("T")[0];
      return orderDay === selectedDate;
    });

    setFilteredOrders(filtered);
  }, [data, selectedDate]);

  // Today button handler
  const handleTodayClick = () => {
    const today = new Date().toISOString().split("T")[0];
    setSelectedDate(today);
  };

  // Dummy handlers for buttons (replace with actual functions)
  const handleDetails = (order, buttonValue) => {
    setSinglData({})
    setModal(true)
    setButtonValue(buttonValue)
    setSinglData(order)
  };


  const handleUpdate = (order, buttonValue) => {
    setButtonValue('')
    setSinglData({})
    setModal(true)
    setButtonValue(buttonValue)
    setSinglData(order)
  };

  const handleDelete = async (id) => {
    const swalResult = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!swalResult.isConfirmed) return;

    try {
      const res = await fetch(`/api/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Delete request failed");
      }

      const data = await res.json(); // ✅ এখানেই deletedCount আছে

      if (data.deletedCount !== 1) {
        Swal.fire({
          title: "Deleted!",
          text: "Order has been deleted.",
          icon: "success",
        });
      }

      refetch(); // react-query refetch
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
      });
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-r from-[#9b5cff] via-[#c84bdc] to-[#ff4fa3] relative">

      {/* Page Container */}
      <div className="max-w-7xl mx-auto px-4 pt-20 pb-16">

        {/* Header */}
        <div className="mb-8 text-center text-white">
          <h1 className="text-4xl font-extrabold tracking-tight">📦 Orders</h1>
          <p className="text-white/80 mt-2">Employee order management dashboard</p>
        </div>

        {/* Date Picker */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <label className="text-white font-semibold">Select Date:</label>
          <input
            type="date"
            className="px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <button
            onClick={handleTodayClick}
            className="px-4 py-2 rounded-lg bg-white/80 text-gray-900 font-semibold hover:bg-white transition"
          >
            Today
          </button>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-44 rounded-2xl bg-white/30 backdrop-blur-lg animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center text-white font-medium bg-red-500/80 py-3 rounded-xl mb-6">
            ❌ Order load করতে সমস্যা হয়েছে
          </div>
        )}

        {/* Empty */}
        {!isLoading && filteredOrders.length === 0 && (
          <div className="text-center text-white/90 bg-white/20 py-6 rounded-xl mb-6">
            📭 কোনো Order পাওয়া যায়নি
          </div>
        )}

        {/* Orders Grid */}
        {filteredOrders.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredOrders.map((order) => (
              <div
                key={order._id}
                className="group relative overflow-hidden rounded-2xl bg-black/80 
                           shadow-md hover:shadow-xl transition"
              >
                {/* Hover Overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-r 
                             from-indigo-500 to-pink-500
                             translate-x-full group-hover:translate-x-0
                             transition-transform duration-500 ease-out"
                />

                {/* Content */}
                <div className="relative z-10 p-6 transition-colors duration-500
                                group-hover:text-white flex flex-col h-full">

                  {/* Top */}
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">
                      👤 {order.employeeName}
                    </h2>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-medium
                                 bg-gray-100 text-gray-700
                                 group-hover:bg-white/20 group-hover:text-white"
                    >
                      Qty {order.quantity}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="space-y-2 text-sm flex-1">
                    <p>
                      🚬 Cigarette: <span className="ml-1 font-medium">{order.cigaretteName}</span>
                    </p>
                    <p>
                      💵 Amount: <span className="ml-1 font-semibold">৳ {order.amount}</span>
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex gap-3 opacity-0 translate-y-4
                                  group-hover:opacity-100 group-hover:translate-y-0
                                  transition-all duration-500">
                    <button
                      className="flex-1 py-2 rounded-lg text-sm font-medium
                                 bg-white/90 text-gray-800
                                 hover:bg-white hover:scale-105 cursor-pointer transition"
                      onClick={() => handleDetails(order, 'details')}
                    >
                      Details
                    </button>

                    <button
                      className="flex-1 py-2 rounded-lg text-sm font-medium
                                 bg-yellow-400 text-black
                                 hover:bg-yellow-300 hover:scale-105 cursor-pointer transition"
                      onClick={() => handleUpdate(order, 'update')}
                    >
                      Update
                    </button>

                    <button
                      className="flex-1 py-2 rounded-lg text-sm font-medium
                                 bg-red-500 text-white
                                 hover:bg-red-600 hover:scale-105 cursor-pointer transition"
                      onClick={() => handleDelete(order._id, 'delete')}
                    >
                      Delete
                    </button>
                  </div>

                  {/* Footer */}
                  <div className="mt-4 flex justify-between text-xs opacity-70">
                    <span>Order ID</span>
                    <span className="font-mono">{order._id.slice(0, 8)}...</span>
                  </div>

                  {/* Date Display */}
                  <p className="text-xs mt-2 opacity-70">📅 {new Date(order.date).toLocaleDateString("en-GB")}</p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
      {
        modal && <div className="w-[50%] z-10 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 rounded-xl" style={{
        background: "linear-gradient(135deg, #f050b3, #a05bfc)",
      }}>
          <div className="w-full h-full relative">
            <button onClick={() => setModal(false)} className="absolute to-1 z-10 right-1 text-white cursor-pointer">
              Close
            </button>
            {
              buttonValue === 'details' && <div>
                <h2 className="text-2xl font-bold mb-4">Order Details</h2>
                <p>👤 Employee: {singleData.employeeName}</p>
                <p>🚬 Cigarette: {singleData.cigaretteName}</p>
                <p>📦 Quantity: {singleData.quantity}</p>
                <p>💵 Amount: ৳ {singleData.amount}</p>
                <p>📅 Date: {new Date(singleData.date).toLocaleString()}</p>
                <p>🆔 Order ID: {singleData._id}</p>
              </div>
            }
            {
              buttonValue === 'update' && <UpdateForm singleData={singleData} refetch={refetch}></UpdateForm>
            }
          </div>
        </div>
      }
    </div>
  );
}
