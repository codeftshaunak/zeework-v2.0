import { useEffect, useState } from "react";
import {
  Avatar,
  HStack,
  VStack,
  Card,
  Box,
  Input,
  Image,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useLocation, userouter, useParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { CgMore } from "react-icons/cg";
import {
  MessageBodySkeleton,
  MessageUsersSkeleton,
} from "../Skeletons/MessageSkeleton";
import { LuMessagesSquare } from "react-icons/lu";
import MessageBody from "./MessageBody";
import { useSelector } from "react-redux";
import TimerDownloadCard from "../Common/TimerDownloadCard";
import { useCookies } from "react-cookie";
import {
  getMessageDetails,
  getMessageUsers,
} from "../../helpers/APIs/messageApis";

const MessageComp = () => {
  const [messageUsers, setMessageUsers] = useState([]);
  const [messageDetails, setMessageDetails] = useState({});
  const [selectedUser, setSelectedUser] = useState("");
  const [filteredUser, setFilteredUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [usersIsLoading, setUsersIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const contract_ref = searchParams.get("contract_ref");
  const profile = useSelector((state) => state.profile);
  const role = profile.profile.role;
  const [cookies] = useCookies(["activeagency"]);
  const activeAgency = cookies.activeagency;

  const sortingUsers = messageUsers
    ?.filter((user) => user.contract_details?.contract_ref)
    ?.sort(
      (a, b) =>
        new Date(b.contract_details.activity) -
        new Date(a.contract_details.activity)
    );

  const getMessageUser = async () => {
    try {
      const { body, code } = activeAgency
        ? await getMessageUsers("agency")
        : await getMessageUsers();

      if (code === 200) {
        setMessageUsers(body);
      }
    } catch (error) {
      console.error("Error fetching message user:", error);
    }
    setUsersIsLoading(false);
  };

  const getMessagesList = async (receiver_id, contractRef) => {
    router(
      `/message/${receiver_id}?${contractRef || contract_ref
        ? `contract_ref=${contractRef || contract_ref}&`
        : ""
      }`
    );
    setIsLoading(true);

    try {
      if (receiver_id) {
        setSelectedUser(
          messageUsers?.find(
            (user) => user?.user_details?.user_id === selectedUser
          )
        );

        if (!messageUsers?.length) await getMessageUser();

        const { code, body } = await getMessageDetails(
          receiver_id,
          contractRef,
          activeAgency ? "agency" : "user"
        );
        if (code === 200 && body.messages?.length > 0) {
          let lastSenderId = null;
          // Add isRepeated field to each message
          body.messages?.forEach((message) => {
            // Check if the current sender_id is the same as the last one
            if (message.sender_id === lastSenderId) {
              message.isRepeated = true;
            } else {
              message.isRepeated = false;
            }
            // Update lastSenderId to current sender_id for the next iteration
            lastSenderId = message.sender_id;
          });
        }

        if (code === 200) setMessageDetails(body);
      }
    } catch (error) {
      console.error("Error fetching message details:", error);
    }
    setIsLoading(false);
  };

  const handleSearchingUser = (query) => {
    setQuery(query);
    if (query?.length != "") {
      const getUsers = messageUsers.filter((user) => {
        return (
          user?.user_details?.firstName
            .toLowerCase()
            .includes(query.toLowerCase()) ||
          user?.user_details?.lastName
            .toLowerCase()
            .includes(query.toLowerCase())
        );
      });
      setFilteredUser(getUsers);
    } else {
      setFilteredUser([]);
    }
  };

  useEffect(() => {
    if (!messageUsers?.length) getMessageUser();
    if (id && contract_ref) getMessagesList(id, contract_ref);
  }, []);

  return (
    <HStack
      paddingX={6}
      paddingTop={6}
      width="100%"
      height="full"
      justifyContent={"space-between"}
      alignItems={"start"}
    // className="bg-green-500"
    >
      <Box className="max-xl:w-[120px] w-[350px]">
        <Box
          position="relative"
          h="44px"
          mb={2}
          mt={6}
          className="max-xl:hidden"
        >
          <Input
            type="text"
            placeholder="Search Message by Name"
            // pb={1}
            w="full"
            h="44px"
            px={10}
            border="1px"
            // backgroundColor="white"
            borderColor="gray.600"
            rounded="xl"
            value={query}
            onChange={(e) => handleSearchingUser(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-3.5 text-gray-300" />
          <CgMore className="absolute right-3 top-3.5 text-gray-300" />
        </Box>
        {query?.length > 0 && (
          <Box>
            <Text className="text-lg font-semibold">Searched Users</Text>
            <Box
              overflowY={"auto"}
              border={"1px solid"}
              borderColor="gray.200"
              padding={2}
              rounded={"lg"}
              display={"grid"}
              maxHeight={"300px"}
              gap={5}
              sx={{
                "&::-webkit-scrollbar": {
                  width: "8px",
                  borderRadius: "8px",
                  backgroundColor: `rgba(0, 0, 0, 0.05)`,
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: `rgba(0, 0, 0, 0.05)`,
                  borderRadius: "8px",
                },
              }}
            >
              {!filteredUser?.length && query?.length > 0 && (
                <Text>Doesn&apos;t Matched</Text>
              )}
              {filteredUser.map((user, index) => (
                <Box
                  key={index}
                  className="w-full border rounded-2xl bg-gray-100 cursor-pointer flex items-center"
                  onClick={() => {
                    getMessagesList(
                      user?.user_details?.agency_name
                        ? user?.user_details?._id
                        : user?.user_details?.user_id,
                      user?.contract_details?.contract_ref
                    ),
                      setFilteredUser([]),
                      setQuery("");
                  }}
                >
                  <Flex align="center" justify="between" py={2} px={4}>
                    <Box width="85px">
                      {user?.user_details?.profile_image !== null ? (
                        <Image
                          src={user?.user_details?.profile_image}
                          className="h-[50px] w-[50px] rounded-full"
                          alt="img"
                          borderRadius={"50px"}
                        />
                      ) : (
                        <Avatar
                          size="md"
                          round="20px"
                          name={
                            user?.user_details?.firstName +
                            " " +
                            user?.user_details?.lastName
                          }
                        />
                      )}
                    </Box>
                    <Box width="full">
                      <HStack justifyContent={"space-between"}>
                        <Text fontWeight="semibold" fontSize={"15px"}>
                          {user?.user_details?.firstName}
                          {user?.user_details?.lastName}
                          {user?.user_details?.businessName &&
                            " " + "|" + " " + user?.user_details?.businessName}
                        </Text>
                        {/* <Text color="gray.600">7/29/23</Text> */}
                      </HStack>
                      {/* <Text fontWeight="semibold" fontSize={"15px"}>
                        Expert Dashboard Designer
                      </Text> */}
                      {/* <Text color="gray.600">
                        You: {user?.lastMessage?.slice(0, 10)}
                      </Text> */}
                    </Box>
                  </Flex>
                </Box>
              ))}
            </Box>
          </Box>
        )}
        {usersIsLoading ? (
          <MessageUsersSkeleton />
        ) : sortingUsers?.length ? (
          <Box overflowY={"auto"}>
            {sortingUsers.map((user, index) => {
              const userId = user?.user_details?.agency_name
                ? user?.user_details?._id
                : user?.user_details?.user_id;
              const isActive =
                user?.contract_details?.contract_ref === contract_ref &&
                userId === id;

              const name = user?.user_details?.agency_name
                ? user?.user_details?.agency_name
                : user?.user_details?.firstName +
                " " +
                user?.user_details?.lastName;

              const photo = user?.user_details?.agency_profileImage
                ? user?.user_details?.agency_profileImage
                : user?.user_details?.profile_image;

              return (
                <Box
                  key={index}
                  className={`h-[90px] max-xl:w-0 w-full border rounded-2xl mt-[1rem] flex items-center cursor-pointer ${isActive ? "border-primary bg-green-100" : "bg-gray-100"
                    }`}
                  onClick={() => {
                    getMessagesList(
                      user?.user_details?.agency_name
                        ? user?.user_details?._id
                        : user?.user_details?.user_id,
                      user?.contract_details?.contract_ref
                    ),
                      setQuery("");
                  }}
                >
                  <Flex align="center" justify="between" py={2} px={4}>
                    <Box className="max-xl:w-[50px] w-[85px]">
                      <Avatar
                        size="md"
                        round="20px"
                        name={name}
                        src={photo}
                        border={"1px solid var(--primarycolor)"}
                      />
                    </Box>
                    <Box width="full" className="max-xl:hidden">
                      <HStack justifyContent={"space-between"}>
                        <Text fontWeight="semibold" fontSize={"13px"}>
                          {name}
                          {user?.user_details?.businessName &&
                            " " + "|" + " " + user?.user_details?.businessName}
                        </Text>
                        {/* <Text color="gray.600">7/29/23</Text> */}
                      </HStack>
                      {/* <Text fontWeight="semibold" fontSize={"15px"}>
                        Expert Dashboard Designer
                      </Text> */}
                      <Text color="gray.600" fontSize={"13px"}>
                        {user?.contract_details?.title?.slice(0, 20)}
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              );
            })}
          </Box>
        ) : (
          <Text textAlign={"center"} mt={4}>
            You haven't any message!
          </Text>
        )}
      </Box>

      <VStack className="max-xl:w-full w-[55%]">
        {id ? (
          isLoading ? (
            <MessageBodySkeleton />
          ) : (
            <MessageBody
              data={messageDetails}
              selectedUser={id}
              userDetails={messageUsers?.find(
                (user) => user.contract_details?.contract_ref === contract_ref
              )}
              isLoading={isLoading}
              isAgencyId={activeAgency && profile.agency._id}
              setMessageUsers={setMessageUsers}
            />
          )
        ) : (
          <HStack
            alignItems={"center"}
            justifyContent={"center"}
            height={"60vh"}
          >
            <Box className="flex flex-col items-center justify-center">
              <LuMessagesSquare className="text-9xl text-green-500" />
            </Box>
          </HStack>
        )}
      </VStack>

      <VStack marginTop={"1rem"} marginLeft={"1.5rem"}>
        <div className="max-xl:hidden">
          {role == 1 && (
            <Card
              className="px-10 py-2 cursor-pointer"
              onClick={() => router.push("/my-jobs")}
            >
              <h2>Submit Work</h2>
            </Card>
          )}
          <div className="w-[70%]">
            <TimerDownloadCard msg={true} />
          </div>
        </div>
      </VStack>
    </HStack>
  );
};

export default MessageComp;
