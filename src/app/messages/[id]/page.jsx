"use client";
export const runtime = "edge";
import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
const CardLayout = ({ params }) => {
  const [cards, setCards] = useState([]);
  const { id } = params; // Extract the dynamic parameter
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setname] = useState("Guest");

  const deleteCard = async (userId, messageId) => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

      const response = await fetch(`${baseUrl}/api/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, messageId }),
      });
      if (!response.ok) {
        throw new Error("Failed to delete item");

        // Show toast notification for error
        toast.error("Failed to delete item");
      }
      // Remove item from local state
      setCards(cards.filter((item) => item._id !== messageId));
      // Show toast notification for success
      toast.success("Item deleted successfully!");
    } catch (error) {
      console.error("Failed to delete item:", error);
      // Show toast notification for error
      toast.error("Failed to delete item");
    }
  };

  // Demo data
  const demoData = [
    { id: 1, message: "Hello World!", createdAt: "2023-05-20T10:30:00Z" },
    { id: 2, message: "React is awesome!", createdAt: "2023-05-20T11:45:00Z" },
    {
      id: 3,
      message: "Tailwind makes styling easy!",
      createdAt: "2023-05-20T12:15:00Z",
    },
    {
      id: 4,
      message: "Responsive design is crucial",
      createdAt: "2023-05-20T13:00:00Z",
    },
    {
      id: 5,
      message: "Animations add life to UI",
      createdAt: "2023-05-20T14:30:00Z",
    },
    {
      id: 6,
      message: "Keep learning and growing!",
      createdAt: "2023-05-20T15:45:00Z",
    },
  ];

  // Fetch data from API
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/message`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }), // Send id along with form data
        });
        if (!res.ok) {
          throw new Error("Failed to fetch messages");
          setError("Failed to fetch messages");
          return;
          // Show toast notification for error
          toast.error("Failed to fetch messages");
        }
        const response = await res.json();
        // console.log("API Response:", response); // Log the API response

        const { data } = response;
        // Assuming the API response is wrapped in a "data" field
        // console.log("object hai ta guyxzzz:", data);
        setname(data.username);

        setCards(data.messages); // Assuming the API returns an array of messages
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [id]);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold text-center mb-8 transition-opacity animate-fadeIn">
        {name} Anonymous Messages
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((message) => (
          <motion.div
            key={message._id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            whileHover={{ scale: 1.03 }}
          >
            <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
              <p className="text-gray-800 text-lg mb-4">
                {message.message} and {message._id}
              </p>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  {formatDate(message.createdAt)}
                </p>
                <motion.button
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                  onClick={() => deleteCard(id, message._id)} // Corrected the card ID usage
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTrash className="text-xl" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CardLayout;
