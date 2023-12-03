"use client";

import { AddItemForm } from "@/components/form-item";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { nova, space_mono } from "@/utils/fonts";
import { PencilIcon } from "lucide-react";
import EditForm from "./EditForm";

const ItemForm = ({ item }: { item: string }) => {
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
        <EditForm name={item} />
      </CardHeader>
      <CardContent className={space_mono.className}>
        <AddItemForm category={item} />
      </CardContent>
    </Card>
  );
};

export default ItemForm;
