import { notFound } from "next/navigation";
import ItemCard from "./ItemCard";
import prisma from "@/lib/prismaClient";
import { Category, Item } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import ItemForm from "./ItemForm";
import { cache } from "react";
import { Metadata, ResolvingMetadata } from "next";

export const dynamicParams = true;

type PageProps = {
  params: {
    category: string;
  };
};

export async function generateStaticParams() {
  const categories: Pick<Category, "id" | "name">[] =
    await prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  // const categories: Category[] = await res.json();

  return categories.map((category) => {
    if (!category) return;
    category: category.name.toString();
  });
}

type Props = {
  params: { category: string };
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
    item = await prisma.category.findFirst({
      where: {
        name: params.category,
      },
      select: {
        name: true,
      },
    });
    if (!item) throw { error: "Not Found" };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError)
      item = {
        name: "Not Found",
      };
  }

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || [];

  return {
    title: item?.name,
  };
}

const fetchItems = cache(
  async (
    category: string
  ): Promise<Partial<Item>[] | PrismaClientKnownRequestError | undefined> => {
    try {
      const res = await prisma.category.findFirst({
        where: {
          name: category,
        },
        include: {
          items: true,
        },
      });
      // console.log(res);
      if (!res) throw { error: "Not found" };
      return res?.items;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) return error;
    }
  }
);

const Category = async ({ params: { category } }: PageProps) => {
  const data = await fetchItems(category);

  // console.log(data);

  if (!data) return notFound();

  if (data instanceof PrismaClientKnownRequestError) return notFound();

  // console.log(data);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
      <ItemForm item={category} />
      {/* {data[0].title} */}
      {data.map((item) => (
        <ItemCard key={item.id} data={item} category={category} />
      ))}
    </div>
  );
};

export default Category;
