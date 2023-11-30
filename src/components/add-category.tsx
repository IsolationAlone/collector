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
import { Plus } from "lucide-react";
import { AddCategoryForm } from "./form-category";

export function AddCategory() {
  const [model, setModel] = React.useState(false);
  return (
    <Dialog open={model} onOpenChange={setModel}>
      <DialogTrigger className="h-11 rounded-md px-3 border hover:bg-accent hover:text-accent-foreground transition-colors">
        <Plus />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogDescription>
            <AddCategoryForm modelState={setModel} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
