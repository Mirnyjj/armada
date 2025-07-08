import { TechniqueType } from "@/app/lib/definitions";
import { sql } from "@/app/lib/utils";

export async function createTechnique(technique: Omit<TechniqueType, "id">) {
  try {
    const [newTechnique] = await sql<TechniqueType[]>`
        INSERT INTO technique (title, bucket_volume, max_depth, weight, load_capacity_auto, load_capacity_arrow, boom_reach, side_length, price, id_categories)
        VALUES (${technique.title}, ${technique.bucket_volume}, ${technique.max_depth}, ${technique.weight}, ${technique.load_capacity_auto}, ${technique.load_capacity_arrow}, ${technique.boom_reach}, ${technique.side_length}, ${technique.price}, ${technique.id_categories})
        RETURNING *
      `;
    return newTechnique;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to create technique.");
  }
}

export async function updateTechnique(id: string, technique: TechniqueType) {
  try {
    const [updatedTechnique] = await sql<
      TechniqueType[]
    >`UPDATE technique SET title = ${technique.title},
  bucket_volume = ${technique.bucket_volume}, max_depth = ${technique.max_depth}, weight = ${technique.weight},load_capacity_auto = ${technique.load_capacity_auto}, load_capacity_arrow = ${technique.load_capacity_arrow}, boom_reach = ${technique.boom_reach}, side_length = ${technique.side_length}, price = ${technique.price}, id_categories = ${technique.id_categories}  WHERE id = ${id} RETURNING *`;
    return updatedTechnique;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to update technique.");
  }
}

export async function deleteTechnique(id: string) {
  try {
    await sql`DELETE FROM technique WHERE id = ${id}`;
    return { id };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to delete technique.");
  }
}
