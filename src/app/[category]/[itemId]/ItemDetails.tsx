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
import { Data, Faq, Quotes, Seo } from "@prisma/client";
import { Copy, Grid } from "lucide-react";
import React, { useEffect, useState } from "react";
import ParagraphModel from "./ParagraphModel";
import _ from "underscore";
import updateItemData from "@/action/updateItemData";
import { toast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import publishItem from "@/action/publishItem";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import FaqModel from "./FaqModel";

const ItemDetails = ({
  id,
  quote,
  setQuote,
  seo,
  setSeo,
  fetchData,
  category,
  Data,
  pub,
  Faq,
}: {
  id: string;
  pub: boolean;
  quote: Quotes[];
  seo: Seo;
  setSeo: React.Dispatch<React.SetStateAction<Seo>>;
  fetchData: Quotes[];
  setQuote: React.Dispatch<React.SetStateAction<Quotes[]>>;
  category: string;
  Data: Data[];
  Faq: Faq[];
}) => {
  const [search, setSearch] = useState("");
  const [text, setText] = useState<string>("");
  const [images, setImages] = useState<Image[]>([]);

  const [data, setData] = useState<Data[]>(Data);
  const [openAddModel, setOpenAddModel] = useState(false);

  const [faq, setFaq] = useState<Faq[]>(Faq);
  const [openFaqModel, setOpenFaqModel] = useState(false);

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

  const Item = ({
    oneQuote,
    type,
    index,
  }: {
    oneQuote: Quotes;
    index: number;
    type: "Drag" | "NoDrag";
  }) => {
    if (type === "NoDrag")
      return (
        <span className="border relative rounded-md flex flex-1 gap-1 justify-between pl-3 p-2">
          {oneQuote.quoteImage && (
            <Badge className="absolute -top-2">
              {oneQuote.quoteImage.split("/").splice(-1)}
            </Badge>
          )}
          <p className="m-2 flex-wrap">{oneQuote.quote}</p>
          <ComboboxDropdownMenu
            images={images}
            quote={oneQuote.quote}
            deleteIt={deleteElement}
            quotes={quote}
            setQuote={setQuote}
          />
        </span>
      );

    if (type === "Drag")
      return (
        <Draggable key={index} draggableId={index.toString()} index={index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              className={`border relative rounded-md flex flex-1 gap-1 justify-between pl-3 p-2 transition-all duration-200`}
            >
              {oneQuote.quoteImage && (
                <Badge className="absolute -top-2">
                  {oneQuote.quoteImage.split("/").splice(-1)}
                </Badge>
              )}
              <div
                {...provided.dragHandleProps}
                className={`${
                  snapshot.isDragging ? "bg-slate-200/40" : null
                } rounded-full border p-1 absolute -left-3 top-1/4 transition-transform duration-200 hover:scale-125 active:scale-110`}
              >
                <Grid className="h-4 w-4" />
              </div>
              <p className="m-2 flex-wrap">{oneQuote.quote}</p>
              <ComboboxDropdownMenu
                images={images}
                quote={oneQuote.quote}
                deleteIt={deleteElement}
                quotes={quote}
                setQuote={setQuote}
              />
            </div>
          )}
        </Draggable>
      );
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let add,
      arr = quote;

    if (destination.droppableId) {
      add = arr[source.index];
      arr.splice(source.index, 1);
      arr.splice(destination.index, 0, add);
      setQuote(arr);
    }
  };

  const countWords = (data: Data[]) => {
    return data.reduce(
      (acc, val) =>
        acc +
        val.title.split(" ").length +
        val.paragraphs.reduce((acc2, val2) => acc2 + val2.split(" ").length, 0),
      0
    );
  };

  function countWordRepetitions(text: string, wordGroup: string) {
    // Escape special characters in the wordGroup to create a valid regex
    const escapedWordGroup = wordGroup.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // Create a regular expression to match the wordGroup globally
    const regex = new RegExp(escapedWordGroup, "g");

    // Use match to find all occurrences of the wordGroup
    const matches = text.match(regex);

    // Return the count of matches (or 0 if there are no matches)
    return matches ? matches.length : 0;
  }

  const kd = (keyword: string) => {
    let c = 0;
    data.map((e) => {
      c += countWordRepetitions(
        e.title.toLocaleLowerCase(),
        keyword.toLocaleLowerCase()
      );
      e.paragraphs.map((e) => {
        c += countWordRepetitions(
          e.toLocaleLowerCase(),
          keyword.toLocaleLowerCase()
        );
      });
    });
    return c;
  };

  const [wordCount, keywordDensity] = [
    countWords(data),
    ((kd(seo.keyword) / countWords(data)) * 100).toFixed(2),
  ];

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
              onBlur={() =>
                setSeo({
                  ...seo,
                  permalink: seo.permalink
                    .toLocaleLowerCase()
                    .split(" ")
                    .join("-"),
                })
              }
              value={seo.permalink}
              onChange={(e) =>
                setSeo({
                  ...seo,
                  permalink:
                    e.target.value.length < 75
                      ? e.target.value
                      : e.target.value.substring(0, 75),
                })
              }
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
            onChange={(e) =>
              setSeo({
                ...seo,
                description:
                  e.target.value.length < 75
                    ? e.target.value
                    : e.target.value.substring(0, 155),
              })
            }
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
            <section className="flex gap-2">
              <Badge className="w-fit" variant={"secondary"}>
                Paragraphs
              </Badge>
              <div className="flex gap-1 max-lg:flex-col max-lg:text-xs">
                <span className="text-muted-foreground">
                  [{wordCount}]words
                </span>
                <span className="text-muted-foreground">
                  [{keywordDensity}]KD
                </span>
              </div>
            </section>
            <span className="flex gap-2">
              <Badge
                onClick={() => setOpenAddModel(true)}
                className="w-fit cursor-pointer"
              >
                Add New
              </Badge>
              <Button
                disabled={
                  (_.isEqual(Data, data) && _.isEqual(Faq, faq)) || disable
                }
                className={badgeVariants({
                  variant: "default",
                  className: "h-auto",
                })}
                onClick={async (e) => {
                  setDisable(true);
                  await updateItemData({ itemId: id, data, faq });
                  toast({
                    title: "Updated Item Data",
                    description: "SubHeadings, Paragraphs, & FAQs",
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

          <div className="flex justify-between">
            <section className="flex gap-2">
              <Badge className="w-fit" variant={"secondary"}>
                FAQs
              </Badge>
            </section>
            <span className="flex gap-2">
              <Badge
                onClick={() => setOpenFaqModel(true)}
                className="w-fit cursor-pointer"
              >
                Add New
              </Badge>
            </span>
          </div>

          <FaqModel
            open={openFaqModel}
            setOpen={setOpenFaqModel}
            data={faq}
            setData={setFaq}
          />
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
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="container">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="grid gap-2"
                >
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
                        .map((e, i) => (
                          <Item type="NoDrag" key={i} index={i} oneQuote={e} />
                        ))
                    : quote.map((e, i) => (
                        <Item type="Drag" key={i} index={i} oneQuote={e} />
                      ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ItemDetails;
