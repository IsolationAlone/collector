"use client";

import * as React from "react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { space_mono } from "@/utils/fonts";
import { Quotes } from "@prisma/client";

export function ComboboxDropdownMenu({
  images,
  quote,
  quotes,
  deleteIt,
  setQuote,
}: {
  images: Image[];
  quote: string;
  quotes: Quotes[];
  deleteIt: (quote: string) => void;
  setQuote: React.Dispatch<React.SetStateAction<Quotes[]>>;
}) {
  //   const [label, setLabel] = React.useState("feature");
  const [open, setOpen] = React.useState(false);

  return (
    // <>
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <DotsHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className={`${space_mono.className} w-[200px]`}
      >
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Select Image</DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="p-0">
              <Command>
                <CommandInput
                  placeholder="Filter Image..."
                  autoFocus={true}
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>No label found.</CommandEmpty>
                  <CommandGroup>
                    {images.map((image) => (
                      <CommandItem
                        key={image.label}
                        value={image.url}
                        onSelect={(value: string) => {
                          setQuote(
                            quotes.map((e) => {
                              if (e.quote == quote)
                                return {
                                  ...e,
                                  quoteImage:
                                    e.quoteImage == value ? "" : value,
                                };
                              return e;
                            })
                          );
                          // setLabel(value === label ? "" : value);
                          setOpen(false);
                        }}
                      >
                        {image.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => deleteIt(quote)}
            className="text-red-600"
          >
            Delete
            {/* <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut> */}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
    // </>
  );
}
