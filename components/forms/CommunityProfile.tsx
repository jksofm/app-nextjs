import Image from "next/image";

interface CommunityProfileProps {
  community: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
}
export default function CommunityProfile({ community }: CommunityProfileProps) {
  //   console.log("ssss", community);
  /// handle preview image

  return (
    <div>
      <div className="flex flex-col justify-start gap-10">
        <div className="flex items-center gap-4 justify-center">
          <Image
            src={community.image}
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
            <div className="">{community.name}</div>
          </div>
        </div>

        <div className="max-md:items-start flex items-center gap-12 w-full">
          <div className="text-base-semibold min-w-[5rem] text-light-2">
            Bio
          </div>
          <div className="flex-1 text-base-semibold text-gray-200">
            <div className="">{community.bio}</div>
          </div>
        </div>
        <div className="max-md:items-start flex items-center gap-12 w-full">
          <div className="text-base-semibold min-w-[5rem] text-light-2">
            Tag name
          </div>
          <div className="flex-1 text-base-semibold text-gray-200">
            <div className="">{community.username}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
