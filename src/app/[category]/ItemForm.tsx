import { AddItemForm } from "@/components/form-item";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { nova, space_mono } from "@/utils/fonts";
import EditForm from "./EditForm";
import { cache } from "react";
import prisma from "@/lib/prismaClient";

const fetchDescription = cache(async (item: string) => {
  return await prisma.category.findFirst({
    where: {
      name: item,
    },
    select: {
      description: true,
    },
  });
});

const ItemForm = async ({ item }: { item: string }) => {
  const description = await fetchDescription(item);
  return (
    <Card className="overflow-hidden">
      <CardHeader className="relative flex flex-row items-start justify-between">
        <section className="flex flex-col gap-1">
          <CardTitle className={`${nova.className} capitalize`}>
            {item} Form
          </CardTitle>
          <CardDescription
            className={`${space_mono.className} font-bold opacity-40 capitalize`}
          >
            Add New {item}
          </CardDescription>
        </section>
        <EditForm description={description?.description} name={item} />
      </CardHeader>
      <CardContent className={space_mono.className}>
        <AddItemForm category={item} />
      </CardContent>
    </Card>
  );
};

export default ItemForm;
