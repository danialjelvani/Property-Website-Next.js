import connectDB from "@/config/database";
import Property from "@/models/Property";
import User from "@/models/User";

// Get /api/properties/user/{userId}
export const GET = async (
  request: Request,
  { params }: { params: Promise<any> }
) => {
  try {
    await connectDB();

    const { userId } = await params;
    if (!userId) {
      return new Response("User ID not provided", { status: 400 });
    }
    const properties = await Property.find({ owner: userId });
    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    return new Response("Database Error", { status: 500 });
  }
};

// Delete /api/properties/user/{userId}
export const DELETE = async (
  request: Request,
  { params }: { params: Promise<any> }
) => {
  try {
    await connectDB();
    const { userId } = await params;
    if (!userId) {
      return new Response("User ID not provided", { status: 400 });
    }

    await Property.deleteMany({ owner: userId });
    await User.findByIdAndDelete(userId);
    return new Response("User deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Database Error", { status: 500 });
  }
};
