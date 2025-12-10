"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import DraggableChatModal from "./DraggableChatModal";
import { auth, tokens } from "../../lib/api";
import { MessageCircle, X } from 'lucide-react';
import { useChatBot } from "../../context/ChatBotContext";

const FloatingChatBot = () => {
  const { 
    isMinimized, 
    isChatOpen, 
    setIsChatOpen, 
    minimizeToNavbar, 
    isAnimating,
    animationDirection
  } = useChatBot();
  
  const [userType, setUserType] = useState("buyer");
  const [isClient, setIsClient] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(false);
  const videoRef = useRef(null);
  const pathname = usePathname();

  const isVendorDashboard = pathname?.startsWith('/vendor');

  const [modalPosition, setModalPosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    setIsClient(true);
    
    const calculateModalPosition = () => {
      if (typeof window === 'undefined') return { x: 50, y: 50 };
      
      const modalWidth = 400;
      const modalHeight = 550;
      const marginRight = 24;
      const marginBottom = 240;
      
      const x = window.innerWidth - modalWidth - marginRight;
      const y = window.innerHeight - modalHeight - marginBottom;
      
      return {
        x: Math.max(24, x),
        y: Math.max(24, y)
      };
    };
    
    setModalPosition(calculateModalPosition());
    const userTokens = tokens.get();
    const loggedIn = !!userTokens?.access_token;
    
    if (loggedIn && userTokens?.access_token) {
      auth.getProfile(userTokens.access_token)
        .then(profile => {
          if (profile?.user_type === 'supplier') {
            setUserType('supplier');
          } else {
            setUserType('buyer');
          }
        })
        .catch(error => {
          console.error('Failed to fetch user profile:', error);
          setUserType('buyer');
        });
    }
  }, []);

  const handleCloseClick = (e) => {
    e.stopPropagation();
    minimizeToNavbar();
  };

  const handleBuddyClick = () => {
    if (!isAnimating && !isMinimized) {
      setIsChatOpen(!isChatOpen);
    }
  };

  if (!isClient) return null;

  const getAnimationProps = () => {
    if (animationDirection === 'minimize') {
      return {
        initial: { opacity: 1, scale: 1, x: 0, y: 0, rotateY: 0 },
        animate: { 
          opacity: 0, 
          scale: 0.1, 
          y: typeof window !== 'undefined' ? -window.innerHeight + 100 : -600,
          x: typeof window !== 'undefined' ? window.innerWidth - 200 : 1000,
          rotateY: 720,
        },
        exit: { opacity: 0 },
        transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
      };
    } else if (animationDirection === 'restore') {
      return {
        initial: { 
          opacity: 0, 
          scale: 0.1, 
          y: typeof window !== 'undefined' ? -window.innerHeight + 100 : -600,
          x: typeof window !== 'undefined' ? window.innerWidth - 200 : 1000,
          rotateY: -720 
        },
        animate: { 
          opacity: isChatOpen ? 0 : 1, 
          scale: isHovered ? 1.05 : 1,
          y: 0,
          x: 0,
          rotateY: 0,
        },
        exit: { opacity: 0, scale: 0.5 },
        transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
      };
    } else {
      return {
        initial: { opacity: 0, scale: 0.5, y: 50 },
        animate: { 
          opacity: isChatOpen ? 0 : 1, 
          scale: isHovered ? 1.05 : 1,
          y: 0,
          x: 0,
          rotateY: 0,
        },
        exit: { 
          opacity: 0, 
          scale: 0.1, 
          y: typeof window !== 'undefined' ? -window.innerHeight + 100 : -600,
          x: typeof window !== 'undefined' ? window.innerWidth - 200 : 1000,
          rotateY: 720,
        },
        transition: { duration: 0.3, ease: "easeOut" }
      };
    }
  };

  const animProps = getAnimationProps();

  return (
    <>
      <AnimatePresence mode="wait">
        {!isMinimized && (
          <motion.div
            key="floating-chatbot"
            initial={animProps.initial}
            animate={animProps.animate}
            exit={animProps.exit}
            transition={animProps.transition}
            onClick={handleBuddyClick}
            onMouseEnter={() => {
              setIsHovered(true);
              setShowCloseButton(true);
            }}
            onMouseLeave={() => {
              setIsHovered(false);
              setShowCloseButton(false);
            }}
            className="fixed z-50 flex items-center justify-center group cursor-pointer"
            title="Chat with AveoBuddy"
            style={{ 
              bottom: '24px',
              right: '24px',
              width: '200px',
              height: '200px',
              pointerEvents: isChatOpen ? 'none' : 'auto',
              perspective: '1000px',
              transformStyle: 'preserve-3d',
            }}
          >
            {!videoError ? (
              <video
                ref={videoRef}
                src="/AveoBuddy.webm"
                width={200}
                height={200}
                autoPlay
                loop
                muted
                playsInline
                onError={() => {
                  console.error('Failed to load AveoBuddy.webm');
                  setVideoError(true);
                }}
                className="w-full h-full object-contain"
                style={{ 
                  border: 'none', 
                  background: 'transparent',
                  backgroundColor: 'transparent',
                  outline: 'none',
                  display: 'block'
                }}
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
            )}
            
            <motion.div 
              className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            
            <AnimatePresence>
              {showCloseButton && !isChatOpen && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  onClick={handleCloseClick}
                  className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all z-10"
                  style={{
                    boxShadow: "0 2px 10px rgba(239, 68, 68, 0.4)"
                  }}
                >
                  <X className="w-4 h-4 text-white" strokeWidth={2.5} />
                </motion.button>
              )}
            </AnimatePresence>

            {isHovered && !isChatOpen && !showCloseButton && (
              <motion.div 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap shadow-lg"
              >
                Chat with AveoBuddy
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <DraggableChatModal 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)}
        userType={isVendorDashboard ? "supplier" : userType}
        initialPosition={modalPosition}
      />
    </>
  );
};

export default FloatingChatBot;
