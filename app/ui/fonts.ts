import { Inter } from "next/font/google";
import { Lusitana } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });
export const lusitana = Lusitana({
  weight: ["400", "700"], // Насыщенность шрифта (обычный и жирный)
  subsets: ["latin"], // Подгружаемый набор символов
  display: "swap", // Для плавного отображения при загрузке
});
