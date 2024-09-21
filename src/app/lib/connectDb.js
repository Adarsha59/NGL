import mongoose from "mongoose";

const connection = { isConnected: null };

async function connectDB() {
  if (connection.isConnected) {
    console.log("Already connected to the database");
    return;
  }

  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;

    if (connection.isConnected === 1) {
      console.log("Using existing database connection");
      return;
    }

    await mongoose.disconnect(); // Ensure any existing connection is clean
  }

  try {
    // Connect to the database
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DBNAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Fast timeout to prevent hanging connections
    });

    connection.isConnected = db.connections[0].readyState;

    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); // Exit to avoid further issues
  }
}

export default connectDB;
