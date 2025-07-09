import Image from "next/image";
import logo from "../../../public/logo.png";
import {
  ClockIcon,
  MapPinIcon,
  PhoneArrowUpRightIcon,
} from "@heroicons/react/24/outline";
import { Button } from "../button/button";

export const Header = () => {
  return (
    <header className="flex flex-row bg-[#2d2d2d] h-24 justify-center items-center w-screen">
      <div className="w-[1280px] flex justify-between items-center">
        <div>
          <Image
            src={logo}
            alt="Logo company Armada-holding picture"
            width={200}
            height={500}
          />
        </div>
        <span className="font-light text-lg text-[#FF5326] max-w-60 text-center">
          Аренда спецтехники <br /> ООО «ЗНАК»
        </span>
        <div className="flex flex-row gap-2 justify-center items-center">
          <ClockIcon className="h-6 w-6 text-yellow-400 " />
          <span className="font-medium text-lg text-white max-w-64 text-center">
            9:00-18:00
          </span>
        </div>
        <a
          href="https://yandex.ru/maps/10758/himki/house/leningradskaya_ulitsa_29/Z04YcgVgSkMCQFtvfXVxcn9jZg==/?from=mapframe&ll=37.420366%2C55.903302&z=17"
          target="_blank"
          className="flex flex-row gap-2 justify-center items-center"
        >
          <MapPinIcon className="h-14 w-6 text-yellow-400" />
          <span className="font-light text-xs text-white max-w-60 text-left">
            Московская обл., г. Химки, <br />
            ул. Ленинградская, д. 29, <br />
            этаж 9, пом. 14, оф. 914/2.
          </span>
        </a>
        <Button className="rounded-none px-4 border-2 border-[yellow] text-white hover:bg-yellow-400 duration-300 ease-in-out">
          Свяжитесь с нами
        </Button>
        <div className="flex flex-row gap-2 justify-center items-center">
          <PhoneArrowUpRightIcon className="h-6 w-6 text-yellow-400" />
          <div className="flex flex-col font-medium text-[16px] text-white max-w-60 text-left">
            <a href="tel:+79361540920">+7(936) 154-09-20</a>
            <a href="tel:+74956612071">+7(495) 661-20-71</a>
          </div>
        </div>
      </div>
    </header>
  );
};
