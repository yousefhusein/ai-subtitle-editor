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
} from "@tabler/icons-react";
import { motion } from "framer-motion";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <Navbar 
      maxWidth="xl" 
      className="bg-black/50 backdrop-blur-xl border-b border-zinc-800"
      onMenuOpenChange={setIsMenuOpen}
      classNames={{
        wrapper: "px-4 sm:px-6 lg:px-8",
        item: "data-[active=true]:text-white",
      }}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden text-white"
          icon={isMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
        />
        <NavbarBrand className="gap-3">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
              <IconVideo className="text-white" size={24} />
            </div>
            <p className="font-bold text-xl bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              SubtitleCraft
            </p>
          </motion.div>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Button
            as="a"
            href="#features"
            variant="light"
            className="text-zinc-300 hover:text-white"
          >
            Features
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            as="a"
            href="#pricing"
            variant="light"
            className="text-zinc-300 hover:text-white"
          >
            Pricing
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            as="a"
            href="#faq"
            variant="light"
            className="text-zinc-300 hover:text-white"
          >
            FAQ
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        {user ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                size="sm"
                icon={<IconUser size={20} />}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user.email}</p>
              </DropdownItem>
              <DropdownItem
                key="dashboard"
                startContent={<IconVideo size={20} />}
                onClick={() => router.push('/dashboard')}
              >
                Dashboard
              </DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                startContent={<IconLogout size={20} />}
                onClick={handleSignOut}
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
                className="text-zinc-300 hover:text-white"
              >
                Sign In
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                as="a"
                href="/signup"
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium"
                endContent={<IconArrowRight size={20} />}
              >
                Get Started
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