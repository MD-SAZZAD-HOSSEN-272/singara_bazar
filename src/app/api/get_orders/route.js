'use server'

import dbConnect from "@/app/lib/dbConnect";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const getOrders = await dbConnect('purchasesItems')
    const orders = await getOrders.find({}).toArray()
    return NextResponse.json((orders))
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
