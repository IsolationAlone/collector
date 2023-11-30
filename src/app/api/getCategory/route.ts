import prisma from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await prisma.category.findMany();
  return NextResponse.json(result);
}

export async function POST(req: Request) {
  try {
    const { name, coverImage } = await req.json();
    const post = await prisma.category.create({
      data: {
        name,
        coverImage,
      },
    });
    return NextResponse.json(post, { status: 201 });
  } catch (err) {
    return NextResponse.json("Database Error", { status: 500 });
  }
  //   const result = await pool.query(`Select * from "persons";`);
}
