import { NextRequest, NextResponse } from "next/server";
import { Categories } from "@/app/lib/definitions";
import { deleteCategories, getCategories, updateCategories } from "../actions";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, params: RouteParams) {
  const { id } = await params.params;
  if (!id) {
    return NextResponse.json(
      { error: "Category ID is required" },
      { status: 400 }
    );
  }
  try {
    const category = await getCategories(id);
    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(category, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("Error fetching category:", err?.message); // Используем message для детализации ошибки
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  params: RouteParams
): Promise<NextResponse> {
  try {
    const { id } = await params.params;

    if (!id) {
      return NextResponse.json(
        { error: "Categories ID is required" },
        { status: 400 }
      );
    }

    const data: Categories = await request.json();

    // Базовая валидация данных
    if (!data || Object.keys(data).length === 0) {
      return NextResponse.json(
        { error: "No data provided for update" },
        { status: 400 }
      );
    }

    const updatedCategories = await updateCategories(id, data);
    return NextResponse.json(updatedCategories, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("UPDATE categories Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  params: RouteParams
): Promise<NextResponse> {
  const { id } = await params.params;
  try {
    if (!id) {
      return NextResponse.json(
        { error: "Photo ID is required" },
        { status: 400 }
      );
    }

    await deleteCategories(id);
    return NextResponse.json(
      { success: true },
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("DELETE Photo Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Обработка недопустимых методов
export async function POST(): Promise<NextResponse> {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
