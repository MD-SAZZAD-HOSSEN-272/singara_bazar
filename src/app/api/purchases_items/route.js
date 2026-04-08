"use server";
import dbConnect from "@/app/lib/dbConnect";
import axios from "axios";
import { ObjectId } from "mongodb";
import qs from "qs";

export const placeOrders = async (payload) => {
  try {
    const orderCollection = await dbConnect("purchasesItems");

    payload.date = new Date();

    const productCollection = await dbConnect("products");

    // ✅ convert ids
    const productIds = payload.orderData.map(
      (item) => new ObjectId(item._id)
    );

    // ✅ fetch products from DB
    const products = await productCollection
      .find({ _id: { $in: productIds } })
      .toArray();

    // ✅ calculate total price
    let totalAmount = 0;

    const orderItems = payload.orderData.map((item) => {
      const product = products.find(
        (p) => p._id.toString() === item._id
      );

      if (!product) {
        throw new Error("Product not found");
      }

      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;

      return {
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        total: itemTotal,
      };
    });

    // ✅ final order
    const order = {
      items: orderItems,
      totalAmount,
      status: "pending",
      date: new Date(),
    };

    // console.log(order); 

    // 👉 SSL payment এর আগে এটা use করবে
    const trxId = new ObjectId().toString(); // unique transaction ID

    order.transactionId = trxId; // save trxId in order for later reference

    const intialData = {
      store_id: 'sazza69d51f3370864',
      store_passwd: 'sazza69d51f3370864@ssl',
      total_amount: totalAmount,
      currency: 'BDT',
      tran_id: trxId, // use unique tran_id for each api call
      success_url: 'http://localhost:3000/api/sslComerce-success',
      fail_url: 'http://localhost:5173/fail',
      cancel_url: 'http://localhost:5173/cancel',
      ipn_url: 'http://localhost:5001/ipn-success-payment',
      shipping_method: 'Courier',
      product_name: 'Computer.',
      product_category: 'Electronic',
      product_profile: 'general',
      cus_name: 'Customer Name',
      cus_email: 'customer@example.com',
      cus_add1: 'Dhaka',
      cus_add2: 'Dhaka',
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: '1000',
      cus_country: 'Bangladesh',
      cus_phone: '01711111111',
      cus_fax: '01711111111',
      ship_name: 'Customer Name',
      ship_add1: 'Dhaka',
      ship_add2: 'Dhaka',
      ship_city: 'Dhaka',
      ship_state: 'Dhaka',
      ship_postcode: 1000,
      ship_country: 'Bangladesh',

    }

    const sslResponse = await axios.post(
      'https://sandbox.sslcommerz.com/gwprocess/v4/api.php',
      qs.stringify(intialData), // 🔥 MUST
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const getGatewayPageURL = sslResponse?.data?.GatewayPageURL;

    console.log(getGatewayPageURL);

    const result = await orderCollection.insertOne(order);

    return {
      success: true,
      insertedId: result.insertedId,
      paymentURL: getGatewayPageURL, // 👉 return the payment URL to the client
    };

    // return order;

  } catch (error) {
    throw new Error(error.message || "Failed to place order");
  }
};