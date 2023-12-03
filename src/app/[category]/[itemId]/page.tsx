import { notFound } from "next/navigation";
import React, { cache } from "react";
import ItemDisplay from "./ItemDisplay";
import { Item } from "@prisma/client";
import prisma from "@/lib/prismaClient";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import ItemDetails from "./ItemDetails";

type PageProps = {
  params: {
    category: string;
    itemId: string;
  };
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

import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { category: string; itemId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

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

  return (
    <div className="flex max-md:flex-col gap-5">
      <ItemDisplay
        id={itemId}
        coverImage={item.coverImage}
        title={item.title}
        createdAt={item.createdAt}
        updatedAt={item.updatedAt}
        //@ts-ignore
        subCategory={item.Category.name}
      />
      <ItemDetails
        id={item.id}
        quote={item.quotes}
        // @ts-ignore
        category={item.Category.name}
      />
    </div>
  );
};

export default Items;
