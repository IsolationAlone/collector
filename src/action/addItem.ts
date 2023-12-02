"use server";

import prisma from "@/lib/prismaClient";
import { revalidatePath } from "next/cache";

async function addItem(formData: any) {
  const { title, coverImage, category } = formData;
  const categoryId = await prisma.category.findFirst({
    where: {
      name: category,
    },
    select: {
      id: true,
    },
  });

  await prisma.item.create({
    data: {
      title,
      coverImage,
      categoryId: categoryId?.id,
    },
  });

  revalidatePath("/[category]", "page");
}

export default addItem;
