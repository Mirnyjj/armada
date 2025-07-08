import { Categories } from "@/app/lib/definitions";
import { sql } from "@/app/lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await sql<Categories[]>`SELECT * FROM categories`;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function POST(categories: Omit<Categories, "id">) {
  try {
    const [newCategories] = await sql<Categories[]>`
            INSERT INTO categories (photo_path, name, title, description, id)
            VALUES (${categories.photo_path}, ${categories.name}, ${categories.title}, ${categories.description})
            RETURNING *
          `;

    return newCategories;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to create categories.");
  }
}

export async function PUT(id: string, categories: Categories) {
  try {
    const [updatedCategories] = await sql<
      Categories[]
    >`UPDATE categories SET photo_path = ${categories.photo_path} title = ${categories.title} description = ${categories.description} name = ${categories.name} WHERE id = ${id} RETURNING *`;
    return updatedCategories;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to update categories.");
  }
}
