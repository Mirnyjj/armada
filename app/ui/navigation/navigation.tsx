"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Input } from "../input/input";
import { LINKS } from "@/app/lib/constants";

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <div className="w-[1280px] flex justify-between items-center my-5">
      <nav className="flex justify-between flex-wrap gap-7">
        {LINKS.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-5  text-xl font-medium transition-colors hover:bg-yellow-400"
            style={{
              borderBottom:
                pathname === item.href ? "4px solid yellow" : "none",
            }}
          >
            {item.title}
          </Link>
        ))}
      </nav>
      <Input
        name="search"
        placeholder="Поиск техники..."
        // error="flgkrtlhfhfhtfhdhdthfthfthkgrlthk"
        type="text"
      />
    </div>
  );
};
