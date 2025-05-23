
export enum MessageSender {
  USER = 'user',
  AI = 'ai',
  SYSTEM = 'system',
}

export enum ChatMode {
  TEXT = 'text',
  IMAGE = 'image',
  // VIDEO mode removed
}

export interface ChatMessageContent {
  id: string;
  text: string;
  sender: MessageSender;
  timestamp: Date;
  avatar?: React.ReactNode;
  imageUrls?: string[]; // Array of base64 image data URLs for images
  isProcessingImages?: boolean; // To show a loader for images
  // Video specific properties removed
}