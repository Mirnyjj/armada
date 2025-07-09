"use client";

import { useCategoryHooks } from "@/app/lib/hooks/categoriesHooks";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../button/button";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/24/outline";

export const CarouselCategories = () => {
  const { useEntityList } = useCategoryHooks();
  const { data: categories, isLoading, error } = useEntityList();
  const [isPhoto, setIsPhoto] = useState(0);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!categories) return <div>Photo undefined</div>;

  return (
    <section className="flex flex-col gap-7 items-center justify-center w-full animate-fadeInRight bg-white py-10">
      <h2 className="text-left font-bold text-4xl text-yellow-600 flex flex-row gap-2">
        <div> Спецтехника</div>
        <div className=" text-black">в аренду</div>
      </h2>

      <div
        key={isPhoto}
        className="flex flex-wrap gap-9 max-w-screen-xl relative items-center justify-center"
      >
        {categories[isPhoto].photo_path && categories[isPhoto].title && (
          <div className="relative w-1/3 aspect-square">
            <Image
              src={categories[isPhoto].photo_path}
              alt={categories[isPhoto].title}
              fill
              className="object-cover" // или object-contain
              sizes="(max-width: 768px) 100vw, 50vw" // Оптимизация загрузки под разные экраны
            />
          </div>
        )}
        <div className="flex flex-col gap-5 w-1/2 min-h-full justify-between">
          <h3 className="font-bold text-3xl text-left animate-fadeInRight">
            {categories[isPhoto].title}
          </h3>
          <p className="font-normal text-left text-lg min-h-[200px] animate-fadeInRight">
            {categories[isPhoto].description}
          </p>
          <Button className="px-11 py-3 w-1/3 bg-yellow-500 text-white hover:bg-yellow-400 duration-300 ease-in-out">
            Выбрать технику
          </Button>
          <div className="flex justify-between w-full items-center">
            {Array.from({ length: categories.length }).map((item, ind) => (
              <span
                key={ind}
                className={` ${
                  isPhoto === ind ? "bg-[#535554] h-1" : "bg-[#C4C4C4] h-[3px]"
                } w-full`}
              />
            ))}
            <div className="flex flex-row absolute z-20 bottom-10 right-0 transform -translate-x-1/2 -translate-y-10 items-center gap-3">
              <Button
                onClick={() => setIsPhoto((prev) => prev - 1)}
                className="rounded-none bg-transparent p-0"
                disabled={isPhoto === 0}
              >
                <ArrowLongLeftIcon className="w-8 text-gray-500" />
              </Button>
              <div className="w-8 h-8 border-yellow-500 border-[2px] -mr-4"></div>
              <Button
                onClick={() => setIsPhoto((prev) => prev + 1)}
                className="absolute rounded-none bg-transparent p-0 -right-1"
                disabled={isPhoto === categories.length - 1}
              >
                <ArrowLongRightIcon className="w-8 text-gray-500" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
