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
    <section className="relative flex flex-col">
      <div
        style={{
          position: "relative",
          width: "100vw",
          height: "70vh",
        }}
      >
        <div
          className="bg-white w-1/2 h-full absolute z-10 "
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.8)", // Белый с прозрачностью 70%
          }}
        >
          <div
            key={isPhoto}
            className="flex flex-col gap-8 items-center justify-end mt-[20%] ml-[20%] w-[60%] animate-fadeIn"
          >
            <h1 className="font-bold text-4xl ">{photos[isPhoto].title}</h1>
            <span className="font-normal text-xl transition-opacity duration-700">
              {photos[isPhoto].description}
            </span>
            <div className="flex justify-between gap-3">
              <Button className="px-11 py-3 bg-yellow-500 text-white">
                Заказать звонок
              </Button>
              <Button className=" px-11 py-3 text-black border-black border-[1px]">
                Котолог техники
              </Button>
            </div>
          </div>
        </div>
        <Image
          src={photos[isPhoto].photo_path}
          alt={photos[isPhoto].title}
          fill
          priority
          style={{ objectFit: "cover" }}
        />
        <div className="flex flex-row absolute z-20 bottom-0 left-1/2 transform -translate-x-1/2 ">
          <Button
            onClick={() => setIsPhoto((prev) => prev + 1)}
            className="bg-[#cabfbf] rounded-none border-white border-[1px]"
            disabled={isPhoto === photos.length - 1}
          >
            <ChevronLeftIcon className="h-6 w-6 text-white" />
          </Button>
          <Button
            onClick={() => setIsPhoto((prev) => prev - 1)}
            className="bg-yellow-500 rounded-none"
            disabled={isPhoto === 0}
          >
            <ChevronRightIcon className="h-6 w-6 text-white" />
          </Button>
        </div>
        <div className="flex flex-row absolute z-20 top-3 right-4 text-white items-center">
          <div className="font-extrabold text-4xl">{`0${isPhoto + 1}`}/</div>
          <div className="font-extrabold text-xl">{`0${photos.length}`}</div>
        </div>
      </div>
    </section>
  );
};
