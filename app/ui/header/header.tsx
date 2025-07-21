"use client";
import Image from "next/image";
import logo from "../../../public/logo.png";
import {
  ClockIcon,
  MapPinIcon,
  PhoneArrowUpRightIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Button } from "../button/button";
import { useState } from "react";
import { FeedbackForm } from "../forms/feedback-form";
import { useTechniqueHooks } from "@/app/lib/hooks/techniqueHooks";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOpenForm, setIsOpenForm] = useState(false);

  // Загрузка техники
  const { useEntityList: useTechniqueList } = useTechniqueHooks();
  const { data: techniques } = useTechniqueList();

  return (
    <header className="w-full bg-[#2d2d2d]">
      {isOpenForm && techniques?.length !== 0 && (
        <FeedbackForm
          isOpen={isOpenForm}
          onClose={() => setIsOpenForm(false)}
          technique={techniques ? techniques : []}
        />
      )}
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center h-auto md:h-24 px-4 py-2 md:py-0">
        {/* Логотип и бургер */}
        <div className="flex flex-row items-center w-full md:w-auto justify-between">
          <Image
            src={logo}
            alt="Logo company Armada-holding picture"
            width={140}
            height={40}
            className="md:w-[200px] md:h-[50px] w-[140px] h-[40px]"
          />
          <button
            className="md:hidden p-2 text-yellow-400"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Открыть меню"
          >
            {menuOpen ? (
              <XMarkIcon className="h-8 w-8" />
            ) : (
              <Bars3Icon className="h-8 w-8" />
            )}
          </button>
        </div>
        {/* Контент для десктопа */}
        <div className="hidden md:flex flex-row items-center gap-6 w-full md:w-auto justify-between">
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
          <Button
            className="rounded-none px-4 border-2 border-[yellow] text-white hover:bg-yellow-400 duration-300 ease-in-out"
            onClick={() => {
              setIsOpenForm(true);
              setMenuOpen((v) => !v);
            }}
          >
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
        {/* Мобильное меню */}
        {menuOpen && (
          <div className="md:hidden w-full flex flex-col gap-4 mt-4 animate-fadeIn bg-[#2d2d2d] p-4 rounded-lg shadow-lg z-50">
            <span className="font-light text-lg text-[#FF5326] text-center">
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
            <Button
              className="rounded-none px-4 border-2 border-[yellow] text-white hover:bg-yellow-400 duration-300 ease-in-out w-full"
              onClick={() => {
                setIsOpenForm(true);
                setMenuOpen((v) => !v);
              }}
            >
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
        )}
      </div>
    </header>
  );
};
