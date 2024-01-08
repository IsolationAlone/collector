"use client";

import { nova, space_mono } from "@/utils/fonts";
import { Item } from "@prisma/client";
import Image from "next/image";
import React, { useState } from "react";
import { UpdateItemModel } from "./UpdateItemModel";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import update from "@/action/update";
import { Save } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import _ from "underscore";

const ItemDisplay = ({
  id,
  title,
  coverImage,
  // @ts-ignore
  seo,
  quotes,
  // @ts-ignore
  subCategory,
  // @ts-ignore
  fetchedData,
  createdAt,
  updatedAt,
}: Item) => {
  const [updating, setUpdating] = useState<boolean>(false);
  const { toast } = useToast();

  // Update
  async function updateArray() {
    setUpdating(true);
    await update({ itemId: id, quotes, category: subCategory });
    toast({
      title: "Updated Item",
    });
  }
  return (
    <div className="grid gap-2 h-fit min-w-[300px]">
      <div className="grid gap-1">
        <section className="flex justify-between">
          <h3
            className={`${nova.className} w-36 capitalize text-3xl md:text-4xl`}
          >
            {title}
          </h3>
          <span className="flex gap-1">
            <Button
              variant={"outline"}
              onClick={updateArray}
              disabled={
                (_.isEqual(seo, {
                  title: "",
                  description: "",
                  permalink: "",
                  image: "",
                  coverImage: "",
                }) &&
                  quotes.toString() === fetchedData.toString()) ||
                updating
              }
              className={`h-11 px-3 border hover:bg-accent hover:text-accent-foreground transition-colors rounded-full ${
                updating && "border-orange-500"
              }`}
            >
              <Save className="h-4 w-4" />
            </Button>
            <UpdateItemModel id={id} title={title} coverImage={coverImage} />
          </span>
        </section>
        <span className={`${space_mono.className} flex gap-2`}>
          <Badge variant={"secondary"}>Created</Badge>
          <p className="text-muted-foreground text-sm">
            {createdAt.toLocaleString()}
          </p>
        </span>
        <span className={`${space_mono.className} flex gap-2`}>
          <Badge variant={"secondary"}>Updated</Badge>
          <p className="text-muted-foreground text-sm">
            {updatedAt.toLocaleString()}
          </p>
        </span>
      </div>
      <div className="md:h-[400px] h-[200px] w-full relative border rounded-lg overflow-hidden">
        <Image
          alt={title}
          loader={() => coverImage}
          src={coverImage}
          fill
          className="object-cover dark:opacity-40"
        />
      </div>
      {/* <span className="text-secondary lowercase font-extrabold text-3xl">
        {subCategory}
      </span> */}
    </div>
  );
};

export default ItemDisplay;
