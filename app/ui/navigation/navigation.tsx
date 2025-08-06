"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LINKS } from "@/app/lib/constants";

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className="w-full max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between my-5 px-4">
      <div className={`flex flex-row md:gap-4 w-full md:w-auto items-center`}>
        {LINKS.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-5 text-[9px] md:text-xl sm:text-lg  font-medium transition-colors hover:bg-yellow-400 px-2 py-1 rounded"
            style={{
              borderBottom:
                pathname === item.href ? "4px solid yellow" : "none",
            }}
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
