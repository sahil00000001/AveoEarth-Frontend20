"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Marquee = dynamic(() => import("react-fast-marquee"), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-16 bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-700">
      <span className="text-white/80 text-xs">Loading artisan scenes...</span>
    </div>
  )
});

const PotterScene = ({ animate }) => (
  <svg viewBox="0 0 100 80" className="w-20 h-16">
    <defs>
      <linearGradient id="clayGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#CD853F"/>
        <stop offset="100%" stopColor="#8B4513"/>
      </linearGradient>
      <linearGradient id="wheelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#666"/>
        <stop offset="100%" stopColor="#333"/>
      </linearGradient>
    </defs>
    <ellipse cx="50" cy="65" rx="25" ry="8" fill="url(#wheelGrad)">
      {animate && <animateTransform attributeName="transform" type="rotate" from="0 50 65" to="360 50 65" dur="2s" repeatCount="indefinite"/>}
    </ellipse>
    <ellipse cx="50" cy="62" rx="22" ry="6" fill="#555"/>
    <path d="M40 55 Q40 40 50 35 Q60 40 60 55" fill="url(#clayGrad)">
      {animate && (
        <>
          <animate attributeName="d" values="M40 55 Q40 40 50 35 Q60 40 60 55;M38 55 Q38 38 50 32 Q62 38 62 55;M40 55 Q40 40 50 35 Q60 40 60 55" dur="1.5s" repeatCount="indefinite"/>
        </>
      )}
    </path>
    <g fill="#FFDAB9">
      <ellipse cx="30" cy="42" rx="6" ry="4">
        {animate && <animate attributeName="cx" values="30;35;30" dur="1.5s" repeatCount="indefinite"/>}
      </ellipse>
      <ellipse cx="70" cy="42" rx="6" ry="4">
        {animate && <animate attributeName="cx" values="70;65;70" dur="1.5s" repeatCount="indefinite"/>}
      </ellipse>
      <rect x="28" y="38" width="4" height="8" rx="2">
        {animate && <animate attributeName="x" values="28;33;28" dur="1.5s" repeatCount="indefinite"/>}
      </rect>
      <rect x="68" y="38" width="4" height="8" rx="2">
        {animate && <animate attributeName="x" values="68;63;68" dur="1.5s" repeatCount="indefinite"/>}
      </rect>
    </g>
    <text x="50" y="78" textAnchor="middle" fill="white" fontSize="6" fontWeight="500" opacity="0.9">Potter</text>
  </svg>
);

const BlacksmithScene = ({ animate }) => (
  <svg viewBox="0 0 100 80" className="w-20 h-16">
    <defs>
      <linearGradient id="anvilGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#4a4a4a"/>
        <stop offset="100%" stopColor="#2a2a2a"/>
      </linearGradient>
      <linearGradient id="fireGrad" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#FF4500"/>
        <stop offset="50%" stopColor="#FF8C00"/>
        <stop offset="100%" stopColor="#FFD700"/>
      </linearGradient>
    </defs>
    <rect x="35" y="50" width="30" height="10" fill="url(#anvilGrad)" rx="1"/>
    <rect x="40" y="45" width="20" height="8" fill="#3a3a3a" rx="1"/>
    <rect x="30" y="58" width="10" height="12" fill="#2a2a2a"/>
    <rect x="60" y="58" width="10" height="12" fill="#2a2a2a"/>
    <rect x="45" y="42" width="10" height="6" fill="#FF6347">
      {animate && <animate attributeName="fill" values="#FF6347;#FF4500;#FF6347" dur="0.5s" repeatCount="indefinite"/>}
    </rect>
    <g>
      {animate && <animateTransform attributeName="transform" type="rotate" values="0 70 25;-45 70 25;0 70 25" dur="0.6s" repeatCount="indefinite"/>}
      <rect x="65" y="20" width="8" height="25" fill="#8B4513" rx="1"/>
      <rect x="63" y="15" width="12" height="8" fill="#555" rx="1"/>
    </g>
    <ellipse cx="20" cy="55" rx="12" ry="10" fill="#333"/>
    <ellipse cx="20" cy="50" rx="10" ry="8" fill="url(#fireGrad)">
      {animate && (
        <>
          <animate attributeName="ry" values="8;10;8" dur="0.3s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="1;0.8;1" dur="0.2s" repeatCount="indefinite"/>
        </>
      )}
    </ellipse>
    <text x="50" y="78" textAnchor="middle" fill="white" fontSize="6" fontWeight="500" opacity="0.9">Blacksmith</text>
  </svg>
);

const WeaverScene = ({ animate }) => (
  <svg viewBox="0 0 100 80" className="w-20 h-16">
    <rect x="15" y="20" width="70" height="45" fill="none" stroke="#8B4513" strokeWidth="3" rx="2"/>
    <rect x="18" y="23" width="64" height="39" fill="#F5DEB3" opacity="0.3"/>
    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
      <line key={`v${i}`} x1={25 + i * 8} y1="25" x2={25 + i * 8} y2="60" stroke="#4682B4" strokeWidth="1.5" opacity="0.8"/>
    ))}
    <g>
      {animate && <animate attributeName="transform" values="translate(0,0);translate(0,4);translate(0,0)" dur="0.8s" repeatCount="indefinite"/>}
      {[0, 1, 2, 3].map((i) => (
        <line key={`h${i}`} x1="20" y1={30 + i * 8} x2="80" y2={30 + i * 8} stroke="#8B0000" strokeWidth="2"/>
      ))}
    </g>
    <rect x="10" y="38" width="8" height="20" fill="#8B4513" rx="1">
      {animate && <animate attributeName="x" values="10;78;10" dur="2s" repeatCount="indefinite"/>}
    </rect>
    <text x="50" y="78" textAnchor="middle" fill="white" fontSize="6" fontWeight="500" opacity="0.9">Weaver</text>
  </svg>
);

const TailorScene = ({ animate }) => (
  <svg viewBox="0 0 100 80" className="w-20 h-16">
    <rect x="25" y="30" width="50" height="35" fill="#4169E1" opacity="0.7" rx="2"/>
    <rect x="30" y="35" width="40" height="25" fill="#6495ED" rx="1"/>
    <g>
      {animate && <animateTransform attributeName="transform" type="translate" values="0,0;5,5;0,0" dur="0.4s" repeatCount="indefinite"/>}
      <path d="M60 25 L65 20 L70 25 L68 28 L62 28 Z" fill="#C0C0C0"/>
      <line x1="67" y1="20" x2="75" y2="12" stroke="#C0C0C0" strokeWidth="2"/>
    </g>
    <g>
      {animate && <animate attributeName="opacity" values="1;0.5;1" dur="0.4s" repeatCount="indefinite"/>}
      <line x1="45" y1="40" x2="55" y2="40" stroke="#333" strokeWidth="1" strokeDasharray="2,2"/>
      <line x1="45" y1="45" x2="55" y2="45" stroke="#333" strokeWidth="1" strokeDasharray="2,2"/>
      <line x1="45" y1="50" x2="55" y2="50" stroke="#333" strokeWidth="1" strokeDasharray="2,2"/>
    </g>
    <circle cx="35" cy="55" r="4" fill="#FFD700"/>
    <circle cx="42" cy="55" r="4" fill="#FF6347"/>
    <circle cx="49" cy="55" r="4" fill="#32CD32"/>
    <path d="M20 35 Q15 40 20 50" fill="none" stroke="#FF69B4" strokeWidth="1.5">
      {animate && <animate attributeName="d" values="M20 35 Q15 40 20 50;M20 35 Q25 42 20 50;M20 35 Q15 40 20 50" dur="1s" repeatCount="indefinite"/>}
    </path>
    <text x="50" y="78" textAnchor="middle" fill="white" fontSize="6" fontWeight="500" opacity="0.9">Tailor</text>
  </svg>
);

const CarpenterScene = ({ animate }) => (
  <svg viewBox="0 0 100 80" className="w-20 h-16">
    <rect x="20" y="45" width="60" height="12" fill="#DEB887" rx="1"/>
    <rect x="20" y="45" width="60" height="3" fill="#D2B48C"/>
    <g>
      {animate && <animateTransform attributeName="transform" type="translate" values="0,0;-10,0;0,0" dur="0.5s" repeatCount="indefinite"/>}
      <rect x="55" y="30" width="25" height="8" fill="#8B4513"/>
      <rect x="52" y="32" width="6" height="12" fill="#A0522D" rx="1"/>
      <rect x="55" y="35" width="25" height="2" fill="#C0C0C0"/>
      <path d="M80 33 L82 35 L80 37" fill="none" stroke="#888" strokeWidth="1"/>
    </g>
    <rect x="35" y="55" width="8" height="15" fill="#8B4513"/>
    <rect x="57" y="55" width="8" height="15" fill="#8B4513"/>
    <g fill="#DEB887" opacity="0.6">
      {animate && (
        <>
          <rect x="42" y="48" width="3" height="2">
            <animate attributeName="x" values="42;30;20" dur="0.5s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="1;0.5;0" dur="0.5s" repeatCount="indefinite"/>
          </rect>
          <rect x="45" y="50" width="2" height="1">
            <animate attributeName="x" values="45;35;25" dur="0.6s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="1;0.5;0" dur="0.6s" repeatCount="indefinite"/>
          </rect>
        </>
      )}
    </g>
    <text x="50" y="78" textAnchor="middle" fill="white" fontSize="6" fontWeight="500" opacity="0.9">Carpenter</text>
  </svg>
);

const FarmerScene = ({ animate }) => (
  <svg viewBox="0 0 100 80" className="w-20 h-16">
    <rect x="10" y="55" width="80" height="15" fill="#8B4513" opacity="0.5"/>
    {[0, 1, 2, 3, 4].map((i) => (
      <g key={`plant${i}`}>
        <line x1={20 + i * 15} y1="55" x2={20 + i * 15} y2="35" stroke="#228B22" strokeWidth="2">
          {animate && <animate attributeName="y2" values="35;32;35" dur={`${1 + i * 0.1}s`} repeatCount="indefinite"/>}
        </line>
        <ellipse cx={20 + i * 15} cy="32" rx="5" ry="3" fill="#32CD32">
          {animate && <animate attributeName="cy" values="32;29;32" dur={`${1 + i * 0.1}s`} repeatCount="indefinite"/>}
        </ellipse>
        <ellipse cx={17 + i * 15} cy="38" rx="4" ry="2" fill="#228B22">
          {animate && <animate attributeName="cy" values="38;35;38" dur={`${1 + i * 0.1}s`} repeatCount="indefinite"/>}
        </ellipse>
        <ellipse cx={23 + i * 15} cy="40" rx="4" ry="2" fill="#228B22">
          {animate && <animate attributeName="cy" values="40;37;40" dur={`${1 + i * 0.1}s`} repeatCount="indefinite"/>}
        </ellipse>
      </g>
    ))}
    <circle cx="85" cy="20" r="10" fill="#FFD700" opacity="0.8">
      {animate && <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite"/>}
    </circle>
    <text x="50" y="78" textAnchor="middle" fill="white" fontSize="6" fontWeight="500" opacity="0.9">Farmer</text>
  </svg>
);

const artisanScenes = [
  { id: "potter", Component: PotterScene, name: "Potter Shaping Clay" },
  { id: "blacksmith", Component: BlacksmithScene, name: "Blacksmith Hammering" },
  { id: "weaver", Component: WeaverScene, name: "Weaver at Loom" },
  { id: "tailor", Component: TailorScene, name: "Tailor Stitching" },
  { id: "carpenter", Component: CarpenterScene, name: "Carpenter Sawing" },
  { id: "farmer", Component: FarmerScene, name: "Farmer Harvesting" }
];

const Divider = () => (
  <div className="flex items-center justify-center px-2 h-full">
    <div className="w-0.5 h-10 bg-gradient-to-b from-transparent via-white/30 to-transparent rounded-full" />
  </div>
);

export default function ArtisanTicker() {
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      
      const handleChange = (e) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  const shouldAnimate = !isPaused && !prefersReducedMotion;

  const sceneElements = artisanScenes.flatMap((scene, index) => {
    const { Component } = scene;
    return [
      <div 
        key={scene.id} 
        className="flex items-center justify-center mx-2 rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm shadow-lg border border-white/10 p-1"
        title={scene.name}
        aria-label={scene.name}
      >
        <Component animate={shouldAnimate} />
      </div>,
      index < artisanScenes.length - 1 && <Divider key={`div-${index}`} />
    ];
  }).filter(Boolean);

  return (
    <div 
      className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-700 h-20 flex items-center overflow-hidden relative"
      role="region"
      aria-label="Local artisan animations showcasing traditional crafts - hover or focus to pause"
      tabIndex={0}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent pointer-events-none" />
      
      <Marquee
        speed={prefersReducedMotion ? 0 : 30}
        pauseOnHover={true}
        pauseOnClick={true}
        gradient={true}
        gradientColor={[5, 150, 105]}
        gradientWidth={80}
        className="overflow-hidden"
        play={!prefersReducedMotion}
      >
        <div className="flex items-center py-2 px-4">
          {sceneElements}
          <Divider />
          {sceneElements}
        </div>
      </Marquee>

      {isPaused && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5 text-[10px] text-white font-medium flex items-center gap-2 z-10 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          Paused
        </div>
      )}
    </div>
  );
}
