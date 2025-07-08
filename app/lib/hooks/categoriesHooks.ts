// lib/hooks/projectHooks.ts
"use client";

import { Categories } from "../definitions";
import { createEntityHooks } from "./entityHooks";

export const categoriesKeys = {
  all: ["categories"] as const,
  details: () => [...categoriesKeys.all, "detail"] as const,
  detail: (id: string) => [...categoriesKeys.details(), id] as const,
};

// Клиентские версии функций
async function fetchCategoriesClient() {
  const res = await fetch("/api/categories");
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

async function getCategoryClient(id: string) {
  const res = await fetch(`/api/projects/${id}`);
  if (!res.ok) throw new Error("Failed to fetch category");
  return res.json();
}

export const useCategoryHooks = () => {
  const hooks = createEntityHooks<
    Categories,
    Omit<Categories, "id">,
    Categories
  >({
    keys: categoriesKeys,
    fetchAll: fetchCategoriesClient, // Используем клиентскую версию
    fetchOne: getCategoryClient, // Используем клиентскую версию
    createItem: async (data) => {
      const res = await fetch("/api/categories", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create categories");
      return res.json();
    },
    updateItem: async (id, data) => {
      const res = await fetch(`/api/categories/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update categories");
      return res.json();
    },
    deleteItem: async (id) => {
      const res = await fetch(`/api/categories/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete categories");
      return res.json();
    },
  });

  return hooks;
};
