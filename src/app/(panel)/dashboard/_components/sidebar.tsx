"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import {
  Banknote,
  CalendarCheck2,
  ChevronLeft,
  ChevronRight,
  Folder,
  List,
  Settings,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logoImg from "../../../../../public/logo-odonto.png";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";

export function SidebarDashboard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      <aside
        className={clsx(
          "flex flex-col border-r bg-background transation-all duration-300 p-4 h-full",
          {
            "w-20": isCollapsed,
            "w-64": !isCollapsed,
            "hidden md:flex md:fixed": true,
          }
        )}
      >
        <div className="mb-6 mt-4">
          {!isCollapsed && (
            <Image
              src={logoImg}
              alt="Logo OdontoPro"
              priority={true}
              quality={100}
              style={{ width: "auto", height: "auto" }}
            />
          )}
        </div>
        <Button
          className="bg-gray-100 hover:bg-gray-50 text-zinc-800 self-end mb-2"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {!isCollapsed ? (
            <ChevronLeft className="w-12 h-12" />
          ) : (
            <ChevronRight className="w-12 h-12" />
          )}
        </Button>
        {isCollapsed && (
          <nav className="flex flex-col gap-1 mt-2 overflow-hidden">
            <SidebarLink
              href="/dashboard"
              icon={<CalendarCheck2 className="w-5 h-5" />}
              label="Dashboard"
              pathname={pathname}
              isCollapsed={isCollapsed}
            />
            <SidebarLink
              href="/dashboard/services"
              icon={<Folder className="w-5 h-5" />}
              label="Serviços"
              pathname={pathname}
              isCollapsed={isCollapsed}
            />
            <SidebarLink
              href="/dashboard/profile"
              icon={<Settings className="w-5 h-5" />}
              label="Meu Perfil"
              pathname={pathname}
              isCollapsed={isCollapsed}
            />
            <SidebarLink
              href="/dashboard/plans"
              icon={<Banknote className="w-5 h-5" />}
              label="Planos"
              pathname={pathname}
              isCollapsed={isCollapsed}
            />
          </nav>
        )}
        <Collapsible open={!isCollapsed}>
          <CollapsibleContent>
            <nav className="flex flex-col gap-1 overflow-hidden">
              <span className="text-sm text-gray-400 font-medium my-1 uppercase">
                Painel
              </span>
              <SidebarLink
                href="/dashboard"
                icon={<CalendarCheck2 className="w-5 h-5" />}
                label="Dashboard"
                pathname={pathname}
                isCollapsed={isCollapsed}
              />
              <SidebarLink
                href="/dashboard/services"
                icon={<Folder className="w-5 h-5" />}
                label="Serviços"
                pathname={pathname}
                isCollapsed={isCollapsed}
              />

              <span className="text-sm text-gray-400 font-medium mt-1 uppercase">
                Configurações
              </span>

              <SidebarLink
                href="/dashboard/profile"
                icon={<Settings className="w-5 h-5" />}
                label="Meu Perfil"
                pathname={pathname}
                isCollapsed={isCollapsed}
              />
              <SidebarLink
                href="/dashboard/plans"
                icon={<Banknote className="w-5 h-5" />}
                label="Planos"
                pathname={pathname}
                isCollapsed={isCollapsed}
              />
            </nav>
          </CollapsibleContent>
        </Collapsible>
      </aside>

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
                <Button
                  variant="outline"
                  className="md:hidden "
                  onClick={() => setIsCollapsed(false)}
                >
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
                  icon={<Folder className="w-6 h-6" />}
                />
                <SidebarLink
                  href="/dashboard/services"
                  label="Serviços"
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                  icon={<Folder className="w-6 h-6" />}
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
