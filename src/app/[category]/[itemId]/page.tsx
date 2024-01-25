import { notFound } from "next/navigation";
import React, { cache } from "react";
import { Item } from "@prisma/client";
import prisma from "@/lib/prismaClient";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Metadata, ResolvingMetadata } from "next";
import ItemComponent from "./ItemComponent";

type PageProps = {
  params: {
    category: string;
    itemId: string;
  };
};

type Props = {
  params: { category: string; itemId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const fetchItem = cache(
  async (
    itemId: string,
    category: string
  ): Promise<Item | PrismaClientKnownRequestError | undefined> => {
    try {
      const item = await prisma.item.findFirst({
        where: {
          id: itemId,
          Category: {
            name: category,
          },
        },
        include: {
          Category: true,
        },
      });
      if (!item) throw { error: "Not found" };
      return item;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) return error;
    }
  }
);

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  // const id = params.id
  let item = null;

  // fetch data
  try {
    item = await prisma.item.findUnique({
      where: {
        id: params.itemId,
      },
      select: {
        title: true,
      },
    });
    if (!item) throw { error: "Not Found" };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError)
      item = {
        title: "Not Found",
      };
  }

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || [];

  return {
    title: item?.title,
  };
}

const Items = async ({ params: { category, itemId } }: PageProps) => {
  const item = await fetchItem(itemId, category);

  if (!item) return notFound();

  if (item instanceof PrismaClientKnownRequestError) return notFound();

  return <ItemComponent item={item} />;
};

export default Items;
