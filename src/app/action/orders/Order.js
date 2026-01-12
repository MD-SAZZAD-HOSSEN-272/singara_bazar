"use server";


import dbConnect from "@/app/lib/dbConnect"

export const  oreders = async (payload) => {
    const orderData = await dbConnect('orders');
    const result = await orderData.insertOne(payload)
    return result
}