import { NextRequest } from "next/server";
import connectDB from "@/config/database";
import Property from "@/models/Property";

// Get /api/properties/{id}
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  try {
    await connectDB();
    const property = await Property.findById(id);

    if (!property) {
      return new Response("Property not found", { status: 404 });
    }
    return new Response(JSON.stringify(property), { status: 200 });
  } catch (error) {
    return new Response("Database Error", { status: 500 });
  }
}
