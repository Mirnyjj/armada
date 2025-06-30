import { CarousePhotos } from "@/app/lib/definitions";
import { sql } from "@/app/lib/utils";

export async function fetchCarouselPhotos() {
  try {
    const data = await sql<CarousePhotos[]>`SELECT * FROM carousel_photos`;
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function getCarouselPhoto(id: string) {
  try {
    const [photo] = await sql<
      CarousePhotos[]
    >`SELECT * FROM carousel_photos WHERE id = ${id}`;
    return photo;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch photo.");
  }
}
