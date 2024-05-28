import { useEffect, useState } from "react";
import { VStack } from "@chakra-ui/react";
import AgencyProfileHeader from "./AgencyProfileHeader";
import AgencyBody from "./AgencyBody";
import AgencyProfileSkeleton from "../Skeletons/AgencyProfileSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { agencyData } from "../../redux/authSlice/profileSlice";

const AgencyProfile = () => {
  const [agency, setAgency] = useState({});
  const dispatch = useDispatch();
  const agencyProfile = useSelector((state) => state.profile.agency);

  useEffect(() => {
    if (agency._id) dispatch(agencyData({ agency: agency }));
  }, [agency]);

  return (
    <VStack width={"100%"}>
      {!agencyProfile?._id ? (
        <AgencyProfileSkeleton />
      ) : (
        <>
          <AgencyProfileHeader agency={agencyProfile} setAgency={setAgency} />
          <AgencyBody agency={agencyProfile} setAgency={setAgency} />
        </>
      )}
    </VStack>
  );
};

export default AgencyProfile;
