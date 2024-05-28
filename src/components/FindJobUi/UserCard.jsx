import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { Avatar } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../Contexts/CurrentUser";
import UserCardSkeleton from "../Skeletons/UserCardSkeleton";
import { restorePagesState } from "../../redux/pagesSlice/pagesSlice";

const UserProfileCard = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["activeagency"]);
  const { hasAgency, activeAgency, userAgencyLoading } =
    useContext(CurrentUserContext);
  const profile = useSelector((state) => state.profile.profile);
  const { profile_image, firstName, lastName, professional_role } =
    profile || [];
  const dispatch = useDispatch();

  const handleSwitching = () => {
    if (activeAgency) {
      setCookie("activeagency", false);
      dispatch(restorePagesState());
    } else {
      navigate(`/profile`);
    }
  };
  return (
    <div className="border border-transparent bg-gradient-to-br from-[#EAF4ED] to-[#D7F4E1] rounded-2xl w-full xl:w-[350px] m-auto flex flex-col justify-evenly items-center">
      {userAgencyLoading ? (
        <div className="pt-6 w-full h-full">
          <UserCardSkeleton />
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center gap-1 pt-6 pb-4">
            <div className="w-[96px] h-[96px] rounded-full flex justify-center items-center border-2 bg-gradient-to-br from-[#A3ECBE] to-[#0EDD5A]">
              <Avatar
                src={profile_image}
                name={firstName + " " + lastName}
                className={`h-[90px!important] w-[90px!important] object-cover border-2 ${!activeAgency && "cursor-pointer"
                  }`}
                onClick={() => !activeAgency && navigate(`/profile`)}
              />
            </div>
            <div
              className={`text-2xl text-[#072C15] font-medium capitalize ${!activeAgency && "cursor-pointer"
                }`}
              onClick={() => !activeAgency && navigate(`/profile`)}
            >
              {firstName + " " + lastName?.slice(0, 1) + "."}
            </div>
            <div className="text-sm text-[#072C15] text-center capitalize">
              {professional_role.length > 40
                ? `${professional_role.slice(0, 40)}...`
                : professional_role}
            </div>

            {/* <div className="flex items-center">
              <div
                className="star-filled"
                style={{ color: "var(--primarycolor)" }}
              >
                ★
              </div>
              <div
                className="star-filled"
                style={{ color: "var(--primarycolor)" }}
              >
                ★
              </div>
              <div
                className="star-filled"
                style={{ color: "var(--primarycolor)" }}
              >
                ★
              </div>
              <div
                className="star-filled"
                style={{ color: "var(--primarycolor)" }}
              >
                ★
              </div>
              <div
                className="star-filled"
                style={{ color: "var(--primarycolor)" }}
              >
                ★
              </div>
              <div className="text-sm font-medium text-[#072C15] pl-1">
                5.0 of 4 Reviews
              </div>
            </div> */}
          </div>
          <div
            className={`w-[80%] xl:w-[300px] border border-transparent rounded-lg flex justify-center items-center bg-white/60 ${hasAgency && activeAgency ? "mb-0" : "mb-4"
              }`}
          >
            <div className="p-4 w-full">
              <div className="text-xs xl:text-sm text-[#15181E]">
                Complete your Profile
              </div>
              <div className="flex gap-4 items-center mt-3">
                <div className="w-[80%] h-[5px] bg-gradient-to-r from-[#a3ecbe00] to-[#1EAE53] rounded-2xl"></div>
                <div className="text-xs text-[#16833E] font-semibold">100%</div>
              </div>
            </div>
          </div>
          {hasAgency && activeAgency && (
            <div className="py-4 flex w-full xl:w-[300px]">
              <button
                className="text-center w-full text-white font-semibold py-2 rounded-md m-auto bg-[var(--primarycolor)]"
                onClick={() => handleSwitching()}
              >
                {"Switch Freelancer Profile"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserProfileCard;
