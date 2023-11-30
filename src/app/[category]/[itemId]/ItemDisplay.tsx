"use client";

import Image from "next/image";
import React from "react";

const ItemDisplay = ({ itemName, coverImage, subCategory }: any) => {
  return (
    <div className="grid gap-2 h-fit min-w-[300px]">
      <span>
        <h1>{itemName}</h1>
      </span>
      <div className="h-[400px] w-full relative bg-slate-100/40">
        <Image
          alt={itemName}
          loader={() => coverImage}
          src={coverImage}
          fill
          className="object-cover object-left"
        />
      </div>
      <span className="text-secondary lowercase font-extrabold text-3xl">
        {subCategory}
      </span>
    </div>
  );
};

export default ItemDisplay;
