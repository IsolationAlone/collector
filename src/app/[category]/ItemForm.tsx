"use client";

import { AddItemForm } from "@/components/form-item";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { nova, space_mono } from "@/utils/fonts";

const ItemForm = ({ item }: { item: string }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="relative ">
        <CardTitle className={`${nova.className} capitalize`}>
          {item} Form
        </CardTitle>
        <CardDescription
          className={`${space_mono.className} font-bold opacity-40 capitalize`}
        >
          Add New {item}
        </CardDescription>
      </CardHeader>
      <CardContent className={space_mono.className}>
        <AddItemForm category={item} />
      </CardContent>
    </Card>
  );
};

export default ItemForm;
