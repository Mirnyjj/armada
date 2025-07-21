import Image from "next/image";
import logo from "../../../public/logo.png";
import { LINKS, TECHNIQUE_CATEGORY } from "@/app/lib/constants";
import Link from "next/link";
import { Button } from "../button/button";

export const Footer = () => {
  return (
    <footer
      id="contacts"
      className="flex flex-col lg:flex-row bg-[#2d2d2d] min-h-[400px] lg:h-64 justify-center items-center w-full mt-auto px-4 py-8"
    >
      <div className="w-full max-w-[1280px] flex flex-col lg:flex-row flex-wrap justify-between items-center lg:items-start gap-8 lg:gap-0">
        <div className="flex flex-col gap-3 items-center lg:items-start justify-center w-full lg:w-auto">
          <Link href="/">
            <Image
              src={logo}
              alt="Logo company Armada-holding picture"
              width={160}
              height={40}
            />
          </Link>
          <span className="font-light text-xs text-[#FFFFFF] max-w-60 text-center lg:text-left">
            Аренда спецтехники: экскаваторы, манипуляторы, газели "Фермер" для
            бизнеса и виброплиты.
          </span>
          <span className="font-light text-xs text-[#B5B5B5] max-w-60 text-center lg:text-left">
            © 2025 Все права защищены
          </span>
        </div>
        <div className="flex flex-col gap-3 justify-start items-center lg:items-start w-full lg:w-auto">
          <div className="text-lg text-white">Клиентам</div>
          <nav className="flex flex-col gap-1 text-center lg:text-left">
            {LINKS.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center text-xs text-[#B5B5B5] font-medium transition-colors hover:bg-yellow-400 hover:text-black px-2 py-1 rounded"
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col items-center lg:items-start w-full lg:w-auto mt-4 lg:mt-0">
          <Button className="rounded-none border-2 border-yellow-400 text-white px-4 py-2 w-full lg:w-auto">
            Оставить заявку
          </Button>
        </div>
        <div className="flex flex-col gap-3 justify-start items-center lg:items-start w-full lg:w-auto mt-4 lg:mt-0">
          <div className="text-lg text-white">Контакты</div>
          <div className="flex flex-col font-medium text-xs text-[#B5B5B5] text-center lg:text-left">
            <a href="tel:+79361540920">+7(936) 154-09-20</a>
            <a href="tel:+74956612071">+7(495) 661-20-71</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
