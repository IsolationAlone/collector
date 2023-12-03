"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import addItem from "@/action/addItem";
import updateItem from "@/action/updateItem";

type Props = {
  modelState: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  coverImage: string;
  itemId: string;
};

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  coverImage: z.string().url({
    message: "Not a URL",
  }),
});

export function UpdateItemForm({
  itemId,
  modelState,
  title,
  coverImage,
}: Props) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title,
      coverImage,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(values);
    const data = {
      title: values.title,
      coverImage: values.coverImage,
      itemId,
    };
    // console.log(data);

    // await new Promise((res) => setTimeout(res, 2000));
    await updateItem(data);
    modelState(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          disabled={form.formState.isSubmitting}
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Category's Name</FormLabel> */}
              <FormControl>
                <Input placeholder="Item's Name" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={form.formState.isSubmitting}
          control={form.control}
          name="coverImage"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Add Image</FormLabel> */}
              <FormControl>
                <Input placeholder="Image Link related to Item" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={form.formState.isSubmitting} type="submit">
          {form.formState.isSubmitting ? "Updating..." : "Update"}
        </Button>
      </form>
    </Form>
  );
}
