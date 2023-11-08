import ThreadCard from "@/components/cards/ThreadCard";
import InfinityHomeScroll from "@/components/shared/InfinityHomeScroll";
import Loadmore from "@/components/shared/Loadmore";
import Pagination from "@/components/shared/Pagination";
import { fetchThreads } from "@/lib/actions/thread.actions";
import { User } from "@/models/User";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs";
export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const user: any = await currentUser();

  // const result = await fetchThreads({
  //   pageNumber: Number(searchParams.page as string) || 1,
  //   pageSize: 3,
  //   // userId: user.id,
  // });
  // console.log(result.pagination);

  // const posts = result.posts;

  // const newThreads = await fetch(
  //   `https://jsonplaceholder.typicode.com/todos/1`
  // );
  // console.log("tgreas", newThreads.json());

  return (
    <div>
      <h1 className="head-text text-left">Home</h1>

      {/* <section className="mt-9 flex flex-col gap-10">
        {result.posts.length === 0 ? (
          <p className="no-result"> No threads found</p>
        ) : (
          <>
            {result.posts.map((post: any) => (
              <ThreadCard
                key={post._id}
                currentUserId={user?.id as string}
                thread={post}
                community={post.community}
              />
            ))}
          </>
        )}
      </section> */}
      {/* <InfinityHomeScroll /> */}
      <Loadmore />
      {/* <Pagination
        pageNumber={Number(searchParams.page) || result.pagination.currentPage}
        pageSize={result.pagination.pageSize}
        pageTotal={result.pagination.totalPage}
        isNext={result.pagination.currentPage < result.pagination.totalPage}
        path={`/`}
      /> */}
    </div>
  );
}
