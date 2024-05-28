import { useSelector } from "react-redux";
import { FreelancerProfilePage } from "./FreelancerProfilePage";
import { ClientProfilePage } from "./ClientProfilePage";
import AgencyProfile from "../AgencyUI/AgencyProfile";
import { useContext } from "react";
import { CurrentUserContext } from "../../Contexts/CurrentUser";

export const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: " 0",
    borderRadius: "12px",
  },
};

export const UserProfile = () => {
  const { hasAgency, activeAgency } = useContext(CurrentUserContext);
  const role = useSelector((state) => state.auth.role);

  return (
    <div className="w-[100%] m-auto">

      {hasAgency && activeAgency ? (
        <AgencyProfile />
      ) : (
        (role == 1 && <FreelancerProfilePage />) ||
        (role == 2 && <ClientProfilePage />)
      )}
    </div>
  );
};
