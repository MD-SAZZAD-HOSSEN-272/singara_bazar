// Store ID: sazza69d51f3370864
// Store Password (API/Secret Key): sazza69d51f3370864@ssl


// Merchant Panel URL: https://sandbox.sslcommerz.com/manage/ (Credential as you inputted in the time of registration)


 
// Store name: testsazzadd3z
// Registered URL: www.sazzad.com
// Session API to generate transaction: https://sandbox.sslcommerz.com/gwprocess/v4/api.php
// Validation API: https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php
// Validation API (Web Service) name: https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php


export async function POST(req) {
  try {
    const body = await req.formData();
    console.log("SSL Success Data:", body);

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