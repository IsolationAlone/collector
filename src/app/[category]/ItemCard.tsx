"use client";

import { DelCategory } from "@/components/delete-category";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { nova, space_mono } from "@/utils/fonts";
import { Item } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

const ItemCard = ({
  data,
  category,
}: {
  data: Partial<Item>;
  category: string;
}) => {
  return (
    <Card className="overflow-hidden flex flex-col justify-between relative group md:min-h-[274px]">
      <Image
        src={data.coverImage!}
        loader={() => data.coverImage!}
        alt={data.title!}
        fill
        className="absolute object-cover dark:opacity-20 group-hover:scale-110 hover:opacity-30 transition-all"
      />
      <CardHeader className="">
        <CardTitle className={`${nova.className} capitalize line-clamp-2 z-10`}>
          {data.title}
        </CardTitle>
        <CardDescription
          className={`${space_mono.className} font-bold opacity-40 capitalize`}
        >
          {data.createdAt?.toDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent>{/* <p>Card Content</p> */}</CardContent>
      <CardFooter className="flex justify-between gap-3">
        {/* <Button onClick={() => {}} variant={"ghost"} className="z-10">
          <Trash2 />
        </Button> */}
        <DelCategory id={data.id!} itemName={data.title!} />
        <Link
          href={`/${category}/${data.id}`}
          className={buttonVariants({
            variant: "outline",
            className: `${space_mono.className} z-10 flex gap-2 text-muted-foreground font-bold`,
          })}
        >
          View
        </Link>

        {/* <Badge variant="secondary">{data.genres[0]}</Badge> */}
        {/* <Link
          href={`${data.subCategory}/${data.id}`}
          className={buttonVariants({ variant: "link" })}
        >
          Add Quotes
        </Link> */}
      </CardFooter>
    </Card>
  );
};

export default ItemCard;
