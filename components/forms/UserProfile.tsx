"use client";

import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { UserValidation } from "@/lib/vaidation/user";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import z from "zod";
import Image from "next/image";
import { Textarea } from "../ui/textarea";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";
import { updateUser } from "@/lib/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
interface AccountProfileProps {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  btnTitle: string;
  id: string;
}
export default function UserProfile({
  user,
  btnTitle,
  id,
}: AccountProfileProps) {
  const router = useRouter();
  const pathname = usePathname();

  /// handle preview image

  return (
    <div>
      <div className="flex flex-col justify-start gap-10">
        <div className="flex items-center gap-4 justify-center">
          <Image
            src={user.image}
            alt="profile photo"
            width={200}
            height={100}
            className="object-cover rounded-full"
          />
        </div>

        <div className="max-md:items-start flex items-center gap-12 w-full">
          <div className="text-base-semibold min-w-[5rem] text-light-2">
            Name
          </div>
          <div className="flex-1 text-base-semibold text-gray-200">
            <div className="">{user.name}</div>
          </div>
        </div>

        <div className="max-md:items-start flex items-center gap-12 w-full">
          <div className="text-base-semibold min-w-[5rem] text-light-2">
            Bio
          </div>
          <div className="flex-1 text-base-semibold text-gray-200">
            <div className="">{user.bio}</div>
          </div>
        </div>
        <div className="max-md:items-start flex items-center gap-12 w-full">
          <div className="text-base-semibold min-w-[5rem] text-light-2">
            Username
          </div>
          <div className="flex-1 text-base-semibold text-gray-200">
            <div className="">{user.username}</div>
          </div>
        </div>

        {id === user.id && (
          <Link href="/onboarding">
            <Button className="bg-primary-500 w-full" type="submit">
              Edit Profile
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
