// lib/hooks/projectHooks.ts
"use client";

import { createEntityHooks } from "./entityHooks";
import { CompletedProjects } from "../definitions";

export const projectKeys = {
  all: ["projects"] as const,
  details: () => [...projectKeys.all, "detail"] as const,
  detail: (id: string) => [...projectKeys.details(), id] as const,
};

// Клиентские версии функций
async function fetchProjectsClient() {
  const res = await fetch("/api/projects");
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

async function getProjectClient(id: string) {
  const res = await fetch(`/api/projects/${id}`);
  if (!res.ok) throw new Error("Failed to fetch project");
  return res.json();
}

export const useProjectHooks = () => {
  const hooks = createEntityHooks<
    CompletedProjects,
    Omit<CompletedProjects, "id">,
    CompletedProjects
  >({
    keys: projectKeys,
    fetchAll: fetchProjectsClient, // Используем клиентскую версию
    fetchOne: getProjectClient, // Используем клиентскую версию
    createItem: async (data) => {
      const res = await fetch("/api/projects", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create projects");
      return res.json();
    },
    updateItem: async (id, data) => {
      const res = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update projects");
      return res.json();
    },
    deleteItem: async (id) => {
      const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete projects");
      return res.json();
    },
  });

  return hooks;
};
