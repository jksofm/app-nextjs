import Image from "next/image";
import { currentUser } from "@clerk/nextjs";

import { communityTabs, communityTabsUser } from "@/constants";

import UserCard from "@/components/cards/UserCard";
import ThreadsTab from "@/components/shared/ThreadsTab";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  checkRequest,
  fetchCommunityDetails,
} from "@/lib/actions/community.actions";
import UserProfile from "@/components/forms/UserProfile";
import CommunityProfile from "@/components/forms/CommunityProfile";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getMyProfile } from "@/lib/actions/user.actions";
import ButtonLike from "@/components/ui/ButtonLike";
import ButtonRequest from "@/components/shared/ButtonRequest";
import RequestList from "@/components/shared/RequestList";

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return null;
  const communityDetails = await fetchCommunityDetails(params.id);

  const userInfo: any = await getMyProfile(user.id);
  // console.log("userInfo", userInfo);

  const IsUserInCommunity = userInfo.communities.includes(communityDetails._id);
  // const IsAdmin = communityDetails.createdBy._id === userInfo._id;
  const IsAdmin = true;

  // console.log(communityDetails.createdBy._id, userInfo._id);
  const request = await checkRequest({
    communityId: params.id,
    userId: user.id,
  });
  return (
    <section>
      {/* <ProfileHeader
        accountId={communityDetails.createdBy.id}
        authUserId={user.id}
        name={communityDetails.name}
        username={communityDetails.username}
        imgUrl={communityDetails.image}
        bio={communityDetails.bio}
        type="Community"
      /> */}
      <CommunityProfile community={communityDetails} />
      {IsUserInCommunity ? (
        <div className="mt-9">
          <Tabs defaultValue="threads" className="w-full">
            <TabsList className="tab">
              {(IsAdmin ? communityTabs : communityTabsUser).map((tab) => {
                return (
                  <TabsTrigger
                    key={tab.label}
                    value={tab.value}
                    className="tab"
                  >
                    <Image
                      src={tab.icon}
                      alt={tab.label}
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                    <p className="max-sm:hidden">{tab.label}</p>

                    {tab.label === "Threads" && (
                      <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                        {communityDetails.threads.length}
                      </p>
                    )}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <TabsContent value="threads" className="w-full text-light-1">
              {/* @ts-ignore */}
              <Link href={`/create-thread?communityId=${communityDetails.id}`}>
                <Button className="mt-4 bg-[#877EFF]">Create thread</Button>
              </Link>

              <ThreadsTab
                currentUserId={user.id}
                accountId={communityDetails._id}
                accountType="Community"
              />
            </TabsContent>

            <TabsContent value="members" className="mt-9 w-full text-light-1">
              <section className="mt-9 flex flex-col gap-10">
                {communityDetails.members.map((member: any) => (
                  <UserCard
                    key={member.id}
                    userId={member.id}
                    name={member.name}
                    username={member.username}
                    userImage={member.image}
                    personType="User"
                  />
                ))}
              </section>
            </TabsContent>

            <TabsContent value="requests" className="w-full text-light-1">
              {/* @ts-ignore */}
              {/* <ThreadsTab
                currentUserId={user.id}
                accountId={communityDetails._id}
                accountType="Community"
              /> */}

              <RequestList
                communityId={communityDetails.id}
                userId={userInfo._id}
              />
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <div className="flex flex-col gap-2 mt-12 items-center">
          <p className="no-result mt-4">
            Join this community to see their threads
          </p>
          {/* {request.data ? (
            <p className="no-result mt-4">
              You have already requested. Please wait for accepting
            </p>
          ) : (
            <>
              <p className="no-result mt-4">
                Join this community to see their threads
              </p>
              <ButtonRequest />
            </>
          )} */}
        </div>
      )}
    </section>
  );
}

export default Page;
