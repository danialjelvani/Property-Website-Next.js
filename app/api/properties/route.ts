import connectDB from "@/config/database";
import Property from "@/models/Property";

// Get /api/properties
export const GET = async (request: Request) => {
  try {
    await connectDB();
    const properties = await Property.find({});
    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    return new Response("Database Error", { status: 500 });
  }
};
