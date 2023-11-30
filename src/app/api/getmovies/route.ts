import prisma from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await prisma.movie.findMany();
  return NextResponse.json(result);
}

export async function POST(req: Request) {
  try {
    const { title, imageUrl, year } = await req.json();
    const post = await prisma.movie.create({
      data: {
        title,
        year,
        imageUrl,
      },
    });
    return NextResponse.json(post, { status: 201 });
  } catch (err) {
    return NextResponse.json("Database Error", { status: 500 });
  }
  //   const result = await pool.query(`Select * from "persons";`);
}
