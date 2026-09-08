import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderId } = body;

    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }

    // [PHASE 2 - MOCK IMPLEMENTATION]
    // In the real version, we will grab the Porter API key from process.env.PORTER_API_KEY
    // and make a real fetch() POST request to the Porter API here.
    
    // Simulate API delay (network request)
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Simulate successful Porter response
    return NextResponse.json({
      success: true,
      data: {
        order_id: orderId,
        tracking_url: `https://tracking.porter.in/mock-track-${Math.random().toString(36).substring(2, 8)}`,
        driver: {
          name: "Ramesh Kumar",
          phone: "+91 9876543210",
          vehicle_number: "GJ-01-XX-1234",
        },
        estimated_pickup: "15 mins",
      }
    });
  } catch (error) {
    console.error("Porter API Error:", error);
    return NextResponse.json({ error: "Failed to book Porter" }, { status: 500 });
  }
}
