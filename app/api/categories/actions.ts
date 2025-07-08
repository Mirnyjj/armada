import { Categories } from "@/app/lib/definitions";
import { sql } from "@/app/lib/utils";

export async function updateCategories(id: string, categories: Categories) {
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

export async function getCategories(id: string) {
  try {
    const [categories] = await sql<
      Categories[]
    >`SELECT * FROM categories WHERE id = ${id}`;
    return categories;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch categories.");
  }
}

export async function deleteCategories(id: string) {
  try {
    await sql`DELETE FROM categories WHERE id = ${id}`;
    return { id };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to delete categories.");
  }
}
