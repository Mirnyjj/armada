import { sql } from "@/app/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await sql<Categories[]>`SELECT * FROM categories`;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

interface Categories {
  id: string;
  photo_path: string;
  name: string;
  title: string;
  description: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Получаем данные из тела запроса
    const categoriesData: Omit<Categories, "id"> = await request.json();

    // Валидация данных
    if (!categoriesData.photo_path || !categoriesData.name) {
      return NextResponse.json(
        { error: "Необходимы photo_path и name" },
        { status: 400 }
      );
    }

    // Вставляем данные в БД
    const [newCategories] = await sql<Categories[]>`
      INSERT INTO categories (photo_path, name, title, description)
      VALUES (${categoriesData.photo_path}, ${categoriesData.name}, 
              ${categoriesData.title}, ${categoriesData.description})
      RETURNING *
    `;

    // Возвращаем созданную категорию
    return NextResponse.json(newCategories, { status: 201 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Ошибка при создании категории" },
      { status: 500 }
    );
  }
}

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function PUT(
  request: NextRequest,
  params: RouteParams
): Promise<NextResponse> {
  try {
    // Получаем ID из параметров маршрута
    const { id } = await params.params;

    // Получаем данные из тела запроса
    const categoriesData: Omit<Categories, "id"> = await request.json();

    // Валидация данных
    if (!id || !categoriesData.photo_path || !categoriesData.name) {
      return NextResponse.json(
        { error: "Необходимы ID, photo_path и name" },
        { status: 400 }
      );
    }

    // Обновляем данные в БД
    const [updatedCategories] = await sql<Categories[]>`
      UPDATE categories 
      SET 
        photo_path = ${categoriesData.photo_path},
        title = ${categoriesData.title},
        description = ${categoriesData.description},
        name = ${categoriesData.name}
      WHERE id = ${id}
      RETURNING *
    `;

    // Возвращаем обновленную категорию
    return NextResponse.json(updatedCategories, { status: 200 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Ошибка при обновлении категории" },
      { status: 500 }
    );
  }
}
