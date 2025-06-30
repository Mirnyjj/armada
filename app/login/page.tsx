"use client";

import { CompletedProjects } from "../lib/definitions";
import { useProjectHooks } from "../lib/hooks/projectHooks";

export default function LoginPage() {
  // Получаем хуки для работы с проектами
  const { useEntityList, useCreateEntity, useUpdateEntity, useDeleteEntity } =
    useProjectHooks();

  // Используем хук для получения списка проектов
  const { data: projects, isLoading, error, refetch } = useEntityList();

  // Хуки для мутаций
  const createMutation = useCreateEntity();
  const updateMutation = useUpdateEntity();
  const deleteMutation = useDeleteEntity();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Обработчик создания проекта
  const handleCreate = async () => {
    try {
      await createMutation.mutateAsync({
        title: "New Project",
        address: "123 Main St",
        description: "Sample description",
        photo_path: "/images/default.jpg",
      });
      refetch(); // Перезагружаем список после создания
    } catch (err) {
      console.error("Create error:", err);
    }
  };

  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">{/* <AcmeLogo /> */}</div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Projects List</h3>
            <button
              onClick={handleCreate}
              disabled={createMutation.isPending}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              {createMutation.isPending ? "Creating..." : "Add Project"}
            </button>
          </div>

          <ul className="mt-2 space-y-1">
            {projects?.map((project: CompletedProjects) => (
              <li
                key={project.id}
                className="p-2 border rounded flex justify-between"
              >
                <span>{project.title}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      updateMutation.mutate({
                        id: project.id,
                        data: {
                          ...project,
                          title: `${project.title} (updated)`,
                        },
                      })
                    }
                    disabled={updateMutation.isPending}
                    className="text-xs px-2 py-1 bg-yellow-500 text-white rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteMutation.mutate(project.id)}
                    disabled={deleteMutation.isPending}
                    className="text-xs px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
