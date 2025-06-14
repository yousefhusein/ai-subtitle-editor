"use client";

import { Card, CardBody } from "@nextui-org/react";
import { motion } from "framer-motion";
import { 
  IconBrain, 
  IconLanguage, 
  IconDeviceTv, 
  IconClock, 
  IconDeviceLaptop, 
  IconCloud 
} from "@tabler/icons-react";

const features = [
  {
    title: "AI-Powered Translation",
    description: "Advanced AI algorithms for accurate and natural translations across multiple languages.",
    icon: <IconBrain className="w-8 h-8 text-blue-400" />
  },
  {
    title: "Multi-Language Support",
    description: "Support for over 100 languages with automatic language detection.",
    icon: <IconLanguage className="w-8 h-8 text-blue-400" />
  },
  {
    title: "Video Preview",
    description: "Real-time preview of subtitles with your video content.",
    icon: <IconDeviceTv className="w-8 h-8 text-blue-400" />
  },
  {
    title: "Time Synchronization",
    description: "Automatic timing adjustment and synchronization with video content.",
    icon: <IconClock className="w-8 h-8 text-blue-400" />
  },
  {
    title: "Cross-Platform",
    description: "Work seamlessly across Windows, Mac, and Linux platforms.",
    icon: <IconDeviceLaptop className="w-8 h-8 text-blue-400" />
  },
  {
    title: "Cloud Sync",
    description: "Automatic cloud synchronization of your subtitle projects.",
    icon: <IconCloud className="w-8 h-8 text-blue-400" />
  }
];

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-bold mb-6">
            Powerful Features for
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent"> Professional Subtitling</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Everything you need to create, edit, and manage professional subtitles with ease.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-gray-800/50 border border-white/10 hover:border-blue-500/50 transition-colors">
                <CardBody className="p-6">
                  <div className="mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/70">{feature.description}</p>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 