"use client";

import { useState, useEffect, useRef } from 'react';
import { chatService } from '../../services/chatService';
import { 
  MessageCircle, 
  X, 
  Send, 
  Leaf,
  ShoppingCart,
  Package,
  HelpCircle,
  Minimize2,
  Maximize2,
  User,
  Search,
  BookOpen,
  Phone,
  Truck,
  CreditCard,
  Store,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const quickActions = [
  { icon: ShoppingCart, label: 'Track Order', action: 'track', color: 'text-olive-700' },
  { icon: Package, label: 'View Cart', action: 'cart', color: 'text-olive-600' },
  { icon: Leaf, label: 'Eco Products', action: 'eco', color: 'text-olive-500' },
  { icon: HelpCircle, label: 'Get Help', action: 'help', color: 'text-olive-600' }
];

const suggestionChips = [
  "What's your most eco-friendly product?",
  "How do I calculate my carbon footprint?",
  "Tell me about your sustainability mission",
  "What are eco badges?",
  "How does the vendor program work?",
  "Show me trending products",
  "What's in my wishlist?",
  "Help me find sustainable office supplies"
];

const faqCategories = [
  {
    id: 'general',
    title: 'General',
    icon: HelpCircle,
    color: 'text-olive-700',
    questions: [
      {
        id: 'what-is-aveoearth',
        question: 'What is AveoEarth?',
        answer: 'AveoEarth is a sustainable e-commerce platform that connects eco-conscious consumers with environmentally responsible vendors. We focus on promoting sustainable products and practices.',
      },
      {
        id: 'how-to-signup',
        question: 'How do I create an account?',
        answer: 'You can create an account by clicking the "Sign Up" button in the top right corner. Choose between a customer or vendor account, then follow the simple registration process.',
      },
      {
        id: 'contact-support',
        question: 'How can I contact support?',
        answer: 'You can contact our support team through this chat, email at support@aveoearth.com, or call us at +1-800-AVEO-HELP. We typically respond within 24 hours.',
      }
    ]
  },
  {
    id: 'shopping',
    title: 'Shopping',
    icon: ShoppingCart,
    color: 'text-olive-600',
    questions: [
      {
        id: 'how-to-search',
        question: 'How do I search for products?',
        answer: 'Use the search bar at the top of the page. You can search by product name, category, or keywords. Use filters to narrow down results by price, brand, or sustainability features.',
      },
      {
        id: 'add-to-cart',
        question: 'How do I add items to my cart?',
        answer: 'Click the "Add to Cart" button on any product page. You can adjust quantities and select variants before adding. Your cart will show the total and allow you to proceed to checkout.',
      }
    ]
  },
  {
    id: 'orders',
    title: 'Orders & Shipping',
    icon: Truck,
    color: 'text-olive-600',
    questions: [
      {
        id: 'track-order',
        question: 'How do I track my order?',
        answer: 'After placing an order, you\'ll receive a tracking number via email. You can also track orders in your account dashboard under "Order History".',
      },
      {
        id: 'shipping-times',
        question: 'What are the shipping times?',
        answer: 'Standard shipping takes 3-5 business days, while express shipping takes 1-2 business days. International shipping may take 7-14 business days depending on the destination.',
      },
      {
        id: 'return-policy',
        question: 'What is your return policy?',
        answer: 'We offer a 30-day return policy for most items. Items must be in original condition with tags attached. Some items like personalized products may not be returnable.',
      }
    ]
  },
  {
    id: 'payments',
    title: 'Payments',
    icon: CreditCard,
    color: 'text-olive-700',
    questions: [
      {
        id: 'payment-methods',
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and bank transfers. All payments are processed securely.',
      },
      {
        id: 'refund-process',
        question: 'How do refunds work?',
        answer: 'Refunds are processed within 5-7 business days after we receive your returned item. The refund will be credited to your original payment method.',
      }
    ]
  },
  {
    id: 'sustainability',
    title: 'Sustainability',
    icon: Leaf,
    color: 'text-olive-500',
    questions: [
      {
        id: 'eco-badges',
        question: 'What are eco-badges?',
        answer: 'Eco-badges indicate a product\'s environmental impact. They show certifications like organic, recycled, carbon-neutral, etc. Look for these badges when shopping.',
      },
      {
        id: 'carbon-footprint',
        question: 'How do you calculate carbon footprint?',
        answer: 'We calculate carbon footprint based on product materials, manufacturing process, packaging, and shipping distance. This helps you make informed environmental choices.',
      }
    ]
  }
];

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

const BotIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="11" width="18" height="10" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="none"/>
    <circle cx="12" cy="5" r="2" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M12 7v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <line x1="8" y1="16" x2="8" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <line x1="16" y1="16" x2="16" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const LoaderIcon = () => (
  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hi! I'm AveoBuddy, your sustainable shopping companion. How can I help you make better choices today?",
      timestamp: new Date().toISOString()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAIConnected, setIsAIConnected] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState('checking');
  const [activeTab, setActiveTab] = useState('chat');
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);
  const chatRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!sessionId) {
      setSessionId(generateUUID());
    }
  }, []);

  useEffect(() => {
    const checkAIConnection = async () => {
      try {
        await chatService.checkHealth();
        setIsAIConnected(true);
        setConnectionStatus('connected');
      } catch (error) {
        setIsAIConnected(false);
        setConnectionStatus('disconnected');
      }
    };
    checkAIConnection();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = async (messageText) => {
    const textToSend = messageText || message.trim();
    if (!textToSend) return;

    const userMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      const userToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
      
      const response = await chatService.sendMessage({
        message: textToSend,
        user_token: userToken,
        session_id: sessionId
      });

      const aiMessage = {
        id: `ai_${Date.now()}`,
        role: 'assistant',
        content: response.response,
        timestamp: new Date().toISOString(),
        function_calls: response.function_calls
      };

      setMessages(prev => [...prev, aiMessage]);
      
      if (response.session_id) {
        setSessionId(response.session_id);
      }
    } catch (error) {
      console.error('AI Service Error:', error);
      
      const errorMessage = {
        id: `error_${Date.now()}`,
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again or contact support if the issue persists.',
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action) => {
    const actionMessages = {
      track: "I'd like to track my order. Can you help me?",
      cart: "Show me what's in my cart.",
      eco: "Recommend some eco-friendly products for me.",
      help: "I need help with something. What can you assist me with?"
    };

    const msg = actionMessages[action] || actionMessages.help;
    handleSendMessage(msg);
  };

  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion);
  };

  const handleFAQClick = (faq) => {
    const faqMessage = {
      id: `faq_${Date.now()}`,
      role: 'assistant',
      content: `**${faq.question}**\n\n${faq.answer}`,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, faqMessage]);
    setActiveTab('chat');
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
        id: 'welcome',
        role: 'assistant',
        content: "Hi! I'm AveoBuddy, your sustainable shopping companion. How can I help you make better choices today?",
        timestamp: new Date().toISOString()
      }
    ]);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getConnectionStatusIcon = () => {
    switch (connectionStatus) {
      case 'connected':
        return <span className="w-2 h-2 bg-olive-500 rounded-full"></span>;
      case 'disconnected':
        return <span className="w-2 h-2 bg-red-500 rounded-full"></span>;
      default:
        return <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>;
    }
  };

  const getConnectionStatusText = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'Online';
      case 'disconnected':
        return 'Offline';
      default:
        return 'Connecting...';
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50" style={{ paddingBottom: '20px', paddingRight: '20px' }}>
        <div
          onClick={() => setIsOpen(true)}
          className="w-40 h-40 cursor-pointer hover:scale-105 transition-all duration-300 flex items-center justify-center"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-contain"
            title="AveoBuddy - Your Sustainable Shopping Companion"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          >
            <source src="/AveoBuddy.mp4" type="video/mp4" />
          </video>
          <div 
            className="w-16 h-16 rounded-full bg-gradient-to-br from-olive-500 to-olive-600 items-center justify-center shadow-lg hidden"
          >
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-olive-500 rounded-full animate-pulse"></div>
      </div>
    );
  }

  return (
    <div 
      ref={chatRef} 
      className={`fixed bottom-6 right-6 z-50 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300 ${
        isMinimized ? 'h-16' : 'h-[600px]'
      }`}
    >
      <div className="bg-gradient-to-r from-olive-600 to-olive-600 p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <video
                className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                autoPlay
                loop
                muted
                playsInline
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              >
                <source src="/AveoBuddy.mp4" type="video/mp4" />
              </video>
              <div className="w-12 h-12 rounded-full bg-white/20 items-center justify-center hidden">
                <BotIcon />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1">
                {getConnectionStatusIcon()}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg">AveoBuddy</h3>
              <p className="text-xs text-olive-100 flex items-center gap-1">
                {getConnectionStatusIcon()}
                <span>{getConnectionStatusText()}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {!isMinimized && (
        <div className="flex flex-col h-[calc(100%-80px)]">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-2 text-sm font-medium transition-colors ${
                activeTab === 'chat' 
                  ? 'text-olive-600 border-b-2 border-olive-600 bg-olive-50' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Chat
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`flex-1 py-2 text-sm font-medium transition-colors ${
                activeTab === 'faq' 
                  ? 'text-olive-600 border-b-2 border-olive-600 bg-olive-50' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              FAQs
            </button>
          </div>

          {activeTab === 'chat' && (
            <>
              <div className="p-3 border-b border-gray-100">
                <div className="grid grid-cols-4 gap-2">
                  {quickActions.map((action) => (
                    <button
                      key={action.action}
                      onClick={() => handleQuickAction(action.action)}
                      className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      disabled={!isAIConnected}
                    >
                      <action.icon className={`w-5 h-5 ${action.color}`} />
                      <span className="text-xs text-gray-600 mt-1 text-center leading-tight">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex items-start space-x-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      {msg.role === 'assistant' && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-olive-500 to-olive-600 flex items-center justify-center shadow-sm flex-shrink-0">
                          <BotIcon />
                        </div>
                      )}
                      {msg.role === 'user' && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center shadow-sm flex-shrink-0">
                          <User className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <div className={`rounded-2xl px-4 py-3 shadow-sm ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                          : 'bg-white text-gray-800 border border-gray-200'
                      }`}>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                        {msg.function_calls && msg.function_calls.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {msg.function_calls.map((call, index) => (
                              <span key={index} className="inline-block text-xs bg-olive-100 text-olive-700 rounded px-2 py-1 mr-1">
                                {call.function}
                              </span>
                            ))}
                          </div>
                        )}
                        <p className="text-xs text-gray-400 mt-1">{formatTime(msg.timestamp)}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-olive-500 to-olive-600 flex items-center justify-center shadow-sm">
                        <BotIcon />
                      </div>
                      <div className="bg-white rounded-2xl px-4 py-3 border border-gray-200 shadow-sm">
                        <div className="flex items-center space-x-2">
                          <LoaderIcon />
                          <span className="text-sm text-gray-600">AveoBuddy is thinking...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {messages.length === 1 && (
                <div className="p-3 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-2">Try asking:</p>
                  <div className="flex flex-wrap gap-1">
                    {suggestionChips.slice(0, 4).map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors"
                        disabled={!isAIConnected}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex items-center space-x-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about sustainable products..."
                    className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-olive-500 focus:border-transparent"
                    disabled={!isAIConnected || isLoading}
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!message.trim() || !isAIConnected || isLoading}
                    className={`p-2 rounded-full transition-colors ${
                      message.trim() && isAIConnected && !isLoading
                        ? 'bg-olive-600 hover:bg-olive-700 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {isLoading ? <LoaderIcon /> : <Send className="w-4 h-4" />}
                  </button>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-gray-400">Press Enter to send</p>
                  <button
                    onClick={clearChat}
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >
                    Clear Chat
                  </button>
                </div>
              </div>
            </>
          )}

          {activeTab === 'faq' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {faqCategories.map((category) => (
                <div key={category.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="flex items-center gap-2 p-3 bg-gray-50 border-b border-gray-200">
                    <category.icon className={`w-5 h-5 ${category.color}`} />
                    <h3 className="font-medium text-gray-800">{category.title}</h3>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {category.questions.map((faq) => (
                      <button
                        key={faq.id}
                        onClick={() => handleFAQClick(faq)}
                        className="w-full text-left p-3 hover:bg-gray-50 transition-colors"
                      >
                        <p className="text-sm text-gray-700">{faq.question}</p>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatBot;
