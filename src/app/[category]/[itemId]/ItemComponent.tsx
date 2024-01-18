"use client";

import React, { useState } from "react";
import ItemDisplay from "./ItemDisplay";
import ItemDetails from "./ItemDetails";
import { Item, Seo } from "@prisma/client";

const ItemComponent = ({ item }: { item: Item }) => {
  const [arr, setArr] = useState(item.quotes);
  const [seo, setSeo] = useState<Seo>({
    title: item.seo?.title || "",
    description: item.seo?.description || "",
    permalink: item.seo?.permalink || "",
    image: item.seo?.image || "",
    coverImage: item.seo?.coverImage || "",
    ext: item.seo?.ext || "",
    int: item.seo?.int || "",
    keyword: item.seo?.keyword || "",
  });

  return (
    <div className="flex max-md:flex-col gap-5">
      <ItemDisplay
        id={item.id}
        coverImage={item.coverImage}
        title={item.title}
        createdAt={item.createdAt}
        updatedAt={item.updatedAt}
        //@ts-ignore
        seo={seo}
        //@ts-ignore
        fetchedSeo={item?.seo}
        //@ts-ignore
        fetchedData={item.quotes}
        //@ts-ignore
        subCategory={item.Category.name}
        quotes={arr}
      />
      <ItemDetails
        id={item.id}
        fetchData={item.quotes}
        seo={seo}
        setSeo={setSeo}
        quote={arr}
        setQuote={setArr}
        pub={item.publish}
        // @ts-ignore
        category={item.Category.name}
        seoData={item.data}
      />
    </div>
  );
};

export default ItemComponent;
