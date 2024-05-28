import { useEffect, useState } from "react";
import { JobDetailsSection } from "../Invitation/JobDetails";
import { userouter, useParams } from "react-router-dom";
import { offerDetails } from "../../helpers/APIs/freelancerApis";
import { Avatar, Button } from "@chakra-ui/react";
import { FaLocationDot } from "react-icons/fa6";
import InvitationSkeleton from "../Skeletons/InvitationSkeleton";
import Timesheet from "../Reports/Timesheet";
import StarRatings from "react-star-ratings";
import DataNotAvailable from "../DataNotAvailable/DataNotAvailable";

const CompleteJob = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [jobDetails, setJobDetails] = useState({});

  const { id } = useParams();
  const router = useRouter();

  const { client_details, freelancer_review, _id } = jobDetails;

  const getInvitationDetails = async () => {
    setIsLoading(true);
    try {
      const { body, code } = await offerDetails(id);
      if (code === 200) setJobDetails(body[0]);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getInvitationDetails();
  }, []);

  const dataAvailable = jobDetails && client_details;

  return (
    <div className="w-full">
      <div className="my-4">
        <h2 className="my-3 text-2xl font-bold text-[1.6rem] text-[#374151]">
          Completed Job Details
        </h2>
      </div>
      {isLoading ? (
        <InvitationSkeleton />
      ) : dataAvailable ? (
        <div>
          <div className="grid lg:grid-cols-3 gap-5 mt-3 sm:mt-5 lg:mt-10">
            <div className="col-span-2">
              <JobDetailsSection jobDetails={jobDetails} jobStatus="closed" />
            </div>
            <div className="col-span-1 w-full h-fit bg-white p-8 rounded-xl border border-[var(--bordersecondary)]">
              <div className="flex gap-3 mb-4">
                <Avatar
                  size={"lg"}
                  // src={
                  //   profile_image
                  //     ? profile_image
                  //     : agency_profileImage
                  // }
                  name={
                    client_details?.[0]?.firstName +
                    " " +
                    client_details?.[0]?.lastName
                  }
                />{" "}
                <div>
                  <p className="text-2xl font-semibold">
                    {client_details?.[0]?.firstName +
                      " " +
                      client_details?.[0]?.lastName}
                  </p>{" "}
                  {client_details?.[0]?.avg_review && (
                    <div className="flex items-center">
                      <StarRatings
                        rating={client_details?.[0]?.avg_review}
                        starDimension="18px"
                        starSpacing="1px"
                        starRatedColor="#22C35E"
                        starEmptyColor="#8ab89b"
                      />{" "}
                      ({client_details?.[0]?.avg_review}) Reviews
                    </div>
                  )}
                  {client_details?.[0]?.location && (
                    <p className="flex items-center gap-1">
                      <FaLocationDot />
                      {client_details?.[0]?.location}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <p className="text-lg font-semibold">Contract Title:</p>
                <p className="text-lg capitalize">
                  {jobDetails?.contract_title}
                </p>
              </div>

              <Button
                mt={5}
                width={"full"}
                colorScheme={"primary"}
                variant={freelancer_review ? "outline" : "solid"}
                isDisabled={freelancer_review}
                onClick={() =>
                  !freelancer_review &&
                  router(`/submit-review/${_id}`, {
                    state: {
                      jobDetails: jobDetails,
                      receiverDetails: client_details?.[0],
                    },
                  })
                }
              >
                {freelancer_review
                  ? "Already Given Feedback"
                  : "Send Feedback For Client"}
              </Button>
            </div>
          </div>
          {jobDetails?.job_type === "hourly" && (
            <Timesheet activeJobs={[jobDetails]} />
          )}
        </div>
      ) : (
        <DataNotAvailable onRefresh={getInvitationDetails} />
      )}
    </div>
  );
};

export default CompleteJob;
