"use client";

import { createContext, useContext, useState, useCallback } from "react";

const ChatBotContext = createContext({
  isMinimized: false,
  isChatOpen: false,
  setIsMinimized: () => {},
  setIsChatOpen: () => {},
  minimizeToNavbar: () => {},
  restoreFromNavbar: () => {},
  isAnimating: false,
  animationDirection: null,
});

export function ChatBotProvider({ children }) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState(null);

  const minimizeToNavbar = useCallback(() => {
    setAnimationDirection('minimize');
    setIsAnimating(true);
    setTimeout(() => {
      setIsMinimized(true);
      setIsChatOpen(false);
      setIsAnimating(false);
      setAnimationDirection(null);
    }, 600);
  }, []);

  const restoreFromNavbar = useCallback(() => {
    setAnimationDirection('restore');
    setIsMinimized(false);
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      setAnimationDirection(null);
    }, 600);
  }, []);

  return (
    <ChatBotContext.Provider
      value={{
        isMinimized,
        isChatOpen,
        setIsMinimized,
        setIsChatOpen,
        minimizeToNavbar,
        restoreFromNavbar,
        isAnimating,
        animationDirection,
      }}
    >
      {children}
    </ChatBotContext.Provider>
  );
}

export function useChatBot() {
  const context = useContext(ChatBotContext);
  if (!context) {
    throw new Error("useChatBot must be used within a ChatBotProvider");
  }
  return context;
}
