"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function createEntityHooks<T extends { id: string }, TCreate, TUpdate>({
  keys,
  fetchAll,
  fetchOne,
  createItem,
  updateItem,
  deleteItem,
}: {
  keys: any;
  fetchAll: () => Promise<T[]>;
  fetchOne: (id: string) => Promise<T>;
  createItem: (data: TCreate) => Promise<T>;
  updateItem: (id: string, data: TUpdate) => Promise<T>;
  deleteItem: (id: string) => Promise<{ id: string }>;
}) {
  function useEntityList() {
    return useQuery<T[], Error>({
      queryKey: keys.all,
      queryFn: fetchAll,
    });
  }

  function useEntity(id: string) {
    return useQuery<T, Error>({
      queryKey: keys.detail(id),
      queryFn: () => fetchOne(id),
      enabled: !!id,
    });
  }

  function useCreateEntity() {
    const queryClient = useQueryClient();
    return useMutation<T, Error, TCreate>({
      mutationFn: createItem,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: keys.all });
      },
    });
  }

  function useUpdateEntity() {
    const queryClient = useQueryClient();
    return useMutation<T, Error, { id: string; data: TUpdate }>({
      mutationFn: ({ id, data }) => updateItem(id, data),
      onSuccess: (data, variables) => {
        queryClient.setQueryData(keys.detail(variables.id), data);
        queryClient.invalidateQueries({ queryKey: keys.all });
      },
    });
  }

  function useDeleteEntity() {
    const queryClient = useQueryClient();
    return useMutation<{ id: string }, Error, string>({
      mutationFn: deleteItem,
      onSuccess: (_, id) => {
        queryClient.removeQueries({ queryKey: keys.detail(id) });
        queryClient.invalidateQueries({ queryKey: keys.all });
      },
    });
  }

  return {
    useEntityList,
    useEntity,
    useCreateEntity,
    useUpdateEntity,
    useDeleteEntity,
  };
}
