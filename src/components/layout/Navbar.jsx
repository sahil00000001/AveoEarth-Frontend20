"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { auth, tokens } from "../../lib/api";
import UserProfilePopup from "../ui/UserProfilePopup";
import MiniCart from "../cart/MiniCart";
import { useCart } from "../../hooks/useCart";

const ArtisanTicker = dynamic(() => import("./ArtisanTicker"), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-[160px] bg-gradient-to-r from-amber-50 via-stone-100 to-amber-50 border-b border-stone-200">
      <span className="text-stone-600 text-xs">Loading artisan scenes...</span>
    </div>
  )
});

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.35-4.35"/>
  </svg>
);

const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const ChevronDownIcon = ({ color = "#666666" }) => (
  <svg width="7" height="4" viewBox="0 0 7 4" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.5 4L0 0H7L3.5 4Z" fill={color}/>
  </svg>
);

const VendorProfile = ({ isLoggedIn, userProfile }) => {
  const [isVendorPopupOpen, setIsVendorPopupOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const handleSignOut = () => {
    tokens.clear();
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsVendorPopupOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  return (
    <div className="flex items-center gap-4">
      {isLoggedIn && (
        <motion.div 
          className="relative"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#666" strokeWidth="2" strokeLinecap="round"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#666" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[9px] rounded-full w-3.5 h-3.5 flex items-center justify-center font-bold">6</span>
        </motion.div>
      )}
      
      {isLoggedIn ? (
        <div className="relative" ref={dropdownRef}>
          <motion.div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setIsVendorPopupOpen(!isVendorPopupOpen)}
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
              {userProfile?.avatar_url ? (
                <img src={userProfile.avatar_url} alt="Profile" className="w-full h-full object-cover"/>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="white" strokeWidth="2"/>
                  <circle cx="12" cy="7" r="4" stroke="white" strokeWidth="2"/>
                </svg>
              )}
            </div>
            <div className="text-right hidden md:block">
              <div className="text-[11px] text-gray-800 font-semibold leading-tight">
                {userProfile?.first_name || "User"}
              </div>
              <div className="text-[9px] text-gray-500">
                {userProfile?.user_type?.charAt(0).toUpperCase() + userProfile?.user_type?.slice(1) || "User"}
              </div>
            </div>
            <ChevronDownIcon color="#818181" />
          </motion.div>
          
          <AnimatePresence>
            {isVendorPopupOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 top-full mt-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50 overflow-hidden"
              >
                <Link 
                  href="/vendor/dashboard" 
                  className="flex items-center px-3 py-2 text-[11px] text-gray-700 hover:bg-emerald-50 transition-colors"
                  onClick={() => setIsVendorPopupOpen(false)}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="mr-2">
                    <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
                    <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
                    <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
                    <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Dashboard
                </Link>
                <div className="border-t border-gray-100"></div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center w-full px-3 py-2 text-[11px] text-red-500 hover:bg-red-50 transition-colors"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="mr-2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="2"/>
                    <polyline points="16,17 21,12 16,7" stroke="currentColor" strokeWidth="2"/>
                    <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Sign Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
          <Link href="/signup" className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-4 py-1.5 rounded-full text-[11px] font-medium transition-all shadow-sm hover:shadow-md">
            Join Community
          </Link>
        </motion.div>
      )}
    </div>
  );
};

const NavLink = ({ href, children, isActive }) => (
  <Link href={href}>
    <motion.span 
      className={`relative text-[13px] font-medium cursor-pointer transition-colors ${isActive ? 'text-emerald-600' : 'text-gray-600 hover:text-emerald-600'}`}
      whileHover={{ y: -1 }}
    >
      {children}
      {isActive && (
        <motion.div 
          layoutId="activeNav"
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald-500 rounded-full"
        />
      )}
    </motion.span>
  </Link>
);

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart } = useCart();
  const pathname = usePathname();
  const router = useRouter();
  
  const isVendorDashboard = pathname?.startsWith('/vendor');

  const navItems = [
    { href: "/category", label: "Categories" },
    { href: "/explore?sort=new", label: "New" },
    { href: "/explore?sort=popular", label: "Best Sellers" },
    { href: "/community", label: "Community" },
    { href: "/about", label: "About" },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/explore?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/explore');
    }
  };

  useEffect(() => {
    setIsClient(true);
    const userTokens = tokens.get();
    const loggedIn = !!userTokens?.access_token;
    setIsLoggedIn(loggedIn);
    
    if (loggedIn && userTokens?.access_token) {
      auth.getProfile(userTokens.access_token)
        .then(profile => setUserProfile(profile))
        .catch(error => console.error('Failed to fetch user profile:', error));
    }
    
    const onTokensChanged = (ev) => {
      const toks = ev?.detail || tokens.get();
      const nowLoggedIn = !!toks?.access_token;
      setIsLoggedIn(nowLoggedIn);
      if (nowLoggedIn && toks?.access_token) {
        auth.getProfile(toks.access_token)
          .then(profile => setUserProfile(profile))
          .catch(() => setUserProfile(null));
      } else {
        setUserProfile(null);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('ae_tokens_changed', onTokensChanged);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('ae_tokens_changed', onTokensChanged);
      }
    };
  }, []);

  return (
    <div className="w-full fixed top-0 left-0 z-50">
      {!isVendorDashboard && <ArtisanTicker />}

      <div className="bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-12 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-1.5">
              <motion.div 
                whileHover={{ rotate: 10 }}
                className="w-6 h-6"
              >
                <Image src="/logo.png" alt="AveoEarth" width={24} height={24} className="w-full h-full object-contain" />
              </motion.div>
              <span className="text-base font-semibold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent hidden sm:block">
                AveoEarth
              </span>
            </Link>

            {!isVendorDashboard && (
              <nav className="hidden lg:flex items-center gap-5">
                {navItems.map((item) => (
                  <NavLink 
                    key={item.href} 
                    href={item.href}
                    isActive={pathname === item.href || pathname?.startsWith(item.href.split('?')[0])}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            )}
          </div>

          <div className="flex items-center gap-3">
            {!isVendorDashboard && (
              <motion.form 
                onSubmit={handleSearchSubmit}
                className={`hidden md:flex items-center transition-all duration-300 ${isSearchFocused ? 'w-56' : 'w-44'}`}
                animate={{ width: isSearchFocused ? 224 : 176 }}
              >
                <div className={`flex items-center w-full bg-gray-50 rounded-full px-3 py-1.5 border transition-all duration-200 ${isSearchFocused ? 'border-emerald-300 shadow-sm' : 'border-transparent'}`}>
                  <SearchIcon />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    placeholder="Search..."
                    className="ml-2 bg-transparent outline-none text-[13px] text-gray-700 placeholder-gray-400 w-full"
                  />
                </div>
              </motion.form>
            )}

            {isClient && (
              <>
                {isVendorDashboard ? (
                  <VendorProfile isLoggedIn={isLoggedIn} userProfile={userProfile} />
                ) : (
                  <>
                    <MiniCart />
                    <div className="relative">
                      <motion.button 
                        onClick={() => setIsUserPopupOpen(!isUserPopupOpen)}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                      </motion.button>
                      <UserProfilePopup 
                        isOpen={isUserPopupOpen}
                        onClose={() => setIsUserPopupOpen(false)}
                        isLoggedIn={isLoggedIn}
                        userProfile={userProfile}
                      />
                    </div>
                  </>
                )}
              </>
            )}

            {!isVendorDashboard && (
              <motion.button
                className="lg:hidden w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileTap={{ scale: 0.95 }}
              >
                {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </motion.button>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && !isVendorDashboard && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-gray-100 shadow-lg overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              <form onSubmit={handleSearchSubmit} className="mb-3">
                <div className="flex items-center bg-gray-50 rounded-full px-3 py-2 border border-gray-200">
                  <SearchIcon />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="ml-2 bg-transparent outline-none text-[11px] text-gray-700 placeholder-gray-400 w-full"
                  />
                </div>
              </form>
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link 
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 text-[12px] text-gray-700 hover:text-emerald-600 font-medium transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
