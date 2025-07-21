"use client";

import { useEffect, useState } from "react";
import { Button } from "../../button/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { CarousePhotos } from "@/app/lib/definitions";
import Image from "next/image";
import Link from "next/link";
import { FeedbackForm } from "../../forms/feedback-form";
import { useTechniqueHooks } from "@/app/lib/hooks/techniqueHooks";

type Props = {
  photos: CarousePhotos[];
};

export const CarouselContent = ({ photos }: Props) => {
  const [isPhoto, setIsPhoto] = useState(0);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const { useEntityList: useTechniqueList } = useTechniqueHooks();
  const { data: techniques } = useTechniqueList();
  // Автоматическое переключение слайдов
  useEffect(() => {
    if (!photos || photos.length <= 1) return;

    const interval = setInterval(() => {
      setIsPhoto((prev) => (prev + 1) % photos.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [photos]);

  const nextSlide = () => {
    setIsPhoto((prev) => (prev + 1) % photos.length);
  };

  const prevSlide = () => {
    setIsPhoto((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <>
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={photos[isPhoto].photo_path}
          alt={photos[isPhoto].title}
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
          priority
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent"></div>
      <div className="relative h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-full">
          <div className="w-full md:w-1/2 lg:w-2/5 space-y-4 sm:space-y-6 md:space-y-8">
            <div key={isPhoto} className="animate-fadeIn">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
                {photos[isPhoto].title}
              </h1>
              <p className="text-sm font-normal sm:text-base md:text-lg lg:text-2xl text-gray-700 mt-3 sm:mt-4 md:mt-6 leading-relaxed">
                {photos[isPhoto].description}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-6 md:mt-8">
                <Button
                  onClick={() => setIsOpenForm(true)}
                  className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 bg-yellow-500 text-white hover:bg-yellow-600 transition-all duration-300 ease-in-out text-sm sm:text-base md:text-lg font-semibold shadow-lg hover:shadow-xl"
                >
                  Заказать звонок
                </Button>
                <Button className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 text-gray-900 border-2 border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 ease-in-out text-sm sm:text-base md:text-lg font-semibold">
                  <Link href="#catalog">Каталог техники</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Кнопки навигации: десктопная версия (по бокам) */}
      <div className="hidden sm:flex absolute inset-y-0 left-0 items-center z-20">
        <Button
          onClick={prevSlide}
          className="ml-2 sm:ml-4 p-2 sm:p-3 bg-white/80 hover:bg-white text-gray-800 hover:text-gray-900 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out backdrop-blur-sm"
        >
          <ChevronLeftIcon className="h-4 w-4 sm:h-6 sm:w-6" />
        </Button>
      </div>

      <div className="hidden sm:flex absolute inset-y-0 right-0 items-center z-20">
        <Button
          onClick={nextSlide}
          className="mr-2 sm:mr-4 p-2 sm:p-3 bg-white/80 hover:bg-white text-gray-800 hover:text-gray-900 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out backdrop-blur-sm"
        >
          <ChevronRightIcon className="h-4 w-4 sm:h-6 sm:w-6" />
        </Button>
      </div>

      {/* Индикаторы слайдов */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => setIsPhoto(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ease-in-out ${
              index === isPhoto
                ? "bg-yellow-500 scale-125"
                : "bg-white/60 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
      <div className="absolute top-4 sm:top-6 md:top-8 right-4 sm:right-6 md:right-8 bg-white/80 backdrop-blur-sm px-3 sm:px-4 py-1 sm:py-2 rounded-full shadow-lg">
        <div className="flex items-center space-x-1 text-gray-800 font-semibold">
          <span className="text-lg sm:text-xl md:text-2xl">
            {String(isPhoto + 1).padStart(2, "0")}
          </span>
          <span className="text-sm sm:text-base md:text-lg">/</span>
          <span className="text-sm sm:text-base md:text-lg">
            {String(photos.length).padStart(2, "0")}
          </span>
        </div>
      </div>
      {isOpenForm && techniques?.length !== 0 && (
        <FeedbackForm
          isOpen={isOpenForm}
          onClose={() => setIsOpenForm(false)}
          technique={techniques ? techniques : []}
        />
      )}
    </>
  );
};
