import { CarousePhotos } from "@/app/lib/definitions";
import { sql } from "@/app/lib/utils";

export async function createCarouselPhoto(
  photo: Omit<CarousePhotos, "id" | "display_order">
) {
  try {
    // Сначала получаем максимальный текущий display_order
    const maxOrderResult = await sql<{ max: number }[]>`
          SELECT MAX(display_order) as max FROM carousel_photos
        `;

    // Вычисляем следующий порядковый номер
    const nextDisplayOrder = (maxOrderResult[0]?.max || 0) + 1;

    // Создаём новую запись с автоматическим display_order
    const [newPhoto] = await sql<CarousePhotos[]>`
          INSERT INTO carousel_photos (photo_path, display_order)
          VALUES (${photo.photo_path}, ${nextDisplayOrder})
          RETURNING *
        `;

    return newPhoto;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to create carousel photo.");
  }
}

export async function updateCarouselPhoto(id: string, photo: CarousePhotos) {
  try {
    const [updatedPhoto] = await sql<
      CarousePhotos[]
    >`UPDATE carousel_photos SET photo_path = ${photo.photo_path} WHERE id = ${id} RETURNING *`;
    return updatedPhoto;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to update photo.");
  }
}

export async function deleteCarouselPhoto(id: string) {
  try {
    await sql`DELETE FROM carousel_photos WHERE id = ${id}`;
    return { id };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to delete photo.");
  }
}
