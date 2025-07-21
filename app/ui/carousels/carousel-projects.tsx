"use client";

import { useProjectHooks } from "@/app/lib/hooks/projectHooks";
import { useState } from "react";
import { HorizontalIndicator } from "./ui/horizontal-indicator";
import Image from "next/image";
import { ButtonCarousel } from "./ui/button-carousel";
import { MapPinIcon } from "@heroicons/react/24/outline";

export const CarouselProjects = () => {
  const { useEntityList } = useProjectHooks();
  const { data: projects, isLoading, error } = useEntityList();
  const [isProject, setIsProject] = useState(0);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!projects) return <div>Project undefined</div>;
  return (
    <section
      id="projects"
      className="w-full flex flex-col gap-5 bg-white items-center py-6 sm:py-10"
    >
      <h2 className="text-left font-bold text-2xl sm:text-3xl md:text-4xl max-w-screen-xl my-6 sm:my-12 px-2">
        Реализованные проекты
      </h2>
      <div className="flex flex-col items-center justify-center w-full gap-3">
        {/* Галерея миниатюр */}
        <div className="w-full flex justify-between items-center px-4">
          {projects.map((item, ind) => (
            <div
              key={item.id}
              className="flex justify-center"
              style={{ flex: 1 }}
            >
              <Image
                src={item.photo_path}
                alt={item.title}
                width={200}
                height={200}
                className="object-contain"
                style={{
                  filter:
                    ind === isProject
                      ? "none"
                      : "sepia(100%) brightness(50%) contrast(110%) grayscale(100%)",
                }}
              />
            </div>
          ))}
        </div>
        <HorizontalIndicator counter={projects} content={isProject} />
        {/* Кнопки управления */}
        <div className="w-full flex justify-center lg:justify-end max-w-screen-xl pt-2 sm:pt-6 pr-0 lg:pr-4">
          <ButtonCarousel
            counter={projects}
            content={isProject}
            setIsContent={setIsProject}
          />
        </div>
      </div>
      <div
        key={isProject}
        className="flex flex-col lg:flex-row flex-wrap gap-5 sm:gap-9 max-w-screen-xl relative items-center justify-center w-full px-2 sm:px-6 lg:px-8"
      >
        {projects[isProject].photo_path && projects[isProject].title && (
          <div className="relative w-full lg:w-1/3 aspect-square min-h-[220px] max-w-xs sm:max-w-md lg:max-w-sm mx-auto">
            <Image
              src={projects[isProject].photo_path}
              alt={projects[isProject].title}
              fill
              className="object-contain rounded-xl"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 33vw"
            />
          </div>
        )}
        <div className="flex flex-col gap-3 sm:gap-5 w-full lg:w-1/2 min-h-full justify-between pt-4 lg:pt-0">
          <h3 className="font-bold text-xl sm:text-2xl md:text-3xl text-left animate-fadeInRight">
            {projects[isProject].title}
          </h3>
          <div className="flex flex-nowrap gap-1 animate-fadeInRight items-center">
            <MapPinIcon className="h-5 w-5 text-gray-500" />
            <h6 className="font-bold text-base sm:text-lg">
              {projects[isProject].address}
            </h6>
          </div>
          <p className="font-normal text-left text-base sm:text-lg min-h-[80px] sm:min-h-[120px] md:min-h-[200px] animate-fadeInRight">
            {projects[isProject].description}
          </p>
        </div>
      </div>
    </section>
  );
};
