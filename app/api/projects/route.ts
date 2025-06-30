// app/api/projects/route.ts
import { NextResponse } from "next/server";
import { fetchCompletedProjects } from "./queries";

export async function GET() {
  const projects = await fetchCompletedProjects();
  return NextResponse.json(projects);
}
