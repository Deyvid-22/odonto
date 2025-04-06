"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import {
  Banknote,
  Calendar,
  CalendarCheck2,
  List,
  Settings,
} from "lucide-react";
import Link from "next/link";

export function SidebarDashboard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  console.log(pathname);

  return (
    <div className="flex min-h-screen w-full">
      <div
        className={clsx(`flex flex-1 flex-col transition-all duration-300 `, {
          "md:ml-20": isCollapsed,
          "md:ml-64": !isCollapsed,
        })}
      >
        <header className="md:hidden flex justify-space-between items-center p-4 z-10 sticky top-0">
          <Sheet>
            <div className="flex items-center gap-4">
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden ">
                  <List className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <h1 className="text-base md:text-lg font-semibold">
                Menu OdontoPro
              </h1>
            </div>
            <SheetContent className="sm:max-w-xs text-black p-5">
              <SheetTitle>OdontoPro</SheetTitle>
              <SheetDescription> Menu administrativo</SheetDescription>
              <nav className="grid gap-2 text-base pt-5">
                <SidebarLink
                  href="/dashboard"
                  label="Agendamentos"
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                  icon={<CalendarCheck2 className="w-6 h-6" />}
                />
                <SidebarLink
                  href="/dashboard/services"
                  label="Serviços"
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                  icon={<Calendar className="w-6 h-6" />}
                />
                <SidebarLink
                  href="/dashboard/profile"
                  label="Meu perfil"
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                  icon={<Settings className="w-6 h-6" />}
                />
                <SidebarLink
                  href="/dashboard/plans"
                  label="Planos"
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                  icon={<Banknote className="w-6 h-6" />}
                />
              </nav>
            </SheetContent>
          </Sheet>
        </header>
        <main className="flex-1 py-4 px-2 md:p-6">{children}</main>
      </div>
    </div>
  );
}

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  pathname: string;
  isCollapsed: boolean;
}

function SidebarLink({
  href,
  icon,
  label,
  pathname,
  isCollapsed,
}: SidebarLinkProps) {
  return (
    <Link href={href}>
      <div
        className={clsx(
          "flex items-center gap-2 px-3 py-2 rounded-md  transition-colors",
          {
            "text-white bg-blue-500": pathname === href,
            "text-gray-700 bg-gray-100": pathname !== href,
          }
        )}
      >
        <span className="w-6 h-6">{icon}</span>
        {!isCollapsed && <span>{label}</span>}
      </div>
    </Link>
  );
}
