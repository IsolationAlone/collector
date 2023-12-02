"use server";

import prisma from "@/lib/prismaClient";
import { Item } from "@prisma/client";
import { revalidatePath } from "next/cache";

async function delItem({ id }: Partial<Item>) {
  await prisma.item.delete({
    where: {
      id,
    },
  });

  revalidatePath("/[category]", "page");
}

export default delItem;
