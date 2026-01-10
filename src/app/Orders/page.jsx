"use client";

import { useQuery } from "@tanstack/react-query";
import OrderCard from "@/components/orders/OrderCard";
import OrderSkeleton from "@/components/orders/OrderSkeleton";

async function fetchOrders() {
  const res = await fetch("/api/orders");

  if (!res.ok) {
    throw new Error("Failed to fetch orders");
  }

  return res.json();
}

 
export default function OrdersPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">📦 Orders</h1>

      {/* Loading */}
      {isLoading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <OrderSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="text-red-500">
          ❌ Order load করতে সমস্যা হয়েছে
        </p>
      )}

      {/* Empty */}
      {!isLoading && data?.length === 0 && (
        <p className="text-gray-500">কোনো Order নেই</p>
      )}

      {/* Data */}
      {data?.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
