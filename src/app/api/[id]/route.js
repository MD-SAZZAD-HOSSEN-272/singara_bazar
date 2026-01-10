'use server'

import dbConnect from "@/app/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    console.log(id)
    if (!id) {
      return NextResponse.json({ message: "Order ID is required" }, { status: 400 });
    }

    const ordersCollection = await dbConnect("orders");
    const result = await ordersCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to delete order" }, { status: 500 });
  }
}