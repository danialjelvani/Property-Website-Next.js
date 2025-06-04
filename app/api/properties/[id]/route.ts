import { NextRequest } from "next/server";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";


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

// delete /api/properties/{id}
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID is not provided", { status: 401 });
    }

    const { userId } = sessionUser;

    await connectDB();
    const property = await Property.findById(id);

    if (!property) {
      return new Response("Property not found", { status: 404 });
    }

    if (userId !== property.owner.toString()) {
      return new Response("Unauthorized", { status: 401 });
    }

    await property.deleteOne();

    return new Response("property deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Database Error", { status: 500 });
  }
}
