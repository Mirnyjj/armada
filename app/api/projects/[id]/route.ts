// app/api/projects/[id]/route.ts
import { NextResponse } from "next/server";
import { getProject } from "../queries";
import { deleteProject, updateProject } from "../actions";
import { CompletedProjects } from "@/app/lib/definitions";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: Request, params: RouteParams) {
  const { id } = await params.params;

  try {
    if (!id) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      );
    }

    const project = await getProject(id);

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("GET Project Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, params: RouteParams) {
  const { id } = await params.params;

  try {
    if (!id) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      );
    }

    const data: CompletedProjects = await request.json();

    // Базовая валидация данных
    if (!data || Object.keys(data).length === 0) {
      return NextResponse.json(
        { error: "No data provided for update" },
        { status: 400 }
      );
    }

    const updatedProject = await updateProject(id, data);
    return NextResponse.json(updatedProject, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("UPDATE Project Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, params: RouteParams) {
  try {
    const { id } = await params.params;
    if (!id) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      );
    }

    await deleteProject(id);
    return NextResponse.json(
      { success: true },
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("DELETE Project Error:", error);
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
