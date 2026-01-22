// app/api/get_orders/route.js
'use server';

import dbConnect from "@/app/lib/dbConnect";
import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // or specific domain
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400, headers: corsHeaders }
      );
    }

    const collection = await dbConnect("purchasesItems");

    const orders = await collection
      .find({ email })
      .sort({ _id: -1 })
      .toArray();

    return NextResponse.json(orders, {
      headers: corsHeaders,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch orders" },
      { status: 500, headers: corsHeaders }
    );
  }
}
