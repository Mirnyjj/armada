// app/api/projects/[id]/route.ts
import { NextResponse } from "next/server";
import { getTechniqueById } from "../queries";
import { TechniqueType } from "@/app/lib/definitions";
import { deleteTechnique, updateTechnique } from "../actions";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) {
      return NextResponse.json(
        { error: "Technique ID is required" },
        { status: 400 }
      );
    }

    const project = await getTechniqueById(params.id);

    if (!project) {
      return NextResponse.json(
        { error: "Technique not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(project, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("GET Technique Error:", error);
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
        { error: "Technique ID is required" },
        { status: 400 }
      );
    }

    const data: TechniqueType = await request.json();

    // Базовая валидация данных
    if (!data || Object.keys(data).length === 0) {
      return NextResponse.json(
        { error: "No data provided for update" },
        { status: 400 }
      );
    }

    const updatedProject = await updateTechnique(params.id, data);
    return NextResponse.json(updatedProject, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("UPDATE Technique Error:", error);
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
        { error: "Technique ID is required" },
        { status: 400 }
      );
    }

    await deleteTechnique(params.id);
    return NextResponse.json(
      { success: true },
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("DELETE Technique Error:", error);
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
