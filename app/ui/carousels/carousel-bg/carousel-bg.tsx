import Image from "next/image";
import { fetchCarouselPhotos } from "@/app/lib/data";
import { CarouselContent } from "./CarouselContent.client";

export const CarouselBG = async () => {
  const photos = await fetchCarouselPhotos();
  let isPhoto = 0;

  if (!photos)
    return (
      <div className="w-screen h-[40vh] sm:h-[50vh] md:h-[60vh] bg-white flex items-center justify-center">
        <div className="text-gray-500 text-lg">Фотографии не найдены</div>
      </div>
    );

  return (
    <section className="relative w-screen h-[40vh] sm:h-[50vh] md:h-[60vh] bg-white overflow-hidden">
      {/* Фоновое изображение */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={photos[isPhoto].photo_path}
          alt={photos[isPhoto].title}
          quality={100}
          fill
          sizes="100vw"
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
          priority
        />
      </div>

      <CarouselContent photos={photos} />
    </section>
  );
};
