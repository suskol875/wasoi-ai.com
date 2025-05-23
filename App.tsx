
import React from 'react';
import ChatView from './components/ChatView';

const App: React.FC = () => {
  return (
    <div className="h-screen w-screen flex flex-col bg-ai-bg text-text-primary">
      <header className="bg-input-bg p-4 shadow-md border-b border-border-color">
        <h1 className="text-xl font-semibold text-center text-text-primary tracking-wide">
          Wasoi AI
        </h1>
      </header>
      <ChatView />
    </div>
  );
};

export default App;