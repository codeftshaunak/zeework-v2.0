import { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Button,
  HStack,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import {
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { userouter, useParams } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import ConfirmModal from "../ConfirmationModal/ConfirmModal";
import InvitationSkeleton from "../Skeletons/InvitationSkeleton";
import { JobDetailsSection } from "../Invitation/JobDetails";
import {
  getFreelancerById,
  offerDetails,
} from "../../helpers/APIs/freelancerApis";
import { getTaskDetails } from "../../helpers/APIs/userApis";
import Timesheet from "../Reports/Timesheet";
import { getAgencyById } from "../../helpers/APIs/agencyApis";
import UniversalModal from "../Modals/UniversalModal";
import { MainButtonRounded } from "../Button/MainButton";
import {
  endJobContract,
  taskApproveOrReject,
} from "../../helpers/APIs/jobApis";
import BtnSpinner from "../Skeletons/BtnSpinner";
import { useForm } from "react-hook-form";
import { SocketContext } from "../../Contexts/SocketContext";
import { LuMessagesSquare } from "react-icons/lu";
import DataNotAvailable from "../DataNotAvailable/DataNotAvailable";

const SingleContractDetails = () => {
  const [jobDetails, setJobDetails] = useState({});
  const [freelancerDetails, setFreelancerDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isApiLoading, setIsApiLoading] = useState(false);
  const { id } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [taskDetails, setTaskDetails] = useState([]);
  const { socket } = useContext(SocketContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();
  const toast = useToast();
  const router = useRouter();


  const getTaskDetail = async (offer_id) => {
    try {
      const response = await getTaskDetails(offer_id);
      setTaskDetails(response.body);
    } catch (error) {
      console.log(error);
    }
  };

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

  const {
    firstName,
    lastName,
    profile_image,
    location,
    agency_name,
    agency_profileImage,
    agency_location,
  } = freelancerDetails || {};

  const getInvitationDetails = async () => {
    try {
      const { body, code } = await offerDetails(id);
      if (code === 200) setJobDetails(body[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const getFreelancerDetails = async () => {
    if (!jobDetails?.freelancer_id) return;

    try {
      const { body, code } =
        jobDetails.offer_to === "freelancer"
          ? await getFreelancerById(jobDetails?.freelancer_id)
          : await getAgencyById(jobDetails?.freelancer_id);
      if (code === 200) {
        setFreelancerDetails(body);
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getInvitationDetails();
    getTaskDetail(id);
  }, [id]);

  useEffect(() => {
    getFreelancerDetails();
  }, [jobDetails]);

  const dataAvailable = freelancerDetails && jobDetails;

  const handleRefresh = () => {
    getInvitationDetails();
    getTaskDetail(id);
    getFreelancerDetails();
  };

  // handle contract task response
  const handleTaskApproveReject = async (data) => {
    setIsApiLoading(true);
    try {
      const { code, msg } = await taskApproveOrReject({
        action_type: data?.action_type,
        contract_ref: jobDetails._id,
      });

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
              sender_id: jobDetails.client_id,
              receiver_id: jobDetails.freelancer_id,
              message: data?.message || "Approved submitted job task!",
              // message_type: "offer",
              contract_ref: jobDetails._id,
            },
            {
              title: jobDetails.job_title,
              type:
                data?.action_type === "approved"
                  ? "Task Approved"
                  : "Task Rejected",
              job_type: jobDetails.job_type,
              amount: jobDetails.hourly_rate || jobDetails.budget,
              url: {
                freelancer: `/active-job/submit/${jobDetails._id}`,
                client: `/contract/${jobDetails._id}`,
              },
            }
          );
        }
        router.push("/my-stats");
      }
    } catch (error) {
      console.error(error);
    }
    setIsApiLoading(false);
    setReviewModal(false);
    setModalType(false);
  };

  // handle end contract
  const handleEndContract = async (data) => {
    setIsApiLoading(true);
    // let reqData;
    // if (jobDetails?.status === "task_submited") {
    //   reqData = {
    //     ...data,
    //     contract_ref: jobDetails._id,
    //   };
    // } else {
    //   reqData = {
    //     job_id: jobDetails?.job_id,
    //     user_id: jobDetails?.freelancer_id,
    //   };
    // }

    try {
      const { code, msg } = await endJobContract({
        ...data,
        contract_ref: jobDetails._id,
      });

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
              sender_id: jobDetails.client_id,
              receiver_id: jobDetails.freelancer_id,
              message:
                data?.refaund_reason || "Successfully end the job contract",
              // message_type: "offer",
              contract_ref: jobDetails._id,
            },
            {
              title: jobDetails.job_title,
              type: `${data.action_type} Job`,
              job_type: jobDetails.job_type,
              amount: jobDetails.hourly_rate || jobDetails.budget,
              url: {
                freelancer: `/active-job/submit/${jobDetails._id}`,
                client: `/contract/${jobDetails._id}`,
              },
            }
          );
        }

        router.push("/my-stats");
      }
    } catch (error) {
      console.error(error);
    }
    reset();
    setIsApiLoading(false);
    setOpenModal(false);
    setModalType("");
  };

  return (
    <div className="w-full py-5">
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
                    <div className="grid lg:grid-cols-3 gap-5 mt-3 sm:mt-5 lg:mt-10">
                      <div className="col-span-2">
                        <JobDetailsSection jobDetails={jobDetails} />
                      </div>
                      <div className="col-span-1 w-full h-fit bg-white p-8 rounded-xl border border-[var(--bordersecondary)]">
                        <div className="flex gap-3 mb-4">
                          <Avatar
                            size={"lg"}
                            src={
                              profile_image
                                ? profile_image
                                : agency_profileImage
                            }
                            name={
                              firstName
                                ? firstName + " " + lastName
                                : agency_name
                            }
                          />{" "}
                          <div>
                            <p className="text-2xl font-semibold">
                              {firstName
                                ? firstName + " " + lastName
                                : agency_name}
                            </p>{" "}
                            {/* <div className="flex items-center">
                            <StarRatings
                              rating={freelancerDetails?.avg_review}
                              starDimension="18px"
                              starSpacing="1px"
                              starRatedColor="#22C35E"
                              starEmptyColor="#8ab89b"
                            />{" "}
                            ({freelancerDetails?.avg_review}) Reviews
                          </div> */}
                            <p className="flex items-center gap-1">
                              <FaLocationDot />
                              {location ? location : agency_location?.name}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="text-lg font-semibold">
                            Contract Title:
                          </p>
                          <p className="text-lg capitalize">
                            {jobDetails?.contract_title}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 mt-5">
                          <p className="text-lg font-semibold">Job Status:</p>
                          <p className="border border-green-500 px-3 capitalize rounded-full bg-green-50 w-fit font-semibold">
                            {jobDetails?.status === "task_submited"
                              ? "Task Submited"
                              : jobDetails?.status}
                          </p>
                        </div>

                        {/* Send Message */}
                        <Button
                          mt={5}
                          width={"full"}
                          border={"1px"}
                          borderColor={"green.200"}
                          leftIcon={<LuMessagesSquare />}
                          onClick={() =>
                            router(
                              `/message/${jobDetails.freelancer_id}?contract_ref=${jobDetails._id}`
                            )
                          }
                        >
                          Message
                        </Button>

                        {/* Review Submitted Task */}
                        {jobDetails?.status === "task_submited" &&
                          jobDetails?.job_type !== "hourly" && (
                            <Button
                              mt={3}
                              width={"full"}
                              onClick={() => {
                                reset(),
                                  setModalType("review"),
                                  setReviewModal(true);
                              }}
                              border={"1px"}
                              borderColor={"green.200"}
                            >
                              Review Submitted Task
                            </Button>
                          )}

                        {/* Send Feedback */}
                        {jobDetails?.status === "completed" && (
                          <Button
                            mt={5}
                            width={"full"}
                            colorScheme="primary"
                            variant={"outline"}
                            onClick={() =>
                              router(`/submit-review/${jobDetails._id}`, {
                                state: {
                                  jobDetails: jobDetails,
                                  receiverDetails: freelancerDetails,
                                },
                              })
                            }
                            isDisabled={jobDetails?.client_review}
                          >
                            {jobDetails?.client_review
                              ? "Feedback Submitted"
                              : "Send Feedback"}
                          </Button>
                        )}

                        {/* End Job Contract */}
                        {jobDetails?.status !== "completed" && (
                          <Button
                            mt={3}
                            colorScheme="primary"
                            width={"full"}
                            onClick={() => {
                              reset(),
                                setModalType("endContract"),
                                setOpenModal(true);
                            }}
                            leftIcon={<IoMdClose />}
                            isDisabled={jobDetails?.status === "completed"}
                          >
                            {jobDetails?.status === "completed"
                              ? "Already Completed"
                              : "End Job Contract"}
                          </Button>
                        )}
                      </div>
                    </div>
                    {jobDetails?.job_type === "hourly" && (
                      <Timesheet activeJobs={[jobDetails]} />
                    )}
                  </div>
                ) : (
                  <DataNotAvailable onRefresh={handleRefresh} />
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

      {/* End Contract Methods */}
      {openModal && (
        // <ConfirmModal
        //   openModal={openModal}
        //   setOpenModal={setOpenModal}
        //   job_id={jobDetails?._id}
        //   receiverDetails={freelancerDetails}
        //   jobDetails={jobDetails}
        // />
        <UniversalModal isModal={openModal} setIsModal={setOpenModal}>
          <form onSubmit={handleSubmit(handleEndContract)}>
            {modalType === "endContract" && (
              <>
                <Image
                  src="/images/zeework_end_contract.png"
                  width={"200px"}
                  margin={"auto"}
                />
                <Text
                  textAlign={"center"}
                  fontSize={"1.4rem"}
                  margin={"1rem 0"}
                  fontWeight={"600"}
                >
                  Are you sure you want to end this contract?
                </Text>
                <div className="mt-6 mx-auto flex gap-5 w-full">
                  <MainButtonRounded
                    noRounded={true}
                    variant="outline"
                    isDisable={isApiLoading}
                    className={"w-full"}
                    onClick={() => setModalType("refundRequest")}
                  >
                    Ask For Refund
                  </MainButtonRounded>
                  <MainButtonRounded
                    type="submit"
                    noRounded={true}
                    isLoading={isApiLoading}
                    className={"w-full"}
                    onClick={() => setValue("action_type", "end_contract")}
                  >
                    End Contract & Pay Freelancer
                  </MainButtonRounded>
                </div>
              </>
            )}
            {modalType === "refundRequest" && (
              <>
                <div className="w-full grid gap-3">
                  <label
                    htmlFor="message"
                    className="block font-medium text-gray-700"
                  >
                    Refund Reason:
                  </label>
                  <textarea
                    id="message"
                    {...register("refaund_reason", {
                      required: "Refund reason is required",
                    })}
                    placeholder="Describe.."
                    className="p-2 border rounded"
                  ></textarea>
                  {errors.refaund_reason && (
                    <span className="text-red-500 text-sm -mt-3">
                      {errors.refaund_reason.message}
                    </span>
                  )}
                </div>
                <div className="mt-6 mx-auto flex gap-5 w-full">
                  <MainButtonRounded
                    noRounded={true}
                    variant="outline"
                    onClick={() => {
                      reset(), setModalType("endContract");
                    }}
                    isDisable={isApiLoading}
                    className={"w-full"}
                  >
                    Back
                  </MainButtonRounded>
                  <MainButtonRounded
                    type="submit"
                    noRounded={true}
                    isLoading={isApiLoading}
                    className={"w-full"}
                    onClick={() => setValue("action_type", "refund")}
                  >
                    Submit Refund Request
                  </MainButtonRounded>
                </div>
              </>
            )}
          </form>
        </UniversalModal>
      )}

      {/* Task Respond Methods */}
      {reviewModal && (
        <UniversalModal
          isModal={reviewModal}
          setIsModal={setReviewModal}
          title={"Review Task"}
        >
          <form onSubmit={handleSubmit(handleTaskApproveReject)}>
            {modalType === "review" && (
              <>
                {" "}
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
                <div className="mt-6 mx-auto flex gap-5 w-full">
                  <MainButtonRounded
                    noRounded={true}
                    type="submit"
                    onClick={() => setValue("action_type", "approved")}
                    isLoading={isApiLoading}
                    className={"w-full"}
                  >
                    Approve Task & End Contract
                  </MainButtonRounded>
                  <MainButtonRounded
                    noRounded={true}
                    variant="outline"
                    isDisable={isApiLoading}
                    className={"w-full"}
                    onClick={() => setModalType("requestToChange")}
                  >
                    Request Changes
                  </MainButtonRounded>
                </div>
              </>
            )}
            {modalType === "requestToChange" && (
              <>
                <div className="w-full grid gap-3">
                  <label
                    htmlFor="message"
                    className="block font-medium text-gray-700"
                  >
                    Messages:
                  </label>
                  <textarea
                    id="message"
                    {...register("message", {
                      required: "Refund reason is required",
                    })}
                    placeholder="Describe.."
                    className="p-2 border rounded"
                    required
                  ></textarea>
                  {errors.message && (
                    <span className="text-red-500 text-sm -mt-3">
                      {errors.message.message}
                    </span>
                  )}
                </div>
                <div className="mt-6 mx-auto flex gap-5 w-full">
                  <MainButtonRounded
                    noRounded={true}
                    variant="outline"
                    onClick={() => setModalType("review")}
                    isDisable={isApiLoading}
                    className={"w-full"}
                  >
                    Back
                  </MainButtonRounded>
                  <MainButtonRounded
                    noRounded={true}
                    isLoading={isApiLoading}
                    className={"w-full"}
                    type="submit"
                    onClick={() => setValue("action_type", "rejected")}
                  >
                    Request Changes
                  </MainButtonRounded>
                </div>
              </>
            )}
          </form>
        </UniversalModal>
      )}
    </div>
  );
};

export default SingleContractDetails;
