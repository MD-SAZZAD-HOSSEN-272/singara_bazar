import dbConnect from "@/app/lib/dbConnect";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();

    const ordersCollection = await dbConnect("orders");

    const result = await ordersCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          employeeName: body.employeeName,
          cigaretteName: body.cigaretteName,
          quantity: Number(body.quantity),
          amount: Number(body.amount),
        },
      }
    );

    return NextResponse.json({
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Update failed" },
      { status: 500 }
    );
  }
}
