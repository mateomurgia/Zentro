import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";

const menu = [
  { name: "Dashboard", href: "/", icon: HomeIcon },
  { name: "Inventario", href: "/inventory", icon: ClipboardDocumentListIcon },
  { name: "Pedidos", href: "/pedidos", icon: ClipboardDocumentListIcon },
  { name: "Usuarios", href: "/usuarios", icon: UserGroupIcon },
  { name: "Configuración", href: "/configuracion", icon: Cog6ToothIcon },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-lg flex flex-col">
        <div className="flex flex-col items-center py-8 px-4 border-b mb-2">
          <Image
            src="/logo-zentropack.png"
            alt="Zentro Pack Logo"
            width={84}
            height={84}
            className="rounded-xl shadow mb-2"
            priority
          />
          <span className="mt-2 font-extrabold text-2xl text-[#2E7D32] tracking-wide select-none text-center leading-tight">
            Zentro <br />
            Fulfillment
          </span>
        </div>
        <nav className="flex flex-col gap-1 mt-4">
          {menu.map(({ name, href, icon: Icon }) => (
            <Link
              key={name}
              href={href}
              className="flex items-center gap-4 px-8 py-3 rounded-l-full hover:bg-[#A5D6A7] hover:text-[#1E293B] font-medium text-[#1E293B] transition-all duration-200 group"
              style={{
                fontWeight:
                  typeof window !== "undefined" && window.location.pathname === href
                    ? "bold"
                    : "normal",
              }}
            >
              <Icon className="h-6 w-6 text-[#2E7D32] group-hover:text-[#1E293B]" />
              {name}
            </Link>
          ))}
        </nav>
        <div className="flex-1" />
        <div className="px-8 pb-6 text-xs text-gray-400 mt-auto select-none">
          &copy; {new Date().getFullYear()} Zentro Fulfillment
        </div>
      </aside>
      {/* Main */}
      <main className="flex-1 px-10 py-10">{children}</main>
    </div>
  );
}
