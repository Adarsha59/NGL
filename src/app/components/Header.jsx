"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion"; // For animations
import toast, { Toaster } from "react-hot-toast";
export default function Dashboard() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const handleMessagesRedirect = () => {
    if (session) {
      router.push(`/messages/${session.user._id}`);
    }
  };

  const handleCopyMessage = () => {
    const message = `${baseUrl}/form/${session.user._id}`;
    navigator.clipboard
      .writeText(message)
      .then(() => {
        toast.success("Link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
        toast.error("Failed to copy link. Please try again.");
      });
  };

  const buttonVariants = {
    hover: { scale: 1.1, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" },
    tap: { scale: 0.95, boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)" },
  };

  if (session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-8">
        <h1 className="text-4xl font-bold mb-8 shadow-md bg-black bg-opacity-50 p-4 rounded-lg">
          Welcome, {session.user.username}!
        </h1>

        {/* Message and Copy Button */}
        <div className="text-center mb-8">
          <p className="text-xl mb-4 font-light">
            Share this link with your friends to let them send anonymous
            messages.
          </p>

          <div className="bg-white text-black rounded-lg px-6 py-3 mb-6 shadow-md transition-transform transform hover:scale-105">
            <span className="font-semibold text-lg">{`${baseUrl}/form/${session.user._id}`}</span>
          </div>
          <motion.button
            className="px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg shadow-lg font-semibold text-xl transition-transform"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={handleCopyMessage}
          >
            Copy Link
          </motion.button>
        </div>

        <motion.button
          className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-lg font-semibold text-xl transition-transform mb-4"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={handleMessagesRedirect}
        >
          See All Anonymous Messages
        </motion.button>

        <motion.button
          className="px-8 py-4 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-lg font-semibold text-xl transition-transform"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() => signOut()}
        >
          Sign Out
        </motion.button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 text-white p-8">
      <h1 className="text-4xl font-bold mb-8 shadow-md bg-black bg-opacity-50 p-4 rounded-lg">
        Want to see what your friends really think about you ? Sign in to
        receive anonymous feedback!
      </h1>

      <motion.button
        className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-lg font-semibold text-xl transition-transform"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={() => router.push("/signup")} // Change here
      >
        Sign Up
      </motion.button>
    </div>
  );
}
