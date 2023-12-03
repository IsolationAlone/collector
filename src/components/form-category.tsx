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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "./ui/use-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  coverImage: z.string().url({
    message: "Not a URL",
  }),
});

export function AddCategoryForm({
  modelState,
}: {
  modelState: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const queryClient = useQueryClient();

  const { mutate: creatCategory, isPending } = useMutation({
    mutationFn: async (newCategory) => {
      const res = await fetch("/api/getCategory", {
        method: "post",
        headers: { "Content-Type": "application/josn" },
        body: JSON.stringify(newCategory),
      });
      return await res.json();
    },
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["category"] });
      console.log(data);
      modelState(false);
    },
    onError: (error) => {
      console.log(error);
      toast({
        title: "Database Error",
        variant: "destructive",
      });
    },
  });
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // await new Promise((res) => setTimeout(res, 3000));
    //@ts-ignore
    creatCategory({
      name: values.name.toLowerCase(),
      coverImage: values.coverImage,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-3">
        <FormField
          disabled={isPending}
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category&apos;s Name</FormLabel>
              <FormControl>
                <Input
                  className="placeholder:text-muted"
                  placeholder="What to call this category ?"
                  {...field}
                />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={isPending}
          control={form.control}
          name="coverImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add Image</FormLabel>
              <FormControl>
                <Input
                  className="placeholder:text-muted"
                  placeholder="Random Image Link"
                  {...field}
                />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} type="submit">
          {isPending ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
