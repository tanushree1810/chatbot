import React from 'react';

const MessageBubble = ({ text, fromBot }) => {
  // Split the response based on numbered list (e.g., "1.", "2.", etc.)
  const formattedText = text.split(/\d+\.\s+/).map((item, idx) => {
    // Replace **bold text** with <strong>bold text</strong>
    const boldText = item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Return formatted text as a list item (if not empty)
    return item.trim() ? (
      <li key={idx} dangerouslySetInnerHTML={{ __html: boldText }} />
    ) : null;
  });

  return (
    <div
      className={`p-3 max-w-xs rounded-lg shadow-md ${
        fromBot
          ? 'bg-blue-500 text-white self-start'
          : 'bg-gray-300 text-black self-end'
      }`}
    >
      <ul className="list-decimal pl-4 space-y-2">
        {formattedText}
      </ul>
    </div>
  );
};

export default MessageBubble;
