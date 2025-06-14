"use client";

import { Accordion, AccordionItem, Card, CardBody } from "@nextui-org/react";
import { motion } from "framer-motion";
import { 
  IconQuestionMark, 
  IconChevronDown, 
  IconMessageCircle 
} from "@tabler/icons-react";

const faqData = {
  "General": [
    {
      question: "What is AI Subtitle Editor?",
      answer: "AI Subtitle Editor is a professional tool that helps you create, edit, and manage subtitles for your videos using advanced AI technology. It supports multiple languages, formats, and offers real-time preview capabilities."
    },
    {
      question: "How does the AI translation work?",
      answer: "Our AI translation system uses state-of-the-art language models to provide accurate and natural translations. It considers context, tone, and cultural nuances to ensure high-quality results."
    }
  ],
  "Technical": [
    {
      question: "What video formats are supported?",
      answer: "We support all major video formats including MP4, AVI, MOV, MKV, and more. The editor works with any video file that can be played in modern media players."
    },
    {
      question: "Can I work offline?",
      answer: "Yes, you can work offline for basic editing features. However, AI-powered features like translation and auto-sync require an internet connection."
    }
  ],
  "Pricing": [
    {
      question: "Is there a free trial?",
      answer: "Yes, we offer a 14-day free trial with access to all premium features. No credit card required to start."
    },
    {
      question: "Can I cancel my subscription?",
      answer: "Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period."
    }
  ]
};

export default function FAQ() {
  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-2 bg-blue-500/10 rounded-full mb-4">
            <IconQuestionMark className="w-6 h-6 text-blue-400" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold mb-6">
            Frequently Asked
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent"> Questions</span>
          </h2>
          <p className="text-xl text-white/70">
            Find answers to common questions about our service
          </p>
        </motion.div>

        <div className="space-y-8">
          {Object.entries(faqData).map(([category, questions], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              <Card className="bg-gray-800/50 border border-white/10">
                <CardBody className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">{category}</h3>
                  <Accordion
                    variant="light"
                    className="px-0"
                    itemClasses={{
                      title: "text-white/90",
                      trigger: "py-4",
                      content: "text-white/70",
                      indicator: "text-white/70"
                    }}
                  >
                    {questions.map((item, index) => (
                      <AccordionItem
                        key={index}
                        aria-label={item.question}
                        title={item.question}
                        indicator={({ isOpen }) => (
                          <IconChevronDown
                            className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                          />
                        )}
                      >
                        {item.answer}
                      </AccordionItem>
                    ))}
                  </Accordion>
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
            Still have questions? We&apos;re here to help!
          </p>
          <a 
            href="#contact" 
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
          >
            <IconMessageCircle className="w-5 h-5 mr-2" />
            Contact our support team
          </a>
        </motion.div>
      </div>
    </section>
  );
} 