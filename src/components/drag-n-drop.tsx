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
import { ImageDownIcon } from "lucide-react";
import Image from "next/image";

const Dragndrop = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const { getRootProps, getInputProps, acceptedFiles, isDragActive } =
    useDropzone({
      onDrop(acceptedFiles) {
        // @ts-ignore
        // setUploadedFiles(acceptedFiles);
        console.log(acceptedFiles);
      },
    });

  useEffect(() => {
    fetch("/api/getImages")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.resources);
        setUploadedFiles(data.resources);
      });
  }, []);
  return (
    <Dialog>
      <DialogTrigger className={buttonVariants({ variant: "outline" })}>
        Open
      </DialogTrigger>
      <DialogContent className={space_mono.className}>
        <DialogHeader>
          <DialogTitle className={space_mono.className}>
            Drag 'n' Drop
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
        <div className="flex gap-2">
          {uploadedFiles.map((e) => {
            return (
              <Image src={e.secure_url} alt="image" height={100} width={100} />
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Dragndrop;
