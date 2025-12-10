"use client";

import Image from "next/image";
import Link from "next/link";
import ProductCard from "../components/ui/ProductCard";
import HotDealsSection from "../components/esg/HotDealsSection";
import BestSellersSection from "../components/esg/BestSellersSection";
import ProductRecommendations from "../components/search/ProductRecommendations";
import TopPicksSection from "../components/home/TopPicksSection";
import Button from "../components/ui/Button";
import { useState, useEffect, useRef } from "react";
import { ShoppingCart, ArrowLeft, ArrowRight } from "lucide-react";

// Category Navigation Component - Enhanced Modern Design
function CategoryNavigation() {
  const categories = [
    {
      name: 'Home & Living',
      href: '/explore?category=home-living',
      gradient: 'from-emerald-500 to-teal-600',
      bgGradient: 'from-emerald-50 to-teal-50',
      hoverBg: 'hover:bg-emerald-50',
      iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-600',
      icon: (
        <svg width="20" height="20" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.5 0.5L17 5.5V16.5H11V10.5H6V16.5H0V5.5L8.5 0.5Z" fill="white"/>
        </svg>
      )
    },
    {
      name: 'Fashion',
      href: '/explore?category=fashion',
      gradient: 'from-orange-500 to-amber-600',
      bgGradient: 'from-orange-50 to-amber-50',
      hoverBg: 'hover:bg-orange-50',
      iconBg: 'bg-gradient-to-br from-orange-500 to-amber-600',
      icon: (
        <svg width="20" height="20" viewBox="0 0 25 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.1425 3.23573L15.2371 3.22876L15.3487 3.23274L15.4612 3.24967L15.5738 3.27955L21.55 5.27163C21.7296 5.33152 21.8885 5.44138 22.0079 5.58833C22.1273 5.73528 22.2024 5.91323 22.2243 6.10133L22.2313 6.21687V11.197C22.2312 11.441 22.1417 11.6765 21.9796 11.8588C21.8175 12.0411 21.5941 12.1576 21.3518 12.1861L21.2352 12.1931H19.2432V19.1653C19.2433 19.6679 19.0535 20.152 18.7118 20.5205C18.3701 20.889 17.9017 21.1147 17.4005 21.1524L17.2511 21.1574H7.29073C6.78815 21.1576 6.30409 20.9678 5.93557 20.626C5.56706 20.2843 5.34133 19.8159 5.30364 19.3147L5.29866 19.1653V12.1931H3.30658C3.06262 12.1931 2.82715 12.1035 2.64484 11.9414C2.46254 11.7793 2.34606 11.5559 2.31752 11.3136L2.31055 11.197V6.21687C2.31048 6.02747 2.36442 5.84197 2.46604 5.68214C2.56765 5.52231 2.71273 5.39476 2.88426 5.31446L2.99184 5.27163L8.96806 3.27955C9.11779 3.22968 9.27724 3.2161 9.43325 3.23994C9.58926 3.26378 9.73738 3.32435 9.86539 3.41667C9.9934 3.50898 10.0976 3.63039 10.1695 3.77089C10.2414 3.91139 10.2789 4.06697 10.2788 4.22479C10.2765 4.74172 10.4752 5.2393 10.833 5.61242C11.1908 5.98554 11.6796 6.20498 12.1962 6.22438C12.7127 6.24377 13.2166 6.06161 13.6013 5.71637C13.9861 5.37112 14.2216 4.88984 14.258 4.3742L14.267 4.13515L14.2839 4.0226L14.3208 3.88913L14.3646 3.78654L14.4144 3.6949L14.4821 3.60227L14.5508 3.52259C14.606 3.46946 14.6641 3.42298 14.7251 3.38314L14.8208 3.33035L14.9234 3.28653L15.0309 3.25465L15.1425 3.23573Z" fill="white"/>
        </svg>
      )
    },
    {
      name: 'Food & Beverage',
      href: '/explore?category=food-beverage',
      gradient: 'from-rose-500 to-pink-600',
      bgGradient: 'from-rose-50 to-pink-50',
      hoverBg: 'hover:bg-rose-50',
      iconBg: 'bg-gradient-to-br from-rose-500 to-pink-600',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 8h1c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2h-1v2c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2v-2H5c-1.1 0-2-.9-2-2v-6c0-1.1.9-2 2-2h1V6c0-2.21 1.79-4 4-4h4c2.21 0 4 1.79 4 4v2zM8 6v2h8V6c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2z" fill="white"/>
        </svg>
      )
    },
    {
      name: 'Clean Beauty',
      href: '/explore?category=beauty-personal-care',
      gradient: 'from-pink-500 to-fuchsia-600',
      bgGradient: 'from-pink-50 to-fuchsia-50',
      hoverBg: 'hover:bg-pink-50',
      iconBg: 'bg-gradient-to-br from-pink-500 to-fuchsia-600',
      icon: (
        <svg width="20" height="20" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M1.59921 1.99719C2.53314 1.06355 3.79964 0.539062 5.1202 0.539062C6.44077 0.539062 7.70727 1.06355 8.64119 1.99719C8.8238 2.17914 9.05886 2.40557 9.34639 2.67649C9.63325 2.40557 9.86798 2.17914 10.0506 1.99719C10.9806 1.07155 12.2383 0.550334 13.5505 0.54682C14.8626 0.543306 16.1231 1.05778 17.0581 1.97843C17.993 2.89908 18.5269 4.15151 18.5436 5.46355C18.5603 6.77559 18.0585 8.04122 17.1473 8.98539L10.0496 16.0831C9.8628 16.2699 9.6095 16.3748 9.34539 16.3748C9.08128 16.3748 8.82798 16.2699 8.64119 16.0831L1.54344 8.98638C0.633098 8.04752 0.128575 6.78826 0.138825 5.48056C0.149075 4.17287 0.674271 2.92167 1.59921 1.99719Z" fill="white"/>
        </svg>
      )
    },
    {
      name: 'Pets',
      href: '/explore?category=pets',
      gradient: 'from-amber-500 to-yellow-600',
      bgGradient: 'from-amber-50 to-yellow-50',
      hoverBg: 'hover:bg-amber-50',
      iconBg: 'bg-gradient-to-br from-amber-500 to-yellow-600',
      icon: (
        <svg viewBox="0 0 64 64" width="20" height="20" fill="white" aria-hidden="true">
          <circle cx="18" cy="22" r="6"/>
          <circle cx="28" cy="14" r="6"/>
          <circle cx="36" cy="14" r="6"/>
          <circle cx="46" cy="22" r="6"/>
          <ellipse cx="32" cy="44" rx="16" ry="13"/>
        </svg>
      )
    },
    {
      name: 'Fitness',
      href: '/explore?category=fitness',
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-50 to-emerald-50',
      hoverBg: 'hover:bg-green-50',
      iconBg: 'bg-gradient-to-br from-green-500 to-emerald-600',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.57 14.86L22 13.43L20.57 12L17 15.57L8.43 7L12 3.43L10.57 2L9.14 3.43L7.71 2L5.57 4.14L4.14 2.71L2.71 4.14L4.14 5.57L2 7.71L3.43 9.14L2 10.57L3.43 12L7 8.43L15.57 17L12 20.57L13.43 22L14.86 20.57L16.29 22L18.43 19.86L19.86 21.29L21.29 19.86L19.86 18.43L22 16.29L20.57 14.86Z" fill="white"/>
        </svg>
      )
    }
  ];

  return (
    <div className="w-full bg-gradient-to-r from-gray-50 via-white to-gray-50 border-y border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center py-4 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6">
            {categories.map((category, index) => (
              <Link 
                key={category.name}
                href={category.href} 
                className={`group flex flex-col items-center gap-2 px-3 py-2 sm:px-4 sm:py-3 rounded-2xl transition-all duration-300 ${category.hoverBg} hover:shadow-lg hover:scale-105 min-w-max`}
              >
                <div className={`relative w-12 h-12 sm:w-14 sm:h-14 ${category.iconBg} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                  <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {category.icon}
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={`text-emerald-600`}/>
                    </svg>
                  </div>
                </div>
                <span className="text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors duration-300 text-center leading-tight">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  // Rotating taglines similar to HeroSection.tsx
  const taglines = [
    "Buy better. Live lighter.",
    "Sustainable choices, beautiful life.",
    "Earth-friendly finds, delivered.",
    "Connect with verified sustainable vendors and create positive impact with every purchase"
  ];

  // Product carousel data
  const topProducts = [
    {
      id: 1,
      name: "Eco Bamboo Water Bottle",
      price: "₹1,299",
      originalPrice: "₹1,599",
      images: ["/products/eco_bamboo_water_bottle.png", "/products/eco_bamboo_water_bottle.png", "/products/eco_bamboo_water_bottle.png"],
      ecoScore: "95%",
      badges: ["Zero Waste"]
    },
    {
      id: 2,
      name: "Organic Cotton Bag Set",
      price: "₹899",
      originalPrice: "₹1,199",
      images: ["/products/organic_cotton_tote_bag.png", "/products/organic_cotton_tote_bag.png", "/products/organic_cotton_tote_bag.png"],
      ecoScore: "92%",
      badges: ["Organic"]
    },
    {
      id: 3,
      name: "Natural Skincare Bundle",
      price: "₹2,499",
      originalPrice: "₹3,199",
      images: ["/products/organic_skincare_set.png", "/products/organic_skincare_set.png", "/products/organic_skincare_set.png"],
      ecoScore: "98%",
      badges: ["Cruelty-Free"]
    },
    {
      id: 4,
      name: "Sustainable Kitchen Set",
      price: "₹1,899",
      originalPrice: "₹2,399",
      images: ["/products/sustainable_kitchen_set.png", "/products/sustainable_kitchen_set.png", "/products/sustainable_kitchen_set.png"],
      ecoScore: "94%",
      badges: ["Plastic-Free"]
    },
    {
      id: 5,
      name: "Recycled Glass Jars",
      price: "₹599",
      originalPrice: "₹799",
      images: ["/products/recycled_glass_jars.png", "/products/recycled_glass_jars.png", "/products/recycled_glass_jars.png"],
      ecoScore: "96%",
      badges: ["Recycled"]
    },
    {
      id: 6,
      name: "Bamboo Cutlery Set",
      price: "₹399",
      originalPrice: "₹599",
      images: ["/products/bamboo_cutlery_set_product.png", "/products/bamboo_cutlery_set_product.png", "/products/bamboo_cutlery_set_product.png"],
      ecoScore: "93%",
      badges: ["Biodegradable"]
    },
    {
      id: 7,
      name: "Hemp Tote Bag",
      price: "₹799",
      originalPrice: "₹999",
      images: ["/products/hemp_tote_bag_product.png", "/products/hemp_tote_bag_product.png", "/products/hemp_tote_bag_product.png"],
      ecoScore: "91%",
      badges: ["Hemp"]
    },
    {
      id: 8,
      name: "Solar Phone Charger",
      price: "₹1,599",
      originalPrice: "₹2,199",
      images: ["/products/solar_phone_charger_product.png", "/products/solar_phone_charger_product.png", "/products/solar_phone_charger_product.png"],
      ecoScore: "97%",
      badges: ["Solar"]
    },
    {
      id: 9,
      name: "Eco-Friendly Yoga Mat",
      price: "₹1,899",
      originalPrice: "₹2,499",
      images: ["/products/hemp_fiber_yoga_mat.png", "/products/hemp_fiber_yoga_mat.png", "/products/hemp_fiber_yoga_mat.png"],
      ecoScore: "94%",
      badges: ["Natural Rubber"]
    },
    {
      id: 10,
      name: "Bamboo Phone Case",
      price: "₹699",
      originalPrice: "₹999",
      images: ["/products/bamboo_phone_case_product.png", "/products/bamboo_phone_case_product.png", "/products/bamboo_phone_case_product.png"],
      ecoScore: "96%",
      badges: ["Biodegradable"]
    },
    {
      id: 11,
      name: "Organic Tea Collection",
      price: "₹1,299",
      originalPrice: "₹1,599",
      images: ["/products/organic_tea_collection_product.png", "/products/organic_tea_collection_product.png", "/products/organic_tea_collection_product.png"],
      ecoScore: "98%",
      badges: ["Fair Trade"]
    },
    {
      id: 12,
      name: "Reusable Food Wraps",
      price: "₹899",
      originalPrice: "₹1,199",
      images: ["/products/beeswax_food_wraps_product.png", "/products/beeswax_food_wraps_product.png", "/products/beeswax_food_wraps_product.png"],
      ecoScore: "95%",
      badges: ["Beeswax"]
    },
    {
      id: 13,
      name: "Solar Garden Lights",
      price: "₹1,499",
      originalPrice: "₹1,999",
      images: ["/products/solar_garden_lights_product.png", "/products/solar_garden_lights_product.png", "/products/solar_garden_lights_product.png"],
      ecoScore: "97%",
      badges: ["Solar Powered"]
    },
    {
      id: 14,
      name: "Cork Coasters Set",
      price: "₹599",
      originalPrice: "₹799",
      images: ["/products/cork_coasters_set_product.png", "/products/cork_coasters_set_product.png", "/products/cork_coasters_set_product.png"],
      ecoScore: "93%",
      badges: ["Cork"]
    },
    {
      id: 15,
      name: "Organic Cotton Towels",
      price: "₹1,199",
      originalPrice: "₹1,599",
      images: ["/products/organic_cotton_tote_bag.png", "/products/organic_cotton_tote_bag.png", "/products/organic_cotton_tote_bag.png"],
      ecoScore: "96%",
      badges: ["Organic"]
    },
    {
      id: 16,
      name: "Bamboo Straw Set",
      price: "₹299",
      originalPrice: "₹399",
      images: ["/products/bamboo_cutlery_set_product.png", "/products/bamboo_cutlery_set_product.png", "/products/bamboo_cutlery_set_product.png"],
      ecoScore: "98%",
      badges: ["Biodegradable"]
    },
    {
      id: 17,
      name: "Natural Loofah Sponge",
      price: "₹199",
      originalPrice: "₹299",
      images: ["/products/natural_moisturizer_cream.png", "/products/natural_moisturizer_cream.png", "/products/natural_moisturizer_cream.png"],
      ecoScore: "100%",
      badges: ["Natural"]
    },
    {
      id: 18,
      name: "Eco Laundry Detergent",
      price: "₹899",
      originalPrice: "₹1,199",
      images: ["/products/sustainable_kitchen_set.png", "/products/sustainable_kitchen_set.png", "/products/sustainable_kitchen_set.png"],
      ecoScore: "94%",
      badges: ["Plant-Based"]
    },
    {
      id: 19,
      name: "Recycled Paper Notebook",
      price: "₹399",
      originalPrice: "₹599",
      images: ["/products/recycled_paper_notebook.png", "/products/recycled_paper_notebook.png", "/products/recycled_paper_notebook.png"],
      ecoScore: "92%",
      badges: ["Recycled"]
    },
    {
      id: 20,
      name: "Organic Herbal Tea",
      price: "₹599",
      originalPrice: "₹799",
      images: ["/products/organic_tea_collection_product.png", "/products/organic_tea_collection_product.png", "/products/organic_tea_collection_product.png"],
      ecoScore: "97%",
      badges: ["Organic"]
    },
    {
      id: 21,
      name: "Bamboo Toothbrush",
      price: "₹199",
      originalPrice: "₹299",
      images: ["/products/bamboo_toothbrush_set.png", "/products/bamboo_toothbrush_set.png", "/products/bamboo_toothbrush_set.png"],
      ecoScore: "99%",
      badges: ["Biodegradable"]
    },
    {
      id: 22,
      name: "Natural Soap Bar",
      price: "₹149",
      originalPrice: "₹199",
      images: ["/products/natural_moisturizer_cream.png", "/products/natural_moisturizer_cream.png", "/products/natural_moisturizer_cream.png"],
      ecoScore: "95%",
      badges: ["Handmade"]
    },
    {
      id: 23,
      name: "Cork Yoga Block",
      price: "₹1,299",
      originalPrice: "₹1,599",
      images: ["/products/cork_phone_case.png", "/products/cork_phone_case.png", "/products/cork_phone_case.png"],
      ecoScore: "93%",
      badges: ["Cork"]
    },
    {
      id: 24,
      name: "Organic Face Oil",
      price: "₹799",
      originalPrice: "₹999",
      images: ["/products/organic_skincare_set.png", "/products/organic_skincare_set.png", "/products/organic_skincare_set.png"],
      ecoScore: "96%",
      badges: ["Organic"]
    },
    {
      id: 25,
      name: "Bamboo Utensil Set",
      price: "₹699",
      originalPrice: "₹899",
      images: ["/products/wooden_kitchen_utensils.png", "/products/wooden_kitchen_utensils.png", "/products/wooden_kitchen_utensils.png"],
      ecoScore: "97%",
      badges: ["Bamboo"]
    },
    {
      id: 26,
      name: "Natural Beeswax Candles",
      price: "₹1,499",
      originalPrice: "₹1,999",
      images: ["/products/beeswax_food_wraps_product.png", "/products/beeswax_food_wraps_product.png", "/products/beeswax_food_wraps_product.png"],
      ecoScore: "98%",
      badges: ["Beeswax"]
    },
    {
      id: 27,
      name: "Organic Cotton Socks",
      price: "₹399",
      originalPrice: "₹599",
      images: ["/products/organic_cotton_t-shirt.png", "/products/organic_cotton_t-shirt.png", "/products/organic_cotton_t-shirt.png"],
      ecoScore: "94%",
      badges: ["Organic"]
    },
    {
      id: 28,
      name: "Recycled Glass Vase",
      price: "₹899",
      originalPrice: "₹1,199",
      images: ["/products/recycled_glass_jars.png", "/products/recycled_glass_jars.png", "/products/recycled_glass_jars.png"],
      ecoScore: "91%",
      badges: ["Recycled"]
    },
    {
      id: 29,
      name: "Natural Deodorant",
      price: "₹349",
      originalPrice: "₹499",
      images: ["/products/natural_moisturizer_cream.png", "/products/natural_moisturizer_cream.png", "/products/natural_moisturizer_cream.png"],
      ecoScore: "96%",
      badges: ["Natural"]
    },
    {
      id: 30,
      name: "Bamboo Cutting Board",
      price: "₹1,199",
      originalPrice: "₹1,599",
      images: ["/products/bamboo_dinnerware_set.png", "/products/bamboo_dinnerware_set.png", "/products/bamboo_dinnerware_set.png"],
      ecoScore: "95%",
      badges: ["Bamboo"]
    }
  ];

  const [currentTagline, setCurrentTagline] = useState(0);
  const [isTaglineVisible, setIsTaglineVisible] = useState(true);
  const [cardImageIndexes, setCardImageIndexes] = useState({});
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);

  // Tagline animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTaglineVisible(false);
      setTimeout(() => {
        setCurrentTagline((prev) => (prev + 1) % taglines.length);
        setIsTaglineVisible(true);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Manual carousel navigation
  const nextCarousel = () => {
    setCurrentCarouselIndex((prevIndex) => 
      (prevIndex + 1) % Math.ceil(topProducts.length / 7)
    );
  };

  const prevCarousel = () => {
    setCurrentCarouselIndex((prevIndex) => 
      prevIndex === 0 ? Math.ceil(topProducts.length / 7) - 1 : prevIndex - 1
    );
  };

  // Get visible products for current carousel view
  const getVisibleProducts = () => {
    const startIndex = currentCarouselIndex * 7;
    return topProducts.slice(startIndex, startIndex + 7);
  };

  const handleImageIndicatorClick = (e, productId, imageIndex) => {
    e.preventDefault();
    e.stopPropagation();
    setCardImageIndexes(prev => ({ ...prev, [productId]: imageIndex }));
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">

      {/* Hero Section - Similar to HeroSection.tsx */}
      <section className="relative min-h-[85vh] bg-gradient-to-br from-emerald-50 to-emerald-100 overflow-hidden flex items-center justify-center">
        {/* Parallax Background */}
        <div className="absolute inset-0 parallax-layer">
          <Image
            src="/hero-sustainability-new.png"
            alt="Sustainable lifestyle products"
            fill
            className="object-cover opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/40 to-transparent" />
        </div>
        
        <div className="relative z-10 container mx-auto px-6 lg:px-10 pt-14 pb-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Hero Content */}
            <div className="space-y-6 slide-up text-center lg:text-left">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 leading-tight">
                  Sustainability
                  <span className="text-emerald-700 block">Simplified</span>
                </h1>
                
                <div className="h-12 flex items-center justify-center lg:justify-start">
                  <p
                    className={`text-lg lg:text-xl text-gray-600 transition-all duration-300 ${
                      isTaglineVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                  >
                    {taglines[currentTagline]}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col gap-2 justify-center lg:justify-start items-center lg:items-start">
                <Button
                  as={Link}
                  href="/explore"
                  variant="primary"
                  size="sm"
                  className="rounded-full gap-2 group hover:scale-105 transition-transform text-sm px-5 py-2"
                >
                  Shop Collections
                  <ShoppingCart className="ml-1 w-4 h-4" />
                </Button>
                <Button
                  as={Link}
                  href="/about"
                  variant="outline"
                  size="sm"
                  className="rounded-full text-sm px-5 py-2"
                >
                  Become a Partner
                </Button>
              </div>
            </div>
            
            {/* Right Side - Top Picks */}
            <div className="slide-up">
              <TopPicksSection compact={true} />
            </div>
          </div>
        </div>
      </section>

      {/* Top Categories Section - Hover Bubbles with animations */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-800 mb-4">Explore Our <span className="text-emerald-700">Categories</span></h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Curated collections for a sustainable lifestyle. Hover to see featured products.</p>
          </div>
          <style>{`@keyframes bubble-emerge{from{opacity:0;transform:scale(0.8) translateY(10px)}to{opacity:1;transform:scale(1) translateY(0)}}.bubble-emerge{animation:bubble-emerge 300ms cubic-bezier(0.175,0.885,0.32,1.275) forwards;opacity:0}`}</style>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              { 
                id: 'home-living', 
                name: 'Home & Living', 
                desc: 'Sustainable home essentials & decor', 
                bgImage: '/home.jpg',
                icon: (
                  <svg width="24" height="24" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.5 0.5L17 5.5V16.5H11V10.5H6V16.5H0V5.5L8.5 0.5Z" fill="currentColor"/>
                  </svg>
                ), 
                color: 'text-emerald-700', 
                badgeBg: 'bg-emerald-100',
                products: [
                  {name: 'Bamboo Kitchen Set', price: '₹1,299', eco: 'Biodegradable'},
                  {name: 'Recycled Glass Jars', price: '₹599', eco: 'Recycled'},
                  {name: 'Natural Linen Pillow', price: '₹899', eco: 'Organic'}
                ]
              },
              { 
                id: 'fashion', 
                name: 'Sustainable Fashion', 
                desc: 'Ethically made clothing & accessories', 
                bgImage: '/products/organic_cotton_t-shirt.png',
                icon: (
                  <svg width="24" height="24" viewBox="0 0 25 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.1425 3.23573L15.2371 3.22876L15.3487 3.23274L15.4612 3.24967L15.5738 3.27955L21.55 5.27163C21.7296 5.33152 21.8885 5.44138 22.0079 5.58833C22.1273 5.73528 22.2024 5.91323 22.2243 6.10133L22.2313 6.21687V11.197C22.2312 11.441 22.1417 11.6765 21.9796 11.8588C21.8175 12.0411 21.5941 12.1576 21.3518 12.1861L21.2352 12.1931H19.2432V19.1653C19.2433 19.6679 19.0535 20.152 18.7118 20.5205C18.3701 20.889 17.9017 21.1147 17.4005 21.1524L17.2511 21.1574H7.29073C6.78815 21.1576 6.30409 20.9678 5.93557 20.626C5.56706 20.2843 5.34133 19.8159 5.30364 19.3147L5.29866 19.1653V12.1931H3.30658C3.06262 12.1931 2.82715 12.1035 2.64484 11.9414C2.46254 11.7793 2.34606 11.5559 2.31752 11.3136L2.31055 11.197V6.21687C2.31048 6.02747 2.36442 5.84197 2.46604 5.68214C2.56765 5.52231 2.71273 5.39476 2.88426 5.31446L2.99184 5.27163L8.96806 3.27955C9.11779 3.22968 9.27724 3.2161 9.43325 3.23994C9.58926 3.26378 9.73738 3.32435 9.86539 3.41667C9.9934 3.50898 10.0976 3.63039 10.1695 3.77089C10.2414 3.91139 10.2789 4.06697 10.2788 4.22479C10.2765 4.74172 10.4752 5.2393 10.833 5.61242C11.1908 5.98554 11.6796 6.20498 12.1962 6.22438C12.7127 6.24377 13.2166 6.06161 13.6013 5.71637C13.9861 5.37112 14.2216 4.88984 14.258 4.3742L14.267 4.13515L14.2839 4.0226L14.3208 3.88913L14.3646 3.78654L14.4144 3.6949L14.4821 3.60227L14.5508 3.52259C14.606 3.46946 14.6641 3.42298 14.7251 3.38314L14.8208 3.33035L14.9234 3.28653L15.0309 3.25465L15.1425 3.23573Z" fill="currentColor"/>
                  </svg>
                ), 
                color: 'text-orange-700', 
                badgeBg: 'bg-orange-100',
                products: [
                  {name: 'Organic Cotton Tee', price: '₹1,199', eco: 'Organic'},
                  {name: 'Hemp Tote Bag', price: '₹799', eco: 'Hemp'},
                  {name: 'Linen Summer Dress', price: '₹2,499', eco: 'Natural'}
                ]
              },
              { 
                id: 'upcycled', 
                name: 'Upcycled & Handmade', 
                desc: 'Reclaimed material goods & crafts', 
                bgImage: '/products/natural_jute_tote_bag.png',
                icon: '🎨', 
                color: 'text-purple-700', 
                badgeBg: 'bg-purple-100',
                products: [
                  {name: 'Recycled Fabric Quilt', price: '₹3,499', eco: 'Upcycled'},
                  {name: 'Handwoven Jute Rug', price: '₹1,899', eco: 'Handmade'},
                  {name: 'Reclaimed Wood Frame', price: '₹699', eco: 'Reclaimed'}
                ]
              },
              { 
                id: 'beauty-personal-care', 
                name: 'Clean Beauty', 
                desc: 'Natural skincare & personal care', 
                bgImage: '/beauty.jpg',
                icon: (
                  <svg width="24" height="24" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M1.59921 1.99719C2.53314 1.06355 3.79964 0.539062 5.1202 0.539062C6.44077 0.539062 7.70727 1.06355 8.64119 1.99719C8.8238 2.17914 9.05886 2.40557 9.34639 2.67649C9.63325 2.40557 9.86798 2.17914 10.0506 1.99719C10.9806 1.07155 12.2383 0.550334 13.5505 0.54682C14.8626 0.543306 16.1231 1.05778 17.0581 1.97843C17.993 2.89908 18.5269 4.15151 18.5436 5.46355C18.5603 6.77559 18.0585 8.04122 17.1473 8.98539L10.0496 16.0831C9.8628 16.2699 9.6095 16.3748 9.34539 16.3748C9.08128 16.3748 8.82798 16.2699 8.64119 16.0831L1.54344 8.98638C0.633098 8.04752 0.128575 6.78826 0.138825 5.48056C0.149075 4.17287 0.674271 2.92167 1.59921 1.99719Z" fill="currentColor"/>
                  </svg>
                ), 
                color: 'text-pink-700', 
                badgeBg: 'bg-pink-100',
                products: [
                  {name: 'Organic Face Serum', price: '₹1,599', eco: 'Vegan'},
                  {name: 'Natural Shampoo Bar', price: '₹449', eco: 'Plastic-Free'},
                  {name: 'Herbal Body Lotion', price: '₹899', eco: 'Cruelty-Free'}
                ]
              },
              { 
                id: 'pets', 
                name: 'Pets', 
                desc: 'Eco-friendly pet care & accessories', 
                bgImage: '/petcare.jpg',
                icon: (
                  <svg viewBox="0 0 64 64" width="24" height="24" fill="currentColor" aria-hidden="true">
                    <circle cx="18" cy="22" r="6"/>
                    <circle cx="28" cy="14" r="6"/>
                    <circle cx="36" cy="14" r="6"/>
                    <circle cx="46" cy="22" r="6"/>
                    <ellipse cx="32" cy="44" rx="16" ry="13"/>
                  </svg>
                ), 
                color: 'text-amber-700', 
                badgeBg: 'bg-amber-100',
                products: [
                  {name: 'Hemp Pet Collar', price: '₹599', eco: 'Natural'},
                  {name: 'Organic Pet Treats', price: '₹349', eco: 'Organic'},
                  {name: 'Bamboo Pet Bowl', price: '₹449', eco: 'Biodegradable'}
                ]
              },
              { 
                id: 'fitness', 
                name: 'Fitness', 
                desc: 'Sustainable fitness & wellness gear', 
                bgImage: '/fitness.jpg',
                icon: '💪', 
                color: 'text-green-700', 
                badgeBg: 'bg-green-100',
                products: [
                  {name: 'Cork Yoga Mat', price: '₹2,199', eco: 'Natural Cork'},
                  {name: 'Hemp Yoga Strap', price: '₹399', eco: 'Hemp'},
                  {name: 'Bamboo Water Bottle', price: '₹899', eco: 'Reusable'}
                ]
              },
            ].map((cat) => (
              <div key={cat.id} className="relative group">
                <div className="bg-white border border-gray-100 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative h-48">
                    <Image 
                      src={cat.bgImage} 
                      alt={cat.name}
                      fill
                      loading="lazy"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <div className="absolute top-4 left-4 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow">
                        {typeof cat.icon === 'string' ? (
                          <span className={`text-xl ${cat.color}`}>{cat.icon}</span>
                        ) : (
                          <div className={cat.color}>{cat.icon}</div>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-white">{cat.name}</h3>
                      <p className="text-sm text-white/90">{cat.desc}</p>
                    </div>
                  </div>
                </div>
                <div className="hidden group-hover:flex absolute top-0 left-[100%] z-20 flex-col items-center justify-center space-y-3" style={{ height: 212, width: 200, marginLeft: -110 }}>
                  {cat.products.map((p, i) => (
                    <div key={p.name} className="bubble-emerge bg-white border border-gray-100 rounded-lg p-3 shadow-lg w-full hover:shadow-xl transition-shadow" style={{ animationDelay: `${i*80}ms` }}>
                      <div className="space-y-1">
                        <h4 className="font-semibold text-sm text-gray-800 truncate">{p.name}</h4>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-base text-emerald-700">{p.price}</span>
                          <span className={`text-xs px-1.5 py-0.5 rounded-full ${cat.badgeBg} ${cat.color} border border-current`}>{p.eco}</span>
          </div>
        </div>
      </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/explore" className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow transition-colors">View All Collections</Link>
          </div>
        </div>
      </section>

      {/* Hot Deals Section */}
      <HotDealsSection />

      {/* Best Sellers Section */}
      <BestSellersSection />


      {/* Product Recommendations - Showcasing Featured Eco Products */}
      <div className="container mx-auto px-4 py-6 sm:py-10 space-y-6 sm:space-y-8">
        <ProductRecommendations 
          type="trending" 
          limit={8}
          title="🌿 Trending Eco Products"
          className=""
        />
        
        <ProductRecommendations 
          type="new-arrivals" 
          limit={8}
          title="🆕 New Sustainable Arrivals"
          className=""
        />
        
        <ProductRecommendations 
          type="top-rated" 
          limit={8}
          title="⭐ Top Rated Green Products"
          className=""
        />
      </div>

      {/* Footer is globally rendered in RootLayout */}
      
      {/* Honeycomb Grid Styles */}
      <style jsx>{`
        .honeycomb-grid {
          position: relative;
          width: 100%;
          max-width: 820px;
          margin: 0 auto;
          padding: 20px 0;
          height: 360px; /* Two rows layout */
        }
        
        .hexagon-wrapper {
          position: absolute;
          width: 174px; /* 144px + 30px */
          height: 282.4px; /* (121.2 + 20px) * 2 = doubled height */
          animation: hexagonSlideIn 0.8s ease-out forwards;
          opacity: 0;
        }
        
        /* First row - 4 cards */
        .hexagon-wrapper:nth-child(1) { top: 0; left: 0; }
        .hexagon-wrapper:nth-child(2) { top: 0; left: 180px; }
        .hexagon-wrapper:nth-child(3) { top: 0; left: 360px; }
        .hexagon-wrapper:nth-child(4) { top: 0; left: 540px; }

        /* Second row - 3 cards centered */
        .hexagon-wrapper:nth-child(5) { top: 220px; left: 90px; }
        .hexagon-wrapper:nth-child(6) { top: 220px; left: 270px; }
        .hexagon-wrapper:nth-child(7) { top: 220px; left: 450px; }
        
        .hexagon-card {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%);
          backdrop-filter: blur(12px);
          border: 2px solid rgba(16, 185, 129, 0.15);
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 8px 12px 12px 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }
        
        .hexagon-card:hover {
          transform: scale(1.08) translateY(-3px);
          border-color: rgba(16, 185, 129, 0.3);
          box-shadow: 0 12px 28px rgba(16, 185, 129, 0.2);
        }
        
        .hexagon-image-container {
          position: relative;
          width: 70px;
          height: 70px;
          margin-bottom: 8px;
          border-radius: 50%;
          overflow: hidden;
          background: white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }
        
        .hexagon-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        
        .hexagon-card:hover .hexagon-image {
          transform: scale(1.15);
        }
        
        .hexagon-eco-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 8px;
          font-weight: bold;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .hexagon-content {
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          width: 100%;
          flex: 1;
        }
        
        .hexagon-title {
          font-size: 11px;
          font-weight: 600;
          color: #1f2937;
          margin: 0 0 4px 0;
          line-height: 1.2;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .hexagon-price {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          margin: 2px 0;
        }
        
        .price-current {
          font-size: 12px;
          font-weight: 700;
          color: #10b981;
        }
        
        .price-original {
          font-size: 8px;
          color: #9ca3af;
          text-decoration: line-through;
        }
        
        .hexagon-badges {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 2px;
          margin-top: 2px;
        }
        
        .hexagon-badge {
          font-size: 6px;
          padding: 2px 4px;
          background: rgba(16, 185, 129, 0.1);
          color: #059669;
          border-radius: 4px;
          font-weight: 500;
        }
        
        .hexagon-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(16, 185, 129, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
        
        .hexagon-card:hover .hexagon-overlay {
          opacity: 1;
        }
        
        .hexagon-button {
          background: white !important;
          color: #10b981 !important;
          border: none !important;
          font-size: 10px !important;
          padding: 4px 8px !important;
          border-radius: 10px !important;
          font-weight: 600 !important;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
        }
        
        .hexagon-button:hover {
          background: #f0fdf4 !important;
          transform: scale(1.05) !important;
        }
        
        @keyframes hexagonSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        /* Responsive adjustments */
        @media (max-width: 1024px) {
          .honeycomb-grid {
            max-width: 640px;
            height: 320px;
          }
          .hexagon-wrapper {
            width: 154px; /* 124px + 30px */
            height: 247.8px; /* (103.9 + 20px) * 2 */
          }
          /* 4 + 3 layout */
          .hexagon-wrapper:nth-child(1) { top: 0; left: 0; }
          .hexagon-wrapper:nth-child(2) { top: 0; left: 160px; }
          .hexagon-wrapper:nth-child(3) { top: 0; left: 320px; }
          .hexagon-wrapper:nth-child(4) { top: 0; left: 480px; }
          .hexagon-wrapper:nth-child(5) { top: 200px; left: 80px; }
          .hexagon-wrapper:nth-child(6) { top: 200px; left: 240px; }
          .hexagon-wrapper:nth-child(7) { top: 200px; left: 400px; }
          .hexagon-image-container { width: 60px; height: 60px; }
        }
        
        @media (max-width: 768px) {
          .honeycomb-grid { max-width: 480px; height: 300px; }
          
          .hexagon-wrapper {
            width: 134px; /* 104px + 30px */
            height: 213.2px; /* (86.6 + 20px) * 2 = doubled height */
          }
          
          /* 3 + 2 layout for small screens */
          .hexagon-wrapper:nth-child(1) { top: 0; left: 0; }
          .hexagon-wrapper:nth-child(2) { top: 0; left: 140px; }
          .hexagon-wrapper:nth-child(3) { top: 0; left: 280px; }
          .hexagon-wrapper:nth-child(4) { top: 170px; left: 70px; }
          .hexagon-wrapper:nth-child(5) { top: 170px; left: 210px; }
          
          .hexagon-image-container {
            width: 50px;
            height: 50px;
          }
          
          .hexagon-title {
            font-size: 9px;
          }
          
          .price-current {
            font-size: 10px;
          }
          
          .price-original {
            font-size: 7px;
          }
        }
        
        @media (max-width: 640px) {
          .honeycomb-grid { max-width: 360px; height: 280px; }
          
          .hexagon-wrapper {
            width: 114px; /* 84px + 30px */
            height: 178.6px; /* (69.3 + 20px) * 2 = doubled height */
          }
          
          /* 2 + 2 layout for mobile */
          .hexagon-wrapper:nth-child(1) { top: 0; left: 0; }
          .hexagon-wrapper:nth-child(2) { top: 0; left: 120px; }
          .hexagon-wrapper:nth-child(3) { top: 150px; left: 60px; }
          .hexagon-wrapper:nth-child(4) { top: 150px; left: 180px; }
          
          .hexagon-image-container {
            width: 40px;
            height: 40px;
          }
          
          .hexagon-title {
            font-size: 8px;
          }
          
          .price-current {
            font-size: 9px;
          }
          
          .price-original {
            font-size: 6px;
          }
        }
      `}</style>
    </div>
  );
}
