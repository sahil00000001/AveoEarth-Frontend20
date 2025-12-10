"use client";

import { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import Image from "next/image";

const artisanScenes = [
  { id: "potter", name: "Potter", image: "/artisan-sketches/potter_at_pottery_wheel_sketch.png" },
  { id: "weaver", name: "Weaver", image: "/artisan-sketches/weaver_at_handloom_sketch.png" },
  { id: "blacksmith", name: "Blacksmith", image: "/artisan-sketches/blacksmith_at_anvil_sketch.png" },
  { id: "carpenter", name: "Carpenter", image: "/artisan-sketches/carpenter_with_hand_plane_sketch.png" },
  { id: "spinner", name: "Spinner", image: "/artisan-sketches/woman_with_charkha_spinning_wheel.png" },
  { id: "basket-weaver", name: "Basket Weaver", image: "/artisan-sketches/basket_weaver_with_reeds_sketch.png" },
  { id: "tailor", name: "Tailor", image: "/artisan-sketches/tailor_stitching_fabric_sketch.png" }
];

const ArtisanCard = ({ scene }) => (
  <div 
    className="flex flex-col items-center justify-center mx-3"
    title={scene.name}
    aria-label={scene.name}
  >
    <div className="w-[60px] h-[60px] rounded-md overflow-hidden bg-white shadow-sm border border-stone-200">
      <Image
        src={scene.image}
        alt={`${scene.name} - traditional artisan sketch`}
        width={60}
        height={60}
        className="w-full h-full object-cover"
        priority={false}
        unoptimized
      />
    </div>
    <span className="mt-1 text-[10px] font-medium text-stone-700 tracking-wide">
      {scene.name}
    </span>
  </div>
);

const Divider = () => (
  <div className="flex items-center justify-center px-2 h-full">
    <div className="w-px h-12 bg-gradient-to-b from-transparent via-stone-300 to-transparent rounded-full" />
  </div>
);

export default function ArtisanTicker() {
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const sceneElements = artisanScenes.flatMap((scene, index) => {
    return [
      <ArtisanCard key={scene.id} scene={scene} />,
      index < artisanScenes.length - 1 && <Divider key={`div-${index}`} />
    ];
  }).filter(Boolean);

  return (
    <div 
      className="bg-gradient-to-r from-amber-50 via-stone-100 to-amber-50 py-1.5 flex items-center overflow-hidden relative border-b border-stone-200"
      role="region"
      aria-label="Traditional artisan crafts showcase - hover to pause"
      tabIndex={0}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <Marquee
        speed={prefersReducedMotion ? 0 : 35}
        pauseOnHover={true}
        pauseOnClick={true}
        gradient={true}
        gradientColor="#fef3c7"
        gradientWidth={60}
        className="overflow-hidden"
        play={!prefersReducedMotion}
      >
        <div className="flex items-center py-1 px-3">
          {sceneElements}
          <Divider />
          {sceneElements}
        </div>
      </Marquee>

      {isPaused && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-stone-800/70 backdrop-blur-sm rounded-full px-3 py-1.5 text-[10px] text-white font-medium flex items-center gap-2 z-10 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          Paused
        </div>
      )}
    </div>
  );
}
