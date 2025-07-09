import {
  AcademicCapIcon,
  CheckCircleIcon,
  ClockIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { Button } from "../button/button";

const iconsRelibability = [
  {
    icon: <ClockIcon className="h-20 w-20 text-yellow-600" />,
    title: "Соблюдение сроков",
  },
  {
    icon: <WrenchScrewdriverIcon className="h-20 w-20 text-yellow-600" />,
    title: "Сопровождение клиентов",
  },
  {
    icon: <AcademicCapIcon className="h-20 w-20 text-yellow-600" />,
    title: "Команда профессионалов",
  },
  {
    icon: <CheckCircleIcon className="h-20 w-20 text-yellow-600" />,
    title: "Техника, которая вас не подведет",
  },
];

export const SectionRelibability = () => {
  return (
    <section className="relative flex flex-row pt-10 max-w-screen-xl items-center justify-between">
      <div className="flex flex-col justify-start gap-12 w-1/2">
        <h2 className="text-4xl font-bold">С нами надежно</h2>{" "}
        <div className="text-lg font-normal">
          <p>
            ООО "Знак" успешно работает на рынке спецтехники с 2000 года. За это
            время компания зарекомендовала себя как надежного поставщика
            качественных решений в сфере грузоподъемного оборудования. <br />
            <br />В автопарке компании представлены гусеничные и мобильные краны
            ведущих мировых брендов. Мы предлагаем технику различной
            грузоподъемности, которая подходит для выполнения самых сложных
            задач, включая монтажные, погрузочные, транспортные и
            специализированные работы. <br />
            <br />
            Обращение в ООО "Знак" – это гарантия профессионального подхода и
            комплексного решения ваших задач. Наши специалисты подберут
            оптимальную технику и обеспечат сопровождение на всех этапах
            сотрудничества. <br />
            <br />
            Для получения подробной информации свяжитесь с нашими менеджерами
            или закажите обратный звонок – мы готовы ответить на все ваши
            вопросы.
          </p>
        </div>
        <Button className="px-11 py-3 w-1/3 bg-yellow-500 text-white hover:bg-yellow-400 duration-300 ease-in-out">
          Заказать звонок
        </Button>
      </div>
      <div className="flex items-center flex-wrap gap-6 w-1/4 h-1/4 mr-[10%]">
        {iconsRelibability.map((item, ind) => (
          <div
            key={ind}
            className="flex flex-col gap-3 max-w-36 text-center items-center justify-center"
          >
            {item.icon}
            <p className="font-medium text-lg">{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
