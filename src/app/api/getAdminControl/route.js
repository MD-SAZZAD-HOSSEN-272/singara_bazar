'use server'

import dbConnect from "@/app/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const usersCollection = await dbConnect("adminControl");
    const users = await usersCollection.find({}).toArray();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch users" },
      { status: 500 }
    );
  }
}