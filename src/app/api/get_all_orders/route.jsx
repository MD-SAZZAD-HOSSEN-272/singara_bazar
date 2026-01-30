// app/api/get_orders/route.js
'use server'

import dbConnect from "@/app/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {

        const collection = await dbConnect("purchasesItems");

        const orders = await collection
            .find()
            .toArray();

        return NextResponse.json(orders);
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to fetch orders" },
            { status: 500 }
        );
    }
}
