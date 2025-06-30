import { CarousePhotos } from "../definitions";
import { createEntityHooks } from "./entityHooks";

// Для проектов
export const photoKeys = {
  all: ["photo"] as const,
  details: () => [...photoKeys.all, "detail"] as const,
  detail: (id: string) => [...photoKeys.details(), id] as const,
};

// Клиентские версии функций
async function fetchPhotoClient() {
  const res = await fetch("/api/photo");
  if (!res.ok) throw new Error("Failed to fetch photos");
  return res.json();
}

async function getPhotoClient(id: string) {
  const res = await fetch(`/api/photo/${id}`);
  if (!res.ok) throw new Error("Failed to fetch photo");
  return res.json();
}

export const useProjectHooks = () => {
  const hooks = createEntityHooks<
    CarousePhotos,
    Omit<CarousePhotos, "id">,
    CarousePhotos
  >({
    keys: photoKeys,
    fetchAll: fetchPhotoClient,
    fetchOne: getPhotoClient,
    createItem: async (data) => {
      const res = await fetch("/api/photo", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create photo");
      return res.json();
    },
    updateItem: async (id, data) => {
      const res = await fetch(`/api/photo/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update photo");
      return res.json();
    },
    deleteItem: async (id) => {
      const res = await fetch(`/api/photo/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete photo");
      return res.json();
    },
  });
  return hooks;
};
