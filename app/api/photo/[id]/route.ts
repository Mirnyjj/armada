import { NextResponse } from "next/server";
import {
  deleteCarouselPhoto,
  getCarouselPhoto,
  updateCarouselPhoto,
} from "../actions";
import { CarousePhotos } from "@/app/lib/definitions";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: Request, params: RouteParams) {
  try {
    const id = (await params.params).id;
    if (!id) {
      return NextResponse.json(
        { error: "Photo ID is required" },
        { status: 400 }
      );
    }

    const item = await getCarouselPhoto(id);

    if (!item) {
      return NextResponse.json({ error: "Photo not found" }, { status: 404 });
    }

    return NextResponse.json(item, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("GET Photo Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, params: RouteParams) {
  const id = (await params.params).id;
  try {
    if (!id) {
      return NextResponse.json(
        { error: "Photo ID is required" },
        { status: 400 }
      );
    }

    const data: CarousePhotos = await request.json();

    if (!data || Object.keys(data).length === 0) {
      return NextResponse.json(
        { error: "No data provided for update" },
        { status: 400 }
      );
    }

    const updatedItem = await updateCarouselPhoto(id, data);
    return NextResponse.json(updatedItem, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("UPDATE Photo Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, params: RouteParams) {
  try {
    const id = (await params.params).id;
    if (!id) {
      return NextResponse.json(
        { error: "Photo ID is required" },
        { status: 400 }
      );
    }

    await deleteCarouselPhoto(id);
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

export async function POST() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
