"use client";
import Image from "next/image";
import { usePhotoHooks } from "../../lib/hooks/photoHooks";
import { Button } from "../button/button";
import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export const Carousel = () => {
  const { useEntityList } = usePhotoHooks();
  const { data: photos, isLoading, error } = useEntityList();
  const [isPhoto, setIsPhoto] = useState(0);

  // Автоматическое переключение слайдов
  useEffect(() => {
    if (!photos || photos.length <= 1) return;
    
    const interval = setInterval(() => {
      setIsPhoto((prev) => (prev + 1) % photos.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [photos]);

  if (isLoading) return (
    <div className="w-screen h-[60vh] bg-white flex items-center justify-center">
      <div className="text-gray-500 text-lg">Загрузка...</div>
    </div>
  );
  
  if (error) return (
    <div className="w-screen h-[60vh] bg-white flex items-center justify-center">
      <div className="text-red-500 text-lg">Ошибка: {error.message}</div>
    </div>
  );
  
  if (!photos) return (
    <div className="w-screen h-[60vh] bg-white flex items-center justify-center">
      <div className="text-gray-500 text-lg">Фотографии не найдены</div>
    </div>
  );

  const nextSlide = () => {
    setIsPhoto((prev) => (prev + 1) % photos.length);
  };

  const prevSlide = () => {
    setIsPhoto((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <section className="relative w-screen h-[60vh] bg-white overflow-hidden">
      {/* Фоновое изображение */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={photos[isPhoto].photo_path}
          alt={photos[isPhoto].title}
          quality={100}
          fill
          sizes="100vw"
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
          }}
          priority
        />
      </div>

      {/* Градиентный оверлей */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent"></div>

      {/* Контент */}
      <div className="relative h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-full">
          <div className="w-full md:w-1/2 lg:w-2/5 space-y-8">
            <div
              key={isPhoto}
              className="animate-fadeIn"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                {photos[isPhoto].title}
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mt-6 leading-relaxed">
                {photos[isPhoto].description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button className="px-8 py-4 bg-yellow-500 text-white hover:bg-yellow-600 transition-all duration-300 ease-in-out text-lg font-semibold shadow-lg hover:shadow-xl">
                  Заказать звонок
                </Button>
                <Button className="px-8 py-4 text-gray-900 border-2 border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 ease-in-out text-lg font-semibold">
                  Каталог техники
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Кнопки навигации */}
      <div className="absolute inset-y-0 left-0 flex items-center">
        <Button
          onClick={prevSlide}
          className="ml-4 p-3 bg-white/80 hover:bg-white text-gray-800 hover:text-gray-900 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out backdrop-blur-sm"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </Button>
      </div>

      <div className="absolute inset-y-0 right-0 flex items-center">
        <Button
          onClick={nextSlide}
          className="mr-4 p-3 bg-white/80 hover:bg-white text-gray-800 hover:text-gray-900 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out backdrop-blur-sm"
        >
          <ChevronRightIcon className="h-6 w-6" />
        </Button>
      </div>

      {/* Индикаторы слайдов */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => setIsPhoto(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ease-in-out ${
              index === isPhoto 
                ? 'bg-yellow-500 scale-125' 
                : 'bg-white/60 hover:bg-white/80'
            }`}
          />
        ))}
      </div>

      {/* Счетчик слайдов */}
      <div className="absolute top-8 right-8 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
        <div className="flex items-center space-x-1 text-gray-800 font-semibold">
          <span className="text-2xl">{String(isPhoto + 1).padStart(2, '0')}</span>
          <span className="text-lg">/</span>
          <span className="text-lg">{String(photos.length).padStart(2, '0')}</span>
        </div>
      </div>
    </section>
  );
};
