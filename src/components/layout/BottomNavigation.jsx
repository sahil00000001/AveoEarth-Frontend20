"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function BottomNavigation() {
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const navItems = [
    {
      href: "/explore?category=home-living",
      label: "Home & Living",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      gradient: "from-emerald-400 via-teal-500 to-cyan-500",
      glowColor: "rgba(16, 185, 129, 0.5)",
      bgGlow: "shadow-emerald-500/40"
    },
    {
      href: "/explore?category=fashion",
      label: "Fashion",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.5 6.5L3 3m0 0l3.5 3.5M3 3l3.5-3.5M17.5 6.5L21 3m0 0l-3.5 3.5M21 3l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 3v4m0 0a4 4 0 00-4 4v10h8V11a4 4 0 00-4-4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      gradient: "from-orange-400 via-amber-500 to-yellow-500",
      glowColor: "rgba(251, 146, 60, 0.5)",
      bgGlow: "shadow-orange-500/40"
    },
    {
      href: "/explore?category=upcycled",
      label: "Upcycled",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      gradient: "from-violet-400 via-purple-500 to-fuchsia-500",
      glowColor: "rgba(139, 92, 246, 0.5)",
      bgGlow: "shadow-purple-500/40"
    },
    {
      href: "/explore?category=beauty-personal-care",
      label: "Beauty",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      gradient: "from-pink-400 via-rose-500 to-red-500",
      glowColor: "rgba(236, 72, 153, 0.5)",
      bgGlow: "shadow-pink-500/40"
    },
    {
      href: "/explore?category=pets",
      label: "Pets",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="6" cy="7" r="2.5" stroke="currentColor" strokeWidth="2"/>
          <circle cx="18" cy="7" r="2.5" stroke="currentColor" strokeWidth="2"/>
          <circle cx="10" cy="4" r="2" stroke="currentColor" strokeWidth="2"/>
          <circle cx="14" cy="4" r="2" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 22c-4 0-7-3-7-7 0-2 1-4 3-5s4-1 4-1 2 0 4 1 3 3 3 5c0 4-3 7-7 7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      gradient: "from-amber-400 via-yellow-500 to-orange-400",
      glowColor: "rgba(245, 158, 11, 0.5)",
      bgGlow: "shadow-amber-500/40"
    },
    {
      href: "/explore?category=fitness",
      label: "Fitness",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.5 6.5l11 11M6.5 17.5l11-11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M4 8h2v8H4zM18 8h2v8h-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 10h2v4H2zM20 10h2v4h-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      gradient: "from-green-400 via-emerald-500 to-teal-500",
      glowColor: "rgba(34, 197, 94, 0.5)",
      bgGlow: "shadow-green-500/40"
    }
  ];

  const getIsActive = (href) => {
    if (href.includes('category=')) {
      const category = href.split('category=')[1];
      return pathname.includes('explore') && (
        pathname.includes(category) || 
        (typeof window !== 'undefined' && (new URLSearchParams(window?.location?.search || '')).get('category') === category)
      );
    }
    return pathname === href;
  };

  return (
    <>
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotateX(0deg); }
          50% { transform: translateY(-8px) rotateX(5deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px var(--glow-color), 0 0 40px var(--glow-color); }
          50% { box-shadow: 0 0 30px var(--glow-color), 0 0 60px var(--glow-color); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes bounce-in {
          0% { transform: scale(0.3) rotateY(-180deg); opacity: 0; }
          50% { transform: scale(1.05) rotateY(-10deg); }
          70% { transform: scale(0.95) rotateY(5deg); }
          100% { transform: scale(1) rotateY(0deg); opacity: 1; }
        }
        @keyframes icon-spin {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .nav-card-3d {
          transform: rotateX(0deg) rotateY(0deg) translateZ(0px);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .nav-card-3d:hover {
          transform: rotateX(-10deg) rotateY(5deg) translateZ(20px) scale(1.08);
        }
        .icon-3d-rotate:hover {
          animation: icon-spin 0.6s ease-in-out;
        }
        .shimmer-bg {
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
        .gradient-animate {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }
      `}</style>
      
      <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none pb-3 px-2">
        <div className="flex justify-center">
          <div className="pointer-events-auto perspective-1000">
            <div className="relative bg-white/80 backdrop-blur-2xl border border-white/40 rounded-2xl p-2 shadow-xl shadow-gray-900/15">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-transparent to-teal-500/10 opacity-60" />
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 shimmer-bg opacity-30" />
              </div>
              
              <div className="relative flex items-center gap-1.5 sm:gap-2">
                {navItems.map((item, index) => {
                  const isActive = getIsActive(item.href);
                  const isHovered = hoveredIndex === index;
                  
                  return (
                    <Link
                      key={index}
                      href={item.href}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className="relative group perspective-1000"
                      style={{ '--glow-color': item.glowColor }}
                    >
                      <div 
                        className={`
                          nav-card-3d preserve-3d relative flex flex-col items-center justify-center 
                          px-2 py-1.5 sm:px-2.5 sm:py-2 rounded-xl
                          transition-all duration-300 ease-out cursor-pointer
                          ${isActive 
                            ? `bg-gradient-to-br ${item.gradient} shadow-lg ${item.bgGlow}` 
                            : 'bg-white/60 hover:bg-white/90 shadow-md hover:shadow-lg'
                          }
                        `}
                      >
                        <div 
                          className={`
                            relative w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg
                            transition-all duration-300 preserve-3d
                            ${isActive 
                              ? 'text-white' 
                              : `bg-gradient-to-br ${item.gradient} gradient-animate text-white shadow-md ${item.bgGlow}`
                            }
                            ${isHovered && !isActive ? 'icon-3d-rotate scale-110' : ''}
                          `}
                          style={isHovered && !isActive ? { animation: 'float 2s ease-in-out infinite' } : {}}
                        >
                          {isActive && (
                            <div 
                              className="absolute inset-0 rounded-xl opacity-60"
                              style={{ animation: 'pulse-glow 2s ease-in-out infinite', '--glow-color': item.glowColor }}
                            />
                          )}
                          
                          <div className="absolute inset-0 rounded-xl overflow-hidden opacity-40">
                            <div className="absolute inset-0 shimmer-bg" />
                          </div>
                          
                          <div className="relative z-10 transition-transform duration-300">
                            {item.icon}
                          </div>
                          
                          {isActive && (
                            <>
                              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-white rounded-full shadow-md flex items-center justify-center">
                                <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${item.gradient}`} />
                              </div>
                              <div className="absolute inset-0 rounded-lg border border-white/30" />
                            </>
                          )}
                        </div>
                        
                        <span 
                          className={`
                            mt-1 text-[8px] sm:text-[9px] font-medium text-center transition-all duration-300
                            ${isActive 
                              ? 'text-white drop-shadow-sm' 
                              : 'text-gray-600 group-hover:text-gray-800'
                            }
                          `}
                        >
                          {item.label}
                        </span>

                        {isHovered && !isActive && (
                          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
                        )}

                        {isActive && (
                          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full bg-white/80 shadow-md" />
                        )}
                      </div>

                      {isHovered && !isActive && (
                        <div 
                          className={`
                            absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-2 rounded-full blur-sm opacity-50
                            bg-gradient-to-r ${item.gradient}
                          `}
                        />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
