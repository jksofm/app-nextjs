"use server";
import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { ObjectId } from "mongodb";

interface Params {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}
export async function createThread({
  author,
  communityId,
  path,
  text,
}: Params) {
  try {
    connectToDB();

    const createThread = await Thread.create({
      text,
      author,
      community: null,
    });
    // .populate({
    //     path: 'communities',
    //     model: Community
    // });
    await User.findByIdAndUpdate(author, {
      $push: { threads: createThread._id },
    });
    console.log("Create Thread Successfully");
    revalidatePath(path);
  } catch (e) {
    console.log(e);
  }
}
export async function HandleLikeThread({
  userId,
  threadId,
  path,
}: {
  userId: string;
  threadId: string;
  path: string;
}) {
  connectToDB();
  console.log("test");
  const checkLikeExist = await Thread.findOne({
    _id: threadId,
    likes: { $in: [userId] },
  });
  console.log(checkLikeExist);

  if (!checkLikeExist) {
    console.log("Like");
    await Thread.findOneAndUpdate(
      {
        _id: threadId,
      },
      {
        $push: { likes: userId },
      }
    );
    revalidatePath(path);

    return {
      message: "Like Successfully",
    };
  } else {
    console.log("UnLike");

    await Thread.findOneAndUpdate(
      {
        _id: threadId,
      },
      {
        $pullAll: { likes: [userId] },
      }
    );
    revalidatePath(path);
    return {
      message: "UnLike Successfully",
    };
  }
}

export async function fetchThreads({ pageNumber = 1, pageSize = 20 }) {
  connectToDB();
  const skipAmount = (pageNumber - 1) * pageSize;
  const postQuery = Thread.find({
    parentId: { $in: [null, undefined] },
  })
    .sort({ createdAt: "desc" })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({
      path: "author",
      model: "User",
      select: "username name _id image id",
    })
    .populate({
      path: "parentId",
      model: "Thread",
      select: "text _id parentId children author",
    })
    .populate({
      path: "children",
      model: "Thread",
      select: "_id parentId text children author",
      populate: [
        {
          path: "author",
          model: "User",
          select: "_id name username image id",
        },
      ],
      // populate: {
      //   path: "author",
      //   model: User,
      //   select: "_id name parentId image",
      // },
    });
  const totalPostsCount = await Thread.countDocuments({
    parentId: { $in: [null, undefined] },
  });
  const posts = await postQuery.exec();
  const isNext = totalPostsCount > skipAmount + posts.length;

  return {
    posts,
    pagination: {
      currentPage: pageNumber,
      pageSize,
      totalPage: Math.ceil(totalPostsCount / pageSize),
      isNext,
    },
  };
}
export async function fetchThreadsByUserId({
  userId,
  pageNumber = 1,
  pageSize = 20,
}: {
  userId: string;
  pageNumber?: number;
  pageSize?: number;
}) {
  connectToDB();
  const skipAmount = (pageNumber - 1) * pageSize;
  const postQuery = Thread.find({
    parentId: { $in: [null, undefined] },
    author: userId,
  })
    .sort({ createdAt: "desc" })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({
      path: "author",
      model: "User",
      select: "username name _id image id",
    })
    .populate({
      path: "parentId",
      model: "Thread",
      select: "text _id parentId children author",
    })
    .populate({
      path: "children",
      model: "Thread",
      select: "_id parentId text children author",
      populate: [
        {
          path: "author",
          model: "User",
          select: "_id name username image id",
        },
      ],
      // populate: {
      //   path: "author",
      //   model: User,
      //   select: "_id name parentId image",
      // },
    });
  const totalPostsCount = await Thread.countDocuments({
    parentId: { $in: [null, undefined] },
    author: userId,
  });
  const posts = await postQuery.exec();
  const isNext = totalPostsCount > skipAmount + posts.length;

  return {
    posts,
    pagination: {
      currentPage: pageNumber,
      pageSize,
      totalPage: Math.ceil(totalPostsCount / pageSize),
      isNext,
    },
  };
}
export async function getThreadInfo(threadId: string) {
  const postQuery = await Thread.findById(threadId)
    .populate({
      path: "author",
      select: "username name _id image",
    })
    .populate({
      path: "parentId",
      model: "Thread",
      select: "text _id parentId children author likes",
    })
    .populate({
      path: "children",
      model: "Thread",
      select: "_id parentId text children author likes",
      populate: [
        {
          path: "author",
          model: "User",
          select: "_id name username image id",
        },
        {
          path: "children",
          model: "Thread",
          populate: {
            path: "author",
            model: "User",
            select: "_id id name parentId image",
          },
        },
      ],
      // populate: {
      //   path: "author",
      //   model: User,
      //   select: "_id name parentId image",
      // },
    })
    .exec();

  return {
    data: postQuery,
  };
}
export async function addCommentToThread({
  author,
  path,
  communityId,
  parentId,
  text,
}: {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
  parentId: string;
}) {
  try {
    connectToDB();
    console.log(parentId);
    const parentThread = await Thread.findById(parentId);
    if (!parentThread) throw new Error("Thread not found");

    const createThread = await Thread.create({
      text,
      author,
      community: null,
      parentId,
    });
    // .populate({
    //     path: 'communities',
    //     model: Community
    // });
    await User.findByIdAndUpdate(author, {
      $push: { threads: createThread._id },
    });
    await Thread.findByIdAndUpdate(parentId, {
      $push: { children: createThread._id },
    });
    console.log("Create Thread Successfully");
    revalidatePath(path);
    revalidatePath(`/thread/${parentId}`);
  } catch (e) {
    console.log(e);
  }
}
