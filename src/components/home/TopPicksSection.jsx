"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

const topPicksProducts = [
  {
    id: 1,
    name: "Eco Bamboo Water Bottle",
    price: "₹1,299",
    originalPrice: "₹1,599",
    images: [
      "/products/eco_bamboo_water_bottle.png",
      "/products/bamboo_water_bottle_product.png",
      "/products/bamboo_bottle_alternate_view.png"
    ],
    ecoScore: 95,
    badge: "Zero Waste"
  },
  {
    id: 2,
    name: "Organic Cotton Bag Set",
    price: "₹899",
    originalPrice: "₹1,199",
    images: [
      "/products/organic_cotton_tote_bag.png",
      "/products/organic_cotton_tote_bags.png",
      "/products/cotton_bags_alternate_view.png"
    ],
    ecoScore: 92,
    badge: "Organic"
  },
  {
    id: 3,
    name: "Natural Skincare Bundle",
    price: "₹2,499",
    originalPrice: "₹3,199",
    images: [
      "/products/organic_skincare_set.png",
      "/products/natural_skincare_bundle.png",
      "/products/skincare_alternate_view.png"
    ],
    ecoScore: 98,
    badge: "Cruelty-Free"
  },
  {
    id: 4,
    name: "Sustainable Kitchen Set",
    price: "₹1,899",
    originalPrice: "₹2,399",
    images: [
      "/products/sustainable_kitchen_set.png",
      "/products/wooden_kitchen_utensils.png",
      "/products/kitchen_set_alternate_view.png"
    ],
    ecoScore: 94,
    badge: "Plastic-Free"
  },
  {
    id: 5,
    name: "Recycled Glass Jars",
    price: "₹599",
    originalPrice: "₹799",
    images: [
      "/products/recycled_glass_jars.png",
      "/products/glass_jars_alternate_view.png",
      "/products/stainless_steel_tumbler.png"
    ],
    ecoScore: 96,
    badge: "Recycled"
  },
  {
    id: 6,
    name: "Bamboo Cutlery Set",
    price: "₹399",
    originalPrice: "₹599",
    images: [
      "/products/bamboo_cutlery_set_product.png",
      "/products/bamboo_cutlery_set.png",
      "/products/cutlery_set_alternate_view.png"
    ],
    ecoScore: 93,
    badge: "Biodegradable"
  },
  {
    id: 7,
    name: "Hemp Tote Bag",
    price: "₹799",
    originalPrice: "₹999",
    images: [
      "/products/hemp_tote_bag_product.png",
      "/products/hemp_bag_alternate_view.png",
      "/products/natural_jute_tote_bag.png"
    ],
    ecoScore: 91,
    badge: "Hemp"
  },
  {
    id: 8,
    name: "Solar Phone Charger",
    price: "₹1,599",
    originalPrice: "₹2,199",
    images: [
      "/products/solar_phone_charger_product.png",
      "/products/solar_phone_charger.png",
      "/products/solar_charger_alternate_view.png"
    ],
    ecoScore: 97,
    badge: "Solar"
  },
  {
    id: 9,
    name: "Reusable Beeswax Wraps",
    price: "₹449",
    originalPrice: "₹649",
    images: [
      "/products/beeswax_wraps_set.png",
      "/products/beeswax_food_wraps_product.png",
      "/products/beeswax_wraps_alternate_view.png"
    ],
    ecoScore: 94,
    badge: "Zero Waste"
  },
  {
    id: 10,
    name: "Coconut Bowl Set",
    price: "₹699",
    originalPrice: "₹899",
    images: [
      "/products/coconut_bowl_set.png",
      "/products/coconut_bowls_alternate_view.png",
      "/products/bamboo_dinnerware_set.png"
    ],
    ecoScore: 92,
    badge: "Natural"
  },
  {
    id: 11,
    name: "Organic Lip Balm",
    price: "₹199",
    originalPrice: "₹299",
    images: [
      "/products/organic_lip_balm_set.png",
      "/products/lip_balm_alternate_view.png",
      "/products/natural_moisturizer_cream.png"
    ],
    ecoScore: 96,
    badge: "Organic"
  },
  {
    id: 12,
    name: "Eco Yoga Mat",
    price: "₹1,999",
    originalPrice: "₹2,599",
    images: [
      "/products/eco_yoga_mat_product.png",
      "/products/yoga_mat_alternate_view.png",
      "/products/hemp_fiber_yoga_mat.png"
    ],
    ecoScore: 93,
    badge: "Recyclable"
  }
];

function EcoScoreBadge({ score, delay = 0, compact = false }) {
  const getScoreColor = (score) => {
    if (score >= 95) return { bg: "from-olive-400 to-olive-600", glow: "rgba(107, 142, 35, 0.6)" };
    if (score >= 90) return { bg: "from-olive-400 to-olive-500", glow: "rgba(85, 107, 47, 0.5)" };
    if (score >= 85) return { bg: "from-olive-300 to-olive-500", glow: "rgba(143, 188, 90, 0.5)" };
    return { bg: "from-soil-400 to-olive-500", glow: "rgba(139, 115, 85, 0.5)" };
  };

  const colors = getScoreColor(score);
  const size = compact ? "w-8 h-8" : "w-14 h-14";

  return (
    <motion.div
      initial={{ scale: 1, y: 0 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20
      }}
      className={`absolute ${compact ? "top-2 right-2" : "-top-6 left-1/2 -translate-x-1/2"} z-20`}
    >
      <motion.div
        animate={{ 
          boxShadow: [
            `0 0 15px ${colors.glow}`,
            `0 0 30px ${colors.glow}`,
            `0 0 15px ${colors.glow}`
          ]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className={`${size} rounded-full bg-gradient-to-br ${colors.bg} flex items-center justify-center shadow-xl border-3 border-white`}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-2 border-dashed border-white/30"
        />
        <div className="text-center">
          <span className={`text-white font-bold ${compact ? "text-xs" : "text-sm"} drop-shadow-lg`}>{score}</span>
          <span className={`text-white/90 ${compact ? "text-[6px]" : "text-[8px]"} block -mt-0.5`}>ECO</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProductTile3D({ product, index, isActive, compact = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState({});
  const cardRef = useRef(null);
  const imageIntervalRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleImageLoad = (imgIndex) => {
    setImagesLoaded(prev => ({ ...prev, [imgIndex]: true }));
  };

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-12, 12]);

  const images = product.images || [product.image];

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    
    if (images.length > 1) {
      imageIntervalRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 800);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
    setCurrentImageIndex(0);
    
    if (imageIntervalRef.current) {
      clearInterval(imageIntervalRef.current);
      imageIntervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (imageIntervalRef.current) {
        clearInterval(imageIntervalRef.current);
      }
    };
  }, []);

  const imageHeight = compact ? "h-24" : "h-48";
  const padding = compact ? "p-2" : "p-4";

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 1, y: 0 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        scale: isActive ? 1 : 0.95 
      }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 25,
        delay: index * 0.05 
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative"
      style={{ perspective: 800 }}
    >
      {!compact && <EcoScoreBadge score={product.ecoScore} delay={index * 0.08 + 0.2} compact={compact} />}
      
      <motion.div
        style={{ 
          rotateX: isHovered ? rotateX : 0, 
          rotateY: isHovered ? rotateY : 0,
          transformStyle: "preserve-3d"
        }}
        whileHover={{ z: 30 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="relative bg-white/95 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-100/50 cursor-pointer group"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-olive-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
        
        <div className={`relative ${imageHeight} bg-gradient-to-br from-gray-50 to-gray-100/50 overflow-hidden`}>
          {!imagesLoaded[currentImageIndex] && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-50 animate-pulse">
              <div className="w-16 h-16 rounded-full bg-gray-200/70" />
            </div>
          )}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: imagesLoaded[currentImageIndex] ? 1 : 0, scale: isHovered ? 1.08 : 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={images[currentImageIndex]}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-contain p-2"
                onLoad={() => handleImageLoad(currentImageIndex)}
              />
            </motion.div>
          </AnimatePresence>
          
          {compact && (
            <div className="absolute top-1.5 right-1.5 z-20">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-olive-400 to-olive-500 flex items-center justify-center shadow-md border-2 border-white">
                <div className="text-center">
                  <span className="text-white font-bold text-[9px] leading-none">{product.ecoScore}</span>
                </div>
              </div>
            </div>
          )}
          
          {images.length > 1 && isHovered && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-20">
              {images.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentImageIndex ? "bg-olive-500 w-3" : "bg-white/60"
                  }`}
                />
              ))}
            </div>
          )}
          
          <motion.div
            initial={{ x: -80, opacity: 0 }}
            animate={isHovered ? { x: 0, opacity: 1 } : { x: -80, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute top-2 left-2"
          >
            <span className={`bg-olive-500 text-white ${compact ? "text-[8px] px-1.5 py-0.5" : "text-xs px-3 py-1"} rounded-full font-medium shadow-md`}>
              {product.badge}
            </span>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={isHovered ? { scale: 1 } : { scale: 0 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="absolute bottom-2 right-2"
          >
            <button className={`${compact ? "w-8 h-8" : "w-10 h-10"} bg-olive-500 hover:bg-olive-600 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform`}>
              <ShoppingCart className={`${compact ? "w-4 h-4" : "w-5 h-5"} text-white`} />
            </button>
          </motion.div>
        </div>

        <div className={padding}>
          <h3 className={`font-semibold text-gray-800 ${compact ? "text-xs" : "text-sm"} mb-1 line-clamp-1 group-hover:text-olive-700 transition-colors`}>
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className={`${compact ? "text-sm" : "text-lg"} font-bold text-olive-600`}>{product.price}</span>
            <span className={`${compact ? "text-xs" : "text-sm"} text-gray-400 line-through`}>{product.originalPrice}</span>
          </div>
        </div>

        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          animate={isHovered ? {
            boxShadow: "0 20px 40px -12px rgba(16, 185, 129, 0.3)"
          } : {
            boxShadow: "0 8px 25px -10px rgba(0, 0, 0, 0.15)"
          }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function TopPicksSection({ compact = false }) {
  const [currentSet, setCurrentSet] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHoveringSection, setIsHoveringSection] = useState(false);
  const itemsPerPage = compact ? 6 : 4;
  const totalSets = Math.ceil(topPicksProducts.length / itemsPerPage);

  useEffect(() => {
    if (!isAutoPlaying || isHoveringSection) return;
    
    const interval = setInterval(() => {
      setCurrentSet((prev) => (prev + 1) % totalSets);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isHoveringSection, totalSets]);

  const getCurrentProducts = () => {
    const start = currentSet * itemsPerPage;
    return topPicksProducts.slice(start, start + itemsPerPage);
  };

  const nextSet = () => {
    setIsAutoPlaying(false);
    setCurrentSet((prev) => (prev + 1) % totalSets);
  };

  const prevSet = () => {
    setIsAutoPlaying(false);
    setCurrentSet((prev) => (prev - 1 + totalSets) % totalSets);
  };

  if (compact) {
    return (
      <div 
        className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/50"
        onMouseEnter={() => setIsHoveringSection(true)}
        onMouseLeave={() => setIsHoveringSection(false)}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-olive-500" />
            <h2 className="text-lg font-bold text-gray-800">
              Top <span className="text-olive-600">Eco Picks</span>
            </h2>
          </div>
          <Link 
            href="/explore"
            className="text-sm text-olive-600 hover:text-olive-700 font-medium"
          >
            View All →
          </Link>
        </div>

        <div className="relative">
          <button
            onClick={prevSet}
            className="absolute -left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-200 hover:border-olive-300 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>

          <button
            onClick={nextSet}
            className="absolute -right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-200 hover:border-olive-300 transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>

          <div className="px-4">
            <div className="grid grid-cols-3 gap-2">
              {getCurrentProducts().map((product, index) => (
                <ProductTile3D
                  key={`${currentSet}-${product.id}`}
                  product={product}
                  index={index}
                  isActive={true}
                  compact={true}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-4 gap-2">
            {Array.from({ length: totalSets }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentSet(index);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSet ? "w-6 bg-olive-500" : "w-2 bg-gray-300 hover:bg-olive-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section 
      className="relative py-20 overflow-hidden"
      onMouseEnter={() => setIsHoveringSection(true)}
      onMouseLeave={() => setIsHoveringSection(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-olive-50/50 via-white to-olive-50/30" />
      
      <motion.div
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          backgroundSize: "60px 60px"
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-4"
          >
            <Sparkles className="w-8 h-8 text-olive-500" />
          </motion.div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-800 mb-4">
            Top <span className="text-transparent bg-clip-text bg-gradient-to-r from-olive-500 to-olive-600">Eco Picks</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most loved sustainable products, handpicked for conscious shoppers
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          <motion.button
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevSet}
            className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center border border-gray-100 hover:border-olive-300 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextSet}
            className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center border border-gray-100 hover:border-olive-300 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </motion.button>

          <div className="px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSet}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-10"
              >
                {getCurrentProducts().map((product, index) => (
                  <ProductTile3D
                    key={product.id}
                    product={product}
                    index={index}
                    isActive={true}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-10 gap-3">
            {Array.from({ length: totalSets }).map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentSet(index);
                }}
                className={`relative h-3 rounded-full transition-all duration-300 ${
                  index === currentSet ? "w-10 bg-olive-500" : "w-3 bg-gray-300 hover:bg-olive-300"
                }`}
              >
                {index === currentSet && (
                  <motion.div
                    layoutId="activeDot"
                    className="absolute inset-0 bg-olive-500 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isAutoPlaying && !isHoveringSection ? 1 : 0 }}
            className="text-center mt-4 text-sm text-gray-400"
          >
            Auto-rotating every 3 seconds
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link 
            href="/explore"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-olive-500 to-olive-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <span>View All Products</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
