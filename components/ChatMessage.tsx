
import React from 'react';
import { ChatMessageContent, MessageSender } from '../types';
import { UserIcon, AiIcon, LoadingSpinner } from './icons';

interface ChatMessageProps {
  message: ChatMessageContent;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === MessageSender.USER;
  const isSystem = message.sender === MessageSender.SYSTEM;

  const alignmentClass = isUser ? 'items-end' : 'items-start';
  
  const bubbleColorClass = isUser
    ? 'bg-user-message-bg text-text-primary'
    : isSystem 
    ? 'bg-transparent text-text-secondary text-sm italic'
    : 'bg-ai-message-bg text-text-primary';
  
  const avatarColor = isUser ? "text-text-primary" : (isSystem ? "" : "text-text-primary");
  // More subdued avatar backgrounds
  const avatarBg = isUser ? 'bg-input-bg' : (isSystem ? '' : 'bg-input-bg'); 

  const avatar = isUser ? <UserIcon className={avatarColor} /> : (isSystem ? null : <AiIcon className={avatarColor} />);
  const messageOrderClass = isUser ? 'flex-row-reverse' : 'flex-row';

  if (isSystem) {
    return (
      <div className={`w-full flex justify-center my-2 animate-fadeIn`}>
        <p className={`${bubbleColorClass} py-1 px-3 rounded-lg max-w-full text-center`}>
          {message.text}
           {message.isProcessingImages && ( // Only image processing spinner
            <LoadingSpinner className="w-4 h-4 inline-block ml-2 text-accent" />
          )}
        </p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${alignmentClass} w-full my-2 animate-slideInUp`}>
      <div className={`flex ${messageOrderClass} items-end space-x-2 rtl:space-x-reverse max-w-[85%] sm:max-w-[75%]`}>
        {avatar && (
          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${avatarBg} mb-1 shadow-sm`}>
            {React.cloneElement(avatar, { className: `${avatarColor} w-5 h-5`})}
          </div>
        )}
        <div
          className={`py-2 px-4 rounded-lg ${bubbleColorClass} shadow-sm`} // Removed hover scale, simpler shadow
        >
          <p className="whitespace-pre-wrap break-words">{message.text}</p>
          
          {message.isProcessingImages && (
            <div className="flex items-center justify-center mt-2">
              <LoadingSpinner className="w-5 h-5 text-accent" />
              <span className="ml-2 text-sm text-text-secondary">
                Generating vision...
              </span>
            </div>
          )}

          {message.imageUrls && message.imageUrls.length > 0 && (
            <div className="mt-3 space-y-2">
              {/* Video concept specific text removed */}
              {message.imageUrls.map((url, index) => (
                <img 
                  key={index} 
                  src={url} 
                  alt={`Generated image ${index + 1}`}
                  className="rounded-md max-w-full h-auto border border-border-color shadow-sm" 
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;