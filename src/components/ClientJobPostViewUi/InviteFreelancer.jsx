import {
  Button,
  Stack,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
  HStack,
  Avatar,
  VStack,
  StackDivider,
  Box,
  Input,
  Tooltip,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useLocation, userouter, useParams } from "react-router-dom";
import ReviewProposalSkeleton from "../Skeletons/ReviewProposalSkeleton";
import InvitedFreelancerCard from "./InvitedFreelancerCard";
import UniversalModal from "../Modals/UniversalModal";
import { getInvitedFreelancer } from "../../helpers/APIs/jobApis";
import BtnSpinner from "../Skeletons/BtnSpinner";
import { CurrentUserContext } from "../../Contexts/CurrentUser";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdPayment,
} from "react-icons/md";
import { getFreelancers } from "../../helpers/APIs/freelancerApis";
import { BiSearchAlt } from "react-icons/bi";
import { SocketContext } from "../../Contexts/SocketContext";
import { sendJobInvitation } from "../../helpers/APIs/clientApis";

const InviteFreelancer = ({ appliedUsers }) => {
  const { profile } = useContext(CurrentUserContext);
  const [paymentVerifiedModal, setPaymentVerifiedModal] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [invitedFreelancers, setInvitedFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoadingInvite, setIsLoadingInvite] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isHire, setIsHire] = useState(false);
  const [isUserId, setIsUserId] = useState("");
  const [freelancerInfo, setFreelancerInfo] = useState({});
  const [searchText, setSearchText] = useState("");
  const { socket } = useContext(SocketContext);
  const router = useRouter();

  const toast = useToast();
  const location = useLocation();
  const jobDetails = location.state && location?.state?.jobDetails;

  // pagination details
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(searchResults?.totalLength / 20);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  let params = useParams();
  let { id } = params;

  const fetchData = async () => {
    try {
      setLoading(true);
      const { body, code } = await getFreelancers(page, null, searchText);
      if (code === 200) {
        setSearchResults(body);
      } else {
        console.error("API Response body is undefined");
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const invitedFreelancer = async () => {
    try {
      setLoading(true);
      const response = await getInvitedFreelancer();

      if (response?.length) {
        setInvitedFreelancers(response);
      } else {
        console.error("API Response body is undefined");
      }
    } catch (error) {
      console.error("Error fetching invited results:", error);
    } finally {
      setLoading(false);
    }
  };

  const HandleOpenModal = (item, freelancer) => {
    setIsUserId(freelancer?.user_id);

    if (item === "hire") {
      setIsHire(true);
      setFreelancerInfo(freelancer);
    } else {
      setIsHire(false);
    }
    setOpen((prev) => !prev);
  };

  const closeModal = () => {
    setMessage("");
    setOpen(false);
  };

  const HandleTextValue = (e) => {
    if (e.target.value.trim()?.length === 0) {
      setErrorMessage("Please enter a message.");
    } else {
      setErrorMessage("");
    }
    setMessage(e.target.value);
  };

  const handleSend = async () => {
    setIsLoadingInvite(true);
    if (isHire) {
      const {
        firstName,
        lastName,
        professional_role,
        profile_image,
        hourly_rate,
        user_id,
      } = freelancerInfo;
      router(`/client/hire/${user_id}`, {
        state: {
          freelancerInfo: {
            firstName,
            lastName,
            professional_role,
            profile_image,
            hourly_rate,
            user_id,
            applied_by: "freelancer",
          },
        },
      });
      // const formData = {
      //   freelencer_id: isUserId,
      //   job_id: id,
      //   budget: amount
      // }
      // try {
      //   let result = await dispatch(hireFreelancerService(formData));
      //   if (result?.code == 200) {
      //     setOpen(false);
      //     setMessage("");
      //     toast({
      //       title: result?.msg,
      //       position: "top-right",
      //       status: "success",
      //       isClosable: true,
      //       duration: 2000,
      //     });
      //   }
      // } catch (error) {
      //   setOpen(false);
      //   setMessage("");
      //   const message = error?.response?.data?.msg;
      //   toast({
      //     title: message,
      //     status: "error",
      //     duration: 3000,
      //     isClosable: true,
      //     position: "top-right",
      //   });
      // }
    } else {
      if (message.trim()?.length === 0) {
        setErrorMessage("Please enter a message.");
      } else {
        try {
          let { code, msg, body } = await sendJobInvitation({
            receiver_id: isUserId,
            message: message,
            job_id: id,
          });

          if (code == 200) {
            if (socket && profile.profile.user_id && isUserId) {
              socket.emit(
                "card_message",
                {
                  sender_id: profile.profile.user_id,
                  receiver_id: isUserId,
                  message: message,
                  message_type: "invitation",
                  contract_ref: body?.job_invite_id,
                },
                {
                  title: jobDetails.title,
                  type: "job_invitation",
                  job_type: jobDetails.job_type,
                  amount: jobDetails.amount,
                  url: {
                    freelancer: `/message/invitation?job_id=${jobDetails._id}&invite_id=${body?.job_invite_id}`,
                    client: `/client-jobDetails/${jobDetails._id}`,
                  },
                }
              );
            }
            fetchData();
            setOpen(false);
            closeModal();
            setMessage("");
            toast({
              title: msg,
              position: "top-right",
              status: code === 200 ? "success" : "warning",
              isClosable: true,
              duration: 2000,
            });
          }
        } catch (error) {
          setOpen(false);
          setMessage("");
          const message = error?.response?.data?.msg;
          toast({
            title: message,
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
        }
      }
    }
    setIsLoadingInvite(false);
  };

  // check client payment status send freelancer hire request
  const handleHireFreelancer = (searchResult) => {
    setPaymentVerifiedModal(!profile?.profile?.payment_verified);
    if (profile?.profile?.payment_verified)
      HandleOpenModal("hire", searchResult);
  };

  return (
    <>
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="overflow-hidden border rounded-lg basis-full bg-white">
          <Tabs variant="unstyled">
            <TabList className="pt-4 border-b">
              <Tab className="px-0 text-black">Search</Tab>
              <Tab
                className="px-0 text-black"
                onClick={() => invitedFreelancer()}
              >
                Invited freelancer
              </Tab>
              {/* <Tab className="px-0 text-black">My bg-green-100</Tab> */}
            </TabList>
            <TabIndicator
              height="2px"
              borderRadius="1px"
              color={"#000"}
              className=" bg-fg-brand"
            />
            <TabPanels>
              <TabPanel p={0}>
                <div className="h-auto pt-5 pb-4">
                  <HStack
                    width={"100%"}
                    justifyContent={"space-evenly"}
                    marginX={"auto"}
                    marginBottom={"0.9rem"}
                    paddingX={5}
                  >
                    <Input
                      name="searchText"
                      placeholder="Search for open positions..."
                      bgColor={"white"}
                      onChange={(e) => setSearchText(e.target.value)}
                      value={searchText}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") fetchData();
                      }}
                      isDisabled={loading}
                      focusBorderColor="green.100"
                    />

                    <button
                      type="submit"
                      disabled={loading}
                      onClick={fetchData}
                    >
                      <Box
                        fontWeight={"800"}
                        fontSize={"1.5rem"}
                        border={"2px solid var(--primarycolor)"}
                        padding={"5px 40px"}
                        borderRadius={"5px"}
                        backgroundColor={"var(--primarycolor)"}
                        cursor={"pointer"}
                        color={"white"}
                        transition={"0.3s ease-in-out"}
                        _hover={{
                          backgroundColor: "#fff",
                          color: "#000",
                        }}
                      >
                        <BiSearchAlt />
                      </Box>
                    </button>
                  </HStack>
                  {loading ? (
                    <ReviewProposalSkeleton />
                  ) : searchResults?.data?.length ? (
                    <VStack
                      spacing={5}
                      align="stretch"
                      rounded={"2xl"}
                      paddingX={5}
                    >
                      {searchResults?.data?.map((searchResult) => {
                        const alreadyApplied = appliedUsers?.includes(
                          searchResult.user_id
                        );

                        return (
                          <div key={searchResult?._id}>
                            <div className="flex gap-8 items-center border p-8 rounded-2xl">
                              <Avatar
                                src={searchResult?.profile_image}
                                name={
                                  searchResult?.firstName +
                                  searchResult?.lastName
                                }
                                width={"80px"}
                                height={"80px"}
                                borderRadius={"50%"}
                                fontSize={"3rem"}
                                objectFit={"cover"}
                              />

                              <div className="w-full">
                                <div className="flex justify-between items-center">
                                  <div className="flex gap-3">
                                    <div>
                                      <HStack>
                                        <h2 className="text-lg font-semibold text-[var(--primarycolor)]">
                                          {searchResult?.firstName}{" "}
                                          {searchResult?.lastName}
                                        </h2>
                                        <Button
                                          colorScheme="var(--primarycolor)"
                                          variant="outline"
                                          size={"xs"}
                                          color={"var(--primarycolor)"}
                                          marginLeft={"0.8rem"}
                                          height={"18px"}
                                        >
                                          Available now
                                        </Button>
                                      </HStack>

                                      <p className="text-md">
                                        {searchResult?.professional_role}
                                      </p>

                                      <p className="text-md">
                                        ${searchResult?.hourly_rate}/hr
                                      </p>
                                    </div>
                                  </div>
                                  <div>
                                    <Stack
                                      direction="row"
                                      spacing={4}
                                      align="center"
                                    >
                                      <Button
                                        size="md"
                                        colorScheme="primary"
                                        variant="outline"
                                        onClick={() =>
                                          handleHireFreelancer(searchResult)
                                        }
                                      >
                                        Hire
                                      </Button>
                                      <Tooltip
                                        hasArrow
                                        label={
                                          "Freelancer already applied for this job"
                                        }
                                        bg="gray.500"
                                        placement="top"
                                        isDisabled={!alreadyApplied}
                                      >
                                        <Button
                                          colorScheme="primary"
                                          size={"md"}
                                          isDisabled={alreadyApplied}
                                          onClick={() =>
                                            HandleOpenModal(
                                              "inviteToJob",
                                              searchResult
                                            )
                                          }
                                        >
                                          {searchResult?.invitation_status === 0
                                            ? "Invited"
                                            : "Invite to Job"}
                                        </Button>
                                      </Tooltip>
                                    </Stack>
                                  </div>
                                </div>

                                {/* <div>
                        <Button
                          colorScheme="var(--primarycolor)"
                          variant="outline"
                          size={"xs"}
                          color={"var(--primarycolor)"}
                        >
                          Available now
                        </Button>
                      </div> */}

                                {/* <div>
                          <p className="text-sm font-medium text-[#6B7280]">
                            ${searchResult?.hourly_rate}/hr
                          </p>
                        </div> */}
                                {/* <div>
                          <Link
                            to={"/"}
                            className="mt-1 text-sm font-normal text-[#38BDF8] hover:underline"
                          >
                            Earned $ 1k on adobe illustrator
                          </Link>
                          <Link
                            to={"/"}
                            className="flex items-center gap-2 mt-1 text-sm font-normal text-[#38BDF8] hover:underline "
                          >
                            Has 9 relevant skills to your job
                            <span>
                              <AiFillQuestionCircle className="text-[#6B7280]" />
                            </span>
                          </Link>
                        </div> */}

                                <div className="flex items-center justify-between">
                                  <Stack
                                    spacing={4}
                                    direction="row"
                                    align="center"
                                  >
                                    {searchResult?.length > 0 &&
                                      searchResult?.skills.map((skill, idx) => (
                                        <Button
                                          key={idx}
                                          size="sm"
                                          colorScheme="gray"
                                          color={"#6B7280"}
                                        >
                                          {skill}
                                        </Button>
                                      ))}
                                  </Stack>
                                  {/* <div>
                          <IoIosArrowForward
                            size={24}
                            className="text-fg-brand"
                          />
                        </div> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      {/* Pagination */}
                      {pages?.length > 0 && (
                        <div className="flex gap-5 justify-end mt-5 text-[var(--primarycolor)] font-semibold">
                          <button
                            className={`flex gap-2 items-center ${searchResults?.current_page === 1 &&
                              "text-gray-300"
                              }`}
                            onClick={() =>
                              setPage(searchResults?.current_page - 1)
                            }
                            disabled={searchResults?.current_page === 1}
                          >
                            <MdKeyboardArrowLeft className="text-2xl" />
                            Previous
                          </button>
                          <div>
                            {pages.map((page) => (
                              <button
                                key={page}
                                className={`mx-1 w-7 h-7 rounded-full border border-[var(--primarycolor)]  ${searchResults?.current_page === page
                                  ? "bg-[var(--primarycolor)] text-white"
                                  : "bg-white"
                                  }`}
                                onClick={() => setPage(page)}
                              >
                                {page}
                              </button>
                            ))}
                          </div>

                          <button
                            className={`flex gap-2 items-center ${searchResults?.current_page ===
                              pages[pages?.length - 1] && "text-gray-300"
                              }`}
                            onClick={() =>
                              setPage(searchResults?.current_page + 1)
                            }
                            disabled={
                              searchResults?.current_page ===
                              pages[pages?.length - 1]
                            }
                          >
                            Next <MdKeyboardArrowRight className="text-2xl" />
                          </button>
                        </div>
                      )}
                    </VStack>
                  ) : (
                    <div className="p-5 text-center">
                      Haven&apos;t match any profile!
                    </div>
                  )}
                </div>
              </TabPanel>
              <TabPanel p={0} bg={"#F3F4F6"}>
                {/* Invited freelancer */}
                <TabPanel p={0} bg={"#F3F4F6"}>
                  <div className="h-auto p-3 bg-white">
                    {loading ? (
                      <ReviewProposalSkeleton />
                    ) : invitedFreelancers?.filter(
                      (profile) => profile?.job_id === id
                    )?.length ? (
                      <VStack
                        divider={<StackDivider borderColor="gray.200" />}
                        spacing={4}
                        align="stretch"
                        bgColor={"white"}
                        padding={5}
                      >
                        {invitedFreelancers
                          ?.filter((profile) => profile?.job_id === id)
                          ?.map((profile) => (
                            <InvitedFreelancerCard
                              key={profile._id}
                              profile={profile}
                            />
                          ))}
                      </VStack>
                    ) : (
                      <>You haven&apos;t invited freelancer!</>
                    )}
                  </div>
                </TabPanel>
              </TabPanel>
              {/* <TabPanel>
          <p>My Hire!</p>
        </TabPanel> */}
            </TabPanels>
          </Tabs>
        </div>
        <UniversalModal
          isModal={open}
          setIsModal={setOpen}
          title={
            isHire
              ? "Are you hire this freelancer?"
              : "Enter your message for invite"
          }
        >
          <div>
            {!isHire && (
              <div>
                <textarea
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Enter your message..."
                  rows="4"
                  value={message}
                  onChange={HandleTextValue}
                />
                <p className="text-red-500 text-sm">{errorMessage}</p>
              </div>
            )}
            <div className="flex justify-end mt-5">
              <Button
                onClick={closeModal}
                colorScheme="primary"
                variant={"outline"}
                marginRight={5}
              >
                Cancel
              </Button>
              <Button
                isLoading={isLoadingInvite}
                loadingText={isHire ? "Sure" : "Send"}
                colorScheme="primary"
                type="submit"
                spinner={<BtnSpinner />}
                onClick={() => handleSend()}
              >
                {isHire ? "Sure" : "Send"}
              </Button>
            </div>
          </div>
        </UniversalModal>
      </div>

      {/* Notify Payment Status Before Hiring a Freelancer */}
      <UniversalModal
        isModal={paymentVerifiedModal}
        setIsModal={setPaymentVerifiedModal}
      >
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
            onClick={() => setPaymentVerifiedModal(false)}
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

export default InviteFreelancer;
