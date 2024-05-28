import { useSelector } from "react-redux";
import { Avatar } from "@chakra-ui/react";
import { useRouter } from 'next/router';

const UserProfileCard = () => {
  const profile = useSelector((state) => state.profile);
  const { name, profile_image, professional_role, id } = profile.profile || {};
  const router = useRouter();

  return (
    <div className="w-[320px] pl-6 mt-3">
      <div className="h-[auto] border border-tertiary rounded-2xl">
        <div className="flex flex-col items-center gap-1 pt-6 pb-4 border-b border-tertiary">
          {profile_image == null ? (
            <Avatar name={name} />
          ) : (
            <img
              src={profile_image}
              alt="avatar"
              className="h-[90px] w-[90px] rounded-full border-4 border-tertiary"
            />
          )}
          <div
            className="text-2xl font-medium cursor-pointer capitalize"
            onClick={() => router(`/profile`)}
          >
            {name}
          </div>
          <div className="text-sm text-gray-300">{professional_role}</div>
          <div className="flex items-center">
            <div className="star-filled"></div>
            <div className="star-filled"></div>
            <div className="star-filled"></div>
            <div className="star-filled"></div>
            <div className="star-filled"></div>
            <div className="text-sm font-medium">5.0 of 4 Reviews</div>
          </div>
        </div>
        <div className="p-4">
          <div className="text-sm text-gray-400">Complete your Profile</div>
          <div className="flex gap-4 items-center mt-3">
            <div className="w-[80%] h-[5px] bg-green-600 rounded-2xl"></div>
            <div className="text-xs font-semibold">100%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
