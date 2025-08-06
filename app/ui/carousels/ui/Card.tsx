"use client";

import { TechniqueType } from "@/app/lib/definitions";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

type Props = {
  item: TechniqueType;
  ind: number;
  centerIndex: number;
  setIsTechnique: Dispatch<SetStateAction<TechniqueType | null>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};
export const Card = ({
  item,
  ind,
  centerIndex,
  setIsTechnique,
  setIsOpen,
}: Props) => {
  return (
    <div
      className={`flex-shrink-0 w-[300px] h-[520px]  bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm ${
        ind === centerIndex
          ? "border-t-[1px] border-b-[1px] border-yellow-400"
          : ""
      }`}
    >
      <div className="h-[200px] min-h-[200px] flex items-center justify-center bg-gray-100 p-4">
        <Image
          src={item.photo_path}
          alt={item.title}
          width={298}
          height={200}
          className="object-contain h-full w-full bg-white p-2"
          style={{
            filter:
              ind === centerIndex
                ? "none"
                : "sepia(100%) brightness(50%) contrast(110%) grayscale(100%)",
          }}
        />
      </div>
      <div className=" flex flex-col gap-3 flex-grow min-h-[170px]">
        <h5 className="px-4 pt-2 font-bold text-xl text-left min-h-[60px] max-h-[60px] flex items-center line-clamp-2">
          {item.title}
        </h5>
        <span className="w-full h-[1px] bg-yellow-400" />
        <div className="px-4 grid grid-cols-1 gap-y-2 text-sm min-h-[98px]">
          {+item.max_depth > 0 && (
            <div className="flex justify-between">
              <p className="text-gray-600 min-h-[20px]">
                Максимальная глубина копания:
              </p>
              <p className="min-h-[20px]">{item.max_depth} м</p>
            </div>
          )}
          {+item.bucket_volume > 0 && (
            <div className="flex justify-between">
              <p className="text-gray-600 min-h-[20px]">Объем ковша:</p>
              <p className="min-h-[20px]">{item.bucket_volume} м³</p>
            </div>
          )}
          {+item.weight > 0 && (
            <div className="flex justify-between">
              <p className="text-gray-600 min-h-[20px]">Масса:</p>
              <p className="min-h-[20px]">{item.weight} т</p>
            </div>
          )}
          {+item.load_capacity_auto > 0 && (
            <div className="flex justify-between">
              <p className="text-gray-600 min-h-[20px]">
                Грузоподъемность авто:
              </p>
              <p className="min-h-[20px]">{item.load_capacity_auto} т</p>
            </div>
          )}
          {+item.load_capacity_arrow > 0 && (
            <div className="flex justify-between">
              <p className="text-gray-600 min-h-[20px]">
                Грузоподъемность стрелы:
              </p>
              <p className="min-h-[20px]">{item.load_capacity_arrow} т</p>
            </div>
          )}
          {+item.boom_reach > 0 && (
            <div className="flex justify-between">
              <p className="text-gray-600 min-h-[20px]">Вылет стрелы:</p>
              <p className="min-h-[20px]">{item.boom_reach} м</p>
            </div>
          )}
          {+item.side_length > 0 && (
            <div className="flex justify-between">
              <p className="text-gray-600 min-h-[20px]">Длина бортов:</p>
              <p className="min-h-[20px]">{item.side_length} м</p>
            </div>
          )}
          {+item.shaft_width > 0 && (
            <div className="flex justify-between">
              <p className="text-gray-600 min-h-[20px]">
                Ширина вибрационного вальца
              </p>
              <p className="min-h-[20px]">{item.shaft_width} м</p>
            </div>
          )}
          {+item.price > 0 && (
            <div className="flex justify-between">
              <p className="text-gray-600 min-h-[20px]">Стоимость:</p>
              <p className="min-h-[20px]">{item.price} ₽ в час</p>
            </div>
          )}
        </div>
      </div>
      <div className="p-4 mt-auto">
        <button
          onClick={() => {
            setIsTechnique(() => item);
            setIsOpen(() => true);
          }}
          className="w-full py-2 bg-yellow-400 hover:bg-yellow-500 rounded-md font-medium transition-colors"
        >
          Арендовать
        </button>
      </div>
    </div>
  );
};
