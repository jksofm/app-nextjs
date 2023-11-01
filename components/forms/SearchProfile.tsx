"use client";
import { User } from "@/models/User";
import React from "react";
import z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

import { usePathname, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CommentValidation,
  ThreadValidation,
  searchValidation,
} from "@/lib/vaidation/thread";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from "next/image";
import { addCommentToThread } from "@/lib/actions/thread.actions";

export default function SearchProfile() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(searchValidation),
    defaultValues: {
      searchString: "",
    },
  });
  const handleSearch = (values: z.infer<typeof searchValidation>) => {
    console.log(values.searchString);
    if (values.searchString.trim() === "") {
      router.replace("/search");
    }
    router.push(`/search?searchString=${values.searchString}`);
  };
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSearch)}
          className="comment-form"
        >
          <FormField
            control={form.control}
            name="searchString"
            render={({ field }) => (
              <FormItem className="flex items-center gap-3 w-full">
                <FormControl className="no-focus mt-0 border border-dark-4 bg-dark-3 text-light-1">
                  <Input
                    type="text"
                    placeholder="Search..."
                    className="no-focus text-light-1 outline-none"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="bg-primary-500" type="submit">
            Search
          </Button>
        </form>
      </Form>
    </div>
  );
}
