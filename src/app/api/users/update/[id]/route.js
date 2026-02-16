import dbConnect from "@/app/lib/dbConnect";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function PATCH(req, { params }) {
  try {
    const { id } = await params;
    const { role } = await req.json();

    if (!id || !role) {
      return NextResponse.json(
        { message: "User ID and role are required" },
        { status: 400 }
      );
    }

    const collection = await dbConnect("users");

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { role } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "User role updated successfully",
        modifiedCount: result.modifiedCount,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update user role" },
      { status: 500 }
    );
  }
}
