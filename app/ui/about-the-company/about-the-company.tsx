import Image from "next/image";
import imageFoto from "../../../public/carousel/photo13.jpg";

export const AboutTheCompany = () => {
  return (
    <section
      id="company"
      className="max-w-screen-xl mx-auto px-4 py-8 md:py-12 lg:py-16"
    >
      <div className="flex flex-col lg:flex-row gap-8 items-center">
        {/* Текстовый блок */}
        <div className="lg:max-w-[50%] space-y-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            О компании
          </h2>

          <div className="space-y-4 text-gray-700 text-base md:text-lg">
            <p>
              <strong>ООО "Знак Аренды"</strong> – это команда профессионалов,
              обеспечивающая аренду высококачественной спецтехники ведущих
              мировых производителей.
            </p>

            <p>
              С <strong>2000 года</strong> мы успешно работаем на российском
              рынке, заслужив доверие крупнейших компаний страны благодаря
              надежности и профессиональному подходу.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6">
              Наши преимущества:
            </h3>

            <ul className="space-y-3 list-disc pl-5">
              <li>
                <strong>Собственный парк</strong> – более 50 единиц современной
                техники
              </li>
              <li>
                <strong>Оперативная подача</strong> – быстрая доставка
                оборудования в любую точку Москвы и области
              </li>
              <li>
                <strong>Круглосуточная готовность</strong> – решение срочных
                задач и непредвиденных ситуаций
              </li>
              <li>
                <strong>Гибкие условия аренды</strong> – подберем оптимальный
                вариант для вашего проекта
              </li>
            </ul>

            <p className="pt-4">
              Мы гарантируем{" "}
              <strong>качество, надежность и своевременность</strong> выполнения
              работ любой сложности. Доверьте свою технику профессионалам –
              выбирайте <strong>ООО "Знак Аренды"</strong>!
            </p>
          </div>
        </div>

        {/* Изображение */}
        <div className="w-full lg:w-[50%] h-auto aspect-video rounded-lg overflow-hidden shadow-xl">
          <Image
            src={imageFoto}
            alt="Спецтехника ООО Знак Аренды"
            className="object-cover w-full h-full"
            placeholder="blur"
            priority
          />
        </div>
      </div>
    </section>
  );
};
