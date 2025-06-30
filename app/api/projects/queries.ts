import { CompletedProjects } from "@/app/lib/definitions";
import { sql } from "@/app/lib/utils";

export async function fetchCompletedProjects() {
  try {
    const data = await sql<
      CompletedProjects[]
    >`SELECT * FROM completed_projects`;
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function getProject(id: string) {
  try {
    const [technique] = await sql<
      CompletedProjects[]
    >`SELECT * FROM completed_projects WHERE id = ${id}`;
    return technique;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch project.");
  }
}
