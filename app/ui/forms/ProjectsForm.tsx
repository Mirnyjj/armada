"use client";

import { CompletedProjects } from "@/app/lib/definitions";
import React, { useState } from "react";

interface ProjectFormProps {
  project?: CompletedProjects;
  onSave: (project: Omit<CompletedProjects, "id"> & { id?: string }) => void;
  onCancel: () => void;
}

export function ProjectForm({
  project: project,
  onSave,
  onCancel,
}: ProjectFormProps) {
  const [formData, setFormData] = useState({
    title: project?.title || "",
    address: project?.address || "",
    description: project?.description || "",
    photo_path: project?.photo_path || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      ...(project?.id && { id: project.id }),
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Название проекта *
        </label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => handleInputChange("name", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Например: Укладка труб"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Адрес проведения работ *
        </label>
        <input
          type="text"
          required
          value={formData.address}
          onChange={(e) => handleInputChange("address", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Например: г. Москва, пр-т Карла Маркса, 196"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Описание *
        </label>
        <textarea
          required
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Опишите завершенный проект..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          URL изображения
        </label>
        <input
          type="url"
          value={formData.photo_path}
          onChange={(e) => handleInputChange("image", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="https://example.com/image.jpg"
        />
        {formData.photo_path && (
          <div className="mt-2">
            <img
              src={formData.photo_path}
              alt="Предпросмотр"
              className="w-32 h-32 object-cover rounded-md border border-gray-300"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
            />
          </div>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          Отмена
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {project ? "Сохранить" : "Создать"}
        </button>
      </div>
    </form>
  );
}
