import React from "react";
import { ScrollArea } from "./ui/scroll-area";
import { ScrollBar } from "./ui/scroll-area";
import { Button, buttonVariants } from "./ui/button";
import Image from "next/image";
import { AddCategory } from "./add-category";
import Link from "next/link";

export type Category = {
  id: number;
  name: string;
  cover?: string;
};

async function getCategoryList(): Promise<Category[]> {
  const res = await fetch("http://localhost:4000/category", {
    cache: "no-cache",
    next: {
      tags: ["category"],
    },
  });
  return res.json();
}

const CategoryList = async () => {
  const list = await getCategoryList();
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex gap-6 w-max items-center py-4">
        {list.map((category) => (
          <Link
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className:
                "px-7 bg-cover relative overflow-hidden bg-transparent hover:bg-transparent group",
            })}
            key={category.id}
            href={`/${category.name}`}
            scroll={false}
          >
            <Image
              src={category.cover || ""}
              alt={category.name}
              className="absolute -z-10 opacity-30 object-cover group-hover:opacity-50 group-hover:scale-125 transition-all"
              fill
            />
            <span className="font-medium capitalize">{category.name}</span>
          </Link>
        ))}
        <AddCategory />
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default CategoryList;
