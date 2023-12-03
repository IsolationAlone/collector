"use client";

import update from "@/action/update";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { space_mono } from "@/utils/fonts";
import { Copy, Trash2 } from "lucide-react";
import React, { useState } from "react";

const ItemDetails = ({
  id,
  quote,
  setQuote,
  fetchData,
  category,
}: {
  id: string;
  quote: string[];
  fetchData: string[];
  setQuote: React.Dispatch<React.SetStateAction<string[]>>;
  category: string;
}) => {
  const [search, setSearch] = useState("");
  const [text, setText] = useState<string>("");

  const deleteElement = (element: string) => {
    const index = quote.findIndex((ele) => ele == element);
    setQuote(quote.filter((o, i) => i !== index));
  };

  const Item = ({ quote }: { quote: string; index: number }) => {
    return (
      <span className="border relative rounded-md flex flex-1 gap-1 justify-between pl-3 p-2">
        <p className="m-2 flex-wrap">{quote}</p>
        <Button
          onClick={() => {
            deleteElement(quote);
          }}
          className="px-3"
          variant={"destructive"}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </span>
    );
  };

  return (
    <div className={`${space_mono.className} w-full flex flex-col gap-3`}>
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
        {/* <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add Actors"
          className="resize-none h-2"
        /> */}
        <Button
          onClick={() => {
            setQuote([...quote, ...text.split("+")]);
            setText("");
          }}
          className="px-6 uppercase"
        >
          Add
        </Button>
      </form>
      <span className="flex justify-between">
        <section className="flex md:items-center max-md:flex-col gap-2">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-max"
            placeholder="Filter"
          />
          <span className="flex gap-1 text-muted-foreground">
            [
            {search
              ? quote.filter((e, i) => {
                  if (
                    e.toLocaleLowerCase().includes(search.toLocaleLowerCase())
                  )
                    return e;
                }).length
              : quote.length}
            ]<p>Items</p>
          </span>
        </section>
        <Button
          onClick={() => navigator.clipboard.writeText(quote.join("\n"))}
          className="px-6"
        >
          <Copy />
        </Button>
      </span>
      <div className="grid gap-2">
        {search
          ? quote
              .filter((e, i) => {
                if (e.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
                  return e;
              })
              .toReversed()
              .map((e, i) => <Item key={i} index={i} quote={e} />)
          : quote
              .toReversed()
              .map((e, i) => <Item key={i} index={i} quote={e} />)}
      </div>
    </div>
  );
};

export default ItemDetails;
