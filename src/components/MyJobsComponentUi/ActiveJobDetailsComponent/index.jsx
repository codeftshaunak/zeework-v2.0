import React, { useContext, useEffect, useState } from "react";
import { Avatar, Badge, Box, Button, Flex, Text } from "@chakra-ui/react";
import {
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { offerDetails } from "../../../helpers/APIs/freelancerApis";
import { useToast } from "@chakra-ui/react";
import { useRouter } from 'next/router';
import { JobDetailsSection } from "../../Invitation/JobDetails";
import StarRatings from "react-star-ratings";
import InvitationSkeleton from "../../Skeletons/InvitationSkeleton";
import { FaLocationDot } from "react-icons/fa6";
import UniversalModal from "../../Modals/UniversalModal";
import { useForm } from "react-hook-form";
import BtnSpinner from "../../Skeletons/BtnSpinner";
import { submitTask } from "../../../helpers/APIs/jobApis";
import { SocketContext } from "../../../Contexts/SocketContext";
import { LuMessagesSquare, LuView } from "react-icons/lu";
import Timesheet from "../../Reports/Timesheet";
import DataNotAvailable from "../../DataNotAvailable/DataNotAvailable";
import { getTaskDetails } from "../../../helpers/APIs/userApis";
import { useDispatch } from "react-redux";
import { setMyJobsData } from "../../../redux/pagesSlice/pagesSlice";

const ClientInfo = ({ clientDetails }) => (
  <Flex>
    <Avatar
      src={
        clientDetails.profile_image !== null
          ? clientDetails.profile_image
          : clientDetails.firstName
      }
      name={
        clientDetails.profile_image !== "null"
          ? clientDetails.profile_image
          : clientDetails.firstName
      }
    />
    <Box ml="3">
      <Text fontWeight="bold">
        {clientDetails.firstName} {clientDetails.lastName}
        <Badge ml="1" colorScheme="green">
          New
        </Badge>
      </Text>
      <Text fontSize="sm">{clientDetails.location}</Text>
    </Box>
  </Flex>
);

// const OptionsPopover = ({ setOpenModal }) => (
//   <Popover>
//     <PopoverTrigger>
//       <Button>
//         <BsThreeDots className="text-green-500 text-[1.5rem]" />
//       </Button>
//     </PopoverTrigger>
//     <PopoverContent>
//       <PopoverArrow />
//       <PopoverBody padding="4">
//         <div className="flex flex-col gap-3">
//           <button
//             className="flex items-center font-400 gap-2 text-[1.2rem]"
//             onClick={() => setOpenModal(true)}
//           >
//             <MdCancel className="text-[1.5rem]" /> End contract
//           </button>
//         </div>
//       </PopoverBody>
//     </PopoverContent>
//   </Popover>
// );

// const MilestoneStepper = ({ jobDetails }) => {
//   const [openModal, setOpenModal] = useState(false);
//   const location = useLocation();
//   const jobState = location.state;
//   const toast = useToast();
//   const router = useRouter();

//   const [loadingSubmit, setLoadingSubmit] = useState(false);

//   const handleSubmit = async (data) => {
//     setLoadingSubmit(true);
//     try {
//       const formData = new FormData();
//       formData.append("job_id", jobState.job_id);
//       formData.append("client_id", jobState.client_id);
//       formData.append("message", data.messages);
//       if (data.file) {
//         formData.append("file", data.file);
//       }
//       const { code, msg } = await workSubmit(formData);
//       if (code == 200) {
//         toast({
//           title: msg,
//           duration: "3000",
//           status: "success",
//           position: "top-right",
//         });
//         router(`/submit-review/${jobState.job_id}`);
//       } else {
//         toast({
//           title: msg,
//           status: "warning",
//           position: "top-right",
//         });
//       }
//       setLoadingSubmit(false);
//     } catch (error) {
//       setLoadingSubmit(false);
//     }
//     setLoadingSubmit(false);
//   };

//   const acceptInvite = (data) => handleSubmit(data);

//   return (
//     <Stepper orientation="vertical" height="340px" colorScheme="green" gap="0">
//       <Step>
//         <StepIndicator borderColor="var(--primarytextcolor)">
//           <StepStatus
//             borderColor="var(--primarytextcolor)"
//             active={<StepNumber />}
//           />
//         </StepIndicator>
//         <Box flexShrink="0">
//           <StepTitle>
//             <h1 className="text-[1.4rem] mx-2 font-500">{jobDetails.title}</h1>
//           </StepTitle>
//           <StepDescription>
//             <div className="flex items-center gap-x-4 my-2">
//               <h1 className="font-bold text-[1.6rem]">${jobDetails.amount}</h1>
//               <Text
//                 borderColor="var(--primarytextcolor)"
//                 color="var(--primarytextcolor)"
//                 className="border-2 px-3 py-1 text-[1.2rem] rounded-full"
//               >
//                 Active & funded
//               </Text>
//             </div>
//             <div>
//               <h1 className="flex gap-x-2 items-center text-[1.2rem]">
//                 <FaCalendarAlt className="text-[1.5rem]" /> Due Dec 1
//               </h1>
//               <Button
//                 className="my-6 font-semibold text-[1rem] rounded-full px-8 py-2 cursor-pointer"
//                 backgroundColor={"var(--primarytextcolor)"}
//                 borderRadius={"25px"}
//                 color={"var(--secondarycolor)"}
//                 onClick={() => setOpenModal(true)}
//                 _hover={{
//                   color: "black",
//                   backgroundColor: "var(--primarysoftbg)",
//                 }}
//               >
//                 Submit Work
//               </Button>
//             </div>
//           </StepDescription>
//         </Box>

//         {openModal && (
//           <SubmitModal
//             setOpenModal={setOpenModal}
//             acceptInvite={acceptInvite}
//             jobDetails={jobDetails}
//             loadingSubmit={loadingSubmit}
//             setLoadingSubmit={setLoadingSubmit}
//           />
//         )}

//         <StepSeparator />
//       </Step>
//       <Step>
//         <StepIndicator className="bg-green-500">
//           <StepStatus active={<FaPlus className="text-white" />} />
//         </StepIndicator>
//         <Box flexShrink="0">
//           <StepTitle>
//             <Text
//               className="text-[1rem] mx-2 font-500"
//               color={"var(--primarytext)"}
//             >
//               Propose new milestone
//             </Text>
//           </StepTitle>
//           <StepDescription>
//             <Button
//               className="my-6 font-semibold text-[1rem] rounded-full px-8 py-2 cursor-pointer"
//               backgroundColor={"var(--primarytextcolor)"}
//               borderRadius={"25px"}
//               color={"var(--secondarycolor)"}
//               _hover={{
//                 color: "black",
//                 backgroundColor: "var(--primarysoftbg)",
//               }}
//             >
//               Manage Milestone
//             </Button>
//           </StepDescription>
//         </Box>
//       </Step>
//     </Stepper>
//   );
// };

// const EarningsDetails = ({ jobDetails }) => (
//   <div className="border h-[60%] rounded-xl md:px-[2rem] md:py-[2.2rem] w-[40%] shadow-md">
//     <div>
//       <h1 className="text-[1.6rem] font-bold mb-[1.2rem]">Earnings</h1>
//     </div>
//     <div>
//       <div className="my-[1.5rem]">
//         <Progress
//           hasStripe
//           value={100}
//           colorScheme="green"
//           className="rounded-lg"
//         />
//       </div>
//       <div className="flex flex-col gap-4">
//         <div className="flex justify-between">
//           <div className="flex items-center gap-2 text-[1.2rem]">
//             <div className="bg-[black] w-[1.3rem] h-[1.3rem] rounded-full"></div>
//             Received
//           </div>
//           <h1 className="font-bold text-[1.2rem]">$0.00</h1>
//         </div>
//         <div className="flex justify-between">
//           <div className="flex items-center gap-2 text-[1.2rem]">
//             <div className="bg-[green] w-[1.3rem] h-[1.3rem] rounded-full"></div>
//             Funded (Escrow Protection)
//           </div>
//           <h1 className="font-bold text-[1.2rem]">${jobDetails.amount}</h1>
//         </div>
//         <div className="flex justify-between">
//           <div className="flex items-center gap-2 text-[1.2rem]">
//             <div className="bg-[#bfbfbf] w-[1.3rem] h-[1.3rem] rounded-full"></div>
//             Project Price
//           </div>
//           <h1 className="font-bold text-[1.2rem]">${jobDetails.amount}</h1>
//         </div>
//       </div>
//     </div>
//   </div>
// );

const ActiveJobDetailsComponent = () => {
  const { socket } = useContext(SocketContext);
  const [jobDetails, setJobDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isSubmitTask, setIsSubmitTask] = useState(false);
  const [viewSubmittedTask, setViewSubmittedTask] = useState(false);
  const [taskDetails, setTaskDetails] = useState({});

  const dispatch = useDispatch();

  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const clientDetails = jobDetails?.client_details?.[0];
  const { id } = useParams();
  const router = useRouter();


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

  const getTaskDetail = async () => {
    try {
      const response = await getTaskDetails(id);
      setTaskDetails(response.body);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInvitationDetails();
    getTaskDetail();
  }, []);

  const handleSubmitTask = async (data) => {
    setIsSubmitLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", data.file[0]);
      formData.append("message", data.message);
      formData.append("client_id", jobDetails.client_id);
      formData.append("job_id", jobDetails.job_id);
      formData.append("contract_ref", jobDetails._id);

      const { code, msg } = await submitTask(formData);
      toast({
        title: msg,
        status: code === 200 ? "success" : "warning",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
      if (code === 200) {
        if (socket) {
          socket.emit(
            "card_message",
            {
              sender_id: jobDetails.freelancer_id,
              receiver_id: jobDetails.client_id,
              message: data?.message,
              // message_type: "offer",
              contract_ref: jobDetails._id,
            },
            {
              job_id: jobDetails.job_id,
              title: jobDetails.job_title,
              job_offer_id: jobDetails._id,
              type: "Job Task Submitted",
              job_type: jobDetails.job_type,
              amount: jobDetails.hourly_rate || jobDetails.budget,
              url: {
                freelancer: `/active-job/submit/${jobDetails._id}`,
                client: `/contract/${jobDetails._id}`,
              },
            }
          );
        }

        dispatch(setMyJobsData({ userJobs: {} }));
        router.push("/my-jobs");
      }
    } catch (error) {
      console.error(error);
    }
    setIsSubmitLoading(false);
    setIsSubmitTask(false);
  };

  const dataAvailable = jobDetails && clientDetails;

  const getFileType = (fileUrl) => {
    const extension = fileUrl.split(".").pop().toLowerCase();
    switch (extension) {
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return "image";
      case "pdf":
        return "pdf";
      case "yaml":
        return "yaml";
      case "zip":
        return "zip";
      default:
        return "unknown";
    }
  };

  const renderFile = (fileDetails) => {
    if (!fileDetails || !fileDetails.file) return null;

    const fileType = getFileType(fileDetails.file);

    switch (fileType) {
      case "image":
        return <img src={fileDetails.file} alt="Image" />;
      case "pdf":
        return (
          <iframe
            src={fileDetails.file}
            width="100%"
            height="600px"
            className="text-sm text-blue-500 font-semibold border px-2 py-1 rounded w-full"
            title="PDF Viewer"
          ></iframe>
        );
      case "yaml":
        return (
          <a
            href={fileDetails.file}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-500 font-semibold border px-2 py-1 rounded"
          >
            View YAML
          </a>
        );
      case "zip":
        return (
          <a
            href={fileDetails.file}
            download
            className="text-sm text-blue-500 font-semibold border px-2 py-1 rounded"
          >
            Download ZIP
          </a>
        );
      default:
        return (
          <a
            href={fileDetails.file}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-500 font-semibold border px-2 py-1 rounded"
          >
            Download File
          </a>
        );
    }
  };

  return (
    <div className="w-full py-5">
      {/* <div className="flex justify-between gap-4">
        <div>
          <ClientInfo clientDetails={clientDetails} />
        </div>

        <div>
          <OptionsPopover setOpenModal={setOpenModal} />
        </div>
      </div> */}

      <div className="top-profile-section">
        <div className="my-4">
          <h2 className="my-3 text-2xl font-bold text-[1.6rem] text-[#374151]">
            Contract Details
          </h2>
        </div>

        <div className="">
          <Tabs position="relative" variant="unstyled">
            <TabList>
              <Tab className="font-semibold text-[1.5rem]">Overview</Tab>
              {/* <Tab className="font-semibold text-[1.5rem]">Details</Tab> */}
            </TabList>
            <TabIndicator
              mt="1.5px"
              height="2px"
              bg="var(--primarytextcolor)"
              borderRadius="1px"
            />
            <TabPanels>
              <TabPanel paddingX={0}>
                {isLoading ? (
                  <InvitationSkeleton />
                ) : dataAvailable ? (
                  <div>
                    <div className="grid lg:grid-cols-3 gap-5">
                      <JobDetailsSection jobDetails={jobDetails} />
                      <div className="lg:col-span-1 w-full h-fit bg-white p-5 sm:p-8 rounded-xl border border-[var(--bordersecondary)]">
                        <div className="flex gap-3 mb-4">
                          <Avatar
                            size={"lg"}
                            name={
                              clientDetails?.firstName +
                              " " +
                              clientDetails?.lastName
                            }
                          />{" "}
                          <div>
                            <p className="text-sm lg:text-xl font-semibold">
                              {clientDetails?.firstName +
                                " " +
                                clientDetails?.lastName}
                            </p>{" "}
                            <div className="flex items-center flex-wrap">
                              <StarRatings
                                rating={clientDetails?.avg_review}
                                starDimension="14px"
                                starSpacing="1px"
                                starRatedColor="#22C35E"
                                starEmptyColor="#8ab89b"
                              />
                              <p className="text-sm">
                                ({clientDetails?.avg_review}) Reviews
                              </p>
                            </div>
                            <p className="flex items-center gap-1">
                              <FaLocationDot />
                              {clientDetails?.location}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="sm:text-lg font-semibold">
                            Contract Title:
                          </p>
                          <p className="sm:text-lg capitalize">
                            {jobDetails?.contract_title}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 mt-5">
                          <p className="sm:text-lg font-semibold">
                            Job Status:
                          </p>
                          <p className="border border-green-500 px-3 capitalize rounded-full bg-green-50 w-fit font-semibold">
                            {jobDetails?.status?.replace(/_/g, " ")}
                          </p>
                        </div>

                        <Button
                          mt={10}
                          mb={3}
                          width={"full"}
                          border={"1px"}
                          borderColor={"green.200"}
                          leftIcon={<LuMessagesSquare />}
                          onClick={() =>
                            router(
                              `/message/${jobDetails.client_id}?contract_ref=${jobDetails._id}`
                            )
                          }
                        >
                          Message
                        </Button>
                        {/* for freelancer */}
                        {jobDetails?.offer_to === "freelancer" && (
                          <>
                            {jobDetails?.status === "completed" ? (
                              <Button
                                width={"full"}
                                border={"1px"}
                                borderColor={"yellow.200"}
                              >
                                Job Already Completed
                              </Button>
                            ) : (
                              <>
                                {jobDetails?.job_type === "fixed" &&
                                  jobDetails?.status === "task_submited" ? (
                                  <Button
                                    width={"full"}
                                    border={"1px"}
                                    colorScheme="primary"
                                    variant={"outline"}
                                    onClick={() => setViewSubmittedTask(true)}
                                    leftIcon={<LuView />}
                                  >
                                    View Submission
                                  </Button>
                                ) : (
                                  <Button
                                    width={"full"}
                                    border={"1px"}
                                    colorScheme="primary"
                                    isDisabled={
                                      jobDetails?.status === "task_submited"
                                    }
                                    onClick={() => {
                                      reset();
                                      setIsSubmitTask(true);
                                    }}
                                  >
                                    Submit Work
                                  </Button>
                                )}
                              </>
                            )}
                          </>
                        )}

                        {/* for agency */}
                        {jobDetails?.offer_to === "agency" &&
                          (jobDetails?.status === "completed" ? (
                            <Button
                              width={"full"}
                              border={"1px"}
                              borderColor={"yellow.200"}
                            >
                              Job Already Completed
                            </Button>
                          ) : (
                            <>
                              <Button
                                colorScheme="primary"
                                width={"full"}
                                onClick={() =>
                                  router(`/contract-assign/${jobDetails._id}`)
                                }
                              >
                                Assign contract to agency member
                              </Button>
                            </>
                          ))}
                      </div>
                    </div>
                    <div>
                      {jobDetails?.job_type === "hourly" && (
                        <Timesheet activeJobs={[jobDetails]} />
                      )}
                    </div>
                  </div>
                ) : (
                  <DataNotAvailable onRefresh={getInvitationDetails} />
                )}
              </TabPanel>
              {/* <TabPanel>
                <div>
                  <div className="flex mt-[1.2rem] gap-4 justify-between">
                    <div className="border rounded-xl md:px-[2rem] md:py-[2.2rem] w-[60%] shadow-md">
                      <div>
                        <h1 className="text-[1.6rem] font-bold mb-[1.2rem]">
                          Details
                        </h1>
                      </div>
                      <MilestoneStepper
                        jobDetails={jobDetails}
                        job_id={job_id}
                        client_id={client_id}
                      />
                    </div>
                    <EarningsDetails jobDetails={jobDetails} />
                  </div>
                </div>
              </TabPanel> */}
            </TabPanels>
          </Tabs>
        </div>
      </div>

      {/* Submit Completed Task */}
      {isSubmitTask && (
        <UniversalModal
          isModal={isSubmitTask}
          setIsModal={setIsSubmitTask}
          title={"Send completed task"}
        >
          <form onSubmit={handleSubmit(handleSubmitTask)}>
            <div className="grid gap-5">
              <div className="w-full grid gap-3">
                <label
                  htmlFor="file"
                  className="block font-medium text-gray-700"
                >
                  Upload File:
                </label>
                <input
                  type="file"
                  id="file"
                  {...register("file", {
                    required: "Task file is required",
                  })}
                  className="p-2 border rounded"
                />
                {errors.file && (
                  <span className="text-red-500 text-sm -mt-3">
                    {errors.file.message}
                  </span>
                )}
              </div>
              <div className="w-full grid gap-3">
                <label
                  htmlFor="message"
                  className="block font-medium text-gray-700"
                >
                  Task Description:
                </label>
                <textarea
                  id="message"
                  {...register("message", {
                    required: "Submission message is required",
                  })}
                  placeholder="Description.."
                  className="p-2 border rounded"
                ></textarea>
                {errors.message && (
                  <span className="text-red-500 text-sm -mt-3">
                    {errors.message.message}
                  </span>
                )}
              </div>
            </div>
            <div className="text-right mt-10">
              <Button
                isLoading={isSubmitLoading}
                loadingText="Submitting"
                colorScheme="primary"
                type="submit"
                spinner={<BtnSpinner />}
              >
                Submit
              </Button>
            </div>
          </form>
        </UniversalModal>
      )}

      {/* Task Respond Methods */}
      {viewSubmittedTask && (
        <UniversalModal
          isModal={viewSubmittedTask}
          setIsModal={setViewSubmittedTask}
          title={"Submitted Task"}
        >
          <div className="flex flex-col gap-2 items-start">
            <div className="text-md">
              <span className="font-semibold">Description:</span>{" "}
              {taskDetails.message}
            </div>
            <div className="text-md w-full">
              <span className="font-semibold">Attachment:</span>{" "}
              {renderFile(taskDetails)}
            </div>
          </div>
        </UniversalModal>
      )}
    </div>
  );
};

export default ActiveJobDetailsComponent;
