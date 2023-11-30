import { notFound } from "next/navigation";
import React from "react";
import ItemDisplay from "./ItemDisplay";

type PageProps = {
  params: {
    category: string;
    itemId: number;
  };
};

const fetchItems = async (category: string): Promise<Item[]> => {
  const res = await fetch(`http://localhost:4000/${category}`, {
    next: { tags: ["category"], revalidate: 60 },
    // cache: "no-cache",
  });
  const items = await res.json();
  return items;
};

const Items = async ({ params: { category, itemId } }: PageProps) => {
  const categoryArray = await fetchItems(category);
  const item = categoryArray[itemId - 1];

  if (!item) return notFound();

  return (
    <div className="flex gap-5">
      <ItemDisplay
        coverImage={item.coverImage}
        itemName={item.itemName}
        subCategory={item.subCategory}
      />
      <div className="grid gap-3">
        <h2 className="text-muted-foreground font-satoshi text-5xl font-extrabold">
          Quotes
        </h2>
        {item.quotes?.map((quote) => (
          <span key={quote} className="border p-3">
            {quote}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Items;
