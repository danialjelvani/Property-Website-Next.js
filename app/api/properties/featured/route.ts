import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/database";
import Property from "@/models/Property";

// Get /api/properties/featured
export const GET = async (request: NextRequest) => {
  try {
    await connectDB();

    const properties = await Property.find({ is_featured: true });

    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Database Error", { status: 500 });
  }
};
