import React, { useEffect, useState } from "react";
import { Button, HStack, Progress, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { getAllJobs } from "../../helpers/APIs/jobApis";
import JobCard from "../FindJobUi/JobCard";

const AgencyTopbar = () => {
  const [jobs, setJobs] = useState([]);
  const reverseJob = jobs?.slice().reverse();
  const leatestJob = reverseJob.slice(0, 4);
  const navigate = useNavigate();
  const getAllJobList = async () => {
    try {
      const response = await getAllJobs();
      setJobs(response);
    } catch (error) {
      console.error("Error fetching job list:", error);
    }
  };

  useEffect(() => {
    getAllJobList();
  }, []);

  return (
    <div>
      <div className="w-[75%] py-5">
        <div className="flex justify-between w-full">
          <HStack
            border={"1px solid #D1D5DA"}
            width={"32%"}
            borderRadius={"10px"}
            justifyContent={"center"}
            cursor={"pointer"}
            transition={"0.3s ease-in-out"}
            padding={"1rem 0.5rem"}
            _hover={{
              borderColor: "#22c55e",
            }}
          >
            <img
              src="/images/dashboard/zeework_proposals.png"
              alt="proposals"
            />
            <div>
              <div className="text-sm font-semibold">Find A Job</div>
              <div className="text-sm text-gray-300">
                Search & apply to your next <br /> job now
              </div>
            </div>
          </HStack>
          <HStack
            border={"1px solid #D1D5DA"}
            width={"32%"}
            borderRadius={"10px"}
            justifyContent={"center"}
            cursor={"pointer"}
            transition={"0.3s ease-in-out"}
            padding={"1rem 0.5rem"}
            _hover={{
              borderColor: "#22c55e",
            }}
          >
            {" "}
            <img src="/images/dashboard/zeework_stats.png" alt="proposals" />
            <div
              onClick={() => {
                navigate("/my-stats");
              }}
            >
              <div className="text-sm font-semibold">My Stats</div>
              <div className="text-sm text-gray-300">
                Check your earnings & time spent working
              </div>
            </div>
          </HStack>
          <HStack
            border={"1px solid #D1D5DA"}
            width={"32%"}
            borderRadius={"10px"}
            justifyContent={"center"}
            cursor={"pointer"}
            transition={"0.3s ease-in-out"}
            padding={"1rem 0.5rem"}
            _hover={{
              borderColor: "#22c55e",
            }}
          >
            {" "}
            <img src="/images/dashboard/zeework_jobs.png" alt="proposals" />
            <div
              onClick={() => {
                navigate("/my-jobs");
              }}
            >
              <div className="text-sm font-semibold">My Jobs</div>
              <div className="text-sm text-gray-300">
                View your active jobs & proposals
              </div>
            </div>
          </HStack>
        </div>
        <div className="text-xl font-semibold mt-4 capitalize">
          Here are jobs for you
        </div>
        <div className="flex gap-6 px-6 mt-4">
          <div className="text-sm font-medium text-primary border-b-2 border-primary p-2">
            Most Recent Jobs
          </div>
          {/* <div className="text-sm font-medium text-primary border-b-2 border-primary p-2">Best Matches</div> */}
          {/* <div className="text-sm font-medium text-gray-300 p-2">Most Recent Jobs</div> */}
        </div>
        <div className="border border-tertiary rounded-2xl overflow-auto">
          <JobCard jobs={leatestJob} />
        </div>
        <div className="text-center p-5">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md"
            onClick={() => navigate("/search-job")}
          >
            See More
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgencyTopbar;
