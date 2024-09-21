export const runtime = "edge";
import Feedback from "@/app/models/Message";
import connectDB from "@/app/lib/connectDb";
import User from "@/app/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();

  const body = await req.json();
  // console.log("Request body: ", body);

  // Destructure the message and id from the body
  const { message, id } = body;

  // Debugging logs
  // console.log("my id is " + id); // Should print the user ID
  // console.log("message is " + message);

  // Ensure the user exists
  const user = await User.findById(id);
  // console.log("user exists", user);
  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  // Create feedback

  user.messages.push({ message });
  await user.save();
  // Save feedback

  // Add feedback to the user document

  return new Response(
    JSON.stringify({
      message: "done",
      status: 200,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
