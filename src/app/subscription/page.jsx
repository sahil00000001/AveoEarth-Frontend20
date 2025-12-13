"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { 
  Check, 
  X, 
  Sparkles, 
  Crown, 
  Star,
  TrendingUp,
  Shield,
  Clock,
  Gift,
  ArrowRight,
  ChevronDown,
  Leaf,
  TreePine,
  Sprout,
  Sun
} from "lucide-react";
import Link from "next/link";

const subscriptionTiers = [
  {
    id: "free",
    name: "Seed",
    price: 0,
    icon: Sprout,
    color: "from-stone-400 to-stone-500",
    bgColor: "bg-stone-50",
    borderColor: "border-stone-200",
    textColor: "text-stone-600",
    offer: null,
    paymentCycle: "T+30",
    refundPeriod: "7 Days",
    features: {
      heroSection: { included: false, text: "Not Included" },
      secondPage: { included: false, text: "Not Included" },
      listingVisibility: "Basic Profile (up to 10 SKUs)",
      prioritySupport: false,
      analytics: false,
    },
    popular: false,
  },
  {
    id: "premium",
    name: "Sprout",
    price: 1999,
    icon: Leaf,
    color: "from-olive-500 to-olive-600",
    bgColor: "bg-olive-50",
    borderColor: "border-olive-300",
    textColor: "text-olive-600",
    offer: "3+1",
    offerText: "Pay for 3 months, get 1 FREE",
    paymentCycle: "T+21",
    refundPeriod: "7 Days",
    features: {
      heroSection: { included: true, text: "10% discount on listing" },
      secondPage: { included: true, text: "1 product/day, every fortnight" },
      listingVisibility: "Priority Listing (up to 25 SKUs)",
      prioritySupport: true,
      analytics: false,
    },
    popular: false,
  },
  {
    id: "gold",
    name: "Bloom",
    price: 2999,
    icon: Sun,
    color: "from-amber-400 to-amber-500",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-300",
    textColor: "text-amber-600",
    offer: "6+1",
    offerText: "Pay for 6 months, get 1 FREE",
    paymentCycle: "T+15",
    refundPeriod: "7 Days",
    features: {
      heroSection: { included: true, text: "1 day/month + 15% discount" },
      secondPage: { included: true, text: "1 product/day, every fortnight" },
      listingVisibility: "Unlimited Listings + Category Boost",
      prioritySupport: true,
      analytics: true,
    },
    popular: true,
  },
  {
    id: "platinum",
    name: "Forest",
    price: 4999,
    icon: TreePine,
    color: "from-olive-600 to-olive-700",
    bgColor: "bg-olive-100",
    borderColor: "border-olive-400",
    textColor: "text-olive-700",
    offer: "12+2",
    offerText: "Pay for 12 months, get 2 FREE",
    paymentCycle: "T+15",
    refundPeriod: "7 Days",
    features: {
      heroSection: { included: true, text: "2 days/month + 20% discount" },
      secondPage: { included: true, text: "1 product/day, every week" },
      listingVisibility: "Featured Placement + Unlimited",
      prioritySupport: true,
      analytics: true,
    },
    popular: false,
  },
];

function FloatingLeaf({ delay, left, top, size }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${left}%`, top: `${top}%` }}
      animate={{
        y: [0, -40, 0],
        x: [0, 10, 0],
        rotate: [0, 20, 0],
        opacity: [0.4, 0.7, 0.4],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <Leaf size={size} className="text-olive-400/60" />
    </motion.div>
  );
}

function PricingCard({ tier, index, isSelected, onSelect }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const Icon = tier.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={() => onSelect(tier.id)}
      className={`relative cursor-pointer ${tier.popular ? 'z-10 lg:-mt-4 lg:mb-4' : ''}`}
    >
      {tier.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
          <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            MOST POPULAR
          </span>
        </div>
      )}

      {tier.offer && (
        <div className="absolute -top-2 -right-2 z-20">
          <span className="bg-gradient-to-r from-olive-500 to-olive-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
            <Gift className="w-3 h-3" />
            {tier.offer}
          </span>
        </div>
      )}

      <motion.div
        whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
        className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
          isSelected 
            ? `${tier.borderColor} ring-4 ring-offset-2 ring-olive-400/30` 
            : 'border-white/80 hover:border-olive-200'
        } ${tier.bgColor} shadow-xl backdrop-blur-sm`}
      >
        <div className={`absolute -top-16 -right-16 w-32 h-32 rounded-full bg-gradient-to-br ${tier.color} opacity-20 blur-2xl`} />
        
        <div className="relative p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tier.color} flex items-center justify-center shadow-lg`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <span className={`text-sm font-bold ${tier.textColor} uppercase tracking-wider`}>
              {tier.name}
            </span>
          </div>

          <div className="mb-5">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-gray-900">
                ₹{tier.price.toLocaleString()}
              </span>
              <span className="text-gray-500 font-medium">/month</span>
            </div>
            {tier.offerText && (
              <p className="text-sm text-olive-600 font-semibold mt-2 flex items-center gap-1 bg-olive-100/50 px-2 py-1 rounded-lg w-fit">
                <Gift className="w-3 h-3" />
                {tier.offerText}
              </p>
            )}
          </div>

          <div className="space-y-2.5 mb-5">
            <div className="flex items-start gap-2">
              <div className={`w-5 h-5 rounded-md bg-gradient-to-br ${tier.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                <Check className="w-3 h-3 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Listing</p>
                <p className="text-xs text-gray-500">{tier.features.listingVisibility}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              {tier.features.heroSection.included ? (
                <div className={`w-5 h-5 rounded-md bg-gradient-to-br ${tier.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <Check className="w-3 h-3 text-white" />
                </div>
              ) : (
                <div className="w-5 h-5 rounded-md bg-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <X className="w-3 h-3 text-gray-400" />
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-gray-800">Hero Section</p>
                <p className="text-xs text-gray-500">{tier.features.heroSection.text}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className={`w-5 h-5 rounded-md bg-gradient-to-br ${tier.color} flex items-center justify-center flex-shrink-0`}>
                <Clock className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">Payment: {tier.paymentCycle}</span>
            </div>

            {tier.features.prioritySupport && (
              <div className="flex items-center gap-2">
                <div className={`w-5 h-5 rounded-md bg-gradient-to-br ${tier.color} flex items-center justify-center flex-shrink-0`}>
                  <Shield className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">Priority Support</span>
              </div>
            )}

            {tier.features.analytics && (
              <div className="flex items-center gap-2">
                <div className={`w-5 h-5 rounded-md bg-gradient-to-br ${tier.color} flex items-center justify-center flex-shrink-0`}>
                  <TrendingUp className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">Advanced Analytics</span>
              </div>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3 px-6 rounded-xl font-bold text-white bg-gradient-to-r ${tier.color} shadow-lg flex items-center justify-center gap-2 group`}
          >
            {tier.price === 0 ? "Start Free" : "Choose Plan"}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          <p className="text-center text-xs text-gray-400 mt-2">
            {tier.refundPeriod} refund policy
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ComparisonTable() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-12">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-olive-100 hover:border-olive-300 transition-all"
      >
        <span className="font-bold text-gray-800">View Detailed Comparison</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="w-5 h-5 text-olive-600" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-olive-100 overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="bg-gradient-to-r from-olive-50 to-amber-50">
                    <th className="py-4 px-4 text-left font-bold text-gray-700">Feature</th>
                    {subscriptionTiers.map((tier) => (
                      <th key={tier.id} className="py-4 px-4 text-center">
                        <div className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-to-r ${tier.color} text-white font-bold text-sm`}>
                          <tier.icon className="w-3 h-3" />
                          {tier.name}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-olive-100">
                    <td className="py-3 px-4 font-medium text-gray-700">Price</td>
                    {subscriptionTiers.map((tier) => (
                      <td key={tier.id} className="py-3 px-4 text-center font-bold text-gray-900">
                        ₹{tier.price.toLocaleString()}/mo
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t border-olive-100 bg-olive-50/30">
                    <td className="py-3 px-4 font-medium text-gray-700">Payment Cycle</td>
                    {subscriptionTiers.map((tier) => (
                      <td key={tier.id} className="py-3 px-4 text-center font-bold text-gray-900">
                        {tier.paymentCycle}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t border-olive-100">
                    <td className="py-3 px-4 font-medium text-gray-700">Priority Support</td>
                    {subscriptionTiers.map((tier) => (
                      <td key={tier.id} className="py-3 px-4 text-center">
                        {tier.features.prioritySupport ? (
                          <Check className="w-5 h-5 text-olive-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t border-olive-100 bg-olive-50/30">
                    <td className="py-3 px-4 font-medium text-gray-700">Analytics</td>
                    {subscriptionTiers.map((tier) => (
                      <td key={tier.id} className="py-3 px-4 text-center">
                        {tier.features.analytics ? (
                          <Check className="w-5 h-5 text-olive-500 mx-auto" />
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
    </div>
  );
}

export default function SubscriptionPage() {
  const [selectedTier, setSelectedTier] = useState("gold");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-olive-50/50 via-white to-amber-50/30 relative overflow-hidden">
      {mounted && (
        <>
          <FloatingLeaf delay={0} left={5} top={20} size={24} />
          <FloatingLeaf delay={2} left={90} top={30} size={20} />
          <FloatingLeaf delay={4} left={15} top={60} size={18} />
          <FloatingLeaf delay={6} left={85} top={70} size={22} />
        </>
      )}

      <div className="absolute top-20 left-[10%] w-80 h-80 bg-olive-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 right-[10%] w-60 h-60 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />

      <section className="relative pt-24 pb-10 px-4 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="inline-block mb-4"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-olive-500 to-olive-700 flex items-center justify-center shadow-xl">
                <TreePine className="w-8 h-8 text-white" />
              </div>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
              Grow Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-olive-600 to-amber-500">
                Sustainable
              </span>{" "}
              Business
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
              Join AveoEarth&apos;s eco-conscious marketplace. Choose the plan that fits your journey from seed to forest.
            </p>

            <div className="inline-flex items-center gap-2 bg-olive-100 px-5 py-2.5 rounded-full border border-olive-200">
              <Shield className="w-5 h-5 text-olive-600" />
              <span className="text-olive-700 font-medium">7-Day Money Back Guarantee</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative py-8 px-4 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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

      <section className="relative py-8 px-4 z-10">
        <div className="max-w-5xl mx-auto">
          <ComparisonTable />
        </div>
      </section>

      <section className="relative py-16 px-4 z-10">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-olive-600 to-olive-800 rounded-3xl p-8 sm:p-10 text-center shadow-2xl overflow-hidden relative"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-400/20 rounded-full blur-2xl" />
            
            <div className="relative z-10">
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-white/20 flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Ready to grow your sustainable business?
              </h2>
              <p className="text-olive-100 mb-6 max-w-lg mx-auto">
                Join thousands of eco-conscious suppliers and reach millions of conscious consumers.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/vendor/onboarding"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-olive-700 font-bold rounded-full shadow-lg hover:shadow-xl transition-all group"
                >
                  Become a Supplier
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 text-white font-medium rounded-full border border-white/30 hover:bg-white/30 transition-all"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative py-12 px-4 z-10">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h3>
          <div className="space-y-3">
            {[
              { q: "Can I switch plans later?", a: "Yes, you can upgrade or downgrade anytime. Changes reflect in your next billing cycle." },
              { q: "What is the payment cycle?", a: "T+15 means earnings released 15 days after transaction. T+21 is 21 days, T+30 is 30 days." },
              { q: "What is Hero Section?", a: "Premium homepage placement with maximum visibility. Featured products get more views." },
              { q: "Is there a refund policy?", a: "Yes, all plans come with a 7-day refund policy if you're not satisfied." }
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-5 shadow-md border border-olive-100 hover:border-olive-200 transition-all"
              >
                <h4 className="font-bold text-gray-900 mb-1">{faq.q}</h4>
                <p className="text-gray-600 text-sm">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
