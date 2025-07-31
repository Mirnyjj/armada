"use client";
import { useState } from "react";
import { Categories, TechniqueType } from "../lib/definitions";
import { useTechniqueHooks } from "../lib/hooks/techniqueHooks";
import { useCategoryHooks } from "../lib/hooks/categoriesHooks";
import { SimpleBadge } from "../ui/simple/SimpleBadge";
import {
  BarChart3Icon,
  Building2Icon,
  Building2IconLarge,
  EditIcon,
  PackageIcon,
  PlusIcon,
  TrashIcon,
} from "../ui/simple/SimpleIcons";
import {
  SimpleTable,
  SimpleTableCell,
  SimpleTableRow,
} from "../ui/simple/SimpleTable";
import { SimpleCard } from "../ui/simple/SimpleCard";
import { Modal } from "../ui/modal/Modal";
import { EquipmentForm } from "../ui/forms/EquipmentForm";
import { CategoryForm } from "../ui/forms/CategoryForm";
import { ImageWithFallback } from "../ui/figma/ImageWithFallback";
import { SimpleTabs } from "../ui/simple/SimpleTabs";

export default function Page() {
  const { useEntityList: useTechniqueList } = useTechniqueHooks();
  const {
    data: techniques,
    isLoading: isTechniquesLoading,
    error: techniquesError,
  } = useTechniqueList();
  const { useEntityList } = useCategoryHooks();
  const { data: isCategories, isLoading, error } = useEntityList();
  const [equipment, setEquipment] = useState<TechniqueType[]>(
    techniques ? techniques : []
  );

  const [categories, setCategories] = useState<Categories[]>(
    isCategories ? isCategories : []
  );

  // Состояние модальных окон
  const [isEquipmentModalOpen, setIsEquipmentModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingEquipment, setEditingEquipment] =
    useState<TechniqueType | null>(null);
  const [editingCategory, setEditingCategory] = useState<Categories | null>(
    null
  );
  //   console.log(techniques, categories);

  if (isLoading && isTechniquesLoading) return <div>Loading...</div>;
  if (error || techniquesError)
    return <div>Error: {error?.message || techniquesError?.message}</div>;
  if (!isCategories && !techniques) return <div>Ошибка загрузки данных</div>;

  const getStats = () => {
    const totalEquipment = techniques?.length;
    const availableEquipment = techniques?.filter(
      (eq) => eq.status === "available"
    ).length;
    const rentedEquipment = techniques?.filter(
      (eq) => eq.status === "rented"
    ).length;
    const maintenanceEquipment = techniques?.filter(
      (eq) => eq.status === "maintenance"
    ).length;
    const totalCategories = isCategories?.length;
    const totalRevenue = techniques?.filter((eq) => eq.status === "rented");

    return {
      totalEquipment,
      availableEquipment,
      rentedEquipment,
      maintenanceEquipment,
      totalCategories,
      totalRevenue,
    };
  };

  const stats = getStats();

  const getCategoryName = (categoryId: string) => {
    return (
      isCategories?.find((cat) => cat.id === categoryId)?.name ||
      "Без категории"
    );
  };

  const getStatusBadge = (status: TechniqueType["status"]) => {
    const statusConfig = {
      available: { label: "Доступна", variant: "default" as const },
      rented: { label: "Арендована", variant: "destructive" as const },
      maintenance: { label: "Обслуживание", variant: "secondary" as const },
    };

    const config = statusConfig[status];
    return <SimpleBadge variant={config.variant}>{config.label}</SimpleBadge>;
  };

  // CRUD операции для техники
  const handleSaveEquipment = (equipmentData: TechniqueType) => {
    if (equipmentData.id) {
      // Обновление существующей техники
      setEquipment((prev) =>
        prev.map((eq) =>
          eq.id === equipmentData.id
            ? { ...equipmentData, id: equipmentData.id }
            : eq
        )
      );
    } else {
      // Создание новой техники
      const newEquipment = {
        ...equipmentData,
        id: Date.now().toString(),
      };

      setEquipment((prev) => [...prev, newEquipment]);
    }

    setIsEquipmentModalOpen(false);
    setEditingEquipment(null);
  };

  const handleEditEquipment = (equipment: TechniqueType) => {
    setEditingEquipment(equipment);
    setIsEquipmentModalOpen(true);
  };

  const handleDeleteEquipment = (equipmentId: string) => {
    if (window.confirm("Вы уверены, что хотите удалить эту технику?")) {
      setEquipment((prev) => prev.filter((eq) => eq.id !== equipmentId));
    }
  };

  // CRUD операции для категорий
  const handleSaveCategory = (
    categoryData: Omit<Categories, "id"> & { id?: string }
  ) => {
    if (categoryData.id) {
      // Обновление существующей категории
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === categoryData.id
            ? { ...categoryData, id: categoryData.id }
            : cat
        )
      );
    } else {
      // Создание новой категории
      const newCategory = {
        ...categoryData,
        id: Date.now().toString(),
      };
      setCategories((prev) => [...prev, newCategory]);
    }

    setIsCategoryModalOpen(false);
    setEditingCategory(null);
  };

  const handleEditCategory = (category: Categories) => {
    setEditingCategory(category);
    setIsCategoryModalOpen(true);
  };

  const handleDeleteCategory = (categoryId: string) => {
    const hasEquipment = techniques?.some(
      (eq) => eq.id_categories === categoryId
    );
    if (hasEquipment) {
      alert(
        "Нельзя удалить категорию, которая используется техникой. Сначала переместите технику в другую категорию или удалите её."
      );
      return;
    }

    if (window.confirm("Вы уверены, что хотите удалить эту категорию?")) {
      setCategories((prev) => prev.filter((cat) => cat.id !== categoryId));
    }
  };

  const tabs = [
    { id: "overview", label: "Обзор", icon: <BarChart3Icon /> },
    { id: "equipment", label: "Техника", icon: <PackageIcon /> },
    { id: "categories", label: "Категории", icon: <Building2Icon /> },
  ];

  return (
    <div className="min-h-screen w-full  bg-gray-50">
      {/* Заголовок */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Building2IconLarge />
            <h1 className="text-2xl font-semibold text-gray-900">
              Админ панель аренды строительной техники
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <SimpleTabs tabs={tabs} defaultTab="overview">
          {/* Обзор - статистика */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SimpleCard
                title="Всего техники"
                value={
                  stats.totalEquipment ? stats.totalEquipment.toString() : "N/A"
                }
                description="единиц техники"
                icon={<PackageIcon />}
              />

              <SimpleCard
                title="Доступна"
                value={
                  stats.availableEquipment
                    ? stats.availableEquipment.toString()
                    : "N/A"
                }
                description="готова к аренде"
                badge={
                  <SimpleBadge variant="default">
                    {stats.availableEquipment}
                  </SimpleBadge>
                }
                className="text-green-600"
              />

              <SimpleCard
                title="Арендована"
                value={
                  stats.rentedEquipment
                    ? stats.rentedEquipment.toString()
                    : "N/A"
                }
                description="в аренде"
                badge={
                  <SimpleBadge variant="destructive">
                    {stats.rentedEquipment}
                  </SimpleBadge>
                }
                className="text-red-600"
              />

              <SimpleCard
                title="На обслуживании"
                value={
                  stats.maintenanceEquipment
                    ? stats.maintenanceEquipment.toString()
                    : "N/A"
                }
                description="на ремонте"
                badge={
                  <SimpleBadge variant="secondary">
                    {stats.maintenanceEquipment}
                  </SimpleBadge>
                }
                className="text-orange-600"
              />

              <SimpleCard
                title="Категории"
                value={
                  stats.totalCategories ? stats?.totalCategories.toString() : ""
                }
                description="категорий техники"
                icon={<Building2Icon />}
              />
            </div>

            {/* Дополнительные статистические карточки */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Популярные категории
                </h3>
                <div className="space-y-3">
                  {isCategories?.map((category) => {
                    const categoryEquipment = techniques?.filter(
                      (eq) => eq.id_categories === category.id
                    ).length;
                    return (
                      <div
                        key={category.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                          <span className="text-sm">{category.name}</span>
                        </div>
                        <SimpleBadge variant="outline">
                          {categoryEquipment} ед.
                        </SimpleBadge>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Техника */}
          <div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Строительная техника</h3>
                <button
                  onClick={() => setIsEquipmentModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <PlusIcon />
                  Добавить технику
                </button>
              </div>

              <SimpleTable
                headers={[
                  "Фото",
                  "Название",
                  "Категория",
                  "Цена/час",
                  "Статус",
                  "Действия",
                ]}
              >
                {techniques?.map((eq) => (
                  <SimpleTableRow key={eq.id}>
                    <SimpleTableCell>
                      {eq.photo_path ? (
                        <ImageWithFallback
                          src={eq.photo_path}
                          alt={eq.title}
                          className="h-12 w-12 object-cover rounded"
                        />
                      ) : (
                        <div className="h-12 w-12 bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-gray-400 text-xs">
                            Нет фото
                          </span>
                        </div>
                      )}
                    </SimpleTableCell>
                    <SimpleTableCell>
                      <div>
                        <div className="font-medium">{eq.title}</div>

                        <div className="text-xs text-gray-500 mt-1">
                          {eq.weight > 0 && (
                            <div className="flex justify-between">
                              <p className="text-gray-600 min-h-[20px]">
                                Масса:
                              </p>
                              <p className="min-h-[20px]">{eq.weight} т</p>
                            </div>
                          )}

                          {eq.price > 0 && (
                            <div className="flex justify-between">
                              <p className="text-gray-600 min-h-[20px]">
                                Стоимость:
                              </p>
                              <p className="min-h-[20px]">{eq.price} ₽ в час</p>
                            </div>
                          )}

                          {Object.keys(eq).length > 5 && (
                            <div>
                              +{Object.keys(eq).length - 5} характеристик
                            </div>
                          )}
                        </div>
                      </div>
                    </SimpleTableCell>
                    <SimpleTableCell>
                      {getCategoryName(eq.title)}
                    </SimpleTableCell>
                    <SimpleTableCell>
                      {eq.price.toLocaleString("ru-RU")} ₽
                    </SimpleTableCell>
                    {/* <SimpleTableCell>{eq.weeklyRate.toLocaleString('ru-RU')} ₽</SimpleTableCell>
                    <SimpleTableCell>{eq.monthlyRate.toLocaleString('ru-RU')} ₽</SimpleTableCell> */}
                    <SimpleTableCell>
                      {getStatusBadge(eq.status)}
                    </SimpleTableCell>
                    <SimpleTableCell>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditEquipment(eq)}
                          className="p-1 text-blue-600 hover:text-blue-800"
                          title="Редактировать"
                        >
                          <EditIcon />
                        </button>
                        <button
                          onClick={() => handleDeleteEquipment(eq.id)}
                          className="p-1 text-red-600 hover:text-red-800"
                          title="Удалить"
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    </SimpleTableCell>
                  </SimpleTableRow>
                ))}
              </SimpleTable>
            </div>
          </div>

          {/* Категории */}
          <div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Категории техники</h3>
                <button
                  onClick={() => setIsCategoryModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <PlusIcon />
                  Добавить категорию
                </button>
              </div>

              <SimpleTable
                headers={[
                  "Изображение",
                  "Название",
                  "Описание",
                  "Количество техники",
                  "Действия",
                ]}
              >
                {isCategories?.map((category) => {
                  const categoryEquipmentCount = equipment.filter(
                    (eq) => eq.id_categories === category.id
                  ).length;
                  return (
                    <SimpleTableRow key={category.id}>
                      <SimpleTableCell>
                        {category.photo_path ? (
                          <ImageWithFallback
                            src={category.photo_path}
                            alt={category.name}
                            className="h-12 w-12 object-cover rounded"
                          />
                        ) : (
                          <div className="h-12 w-12 bg-gray-200 rounded flex items-center justify-center">
                            <span className="text-gray-400 text-xs">
                              Нет фото
                            </span>
                          </div>
                        )}
                      </SimpleTableCell>
                      <SimpleTableCell>{category.name}</SimpleTableCell>
                      <SimpleTableCell className="max-w-xs">
                        {category.description}
                      </SimpleTableCell>
                      <SimpleTableCell>
                        <SimpleBadge variant="outline">
                          {categoryEquipmentCount} ед.
                        </SimpleBadge>
                      </SimpleTableCell>
                      <SimpleTableCell>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditCategory(category)}
                            className="p-1 text-blue-600 hover:text-blue-800"
                            title="Редактировать"
                          >
                            <EditIcon />
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(category.id)}
                            className="p-1 text-red-600 hover:text-red-800"
                            title="Удалить"
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      </SimpleTableCell>
                    </SimpleTableRow>
                  );
                })}
              </SimpleTable>
            </div>
          </div>
        </SimpleTabs>
      </div>

      {/* Модальные окна */}
      <Modal
        isOpen={isEquipmentModalOpen}
        onClose={() => {
          setIsEquipmentModalOpen(false);
          setEditingEquipment(null);
        }}
        title={editingEquipment ? "Редактировать технику" : "Добавить технику"}
      >
        <EquipmentForm
          equipment={editingEquipment || undefined}
          categories={isCategories || []}
          onSave={handleSaveEquipment}
          onCancel={() => {
            setIsEquipmentModalOpen(false);
            setEditingEquipment(null);
          }}
        />
      </Modal>

      <Modal
        isOpen={isCategoryModalOpen}
        onClose={() => {
          setIsCategoryModalOpen(false);
          setEditingCategory(null);
        }}
        title={
          editingCategory ? "Редактировать категорию" : "Добавить категорию"
        }
      >
        <CategoryForm
          category={editingCategory || undefined}
          onSave={handleSaveCategory}
          onCancel={() => {
            setIsCategoryModalOpen(false);
            setEditingCategory(null);
          }}
        />
      </Modal>
    </div>
  );
}
