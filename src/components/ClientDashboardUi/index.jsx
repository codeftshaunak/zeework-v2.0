import {
  Button,
  HStack,
  Progress,
  VStack,
  StackDivider,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/router';
import { formatDistanceToNow } from "date-fns";
import ClientProfileCard from "./ClientProfileCard";
import {
  getClientJobs,
  getHiredListByClient,
} from "../../helpers/APIs/clientApis";
import HorizontalCardSkeleton from "../Skeletons/HorizontalCardSkeleton";
import LatestOffers from "./LatestOffers/LatestOffers";
import { Swiper, SwiperSlide } from "swiper/react";
import Greetings from "../Common/Greetings";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const ClientDashboardComponent = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [hiredList, setHiredList] = useState([]);
  const [jobs, setJobs] = useState([]);
  const jobsx = jobs.slice().reverse();
  const [visibleJobs, setVisibleJobs] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const totalPages = Math.ceil(jobs.length / pageSize);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handleJobsPagination = () => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setVisibleJobs(jobsx.slice(startIndex, endIndex));

    // Scroll to the top
    const jobPostingsDiv = document.getElementById("jobPostingsDiv");
    if (jobPostingsDiv && page !== 1) {
      jobPostingsDiv.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    handleJobsPagination();
  }, [page, jobs]);

  const uniqueHired = [];
  const seenFreelancerIds = new Set();
  const swiperRef = useRef();
  if (hiredList?.length > 0) {
    hiredList?.forEach((item) => {
      if (!seenFreelancerIds.has(item.freelancer_id)) {
        seenFreelancerIds.add(item.freelancer_id);
        uniqueHired.push(item);
      }
    });
  }

  const getClientPostedJob = async () => {
    setIsLoading(true);
    try {
      const response = await getClientJobs();

      const sortedJobs = [...response].sort((a, b) =>
        a.created_at.localeCompare(b.created_at)
      );

      setJobs(sortedJobs);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const getHiredFreelancer = async () => {
    const { body } = await getHiredListByClient();
    setHiredList(body);
  };

  useEffect(() => {
    getClientPostedJob();
    getHiredFreelancer();
  }, []);

  return (
    <div className="w-full mt-8">
      <div className="flex flex-col gap-4 w-full">
        <h2 className="text-3xl font-light lg:mb-4 mb-0 text-[#374151]">
          Your Dashboard
        </h2>
        <Greetings />
        <div className="flex gap-4 w-full max-lg:flex-col">
          <div className="max-lg:max-w-full lg:min-w-[70%]">
            <h2 className="text-[25px] mb-2">Your Team</h2>
            {/* <h6 className="text-[16px]">My Team</h6> */}
            {uniqueHired?.length > 0 ? (
              <Swiper
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{
                  768: {
                    // width: 768,
                    slidesPerView: 2,
                  },
                  1440: {
                    // width: 1024,
                    slidesPerView: 3,
                  },
                }}
                onBeforeInit={(swiper) => {
                  swiperRef.current = swiper;
                }}
              // onSlideChange={() => console.log("slide change")}
              // onSwiper={(swiper) => console.log(swiper)}
              >
                {uniqueHired?.length > 0 &&
                  uniqueHired
                    ?.filter((profile) => profile?.freelancerDetails?.length)
                    ?.map((data, index) => {
                      return (
                        <SwiperSlide key={index}>
                          <ClientProfileCard data={data} />
                        </SwiperSlide>
                      );
                    })}
                {/* {uniqueHired?.length < 3 && (
                  <>
                    <SwiperSlide className="h-full">
                      <DefaultClientProfileCard />
                    </SwiperSlide>
                    <SwiperSlide>
                      <DefaultClientProfileCard />
                    </SwiperSlide>
                    <SwiperSlide>
                      <DefaultClientProfileCard />
                    </SwiperSlide>
                  </>
                )} */}
              </Swiper>
            ) : (
              <div className="border-2 mt-4 rounded-md bg-white w-full h-max">
                <div className="flex justify-between border-b border-[var(--bordersecondary)] p-4">
                  <div className=" text-2xl font-medium text-[#374151]">
                    My Team
                  </div>
                </div>
                <div className=" lg:h-[200px] text-center py-4 h-max">
                  <div className="w-[70%] m-auto flex flex-col justify-center items-center gap-2 h-full">
                    <h2 className="font-bold text-xl">Welcome to ZeeWork!</h2>
                    <p className="py-3">
                      Ready to start building your team online? Explore our vast
                      database of programmers, designers, marketers, builders &
                      more. Click below to make your first hire & bring your
                      project live.
                    </p>
                    <Button
                      colorScheme="primary"
                      w={"12rem"}
                      onClick={() => router.push("/create-job")}
                    >
                      Post a new job
                    </Button>
                  </div>
                </div>
              </div>
            )}
            <div className="max-lg:hidden">
              <div className="border border-[var(--bordersecondary)] mt-4 rounded-md overflow-hidden">
                <div className="flex justify-between border-b border-[var(--bordersecondary)] bg-white p-4">
                  <div className=" text-2xl font-medium text-[#374151]">
                    Latest Offers
                  </div>
                </div>
                <div className="bg-white text-center py-4">
                  <div>
                    <LatestOffers />
                  </div>
                </div>
              </div>
              <div className="my-6 border border-[var(--bordersecondary)]  rounded-md w-full bg-white overflow-hidden">
                <div className=" flex items-center justify-between border-b border-[var(--bordersecondary)] p-4 ">
                  <div
                    id="jobPostingsDiv"
                    className="text-2xl font-medium text-[#374151]"
                  >
                    Your Job Postings
                  </div>
                </div>
                <div className="w-full">
                  {isLoading ? (
                    [1, 2].map((item) => (
                      <div key={item} className="px-5">
                        <HorizontalCardSkeleton />
                      </div>
                    ))
                  ) : jobs?.length ? (
                    <VStack
                      divider={
                        <StackDivider borderColor="var(--bordersecondary)" />
                      }
                      spacing={8}
                      align="stretch"
                      bgColor={"white"}
                      padding={5}
                    >
                      {visibleJobs.map((job, index) => {
                        const formattedDate = formatDistanceToNow(
                          new Date(job?.created_at),
                          { addSuffix: true }
                        );
                        return (
                          <div
                            className="flex items-center justify-between w-full max-[480px]:flex-col"
                            key={index}
                          >
                            <VStack
                              alignItems={"start"}
                              justifyContent={"center"}
                              cursor={"pointer"}
                              onClick={() => {
                                router(`/client-jobDetails/${job?._id}`, {
                                  state: { jobDetails: job },
                                });
                              }}
                            >
                              <h5 className="text-lg text-[#374151] font-medium capitalize">
                                {job?.title}
                              </h5>
                              <div className="text-sm text-[#6B7280]">
                                <div className="mb-1 text-[#6B7280] capitalize">
                                  Public - {job?.job_type}
                                </div>
                                <div>Posted {formattedDate} ago by you</div>
                              </div>
                            </VStack>

                            <VStack
                              width={"200px"}
                              justifyContent={"space-between"}
                              alignItems={"end"}
                              className="max-[480px]:!items-center"
                            >
                              <HStack>
                                <div className=" text-[#6B7280] font-bold text-base">
                                  {job?.proposal_details?.length === 0
                                    ? "No"
                                    : job?.proposal_details?.filter(
                                      (item) =>
                                        item.contract_status === "applied"
                                    )?.length}{" "}
                                  New Applicants
                                </div>
                              </HStack>
                              <Button
                                colorScheme="22C35E"
                                color={"#000"}
                                border={"1px solid #22C35E"}
                                size="sm"
                                fontSize={"sm"}
                                w={"10rem"}
                                textTransform={"capitalize"}
                                transition={"0.3s ease-in-out"}
                                _hover={{
                                  bg: "#22C35E",
                                  color: "#fff",
                                }}
                                onClick={() => {
                                  router(`/client-jobDetails/${job._id}`, {
                                    state: { jobDetails: job },
                                  });
                                }}
                              >
                                Go to job post
                              </Button>
                              <Button
                                colorScheme="22C35E"
                                color={"#000"}
                                border={"1px solid #22C35E"}
                                size="sm"
                                fontSize={"sm"}
                                w={"10rem"}
                                textTransform={"capitalize"}
                                transition={"0.3s ease-in-out"}
                                _hover={{
                                  bg: "#22C35E",
                                  color: "#fff",
                                }}
                                onClick={() => {
                                  router(`/client-jobDetails/${job._id}`, {
                                    state: { jobDetails: job },
                                  });
                                }}
                              >
                                Find Applicants
                              </Button>
                            </VStack>
                          </div>
                        );
                      })}

                      {/* Pagination */}
                      {pages?.length > 1 && (
                        <div className="flex gap-5 justify-end mt-5 text-[var(--primarycolor)] font-semibold">
                          <button
                            className={`flex gap-2 items-center ${page === 1 && "text-gray-300"
                              }`}
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                          >
                            <MdKeyboardArrowLeft className="text-2xl" />
                            Previous
                          </button>
                          <div>
                            {pages.map((p) => (
                              <button
                                key={p}
                                className={`mx-1 w-7 h-7 rounded-full border border-[var(--primarycolor)]  ${page === p
                                  ? "bg-[var(--primarycolor)] text-white"
                                  : "bg-white"
                                  }`}
                                onClick={() => setPage(p)}
                              >
                                {p}
                              </button>
                            ))}
                          </div>

                          <button
                            className={`flex gap-2 items-center ${page === pages[pages.length - 1] &&
                              "text-gray-300"
                              }`}
                            onClick={() => setPage(page + 1)}
                            disabled={page === pages[pages.length - 1]}
                          >
                            Next <MdKeyboardArrowRight className="text-2xl" />
                          </button>
                        </div>
                      )}
                    </VStack>
                  ) : (
                    <div className="p-5 text-xl font-semibold text-center">
                      You haven&apos;t post any job yet!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <VStack gap={"5"} w="100%" height={"max-content"}>
              <Button
                colorScheme="primary"
                w={"100%"}
                fontSize={"1.5rem"}
                padding={"30px 0"}
                textTransform={"capitalize"}
                onClick={() => {
                  router.push("/create-job");
                }}
              >
                Post a new job
              </Button>
              <div className=" w-full border border-[var(--bordersecondary)] bg-white rounded-md p-4 h-full">
                <h4 className=" text-[18px] mb-4 font-bold">
                  Tips For Getting Started
                </h4>
                <div className=" my-6">
                  <Progress value={60} colorScheme="primary" size={"sm"} />
                </div>
                <div className=" flex items-center border border-[var(--bordersecondary)] rounded-md py-2 px-4 mb-4">
                  <div className="w-[42px] h-[42px] bg-[#F0FDF4] rounded-lg">
                    <img
                      src="images/dashboard/zeework_proposals.png"
                      alt="proposals"
                      className="w-[42px] "
                    />
                  </div>
                  <p
                    className="ml-3 cursor-pointer"
                    onClick={() => {
                      router.push("/setting/billing-payments");
                    }}
                  >
                    Add Your Billing Method
                  </p>
                </div>
                <div className=" flex items-center border border-[var(--bordersecondary)] rounded-md py-2 px-4 mb-4">
                  <div className="w-[42px] h-[42px] bg-[#F0FDF4] rounded-lg">
                    <img
                      src="images/dashboard/zeework_proposals.png"
                      alt="proposals"
                    />
                  </div>
                  <p
                    className="ml-3 cursor-pointer"
                    onClick={() => {
                      router.push("/create-job");
                    }}
                  >
                    Post Your First Job
                  </p>
                </div>
                <div className=" flex items-center border border-[var(--bordersecondary)] rounded-md py-2 px-4 mb-4">
                  <div className="w-[42px] h-[42px] bg-[#F0FDF4] rounded-lg">
                    <img
                      src="images/dashboard/zeework_proposals.png"
                      alt="proposals"
                    />
                  </div>
                  <p
                    className="ml-3 cursor-pointer"
                    onClick={() => {
                      router.push("/setting/billing-payments");
                    }}
                  >
                    Invite Talent To Apply
                  </p>
                </div>
                <div className=" flex items-center border border-[var(--bordersecondary)] rounded-md py-2 px-4 mb-4">
                  <div className="w-[42px] h-[42px] bg-[#F0FDF4] rounded-lg">
                    <img
                      src="images/dashboard/zeework_proposals.png"
                      alt="proposals"
                    />
                  </div>
                  <p className="ml-3">Review Proposals</p>
                </div>
                <div className=" flex items-center border border-[var(--bordersecondary)] rounded-md py-2 px-4 mb-4">
                  <div className="w-[42px] h-[42px] bg-[#F0FDF4] rounded-lg">
                    <img
                      src="images/dashboard/zeework_proposals.png"
                      alt="proposals"
                    />
                  </div>
                  <p className="ml-3">Hire Your Perfect Freelancer</p>
                </div>
              </div>
            </VStack>
          </div>
        </div>
        <div className="lg:hidden">
          <div className="border border-[var(--bordersecondary)] mt-4 rounded-md overflow-hidden">
            <div className="flex justify-between border-b border-[var(--bordersecondary)] bg-white p-4">
              <div className=" text-2xl font-medium text-[#374151]">
                Latest Offers
              </div>
            </div>
            <div className="bg-white text-center py-4">
              <div>
                <LatestOffers />
              </div>
            </div>
          </div>
          <div className="my-6 border border-[var(--bordersecondary)]  rounded-md w-full bg-white overflow-hidden">
            <div className=" flex items-center justify-between border-b border-[var(--bordersecondary)] p-4 ">
              <div
                id="jobPostingsDiv"
                className=" text-2xl font-medium text-[#374151]"
              >
                Your Job Postings
              </div>
            </div>
            <div className="w-full">
              {isLoading ? (
                [1, 2].map((item) => (
                  <div key={item} className="px-5">
                    <HorizontalCardSkeleton />
                  </div>
                ))
              ) : jobs?.length ? (
                <VStack
                  divider={
                    <StackDivider borderColor="var(--bordersecondary)" />
                  }
                  spacing={8}
                  align="stretch"
                  bgColor={"white"}
                  padding={5}
                >
                  {visibleJobs
                    ?.slice()
                    ?.reverse()
                    .map((job, index) => {
                      const formattedDate = formatDistanceToNow(
                        new Date(job?.created_at),
                        { addSuffix: true }
                      );
                      return (
                        <div
                          className="flex items-center justify-between w-full max-[480px]:flex-col"
                          key={index}
                        >
                          <VStack
                            alignItems={"start"}
                            justifyContent={"center"}
                            cursor={"pointer"}
                            onClick={() => {
                              router(`/client-jobDetails/${job?._id}`, {
                                state: { jobDetails: job },
                              });
                            }}
                          >
                            <h5 className="text-lg text-[#374151] font-medium capitalize">
                              {job?.title}
                            </h5>
                            <div className="text-sm text-[#6B7280]">
                              <div className="mb-1 text-[#6B7280] capitalize">
                                Public - {job?.job_type}
                              </div>
                              <div>Posted {formattedDate} ago by you</div>
                            </div>
                          </VStack>

                          <VStack
                            width={"200px"}
                            justifyContent={"space-between"}
                            alignItems={"end"}
                            className="max-[480px]:!items-center"
                          >
                            <HStack>
                              <div className=" text-[#6B7280] font-bold text-base">
                                {job?.proposal_details?.length === 0
                                  ? "No"
                                  : job?.proposal_details?.length}{" "}
                                New
                              </div>
                              <div className=" text-[#6B7280] text-base font-bold"></div>
                            </HStack>
                            <Button
                              colorScheme="22C35E"
                              color={"#000"}
                              border={"1px solid #22C35E"}
                              size="sm"
                              fontSize={"sm"}
                              w={"10rem"}
                              textTransform={"capitalize"}
                              transition={"0.3s ease-in-out"}
                              _hover={{
                                bg: "#22C35E",
                                color: "#fff",
                              }}
                              onClick={() => {
                                router(`/client-jobDetails/${job._id}`, {
                                  state: { jobDetails: job },
                                });
                              }}
                            >
                              Go to job post
                            </Button>
                            <Button
                              colorScheme="22C35E"
                              color={"#000"}
                              border={"1px solid #22C35E"}
                              size="sm"
                              fontSize={"sm"}
                              w={"10rem"}
                              textTransform={"capitalize"}
                              transition={"0.3s ease-in-out"}
                              _hover={{
                                bg: "#22C35E",
                                color: "#fff",
                              }}
                              onClick={() => {
                                router(`/client-jobDetails/${job._id}`, {
                                  state: { jobDetails: job },
                                });
                              }}
                            >
                              Find Applicants
                            </Button>
                          </VStack>
                        </div>
                      );
                    })}

                  {/* Pagination */}
                  {pages?.length > 1 && (
                    <div className="flex gap-5 justify-end mt-5 text-[var(--primarycolor)] font-semibold">
                      <button
                        className={`flex gap-2 items-center ${page === 1 && "text-gray-300"
                          }`}
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                      >
                        <MdKeyboardArrowLeft className="text-2xl" />
                        Previous
                      </button>
                      <div>
                        {pages.map((p) => (
                          <button
                            key={p}
                            className={`mx-1 w-7 h-7 rounded-full border border-[var(--primarycolor)]  ${page === p
                              ? "bg-[var(--primarycolor)] text-white"
                              : "bg-white"
                              }`}
                            onClick={() => setPage(p)}
                          >
                            {p}
                          </button>
                        ))}
                      </div>

                      <button
                        className={`flex gap-2 items-center ${page === pages[pages.length - 1] && "text-gray-300"
                          }`}
                        onClick={() => setPage(page + 1)}
                        disabled={page === pages[pages.length - 1]}
                      >
                        Next <MdKeyboardArrowRight className="text-2xl" />
                      </button>
                    </div>
                  )}
                </VStack>
              ) : (
                <div className="p-5 text-xl font-semibold text-center">
                  You haven&apos;t post any job yet!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboardComponent;
