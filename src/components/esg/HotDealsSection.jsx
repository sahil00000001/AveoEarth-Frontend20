"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import Image from 'next/image';

export default function HotDealsSection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const dropdownRef = useRef(null);

  const allProducts = useMemo(() => [
    {
      id: 1,
      title: "Jute Bag | Originally Sourced",
      price: 89,
      originalPrice: 120,
      rating: 4.9,
      reviews: 524,
      tags: ["Staff Pick", "AveoEarth Certified"],
      discount: "-31%",
      category: "Home & Living",
      imageUrl: "/products/natural_jute_tote_bag.png"
    },
    {
      id: 2,
      title: "Eco Bamboo Bottle",
      price: 45,
      originalPrice: 60,
      rating: 4.7,
      reviews: 312,
      tags: ["Best Seller", "AveoEarth Certified"],
      discount: "-25%",
      category: "Drinkware",
      imageUrl: "/products/eco_bamboo_water_bottle.png"
    },
    {
      id: 3,
      title: "Organic Cotton Tote",
      price: 65,
      originalPrice: 85,
      rating: 4.8,
      reviews: 289,
      tags: ["Staff Pick", "Eco-Friendly"],
      discount: "-24%",
      category: "Sustainable Fashion",
      imageUrl: "/products/organic_cotton_tote_bag.png"
    },
    {
      id: 4,
      title: "Recycled Paper Notebook",
      price: 35,
      originalPrice: 50,
      rating: 4.6,
      reviews: 156,
      tags: ["New Arrival", "AveoEarth Certified"],
      discount: "-30%",
      category: "Stationery",
      imageUrl: "/products/recycled_paper_notebook.png"
    },
    {
      id: 5,
      title: "Hemp Fiber Mat",
      price: 125,
      originalPrice: 180,
      rating: 4.9,
      reviews: 432,
      tags: ["Premium", "Staff Pick"],
      discount: "-31%",
      category: "Home & Living",
      imageUrl: "/products/hemp_fiber_yoga_mat.png"
    },
    {
      id: 6,
      title: "Cork Phone Case",
      price: 55,
      originalPrice: 75,
      rating: 4.5,
      reviews: 201,
      tags: ["Trending", "Eco-Friendly"],
      discount: "-27%",
      category: "Upcycled & Handmade",
      imageUrl: "/products/cork_phone_case.png"
    },
    {
      id: 7,
      title: "Organic Cotton T-Shirt",
      price: 85,
      originalPrice: 110,
      rating: 4.8,
      reviews: 289,
      tags: ["Organic", "Fashion"],
      discount: "-23%",
      category: "Sustainable Fashion",
      imageUrl: "/products/organic_cotton_t-shirt.png"
    },
    {
      id: 8,
      title: "Bamboo Dinnerware Set",
      price: 145,
      originalPrice: 195,
      rating: 4.9,
      reviews: 156,
      tags: ["Premium", "Staff Pick"],
      discount: "-26%",
      category: "Home & Living",
      imageUrl: "/products/bamboo_dinnerware_set.png"
    },
    {
      id: 9,
      title: "Recycled Plastic Pen",
      price: 25,
      originalPrice: 35,
      rating: 4.6,
      reviews: 89,
      tags: ["Eco-Friendly", "Affordable"],
      discount: "-29%",
      category: "Stationery",
      imageUrl: "/products/recycled_plastic_pen.png"
    },
    {
      id: 10,
      title: "Steel Water Tumbler",
      price: 65,
      originalPrice: 85,
      rating: 4.7,
      reviews: 234,
      tags: ["Durable", "Best Seller"],
      discount: "-24%",
      category: "Drinkware",
      imageUrl: "/products/stainless_steel_tumbler.png"
    },
    {
      id: 11,
      title: "Natural Moisturizer",
      price: 95,
      originalPrice: 125,
      rating: 4.5,
      reviews: 167,
      tags: ["Vegan", "Clean"],
      discount: "-24%",
      category: "Clean Beauty",
      imageUrl: "/products/natural_moisturizer_cream.png"
    },
    {
      id: 12,
      title: "Linen Throw Pillow",
      price: 75,
      originalPrice: 100,
      rating: 4.8,
      reviews: 198,
      tags: ["Comfort", "Natural"],
      discount: "-25%",
      category: "Home & Living",
      imageUrl: "/products/linen_throw_pillow.png"
    }
  ], []);

  const categories = ['all', 'Home & Living', 'Sustainable Fashion', 'Drinkware', 'Stationery', 'Upcycled & Handmade', 'Clean Beauty'];

  const filteredProducts = useMemo(() => activeFilter === 'all'
    ? allProducts
    : allProducts.filter(product => product.category === activeFilter)
  , [activeFilter, allProducts]);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const nextPage = useCallback(() => {
    if (totalPages <= 1) return;
    setCurrentPage((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const prevPage = useCallback(() => {
    if (totalPages <= 1) return;
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  }, [totalPages]);

  useEffect(() => {
    if (!isAutoPlaying || isHovered || totalPages <= 1) return;
    const interval = setInterval(nextPage, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovered, nextPage, totalPages]);

  useEffect(() => {
    setCurrentPage(0);
  }, [activeFilter]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const visibleProducts = filteredProducts.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const getCategoryIcon = (category) => {
    const icons = {
      'all': '🌿',
      'Home & Living': '🏠',
      'Sustainable Fashion': '👕',
      'Upcycled & Handmade': '🎨',
      'Clean Beauty': '✨',
      'Drinkware': '🥤',
      'Stationery': '📝'
    };
    return icons[category] || '🌱';
  };

  const handleFilterChange = (category) => {
    setActiveFilter(category);
    setIsDropdownOpen(false);
  };

  return (
    <section 
      className="relative w-full py-8 sm:py-12 overflow-hidden"
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
        @keyframes glow-pulse-earth {
          0%, 100% { box-shadow: 0 0 20px rgba(85, 107, 47, 0.2), 0 0 40px rgba(85, 107, 47, 0.1); }
          50% { box-shadow: 0 0 30px rgba(85, 107, 47, 0.4), 0 0 60px rgba(85, 107, 47, 0.2); }
        }
        @keyframes shimmer-slide {
          0% { transform: translateX(-100%) rotate(15deg); }
          100% { transform: translateX(100%) rotate(15deg); }
        }
        @keyframes rotate-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes slide-in-deal {
          0% { opacity: 0; transform: translateX(30px) scale(0.95); }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }
        .deal-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }
        .deal-card:hover {
          transform: translateY(-12px) scale(1.02);
        }
        .deal-glow:hover {
          animation: glow-pulse-earth 2s ease-in-out infinite;
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
        .slide-deal-animation {
          animation: slide-in-deal 0.5s ease-out forwards;
        }
      `}</style>

      <div className="absolute inset-0 bg-gradient-to-br from-[#f5f5dc]/30 via-[#8fbc8f]/10 to-[#e6e6d4]/40" />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-[5%] w-72 h-72 bg-gradient-to-br from-[#6b8e23]/20 to-[#8b7355]/15 rounded-full blur-3xl" style={{ animation: 'float-3d 15s ease-in-out infinite' }} />
        <div className="absolute bottom-20 right-[10%] w-96 h-96 bg-gradient-to-br from-[#4682b4]/15 to-[#6b8e23]/20 rounded-full blur-3xl" style={{ animation: 'float-3d 20s ease-in-out infinite 5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[#6b8e23]/10 rounded-full" style={{ animation: 'rotate-slow 60s linear infinite' }} />
        
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(107, 142, 35, 0.08) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="text-center sm:text-left">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#6b8e23]/20 to-[#8b7355]/20 px-4 py-2 rounded-full mb-3">
              <span className="text-xl">🔥</span>
              <span className="text-[#556b2f] font-semibold text-sm uppercase tracking-wider">Limited Time</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900">
              Hot <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6b8e23] via-[#8b7355] to-[#4682b4]">Deals</span>
            </h2>
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 bg-white/90 backdrop-blur-sm px-5 py-3 rounded-xl shadow-lg border border-[#6b8e23]/20 hover:border-[#6b8e23]/40 transition-all duration-300 min-w-[200px]"
            >
              <span className="text-lg">{getCategoryIcon(activeFilter)}</span>
              <span className="font-medium text-gray-700 flex-1 text-left">
                {activeFilter === 'all' ? 'All Categories' : activeFilter}
              </span>
              <svg 
                className={`w-5 h-5 text-[#6b8e23] transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-[#6b8e23]/20 overflow-hidden z-50">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleFilterChange(category)}
                    className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-all duration-200 ${
                      activeFilter === category 
                        ? 'bg-gradient-to-r from-[#6b8e23]/20 to-[#8b7355]/10 text-[#556b2f] font-semibold' 
                        : 'hover:bg-[#6b8e23]/10 text-gray-700'
                    }`}
                  >
                    <span className="text-lg">{getCategoryIcon(category)}</span>
                    <span>{category === 'all' ? 'All Categories' : category}</span>
                    {activeFilter === category && (
                      <svg className="w-5 h-5 ml-auto text-[#6b8e23]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {visibleProducts.map((product, index) => (
              <div
                key={`${activeFilter}-${currentPage}-${product.id}`}
                className="slide-deal-animation"
                style={{ animationDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setHoveredCard(product.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`deal-card deal-glow relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-white/50 h-full ${hoveredCard === product.id ? 'ring-2 ring-[#6b8e23]/50' : ''}`}>
                  <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5">
                    <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-full shadow-lg">
                      {product.discount} OFF
                    </span>
                    {product.tags[0] && (
                      <span className="bg-gradient-to-r from-[#6b8e23] to-[#556b2f] text-white text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow">
                        {product.tags[0]}
                      </span>
                    )}
                  </div>

                  <div className="relative h-40 sm:h-48 bg-gradient-to-br from-[#f5f5dc]/50 to-[#e6e6d4]/50 overflow-hidden">
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

                  <div className="p-3 sm:p-4 bg-gradient-to-b from-white to-[#f5f5dc]/30">
                    <span className="text-[10px] sm:text-xs font-medium text-[#8b7355] uppercase tracking-wider">{product.category}</span>
                    
                    <h3 className="text-sm sm:text-base font-bold text-gray-900 mt-1 line-clamp-1">{product.title}</h3>

                    <div className="flex items-center gap-1.5 mt-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-3 h-3 sm:w-4 sm:h-4 ${i < Math.floor(product.rating) ? 'text-[#8b7355]' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs font-medium text-gray-600">{product.rating}</span>
                      <span className="text-[10px] text-gray-400">({product.reviews})</span>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-lg sm:text-xl font-black text-[#556b2f]">₹{product.price}</span>
                        <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
                      </div>
                      <span className="bg-[#6b8e23]/20 text-[#556b2f] text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded-full">
                        Save ₹{product.originalPrice - product.price}
                      </span>
                    </div>

                    <button className="mt-3 w-full flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#6b8e23] to-[#556b2f] hover:from-[#556b2f] hover:to-[#4a5f27] text-white font-semibold py-2 sm:py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-xs sm:text-sm">
                      <span>Add to Cart</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <>
              <button
                onClick={prevPage}
                className="absolute -left-2 sm:-left-14 lg:-left-16 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-xl flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 group border border-[#6b8e23]/20"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#6b8e23] group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={nextPage}
                className="absolute -right-2 sm:-right-14 lg:-right-16 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-xl flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 group border border-[#6b8e23]/20"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#6b8e23] group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-8">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`relative transition-all duration-300 ${
                  index === currentPage 
                    ? 'w-8 sm:w-10 h-2.5 sm:h-3 bg-gradient-to-r from-[#6b8e23] to-[#8b7355] rounded-full shadow-lg' 
                    : 'w-2.5 sm:w-3 h-2.5 sm:h-3 bg-gray-300 hover:bg-[#6b8e23]/50 rounded-full'
                }`}
              >
                {index === currentPage && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#6b8e23]/80 to-[#8b7355]/80 rounded-full animate-pulse" />
                )}
              </button>
            ))}
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center bg-white/70 rounded-3xl shadow-xl border border-[#6b8e23]/20 mt-6 mx-auto max-w-lg">
            <div className="w-20 h-20 bg-gradient-to-br from-[#6b8e23]/30 to-[#8b7355]/30 rounded-full flex items-center justify-center mb-4 shadow-xl">
              <span className="text-3xl">🔍</span>
            </div>
            <h3 className="font-bold text-xl text-gray-800 mb-2">No deals available</h3>
            <p className="text-gray-600 max-w-md mx-auto px-4 text-sm">
              No products found in <span className="font-semibold text-[#556b2f]">{activeFilter}</span>. Try another category!
            </p>
            <button 
              onClick={() => setActiveFilter('all')}
              className="mt-4 px-5 py-2 bg-gradient-to-r from-[#6b8e23] to-[#556b2f] text-white rounded-full font-medium transition-colors shadow-lg hover:shadow-xl text-sm"
            >
              View All
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
