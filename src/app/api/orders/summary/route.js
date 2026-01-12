import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json({ error: "Date required" }, { status: 400 });
  }

  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  const orders = await dbConnect("orders");

  const result = await orders.aggregate([
    { $match: { date: { $gte: start, $lte: end } } },
    {
      $group: {
        _id: null,
        totalQuantity: { $sum: "$quantity" },
        totalAmount: { $sum: "$amount" },
      },
    },
  ]).toArray();

  return NextResponse.json({
    totalQuantity: result[0]?.totalQuantity || 0,
    totalAmount: result[0]?.totalAmount || 0,
  });
}
