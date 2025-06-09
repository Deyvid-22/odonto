"use client";

import Link from "next/link";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { LogIn, Menu } from "lucide-react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { HandleRegister } from "../_actions/login";

export function Header() {
  const { data: session, status } = useSession();

  const [open, setOpen] = useState(false);

  const navItems = [
    {
      label: "Profissionais",
      href: "#",
    },
    {
      label: "Sobre",
      href: "#t",
    },
    {
      label: "Contato",
      href: "#tu",
    },
  ];

  async function hanldeLogin() {
    await HandleRegister("google");
  }

  const NavLinks = () => (
    <>
      {navItems.map((item) => (
        <Button
          asChild
          key={item.href}
          className="text-black hover:bg-transparent bg-transparent shadow-none"
          onClick={() => setOpen(false)}
        >
          <Link href={item.href}>{item.label}</Link>
        </Button>
      ))}

      {status === "loading" ? (
        <></>
      ) : session ? (
        <Link
          href="/dashboard"
          className="flex items-center justify-center gap-1 bg-zinc-900 text-white py-1 rounded-md px-4"
        >
          Acessar
        </Link>
      ) : (
        <Button onClick={hanldeLogin}>
          <LogIn />
          Fazer login
        </Button>
      )}
    </>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-[999] py-4 px-6 bg-white">
      <div className="container mx-auto  flex items-center justify-between">
        <Link href="/" className="text-3xl font-bold text-zinc-900">
          Odonto<span className="text-emerald-500">Pro</span>
        </Link>

        <nav className="hidden  md:flex justify-center items-center space-x-4">
          <NavLinks />
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              className="text-black hover:bg-transparent"
              variant="ghost"
              size="icon"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[240px] sm:w-[300px] z-[9999] px-5 py-5"
          >
            <SheetTitle>Menu</SheetTitle>
            <SheetHeader></SheetHeader>
            <SheetDescription>Profissionais</SheetDescription>
            <nav className="flex flex-col space-y-4 mt-6">
              <NavLinks />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
