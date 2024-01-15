"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { space_mono } from "@/utils/fonts";

export function ComboboxDemo({
  type,
  images,
  seo,
  setSeo,
}: {
  type: "image" | "coverImage";
  images: Image[];
  seo: SEO;
  setSeo: React.Dispatch<React.SetStateAction<SEO>>;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(
    type == "image" ? seo.image : seo.coverImage
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? images.find((img) => img.url === value)?.label
            : `Select ${type}...`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={`${space_mono.className} w-[200px] p-0`}>
        <Command>
          <CommandInput placeholder={`Search ${type}...`} />
          <CommandEmpty>No Image found.</CommandEmpty>
          <CommandGroup>
            {images.map((img) => (
              <CommandItem
                key={img.url}
                value={img.url}
                onSelect={(currentValue: string) => {
                  setValue(currentValue === value ? "" : currentValue);
                  type == "image"
                    ? setSeo({
                        ...seo,
                        image: currentValue === value ? "" : currentValue,
                      })
                    : setSeo({
                        ...seo,
                        coverImage: currentValue === value ? "" : currentValue,
                      });
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === img.url ? "opacity-100" : "opacity-0"
                  )}
                />
                {img.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
