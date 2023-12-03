"use client";

import React from "react";
import { ScrollArea } from "./ui/scroll-area";
import { ScrollBar } from "./ui/scroll-area";
import { Button, buttonVariants } from "./ui/button";
import Image from "next/image";
import { AddCategory } from "./add-category";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Icons } from "./Icons";
import { Category } from "@prisma/client";
import { space_mono } from "@/utils/fonts";
import { useSession } from "next-auth/react";
import { Lock } from "lucide-react";

const CategoryList = () => {
  // await new Promise((res) => setTimeout(() => res, 300));
  // const queryClient = useQueryClient();

  const { data: list, isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const list = await fetch("/api/getCategory");
      return await list.json();
    },
  });

  const { data: session, status } = useSession();

  if (status === "loading")
    return (
      <Button variant={"outline"} size={"lg"} className="px-4" disabled>
        <Icons.spinner className="animate-spin h-4 w-4" />
      </Button>
    );

  if (status === "unauthenticated")
    return (
      <Button
        variant={"outline"}
        size={"lg"}
        className={`px-4 animate-pulse disabled:cursor-not-allowed flex gap-2 items-center ${space_mono.className}`}
        disabled
      >
        <Lock className="h-4 w-4" />
        Need to be Authenticated
      </Button>
    );

  if (status === "authenticated")
    return (
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-6 w-max items-center py-4">
          {isLoading ? (
            <Button variant={"outline"} size={"lg"} className="px-4" disabled>
              <Icons.spinner className="animate-spin h-4 w-4" />
            </Button>
          ) : (
            <>
              {list.map((category: Category) => (
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
                    loader={() => category.coverImage}
                    src={category.coverImage || ""}
                    alt={category.name}
                    className="absolute -z-10 opacity-10 object-cover group-hover:opacity-20 group-hover:scale-125 transition-all"
                    fill
                  />
                  <span
                    className={`${space_mono.className} text-muted-foreground group-hover:text-primary transition-all duration-300 font-bold capitalize`}
                  >
                    {category.name}
                  </span>
                </Link>
              ))}
              <AddCategory />
            </>
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    );
};

export default CategoryList;
