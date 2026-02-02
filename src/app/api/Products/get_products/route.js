import dbConnect from "@/app/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {

    try {
        const collection = await dbConnect("products")
        const result = await collection.find().toArray()
        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to fetch users" },
            { status: 500 }
        )
    }

}