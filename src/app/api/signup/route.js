import connectDB from "@/app/lib/connectDb";
import UserData from "@/app/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    await connectDB();

    // Parse the request body (use req.json() in the Next.js App Router)
    const { username, email, password } = await req.json();

    // Check if the user already exists based on email or username
    const existingUser = await UserData.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      return NextResponse.json({
        message: "Username or email already exists",
        status: 400,
      });
    }

    // Hash the password before saving it to the database
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user object with the provided username, email, and hashed password
    const newUser = new UserData({
      username,
      email,
      password: hashedPassword,
      messages: [],
    });

    // Save the new user to the database
    await newUser.save();
    // console.log("User registered:", newUser);

    // Return a JSON response with the success status, message, and the newly created user object
    return NextResponse.json({
      message: "User registered successfully",
      status: 201,
      user: newUser,
    });
  } catch (error) {
    console.error("Error registering user:", error);

    // Return a JSON response with the error message
    return NextResponse.json({
      message: "User registration failed",
      status: 500,
    });
  }
}
