"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { buttonVariants } from "./ui/button";
import { space_mono } from "@/utils/fonts";
import { useDropzone } from "react-dropzone";
import { ImageDownIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Progress } from "@/components/ui/progress";
import _ from "underscore";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ScrollArea } from "./ui/scroll-area";

const Dragndrop = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const { getRootProps, getInputProps, acceptedFiles, isDragActive } =
    useDropzone({
      onDrop(acceptedFiles) {
        // @ts-ignore
        setUploadedFiles([...uploadedFiles, ...acceptedFiles]);
        console.log(acceptedFiles);
      },
    });

  // useEffect(() => {
  //   fetch("/api/getImages")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // console.log(data.resources);
  //       setUploadedFiles(data.resources);
  //     });
  // }, []);

  return (
    <Dialog>
      <DialogTrigger className={buttonVariants({ variant: "outline" })}>
        Open
      </DialogTrigger>
      <DialogContent className={`${space_mono.className} gap-1`}>
        <DialogHeader>
          <DialogTitle className={space_mono.className}>
            Drag &apos;n&apos; Drop
          </DialogTitle>
          <DialogDescription>
            Drag and drop files here or click to browse.
          </DialogDescription>
        </DialogHeader>
        <div
          className={`border flex w-full min-h-[16rem] my-4 rounded-md cursor-pointer  ${
            isDragActive && "bg-gray-300/10"
          }`}
          {...getRootProps()}
        >
          <ImageDownIcon className="w-6 h-6 opacity-60 m-auto" />
          <input
            accept="image/webp"
            {...getInputProps()}
            onChange={(e) => console.log(e.target.files)}
          />
        </div>
        {/* <div className="grid gap-2"> */}
        {/* <Carousel>
          <CarouselContent>
            {_.chunk(uploadedFiles, 5).map((e) => (
              <CarouselItem className="grid gap-2 h-fit">
                {e.map((e: File) => (
                  <div className="flex gap-2 w-full items-center">
                    <Badge
                      className="w-[15%] overflow-hidden truncate"
                      variant={"secondary"}
                    >
                      {e.name}
                    </Badge>
                  </div>
                ))}
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel> */}
        <ScrollArea className="h-[100px]">
          <div className="grid grid-cols-2 gap-2">
            {uploadedFiles.toReversed().map((e: File) => {
              return (
                <div className="flex justify-between gap-2 w-full items-center">
                  <Badge
                    className="overflow-hidden truncate"
                    variant={"secondary"}
                  >
                    {e.name}
                  </Badge>
                  <Badge
                    variant={"destructive"}
                    className="px-2 cursor-pointer"
                  >
                    <XIcon className="h-4 w-4" />
                  </Badge>
                  {/* <Progress getValueLabel={(value) => "loading"} value={33} /> */}
                </div>
                // <Image src={e.secure_url} alt="image" height={100} width={100} />
              );
            })}
          </div>
        </ScrollArea>
        {/* </div> */}
      </DialogContent>
    </Dialog>
  );
};

export default Dragndrop;
