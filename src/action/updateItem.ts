"use server";

import prisma from "@/lib/prismaClient";
import { revalidatePath } from "next/cache";

async function updateItem(formData: any) {
  const { title, coverImage, itemId } = formData;
  await prisma.item.update({
    where: {
      id: itemId,
    },
    data: {
      title,
      coverImage,
    },
  });

  revalidatePath("/[category]/[itemId]", "page");
  revalidatePath("/[category]", "page");
}

export default updateItem;
