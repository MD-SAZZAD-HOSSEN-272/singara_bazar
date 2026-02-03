"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import DashboardSkeleton from "../Components/Skeleton/DashboardSkeleton";

// Add this utility function to format date strings
function formatDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export default function AdminDashboard() {
  const axiosSecure = useAxiosSecure();

  const { data: aggregateData, isLoading, error } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/dashboard");
      return res.data;
    },
  });

  if (isLoading) return <div><DashboardSkeleton></DashboardSkeleton></div>;
  if (error) return <p className="p-6 text-red-600">Error loading data</p>;

  const sortedOrdersChart = [...(aggregateData?.orderChart ?? [])].sort(
  (a, b) => new Date(a._id) - new Date(b._id)
);


  return (
    <div className="p-6 bg-gray-50 rounded-2xl">
      <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-[#8884d8]">
          <p className="text-gray-500 text-sm">Total Users</p>
          <h2 className="text-3xl font-bold text-gray-800 mt-2">
            {aggregateData?.totalUsers ?? 0}
          </h2>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-[#8884d8]">
          <p className="text-gray-500 text-sm">Total Personal Orders</p>
          <h2 className="text-3xl font-bold text-gray-800 mt-2">
            {aggregateData?.totalPurchases ?? 0}
          </h2>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-[#8884d8]">
          <p className="text-gray-500 text-sm">Revenue</p>
          <h2 className="text-3xl font-bold text-gray-800 mt-2">$3,200</h2>
        </div>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        {/* USERS CHART */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-gray-700 mb-4">New Personal Order (Last 7 Days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={aggregateData.orderChart ?? []} margin={{ top: 10, right: 30, left: 0, bottom: 50 }}>
              <CartesianGrid stroke="#f0f0f0" strokeDasharray="3 3" />
              <XAxis
                dataKey="_id"
                tickFormatter={formatDate}
                tick={{ fontSize: 12, fill: "#666" }}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={50}
              />
              <YAxis tick={{ fontSize: 12, fill: "#666" }} />
              <Tooltip
                formatter={(value) => [value, "Orders"]}
                labelFormatter={(label) => `Date: ${formatDate(label)}`}
              />
              <Line
                type="monotone"
                dataKey="totalOrders"
                stroke="#8884d8"
                strokeWidth={3}
                dot={{ r: 5, strokeWidth: 2, fill: "#fff" }}
                activeDot={{ r: 7 }}
                isAnimationActive={true}
                animationDuration={1000}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* ORDERS CHART */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-gray-700 mb-4">New Users (Last 7 Days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={aggregateData?.usersChart ?? []} margin={{ top: 10, right: 30, left: 0, bottom: 50 }}>
              <CartesianGrid stroke="#f0f0f0" strokeDasharray="3 3" />
              <XAxis
                dataKey="_id"
                tickFormatter={formatDate}
                tick={{ fontSize: 12, fill: "#666" }}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={50}
              />
              <YAxis tick={{ fontSize: 12, fill: "#666" }} />
              <Tooltip
                formatter={(value) => [value, "Users"]}
                labelFormatter={(label) => `Date: ${formatDate(label)}`}
              />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#82ca9d"
                strokeWidth={3}
                dot={{ r: 5, strokeWidth: 2, fill: "#fff" }}
                activeDot={{ r: 7 }}
                isAnimationActive={true}
                animationDuration={1000}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
