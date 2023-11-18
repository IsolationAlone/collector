import { Category } from "@/components/category-list";
import { notFound } from "next/navigation";
import ItemCard from "./ItemCard";

export const dynamicParams = true;

type PageProps = {
  params: {
    category: string;
  };
};

export async function generateStaticParams() {
  const res = await fetch("http://localhost:4000/category");
  const categories: Category[] = await res.json();

  return categories.map((category) => {
    category: category.name.toString();
  });
}

const fetchItems = async (category: string): Promise<Item[]> => {
  const res = await fetch(`http://localhost:4000/${category}`, {
    // next: { revalidate: 60 },
    cache: "no-cache",
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
