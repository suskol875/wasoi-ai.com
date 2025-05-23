
import React from 'react';

export const UserIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`w-6 h-6 ${className}`}
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
      clipRule="evenodd"
    />
  </svg>
);

export const AiIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`w-6 h-6 ${className}`}
    aria-hidden="true"
  >
    {/* Simple Orb/Atom like AI Icon */}
    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z" />
    <circle cx="12" cy="12" r="3" />
     <path d="M12 5a.75.75 0 01.75.75v2.5a.75.75 0 01-1.5 0V5.75A.75.75 0 0112 5z" />
    <path d="M12 15.75a.75.75 0 01.75.75v2.5a.75.75 0 01-1.5 0V16.5a.75.75 0 01.75-.75z" />
    <path d="M5.75 12a.75.75 0 000 1.5h2.5a.75.75 0 000-1.5h-2.5z" />
    <path d="M15.75 12a.75.75 0 000 1.5h2.5a.75.75 0 000-1.5h-2.5z" />
  </svg>
);

export const SendIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`w-6 h-6 ${className}`}
    aria-hidden="true"
  >
    <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
  </svg>
);

export const LoadingSpinner: React.FC<{className?: string}> = ({className}) => (
    <svg 
        className={`animate-spin ${className || 'h-5 w-5 text-accent'}`} // Default size and color to new accent
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
        role="status" 
        aria-live="polite"
        aria-label="Loading"
    >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

// For Toggling Modes (Text, Image)
export const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={`w-5 h-5 ${className}`} // Slightly smaller for a more subtle look
    aria-hidden="true"
  >
    {/* A simpler sparkles/magic wand icon */}
    <path fillRule="evenodd" d="M12.963 2.26a.75.75 0 011.074.09l.001.002 2.474 2.968a.75.75 0 01-.962 1.148l-.002-.001-2.474-2.968a.75.75 0 01-.111-1.239zM12.964 2.26a.75.75 0 00-1.074.09L9.417 5.318a.75.75 0 00.962 1.148l2.474-2.968a.75.75 0 00.111-1.239zM7.035 6.062a.75.75 0 011.074-.09l.001.002 2.474 2.968a.75.75 0 01-.962 1.148l-.002-.001-2.474-2.968a.75.75 0 01-.111-1.239zM7.036 6.062a.75.75 0 00-1.074-.09L3.488 8.94a.75.75 0 00.962 1.148l2.474-2.968a.75.75 0 00.111-1.239zM9.536 10.282a.75.75 0 01.238-.033.75.75 0 01.237.033l6.75 1.5a.75.75 0 01-.474 1.434l-6.75-1.5a.75.75 0 01-.474-1.434zM4.5 15.75a.75.75 0 01.75-.75h3a.75.75 0 010 1.5h-3a.75.75 0 01-.75-.75zm3.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3zM15 4.5a.75.75 0 01.75-.75h3a.75.75 0 010 1.5h-3A.75.75 0 0115 4.5zm3.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" clipRule="evenodd" />
    <path d="M5.573 12.157a.75.75 0 00.28.716l4.843 3.874a.75.75 0 00.96-.057l4.937-5.373a.75.75 0 00-.987-1.123L10.5 14.674l-3.94-3.152a.75.75 0 00-1.046.056l-.001.001a.75.75 0 00.058.978z" />
  </svg>
);

// FilmIcon removed as video feature is removed
