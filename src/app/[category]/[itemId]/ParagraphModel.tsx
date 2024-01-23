"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { space_mono } from "@/utils/fonts";
import _ from "underscore";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Settings2 } from "lucide-react";
import { Data } from "@prisma/client";

const DialogBox = ({
  index,
  title,
  paragraphs,
  data,
  setData,
}: {
  index: number;
  title: string;
  paragraphs: string[];
  data: Data[];
  setData: React.Dispatch<React.SetStateAction<Data[]>>;
}) => {
  const [temp, setTemp] = useState<Data>({
    title,
    paragraphs,
  });
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        onClick={() => {
          setTemp({ title, paragraphs });
        }}
        className={buttonVariants({
          variant: "ghost",
          className:
            "flex w-full items-center justify-between group truncate rounded-none",
        })}
      >
        <p
          className={`flex-1 text-start ${
            !title ? "text-muted-foreground" : null
          }`}
        >
          {title || "[No title looks like introduction]"}
        </p>
        <Settings2 className="shrink-0 w-4 h-4 text-muted group-hover:text-muted-foreground" />
      </DialogTrigger>
      <DialogContent className={`${space_mono.className} gap-4`}>
        <DialogHeader>
          <DialogTitle className={space_mono.className}>
            Edit Subheadings & Paragraphs
          </DialogTitle>
          <DialogDescription>
            Click <b>save</b> to save changes
          </DialogDescription>
        </DialogHeader>
        {/* <ScrollArea className=""> */}
        <div className="grid gap-2">
          <Badge className="w-fit" variant={"secondary"}>
            Title
          </Badge>
          <Input
            onChange={(e) => setTemp({ ...temp, title: e.target.value })}
            className={`${space_mono.className}`}
            value={temp.title}
          />
          <span className="flex justify-between mt-3">
            <Badge className="w-fit" variant={"secondary"}>
              Paragraphs
            </Badge>
            <Button
              disabled={
                !!temp.paragraphs.length && !temp.paragraphs.slice(-1)[0]
              }
              className={badgeVariants({
                variant: "default",
                className: "h-auto",
              })}
              onClick={() =>
                setTemp({ ...temp, paragraphs: [...temp.paragraphs, ""] })
              }
            >
              Add
            </Button>
          </span>
          {temp.paragraphs.length > 0 ? (
            temp.paragraphs.map((paragraph, index) => (
              // <p
              //   className={`${space_mono.className} text-sm text-muted-foreground`}
              // >
              //   {paragraph}
              // </p>
              <Textarea
                key={index}
                onKeyDown={(e) => {
                  if (e.keyCode == 8 && e.currentTarget.value == "")
                    setTemp({
                      ...temp,
                      paragraphs: temp.paragraphs.filter((o, i) => i !== index),
                    });
                }}
                onChange={(e) =>
                  setTemp({
                    ...temp,
                    paragraphs: temp.paragraphs.map((o, i) => {
                      if (i == index) return e.target.value;
                      return o;
                    }),
                  })
                }
                value={paragraph}
                className="min-h-[120px]"
              />
            ))
          ) : (
            <div className="grid place-items-center">
              <Badge className="my-10" variant={"outline"}>
                No Paragraphs
              </Badge>
            </div>
          )}
          <span className="flex gap-2">
            <Button
              disabled={!temp.paragraphs.length}
              className="flex-1"
              onClick={() => {
                setData(data.map((e, i) => (i === index ? temp : e)));
                // setTemp({
                //   title: "",
                //   paragraphs: [],
                // });
                setOpen(false);
              }}
            >
              Save
            </Button>
          </span>
        </div>
        {/* </ScrollArea> */}
        {/* </div> */}
      </DialogContent>
    </Dialog>
  );
};

const AddNewSection = ({
  open,
  setOpen,
  data,
  setData,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: Data[];
  setData: React.Dispatch<React.SetStateAction<Data[]>>;
}) => {
  const [temp, setTemp] = useState<Data>({
    title: "",
    paragraphs: [],
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger
        className={buttonVariants({
          variant: "ghost",
          className: "my-10",
        })}
      >
      </DialogTrigger> */}
      <DialogContent className={`${space_mono.className} gap-4`}>
        <DialogHeader>
          <DialogTitle className={space_mono.className}>
            Add Subheadings & Paragraphs
          </DialogTitle>
          <DialogDescription>
            Click &apos;+&apos; to add new paragraph
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          {/* {data.map((e) => ( */}
          <div className="grid gap-2">
            <Badge className="w-fit" variant={"secondary"}>
              Title
            </Badge>
            <Input
              onChange={(e) => setTemp({ ...temp, title: e.target.value })}
              className={`${space_mono.className}`}
              value={temp.title}
            />
            <span className="flex justify-between mt-3">
              <Badge className="w-fit" variant={"secondary"}>
                Paragraphs
              </Badge>
              <Button
                disabled={
                  !!temp.paragraphs.length && !temp.paragraphs.slice(-1)[0]
                }
                className={badgeVariants({
                  variant: "default",
                  className: "h-auto",
                })}
                onClick={() =>
                  setTemp({ ...temp, paragraphs: [...temp.paragraphs, ""] })
                }
              >
                Add
              </Button>
            </span>
            {temp.paragraphs.length > 0 ? (
              temp.paragraphs.map((paragraph, index) => (
                // <p
                //   className={`${space_mono.className} text-sm text-muted-foreground`}
                // >
                //   {paragraph}
                // </p>
                <Textarea
                  key={index}
                  onKeyDown={(e) => {
                    if (e.keyCode == 8 && e.currentTarget.value == "")
                      setTemp({
                        ...temp,
                        paragraphs: temp.paragraphs.filter(
                          (o, i) => i !== index
                        ),
                      });
                  }}
                  onChange={(e) =>
                    setTemp({
                      ...temp,
                      paragraphs: temp.paragraphs.map((o, i) => {
                        if (i == index) return e.target.value;
                        return o;
                      }),
                    })
                  }
                  value={paragraph}
                  className="min-h-[120px]"
                />
              ))
            ) : (
              <div className="grid place-items-center">
                <Badge className="my-10" variant={"outline"}>
                  No Paragraphs
                </Badge>
              </div>
            )}
            <span className="flex gap-2">
              <Button
                disabled={!temp.paragraphs.length}
                className="flex-1"
                onClick={() => {
                  setData([...data, temp]);
                  setTemp({
                    title: "",
                    paragraphs: [],
                  });
                  setOpen(false);
                }}
              >
                Append
              </Button>
            </span>
          </div>
          {/* ))} */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ParagraphModel = ({
  data,
  setData,
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: Data[];
  setData: React.Dispatch<React.SetStateAction<Data[]>>;
}) => {
  return (
    <div className="grid place-items-center border rounded-md truncate">
      <AddNewSection
        open={open}
        setOpen={setOpen}
        data={data}
        setData={setData}
      />
      {data.length > 0 ? (
        data.map((e, i) => (
          <div className="grid w-full" key={i}>
            <DialogBox
              index={i}
              data={data}
              setData={setData}
              title={e.title}
              paragraphs={e.paragraphs}
            />
            <Separator />
          </div>
        ))
      ) : (
        <p className="flex-1 text-start text-xs my-10">No Subheadings</p>
      )}
    </div>
  );
};

export default ParagraphModel;
