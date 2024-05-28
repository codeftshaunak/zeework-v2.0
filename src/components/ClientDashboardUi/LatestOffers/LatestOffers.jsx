import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  getCommonJobGigs,
  getGigPurchasesReq,
} from "../../../helpers/APIs/clientApis";
import GigDisplayCards from "./GigDisplayCards";

const LatestOffers = ({ marketplace }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [allOffers, setAllOffers] = useState([]);
  const [purchasesReqList, setPurchasesReqList] = useState([]);
  const [pendingOrder, setPendingOrder] = useState([]);
  const [rejectedOrder, setRejectedOrder] = useState([]);

  const getAllOffers = async () => {
    try {
      const { body: purchasesBody, code } = await getGigPurchasesReq();

      if (code === 200) {
        setPurchasesReqList(purchasesBody);
        const { body } = await getCommonJobGigs();
        setAllOffers(body);
      }
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getAllOffers();
  }, []);
  console.log(purchasesReqList);
  useEffect(() => {
    if (
      purchasesReqList?.length > 0 &&
      (!pendingOrder?.length || !rejectedOrder?.length)
    ) {
      setPendingOrder(
        purchasesReqList
          .filter((gig) => gig?.status === "pending")
          .map((gig) => ({
            ...gig?.gig_details,
            _id: gig?.gig_id,
            status: gig?.status,
          }))
      );
      setRejectedOrder(
        purchasesReqList
          .filter((gig) => gig?.status === "rejected")
          .map((gig) => ({
            ...gig?.gig_details,
            _id: gig?.gig_id,
            status: gig?.status,
          }))
      );
    }
  }, [purchasesReqList, pendingOrder?.length, rejectedOrder?.length]);

  return (
    <>
      <Tabs
        onChange={(index) => setTabIndex(index)}
        position="relative"
        variant="unstyled"
        paddingX={"16px"}
      >
        {!marketplace && (
          <TabList>
            <Tab>All</Tab>
            <Tab>Pending</Tab>
            <Tab>In Progress</Tab>
            <Tab>Completed</Tab>
          </TabList>
        )}
        {!marketplace && (
          <TabIndicator
            mt="-1.5px"
            height="2px"
            className=" bg-fg-brand"
            borderRadius="1px"
          />
        )}

        <TabPanels>
          <TabPanel>
            <GigDisplayCards
              allOffers={allOffers}
              purchasesReq={purchasesReqList || []}
              tabIndex={tabIndex}
              isLoading={isLoading}
            />
          </TabPanel>
          <TabPanel>
            <GigDisplayCards
              allOffers={pendingOrder}
              tabIndex={tabIndex}
              isLoading={isLoading}
            />
          </TabPanel>
          <TabPanel>
            <GigDisplayCards
              allOffers={rejectedOrder}
              tabIndex={tabIndex}
              isLoading={isLoading}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default LatestOffers;
