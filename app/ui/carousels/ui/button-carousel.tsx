"use client";

import { Dispatch, SetStateAction } from "react";
import { Button } from "../../button/button";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/24/outline";

type Props = {
  content: number;
  setIsContent: Dispatch<SetStateAction<number>>;
  counter: unknown[];
};

export const ButtonCarousel = ({ content, setIsContent, counter }: Props) => {
  return (
    <div className="flex flex-row items-center justify-center gap-2 sm:gap-4 mt-4 sm:mt-6 w-full">
      <Button
        onClick={() => setIsContent((prev: number) => prev - 1)}
        className="rounded-full bg-white border border-gray-300 p-2 sm:p-3 shadow hover:bg-yellow-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={content === 0}
      >
        <ArrowLongLeftIcon className="w-5 h-5 sm:w-7 sm:h-7 text-gray-500" />
      </Button>

      <Button
        onClick={() => setIsContent((prev) => prev + 1)}
        className="rounded-full bg-white border border-gray-300 p-2 sm:p-3 shadow hover:bg-yellow-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={content === counter.length - 1}
      >
        <ArrowLongRightIcon className="w-5 h-5 sm:w-7 sm:h-7 text-gray-500" />
      </Button>
    </div>
  );
};
