// models/User.js

import mongoose from "mongoose";

// Define the Message sub-schema
const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
    trim: true, // Removes whitespace from both ends
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Define the User schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true, // Ensures usernames are unique
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensures emails are unique
      lowercase: true, // Converts email to lowercase
      trim: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"], // Email validation
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Ensure passwords have a minimum length
    },
    messages: [messageSchema], // Embedding messages as an array of sub-documents
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Export the model, avoiding recompilation if already compiled
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
