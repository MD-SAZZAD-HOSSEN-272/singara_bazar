import dbConnect from "@/app/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function DELETE(_, { params }) {
    try {

        const { id } = await params

        if (!ObjectId.isValid(id)) {
            return NextResponse.json(
                { message: "Invalid product ID" },
                { status: 400 }
            );
        }

        const query = { _id: new ObjectId(id) }

        const productCollection = await dbConnect('products')
        const result = await productCollection.deleteOne(query)
        console.log(result);

        if (result.deletedCount === 0) {
            return NextResponse.json(
                { messages: "Product not found" },
                { status: 404 }
            )
        }

        return NextResponse.json(
            { message: "Product Delete Successufl", result },
            { status: 200 }
        )

    } catch (err) {
        return NextResponse.json(
            { message: "Delete Failed", error: err.message },
            { status: 500 }
        )
    }
}