import { fetchTechnique } from "@/app/api/technique/queries";
import { TechniqueType } from "../definitions";
import { createEntityHooks } from "./entityHooks";

export const techniqueKeys = {
  all: ["technique"] as const,
  details: () => [...techniqueKeys.all, "detail"] as const,
  detail: (id: string) => [...techniqueKeys.details(), id] as const,
};

// Клиентские версии функций
async function fetchTechniqueClient(
  filters?: Parameters<typeof fetchTechnique>[0]
) {
  const query = new URLSearchParams();
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) query.append(key, String(value));
    });
  }

  const res = await fetch(`/api/technique?${query.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch techniques");
  return res.json() as Promise<TechniqueType[]>;
}

async function getTechniqueClient(id: string) {
  const res = await fetch(`/api/technique/${id}`);
  if (!res.ok) throw new Error("Failed to fetch technique");
  return res.json() as Promise<TechniqueType>;
}

export const useTechniqueHooks = () => {
  const hooks = createEntityHooks<
    TechniqueType,
    Omit<TechniqueType, "id">,
    TechniqueType
  >({
    keys: techniqueKeys,
    fetchAll: fetchTechniqueClient,
    fetchOne: getTechniqueClient,
    createItem: async (data) => {
      const res = await fetch("/api/technique", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create technique");
      return res.json();
    },
    updateItem: async (id, data) => {
      const res = await fetch(`/api/technique/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update technique");
      return res.json();
    },
    deleteItem: async (id) => {
      const res = await fetch(`/api/technique/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete technique");
      return res.json();
    },
  });
  return hooks;
};
