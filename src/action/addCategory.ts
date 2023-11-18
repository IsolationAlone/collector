"use server";

import { revalidateTag } from "next/cache";

async function addCategory(e: FormData) {
  revalidateTag("category");
}

export default addCategory;
