import Image from "next/image";
import logo from "../../../public/logo.png";
import { LINKS, TECHNIQUE_CATEGORY } from "@/app/lib/constants";
import Link from "next/link";
import { Button } from "../button/button";

export const Footer = () => {
  return (
    <footer className="flex flex-row bg-[#2d2d2d] h-64 justify-center items-center w-screen mt-auto">
      <div className="w-[1280px] flex justify-between items-start pt-8">
        <div className="flex flex-col gap-3 items-start justify-center">
          <div>
            <Image
              src={logo}
              alt="Logo company Armada-holding picture"
              width={200}
              height={500}
            />
          </div>
          <span className="font-light text-xs text-[#FFFFFF] max-w-60 text-left">
            Аренда спецтехники: экскаваторы, манипуляторы, газели "Фермер" для
            бизнеса и виброплиты.
          </span>
          <span className="font-light text-xs text-[#B5B5B5] max-w-60 text-left">
            © 2025 Все права защищены
          </span>
        </div>
        <div className="flex flex-col gap-3 justify-start">
          <div className="text-lg text-white">Клиентам</div>
          <nav className="flex flex-col gap-1 text-left">
            {LINKS.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center text-xs text-[#B5B5B5] font-medium transition-colors hover:bg-yellow-400 hover:text-black"
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-col gap-3 justify-start">
          <div className="text-lg text-white">Техника</div>
          <nav className="flex flex-col gap-1 text-left">
            {TECHNIQUE_CATEGORY.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center text-xs text-[#B5B5B5] font-medium transition-colors hover:bg-yellow-400 hover:text-black"
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
        <Button className="rounded-none border-2 border-[yellow] text-white px-4">
          Оставить заявку
        </Button>
        <div className="flex flex-col gap-3 justify-start">
          <div className="text-lg text-white">Контакты</div>
          <div className="flex flex-col font-medium text-xs text-[#B5B5B5] text-left">
            <a href="tel:+79361540920">+7(936) 154-09-20</a>
            <a href="tel:+74956612071">+7(495) 661-20-71</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
