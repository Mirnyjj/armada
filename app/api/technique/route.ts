// app/api/projects/route.ts
import { NextResponse } from "next/server";
import { fetchTechnique } from "./queries";

export async function GET() {
  const projects = await fetchTechnique();
  return NextResponse.json(projects);
}
