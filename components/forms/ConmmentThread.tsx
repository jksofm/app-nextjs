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

import { usePathname } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommentValidation, ThreadValidation } from "@/lib/vaidation/thread";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from "next/image";
import { addCommentToThread } from "@/lib/actions/thread.actions";

export default function ConmmentThread({
  threadId,
  userId,
  username,
  userImage,
}: {
  threadId: string;
  username: string;
  userImage: string;
  userId: string;
}) {
  const pathName = usePathname();

  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      content: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    console.log(threadId);
    await addCommentToThread({
      author: userId,
      communityId: null,
      parentId: threadId,
      path: pathName,
      text: values.content,
    });
    console.log(values);
    form.reset();
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="flex items-center gap-3 w-full">
                <FormLabel className="text-base-semibold text-light-2">
                  <Image
                    alt="Avatar"
                    width={48}
                    height={48}
                    src={userImage}
                    className="rounded-full object-cover"
                  />
                </FormLabel>
                <FormControl className="no-focus mt-0 border border-dark-4 bg-dark-3 text-light-1">
                  <Input
                    type="text"
                    placeholder="Comment..."
                    className="no-focus text-light-1 outline-none"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="bg-primary-500" type="submit">
            Reply
          </Button>
        </form>
      </Form>
    </div>
  );
}
