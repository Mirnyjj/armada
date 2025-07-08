// app/api/projects/[id]/route.ts
import { NextResponse } from "next/server";
import { Categories } from "@/app/lib/definitions";
import { deleteCategories, getCategories, updateCategories } from "../actions";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) {
      return NextResponse.json(
        { error: "Photo ID is required" },
        { status: 400 }
      );
    }

    const categories = await getCategories(params.id);

    if (!categories) {
      return NextResponse.json(
        { error: "Categories not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(categories, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("GET categories Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) {
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

    const updatedCategories = await updateCategories(params.id, data);
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
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) {
      return NextResponse.json(
        { error: "Photo ID is required" },
        { status: 400 }
      );
    }

    await deleteCategories(params.id);
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
export async function POST() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
