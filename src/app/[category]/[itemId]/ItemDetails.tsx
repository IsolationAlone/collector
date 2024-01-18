"use client";

import { ComboboxDemo } from "@/components/combo-box";
import { Switch } from "@/components/ui/switch";
import { ComboboxDropdownMenu } from "@/components/dropdown-combo";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { space_mono } from "@/utils/fonts";
import { Data, Quotes, Seo } from "@prisma/client";
import { Copy } from "lucide-react";
import React, { useEffect, useState } from "react";
import ParagraphModel from "./ParagraphModel";
import _ from "underscore";
import updateItemData from "@/action/updateItemData";
import { toast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import publishItem from "@/action/publishItem";

const ItemDetails = ({
  id,
  quote,
  setQuote,
  seo,
  setSeo,
  fetchData,
  category,
  seoData,
  pub,
}: {
  id: string;
  pub: boolean;
  quote: Quotes[];
  seo: Seo;
  setSeo: React.Dispatch<React.SetStateAction<Seo>>;
  fetchData: Quotes[];
  setQuote: React.Dispatch<React.SetStateAction<Quotes[]>>;
  category: string;
  seoData: Data[];
}) => {
  const [search, setSearch] = useState("");
  const [text, setText] = useState<string>("");
  const [images, setImages] = useState<Image[]>([]);

  const [data, setData] = useState<Data[]>(seoData);

  const [openAddModel, setOpenAddModel] = useState(false);

  const [disable, setDisable] = useState(false);

  useEffect(() => {
    fetch(`/api/getImages/${id}`)
      .then((res) => res.json())
      .then((res) => {
        let imgArray: Image[] = [];
        res?.map((e: any) => {
          let img: Image = {
            label: "",
            url: "",
          };
          img.label = e?.name;
          img.url = e?.url;
          imgArray.push(img);
        });
        setImages(imgArray);
      });
  }, []);

  const deleteElement = (element: string) => {
    const index = quote.findIndex((ele) => ele.quote == element);
    setQuote(quote.filter((o, i) => i !== index));
  };

  const publishIt = async (e: boolean) => {
    setDisable(true);
    await publishItem({ itemId: id, publish: e });
    setDisable(false);
  };

  const Item = ({ oneQuote }: { oneQuote: Quotes; index: number }) => {
    return (
      <span className="border relative rounded-md flex flex-1 gap-1 justify-between pl-3 p-2">
        {oneQuote.quoteImage && (
          <Badge className="absolute -top-2">
            {oneQuote.quoteImage.split("/").splice(-1)}
          </Badge>
        )}
        <p className="m-2 flex-wrap">{oneQuote.quote}</p>
        {/* <Button
          onClick={() => {
            deleteElement(quote);
          }}
          className="px-3"
          variant={"destructive"}
        >
          <Trash2 className="h-4 w-4" />
        </Button> */}
        <ComboboxDropdownMenu
          images={images}
          quote={oneQuote.quote}
          deleteIt={deleteElement}
          quotes={quote}
          setQuote={setQuote}
        />
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
          <span className="flex justify-between">
            <Badge className="w-fit" variant={"secondary"}>
              Base
            </Badge>
            <span className="flex items-center gap-2">
              <Label>Publish</Label>
              <Switch
                disabled={disable}
                checked={pub}
                onCheckedChange={publishIt}
              />
            </span>
          </span>
          <Input
            value={seo.title}
            onChange={(e) => setSeo({ ...seo, title: e.target.value })}
            placeholder="Add Title"
          />
          <div className="flex max-md:flex-col gap-2">
            <Input
              value={seo.permalink}
              onChange={(e) => setSeo({ ...seo, permalink: e.target.value })}
              placeholder="Add Permalink"
            />
            <Input
              value={seo.keyword}
              onChange={(e) => setSeo({ ...seo, keyword: e.target.value })}
              placeholder="Focused Keyword"
            />
          </div>
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

          <div className="flex max-md:flex-col gap-2">
            <ComboboxDemo
              seo={seo}
              setSeo={setSeo}
              images={images}
              type="image"
            />
            <ComboboxDemo
              seo={seo}
              setSeo={setSeo}
              images={images}
              type="coverImage"
            />
          </div>

          <div className="flex max-md:flex-col gap-2">
            <Input
              type="text"
              value={seo.int}
              onChange={(e) => setSeo({ ...seo, int: e.target.value })}
              placeholder="Internal Link"
            />
            <Input
              type="text"
              value={seo.ext}
              onChange={(e) => setSeo({ ...seo, ext: e.target.value })}
              placeholder="External Link"
            />
          </div>

          {/* <Dragndrop /> */}

          <div className="flex justify-between">
            <Badge className="w-fit" variant={"secondary"}>
              Paragraphs
            </Badge>
            <span className="flex gap-2">
              <Badge
                onClick={() => setOpenAddModel(true)}
                className="w-fit cursor-pointer"
              >
                Add New
              </Badge>
              <Button
                disabled={_.isEqual(seoData, data) || disable}
                className={badgeVariants({
                  variant: "default",
                  className: "h-auto",
                })}
                onClick={async (e) => {
                  setDisable(true);
                  await updateItemData({ itemId: id, data });
                  toast({
                    title: "Updated Item Data",
                    description: "SubHeadings and Paragraphs",
                  });
                  setDisable(false);
                }}
              >
                Update
              </Button>
            </span>
          </div>

          <ParagraphModel
            data={data}
            setData={setData}
            open={openAddModel}
            setOpen={setOpenAddModel}
          />
          {/* <Button onClick={() => console.log(seo)}>See</Button> */}
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
            <Button
              onClick={() => {
                setQuote([
                  ...quote,
                  ...text.split("+").map((e) => ({
                    quoteImage: "",
                    quote: e,
                  })),
                ]);
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
                        e.quote
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
              onClick={() =>
                navigator.clipboard.writeText(
                  quote.map((e) => e.quote).join("\n")
                )
              }
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
                      e.quote
                        .toLocaleLowerCase()
                        .includes(search.toLocaleLowerCase())
                    )
                      return e;
                  })
                  .map((e, i) => <Item key={i} index={i} oneQuote={e} />)
              : quote.map((e, i) => <Item key={i} index={i} oneQuote={e} />)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ItemDetails;
