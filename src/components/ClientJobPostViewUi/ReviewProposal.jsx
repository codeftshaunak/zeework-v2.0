import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Stack,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  TabIndicator,
  Avatar,
  StackDivider,
} from "@chakra-ui/react";
import { useLocation, userouter } from "react-router-dom";
import { useContext, useState } from "react";
import UniversalModal from "../Modals/UniversalModal";
import { getAgencyById } from "../../helpers/APIs/agencyApis";
import ReviewProposalSkeleton from "../Skeletons/ReviewProposalSkeleton";
import BtnSpinner from "../Skeletons/BtnSpinner";
import { CurrentUserContext } from "../../Contexts/CurrentUser";
import { MdPayment } from "react-icons/md";
import { getFreelancerById } from "../../helpers/APIs/freelancerApis";
import { FaLocationDot } from "react-icons/fa6";
import { FaDollarSign } from "react-icons/fa6";
import { useForm } from "react-hook-form";

export const ReviewProposal = ({ proposals, isProposalsLoading }) => {
  const { profile } = useContext(CurrentUserContext);
  const [paymentModal, setPaymentModal] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const location = useLocation();
  const jobDetails = location.state && location.state.jobDetails;
  const [open, setOpen] = useState(false);
  const [msgIsOpen, setMsgIsOpen] = useState(null);
  const [hireProfile, setHireProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleSend = async () => {
    const { user_id, applied_by } = hireProfile;
    setIsLoading(true);
    try {
      const { body, code } =
        applied_by === "freelancer"
          ? await getFreelancerById(user_id)
          : await getAgencyById(user_id);

      if (code === 200) {
        const {
          firstName,
          lastName,
          professional_role,
          profile_image,
          hourly_rate,
          agency_name,
          agency_profileImage,
          agency_hourlyRate,
          user_id,
          _id,
        } = body;

        router(`/client/hire/${user_id}`, {
          state: {
            freelancerInfo: {
              firstName,
              lastName,
              professional_role,
              profile_image,
              hourly_rate,
              agency_name,
              agency_profileImage,
              agency_hourlyRate,
              agency_id: applied_by === "agency_member" ? _id : null,
              user_id: applied_by === "freelancer" ? user_id : null,
              applied_by,
            },
            jobDetails,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
    setOpen(false);
    setHireProfile(null);
  };

  // send interview request
  const handleInterviewRequest = async (data) => {
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    setMsgIsOpen(false);
    reset();
  };

  const handleHireReq = (item) => {
    // check client payment status
    setPaymentModal(!profile?.profile?.payment_verified);
    if (profile?.profile?.payment_verified) setHireProfile(item), setOpen(true);
  };

  return (
    <>
      <Box className="flex flex-col gap-8 md:flex-row w-full">
        <Box className="overflow-hidden border rounded-lg basis-full bg-white">
          <Tabs onChange={(index) => setTabIndex(index)} variant="unstyled">
            <TabList className="px-6 pt-4 border-b">
              <Tab className="px-0 text-black">All Proposals</Tab>
              {/* <Tab>Messaged</Tab> */}
            </TabList>
            <TabIndicator
              height="2px"
              borderRadius="1px"
              color={"#000"}
              className=" bg-fg-brand"
            />
            <TabPanels width={"100%"}>
              <TabPanel p={0} width={"100%"}>
                {isProposalsLoading ? (
                  <Box padding={3}>
                    <ReviewProposalSkeleton />
                  </Box>
                ) : proposals?.length ? (
                  <VStack
                    divider={<StackDivider borderColor="gray.200" />}
                    spacing={4}
                    align="stretch"
                    bgColor={"#fafafa"}
                    padding={8}
                  >
                    {proposals?.map((item, index) => {
                      const details = item.user_details;

                      return (
                        <VStack
                          key={index}
                          className="h-auto w-full shadow-md p-6 rounded-md"
                          justifyContent={"start"}
                          bgColor={"#ffff"}
                          width={"100%"}
                        >
                          <VStack width={"95%"}>
                            <HStack
                              justifyContent={"space-between"}
                              width={"100%"}
                              alignItems={"start"}
                            >
                              <Box>
                                <Avatar
                                  cursor={"pointer"}
                                  size={"lg"}
                                  name={
                                    details?.agency_name
                                      ? details.agency_name
                                      : details?.firstName +
                                      " " +
                                      details?.lastName
                                  }
                                  src={
                                    details?.profile_image
                                      ? details?.profile_image
                                      : details?.agency_profileImage
                                  }
                                  onClick={() =>
                                    router(
                                      item.applied_by === "agency_member"
                                        ? `/agency/${item?.user_id}`
                                        : `/freelancer/${item?.user_id}`
                                    )
                                  }
                                />

                                <Box className="w-full space-y-3">
                                  <Box>
                                    <Text
                                      className="font-semibold text-primary w-fit border-b border-transparent border-spacing-0 hover:border-primary"
                                      cursor={"pointer"}
                                      onClick={() =>
                                        router(
                                          item?.applied_by === "agency_member"
                                            ? `/agency/${item?.user_id}`
                                            : `/freelancer/${item?.user_id}`
                                        )
                                      }
                                    >
                                      {details?.agency_name
                                        ? details.agency_name
                                        : details?.firstName +
                                        " " +
                                        details?.lastName}
                                    </Text>
                                    <Text className="text-sm font-medium text-[#6B7280]">
                                      {details?.agency_name
                                        ? details?.agency_tagline
                                        : details?.professional_role}
                                    </Text>
                                  </Box>
                                  <Box>
                                    <HStack spacing={4} align="center">
                                      <Button
                                        size="sm"
                                        colorScheme="primary"
                                        variant="outline"
                                        onClick={() => setMsgIsOpen(true)}
                                        paddingX={5}
                                      >
                                        Invite For Interview
                                      </Button>
                                      <Button
                                        size="sm"
                                        colorScheme="primary"
                                        paddingX={5}
                                        onClick={() => handleHireReq(item)}
                                      >
                                        Hire
                                      </Button>
                                    </HStack>
                                  </Box>
                                </Box>
                              </Box>

                              <Box
                                display={"flex"}
                                justifyContent={"flex-end"}
                                alignItems={"flex-end"}
                                flexDirection={"column"}
                              >
                                {item?.applied_by === "agency_member" && (
                                  <Text className="text-white bg-gray-200 border border-green-100 px-3 rounded-full mb-2">
                                    AGENCY
                                  </Text>
                                )}
                                <HStack spacing={10}>
                                  <Text className="text-lg font-bold text-[#101010] flex items-center">
                                    <FaDollarSign /> {item?.desired_price}
                                  </Text>
                                  {/* <Text className="text-sm font-medium text-[#6B7280]">
                                    $3M+ earned
                                  </Text> */}
                                  {/* <Text className="text-sm font-medium text-[#6B7280] border-b-2 block border-fg-brand">
                                    100% job success
                                  </Text> */}
                                </HStack>
                                <Box>
                                  <Text className="text-md font-medium text-[#2a2a2a] flex items-center">
                                    <FaLocationDot className="text-gray-600" />{" "}
                                    {details?.location
                                      ? details?.location
                                      : details?.agency_officeLocation
                                        ?.country || "Not Found"}
                                  </Text>
                                </Box>
                              </Box>
                            </HStack>

                            <VStack
                              justifyContent={"start"}
                              width={"100%"}
                              alignItems={"start"}
                            >
                              <Box>
                                <Text className="text-[15px] font-bold mb-2 border-b">
                                  Cover letter
                                </Text>
                                <Text
                                  mt={1}
                                  className="mt-1 text-sm font-normal"
                                >
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: item?.cover_letter,
                                    }}
                                  />
                                </Text>
                              </Box>
                              <Stack direction="row" align="center">
                                {details?.skills?.map((skill) => (
                                  <Button
                                    key={skill}
                                    size="sm"
                                    color={"black"}
                                    border={
                                      "2px solid var(--primarytextcolor))"
                                    }
                                  >
                                    {skill}
                                  </Button>
                                ))}
                              </Stack>
                            </VStack>
                          </VStack>
                        </VStack>
                      );
                    })}
                  </VStack>
                ) : (
                  <Box padding={8}>
                    <Text>There is no proposals for this job!!!</Text>
                  </Box>
                )}
              </TabPanel>
              <TabPanel>
                <Text>Messaged!</Text>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>

      {/* Send Interview Request */}
      <UniversalModal
        isModal={msgIsOpen}
        setIsModal={setMsgIsOpen}
        title={"Enter your message"}
      >
        <form onSubmit={handleSubmit(handleInterviewRequest)}>
          <div className="">
            <div className="my-5">
              <textarea
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter your message..."
                rows="4"
                {...register("message", {
                  required: "Interview message is required",
                })}
              />
              {errors.message && (
                <p className="text-red-500 text-sm">{errors.message.message}</p>
              )}
            </div>
            <div className="flex justify-end mt-5">
              <Button
                onClick={() => setMsgIsOpen(false)}
                colorScheme="primary"
                variant={"outline"}
                marginRight={5}
              >
                Cancel
              </Button>
              <Button
                colorScheme="primary"
                loadingText="Send"
                spinner={<BtnSpinner />}
                type="submit"
              >
                Send
              </Button>
            </div>
          </div>
        </form>
      </UniversalModal>

      {/* Send Job Offer Request */}
      <UniversalModal
        isModal={open}
        setIsModal={setOpen}
        title={"Are you sure?"}
      >
        <div className="flex justify-end mt-5">
          <Button
            onClick={() => setOpen(false)}
            colorScheme="primary"
            variant={"outline"}
            marginRight={5}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleSend()}
            colorScheme="primary"
            isLoading={isLoading}
            loadingText="Sure"
            spinner={<BtnSpinner />}
          >
            Sure
          </Button>
        </div>
      </UniversalModal>

      {/* Notify Payment Status Before Hiring a Freelancer */}
      <UniversalModal isModal={paymentModal} setIsModal={setPaymentModal}>
        <div className="text-center w-full">
          <MdPayment className="text-6xl bg-green-100 text-green-500 p-2 rounded-full mx-auto" />
          <p className="text-xl sm:text-2xl font-semibold ">
            Add Payment Details Before Hiring
          </p>
        </div>

        <div className="flex gap-5 sm:gap-10 mt-8 sm:mt-20">
          <Button
            colorScheme="primary"
            variant={"outline"}
            width={"full"}
            onClick={() => setPaymentModal(false)}
          >
            Cancel
          </Button>
          <Button
            colorScheme="primary"
            width={"full"}
            onClick={() => router.push("/setting/billing-payments")}
          >
            Verify Now
          </Button>
        </div>
      </UniversalModal>
    </>
  );
};
