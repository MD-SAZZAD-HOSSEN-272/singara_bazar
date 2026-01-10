'use server'

import dbConnect from "@/app/lib/dbConnect"

export const  oreders = async (payload) => {
    console.log(payload)
    const orderData = dbConnect('orders');
    const result = orderData.insertOne(payload)
    return result
}