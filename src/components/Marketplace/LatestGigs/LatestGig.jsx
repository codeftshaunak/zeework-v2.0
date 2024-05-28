import { useEffect, useState } from "react";
import GigDisplayCards from "../../ClientDashboardUi/LatestOffers/GigDisplayCards";
import { getSearchGigs } from "../../../helpers/APIs/gigApis";

const LatestGig = () => {
  const [gigs, setGigs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllGigs = async () => {
    try {
      setIsLoading(true);
      const response = await getSearchGigs();
      setGigs(response.body);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getAllGigs();
  }, []);

  return (
    <div className="border border-[var(--bordersecondary)] rounded-md overflow-hidden w-full mt-1">
      <div className="flex justify-between border-b border-[var(--bordersecondary)] bg-white p-4">
        <div className=" text-2xl font-medium text-[#374151]">
          Latest Offers
        </div>
      </div>
      <div className="bg-white text-center py-4">
        <div>
          <GigDisplayCards
            allOffers={gigs}
            purchasesReq={[]}
            // tabIndex={tabIndex}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default LatestGig;
