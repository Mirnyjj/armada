"use client";

import { useCategoryHooks } from "@/app/lib/hooks/categoriesHooks";
import { useState } from "react";

export const CarouselCategories = () => {
  const { useEntityList } = useCategoryHooks();
  const { data: categories, isLoading, error } = useEntityList();
  const [isPhoto, setIsPhoto] = useState(0);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!categories) return <div>Photo undefined</div>;
  return <div>{categories[0].description}</div>;
};
