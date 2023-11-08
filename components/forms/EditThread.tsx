"use client";
import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { ThreadValidation } from "@/lib/vaidation/thread";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  EditThreadInfo,
  createThread,
  getThreadInfo,
} from "@/lib/actions/thread.actions";
import { Router } from "next/router";
import { useOrganization } from "@clerk/nextjs";
import { toast } from "react-toastify";

export default function EditThread({
  userId,
  threadContent,
  threadId,
}: {
  userId: string;
  threadContent: string;
  threadId: string;
}) {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { organization } = useOrganization();

  //   const threadInfo = await getThreadInfo(threadId as string);

  const form = useForm({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: threadContent,
      accountId: userId,
    },
  });
  //   console.log(userId);
  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    // console.log("values", values.thread);
    try {
      await EditThreadInfo({ threadContent: values.thread, threadId });
      toast.success("Update successfully!");

      router.push(`/profile/${userId}`);
    } catch (e) {
      toast.error("Update fail!");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10"
      >
        {/* <FormField
        control={form.control}
        name="profile_photo"
        render={({ field }) => (
          <FormItem className="flex items-center gap-4">
            <FormLabel className="account-form_image-label">
              {field.value ? (
                <Image
                  src={field.value}
                  alt="profile photo"
                  width={96}
                  height={96}
                  priority
                  className="rounded-full"
                />
              ) : (
                <Image
                  src="/assets/profile.svg"
                  alt="profile photo"
                  width={24}
                  height={24}
                  className="object-content"
                />
              )}
            </FormLabel>
            <FormControl>
              <Input
                className="flex-1 text-base-semibold text-gray-200"
                type="file"
                accept="image/*"
                placeholder="account-form_image-input"
                onChange={(e) => handleImage(e, field.onChange)}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      /> */}
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex-col flex gap-3 w-full">
              <FormLabel className="text-base-semibold min-w-[5rem] text-light-2">
                Content
              </FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Textarea rows={15} {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-primary-500">
          Edit Thread
        </Button>
      </form>
    </Form>
  );
}
