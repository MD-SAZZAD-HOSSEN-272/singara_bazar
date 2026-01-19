'use server'

import dbConnect from "@/app/lib/dbConnect"

export const  users = async (payload) => {
    const orderData = await dbConnect('users');
    const result = await orderData.insertOne(payload)
    return result
}
