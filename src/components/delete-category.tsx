"use client";

import * as React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { nova, space_mono } from "@/utils/fonts";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import delItem from "@/action/removeItem";

export function DelCategory({
  id,
  itemName,
}: {
  id: string;
  itemName: string;
}) {
  const [deleting, setDeleting] = React.useState(false);
  const [model, setModel] = React.useState(false);
  const { toast } = useToast();

  async function deleteItem() {
    setDeleting(true);
    // await new Promise((res) => setTimeout(res, 3000));
    await delItem({ id });
    toast({
      title: "Item Deleted",
      description: `${itemName} has been removed successfully from the database`,
    });
    setModel(false);
    setDeleting(false);
  }

  return (
    <AlertDialog open={model} onOpenChange={setModel}>
      <AlertDialogTrigger className="h-11 rounded-md px-3 border hover:bg-accent hover:text-accent-foreground transition-colors z-10">
        <Trash2 />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className={`${nova.className} font-bold`}>
            Are you sure want to delete{" "}
            <span className="text-primary">{itemName || ""}</span> ?
          </AlertDialogTitle>
          <AlertDialogDescription
            className={`${space_mono.className} font-bold text-muted-foreground/50`}
          >
            This action cannot be undone. This will permanently delete this
            item.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter
          className={`${space_mono.className} font-bold text-muted-foreground/50`}
        >
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {/* <AlertDialogAction>Continue</AlertDialogAction> */}
          <Button
            disabled={deleting}
            onClick={deleteItem}
            variant={"destructive"}
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
