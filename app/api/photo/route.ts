import { CarousePhotos } from "@/app/lib/definitions";
import { sql } from "@/app/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await sql<CarousePhotos[]>`SELECT * FROM carousel_photos`;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function POST(request: NextRequest): Promise<void | Response> {
  try {
    // Сначала получаем максимальный текущий display_order
    const categoriesData: Omit<CarousePhotos, "id"> = await request.json();
    const maxOrderResult = await sql<{ max: number }[]>`
            SELECT MAX(display_order) as max FROM carousel_photos
          `;

    // Вычисляем следующий порядковый номер
    const nextDisplayOrder = (maxOrderResult[0]?.max || 0) + 1;

    // Создаём новую запись с автоматическим display_order
    const [newPhoto] = await sql<CarousePhotos[]>`
            INSERT INTO carousel_photos (photo_path, display_order, title, description)
            VALUES (${categoriesData.photo_path}, ${nextDisplayOrder}, ${categoriesData.title}, ${categoriesData.description})
            RETURNING *
          `;

    return NextResponse.json(newPhoto, { status: 201 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Ошибка при создании фото" },
      { status: 500 }
    );
  }
}

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function PUT(request: NextRequest, params: RouteParams) {
  const { id } = await params.params;
  const photo: Omit<CarousePhotos, "id"> = await request.json();
  try {
    const [updatedPhoto] = await sql<
      CarousePhotos[]
    >`UPDATE carousel_photos SET photo_path = ${photo.photo_path} title = ${photo.title} description = ${photo.description} WHERE id = ${id} RETURNING *`;
    return NextResponse.json(updatedPhoto, { status: 200 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Ошибка при обновлении фото" },
      { status: 500 }
    );
  }
}
