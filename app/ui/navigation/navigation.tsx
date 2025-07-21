"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import { Input } from "../input/input";
import { LINKS } from "@/app/lib/constants";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export const Navigation = () => {
  const pathname = usePathname();
  console.log(pathname);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between my-5 px-4">
      {/* Мобильное меню */}
      <div className="flex w-full md:hidden justify-between items-center mb-3">
        <button
          className="p-2 text-yellow-400"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Открыть меню"
        >
          {menuOpen ? (
            <XMarkIcon className="h-8 w-8" />
          ) : (
            <Bars3Icon className="h-8 w-8" />
          )}
        </button>
        {/* <div className="w-2/3">
          <Input
            name="search"
            placeholder="Поиск техники..."
            type="text"
          />
        </div> */}
      </div>
      {/* Меню навигации */}
      <div
        className={`${
          menuOpen ? "flex" : "hidden"
        } md:flex flex-col md:flex-row gap-4 md:gap-7 w-full md:w-auto items-center`}
      >
        {LINKS.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-5 text-xl font-medium transition-colors hover:bg-yellow-400 px-2 py-1 rounded"
            style={{
              borderBottom:
                pathname === item.href ? "4px solid yellow" : "none",
            }}
            onClick={() => setMenuOpen(false)}
          >
            {item.title}
          </Link>
        ))}
        <div className="hidden md:block">
          {/* <Input
            name="search"
            placeholder="Поиск техники..."
            type="text"
          /> */}
        </div>
      </div>
    </nav>
  );
};
