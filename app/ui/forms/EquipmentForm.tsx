"use client";
import { Categories, TechniqueType } from "@/app/lib/definitions";
import React, { useState, useEffect } from "react";

interface EquipmentFormProps {
  equipment?: TechniqueType;
  categories: Categories[];
  onSave: (equipmentData: TechniqueType) => void;
  onCancel: () => void;
}

export function EquipmentForm({
  equipment,
  categories,
  onSave,
  onCancel,
}: EquipmentFormProps) {
  const [formData, setFormData] = useState<TechniqueType>({
    id: equipment?.id || "",
    title: equipment?.title || "",
    id_categories: equipment?.id_categories || "",
    status: equipment?.status || ("available" as const),
    photo_path: equipment?.photo_path || "",
    bucket_volume: equipment?.bucket_volume || 0,
    max_depth: equipment?.max_depth || 0,
    weight: equipment?.weight || 0,
    load_capacity_auto: equipment?.load_capacity_auto || 0,
    load_capacity_arrow: equipment?.load_capacity_arrow || 0,
    boom_reach: equipment?.boom_reach || 0,
    side_length: equipment?.side_length || 0,
    price: equipment?.price || 0,
    shaft_width: equipment?.shaft_width || 0,
  });

  const [newSpecKey, setNewSpecKey] = useState("");
  const [newSpecValue, setNewSpecValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      ...(equipment?.id && { id: equipment.id }),
    });
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addSpecification = () => {
    if (newSpecKey.trim() && newSpecValue.trim()) {
      setFormData((prev) => ({
        ...prev,
        [newSpecKey.trim()]: newSpecValue.trim(),
      }));
      setNewSpecKey("");
      setNewSpecValue("");
    }
  };

  const removeSpecification = (key: string) => {
    setFormData((prev) => {
      delete prev[key];
      return { ...prev };
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Название техники *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Например: Экскаватор CAT 320D"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Категория *
          </label>
          <select
            required
            value={formData.id_categories}
            onChange={(e) => handleInputChange("categoryId", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Выберите категорию</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Цена за день (₽) *
          </label>
          <input
            type="number"
            required
            min="0"
            value={formData.price}
            onChange={(e) =>
              handleInputChange("dailyRate", Number(e.target.value))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Статус *
          </label>
          <select
            required
            value={formData.status}
            onChange={(e) => handleInputChange("status", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="available">Доступна</option>
            <option value="rented">Арендована</option>
            <option value="maintenance">На обслуживании</option>
          </select>
        </div>
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
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Характеристики
        </label>

        {/* Существующие характеристики */}
        {Object.entries(formData).length > 0 && (
          <div className="space-y-2 mb-4">
            {Object.entries(formData).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center gap-2 p-3 bg-gray-50 rounded-md"
              >
                <span className="font-medium">{key}:</span>
                <span>{value}</span>
                <button
                  type="button"
                  onClick={() => removeSpecification(key)}
                  className="ml-auto text-red-500 hover:text-red-700"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Добавление новой характеристики */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newSpecKey}
            onChange={(e) => setNewSpecKey(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Название характеристики"
          />
          <input
            type="text"
            value={newSpecValue}
            onChange={(e) => setNewSpecValue(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Значение"
          />
          <button
            type="button"
            onClick={addSpecification}
            disabled={!newSpecKey.trim() || !newSpecValue.trim()}
            className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Добавить
          </button>
        </div>
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
          {equipment ? "Сохранить" : "Создать"}
        </button>
      </div>
    </form>
  );
}
