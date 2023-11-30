"use client";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const ItemCard = ({ data }: { data: Item }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="relative ">
        <Image
          src={data.coverImage}
          loader={() => data.coverImage}
          alt={data.itemName}
          fill
          className="absolute object-cover opacity-20"
        />
        <CardTitle className="z-10">{data.itemName}</CardTitle>
        <CardDescription>{data.subCategory}</CardDescription>
      </CardHeader>
      <CardContent>{/* <p>Card Content</p> */}</CardContent>
      <CardFooter className="flex justify-between gap-3">
        <Badge variant="secondary">{data.genres[0]}</Badge>
        <Link
          href={`${data.subCategory}/${data.id}`}
          className={buttonVariants({ variant: "link" })}
        >
          Add Quotes
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ItemCard;
