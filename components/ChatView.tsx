
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChatMessageContent, MessageSender, ChatMode } from '../types';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import GeminiService from '../services/geminiService';
import { Chat, GenerateContentResponse } from '@google/genai';

const ChatView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageContent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const [chatMode, setChatMode] = useState<ChatMode>(ChatMode.TEXT);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const geminiServiceRef = useRef<GeminiService | null>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      const errorMsg = "API_KEY is not configured. Please set the API_KEY environment variable.";
      console.error(errorMsg);
      setError(errorMsg);
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        text: errorMsg, 
        sender: MessageSender.SYSTEM, 
        timestamp: new Date() 
      }]);
      return;
    }

    try {
      geminiServiceRef.current = new GeminiService(apiKey);
      const session = geminiServiceRef.current.startChat(
        "You are 'Wasoi AI', a friendly and helpful AI assistant. Keep text responses concise. You can also generate images if requested."
      );
      setChatSession(session);
      setMessages([{ 
        id: 'initial-greeting', 
        text: "Hello! I'm Wasoi AI. Ask me anything, or switch modes to generate images!", 
        sender: MessageSender.AI, 
        timestamp: new Date() 
      }]);
    } catch (e: any) {
      console.error("Failed to initialize Gemini Service:", e);
      const errorMsg = e.message || "Failed to initialize AI service.";
      setError(errorMsg);
       setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        text: `Initialization Error: ${errorMsg}`, 
        sender: MessageSender.SYSTEM, 
        timestamp: new Date() 
      }]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleSendMessage = async (text: string, mode: ChatMode) => {
    if (!text.trim() || isLoading) return;
    if (mode === ChatMode.TEXT && !chatSession && !error) {
      setError("Text chat session is not active. Please wait or refresh.");
      return;
    }
    if (!geminiServiceRef.current && !error) {
      setError("AI Service is not available. Please wait or refresh.");
      return;
    }

    const newUserMessage: ChatMessageContent = {
      id: Date.now().toString(),
      text,
      sender: MessageSender.USER,
      timestamp: new Date(),
    };
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setIsLoading(true);
    setError(null);

    const aiMessageId = (Date.now() + 1).toString(); 

    if (mode === ChatMode.TEXT && chatSession && geminiServiceRef.current) {
      setMessages(prevMessages => [
        ...prevMessages,
        { id: aiMessageId, text: '', sender: MessageSender.AI, timestamp: new Date() },
      ]);

      try {
        const stream: AsyncIterable<GenerateContentResponse> = await geminiServiceRef.current.sendMessageStream(chatSession, text);
        let currentAiText = '';
        for await (const chunk of stream) {
          currentAiText += chunk.text;
          setMessages(prevMessages =>
            prevMessages.map(msg =>
              msg.id === aiMessageId ? { ...msg, text: currentAiText.trimStart() } : msg
            )
          );
        }
        // Ensure final text is set
        setMessages(prevMessages =>
            prevMessages.map(msg =>
              msg.id === aiMessageId ? { ...msg, text: currentAiText } : msg
            )
          );
      } catch (e: any) {
        console.error("Error sending text message to Gemini:", e);
        const errorText = e.message || "Sorry, I encountered an issue with your request.";
        setError(errorText);
        setMessages(prevMessages =>
          prevMessages.map(msg =>
            msg.id === aiMessageId ? { ...msg, text: `Error: ${errorText}`, sender: MessageSender.SYSTEM } : msg
          ).filter(msg => !(msg.id === aiMessageId && msg.text === '')) 
        );
      }
    } else if (mode === ChatMode.IMAGE && geminiServiceRef.current) {
      setMessages(prevMessages => [
        ...prevMessages,
        { 
          id: aiMessageId, 
          text: "Generating your image...", 
          sender: MessageSender.AI, 
          timestamp: new Date(),
          isProcessingImages: true,
        },
      ]);
      try {
        const imageUrls = await geminiServiceRef.current.generateImagesFromPrompt(text, 1);
        setMessages(prevMessages =>
          prevMessages.map(msg =>
            msg.id === aiMessageId 
            ? { 
                ...msg, 
                text: `Here's the image for: "${text}"`, 
                imageUrls: imageUrls,
                isProcessingImages: false,
              } 
            : msg
          )
        );
      } catch (e:any) {
        console.error("Error generating image:", e);
        const errorText = e.message || "Failed to generate the image.";
        setError(`Image Generation Error: ${errorText}`);
        setMessages(prevMessages =>
          prevMessages.map(msg =>
            msg.id === aiMessageId 
            ? { 
                ...msg, 
                text: `Image Error: ${errorText}`, 
                sender: MessageSender.SYSTEM,
                isProcessingImages: false,
              } 
            : msg
          )
        );
      }
    }
    // Video mode handling removed
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col flex-grow h-full max-h-[calc(100vh-65px-70px)] overflow-hidden"> {/* Adjusted max-h slightly */}
       {error && (
          <div role="alert" aria-live="assertive" className="bg-error-bg text-error-text p-3 text-center text-sm animate-fadeIn shadow-md">
            {error}
          </div>
        )}
      <div className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-border-color scrollbar-track-input-bg">
        {messages.map(msg => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        <div ref={messagesEndRef} style={{ height: '1px' }} />
      </div>
      <ChatInput 
        onSendMessage={handleSendMessage} 
        isLoading={isLoading}
        currentMode={chatMode}
        onModeChange={setChatMode} 
      />
    </div>
  );
};

export default ChatView;