"use server";

import prisma from "@/lib/prismaClient";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function update(formData: any) {
  const { itemId, quotes, category } = formData;
  await prisma.item.update({
    where: {
      id: itemId,
      Category: {
        name: category,
      },
    },
    data: {
      quotes,
    },
  });

  revalidatePath("/[category]/[itemId]", "page");
  redirect(`/[category]`);
}

export default update;
