"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { 
  Check, 
  X, 
  Sparkles, 
  Crown, 
  Gem, 
  Star,
  Zap,
  TrendingUp,
  Shield,
  Clock,
  Gift,
  ArrowRight,
  ChevronDown
} from "lucide-react";
import Link from "next/link";

const subscriptionTiers = [
  {
    id: "free",
    name: "Free",
    price: 0,
    icon: Star,
    color: "from-gray-400 to-gray-600",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200",
    textColor: "text-gray-600",
    offer: null,
    paymentCycle: "T+30",
    refundPeriod: "7 Days",
    features: {
      heroSection: { included: false, text: "Not Included" },
      secondPage: { included: false, text: "Not Included" },
      listingVisibility: "Basic Profile Listing (up to 10 SKUs)",
      prioritySupport: false,
      analytics: false,
      categoryBoost: false,
    },
    popular: false,
  },
  {
    id: "premium",
    name: "Premium",
    price: 1999,
    icon: Zap,
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-600",
    offer: "3+1",
    offerText: "Pay for 3 months, get 1 month FREE",
    paymentCycle: "T+21",
    refundPeriod: "7 Days",
    features: {
      heroSection: { included: true, text: "10% discount on listing" },
      secondPage: { included: true, text: "1 product for 1 day, every fortnight" },
      listingVisibility: "Priority Listing (up to 25 SKUs)",
      prioritySupport: true,
      analytics: false,
      categoryBoost: false,
    },
    popular: false,
  },
  {
    id: "gold",
    name: "Gold",
    price: 2999,
    icon: Crown,
    color: "from-amber-400 to-orange-500",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-300",
    textColor: "text-amber-600",
    offer: "6+1",
    offerText: "Pay for 6 months, get 1 month FREE",
    paymentCycle: "T+15",
    refundPeriod: "7 Days",
    features: {
      heroSection: { included: true, text: "1 day/month + 15% discount" },
      secondPage: { included: true, text: "1 product for 1 day, every fortnight" },
      listingVisibility: "Unlimited Listings + Category Boost",
      prioritySupport: true,
      analytics: true,
      categoryBoost: true,
    },
    popular: true,
  },
  {
    id: "platinum",
    name: "Platinum",
    price: 4999,
    icon: Gem,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-300",
    textColor: "text-purple-600",
    offer: "12+2",
    offerText: "Pay for 12 months, get 2 months FREE",
    paymentCycle: "T+15",
    refundPeriod: "7 Days",
    features: {
      heroSection: { included: true, text: "2 days/month OR 2 products + 20% discount" },
      secondPage: { included: true, text: "1 product for 1 day, every week" },
      listingVisibility: "Featured Placement + Unlimited Listings",
      prioritySupport: true,
      analytics: true,
      categoryBoost: true,
    },
    popular: false,
  },
];

const featuresList = [
  { key: "listingVisibility", label: "Listing Visibility", icon: TrendingUp },
  { key: "heroSection", label: "Hero Section Listing", icon: Sparkles },
  { key: "secondPage", label: "2nd Page Listing", icon: Star },
  { key: "paymentCycle", label: "Payment Cycle", icon: Clock },
  { key: "prioritySupport", label: "Priority Support", icon: Shield },
  { key: "analytics", label: "Advanced Analytics", icon: TrendingUp },
  { key: "categoryBoost", label: "Category Boost", icon: Zap },
];

function FloatingParticle({ delay, duration, x, y }) {
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-olive-400 to-amber-400 opacity-40"
      initial={{ x, y, scale: 0 }}
      animate={{
        y: [y, y - 100, y],
        x: [x, x + 30, x],
        scale: [0, 1, 0],
        opacity: [0, 0.6, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function PricingCard({ tier, index, isSelected, onSelect }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);
  const Icon = tier.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, rotateY: -10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ 
        scale: 1.02, 
        y: -10,
        transition: { duration: 0.3 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onSelect(tier.id)}
      className={`relative cursor-pointer perspective-1000 ${tier.popular ? 'z-10' : 'z-0'}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {tier.popular && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-4 left-1/2 -translate-x-1/2 z-20"
        >
          <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            MOST POPULAR
          </span>
        </motion.div>
      )}

      {tier.offer && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute -top-2 -right-2 z-20"
        >
          <span className="bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
            <Gift className="w-3 h-3" />
            {tier.offer}
          </span>
        </motion.div>
      )}

      <motion.div
        className={`relative overflow-hidden rounded-2xl sm:rounded-3xl border-2 transition-all duration-300 ${
          isSelected 
            ? `${tier.borderColor} ring-4 ring-offset-2 ring-olive-400/50` 
            : 'border-gray-100 hover:border-gray-200'
        } ${tier.bgColor} shadow-xl`}
        animate={{
          boxShadow: isHovered 
            ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)" 
            : "0 10px 40px -15px rgba(0, 0, 0, 0.1)"
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${tier.color} opacity-20 blur-2xl`}
            animate={{
              scale: isHovered ? 1.5 : 1,
              opacity: isHovered ? 0.3 : 0.2,
            }}
          />
        </div>

        <div className="relative p-6 sm:p-8">
          <div className="flex items-center justify-between mb-4">
            <motion.div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tier.color} flex items-center justify-center shadow-lg`}
              whileHover={{ rotate: 10, scale: 1.1 }}
            >
              <Icon className="w-6 h-6 text-white" />
            </motion.div>
            <span className={`text-sm font-medium ${tier.textColor} uppercase tracking-wider`}>
              {tier.name}
            </span>
          </div>

          <div className="mb-6">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl sm:text-5xl font-black text-gray-900">
                ₹{tier.price.toLocaleString()}
              </span>
              <span className="text-gray-500 font-medium">/month</span>
            </div>
            {tier.offerText && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-green-600 font-medium mt-2 flex items-center gap-1"
              >
                <Gift className="w-4 h-4" />
                {tier.offerText}
              </motion.p>
            )}
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3">
              <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${tier.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                <Check className="w-3 h-3 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Listing</p>
                <p className="text-xs text-gray-500">{tier.features.listingVisibility}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              {tier.features.heroSection.included ? (
                <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${tier.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <Check className="w-3 h-3 text-white" />
                </div>
              ) : (
                <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <X className="w-3 h-3 text-gray-400" />
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-gray-900">Hero Section</p>
                <p className="text-xs text-gray-500">{tier.features.heroSection.text}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              {tier.features.secondPage.included ? (
                <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${tier.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <Check className="w-3 h-3 text-white" />
                </div>
              ) : (
                <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <X className="w-3 h-3 text-gray-400" />
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-gray-900">2nd Page Listing</p>
                <p className="text-xs text-gray-500">{tier.features.secondPage.text}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${tier.color} flex items-center justify-center flex-shrink-0`}>
                <Clock className="w-3 h-3 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Payment: {tier.paymentCycle}</p>
              </div>
            </div>

            {tier.features.prioritySupport && (
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${tier.color} flex items-center justify-center flex-shrink-0`}>
                  <Shield className="w-3 h-3 text-white" />
                </div>
                <p className="text-sm font-medium text-gray-900">Priority Support</p>
              </div>
            )}

            {tier.features.analytics && (
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${tier.color} flex items-center justify-center flex-shrink-0`}>
                  <TrendingUp className="w-3 h-3 text-white" />
                </div>
                <p className="text-sm font-medium text-gray-900">Advanced Analytics</p>
              </div>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3 px-6 rounded-xl font-semibold text-white bg-gradient-to-r ${tier.color} shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2`}
          >
            {tier.price === 0 ? "Get Started Free" : "Subscribe Now"}
            <ArrowRight className="w-4 h-4" />
          </motion.button>

          <p className="text-center text-xs text-gray-400 mt-3">
            {tier.refundPeriod} refund policy
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ComparisonTable() {
  const [isOpen, setIsOpen] = useState(false);
  const tableRef = useRef(null);
  const isInView = useInView(tableRef, { once: true });

  return (
    <motion.div
      ref={tableRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="mt-16 sm:mt-24"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:border-olive-200 transition-all group"
      >
        <span className="font-semibold text-gray-800">View Detailed Comparison</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-olive-600" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            <div className="mt-6 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="bg-gradient-to-r from-olive-50 to-amber-50">
                    <th className="py-4 px-6 text-left font-semibold text-gray-700">Feature</th>
                    {subscriptionTiers.map((tier) => (
                      <th key={tier.id} className="py-4 px-6 text-center">
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${tier.color} text-white font-semibold text-sm`}>
                          <tier.icon className="w-4 h-4" />
                          {tier.name}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-100">
                    <td className="py-4 px-6 font-medium text-gray-700">Price</td>
                    {subscriptionTiers.map((tier) => (
                      <td key={tier.id} className="py-4 px-6 text-center">
                        <span className="font-bold text-gray-900">₹{tier.price.toLocaleString()}</span>
                        <span className="text-gray-500 text-sm">/mo</span>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t border-gray-100 bg-gray-50/50">
                    <td className="py-4 px-6 font-medium text-gray-700">Introductory Offer</td>
                    {subscriptionTiers.map((tier) => (
                      <td key={tier.id} className="py-4 px-6 text-center">
                        {tier.offer ? (
                          <span className="text-green-600 font-medium text-sm">{tier.offerText}</span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="py-4 px-6 font-medium text-gray-700">Payment Cycle</td>
                    {subscriptionTiers.map((tier) => (
                      <td key={tier.id} className="py-4 px-6 text-center font-medium text-gray-900">
                        {tier.paymentCycle}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t border-gray-100 bg-gray-50/50">
                    <td className="py-4 px-6 font-medium text-gray-700">Listing Visibility</td>
                    {subscriptionTiers.map((tier) => (
                      <td key={tier.id} className="py-4 px-6 text-center text-sm text-gray-700">
                        {tier.features.listingVisibility}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="py-4 px-6 font-medium text-gray-700">Hero Section</td>
                    {subscriptionTiers.map((tier) => (
                      <td key={tier.id} className="py-4 px-6 text-center">
                        {tier.features.heroSection.included ? (
                          <span className="text-sm text-gray-700">{tier.features.heroSection.text}</span>
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t border-gray-100 bg-gray-50/50">
                    <td className="py-4 px-6 font-medium text-gray-700">2nd Page Listing</td>
                    {subscriptionTiers.map((tier) => (
                      <td key={tier.id} className="py-4 px-6 text-center">
                        {tier.features.secondPage.included ? (
                          <span className="text-sm text-gray-700">{tier.features.secondPage.text}</span>
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="py-4 px-6 font-medium text-gray-700">Priority Support</td>
                    {subscriptionTiers.map((tier) => (
                      <td key={tier.id} className="py-4 px-6 text-center">
                        {tier.features.prioritySupport ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t border-gray-100 bg-gray-50/50">
                    <td className="py-4 px-6 font-medium text-gray-700">Advanced Analytics</td>
                    {subscriptionTiers.map((tier) => (
                      <td key={tier.id} className="py-4 px-6 text-center">
                        {tier.features.analytics ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="py-4 px-6 font-medium text-gray-700">Category Boost</td>
                    {subscriptionTiers.map((tier) => (
                      <td key={tier.id} className="py-4 px-6 text-center">
                        {tier.features.categoryBoost ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function SubscriptionPage() {
  const [selectedTier, setSelectedTier] = useState("gold");
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  return (
    <div className="min-h-screen bg-gradient-to-b from-olive-50/50 via-white to-amber-50/30 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <FloatingParticle
            key={i}
            delay={i * 0.5}
            duration={8 + Math.random() * 4}
            x={Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200)}
            y={Math.random() * 800}
          />
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-[10%] w-96 h-96 bg-gradient-to-br from-olive-200/30 to-amber-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-[5%] w-80 h-80 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-olive-200/20 rounded-full" />
      </div>

      <section ref={heroRef} className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-block mb-4"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-olive-500 to-amber-500 flex items-center justify-center shadow-xl">
                <Crown className="w-8 h-8 text-white" />
              </div>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
              Choose Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-olive-600 via-amber-500 to-olive-600">
                Growth Plan
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Unlock premium features and grow your sustainable business with AveoEarth. 
              Select the plan that fits your needs.
            </p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 px-6 py-3 rounded-full border border-green-200"
            >
              <Shield className="w-5 h-5 text-green-600" />
              <span className="text-green-700 font-medium">7-Day Money Back Guarantee on all plans</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative py-8 sm:py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {subscriptionTiers.map((tier, index) => (
              <PricingCard
                key={tier.id}
                tier={tier}
                index={index}
                isSelected={selectedTier === tier.id}
                onSelect={setSelectedTier}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <ComparisonTable />
        </div>
      </section>

      <section className="relative py-16 sm:py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-olive-600 to-olive-700 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-amber-400/20 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to grow your sustainable business?
              </h2>
              <p className="text-olive-100 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of eco-conscious suppliers on AveoEarth and reach millions of conscious consumers.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/become-supplier"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-olive-700 font-bold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  <span>Become a Supplier</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-olive-500/30 text-white font-semibold rounded-full border border-white/30 hover:bg-olive-500/50 transition-all duration-300"
                >
                  <span>Contact Sales</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative py-12 sm:py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4 text-left">
            {[
              {
                q: "Can I switch plans later?",
                a: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
              },
              {
                q: "What is the payment cycle (T+15, T+21, T+30)?",
                a: "The payment cycle indicates when your earnings are released. T+15 means 15 days after the transaction, T+21 is 21 days, and T+30 is 30 days."
              },
              {
                q: "What is Hero Section Listing?",
                a: "Hero Section is the premium placement area on our homepage that gets maximum visibility. Featured products here get significantly more views and conversions."
              },
              {
                q: "Is there a refund policy?",
                a: "Yes, all plans come with a 7-day refund policy. If you're not satisfied, you can request a full refund within 7 days of subscription."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100"
              >
                <h4 className="font-semibold text-gray-900 mb-2">{faq.q}</h4>
                <p className="text-gray-600">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
