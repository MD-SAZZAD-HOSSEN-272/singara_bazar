"use server";
import dbConnect from "@/app/lib/dbConnect";

export const placeOrders = async (payload) => {
  try {
    const orderCollection = await dbConnect("purchasesItems");

    // ✅ add date properly
    payload.date = new Date();

    const result = await orderCollection.insertOne(payload);

    return {
      acknowledged: result.acknowledged,
      insertedId: result.insertedId.toString(), // MongoDB ObjectId → string
    };
  } catch (error) {
    throw new Error("Failed to place order");
  }
};
