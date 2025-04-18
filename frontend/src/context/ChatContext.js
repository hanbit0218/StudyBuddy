import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context
const ChatContext = createContext();

/**
 * ChatProvider component for managing global chat-related state
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export function ChatProvider({ children }) {
  // State for chat sessions
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load saved chat history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('studyBuddy_chatHistory');
    
    if (savedHistory) {
      try {
        setChatHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Error parsing saved chat history:', error);
      }
    } else {
      // Initialize with welcome message if no history exists
      setChatHistory([{
        id: Date.now().toString(),
        text: "Hi there! I'm your StudyBuddy AI assistant. How can I help you with your studies today?",
        sender: 'bot',
        timestamp: new Date().toISOString()
      }]);
    }
  }, []);

  // Save chat history to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('studyBuddy_chatHistory', JSON.stringify(chatHistory));
  }, [chatHistory]);

  // Add a user message to chat history
  const addUserMessage = (text) => {
    const message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    
    setChatHistory(prev => [...prev, message]);
    return message;
  };

  // Add a bot message to chat history
  const addBotMessage = (text) => {
    const message = {
      id: Date.now().toString(),
      text,
      sender: 'bot',
      timestamp: new Date().toISOString()
    };
    
    setChatHistory(prev => [...prev, message]);
    return message;
  };

  // Clear chat history
  const clearChatHistory = () => {
    // Keep only the welcome message
    setChatHistory([{
      id: Date.now().toString(),
      text: "Hi there! I'm your StudyBuddy AI assistant. How can I help you with your studies today?",
      sender: 'bot',
      timestamp: new Date().toISOString()
    }]);
  };

  // Context value
  const value = {
    chatHistory,
    isLoading,
    setIsLoading,
    addUserMessage,
    addBotMessage,
    clearChatHistory
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}

// Custom hook for using chat context
export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}