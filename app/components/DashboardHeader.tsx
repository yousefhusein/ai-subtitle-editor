'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Breadcrumbs,
  BreadcrumbItem,
} from '@nextui-org/react';
import { IconVideo, IconUser, IconLogout, IconHome, IconFileText } from '@tabler/icons-react';
import { motion } from 'framer-motion';

export default function DashboardHeader() {
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
    >
      <NavbarBrand>
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

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <Breadcrumbs>
          <BreadcrumbItem>
            <Button
              as="a"
              href="/dashboard"
              variant="light"
              className="text-zinc-300 hover:text-white"
              startContent={<IconHome size={20} />}
            >
              Dashboard
            </Button>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Button
              as="a"
              href="/dashboard/editor"
              variant="light"
              className="text-zinc-300 hover:text-white"
              startContent={<IconFileText size={20} />}
            >
              Editor
            </Button>
          </BreadcrumbItem>
        </Breadcrumbs>
      </NavbarContent>

      <NavbarContent justify="end">
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
              <p className="font-semibold">{user?.email}</p>
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
      </NavbarContent>
    </Navbar>
  );
} 