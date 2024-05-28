import { useLocation, useNavigate } from "react-router-dom";
import CTAButton from "../CTAButton";
import { ReviewProposal } from "./ReviewProposal";
import InviteFreelancer from "./InviteFreelancer";
import ViewJobPost from "./ViewJobPost";
import Hire from "./Hire";
import { useEffect, useState } from "react";
import { getProposals } from "../../helpers/APIs/clientApis";

export const ClientJobPostViewComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const jobDetails = location?.state && location?.state?.jobDetails;
  const [proposals, setProposals] = useState([]);
  const userIds = proposals?.map((proposal) => proposal.user_id);
  const [proposalLoading, setProposalLoading] = useState(true);

  const proposalsDetails = async () => {
    try {
      const { body } = await getProposals(jobDetails?._id);
      setProposals(body?.filter((item) => item.contract_status === "applied"));
    } catch (error) {
      console.error(error);
    }
    setProposalLoading(false);
  };

  useEffect(() => {
    proposalsDetails();
  }, []);

  return (
    <div className="w-full md:px-4 md:py-6">
      <div className="flex flex-col items-center md:flex-row md:justify-between">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-semibold text-[#374151] ">
            Your Dashboard
          </h2>
        </div>
        <div className="mt-4">
          <CTAButton
            text={"Post a new job"}
            bg={"var(--primarycolor)"}
            color={"#ffff"}
            fontSize="1rem"
            height="2.5rem"
            onClick={() => navigate("/create-job")}
          ></CTAButton>
        </div>
      </div>

      <div className="my-10">
        <div className="grid gap-1 md:grid-cols-4 md:w-[73.5%]">
          <div className="col-span-1">
            <div
              className={`hover:bg-[#F0FDF4] h-[56px] flex justify-center items-center cursor-pointer rounded-l-lg ${
                page === 0
                  ? "bg-green-100 border-b-2 border-green-500"
                  : "border bg-white"
              }`}
              onClick={() => {
                setPage(0);
              }}
            >
              <p>View Job Post</p>
            </div>
          </div>
          <div className="col-span-1">
            <div
              className={`hover:bg-[#F0FDF4] h-[56px] flex justify-center items-center cursor-pointer ${
                page === 1
                  ? "bg-green-100 border-b-2 border-green-500"
                  : "border bg-white"
              }`}
              onClick={() => setPage(1)}
            >
              <p>Invite Freelancers</p>
            </div>
          </div>
          <div className="col-span-1">
            <div
              className={`hover:bg-[#F0FDF4] h-[56px] flex justify-center items-center cursor-pointer ${
                page === 2
                  ? "bg-green-100 border-b-2 border-green-500"
                  : "border bg-white"
              }`}
              onClick={() => setPage(2)}
            >
              <p>
                Review Proposals{" "}
                <span>
                  (
                  {jobDetails?.proposal_details
                    ? jobDetails?.proposal_details?.filter(
                        (job) => job.contract_status === "applied"
                      )?.length
                    : 0}
                  )
                </span>
              </p>
            </div>
          </div>
          <div className="col-span-1">
            <div
              className={`hover:bg-[#F0FDF4] h-[56px] flex justify-center items-center cursor-pointer rounded-r-lg ${
                page === 3
                  ? "bg-green-100 border-b-2 border-green-500"
                  : "border bg-white"
              }`}
              onClick={() => setPage(3)}
            >
              <p>
                Hire <span>(0)</span>
              </p>
            </div>
          </div>
        </div>
        {/* <Tabs onChange={(index) => setPage(index)} variant="unstyled">
          <TabList gap={10}>
            <Tab>View Job Post</Tab>
            <Tab>Invite Freelancer</Tab>
            <Tab>
              Review Proposals (
              {jobDetails?.proposal_details &&
                jobDetails.proposal_details.length}
              )
            </Tab>
            <Tab>Hire (0)</Tab>
          </TabList>
          <TabIndicator
            height="2px"
            borderRadius="1px"
            color={"#000"}
            className=" bg-fg-brand"
          />
        </Tabs> */}
      </div>

      {page === 0 && <ViewJobPost />}
      {page === 1 && <InviteFreelancer appliedUsers={userIds} />}
      {page === 2 && (
        <ReviewProposal
          proposals={proposals}
          isProposalsLoading={proposalLoading}
        />
      )}
      {page === 3 && <Hire />}
    </div>
  );
};
