"use client";

import { Button } from "@nextui-org/react";
import { 
  IconBrandGithub, 
  IconBrandTwitter, 
  IconBrandLinkedin, 
  IconBrandYoutube,
  IconMail,
  IconPhone,
  IconMapPin
} from "@tabler/icons-react";

const footerLinks = {
  "Product": [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "FAQ", href: "#faq" },
    { name: "Updates", href: "#" }
  ],
  "Company": [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Contact", href: "#contact" }
  ],
  "Resources": [
    { name: "Documentation", href: "#" },
    { name: "Help Center", href: "#" },
    { name: "API", href: "#" },
    { name: "Status", href: "#" }
  ],
  "Legal": [
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
    { name: "Security", href: "#" },
    { name: "Cookies", href: "#" }
  ]
};

const socialLinks = [
  { name: "GitHub", icon: <IconBrandGithub className="w-5 h-5" />, href: "https://github.com/yourusername/ai-subtitle-editor" },
  { name: "Twitter", icon: <IconBrandTwitter className="w-5 h-5" />, href: "https://twitter.com/yourusername" },
  { name: "LinkedIn", icon: <IconBrandLinkedin className="w-5 h-5" />, href: "https://linkedin.com/in/yourusername" },
  { name: "YouTube", icon: <IconBrandYoutube className="w-5 h-5" />, href: "https://youtube.com/@yourusername" }
];

const contactInfo = [
  { icon: <IconMail className="w-5 h-5" />, text: "support@aisubtitleeditor.com" },
  { icon: <IconPhone className="w-5 h-5" />, text: "+1 (555) 123-4567" },
  { icon: <IconMapPin className="w-5 h-5" />, text: "123 AI Street, Tech City, TC 12345" }
];

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent mb-4">
              AI Subtitle Editor
            </h3>
            <p className="text-white/70 mb-6">
              Professional subtitle editing powered by AI. Create, edit, and manage subtitles with ease.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <Button
                  key={link.name}
                  isIconOnly
                  variant="light"
                  className="text-white/70 hover:text-white"
                  as="a"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.icon}
                </Button>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="text-blue-400">
                  {info.icon}
                </div>
                <span className="text-white/70">{info.text}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center text-white/50 text-sm">
            © {new Date().getFullYear()} AI Subtitle Editor. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
} 