import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { category: string } }
) {
  const category = params.category;
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  return NextResponse.json({ category, id });
}
