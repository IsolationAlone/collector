"use server";

import prisma from "@/lib/prismaClient";
import { revalidatePath } from "next/cache";

async function updateItemData(formData: any) {
    const { itemId, data } = formData;
    // console.log(data);

    await prisma.item.update({
        where: {
            id: itemId,
        },
        data: {
            data
        },
    });

    revalidatePath("/[category]/[itemId]", "page");
    revalidatePath("/[category]", "page");
}

export default updateItemData;
