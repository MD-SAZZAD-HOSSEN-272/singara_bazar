import dbConnect from "@/app/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";



export async function DELETE(req, {params}) {
    try {
        const { id } = await params;
        console.log(id)
        if (!id) {
          return NextResponse.json({ message: "Order ID is required" }, { status: 400 });
        }
    
        const usersCollection = await dbConnect("users");
        const result = await usersCollection.deleteOne({ _id: new ObjectId(id) });

        console.log(result)

        if (result.deletedCount === 0) {
          return NextResponse.json({ message: "Order not found" }, { status: 404 });
        }
    
        return NextResponse.json({ message: "Order deleted successfully", result });
      } catch (error) {
        return NextResponse.json({ message: "Failed to delete order" }, { status: 500 });
      }
}