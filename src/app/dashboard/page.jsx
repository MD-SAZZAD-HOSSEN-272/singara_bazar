"use client";

import {LineChart, Line, XAxis, YAxis} from "recharts";

export default function AdminDashboard() {

    const data = [
        { name: "Jan", users: 40 },
        { name: "Feb", users: 60 },
    ];
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="font-semibold">Total Users</h2>
                    <p className="text-2xl">120</p>
                </div>

                <div className="bg-white p-4 rounded shadow">
                    <h2 className="font-semibold">Orders</h2>
                    <p className="text-2xl">45</p>
                </div>

                <div className="bg-white p-4 rounded shadow">
                    <h2 className="font-semibold">Revenue</h2>
                    <p className="text-2xl">$3,200</p>
                </div>
            </div>
            



            <LineChart width={300} height={200} data={data}>
                <Line type="monotone" dataKey="users" stroke="#8884d8" />
                <XAxis dataKey="name" />
                <YAxis />
            </LineChart>;
        </div>
    );
}
