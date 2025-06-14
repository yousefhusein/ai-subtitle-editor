"use client";

import { Button, Chip } from "@nextui-org/react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Chip 
            color="primary" 
            variant="flat" 
            className="mb-6 bg-blue-500/10 text-blue-400 border border-blue-500/20"
          >
            🚀 Now with AI-powered subtitle generation
          </Chip>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Professional Subtitle
            <br />
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              Editor for Everyone
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-white/70 mb-8 max-w-3xl mx-auto">
            Create, edit, and perfect subtitles with our AI-powered editor. 
            Supporting all major formats with luxury design and professional features.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              color="primary"
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold px-8 py-6 text-lg shadow-lg shadow-blue-500/20"
              endContent={<ArrowRightIcon className="w-5 h-5" />}
            >
              Start Editing Now
            </Button>
            <Button 
              size="lg" 
              variant="bordered" 
              className="border-white/20 text-white hover:bg-white/5 px-8 py-6 text-lg"
            >
              Watch Demo
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 