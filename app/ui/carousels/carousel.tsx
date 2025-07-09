"use client";
import Image from "next/image";
import { usePhotoHooks } from "../../lib/hooks/photoHooks";
import { Button } from "../button/button";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export const Carousel = () => {
  const { useEntityList } = usePhotoHooks();
  const { data: photos, isLoading, error } = useEntityList();
  const [isPhoto, setIsPhoto] = useState(0);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!photos) return <div>Photo undefined</div>;
  return (
    <section className="relative w-full h-[60vh]">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={photos[isPhoto].photo_path}
          alt={photos[isPhoto].title}
          fill
          priority
          objectFit="object-cover"
        />
      </div>
      <div
        className="bg-white w-1/2 h-full absolute flex justify-center"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)", // Белый с прозрачностью 70%
        }}
      ></div>
      <div className="relative h-full w-[1280px] mx-auto my-[10%]">
        <div
          key={isPhoto}
          className="flex flex-col gap-8 items-center justify-center w-1/2 animate-fadeInTop"
        >
          <h1 className="font-bold text-4xl ">{photos[isPhoto].title}</h1>
          <span className="font-normal text-xl transition-opacity duration-700">
            {photos[isPhoto].description}
          </span>
          <div className="flex justify-between gap-3">
            <Button className="px-11 py-3 bg-yellow-500 text-white hover:bg-yellow-400 duration-300 ease-in-out">
              Заказать звонок
            </Button>
            <Button className=" px-11 py-3 text-black border-black border-[1px] hover:bg-yellow-400 duration-300 ease-in-out">
              Котолог техники
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-row absolute z-20 bottom-0 left-1/2 transform -translate-x-1/2 ">
        <Button
          onClick={() => setIsPhoto((prev) => prev - 1)}
          className="bg-[#cabfbf] rounded-none px-4 border-white border-[1px] hover:bg-yellow-400 duration-300 ease-in-out"
          disabled={isPhoto === 0}
        >
          <ChevronLeftIcon className="h-6 w-6 text-white" />
        </Button>

        <Button
          onClick={() => setIsPhoto((prev) => prev + 1)}
          className="bg-yellow-500 px-4 rounded-none hover:bg-yellow-400 duration-300 ease-in-out"
          disabled={isPhoto === photos.length - 1}
        >
          <ChevronRightIcon className="h-6 w-6 text-white" />
        </Button>
      </div>
      <div className="flex flex-row absolute z-20 top-3 right-4 text-white items-center">
        <div className="font-extrabold text-4xl">{`0${isPhoto + 1}`}/</div>
        <div className="font-extrabold text-xl">{`0${photos.length}`}</div>
      </div>
    </section>
  );
};
