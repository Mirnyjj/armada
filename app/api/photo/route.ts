import { CarousePhotos } from "@/app/lib/definitions";
import { sql } from "@/app/lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await sql<CarousePhotos[]>`SELECT * FROM carousel_photos`;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function POST(photo: Omit<CarousePhotos, "id" | "display_order">) {
  try {
    // Сначала получаем максимальный текущий display_order
    const maxOrderResult = await sql<{ max: number }[]>`
            SELECT MAX(display_order) as max FROM carousel_photos
          `;

    // Вычисляем следующий порядковый номер
    const nextDisplayOrder = (maxOrderResult[0]?.max || 0) + 1;

    // Создаём новую запись с автоматическим display_order
    const [newPhoto] = await sql<CarousePhotos[]>`
            INSERT INTO carousel_photos (photo_path, display_order, title, description)
            VALUES (${photo.photo_path}, ${nextDisplayOrder}, ${photo.title}, ${photo.description})
            RETURNING *
          `;

    return newPhoto;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to create carousel photo.");
  }
}

export async function PUT(id: string, photo: CarousePhotos) {
  try {
    const [updatedPhoto] = await sql<
      CarousePhotos[]
    >`UPDATE carousel_photos SET photo_path = ${photo.photo_path} title = ${photo.title} description = ${photo.description} WHERE id = ${id} RETURNING *`;
    return updatedPhoto;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to update photo.");
  }
}
