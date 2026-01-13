"use server";

import dbConnect from "@/app/lib/dbConnect";

export const placeOrders = async (payload) => {
  const orderData = await dbConnect("purchasesItems");
  const result = await orderData.insertOne(payload);

  console.log(result)

  return {
    acknowledged: result.acknowledged,
    insertedId: result.insertedId.toString(), // ✅ convert to string
  };
};