"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Pricing() {
  const plans = [
    {
      name: "Basic",
      price: "free",
      features: [
        "Basic threat detection",
        "Email notifications",
        ,
        "Up to 5 devices"
      ]
    },
    {
      name: "Professional",
      price: "INR 999",
      features: [
        "Advanced AI protection",
        "Real-time alerts",
        "Priority support",
        "Up to 20 devices",
        "Custom security rules",
        "API access"
      ]
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        "Full AI protection suite",
        "Dedicated support team",
        "Unlimited devices",
        "Custom integration",
        "Advanced analytics",
        "SLA guarantee",
        "Training sessions"
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-black to-[#1A1A1A]">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Choose Your Protection Level
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Flexible plans for every security need
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="tool-card p-8 rounded-lg"
            >
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <div className="text-4xl font-bold mb-6 text-[#00F0FF]">
                {plan.price}
                {plan.price !== "Custom" && <span className="text-lg text-white/60">/mo</span>}
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <Check className="w-5 h-5 text-[#00F0FF] mr-2" />
                    <span className="text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-[#00F0FF] text-black hover:bg-[#00F0FF]/90">
                Get Started
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}