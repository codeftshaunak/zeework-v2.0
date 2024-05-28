import { useEffect, useState } from "react";
import { getSearchGigs } from "../../../helpers/APIs/gigApis";
import GigCards from "../GigCards/GigCards";

const Recommended = () => {
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
    <div className="w-full mt-5">
      <div>
        <h1 className="text-3xl font-semibold text-center md:text-left capitalize">
          Services that people loved for superb work and delivery
        </h1>
        <div className="text-center py-4">
          <div>
            <GigCards gigs={gigs} isLoading={isLoading} />
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h1 className="text-3xl font-semibold text-center md:text-left capitalize">
          Marketing
        </h1>
        <div className="text-center py-4">
          <div>
            <GigCards gigs={gigs} isLoading={isLoading} />
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h1 className="text-3xl font-semibold text-center md:text-left capitalize">
          Technology
        </h1>
        <div className="text-center py-4">
          <div>
            <GigCards gigs={gigs} isLoading={isLoading} />
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h1 className="text-3xl font-semibold text-center md:text-left capitalize">
          Random
        </h1>
        <div className="text-center py-4">
          <div>
            <GigCards gigs={gigs} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommended;
