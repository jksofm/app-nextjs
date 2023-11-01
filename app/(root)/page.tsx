import ThreadCard from "@/components/cards/ThreadCard";
import { fetchThreads } from "@/lib/actions/thread.actions";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs";
export default async function Home() {
  const result = await fetchThreads({ pageNumber: 1, pageSize: 10 });
  const posts = result.posts;
  const user = await currentUser();

  return (
    <div>
      {/* <UserButton afterSignOutUrl="/" /> */}
      <h1 className="head-text text-left">Home</h1>

      <section className="mt-9 flex flex-col gap-10">
        {result.posts.length === 0 ? (
          <p className="no-result"> No threads found</p>
        ) : (
          <>
            {result.posts.map((post: any) => (
              <ThreadCard
                key={post._id}
                currentUserId={user?.id as string}
                thread={post}
              />
            ))}
          </>
        )}
      </section>
    </div>
  );
}
