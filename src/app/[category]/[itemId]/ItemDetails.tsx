"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { space_mono } from "@/utils/fonts";
import { Copy } from "lucide-react";
import React, { useState } from "react";

const Item = ({ quote }: { quote: string }) => {
  return <span className="border rounded-md px-3 py-2">{quote}</span>;
};

const ItemDetails = () => {
  const [search, setSearch] = useState("");
  const [arr, setArr] = useState(["dog", "cat", "kate"]);
  const [text, setText] = useState("");
  return (
    <div className={`${space_mono.className} w-full w- flex flex-col gap-3`}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="flex w-full gap-2 items-center"
      >
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add Actors"
        />
        <Button
          onClick={() => {
            setArr([...arr, text]);
            setText("");
          }}
          className="px-6 uppercase"
        >
          Add
        </Button>
      </form>
      <span className="flex justify-between">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-max"
          placeholder="Filter"
        />
        <Button
          onClick={() => navigator.clipboard.writeText(arr.join("\n"))}
          className="px-6"
        >
          <Copy />
        </Button>
      </span>
      <div className="grid gap-2">
        {search
          ? arr
              .filter((e) => {
                if (e.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
                  return e;
              })
              .map((e) => <Item quote={e} />)
          : arr.map((e) => <Item quote={e} />)}
      </div>
    </div>
  );
};

export default ItemDetails;
