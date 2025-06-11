import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";


export const GET = async () => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response(
        JSON.stringify("Unauthorized"),
        { status: 401 }
      );
    }

    const { userId } = sessionUser;

    const messages = await Message.find({ recipient: userId })
    .populate("sender", "username")
    .populate("property", "name");

    return new Response(JSON.stringify(messages), { status: 200 });

  } catch (error) {
    console.log(error);
    return new Response("Database Error", { status: 500 });
  }
}

export const POST = async (request: Request) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response(
        JSON.stringify({ message: "You must be logged in to send a message" }),
        { status: 401 }
      );
    }

    const { user } = sessionUser;

    const { name, email, message, phone, recipient, property, read } =
      await request.json();

    if (user.id === recipient) {
      return new Response(
        JSON.stringify({ message: "You cannot send a message to yourself" }),
        {
          status: 400,
        }
      );
    }

    const newMessage = new Message({
      sender: user.id,
      recipient,
      property,
      name,
      email,
      body: message,
      phone,
      read,
    });

    await newMessage.save();

    return new Response(
      JSON.stringify({ message: "Message sent successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new Response("Database Error", { status: 500 });
  }
};
