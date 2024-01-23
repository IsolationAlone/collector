"use server";

import prisma from "@/lib/prismaClient";
import { revalidatePath } from "next/cache";

async function updateCategory(formData: any) {
    const { title, description, itemId } = formData;
    await prisma.category.update({
        where: {
            name: title,
        },
        data: {
            name: title,
            description,
        },
    });

    revalidatePath("/[category]", "page");
}

export default updateCategory;
