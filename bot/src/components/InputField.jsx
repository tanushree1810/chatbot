import React, { useState } from 'react';

// InputField component for sending messages
const InputField = ({ onSendMessage }) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = () => {
    if (inputText.trim()) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="flex items-center space-x-6 mt-4">
      <input
        type="text"
        className="w-full p-2 border rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask me anything about cybersecurity..."
      />
      <button
        onClick={handleSubmit}
        className="w-24 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
      >
        Send
      </button>
    </div>
  );
};


export default InputField;
