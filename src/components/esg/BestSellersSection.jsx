"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function BestSellersSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const containerRef = useRef(null);

  const bestSellerProducts = useMemo(() => [
    {
      id: 1,
      imageUrl: "/products/natural_jute_tote_bag.png",
      category: "Home & Kitchen", 
      title: "Jute Bag | Originally Sourced",
      description: "Sustainable jute bag for daily use",
      price: 89,
      originalPrice: 120,
      rating: 4.9,
      reviews: 524,
      ecoScore: 96,
      badge: "Top Rated"
    },
    {
      id: 2,
      imageUrl: "/products/eco_bamboo_water_bottle.png",
      category: "Personal Care",
      title: "Eco Bamboo Water Bottle",
      description: "BPA-free bamboo water bottle",
      price: 65,
      originalPrice: 85,
      rating: 4.8,
      reviews: 342,
      ecoScore: 94,
      badge: "Eco Choice"
    },
    {
      id: 3,
      imageUrl: "/products/organic_cotton_t-shirt.png",
      category: "Fashion",
      title: "Organic Cotton T-Shirt",
      description: "100% organic cotton sustainable tee",
      price: 125,
      originalPrice: 160,
      rating: 4.7,
      reviews: 289,
      ecoScore: 92,
      badge: "Organic"
    },
    {
      id: 4,
      imageUrl: "/products/recycled_paper_diary.png",
      category: "Stationery",
      title: "Recycled Paper Diary",
      description: "Eco-friendly recycled paper diary",
      price: 45,
      originalPrice: 65,
      rating: 4.9,
      reviews: 201,
      ecoScore: 98,
      badge: "Zero Waste"
    },
    {
      id: 5,
      imageUrl: "/products/hemp_fiber_backpack.png",
      category: "Accessories",
      title: "Hemp Fiber Backpack",
      description: "Durable hemp fiber travel backpack",
      price: 180,
      originalPrice: 240,
      rating: 4.8,
      reviews: 156,
      ecoScore: 95,
      badge: "Sustainable"
    },
    {
      id: 6,
      imageUrl: "/products/bamboo_cutlery_set_product.png",
      category: "Kitchen",
      title: "Bamboo Cutlery Set",
      description: "Portable bamboo cutlery for eco living",
      price: 35,
      originalPrice: 50,
      rating: 4.9,
      reviews: 412,
      ecoScore: 97,
      badge: "Plastic-Free"
    },
    {
      id: 7,
      imageUrl: "/products/organic_skincare_set.png",
      category: "Beauty",
      title: "Organic Skincare Set",
      description: "Natural ingredients for glowing skin",
      price: 220,
      originalPrice: 280,
      rating: 4.8,
      reviews: 267,
      ecoScore: 93,
      badge: "Cruelty-Free"
    },
    {
      id: 8,
      imageUrl: "/products/natural_jute_tote_bag.png",
      category: "Accessories",
      title: "Canvas Eco Tote",
      description: "Reusable canvas shopping bag",
      price: 55,
      originalPrice: 75,
      rating: 4.7,
      reviews: 189,
      ecoScore: 94,
      badge: "Reusable"
    }
  ], []);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(bestSellerProducts.length / itemsPerPage);

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  }, [totalPages]);

  useEffect(() => {
    if (!isAutoPlaying || isHovered) return;
    const interval = setInterval(nextPage, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovered, nextPage]);

  const visibleProducts = bestSellerProducts.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <section 
      className="relative w-full py-16 sm:py-24 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <style jsx global>{`
        @keyframes float-3d {
          0%, 100% { transform: translateY(0) rotateX(0deg) rotateY(0deg); }
          25% { transform: translateY(-10px) rotateX(2deg) rotateY(2deg); }
          50% { transform: translateY(-5px) rotateX(-1deg) rotateY(-1deg); }
          75% { transform: translateY(-8px) rotateX(1deg) rotateY(1deg); }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(245, 158, 11, 0.2), 0 0 40px rgba(245, 158, 11, 0.1); }
          50% { box-shadow: 0 0 30px rgba(245, 158, 11, 0.4), 0 0 60px rgba(245, 158, 11, 0.2); }
        }
        @keyframes shimmer-slide {
          0% { transform: translateX(-100%) rotate(15deg); }
          100% { transform: translateX(100%) rotate(15deg); }
        }
        @keyframes rotate-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes scale-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes slide-in {
          0% { opacity: 0; transform: translateX(30px) scale(0.95); }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }
        .product-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }
        .product-card:hover {
          transform: translateY(-12px) scale(1.02);
        }
        .card-glow:hover {
          animation: glow-pulse 2s ease-in-out infinite;
        }
        .shimmer-effect::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          animation: shimmer-slide 2s infinite;
        }
        .slide-animation {
          animation: slide-in 0.5s ease-out forwards;
        }
      `}</style>

      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50/50 to-yellow-50/30" />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-[5%] w-72 h-72 bg-gradient-to-br from-amber-200/40 to-orange-300/20 rounded-full blur-3xl" style={{ animation: 'float-3d 15s ease-in-out infinite' }} />
        <div className="absolute bottom-20 right-[10%] w-96 h-96 bg-gradient-to-br from-yellow-200/30 to-amber-300/20 rounded-full blur-3xl" style={{ animation: 'float-3d 20s ease-in-out infinite 5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-amber-200/20 rounded-full" style={{ animation: 'rotate-slow 60s linear infinite' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-orange-200/20 rounded-full" style={{ animation: 'rotate-slow 40s linear infinite reverse' }} />
        
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(245, 158, 11, 0.1) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 px-4 py-2 rounded-full mb-6">
            <span className="text-2xl">🏆</span>
            <span className="text-amber-700 font-semibold text-sm uppercase tracking-wider">Customer Favorites</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
            Best <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-red-500">Sellers</span>
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our most loved sustainable products, trusted by thousands of eco-conscious shoppers
          </p>
          
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full" />
            <div className="w-3 h-3 bg-amber-500 rounded-full" style={{ animation: 'scale-pulse 2s ease-in-out infinite' }} />
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-amber-400 rounded-full" />
          </div>
        </div>

        <div className="relative" ref={containerRef}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {visibleProducts.map((product, index) => (
              <div
                key={`${currentPage}-${product.id}`}
                className="slide-animation"
                style={{ animationDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setHoveredCard(product.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <Link href={`/products/${product.id}`}>
                  <div className={`product-card card-glow relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-white/50 h-full ${hoveredCard === product.id ? 'ring-2 ring-amber-400/50' : ''}`}>
                    <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5">
                      <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-full shadow-lg">
                        #{currentPage * itemsPerPage + index + 1} Best Seller
                      </span>
                      <span className="bg-white/90 backdrop-blur-sm text-amber-700 text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow">
                        {product.badge}
                      </span>
                    </div>
                    
                    <div className="absolute top-3 right-3 z-20">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                        <div className="text-center">
                          <span className="text-white font-bold text-xs sm:text-sm">{product.ecoScore}</span>
                          <span className="text-white/80 text-[6px] sm:text-[8px] block -mt-0.5">ECO</span>
                        </div>
                      </div>
                    </div>

                    <div className="relative h-40 sm:h-48 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                      <Image
                        src={product.imageUrl}
                        alt={product.title}
                        fill
                        className="object-contain p-4 sm:p-6 transition-transform duration-500 hover:scale-110"
                        sizes="(max-width: 640px) 50vw, 25vw"
                      />
                      {hoveredCard === product.id && (
                        <div className="absolute inset-0 shimmer-effect overflow-hidden" />
                      )}
                    </div>

                    <div className="p-3 sm:p-4 bg-gradient-to-b from-white to-gray-50">
                      <span className="text-[10px] sm:text-xs font-medium text-amber-600 uppercase tracking-wider">{product.category}</span>
                      
                      <h3 className="text-sm sm:text-base font-bold text-gray-900 mt-1 line-clamp-1">{product.title}</h3>
                      
                      <p className="text-xs sm:text-sm text-gray-500 mt-0.5 line-clamp-1 hidden sm:block">{product.description}</p>

                      <div className="flex items-center gap-1.5 mt-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`w-3 h-3 sm:w-4 sm:h-4 ${i < Math.floor(product.rating) ? 'text-amber-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-xs font-medium text-gray-600">{product.rating}</span>
                        <span className="text-[10px] text-gray-400">({product.reviews})</span>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-lg sm:text-xl font-black text-emerald-600">₹{product.price}</span>
                          <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
                        </div>
                        <span className="bg-emerald-100 text-emerald-700 text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded-full">
                          {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                        </span>
                      </div>

                      <button className="mt-3 w-full flex items-center justify-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-2 sm:py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-xs sm:text-sm">
                        <span>Add to Cart</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <button
            onClick={prevPage}
            className="absolute -left-4 sm:-left-14 lg:-left-16 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-xl flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 group border border-amber-100"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextPage}
            className="absolute -right-4 sm:-right-14 lg:-right-16 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-xl flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 group border border-amber-100"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 sm:gap-3 mt-8">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`relative transition-all duration-300 ${
                index === currentPage 
                  ? 'w-8 sm:w-10 h-2.5 sm:h-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full shadow-lg' 
                  : 'w-2.5 sm:w-3 h-2.5 sm:h-3 bg-gray-300 hover:bg-amber-300 rounded-full'
              }`}
            >
              {index === currentPage && (
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full animate-pulse" />
              )}
            </button>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Link
            href="/explore?sort=best-sellers"
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 hover:to-red-600 text-white font-bold px-8 sm:px-10 py-3 sm:py-4 rounded-full shadow-2xl hover:shadow-amber-500/30 transition-all duration-300 hover:scale-105 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="text-xl sm:text-2xl" style={{ animation: 'bounce-gentle 2s ease-in-out infinite' }}>🏆</span>
            <span className="text-base sm:text-lg">Explore All Best Sellers</span>
            <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
