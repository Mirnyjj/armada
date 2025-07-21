"use client";

import { useState, useMemo } from "react";
import { useTechniqueHooks } from "@/app/lib/hooks/techniqueHooks";
import { ButtonCarousel } from "./ui/button-carousel";
import { Card } from "./ui/Card";
import { FeedbackForm } from "../forms/feedback-form";
import { TechniqueType } from "@/app/lib/definitions";

export const CarouselTechnique = () => {
  const [isTechnique, setIsTechnique] = useState(0);
  const [isTechniqueForm, setIsTechniqueForm] = useState<TechniqueType | null>(
    null
  );
  const [isOpenForm, setIsOpenForm] = useState(false);

  // Загрузка техники
  const { useEntityList: useTechniqueList } = useTechniqueHooks();
  const {
    data: techniques,
    isLoading: isTechniquesLoading,
    error: techniquesError,
  } = useTechniqueList();

  // Вычисляем порядок карточек так, чтобы активная была по центру
  const visibleCount = techniques?.length || 0;
  const centerIndex = Math.floor(visibleCount / 2);
  const rotated = useMemo(() => {
    if (!techniques || techniques.length === 0) return [];
    // Сдвигаем массив так, чтобы активная была по центру
    const arr = [...techniques];
    const shift =
      (isTechnique - centerIndex + techniques.length) % techniques.length;
    return arr.slice(shift).concat(arr.slice(0, shift));
  }, [techniques, isTechnique, centerIndex]);

  if (isTechniquesLoading) return <div>Loading...</div>;
  if (techniquesError) return <div>Error: {techniquesError.message}</div>;
  if (!techniques) return <div>Techniques undefined</div>;

  return (
    <>
      <section
        id="catalog"
        className="flex flex-col gap-5 sm:gap-7 items-center justify-center w-full animate-fadeInRight py-6 sm:py-10"
      >
        <h2 className="max-w-screen-xl text-left font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl flex flex-row gap-1 sm:gap-2 flex-wrap">
          Каталог техники
        </h2>
        <div className="w-full relative">
          <div className="w-screen max-w-full overflow-hidden mx-auto flex justify-center">
            <div className="flex flex-nowrap items-stretch gap-4">
              {rotated.map((item, ind) => (
                <Card
                  key={`${item.id}-${ind}`}
                  item={item}
                  ind={ind}
                  centerIndex={centerIndex}
                  setIsTechnique={setIsTechniqueForm}
                  setIsOpen={setIsOpenForm}
                />
              ))}
            </div>
          </div>
        </div>
        <ButtonCarousel
          counter={techniques}
          content={isTechnique}
          setIsContent={setIsTechnique}
        />
      </section>
      {isOpenForm && isTechniqueForm && (
        <FeedbackForm
          isOpen={isOpenForm}
          onClose={() => setIsOpenForm(false)}
          technique={[isTechniqueForm]}
        />
      )}
    </>
  );
};
