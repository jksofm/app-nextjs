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

async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await getMyProfile(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchMyCommunities({
    searchString: searchParams.q,
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 5,
    userId: userInfo._id,
  });

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="md:head-text text-light-1 text-[1.5rem] font-bold">
          My Communities
        </h1>
        <Link href={`/communities/find`}>
          <Button className="community-card_btn md:mr-10">
            Find More Communities
          </Button>
        </Link>
      </div>

      {/* <div className='mt-5'>
        <Searchbar routeType='communities' />
      </div> */}

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

      {/* <Pagination
        path='communities'
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      /> */}
    </>
  );
}

export default Page;
