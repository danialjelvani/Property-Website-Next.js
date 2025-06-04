import connectDB from "@/config/database";
import Property from "@/models/Property";



// Get /api/properties/user/{userId}
export const GET = async (request: Request, { params }: { params: { userId: string } }) => {
  try {
    await connectDB();
    
    const {userId} = await params;
    if (!userId) {
      return new Response("User ID not provided", { status: 400 });
    }
    const properties = await Property.find({owner: userId});
    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    return new Response("Database Error", { status: 500 });
  }
};