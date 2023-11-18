"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

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
      <CardFooter className="flex gap-3">
        {data.genres.map((e) => (
          <Badge variant="secondary">{e}</Badge>
        ))}
      </CardFooter>
    </Card>
  );
};

export default ItemCard;
