"use client"; // This ensures it's a client-side component

import { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
const FormInputs = ({ params }) => {
  const { id } = params; // Extract the dynamic parameter
  const [username, setUsername] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  // Fetch the username for the given id
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await fetch(`/api/message`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }), // Send id along with form data
        });

        if (!response.ok) {
          throw new Error("Failed to fetch username");
        }
        const data = await response.json();
        setUsername(data.data.username); // Set the fetched username
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    fetchUsername();
  }, [id]); // Add id to dependency array

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, id }), // Send id along with form data
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add feedback");
      }

      const apiResponse = await response.json();
      // Add toast notification for success
      toast.success("Feedback submitted successfully!");

      // Uncomment the following line to log the API response for debugging purposes
      // console.log("Feedback submitted:", apiResponse);
      router.push("/"); // Redirect after successful submission
      // console.log("Feedback submitted:", apiResponse);
      router.push("/"); // Redirect after successful submission
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to add feedback: " + error.message);
      toast.error("Failed to add feedback: " + error.message);
    }
  };

  return (
    <div
      className="h-screen flex justify-center items-center"
      style={{
        backgroundImage: "linear-gradient(to bottom, #3498db, #2980b9)",
        backgroundSize: "4000% 4000%",
        animation: "gradient-animation 10s ease-in-out infinite",
      }}
    >
      <div className="p-10 w-screen bg-white shadow-md rounded-lg">
        <Link href="/">
          <button className="btn size-120 glass">HOME</button>
        </Link>
        <h2
          className="text-3xl font-bold text-gray-900 text-center"
          style={{
            animation: "title-animation 2s ease-in-out",
          }}
        >
          {username ? `Send Anonymous Message to ${username}` : "Loading..."}
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              id="message"
              {...register("message", { required: "Message is required" })}
              placeholder="Type the details here"
              className="w-full px-4 py-3 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              rows={4}
            />
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message.message}</p>
            )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md shadow-md transition duration-300"
              style={{
                animation: "button-animation 2s ease-in-out",
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormInputs;
