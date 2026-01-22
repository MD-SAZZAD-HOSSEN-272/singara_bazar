// app/api/get_orders/route.js
'use server'

import dbConnect from "@/app/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        // get query params
        const { searchParams } = new URL(request.url);
        const email = searchParams.get("email");

        if (!email) {
            return NextResponse.json(
                { message: "Email is required" },
                { status: 400 }
            );
        }

        const collection = await dbConnect("purchasesItems");

        const orders = await collection
            .find({ email }).sort({_id: -1})
            .toArray();

        return NextResponse.json(orders);
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to fetch orders" },
            { status: 500 }
        );
    }
}
