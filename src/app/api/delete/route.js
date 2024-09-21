// Import necessary modules
export const runtime = "edge";
import connectDB from "@/app/lib/connectDb"; // Adjust path as necessary
import Item from "@/app/models/User"; // Ensure this model matches your database schema
import { NextResponse } from "next/server";
export async function DELETE(request) {
  try {
    await connectDB(); // Ensure database connection is established

    // Parse the JSON body
    const { userId, messageId } = await request.json();

    if (!userId || !messageId) {
      return NextResponse.json(
        { error: "User ID and Message ID are required" },
        { status: 400 }
      );
    }

    // Find and delete the message
    const result = await Item.updateOne(
      { _id: userId, "messages._id": messageId }, // Query to match the user and message
      { $pull: { messages: { _id: messageId } } } // Remove the message from the messages array
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { error: "Message not found or already deleted" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Message deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting message:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
