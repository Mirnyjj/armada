export const SectionPriceAddition = () => {
  const stats = [
    {
      number: "01",
      description:
        "Стоимость аренды крана определяется так: 8 (восемь) часов работы каждой единицы спецтехники в течение смены.",
    },
    {
      number: "02",
      description:
        "География доставки спецтехники – вся территория РФ и страны СНГ.",
    },
    {
      number: "03",
      description:
        "Стоимость мобилизации и демобилизации за МКАД и на территорию в границах ТТК обговаривается индивидуально и требует дополнительной оплаты.",
    },
    {
      number: "04",
      description:
        "Обозначенная в прайс-листе стоимость услуг включает НДС – 20 %.",
    },
  ];

  return (
    <section className="w-full bg-black py-4 sm:py-6 md:py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            Из чего складывается стоимость аренды
          </h2>
        </div>
        {/* Статистика */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group hover:scale-105 transition-transform duration-300 p-2 sm:p-4"
            >
              <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-yellow-500 mb-1 sm:mb-2">
                {stat.number}
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
