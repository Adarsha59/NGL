import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter a username"],
  },
  email: {
    type: String,
    required: [true, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Please enter a valid password"],
  },
  feedbacks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Feedback" }],
});

// Create or retrieve the User model
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
