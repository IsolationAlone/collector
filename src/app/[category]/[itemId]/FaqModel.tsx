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
import { Settings2, Trash2 } from "lucide-react";
import { $Enums, Faq } from "@prisma/client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectBox = ({
  newType,
  state,
  setState,
}: {
  newType: $Enums.Type;
  state: Faq;
  setState: React.Dispatch<React.SetStateAction<Faq>>;
}) => {
  return (
    <Select
      defaultValue={newType}
      onValueChange={(e) =>
        setState({ ...state, type: e === "Single" ? "Single" : "Multiple" })
      }
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Single">Single</SelectItem>
        <SelectItem value="Multiple">Multiple</SelectItem>
      </SelectContent>
    </Select>
  );
};

const DialogBox = ({
  index,
  question,
  type,
  answer,
  data,
  setData,
}: {
  index: number;
  question: string;
  answer: string[];
  data: Faq[];
  type: $Enums.Type;
  setData: React.Dispatch<React.SetStateAction<Faq[]>>;
}) => {
  const [temp, setTemp] = useState<Faq>({
    question,
    type,
    answer,
  });
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        onClick={() => {
          setTemp({ question, type, answer });
        }}
        className={buttonVariants({
          variant: "ghost",
          className:
            "flex w-full items-center justify-between group truncate rounded-none",
        })}
      >
        <p
          className={`flex-1 text-start ${
            !question ? "text-muted-foreground" : null
          }`}
        >
          {question || "[No title looks like introduction]"}
        </p>
        <Settings2 className="shrink-0 w-4 h-4 text-muted group-hover:text-muted-foreground" />
      </DialogTrigger>
      <DialogContent className={`${space_mono.className} gap-4`}>
        <DialogHeader>
          <DialogTitle className={space_mono.className}>Edit FAQ</DialogTitle>
          <DialogDescription>
            Click <b>save</b> to save changes
          </DialogDescription>
        </DialogHeader>
        {/* <ScrollArea className=""> */}
        <div className="grid gap-2">
          <section className="flex justify-between">
            <Badge className="w-fit" variant={"secondary"}>
              Question
            </Badge>
            <SelectBox state={temp} setState={setTemp} newType={temp.type} />
          </section>
          <Input
            onChange={(e) => setTemp({ ...temp, question: e.target.value })}
            className={`${space_mono.className}`}
            value={temp.question}
          />
          <span className="flex justify-between mt-3">
            <Badge className="w-fit" variant={"secondary"}>
              Answer
            </Badge>
            <Button
              disabled={!!temp.answer.length && !temp.answer.slice(-1)[0]}
              className={badgeVariants({
                variant: "default",
                className: "h-auto",
              })}
              onClick={() => setTemp({ ...temp, answer: [...temp.answer, ""] })}
            >
              Add
            </Button>
          </span>
          {temp.answer.length > 0 ? (
            temp.answer.map((paragraph, index) => (
              <Textarea
                key={index}
                onKeyDown={(e) => {
                  if (e.keyCode == 8 && e.currentTarget.value == "")
                    setTemp({
                      ...temp,
                      answer: temp.answer.filter((o, i) => i !== index),
                    });
                }}
                onChange={(e) =>
                  setTemp({
                    ...temp,
                    answer: temp.answer.map((o, i) => {
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
              disabled={!temp.answer.length || !temp.question}
              className="flex-1"
              onClick={() => {
                setData(data.map((e, i) => (i === index ? temp : e)));
                setOpen(false);
              }}
            >
              Save
            </Button>
            <Button
              onClick={() => {
                setData(data.filter((e, i) => i !== index));
                setOpen(false);
              }}
              size={"icon"}
              variant={"destructive"}
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </span>
        </div>
        {/* </ScrollArea> */}
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
  data: Faq[];
  setData: React.Dispatch<React.SetStateAction<Faq[]>>;
}) => {
  const [temp, setTemp] = useState<Faq>({
    question: "",
    type: "Single",
    answer: [],
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
            Add Some FAQs
          </DialogTitle>
          <DialogDescription>
            Click &apos;+&apos; to add new faq
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          {/* {data.map((e) => ( */}
          <div className="grid gap-2">
            <section className="flex justify-between">
              <Badge className="w-fit" variant={"secondary"}>
                Question
              </Badge>
              <SelectBox newType={temp.type} state={temp} setState={setTemp} />
            </section>
            <Input
              onChange={(e) => setTemp({ ...temp, question: e.target.value })}
              className={`${space_mono.className}`}
              value={temp.question}
            />
            <span className="flex justify-between mt-3">
              <Badge className="w-fit" variant={"secondary"}>
                Answer
              </Badge>
              <Button
                disabled={!!temp.answer.length && !temp.answer.slice(-1)[0]}
                className={badgeVariants({
                  variant: "default",
                  className: "h-auto",
                })}
                onClick={() =>
                  setTemp({ ...temp, answer: [...temp.answer, ""] })
                }
              >
                Add
              </Button>
            </span>
            {temp.answer.length > 0 ? (
              temp.answer.map((paragraph, index) => (
                <Textarea
                  key={index}
                  onKeyDown={(e) => {
                    if (e.keyCode == 8 && e.currentTarget.value == "")
                      setTemp({
                        ...temp,
                        answer: temp.answer.filter((o, i) => i !== index),
                      });
                  }}
                  onChange={(e) =>
                    setTemp({
                      ...temp,
                      answer: temp.answer.map((o, i) => {
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
                  No Answers
                </Badge>
              </div>
            )}
            <span className="flex gap-2">
              <Button
                disabled={!temp.answer.length || !temp.question}
                className="flex-1"
                onClick={() => {
                  setData([...data, temp]);
                  setTemp({
                    question: "",
                    type: "Single",
                    answer: [],
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

const FaqModel = ({
  data,
  setData,
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: Faq[];
  setData: React.Dispatch<React.SetStateAction<Faq[]>>;
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
              question={e.question}
              type={e.type}
              answer={e.answer}
            />
            <Separator />
          </div>
        ))
      ) : (
        <p className="flex-1 text-start text-xs my-10">No Faqs</p>
      )}
    </div>
  );
};

export default FaqModel;
