"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { User as UserModel } from "@/models/User";
import { type FilterQuery } from "mongoose";
import Thread from "../models/thread.model";

export async function updateUser(
  userId: string,
  username: string,
  name: string,
  bio: string,
  image: string,
  path: string
): Promise<void> {
  connectToDB();
  try {
    await User.findOneAndUpdate(
      {
        id: userId,
      },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      {
        upsert: true,
      }
    );
    revalidatePath(path);

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
    console.log("Update user successfully");
  } catch (error) {
    throw new Error(`Fail to update user`);
  }
}
export async function getMyProfile(
  userId: string
): Promise<UserModel | undefined> {
  connectToDB();
  try {
    const user = await User.findOne({ id: userId });
    // .populate({
    //     path: 'communities',
    //     model: Community
    // });
    console.log("Find User successfully");
    return user;
  } catch (e) {
    console.log(e);
  }
}
export async function getUserProfile(
  userId: string
): Promise<UserModel | undefined> {
  connectToDB();
  try {
    const user = await User.findOne({ id: userId });
    // .populate({
    //     path: 'communities',
    //     model: Community
    // });
    console.log("Find User successfully");
    return user;
  } catch (e) {
    console.log(e);
  }
}
export async function fetchUsers({
  pageNumber = 1,
  pageSize = 10,
  searchString,
  sortBy = "desc",
  userId,
}: {
  searchString: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: string;
  userId: string;
}) {
  try {
    connectToDB();
    const skipAmount = (pageNumber - 1) * pageSize;
    const regex = new RegExp(searchString, "i");
    const query: FilterQuery<typeof User> = {
      id: { $ne: userId },
    };
    if (searchString.trim() !== "") {
      query.$or = [
        { username: { $regex: regex } },
        { name: { $regex: regex } },
      ];
    }
    const sortOptions = { createdAt: sortBy };
    const usersQuery = User.find(query)
      .sort(sortOptions as any)
      .skip(skipAmount)
      .limit(pageSize);

    const users = await usersQuery.exec();
    const usersCount = await User.countDocuments(query);

    const pageTotal = Math.ceil(usersCount / pageSize);

    return {
      pagination: {
        pageNumber,
        pageSize,
        pageTotal,
      },
      data: users || [],
    };
  } catch (error) {
    console.log(error);
  }
}
export async function getActivity(userId: string) {
  try {
    connectToDB();

    const userThreads = await Thread.find({ author: userId });
    const childThreadIds = userThreads.reduce((acc, userThread) => {
      return [...acc, ...userThread.children];
    }, []);

    const replies = await Thread.find({
      _id: { $in: childThreadIds },
      author: { $ne: userId },
    }).populate({
      path: "author",
      model: User,
      select: "name image _id",
    });
    return { data: replies };
  } catch (e) {
    console.log(e);
  }
}
