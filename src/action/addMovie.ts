"use server";

import prisma from "@/lib/prismaClient";
import { Movie } from "@prisma/client";
import { revalidateTag } from "next/cache";

async function addMovie(e: { title: string; imageUrl: string; year: string }) {
  const { title, imageUrl, year } = e;
  const post = await prisma.movie.create({
    data: {
      title,
      year: +year,
      imageUrl,
    },
  });

  revalidateTag("movies");
}

export default addMovie;
