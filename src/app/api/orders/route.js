'use server'

import dbConnect from "@/app/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const ordersCollection = await dbConnect("orders");
    const orders = await ordersCollection.find({}).toArray();
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
