"use client";

import { Card, CardBody } from "@nextui-org/react";
import { motion } from "framer-motion";
import { 
  CpuChipIcon,
  LanguageIcon,
  VideoCameraIcon,
  UserGroupIcon,
  ChartBarIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/outline";

const explanations = [
  {
    icon: <CpuChipIcon className="w-8 h-8" />,
    title: "Advanced AI Technology",
    description: "Our AI engine uses state-of-the-art machine learning models to provide accurate subtitle generation, translation, and timing synchronization. The system continuously learns and improves from user feedback.",
    features: [
      "Neural machine translation",
      "Speech recognition",
      "Context-aware timing",
      "Style preservation"
    ]
  },
  {
    icon: <LanguageIcon className="w-8 h-8" />,
    title: "Global Language Support",
    description: "Break language barriers with our comprehensive language support. Our platform handles over 100 languages with native-level accuracy and cultural context awareness.",
    features: [
      "100+ languages",
      "Cultural adaptation",
      "Regional dialects",
      "Context preservation"
    ]
  },
  {
    icon: <VideoCameraIcon className="w-8 h-8" />,
    title: "Professional Video Integration",
    description: "Seamlessly integrate with your video workflow. Support for all major video formats and resolutions, from HD to 8K, with real-time preview capabilities.",
    features: [
      "4K/8K support",
      "Real-time preview",
      "Frame-accurate timing",
      "Multiple format export"
    ]
  },
  {
    icon: <UserGroupIcon className="w-8 h-8" />,
    title: "Team Collaboration",
    description: "Work together efficiently with our advanced collaboration features. Real-time editing, role-based access, and version control ensure smooth team workflows.",
    features: [
      "Real-time collaboration",
      "Role management",
      "Version history",
      "Comment system"
    ]
  },
  {
    icon: <ChartBarIcon className="w-8 h-8" />,
    title: "Analytics & Insights",
    description: "Gain valuable insights into your subtitle projects with detailed analytics. Track performance, engagement, and quality metrics to optimize your content.",
    features: [
      "Usage analytics",
      "Quality metrics",
      "Engagement tracking",
      "Performance reports"
    ]
  },
  {
    icon: <ShieldCheckIcon className="w-8 h-8" />,
    title: "Enterprise Security",
    description: "Enterprise-grade security ensures your content and data are protected. Advanced encryption, access controls, and compliance features for peace of mind.",
    features: [
      "End-to-end encryption",
      "SSO integration",
      "Compliance tools",
      "Audit logging"
    ]
  }
];

export default function Explanation() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-bold mb-6">
            Why Choose 
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent"> SubtitleCraft</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Discover the advanced features and technologies that make SubtitleCraft the preferred choice for professionals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {explanations.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-gray-800/50 backdrop-blur-xl border border-white/10 h-full hover:border-blue-500/50 transition-colors">
                <CardBody className="p-6">
                  <div className="text-blue-400 mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    {item.title}
                  </h3>
                  <p className="text-white/70 mb-4">
                    {item.description}
                  </p>
                  <ul className="space-y-2">
                    {item.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-white/80 text-sm">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 