import { notFound } from "next/navigation";
import ItemCard from "./ItemCard";
import prisma from "@/lib/prismaClient";

export const dynamicParams = true;

type PageProps = {
  params: {
    category: string;
  };
};

export async function generateStaticParams() {
  const categories = await prisma.category.findMany();
  // const categories: Category[] = await res.json();

  return categories.map((category) => {
    category: category.name.toString();
  });
}

const fetchItems = async (category: string): Promise<Item[]> => {
  const res = await fetch(`http://localhost:4000/${category}`, {
    // cache: "no-cache",
    next: { tags: ["items"] },
  });
  const items = await res.json();
  return items;
};

const Category = async ({ params: { category } }: PageProps) => {
  const data = await fetchItems(category);

  if (!data.length) return notFound();

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
      {data.map((item) => (
        <ItemCard key={item.id} data={item} />
      ))}
    </div>
  );
};

export default Category;
