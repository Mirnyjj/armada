"use client";

type Props = {
  counter: unknown[];
  content: number;
};

export const HorizontalIndicator = ({ counter, content }: Props) => {
  return (
    <div className="flex justify-between w-full items-center">
      {Array.from({ length: counter.length }).map((item, ind) => (
        <span
          key={ind}
          className={` ${
            content === ind ? "bg-[#535554] h-1" : "bg-[#C4C4C4] h-[3px]"
          } w-full`}
        />
      ))}
    </div>
  );
};
