export const cors = (req) => {
  const headers = {
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Credentials": "true"
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  return headers;
};
