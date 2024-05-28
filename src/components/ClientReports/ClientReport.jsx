import { VStack, HStack, Skeleton } from "@chakra-ui/react";
import {
  getClientContract,
  getClientReport,
} from "../../helpers/APIs/clientApis";
import { useEffect, useState } from "react";
import ActiveContract from "./ActiveContract";
import CompletedJobs from "./CompletedJobs";

const ClientReport = () => {
  const [isOverviewLoading, setIsOverviewLoading] = useState(true);
  const [isContractLoading, setIsContractLoading] = useState(true);
  const [overview, setOverview] = useState({});
  const [contract, setContract] = useState([]);

  const loadData = async () => {
    try {
      const { code: reportCode, body: reportBody } = await getClientReport();
      if (reportCode === 200) setOverview(reportBody);
    } catch (error) {
      console.error("Error fetching client report:", error);
    } finally {
      setIsOverviewLoading(false);
    }

    try {
      const { code: contractCode, body: contractBody } =
        await getClientContract();
      if (contractCode === 200) setContract(contractBody);
    } catch (error) {
      console.error("Error fetching client contracts:", error);
    } finally {
      setIsContractLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const renderSkeleton = (isLoading, children) => (
    <Skeleton isLoaded={!isLoading} startColor="gray.100" endColor="gray.200">
      {children}
    </Skeleton>
  );

  return (
    <div className="w-full">
      <div>
        <h2 className="mt-8 mb-8 text-[25px] font-semibold">Overview</h2>

        <HStack
          className="max-md:!flex-col flex flex-wrap"
          justifyContent="space-between"
        >
          {renderSkeleton(
            isOverviewLoading,
            <OverviewCard
              value={`$${overview.current_week || 0}`}
              label="Current Week Spend"
            />
          )}
          {renderSkeleton(
            isOverviewLoading,
            <OverviewCard
              value={overview.total_job_posted || 0}
              label="Posted Jobs"
            />
          )}
          {renderSkeleton(
            isOverviewLoading,
            <OverviewCard
              value={overview.total_hired || 0}
              label="Total Hire"
            />
          )}
          {renderSkeleton(
            isOverviewLoading,
            <OverviewCard
              value={`$${overview.total_spend || 0}`}
              label="Total Spend"
            />
          )}
        </HStack>
      </div>

      <br />

      <div>
        <h2 className="mt-8 mb-8  text-[25px] font-semibold">
          Active Contract
        </h2>
        <ActiveContract contractList={contract} loading={isContractLoading} />
      </div>

      {/* Completed Jobs */}
      <div>
        <h2 className="mt-8 mb-8  text-[25px] font-semibold">Completed Jobs</h2>
        <CompletedJobs />
      </div>
    </div>
  );
};

const OverviewCard = ({ value, label }) => (
  <VStack
    width="250px"
    height="8rem"
    backgroundColor="#ffffff"
    border="1px solid #D1D5DA"
    borderRadius="10px"
    cursor="pointer"
    alignItems="center"
    justifyContent="center"
    _hover={{
      border: "1px solid var(--primarycolor)",
      transition: "0.3s ease-in-out",
    }}
    className="max-md:!w-full"
  >
    <p className="font-semibold text-3xl mb-2">{value}</p>
    <p className="text-lg capitalize">{label}</p>
  </VStack>
);

export default ClientReport;
