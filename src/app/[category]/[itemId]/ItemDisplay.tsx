"use client";

import { nova, space_mono } from "@/utils/fonts";
import { Item } from "@prisma/client";
import Image from "next/image";
import React from "react";

const ItemDisplay = ({
  title,
  coverImage,
  // @ts-ignore
  subCategory,
  createdAt,
  updatedAt,
}: Item) => {
  return (
    <div className="grid gap-2 h-fit min-w-[300px]">
      <span className="grid">
        <h3 className={`${nova.className} capitalize text-3xl md:text-4xl`}>
          {title}
        </h3>
        <span className={`${space_mono.className} flex gap-2`}>
          Created
          <p className="text-muted-foreground">{createdAt.toLocaleString()}</p>
        </span>
        <span className={`${space_mono.className} flex gap-2`}>
          Updated
          <p className="text-muted-foreground">{updatedAt.toLocaleString()}</p>
        </span>
      </span>
      <div className="md:h-[400px] h-[200px] w-full relative border rounded-lg overflow-hidden">
        <Image
          alt={title}
          loader={() => coverImage}
          src={coverImage}
          fill
          className="object-cover opacity-40"
        />
      </div>
      {/* <span className="text-secondary lowercase font-extrabold text-3xl">
        {subCategory}
      </span> */}
    </div>
  );
};

export default ItemDisplay;
