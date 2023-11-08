import { redirect } from "next/navigation";

import { fetchCommunityPosts } from "@/lib/actions/community.actions";

import ThreadCard from "../cards/ThreadCard";
import { fetchThreadsByUserId } from "@/lib/actions/thread.actions";

interface Result {
  name: string;
  image: string;
  id: string;
  threads: {
    _id: string;
    text: string;
    parentId: string | null;
    author: {
      name: string;
      image: string;
      id: string;
    };
    community: {
      id: string;
      name: string;
      image: string;
    } | null;
    createdAt: string;
    children: {
      author: {
        image: string;
      };
    }[];
  }[];
}

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

async function ThreadsTab({ currentUserId, accountId, accountType }: Props) {
  let result: any;

  if (accountType === "Community") {
    result = await fetchCommunityPosts(accountId);
  } else {
    result = await fetchThreadsByUserId({ userId: accountId });
  }

  if (!result) {
    redirect("/");
  }

  return (
    <section className="mt-9 flex flex-col gap-10">
      {result.threads.map((thread: any) => (
        <ThreadCard
          key={thread._id}
          thread={thread}
          currentUserId={currentUserId}
          author={{ name: result.name, image: result.image, id: result.id }}
          community={{ name: result.name, id: result.id, image: result.image }}
        />
      ))}
    </section>
  );
}

export default ThreadsTab;
