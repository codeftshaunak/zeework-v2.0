import { useEffect, useState } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
} from "@chakra-ui/react";
import { getFreelancerGigs } from "../../helpers/APIs/gigApis";
import SingleGig from "./SingleGig/SingleGig";

const GigStatus = () => {
  const [approvedGigs, setApprovedGigs] = useState([]);
  const [pendingGigs, setPendingGigs] = useState([]);

  const getAllGigs = async () => {
    try {
      const response = await getFreelancerGigs();
      const approvedGigs = response?.body?.filter(
        (gig) => gig?.status === "approved"
      );
      const pendingGigs = response?.body?.filter(
        (gig) => gig?.status === "pending"
      );

      setApprovedGigs(approvedGigs);
      setPendingGigs(pendingGigs);
    } catch (error) {
      console.log("Create some freelancer fetching issue: ", error);
    }
  };

  // Fetching All Gigs
  useEffect(() => {
    getAllGigs();
  }, []);

  return (
    <Tabs
      size="md"
      variant="enclosed"
      width={"100%"}
      height={"100%"}
      position={"relative"}
    >
      <TabList height={"3.5rem"}>
        <Tab>Approve ({approvedGigs?.length})</Tab>
        <Tab>Under Review ({pendingGigs?.length})</Tab>
      </TabList>
      <TabPanels width={"100%"} height={"100%"}>
        <TabPanel width={"100%"}>
          <div className="grid gap-5">
            {approvedGigs?.length > 0 ? (
              approvedGigs?.map((gig) => (
                <SingleGig key={gig._id} gig={gig} getAllGigs={getAllGigs} />
              ))
            ) : (
              <Text textAlign={"center"}>
                Currently you haven&apos;t any approved gigs.
              </Text>
            )}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid gap-5">
            {pendingGigs?.length > 0 ? (
              pendingGigs?.map((gig) => (
                <SingleGig key={gig._id} gig={gig} getAllGigs={getAllGigs} />
              ))
            ) : (
              <Text textAlign={"center"}>
                Currently you haven&apos;t any pending gigs.
              </Text>
            )}
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default GigStatus;
