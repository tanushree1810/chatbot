import React, { useState } from 'react';
import chatbot from '../assets/chatbot-image.png';
import MessageBubble from '../components/MessageBubble.jsx';
import InputField from '../components/InputField.jsx';

const ChatbotPage = () => {
  const [messages, setMessages] = useState([]);
  
  // Access the environment variables using Vite's import.meta.env
  const API_URL = import.meta.env.VITE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  const handleSendMessage = async (message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, fromBot: false },
    ]);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: message }),
      });

      const data = await response.json();

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: data.response, fromBot: true },
      ]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Oops! Something went wrong. Please try again.', fromBot: true },
      ]);
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 h-screen">
      {/* Heading */}
      <span
        className="text-3xl font-bold text-center mb-8 cursor-pointer hover:text-blue-500"
        onClick={() => alert("Chatbot is ready to assist you!")}
      >
        Meet Your Personal Chatbot
      </span>

      {/* Interesting Paragraph */}
      <p className="text-lg text-center mb-12 max-w-2xl">
        Our chatbot is here to assist you with everything! From answering your questions to providing
        helpful insights, it can communicate seamlessly, understand your needs, and offer prompt responses.
        Let's make your experience more interactive and enjoyable with a simple chat!
      </p>

      {/* Chatbot Section */}
      <div className="flex items-center justify-center space-x-12">
        {/* Chatbot Section */}
        <div className="w-96 h-[400px] bg-gray-100 p-4 rounded-lg shadow-lg flex flex-col">
          {/* Chat Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto p-4 border rounded-lg mb-4">
            {messages.map((msg, idx) => (
              <MessageBubble key={idx} text={msg.text} fromBot={msg.fromBot} />
            ))}
          </div>

          {/* Input and Voice Controls */}
          <div className="flex items-center space-x-2">
            <InputField onSendMessage={handleSendMessage} />

          </div>
        </div>

        {/* Image Section */}
        <div className="w-80 h-[550px] flex items-center justify-center">
          <img
            src={chatbot}
            alt="Chatbot Illustration"
            className="max-h-full object-contain rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
