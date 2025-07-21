import {
  ShieldCheckIcon,
  ClockIcon,
  CogIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

export function SectionReliability() {
  const features = [
    {
      icon: ShieldCheckIcon,
      title: "Надежность",
      description: "Проверенное качество и долговечность техники",
    },
    {
      icon: ClockIcon,
      title: "Скорость",
      description: "Быстрая доставка и монтаж оборудования",
    },
    {
      icon: CogIcon,
      title: "Сервис",
      description: "Полное техническое обслуживание и поддержка",
    },
    {
      icon: WrenchScrewdriverIcon,
      title: "Ремонт",
      description: "Профессиональный ремонт и замена запчастей",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Почему выбирают нас
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Мы обеспечиваем высокое качество услуг и надежное партнерство
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
                <feature.icon className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
