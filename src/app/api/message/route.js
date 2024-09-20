// Import necessary modules
import connectDB from "@/app/lib/connectDb";
import { NextResponse } from "next/server";
import dataModule from "@/app/models/User";

// Define the GET function
export async function POST(request) {
  try {
    // Connect to the database
    await connectDB();

    // Parse the request body
    const body = await request.json();

    // Destructure the id from the body
    const { id } = body;

    // Find the data by id
    const data = await dataModule.findById(id);

    // Check if data was found
    if (!data) {
      // Return a 404 response if no data is found
      return NextResponse.json({ message: "No data found" }, { status: 404 });
    }

    // Return a success response with the fetched data
    return NextResponse.json(
      { message: "Data retrieved successfully", data: data },
      { status: 200 }
    );
  } catch (error) {
    // Handle and log any errors
    console.error("Failed to fetch data:", error);

    // Return an error response
    return NextResponse.json(
      { message: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
