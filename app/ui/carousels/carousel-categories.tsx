"use client";
import { useState } from "react";
import Image from "next/image";
import { useCategoryHooks } from "@/app/lib/hooks/categoriesHooks";
import { HorizontalIndicator } from "./ui/horizontal-indicator";
import { ButtonCarousel } from "./ui/button-carousel";
import Link from "next/link";

export const CarouselCategories = () => {
  const { useEntityList } = useCategoryHooks();
  const { data: categories, isLoading, error } = useEntityList();
  const [isCategories, setIsCategories] = useState(0);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!categories) return <div>Photo undefined</div>;

  return (
    <section
      id="technique"
      className="flex flex-col gap-5 sm:gap-7 items-center justify-center w-full animate-fadeInRight bg-white py-6 sm:py-10"
    >
      <h2 className="max-w-screen-xl text-left font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-yellow-600 flex flex-row gap-1 sm:gap-2 flex-wrap">
        <span>Спецтехника</span>
        <span className="text-black">в аренду</span>
      </h2>

      <div
        key={isCategories}
        className="flex flex-col lg:flex-row flex-wrap gap-5 sm:gap-9 max-w-screen-xl relative items-center justify-center w-full px-2 sm:px-6 lg:px-8"
      >
        {categories[isCategories].photo_path &&
          categories[isCategories].title && (
            <div className="relative w-full sm:w-2/3 lg:w-1/3 aspect-square min-h-[220px] max-w-xs sm:max-w-md lg:max-w-sm mx-auto">
              <Image
                src={categories[isCategories].photo_path}
                alt={categories[isCategories].title}
                fill
                className="object-contain rounded-xl"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 33vw"
              />
            </div>
          )}
        <div className="flex flex-col gap-3  sm:gap-5 w-full sm:w-2/3 lg:w-1/2 min-h-full justify-between pt-4 sm:pt-0">
          <h3 className="font-bold text-xl sm:text-2xl md:text-3xl text-left animate-fadeInRight">
            {categories[isCategories].title}
          </h3>
          <p className="font-normal text-left text-base sm:text-lg min-h-[80px] sm:min-h-[120px] md:min-h-[200px] animate-fadeInRight">
            {categories[isCategories].description}
          </p>
          <Link
            href="#catalog"
            className="px-6 py-3 w-full sm:w-1/2 lg:w-1/3 bg-yellow-500 text-white hover:bg-yellow-400 duration-300 ease-in-out"
          >
            Выбрать технику
          </Link>
          <HorizontalIndicator counter={categories} content={isCategories} />
          <ButtonCarousel
            counter={categories}
            content={isCategories}
            setIsContent={setIsCategories}
          />
        </div>
      </div>
    </section>
  );
};
