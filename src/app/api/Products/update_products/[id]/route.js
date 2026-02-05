
import dbConnect from "@/app/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

/**
 * PATCH /api/products/:id
 * Updates product fields, including addedBy/date if needed
 */
export async function PATCH(req, { params }) {
    try {
        const { id } =await params;
        const body = await req.json();

        // if (!ObjectId.isValid(id)) {
        //     return NextResponse.json(
        //         { message: "Invalid product ID" },
        //         { status: 400 }
        //     );
        // }

        console.log(body, id);

        // ✅ We no longer delete addedBy or date
        // Add updatedBy & updatedAt automatically
        body.updatedAt = new Date().toISOString();

        const db = dbConnect();

        // const result = await db("products").updateOne(
        //     { _id: new ObjectId(id) },
        //     { $set: body }  // will update everything sent, including addedBy/date
        // );

        // console.log(result);

        if (result.matchedCount === 0) {
            return NextResponse.json(
                { message: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Product updated successfully" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Update failed", error: error.message },
            { status: 500 }
        );
    }
}
