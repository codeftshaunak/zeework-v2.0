import { HStack, Box, Flex, Text, Avatar, useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { IoIosMore } from "react-icons/io";
import CardDetails from "./CardDetails";
import { format, differenceInMinutes, differenceInHours } from "date-fns";
import Linkify from "react-linkify";

const SingleText = ({ user, userId, senderDetails, role, receiverDetails }) => {
  const [isMore, setIsMore] = useState(false);
  const [isMenu, setIsMenu] = useState(false);
  const [timeDifference, setTimeDifference] = useState("");

  const getTimeDifference = () => {
    const messageDate = new Date(user.created_at);
    const now = new Date();

    const minutesDiff = differenceInMinutes(now, messageDate);
    const hoursDiff = differenceInHours(now, messageDate);

    if (minutesDiff < 1) return "now";
    if (minutesDiff < 10) return `${minutesDiff} min ago`;
    if (hoursDiff < 24) return format(messageDate, "hh:mm a");
    return format(messageDate, "MM/dd/yyyy");
  };

  const toast = useToast();

  const deleteCurrentMsg = async (id) => {
    setIsMenu(false);
    try {
      const { code, msg } = {};

      if (code === 200) {
        toast({
          title: msg,
          duration: 3000,
          isClosable: true,
          colorScheme: "green",
          position: "top-right",
        });
      }
    } catch (error) {
      toast({
        title: error?.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      console.error("Error deleting message:", error);
    }
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeDifference(getTimeDifference());
    }, 60000);

    setTimeDifference(getTimeDifference());

    return () => clearInterval(timerId);
  }, []);

  const getProfileImage = () => {
    if (user.sender_id === userId) {
      return senderDetails?.agency_profileImage || senderDetails?.profile_image;
    }
    return (
      receiverDetails?.agency_profileImage || receiverDetails?.profile_image
    );
  };

  const getDisplayName = () => {
    if (user.sender_id === userId) {
      return (
        senderDetails?.agency_name ||
        `${senderDetails?.firstName} ${senderDetails?.lastName}`
      );
    }
    return (
      receiverDetails?.agency_name ||
      `${receiverDetails?.firstName} ${receiverDetails?.lastName}`
    );
  };

  return (
    <Box position="relative" padding={"4px"} width={"100%"}>
      {user.sender_id === userId ? (
        <HStack justifyContent={"end"}>
          <HStack alignItems={"start"}>
            <Box>
              {!user.isRepeated && (
                <Text fontWeight={"600"} textAlign={"right"}>
                  You
                </Text>
              )}
              <Flex
                flexDir="column"
                bgColor={"green.100"}
                paddingY={2}
                paddingX={4}
                rounded={"md"}
                position={"relative"}
                onMouseEnter={() => setIsMore(true)}
                onMouseLeave={() => setIsMore(false)}
              >
                <>
                  <Linkify>
                    <Text textAlign={"right"} fontSize="1rem" color="gray.600">
                      {user.message}
                    </Text>
                  </Linkify>

                  {user?.card_details && (
                    <CardDetails message={user} user_id={userId} role={role} />
                  )}
                </>
                <p className="text-[12px] text-right mt-1 -mb-1">
                  {timeDifference}
                </p>
                {isMore && (
                  <div className="absolute top-0 left-0">
                    <div className="relative">
                      <div
                        className="cursor-pointer bg-white hover:bg-gray-200/30 p-1 rounded-full shadow-[rgba(17,_17,_26,_0.1)_0px_0px_12px]"
                        onClick={() => setIsMenu(true)}
                        onMouseLeave={() => setIsMenu(false)}
                      >
                        <IoIosMore />
                      </div>
                      {isMenu && (
                        <div
                          className="absolute right-6 -top-4 p-2 shadow bg-white rounded"
                          onMouseEnter={() => {
                            setIsMore(true);
                            setIsMenu(true);
                          }}
                          onMouseLeave={() => {
                            setIsMore(false);
                            setIsMenu(false);
                          }}
                        >
                          <div
                            className="px-3 py-1 hover:bg-gray-200/20 rounded cursor-pointer transition"
                            onClick={() => deleteCurrentMsg(user?._id)}
                          >
                            Delete
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </Flex>
            </Box>
            <Box minWidth={"50px"}>
              {!user.isRepeated && (
                <Avatar
                  size="md"
                  round="20px"
                  border={"1px solid var(--primarycolor)"}
                  src={getProfileImage()}
                  name={getDisplayName()}
                />
              )}
            </Box>
          </HStack>
        </HStack>
      ) : (
        <HStack justifyContent={"start"}>
          <HStack alignItems={"start"}>
            <Box minWidth={"50px"}>
              {!user.isRepeated && (
                <Avatar
                  size="md"
                  round="20px"
                  border={"1px solid var(--primarycolor)"}
                  src={getProfileImage()}
                  name={getDisplayName()}
                />
              )}
            </Box>
            <Box>
              {!user.isRepeated && (
                <Text fontWeight={"600"}>{getDisplayName()}</Text>
              )}
              <Flex
                flexDir="column"
                bgColor={"gray.100"}
                paddingY={2}
                paddingX={4}
                rounded={"md"}
                position={"relative"}
                onMouseEnter={() => setIsMore(true)}
                onMouseLeave={() => setIsMore(false)}
              >
                <>
                  <Linkify>
                    <Text fontSize="1rem" color="gray.600">
                      {user.message}
                    </Text>
                  </Linkify>

                  {user?.card_details && (
                    <CardDetails message={user} user_id={userId} role={role} />
                  )}
                </>
                <p className="text-[12px] text-right mt-1 -mb-1">
                  {timeDifference}
                </p>
              </Flex>
            </Box>
          </HStack>
        </HStack>
      )}
    </Box>
  );
};

export default SingleText;
