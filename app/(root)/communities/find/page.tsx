import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

// import Searchbar from "@/components/shared/Searchbar";
// import Pagination from "@/components/shared/Pagination";
// import CommunityCard from "@/components/cards/CommunityCard";

import {
  fetchCommunities,
  fetchMyCommunities,
} from "@/lib/actions/community.actions";
import { getMyProfile } from "@/lib/actions/user.actions";
import CommunityCard from "@/components/cards/CommunityCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SearchCommunities from "@/components/forms/SearchCommunities";
import Pagination from "@/components/shared/Pagination";

async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await getMyProfile(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchCommunities({
    searchString: searchParams.searchString,
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 4,
  });

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="head-text">Communities</h1>
        <Link href={`/communities`}>
          <Button className="community-card_btn">My Communities</Button>
        </Link>
      </div>

      <div className="mt-5">
        {/* <Searchbar routeType='communities' /> */}
        <SearchCommunities />
      </div>

      <section className="mt-9 flex flex-wrap gap-4">
        {result.communities.length === 0 ? (
          <p className="no-result">No Result</p>
        ) : (
          <>
            {result.communities.map((community) => (
              <CommunityCard
                key={community.id}
                id={community.id}
                name={community.name}
                username={community.username}
                imgUrl={community.image}
                bio={community.bio}
                members={community.members}
              />
            ))}
          </>
        )}
      </section>

      <Pagination
        pageNumber={Number(searchParams.page) || result.pagination.pageNumber}
        pageSize={result.pagination.pageSize}
        pageTotal={result.pagination.totalPage}
        isNext={result.pagination.pageNumber < result.pagination.totalPage}
        path={`/search`}
      />
    </>
  );
}

export default Page;
