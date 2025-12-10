"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import DraggableChatModal from "./DraggableChatModal";
import { auth, tokens } from "../../lib/api";
import { MessageCircle } from 'lucide-react';

const FloatingChatBot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [userType, setUserType] = useState("buyer");
  const [isClient, setIsClient] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
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

  if (!isClient) return null;

  return (
    <>
      <div
        onClick={() => setIsChatOpen(!isChatOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed z-50 flex items-center justify-center group cursor-pointer transition-all duration-300 ${
          isHovered ? 'scale-105' : 'scale-100'
        }`}
        title="Chat with AveoBuddy"
        style={{ 
          bottom: '24px',
          right: '24px',
          width: isChatOpen ? '0' : '200px',
          height: isChatOpen ? '0' : '200px',
          opacity: isChatOpen ? 0 : 1,
          pointerEvents: isChatOpen ? 'none' : 'auto',
          border: 'none', 
          padding: 0, 
          background: 'transparent',
          backgroundColor: 'transparent',
          outline: 'none',
          boxShadow: 'none'
        }}
      >
        {!videoError ? (
          <video
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
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full opacity-80 animate-pulse"></div>
        
        {isHovered && !isChatOpen && (
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap shadow-lg">
            Chat with AveoBuddy
          </div>
        )}
      </div>

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
