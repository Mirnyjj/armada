import clsx from "clsx";

type Props = {
  items: { title: string; id: string }[];
  error?: string;
  isAction?: boolean;
};

export const Select = ({ items, error, isAction }: Props) => {
  return (
    <div className="relative w-full">
      <select
        name="technique"
        itemType="technique"
        className={clsx(
          "w-full rounded-lg border px-4 py-3 text-sm placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0",
          {
            "border-red-300 focus:border-red-500 focus:ring-red-500/20": error,
            "border-gray-300 focus:border-yellow-500 focus:ring-yellow-500/20":
              !error,
            "border-yellow-400": isAction && !error,
          }
        )}
      >
        {items.map((item) => (
          <option key={item.id}>{item.title}</option>
        ))}
      </select>
    </div>
  );
};
