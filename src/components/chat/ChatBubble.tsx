import React from 'react';
import './ChatBubble.css';

type ChatBubbleProps = {
  message: string;
  type: 'left' | 'right';
  username: string;
};

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, type, username }) => {
  const bubbleClass = `chat-bubble ${type}`;

  return (
    <div className={bubbleClass}>
      <p>{message}</p>
      <div className="username">by: {username}</div>
    </div>
  );
};

export default ChatBubble;