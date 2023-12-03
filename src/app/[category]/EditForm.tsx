"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
import React from "react";
import { PencilIcon } from "lucide-react";
import { nova, space_mono } from "@/utils/fonts";
import { EditCategoryForm } from "@/components/edit-category";
import { Category } from "@prisma/client";

const EditForm = ({ id, name: title, coverImage }: Partial<Category>) => {
  const [model, setModel] = React.useState(false);
  return (
    <Dialog open={model} onOpenChange={setModel}>
      <DialogTrigger className="h-11 px-3 border hover:bg-accent hover:text-accent-foreground transition-colors rounded-md">
        <PencilIcon className="w-4 h-4" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className={`${nova.className} font-bold mb-2`}>
            Edit Category
          </DialogTitle>
          <DialogDescription
            className={`${space_mono.className} font-bold text-muted-foreground`}
          >
            <EditCategoryForm
              id={id!}
              title={title!}
              coverImage={coverImage!}
              modelState={setModel}
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditForm;
