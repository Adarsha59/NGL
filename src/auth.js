import NextAuth from "next-auth";
import connectDB from "@/app/lib/connectDb";
import bcrypt from "bcrypt"; // Use import instead of require
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/app/models/User";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    // Credentials Authentication Provider
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "you@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          // Ensure the database is connected
          await connectDB();

          // Check if user exists with the provided email
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            throw new Error("User not found.");
          }

          // Compare provided password with the stored hashed password
          const isPasswordMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isPasswordMatch) {
            throw new Error("Invalid password.");
          }

          // If successful, return the user object
          return {
            id: user._id.toString(),
            username: user.username,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          //   throw new Error("Authentication failed.");
        }
      },
    }),
  ],
  pages: {
    error: "/auth/error",
  },
  trustHosts: [
    // Add your local development URL
    "https://main--kxa.netlify.app",
    "https://kxa.vercel.app", // Add your production URL
  ],

  // Use JWT for sessions
  session: {
    strategy: "jwt",
  },
  trustHost: true,

  // Callbacks for handling JWT and Session
  callbacks: {
    // JWT callback to store user information in the token
    async jwt({ token, user }) {
      if (user) {
        token._id = user.id; // Add user ID to token
        token.username = user.username; // Add username to token
      }
      // console.log("JWT Token:", token); // Debugging the token
      return token;
    },

    // Session callback to include token data in the session
    async session({ session, token }) {
      session.user._id = token._id; // Add user ID from token to session
      session.user.username = token.username; // Add username from token to session
      // console.log("Session:", session); // Debugging the session
      return session;
    },
  },

  // Secret for signing the JWT
  secret: process.env.AUTH_SECRET,
});
