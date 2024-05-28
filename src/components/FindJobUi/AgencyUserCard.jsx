import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { CurrentUserContext } from "../../Contexts/CurrentUser";
import UserCardSkeleton from "../Skeletons/UserCardSkeleton";
import { restorePagesState } from "../../redux/pagesSlice/pagesSlice";

const AgencyUserCard = () => {
  const navigate = useNavigate();
  const { hasAgency, activeAgency, userAgencyLoading } =
    useContext(CurrentUserContext);
  const [cookies, setCookie] = useCookies(["activeagency"]);
  const agency = useSelector((state) => state.profile.agency);
  const { agency_name, agency_tagline, agency_profileImage } = agency || [];
  const dispatch = useDispatch();

  const handleSwitching = () => {
    if (!activeAgency) {
      setCookie("activeagency", true);
      dispatch(restorePagesState());
    } else {
      navigate(`/profile`);
    }
  };

  return (
    <div className="rounded-2xl w-full xl:w-[350px] bg-white m-auto pb-2">
      {userAgencyLoading ? (
        <UserCardSkeleton />
      ) : (
        <div className="rounded-2xl w-full h-full m-auto">
          <div className="flex flex-col items-center gap-1 pt-6 pb-4">
            <Avatar
              src={agency_profileImage}
              name={agency_name}
              className="h-[90px!important] w-[90px!important] object-cover rounded-full mb-4"
            />

            <div className="text-2xl text-[#072C15] font-semibold capitalize">
              {agency_name == null ? "No Agency" : agency_name}
            </div>
            <div className="text-md text-[#072C15] text-center capitalize font-medium">
              {agency_tagline == null
                ? "No Services"
                : agency_tagline.length > 30
                  ? `${agency_tagline.slice(0, 30)}...`
                  : agency_tagline}
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
              <div className="text-sm text-[#072C15] font-medium pl-1">
                5.0 of 4 Reviews
              </div>
            </div> */}
          </div>

          <div className="p-4 flex">
            {agency && hasAgency ? (
              <button
                className="text-center w-[95%] text-white font-semibold py-2 rounded-md m-auto bg-[var(--primarycolor)]"
                onClick={() => handleSwitching()}
              >
                {activeAgency && hasAgency
                  ? "Visit Your Agency Profile"
                  : "Switch To Agency Profile"}
              </button>
            ) : (
              <button
                className="text-center text-xs xl:text-lg w-[95%] text-white font-semibold py-2 rounded-md m-auto bg-[var(--primarycolor)]"
                onClick={() => navigate("/agency-build")}
              >
                Create Your Agency Profile
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AgencyUserCard;
