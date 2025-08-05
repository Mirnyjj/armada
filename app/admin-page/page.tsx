"use client";
import { useState } from "react";
import {
  Categories,
  CompletedProjects,
  TechniqueType,
} from "../lib/definitions";
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
  SettingsIcon,
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
import { useProjectHooks } from "../lib/hooks/projectHooks";
import { ProjectForm } from "../ui/forms/ProjectsForm";

export default function Page() {
  const { useEntityList: useTechniqueList } = useTechniqueHooks();
  const {
    data: techniques,
    isLoading: isTechniquesLoading,
    error: techniquesError,
  } = useTechniqueList();
  const { useEntityList: useCategoriesList } = useCategoryHooks();
  const { data: isCategories, isLoading, error } = useCategoriesList();
  const [equipment, setEquipment] = useState<TechniqueType[]>(
    techniques ? techniques : []
  );
  const { useEntityList: useProjectsList } = useProjectHooks();
  const {
    data: isProjects,
    isLoading: isProjectsLoading,
    error: isProjectsError,
  } = useProjectsList();

  const [categories, setCategories] = useState<Categories[]>(
    isCategories ? isCategories : []
  );
  const [projects, setProjects] = useState<CompletedProjects[]>(
    isProjects ? isProjects : []
  );

  // Состояние модальных окон
  const [isEquipmentModalOpen, setIsEquipmentModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingEquipment, setEditingEquipment] =
    useState<TechniqueType | null>(null);
  const [editingCategory, setEditingCategory] = useState<Categories | null>(
    null
  );
  const [editingProject, setEditingProject] =
    useState<CompletedProjects | null>(null);

  if (isLoading && isTechniquesLoading && isProjectsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Загрузка данных...</p>
        </div>
      </div>
    );
  }

  if (error || techniquesError || isProjectsError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Ошибка загрузки
          </h2>
          <p className="text-gray-600">
            {error?.message ||
              techniquesError?.message ||
              isProjectsError?.message}
          </p>
        </div>
      </div>
    );
  }

  if (!isCategories && !techniques && !isProjects) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">📊</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Нет данных
          </h2>
          <p className="text-gray-600">Данные не найдены</p>
        </div>
      </div>
    );
  }

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
  // CRUD операции для проектов
  const handleSaveProjects = (
    projectsData: Omit<CompletedProjects, "id"> & { id?: string }
  ) => {
    if (projectsData.id) {
      // Обновление существующего проекта
      setProjects((prev) =>
        prev.map((cat) =>
          cat.id === projectsData.id
            ? { ...projectsData, id: projectsData.id }
            : cat
        )
      );
    } else {
      // Создание нового проекта
      const newProject = {
        ...projectsData,
        id: Date.now().toString(),
      };
      setProjects((prev) => [...prev, newProject]);
    }

    setIsProjectModalOpen(false);
    setEditingProject(null);
  };

  const handleEditProject = (project: CompletedProjects) => {
    setEditingProject(project);
    setIsProjectModalOpen(true);
  };

  const handleDeleteProject = (projectId: string) => {
    if (window.confirm("Вы уверены, что хотите удалить этот проект?")) {
      setProjects((prev) => prev.filter((project) => project.id !== projectId));
    }
  };

  const tabs = [
    { id: "overview", label: "Обзор", icon: <BarChart3Icon /> },
    { id: "equipment", label: "Техника", icon: <PackageIcon /> },
    { id: "categories", label: "Категории", icon: <Building2Icon /> },
    { id: "projects", label: "Проекты", icon: <SettingsIcon /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 w-full ">
      {/* Заголовок */}
      <div className="border-b bg-white shadow-sm w-full">
        <div className="w-full xl:w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="flex items-center gap-3 py-4 sm:py-6">
            <Building2IconLarge />
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Админ панель аренды строительной техники
            </h1>
          </div>
        </div>
      </div>

      {/* Основной контент */}
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <SimpleTabs tabs={tabs} defaultTab="overview">
          {/* Обзор - статистика */}
          <div className="space-y-6">
            {/* Статистические карточки */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
              <SimpleCard
                title="Всего техники"
                value={
                  stats.totalEquipment ? stats.totalEquipment.toString() : "N/A"
                }
                description="единиц техники"
                icon={<PackageIcon />}
                className="sm:col-span-2 lg:col-span-1 hover:shadow-md transition-shadow duration-200"
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
                className="text-green-600 hover:shadow-md transition-shadow duration-200"
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
                className="text-red-600 hover:shadow-md transition-shadow duration-200"
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
                className="text-orange-600 hover:shadow-md transition-shadow duration-200"
              />

              <SimpleCard
                title="Категории"
                value={
                  stats.totalCategories ? stats?.totalCategories.toString() : ""
                }
                description="категорий техники"
                icon={<Building2Icon />}
                className="hover:shadow-md transition-shadow duration-200"
              />
            </div>

            {/* Дополнительные статистические карточки */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow duration-200">
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
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                          <span className="text-sm font-medium">
                            {category.name}
                          </span>
                        </div>
                        <SimpleBadge variant="outline">
                          {categoryEquipment} ед.
                        </SimpleBadge>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* График или дополнительная статистика */}
              <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow duration-200">
                <h3 className="text-lg font-semibold mb-4">Статус техники</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Доступна</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full transition-all duration-300"
                          style={{
                            width: `${
                              stats.totalEquipment
                                ? ((stats.availableEquipment || 0) /
                                    stats.totalEquipment) *
                                  100
                                : 0
                            }%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">
                        {stats.availableEquipment}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Арендована</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-red-500 rounded-full transition-all duration-300"
                          style={{
                            width: `${
                              stats.totalEquipment
                                ? ((stats?.rentedEquipment || 0) /
                                    stats.totalEquipment) *
                                  100
                                : 0
                            }%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">
                        {stats.rentedEquipment}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Обслуживание</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-orange-500 rounded-full transition-all duration-300"
                          style={{
                            width: `${
                              stats.totalEquipment
                                ? ((stats?.maintenanceEquipment || 0) /
                                    stats.totalEquipment) *
                                  100
                                : 0
                            }%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">
                        {stats.maintenanceEquipment}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Техника */}
          <div>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <h3 className="text-lg font-semibold">
                    Строительная техника
                  </h3>
                  <button
                    onClick={() => setIsEquipmentModalOpen(true)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 hover:transform hover:scale-105 active:scale-95 w-full sm:w-auto"
                  >
                    <PlusIcon />
                    <span className="hidden sm:inline">Добавить технику</span>
                    <span className="sm:hidden">Добавить</span>
                  </button>
                </div>
              </div>

              {/* Мобильная версия таблицы техники */}
              <div className="block sm:hidden">
                <div className="space-y-4 p-4">
                  {techniques?.map((eq) => (
                    <div
                      key={eq.id}
                      className="bg-gray-50 rounded-lg p-4 space-y-3"
                    >
                      <div className="flex items-center gap-3">
                        {eq.photo_path ? (
                          <ImageWithFallback
                            src={eq.photo_path}
                            alt={eq.title}
                            className="h-16 w-16 object-cover rounded"
                          />
                        ) : (
                          <div className="h-16 w-16 bg-gray-200 rounded flex items-center justify-center">
                            <span className="text-gray-400 text-xs">
                              Нет фото
                            </span>
                          </div>
                        )}
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">
                            {eq.title}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {getCategoryName(eq.id_categories)}
                          </p>
                          <p className="text-sm font-medium text-green-600">
                            {eq.price.toLocaleString("ru-RU")} ₽/час
                          </p>
                        </div>
                        <div className="flex flex-col gap-2">
                          {getStatusBadge(eq.status)}
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleEditEquipment(eq)}
                              className="p-2 text-blue-600 hover:text-blue-800 transition-colors"
                              title="Редактировать"
                            >
                              <EditIcon />
                            </button>
                            <button
                              onClick={() => handleDeleteEquipment(eq.id)}
                              className="p-2 text-red-600 hover:text-red-800 transition-colors"
                              title="Удалить"
                            >
                              <TrashIcon />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 space-y-1">
                        {eq.weight > 0 && <div>Масса: {eq.weight} т</div>}
                        {eq.price > 0 && (
                          <div>Стоимость: {eq.price} ₽ в час</div>
                        )}
                        {Object.keys(eq).length > 5 && (
                          <div>+{Object.keys(eq).length - 5} характеристик</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Десктопная версия таблицы техники */}
              <div className="hidden sm:block overflow-x-auto">
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
                            className="h-12 w-12 object-cover rounded hover:scale-105 transition-transform duration-200"
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
                                <p className="min-h-[20px]">
                                  {eq.price} ₽ в час
                                </p>
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
                        {getCategoryName(eq.id_categories)}
                      </SimpleTableCell>
                      <SimpleTableCell>
                        {eq.price.toLocaleString("ru-RU")} ₽
                      </SimpleTableCell>
                      <SimpleTableCell>
                        {getStatusBadge(eq.status)}
                      </SimpleTableCell>
                      <SimpleTableCell>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditEquipment(eq)}
                            className="p-1 text-blue-600 hover:text-blue-800 transition-colors hover:scale-105 active:scale-95"
                            title="Редактировать"
                          >
                            <EditIcon />
                          </button>
                          <button
                            onClick={() => handleDeleteEquipment(eq.id)}
                            className="p-1 text-red-600 hover:text-red-800 transition-colors hover:scale-105 active:scale-95"
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
          </div>

          {/* Категории */}
          <div>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <h3 className="text-lg font-semibold">Категории техники</h3>
                  <button
                    onClick={() => setIsCategoryModalOpen(true)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 hover:transform hover:scale-105 active:scale-95 w-full sm:w-auto"
                  >
                    <PlusIcon />
                    <span className="hidden sm:inline">Добавить категорию</span>
                    <span className="sm:hidden">Добавить</span>
                  </button>
                </div>
              </div>

              {/* Мобильная версия таблицы категорий */}
              <div className="block sm:hidden">
                <div className="space-y-4 p-4">
                  {isCategories?.map((category) => {
                    const categoryEquipmentCount = techniques?.filter(
                      (eq) => eq.id_categories === category.id
                    ).length;
                    return (
                      <div
                        key={category.id}
                        className="bg-gray-50 rounded-lg p-4 space-y-3"
                      >
                        <div className="flex items-center gap-3">
                          {category.photo_path ? (
                            <ImageWithFallback
                              src={category.photo_path}
                              alt={category.name}
                              className="h-16 w-16 object-cover rounded"
                            />
                          ) : (
                            <div className="h-16 w-16 bg-gray-200 rounded flex items-center justify-center">
                              <span className="text-gray-400 text-xs">
                                Нет фото
                              </span>
                            </div>
                          )}
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">
                              {category.name}
                            </h4>
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {category.description}
                            </p>
                            <SimpleBadge variant="outline" className="mt-2">
                              {categoryEquipmentCount} ед.
                            </SimpleBadge>
                          </div>
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleEditCategory(category)}
                              className="p-2 text-blue-600 hover:text-blue-800 transition-colors"
                              title="Редактировать"
                            >
                              <EditIcon />
                            </button>
                            <button
                              onClick={() => handleDeleteCategory(category.id)}
                              className="p-2 text-red-600 hover:text-red-800 transition-colors"
                              title="Удалить"
                            >
                              <TrashIcon />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Десктопная версия таблицы категорий */}
              <div className="hidden sm:block overflow-x-auto">
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
                              className="h-12 w-12 object-cover rounded hover:scale-105 transition-transform duration-200"
                            />
                          ) : (
                            <div className="h-12 w-12 bg-gray-200 rounded flex items-center justify-center">
                              <span className="text-gray-400 text-xs">
                                Нет фото
                              </span>
                            </div>
                          )}
                        </SimpleTableCell>
                        <SimpleTableCell className="font-medium">
                          {category.name}
                        </SimpleTableCell>
                        <SimpleTableCell className="max-w-xs">
                          <div className="text-sm text-gray-600 line-clamp-2">
                            {category.description}
                          </div>
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
                              className="p-1 text-blue-600 hover:text-blue-800 transition-colors hover:scale-105 active:scale-95"
                              title="Редактировать"
                            >
                              <EditIcon />
                            </button>
                            <button
                              onClick={() => handleDeleteCategory(category.id)}
                              className="p-1 text-red-600 hover:text-red-800 transition-colors hover:scale-105 active:scale-95"
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
          </div>
          {/* Проекты */}
          <div>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <h3 className="text-lg font-semibold">
                    Реализованные проекты
                  </h3>
                  <button
                    onClick={() => setIsProjectModalOpen(true)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 hover:transform hover:scale-105 active:scale-95 w-full sm:w-auto"
                  >
                    <PlusIcon />
                    <span className="hidden sm:inline">Добавить проект</span>
                    <span className="sm:hidden">Добавить</span>
                  </button>
                </div>
              </div>

              {/* Мобильная версия таблицы проектов */}
              <div className="block sm:hidden">
                <div className="space-y-4 p-4">
                  {isProjects?.map((project) => {
                    return (
                      <div
                        key={project.id}
                        className="bg-gray-50 rounded-lg p-4 space-y-3"
                      >
                        <div className="flex items-center gap-3">
                          {project.photo_path ? (
                            <ImageWithFallback
                              src={project.photo_path}
                              alt={project.title}
                              className="h-16 w-16 object-cover rounded"
                            />
                          ) : (
                            <div className="h-16 w-16 bg-gray-200 rounded flex items-center justify-center">
                              <span className="text-gray-400 text-xs">
                                Нет фото
                              </span>
                            </div>
                          )}
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">
                              {project.title}
                            </h4>
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {project.description}
                            </p>
                          </div>
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleEditProject(project)}
                              className="p-2 text-blue-600 hover:text-blue-800 transition-colors"
                              title="Редактировать"
                            >
                              <EditIcon />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(project.id)}
                              className="p-2 text-red-600 hover:text-red-800 transition-colors"
                              title="Удалить"
                            >
                              <TrashIcon />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Десктопная версия таблицы категорий */}
              <div className="hidden sm:block overflow-x-auto">
                <SimpleTable
                  headers={[
                    "Изображение",
                    "Название",
                    "Описание",
                    "Адрес",
                    "Действия",
                  ]}
                >
                  {isProjects?.map((project) => {
                    return (
                      <SimpleTableRow key={project.id}>
                        <SimpleTableCell>
                          {project.photo_path ? (
                            <ImageWithFallback
                              src={project.photo_path}
                              alt={project.title}
                              className="h-12 w-12 object-cover rounded hover:scale-105 transition-transform duration-200"
                            />
                          ) : (
                            <div className="h-12 w-12 bg-gray-200 rounded flex items-center justify-center">
                              <span className="text-gray-400 text-xs">
                                Нет фото
                              </span>
                            </div>
                          )}
                        </SimpleTableCell>
                        <SimpleTableCell className="font-medium">
                          {project.title}
                        </SimpleTableCell>
                        <SimpleTableCell className="max-w-3xl">
                          <div className="text-sm text-gray-600 line-clamp-2">
                            {project.description}
                          </div>
                        </SimpleTableCell>
                        <SimpleTableCell className="max-w-3xl">
                          <div className="text-sm text-gray-600 line-clamp-2">
                            {project.address}
                          </div>
                        </SimpleTableCell>
                        <SimpleTableCell>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditProject(project)}
                              className="p-1 text-blue-600 hover:text-blue-800 transition-colors hover:scale-105 active:scale-95"
                              title="Редактировать"
                            >
                              <EditIcon />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(project.id)}
                              className="p-1 text-red-600 hover:text-red-800 transition-colors hover:scale-105 active:scale-95"
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
      <Modal
        isOpen={isProjectModalOpen}
        onClose={() => {
          setIsProjectModalOpen(false);
          setEditingProject(null);
        }}
        title={editingProject ? "Редактировать проект" : "Добавить проект"}
      >
        <ProjectForm
          project={editingProject || undefined}
          onSave={handleSaveProjects}
          onCancel={() => {
            setIsProjectModalOpen(false);
            setEditingProject(null);
          }}
        />
      </Modal>
    </div>
  );
}
