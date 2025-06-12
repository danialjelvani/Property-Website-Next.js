import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

// toggle read message
export const PUT = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { id } = await params;

    const message = await Message.findById(id);

    if (!message) {
      return new Response("Message not found", { status: 404 });
    } else if (message.recipient.toString() !== sessionUser.userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    // upadate message read status

    message.read = !message.read;

    await message.save();

    return new Response(JSON.stringify(message), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Database Error", { status: 500 });
  }
};

// DELETE message
export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { id } = await params;

    const message = await Message.findById(id);

    if (!message) {
      return new Response("Message not found", { status: 404 });
    } else if (message.recipient.toString() !== sessionUser.userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    await message.deleteOne();

    return new Response("Message deleted", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Database Error", { status: 500 });
  }
};
