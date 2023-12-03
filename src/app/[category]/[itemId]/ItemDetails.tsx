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
  category,
}: {
  id: string;
  quote: string[];
  category: string;
}) => {
  //   const fetchData = ["dog", "cat", "kate"];

  const [search, setSearch] = useState("");
  const [arr, setArr] = useState(quote);
  const [text, setText] = useState<string>("");
  const [updating, setUpdating] = useState<boolean>(false);
  const { toast } = useToast();

  const deleteElement = (element: string) => {
    const index = arr.findIndex((ele) => ele == element);
    setArr(arr.filter((o, i) => i !== index));
  };

  const Item = ({ quote }: { quote: string; index: number }) => {
    return (
      <span className="border relative rounded-md flex gap-1 justify-between pl-3 p-2">
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

  // Update
  async function updateArray() {
    setUpdating(true);
    await update({ itemId: id, quotes: arr, category });
    toast({
      title: "Updated Item",
    });
  }

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
            setArr([...arr, ...text.split("+")]);
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
              .filter((e, i) => {
                if (e.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
                  return e;
              })
              .map((e, i) => <Item key={i} index={i} quote={e} />)
          : arr.map((e, i) => <Item key={i} index={i} quote={e} />)}
      </div>
      <Button
        onClick={updateArray}
        disabled={arr.toString() === quote.toString() || updating}
        className="disabled:cursor-not-allowed w-fit mr-0 ml-auto"
      >
        {updating ? "Updating..." : "Update"}
      </Button>
    </div>
  );
};

export default ItemDetails;
