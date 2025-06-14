"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import {
  IconMenu2,
  IconX,
  IconVideo,
  IconArrowRight,
  IconUser,
  IconLogout,
  IconDashboard,
  IconChevronDown,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { ThemeToggle } from "../providers";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { user, signOut } = useAuth();

  return (
    <Navbar 
      className="bg-background/60 backdrop-blur-md border-b border-divider"
      maxWidth="xl"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden text-foreground"
          icon={isMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
        />
        <NavbarBrand className="gap-3">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <IconVideo size={20} className="text-white" />
            </div>
            <p className="font-bold text-foreground bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              AI Subtitle Editor
            </p>
          </motion.div>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Button
            as="a"
            href="/"
            variant="light"
            className="text-foreground"
          >
            Home
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            as="a"
            href="/#features"
            variant="light"
            className="text-foreground"
          >
            Features
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            as="a"
            href="/#pricing"
            variant="light"
            className="text-foreground"
          >
            Pricing
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeToggle />
        </NavbarItem>
        {user ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button
                variant="light"
                className="text-foreground"
                endContent={<IconChevronDown className="h-4 w-4" />}
                startContent={<IconUser className="h-4 w-4" />}
              >
                {user.email}
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="User menu">
              <DropdownItem
                key="dashboard"
                startContent={<IconDashboard className="h-4 w-4" />}
                onPress={() => router.push("/dashboard")}
              >
                Dashboard
              </DropdownItem>
              <DropdownItem
                key="signout"
                startContent={<IconLogout className="h-4 w-4" />}
                onPress={signOut}
                className="text-danger"
                color="danger"
              >
                Sign Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <>
            <NavbarItem>
              <Button
                as="a"
                href="/login"
                variant="light"
                className="text-foreground"
              >
                Login
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                as="a"
                href="/signup"
                color="primary"
                variant="flat"
              >
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      <NavbarMenu className="bg-black/95 backdrop-blur-xl">
        <NavbarMenuItem>
          <a href="#features" className="text-white/70 hover:text-white transition-colors">
            Features
          </a>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <a href="#pricing" className="text-white/70 hover:text-white transition-colors">
            Pricing
          </a>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <a href="#faq" className="text-white/70 hover:text-white transition-colors">
            FAQ
          </a>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
} 