"use client";

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PencilLine, Plus } from "lucide-react";
import { nova, space_mono } from "@/utils/fonts";
import { UpdateItemForm } from "@/components/form-updateItem";

export function UpdateItemModel({
  id,
  title,
  coverImage,
}: {
  id: string;
  title: string;
  coverImage: string;
}) {
  const [model, setModel] = React.useState(false);
  return (
    <Dialog open={model} onOpenChange={setModel}>
      <DialogTrigger className="h-11  px-3 border hover:bg-accent hover:text-accent-foreground transition-colors rounded-full">
        <PencilLine className="h-4 w-4" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className={`${nova.className} font-bold mb-2`}>
            Update Item
          </DialogTitle>
          <DialogDescription
            className={`${space_mono.className} font-bold text-muted-foreground`}
          >
            <UpdateItemForm
              itemId={id}
              title={title}
              coverImage={coverImage}
              modelState={setModel}
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
