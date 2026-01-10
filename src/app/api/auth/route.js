'use server'

import dbConnect from "@/app/lib/dbConnect"

export const  users = async (payload) => {
    console.log(payload)
    const orderData = dbConnect('users');
    const result = orderData.insertOne(payload)
    return result
}