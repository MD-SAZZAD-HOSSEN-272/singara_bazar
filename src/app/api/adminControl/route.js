'use server'

import dbConnect from "@/app/lib/dbConnect";
import { ObjectId } from "mongodb";

/**
 * Toggle or set admin state
 * @param {boolean} isAdmin - true or false
 * @returns {Promise<object>} result of update
 */
export const adminControl = async (isAdmin) => {
    console.log(isAdmin)
  try {
    const collection = await dbConnect('adminControl');

    const result = await collection.updateOne(
      { _id: new ObjectId("6964bb68813640b7e9335cdc") },            // fixed id for single admin doc
      { $set: { isAdmin } },       // update admin state
      { upsert: false }             // create if not exists
    );

    return result;                 // contains matchedCount, modifiedCount, upsertedId
  } catch (error) {
    console.error("Failed to update admin:", error);
    throw new Error("Admin update failed");
  }
};
