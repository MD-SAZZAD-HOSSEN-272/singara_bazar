// src/app/api/Products/post_products/route.js

import dbConnect from "@/app/lib/dbConnect";


export async function POST(req) {
  try {
    const payload = await req.json();

    // Add extra fields if needed
    payload.date = new Date();

    // Connect to MongoDB
    const productsCollection = await dbConnect('products');

    // Insert product
    const result = await productsCollection.insertOne(payload);

    return new Response(JSON.stringify({
      success: true,
      insertedId: result.insertedId
    }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
