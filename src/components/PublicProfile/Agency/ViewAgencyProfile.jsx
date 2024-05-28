import { useEffect, useState } from "react";
import HomeLayout from "../../../Layouts/HomeLayout";
import { useParams } from "react-router-dom";
import { getAgencyById } from "../../../helpers/APIs/agencyApis";
import { Box } from "@chakra-ui/react";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import TopSide from "./TopSide";
import AgencyProfileSkeleton from "../../Skeletons/AgencyProfileSkeleton";
import DataNotAvailable from "../../DataNotAvailable/DataNotAvailable";

const ViewAgencyProfile = () => {
  const [agencyDetails, setAgencyDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  const getAgencyDetails = async () => {
    try {
      const { code, body } = await getAgencyById(id);
      if (code === 200) setAgencyDetails(body);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getAgencyDetails();
  }, []);

  return (
    <HomeLayout>
      {isLoading ? (
        <AgencyProfileSkeleton />
      ) : agencyDetails?.agency_name ? (
        <Box width={"100%"}>
          <TopSide details={agencyDetails} />
          <Box
            display={{ lg: "flex" }}
            justifyContent={"space-between"}
            width={"100%"}
            paddingY={"20px"}
            position={"relative"}
            className="shadow-sm border p-4 bg-white mt-2 lg:px-10"
          >
            <LeftSide details={agencyDetails} />
            <RightSide details={agencyDetails} />
          </Box>
        </Box>
      ) : (
        <DataNotAvailable onRefresh={getAgencyDetails} />
      )}
    </HomeLayout>
  );
};

export default ViewAgencyProfile;
