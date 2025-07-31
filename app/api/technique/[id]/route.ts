import { NextResponse } from "next/server";
import { getTechniqueById } from "../queries";
import { TechniqueType } from "@/app/lib/definitions";
import { deleteTechnique, updateTechnique } from "../actions";

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
        { error: "Technique ID is required" },
        { status: 400 }
      );
    }

    const item = await getTechniqueById(id);

    if (!item) {
      return NextResponse.json(
        { error: "Technique not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(item, {
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

export async function PUT(request: Request, params: RouteParams) {
  const { id } = await params.params;

  try {
    if (!id) {
      return NextResponse.json(
        { error: "Technique ID is required" },
        { status: 400 }
      );
    }

    const data: TechniqueType = await request.json();

    if (!data || Object.keys(data).length === 0) {
      return NextResponse.json(
        { error: "No data provided for update" },
        { status: 400 }
      );
    }

    const updatedItem = await updateTechnique(id, data);
    return NextResponse.json(updatedItem, {
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

export async function DELETE(request: Request, params: RouteParams) {
  const { id } = await params.params;

  try {
    if (id) {
      return NextResponse.json(
        { error: "Technique ID is required" },
        { status: 400 }
      );
    }

    await deleteTechnique(id);
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

export async function POST() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
