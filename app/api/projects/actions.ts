import { revalidatePath } from "next/cache";
import { CompletedProjects } from "../../definitions";
import { sql } from "../../utils";

export async function createProject(project: Omit<CompletedProjects, "id">) {
  try {
    const [newProject] = await sql<CompletedProjects[]>`
            INSERT INTO completed_projects (title, address, description, photo_path)
            VALUES (${project.title}, ${project.address}, ${project.description}, ${project.photo_path})
            RETURNING *
          `;

    return newProject;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to create project.");
  }
}

export async function updateProject(id: string, project: CompletedProjects) {
  try {
    const [updatedProject] = await sql<
      CompletedProjects[]
    >`UPDATE completed_projects SET title = ${project.title} address = ${project.address} description = ${project.description} photo_path = ${project.photo_path} WHERE id = ${id} RETURNING *`;
    revalidatePath("/projects");
    return updatedProject;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to update project.");
  }
}

export async function deleteProject(id: string) {
  try {
    await sql`DELETE FROM completed_projects WHERE id = ${id}`;
    return { id };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to delete project.");
  }
}
