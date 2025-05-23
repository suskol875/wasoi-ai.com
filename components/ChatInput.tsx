
import React, { useState, KeyboardEvent, useRef, useEffect } from 'react';
import { SendIcon, LoadingSpinner, SparklesIcon } from './icons';
import { ChatMode } from '../types';

interface ChatInputProps {
  onSendMessage: (message: string, mode: ChatMode) => void;
  isLoading: boolean;
  currentMode: ChatMode;
  onModeChange: (mode: ChatMode) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading, currentMode, onModeChange }) => {
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
    adjustTextareaHeight();
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.min(scrollHeight, 120)}px`; // Max height 120px
    }
  };
  
  useEffect(() => {
    adjustTextareaHeight();
  }, [inputValue]);

  const handleSend = () => {
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue.trim(), currentMode);
      setInputValue('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'; // Reset height after send
      }
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const toggleMode = () => {
    if (currentMode === ChatMode.TEXT) {
      onModeChange(ChatMode.IMAGE);
    } else { // Was IMAGE, switch back to TEXT
      onModeChange(ChatMode.TEXT);
    }
  };

  let placeholderText = "Send a message...";
  let modeButtonAriaLabel = "Switch to Image Generation Mode";
  let sendButtonAriaLabel = "Send message";

  if (currentMode === ChatMode.IMAGE) {
    placeholderText = "Describe an image to generate...";
    modeButtonAriaLabel = "Switch to Text Chat Mode";
    sendButtonAriaLabel = "Generate Image";
  }
  // Video mode logic removed

  return (
    <div className="p-3 sm:p-4 bg-input-bg border-t border-border-color shadow-inner">
      <div className="flex items-end space-x-2 sm:space-x-3">
        <button
          onClick={toggleMode}
          aria-label={modeButtonAriaLabel}
          className={`p-2 rounded-md transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-75 ${
            currentMode === ChatMode.IMAGE
              ? 'bg-accent text-white hover:bg-teal-700 focus:ring-accent' 
              : 'bg-ai-bg text-text-secondary hover:bg-border-color focus:ring-accent'
          }`}
        >
          <SparklesIcon className="w-5 h-5" />
        </button>
        <textarea
          ref={textareaRef}
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder={placeholderText}
          className="flex-grow p-2.5 bg-ai-bg border border-border-color rounded-md resize-none focus:ring-2 focus:ring-accent focus:border-transparent outline-none text-text-primary scrollbar-thin scrollbar-thumb-border-color scrollbar-track-input-bg"
          rows={1}
          style={{ overflowY: 'auto' }} 
          disabled={isLoading}
          aria-label={placeholderText}
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !inputValue.trim()}
          aria-label={isLoading ? "Processing..." : sendButtonAriaLabel}
          className="p-2.5 bg-accent text-white rounded-md disabled:opacity-60 disabled:cursor-not-allowed hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-75"
        >
          {isLoading ? <LoadingSpinner className="w-5 h-5 text-white" /> : <SendIcon className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
};

export default ChatInput;