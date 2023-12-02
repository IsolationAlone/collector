import prisma from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await prisma.item.findMany();
  return NextResponse.json(result);
}

export async function POST(req: Request) {
  try {
    const { title, coverImage } = await req.json();
    const post = await prisma.item.create({
      data: {
        title,
        coverImage,
      },
    });
    return NextResponse.json(post, { status: 201 });
  } catch (err) {
    return NextResponse.json("Database Error", { status: 500 });
  }
  //   const result = await pool.query(`Select * from "persons";`);
}
