"use client";

import Dragndrop from "@/components/drag-n-drop";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { space_mono } from "@/utils/fonts";
import { Copy, Trash2 } from "lucide-react";
import React, { useState } from "react";

const ItemDetails = ({
  id,
  quote,
  setQuote,
  seo,
  setSeo,
  fetchData,
  category,
}: {
  id: string;
  quote: string[];
  seo: SEO;
  fetchData: string[];
  setQuote: React.Dispatch<React.SetStateAction<string[]>>;
  setSeo: React.Dispatch<React.SetStateAction<SEO>>;
  category: string;
}) => {
  const [search, setSearch] = useState("");
  const [text, setText] = useState<string>("");
  let images = [];

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
    <div className={`${space_mono.className} w-full `}>
      <Tabs defaultValue="seo" className="w-full ">
        <TabsList className="w-full">
          <TabsTrigger
            className="flex-1 text-lg py-1 font-semibold"
            value="seo"
          >
            OnPage SEO
          </TabsTrigger>
          <TabsTrigger
            className="flex-1 text-lg py-1 font-semibold"
            value="content"
          >
            Content
          </TabsTrigger>
        </TabsList>

        {/* SEO */}
        <TabsContent className="flex flex-col gap-3 py-4" value="seo">
          <Input
            value={seo.title}
            onChange={(e) => setSeo({ ...seo, title: e.target.value })}
            placeholder="Add Title"
          />
          <Input
            value={seo.permalink}
            onChange={(e) => setSeo({ ...seo, permalink: e.target.value })}
            placeholder="Add Permalink"
          />
          <Textarea
            value={seo.description}
            onChange={(e) => setSeo({ ...seo, description: e.target.value })}
            placeholder="Add Meta Description"
          />
          {/* <Input
            // value={text}
            // onChange={(e) => setText(e.target.value)}
            placeholder="Add Meta Description"
          /> */}
          {/* <Label>Image</Label> */}
          <Input
            type="text"
            value={seo.image}
            onChange={(e) => setSeo({ ...seo, image: e.target.value })}
            placeholder="Add Image"
          />
          <Input
            type="text"
            value={seo.coverImage}
            onChange={(e) => setSeo({ ...seo, coverImage: e.target.value })}
            placeholder="Add Cover Title"
          />

          <Dragndrop />

          <Button onClick={() => console.log(seo)}>See</Button>
        </TabsContent>

        {/* Content */}
        <TabsContent className="flex flex-col gap-3" value="content">
          {/* Add */}
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
          {/* Filter */}
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
                        e
                          .toLocaleLowerCase()
                          .includes(search.toLocaleLowerCase())
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
          {/* Quotes */}
          <div className="grid gap-2">
            {search
              ? quote
                  .filter((e, i) => {
                    if (
                      e.toLocaleLowerCase().includes(search.toLocaleLowerCase())
                    )
                      return e;
                  })
                  .map((e, i) => <Item key={i} index={i} quote={e} />)
              : quote.map((e, i) => <Item key={i} index={i} quote={e} />)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ItemDetails;
