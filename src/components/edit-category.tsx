"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import updateCategory from "@/action/updateCategory";
import { Textarea } from "./ui/textarea";

type Props = {
  modelState: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  description: string;
};

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().min(30, {
    message: "Meta Description too short.",
  }),
});

export function EditCategoryForm({ modelState, title, description }: Props) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title,
      description,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      title: values.title.toLocaleLowerCase(),
      description: values.description,
    };
    // console.log(data);
    await updateCategory(data);
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
                <Input placeholder="Category's Name" {...field} />
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
          name="description"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Category's Name</FormLabel> */}
              <FormControl>
                <Textarea
                  className="placeholder:text-muted"
                  placeholder="Category's Meta Description"
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
        <Button disabled={form.formState.isSubmitting} type="submit">
          {form.formState.isSubmitting ? "Updating..." : "Update"}
        </Button>
      </form>
    </Form>
  );
}
