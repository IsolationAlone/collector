"use server";

import prisma from "@/lib/prismaClient";
import { revalidatePath } from "next/cache";

async function publishItem(formData: any) {
    const { itemId, publish } = formData;
    // console.log(publish);

    await prisma.item.update({
        where: {
            id: itemId,
        },
        data: {
            publish
        },
    });

    revalidatePath("/[category]/[itemId]", "page");
    revalidatePath("/[category]", "page");
}

export default publishItem;
