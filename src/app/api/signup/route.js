export const runtime = "edge";
import connectDB from "@/app/lib/connectDb";
import UserData from "@/app/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    // Reuse existing DB connection
    await connectDB();

    // Parse the request body
    const { username, email, password } = await req.json();

    // Check if the user already exists based on email or username
    const existingUser = await UserData.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return NextResponse.json(
        {
          message: "Username or email already exists",
          status: 400,
        },
        { status: 400 }
      );
    }

    // Hash the password with optimized salt rounds
    const saltRounds = 4; // Adjusted for performance
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user object
    const newUser = new UserData({
      username,
      email,
      password: hashedPassword,
      messages: [],
    });

    // Save the new user to the database
    await newUser.save();

    // Return a streamlined JSON response
    return NextResponse.json(
      {
        message: "User registered successfully",
        status: 201,
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user:", error);

    // Return a JSON response with the error message
    return NextResponse.json(
      {
        message: "User registration failed",
        status: 500,
      },
      { status: 500 }
    );
  }
}
