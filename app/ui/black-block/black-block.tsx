import { Counter } from "./counter";

export const BlackBlock = () => {
  const stats = [
    {
      number: 25,
      label: "Лет опыта",
      description: "Успешной работы на рынке",
    },
    {
      number: 150,
      label: "Единиц техники",
      description: "В нашем автопарке",
    },
    {
      number: 1000,
      label: "Довольных клиентов",
      description: "За все время работы",
    },
    {
      number: 24,
      label: "Часа в сутки",
      description: "Готовы к работе",
    },
  ];

  return (
    <section className="w-full bg-black py-4 sm:py-6 md:py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            Наши достижения
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto px-2">
            За годы работы мы заслужили доверие сотен клиентов и стали надежным
            партнером в сфере аренды спецтехники
          </p>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group hover:scale-105 transition-transform duration-300 p-2 sm:p-4"
            >
              <div className="mb-2 sm:mb-4">
                <Counter
                  end={stat.number}
                  duration={2500}
                  suffix={
                    stat.label.includes("Лет")
                      ? "+"
                      : stat.label.includes("Часа")
                      ? ""
                      : "+"
                  }
                />
              </div>
              <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-yellow-500 mb-1 sm:mb-2">
                {stat.label}
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-400 leading-tight">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
