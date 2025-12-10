"use client";

import { useState, useRef, useEffect } from "react";
import { chatService } from "../../services/chatService";
import {
  X,
  Send,
  Minimize2,
  Maximize2,
  User,
  Leaf,
  ShoppingCart,
  Package,
  HelpCircle,
  Truck,
  CreditCard,
  RotateCcw
} from 'lucide-react';

const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="22" y1="2" x2="11" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <polygon points="22,2 15,22 11,13 2,9 22,2" fill="currentColor"/>
  </svg>
);

const BotIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="11" width="18" height="10" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="none"/>
    <circle cx="12" cy="5" r="2" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M12 7v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <line x1="8" y1="16" x2="8" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <line x1="16" y1="16" x2="16" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const MinimizeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const LoaderIcon = () => (
  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const quickActions = {
  buyer: [
    { icon: ShoppingCart, label: 'View Cart', action: 'cart' },
    { icon: Truck, label: 'Track Order', action: 'track' },
    { icon: Leaf, label: 'Eco Products', action: 'eco' },
    { icon: HelpCircle, label: 'Get Help', action: 'help' }
  ],
  supplier: [
    { icon: Package, label: 'My Products', action: 'products' },
    { icon: Truck, label: 'Orders', action: 'orders' },
    { icon: CreditCard, label: 'Payments', action: 'payments' },
    { icon: HelpCircle, label: 'Support', action: 'support' }
  ]
};

const suggestionChips = {
  buyer: [
    "What's your most eco-friendly product?",
    "How do I track my order?",
    "Tell me about sustainability",
    "What are eco badges?"
  ],
  supplier: [
    "How do I add a new product?",
    "Show my sales analytics",
    "Pending orders status",
    "How to improve visibility?"
  ]
};

const DraggableChatModal = ({ isOpen, onClose, userType = "buyer", initialPosition = null }) => {
  const getWelcomeMessage = () => {
    if (userType === "supplier") {
      return "Hello! I'm your AveoEarth AI assistant for suppliers. I can help you manage products, track orders, analyze performance, and provide business insights. How can I assist you today?";
    }
    return "Hello! I'm your AveoEarth AI assistant. I can help you search for products, manage your cart, track orders, and much more. How can I assist you today?";
  };

  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content: getWelcomeMessage(),
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState(initialPosition || { x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState('chat');
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const modalRef = useRef(null);
  const headerRef = useRef(null);

  const theme = userType === "supplier" 
    ? { primary: "#047857", secondary: "#10b981", light: "#ecfdf5", gradient: "from-olive-700 to-olive-600" }
    : { primary: "#059669", secondary: "#10b981", light: "#ecfdf5", gradient: "from-olive-600 to-olive-500" };

  const handleMouseDown = (e) => {
    if (headerRef.current && headerRef.current.contains(e.target)) {
      setIsDragging(true);
      const rect = modalRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      
      const modalWidth = 400;
      const modalHeight = isMinimized ? 60 : 550;
      const maxX = window.innerWidth - modalWidth;
      const maxY = window.innerHeight - modalHeight;
      
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  }, [isOpen, isMinimized]);

  useEffect(() => {
    if (!sessionId) {
      const generateUUID = () => {
        if (typeof crypto !== 'undefined' && crypto.randomUUID) {
          return crypto.randomUUID();
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          const r = Math.random() * 16 | 0;
          const v = c === 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      };
      setSessionId(generateUUID());
    }
  }, []);

  useEffect(() => {
    setMessages([
      {
        id: 1,
        role: "assistant",
        content: getWelcomeMessage(),
        timestamp: new Date()
      }
    ]);
  }, [userType]);

  const handleSendMessage = async (messageText) => {
    const textToSend = messageText || inputMessage.trim();
    if (!textToSend || isLoading) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const userToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
      
      const response = await chatService.sendMessage({
        message: textToSend,
        user_token: userToken,
        session_id: sessionId,
        user_type: userType
      });

      const aiMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: response.response,
        timestamp: new Date(),
        function_calls: response.function_calls
      };

      setMessages(prev => [...prev, aiMessage]);
      
      if (response.session_id) {
        setSessionId(response.session_id);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action) => {
    const actionMessages = {
      cart: "Show me what's in my cart.",
      track: "Help me track my order.",
      eco: "Recommend eco-friendly products for me.",
      help: "I need help with something.",
      products: "Show me my product listings.",
      orders: "Show my recent orders.",
      payments: "Check my payment status.",
      support: "I need vendor support."
    };

    const msg = actionMessages[action];
    if (msg) {
      handleSendMessage(msg);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: Date.now(),
        role: "assistant",
        content: getWelcomeMessage(),
        timestamp: new Date()
      }
    ]);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isOpen) return null;

  const currentQuickActions = quickActions[userType] || quickActions.buyer;
  const currentSuggestions = suggestionChips[userType] || suggestionChips.buyer;

  return (
    <div 
      ref={modalRef}
      className="fixed bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col transition-all duration-200 overflow-hidden"
      style={{ 
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '400px',
        height: isMinimized ? '64px' : '550px',
        zIndex: 9999,
        cursor: isDragging ? 'grabbing' : 'default'
      }}
      onMouseDown={handleMouseDown}
    >
      <div 
        ref={headerRef}
        className={`flex items-center justify-between p-4 cursor-grab active:cursor-grabbing bg-gradient-to-r ${theme.gradient}`}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <video
              className="w-10 h-10 rounded-full object-cover border-2 border-white/30"
              autoPlay
              loop
              muted
              playsInline
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            >
              <source src="/AveoBuddy.webm" type="video/webm" />
            </video>
            <div className="w-10 h-10 rounded-full bg-white/20 items-center justify-center text-white hidden">
              <BotIcon />
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-olive-400 rounded-full border-2 border-white"></div>
          </div>
          <div className="text-white">
            <h3 className="text-sm font-semibold">
              AveoBuddy {userType === "supplier" ? "- Vendor" : ""}
            </h3>
            <p className="text-xs text-white/70">Online</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={clearChat}
            className="p-2 hover:bg-white/20 rounded-full transition-colors text-white"
            title="Clear chat"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-2 hover:bg-white/20 rounded-full transition-colors text-white"
            title={isMinimized ? "Maximize" : "Minimize"}
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors text-white"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div className="p-3 border-b border-gray-100 bg-gray-50">
            <div className="grid grid-cols-4 gap-2">
              {currentQuickActions.map((action) => (
                <button
                  key={action.action}
                  onClick={() => handleQuickAction(action.action)}
                  className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-white transition-colors border border-transparent hover:border-gray-200 hover:shadow-sm"
                >
                  <action.icon className="w-4 h-4 text-gray-600" />
                  <span className="text-xs text-gray-600 mt-1 text-center leading-tight">{action.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ backgroundColor: theme.light }}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                  {message.role === 'assistant' && (
                    <div className="flex items-center gap-1 mb-1">
                      <div 
                        className="w-5 h-5 rounded-full flex items-center justify-center text-white"
                        style={{ backgroundColor: theme.primary }}
                      >
                        <BotIcon />
                      </div>
                      <span className="text-xs text-gray-500">AI</span>
                    </div>
                  )}
                  <div
                    className={`rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'text-white'
                        : message.isError
                        ? 'bg-red-100 text-red-800 border border-red-200'
                        : 'bg-white text-gray-900 border border-gray-200 shadow-sm'
                    }`}
                    style={message.role === 'user' ? { backgroundColor: theme.primary } : {}}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    {message.function_calls && message.function_calls.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-gray-200">
                        <p className="text-xs text-gray-600">
                          Executed {message.function_calls.length} action(s)
                        </p>
                      </div>
                    )}
                  </div>
                  <div className={`text-xs text-gray-400 mt-1 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[85%]">
                  <div className="flex items-center gap-1 mb-1">
                    <div 
                      className="w-5 h-5 rounded-full flex items-center justify-center text-white"
                      style={{ backgroundColor: theme.primary }}
                    >
                      <BotIcon />
                    </div>
                    <span className="text-xs text-gray-500">AI</span>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                    <div className="flex items-center gap-2">
                      <LoaderIcon />
                      <span className="text-sm text-gray-600">Thinking...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {messages.length === 1 && (
            <div className="p-3 border-t border-gray-100 bg-white">
              <p className="text-xs text-gray-500 mb-2">Try asking:</p>
              <div className="flex flex-wrap gap-1">
                {currentSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(suggestion)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-gray-200 p-4 bg-white">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ '--tw-ring-color': theme.primary }}
                disabled={isLoading}
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() || isLoading}
                className={`p-2 rounded-full transition-colors ${
                  inputMessage.trim() && !isLoading
                    ? 'text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                style={inputMessage.trim() && !isLoading ? { backgroundColor: theme.primary } : {}}
              >
                {isLoading ? <LoaderIcon /> : <SendIcon />}
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
              {userType === "supplier" 
                ? "Ask about products, orders, analytics, or business insights!"
                : "Ask about products, orders, or get shopping help!"
              }
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default DraggableChatModal;
