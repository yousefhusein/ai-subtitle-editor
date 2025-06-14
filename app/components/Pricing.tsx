"use client";

import { Button, Card, CardBody, CardHeader, Chip, Switch } from "@nextui-org/react";
import { motion } from "framer-motion";
import { 
  IconStar, 
  IconCheck, 
  IconSparkles, 
  IconArrowRight,
  IconCurrencyDollar
} from "@tabler/icons-react";
import { useState } from "react";

const pricingPlans = [
  {
    name: "Starter",
    price: {
      monthly: "$9",
      yearly: "$90"
    },
    period: "/month",
    description: "Perfect for content creators",
    features: [
      "5 projects per month",
      "Basic AI assistance",
      "SRT & VTT support",
      "HD video preview",
      "Email support"
    ],
    popular: false,
    icon: <IconSparkles className="w-6 h-6" />
  },
  {
    name: "Professional",
    price: {
      monthly: "$29",
      yearly: "$290"
    },
    period: "/month",
    description: "For professional editors",
    features: [
      "Unlimited projects",
      "Advanced AI features",
      "All format support",
      "4K video preview",
      "Priority support",
      "Team collaboration",
      "Custom branding"
    ],
    popular: true,
    icon: <IconSparkles className="w-6 h-6" />
  },
  {
    name: "Enterprise",
    price: {
      monthly: "$99",
      yearly: "$990"
    },
    period: "/month",
    description: "For large organizations",
    features: [
      "Everything in Professional",
      "Custom integrations",
      "Dedicated support",
      "Advanced analytics",
      "SSO & security",
      "API access"
    ],
    popular: false,
    icon: <IconSparkles className="w-6 h-6" />
  }
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-2 bg-blue-500/10 rounded-full mb-4">
            <IconCurrencyDollar className="w-6 h-6 text-blue-400" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold mb-6">
            Choose Your 
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent"> Perfect Plan</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
            Start free and scale as you grow. All plans include our core features with premium upgrades.
          </p>
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm ${!isYearly ? 'text-white' : 'text-white/50'}`}>Monthly</span>
            <Switch
              size="sm"
              color="primary"
              isSelected={isYearly}
              onValueChange={setIsYearly}
            />
            <span className={`text-sm ${isYearly ? 'text-white' : 'text-white/50'}`}>
              Yearly <span className="text-blue-400">(Save 20%)</span>
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <Chip 
                    color="primary" 
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold px-4 py-2 shadow-lg shadow-blue-500/20"
                    startContent={<IconStar className="w-4 h-4" />}
                  >
                    Most Popular
                  </Chip>
                </div>
              )}
              <Card className={`${plan.popular ? 'border-2 border-blue-500 bg-gray-800/50' : 'bg-gray-800/50 border border-white/10'} backdrop-blur-xl relative h-full hover:border-blue-500/50 transition-colors flex flex-col`}>
                <CardHeader className="pb-4">
                  <div className="text-center w-full">
                    <div className="inline-flex items-center justify-center p-2 bg-blue-500/10 rounded-full mb-4">
                      {plan.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-white/70 mb-4">{plan.description}</p>
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-white">
                        {isYearly ? plan.price.yearly : plan.price.monthly}
                      </span>
                      <span className="text-white/70 ml-1">{plan.period}</span>
                    </div>
                    {isYearly && (
                      <p className="text-sm text-blue-400 mt-2">Billed annually</p>
                    )}
                  </div>
                </CardHeader>
                <CardBody className="flex flex-col flex-grow">
                  <div className="flex-grow">
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-white/80">
                          <IconCheck className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-auto pt-6">
                    <Button 
                      color={plan.popular ? "primary" : "default"}
                      variant={plan.popular ? "solid" : "bordered"}
                      className={`${plan.popular ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' : 'border-white/20 text-white hover:bg-white/5'} w-full shadow-lg ${plan.popular ? 'shadow-blue-500/20' : ''}`}
                      size="lg"
                      endContent={<IconArrowRight className="w-4 h-4" />}
                    >
                      Get Started
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-white/70 mb-4">
            Need a custom plan? We&apos;ve got you covered!
          </p>
          <a 
            href="#contact" 
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
          >
            Contact sales for custom pricing
            <IconArrowRight className="w-4 h-4 ml-2" />
          </a>
        </motion.div>
      </div>
    </section>
  );
} 