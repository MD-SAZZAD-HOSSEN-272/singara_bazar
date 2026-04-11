// Store ID: sazza69d51f3370864
// Store Password (API/Secret Key): sazza69d51f3370864@ssl

import dbConnect from "@/app/lib/dbConnect";
import axios from "axios";


// Merchant Panel URL: https://sandbox.sslcommerz.com/manage/ (Credential as you inputted in the time of registration)


 
// Store name: testsazzadd3z
// Registered URL: www.sazzad.com
// Session API to generate transaction: https://sandbox.sslcommerz.com/gwprocess/v4/api.php
// Validation API: https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php
// Validation API (Web Service) name: https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php


export async function POST(req) {
  try {
    const body = await req.formData();
    const orderCollection = await dbConnect('purchasesItems');

    const isPaymentSuccess = await axios.get(
      `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${body.get("val_id")}&store_id=sazza69d51f3370864&store_passwd=sazza69d51f3370864@ssl&v=1&format=json`
    );

    console.log("Payment Validation Result:", isPaymentSuccess.data);
    if (isPaymentSuccess.data.status !== "VALID") {
        return Response.json({
          message: "Payment validation failed",
        }, { status: 400 });
    }
      // ✅ Payment is valid, you can update order status in your database here

      const updateOrderStatus = await orderCollection.updateOne(
        { transactionId: isPaymentSuccess.data.tran_id },
        { $set: { status: "paid" } }
      );
    

    return Response.json({
      message: "Payment success handled",
      
    });
  } catch (error) {
    return Response.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}