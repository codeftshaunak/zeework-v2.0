import {
  Avatar,
  HStack,
  VStack,
  Box,
  Input,
  Flex,
  Text,
  ButtonSpinner,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { BsSendFill } from "react-icons/bs";
import { SocketContext } from "../../Contexts/SocketContext";
import SingleText from "./SingleText";
import { useSelector } from "react-redux";

const MessageBody = ({
  data,
  selectedUser,
  userDetails,
  isAgencyId,
  setMessageUsers,
}) => {
  const [messageData, setMessageData] = useState(data?.messages || []);
  const [isLoading, setIsLoading] = useState(false);
  const receiverDetails = data?.reciever_details;
  const { contract_details } = userDetails || {};

  // const [senderDetails, setSenderDetails] = useState();
  const [message, setMessage] = useState("");
  const { socket } = useContext(SocketContext);
  const profile = useSelector((state) => state.profile);
  const senderDetails = isAgencyId ? profile.agency : profile.profile;
  const role = useSelector((state) => state.auth.role);
  const userId = isAgencyId ? isAgencyId : senderDetails.user_id;
  const socketUser = senderDetails.user_id;

  useEffect(() => {
    // Scroll to the bottom when the component is first rendered or when new messages are added
    scrollToBottom();
  }, [messageData, message, data]);

  const scrollToBottom = () => {
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  };

  // console.log({ receiverDetails, senderDetails });
  useEffect(() => {
    setMessageData(data?.messages);
  }, [data]);

  const handleSendMessage = () => {
    sendMessage(message);
    setMessage("");
  };

  const sendMessage = (message) => {
    setIsLoading(true);

    // Emitting the message to the server
    socket.emit("connect_user", { user_id: socketUser });

    socket.emit(
      "chat_message",
      {
        sender_id: userId,
        receiver_id: selectedUser,
        message: message,
        contract_ref: contract_details?.contract_ref,
      },
      (response) => {
        if (response?.status === "success") {
          setIsLoading(false);

          // update latest communicated user
          setMessageUsers((prev) => {
            // Find the user to update
            const userIndex = prev.findIndex((user) => {
              const receiverId = user.user_details?.agency_name
                ? user.user_details._id
                : user.user_details.user_id;
              return (
                user.contract_details.contract_ref ===
                  contract_details.contract_ref && receiverId === selectedUser
              );
            });

            // If user is found, update the `updated_at` field
            if (userIndex !== -1) {
              const updatedUsers = [...prev];
              updatedUsers[userIndex] = {
                ...updatedUsers[userIndex],
                contract_details: {
                  ...updatedUsers[userIndex].contract_details,
                  activity: new Date().toISOString(),
                },
              };
              return updatedUsers;
            }

            // If user is not found, return the previous state
            return prev;
          });
        }
      }
    );
  };

  useEffect(() => {
    socket?.on();
    socket?.emit("connect_user", { user_id: socketUser });
    socket?.on("recieve_message", (data, cardDetails) => {
      data.created_at = new Date();
      // Compare with the previous message to determine if it's repeated
      const isRepeated =
        messageData.length > 0 &&
        messageData[messageData.length - 1].sender_id === data.sender_id;
      if (data.contract_ref === contract_details?.contract_ref)
        setMessageData((prev) => [
          ...prev,
          { ...data, cardDetails, isRepeated },
        ]);
    });
    return () => {
      socket?.off("recieve_message");
    };
  }, [data, socket, messageData, userId]);

  return (
    <Box
      width="100%"
      px={"20px"}
      marginLeft={"1.5rem"}
      py={"1rem"}
      borderRadius={"15px"}
      position={"relative"}
      height={"80%"}
      overflow={"hidden"}
      className="border shadow-sm bg-white pb-5"
    >
      <Flex borderBottom="1px" borderColor="gray.400" py={2} px={2} gap={3}>
        <Avatar
          src={
            receiverDetails?.agency_profileImage
              ? receiverDetails?.agency_profileImage
              : receiverDetails?.profile_image
          }
          size="md"
          round="20px"
          border={"1px solid var(--primarycolor)"}
          name={
            receiverDetails?.agency_name
              ? receiverDetails?.agency_name
              : receiverDetails?.firstName + " " + receiverDetails?.lastName
          }
        />

        <Flex flexDir="column">
          <Text fontWeight="semibold" fontSize={"lg"}>
            {receiverDetails?.agency_name
              ? receiverDetails?.agency_name
              : receiverDetails?.firstName + " " + receiverDetails?.lastName}
          </Text>
          <Text fontWeight="" fontSize={"sm"}>
            {contract_details?.title
              ? contract_details.title
              : receiverDetails?.professional_role
              ? receiverDetails?.professional_role
              : receiverDetails?.businessName}
          </Text>
        </Flex>
      </Flex>

      <VStack
        alignItems={"start"}
        width={"100%"}
        height={"100%"}
        position={"relative"}
      >
        <Box
          height={"65vh"}
          overflowY={"auto"}
          width={"100%"}
          display={"flex"}
          flexDir={"column"}
          alignItems={"start"}
          justifyContent={"flex-start"}
          id="chat-container"
          css={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none",
          }}
          // className="bg-red-500"
        >
          {messageData?.length
            ? messageData.map((user, index) => (
                <SingleText
                  key={index}
                  user={user}
                  userId={userId}
                  senderDetails={senderDetails}
                  receiverDetails={receiverDetails}
                  role={role}
                />
              ))
            : null}
        </Box>
        <HStack
          marginTop={"1rem"}
          width={"100%"}
          margin={"auto"}
          height={"35px"}
          padding={"20px 10px"}
          justifyContent={"space-between"}
          // position={"fixed"}
          bottom={"3rem"}
          className="rounded"
        >
          <Input
            placeholder="Write your message here"
            width={"95%"}
            padding={"10px 15px"}
            backgroundColor={"white"}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (!isLoading && message && e.key === "Enter") {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <VStack
            border={"1px solid gray"}
            height={"40px"}
            width={"60px"}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius={"5px"}
            borderColor={"ButtonFace"}
            className={isLoading || message ? "bg-green-500" : "bg-white"}
            cursor={"pointer"}
            onClick={() => {
              if (!isLoading && message) handleSendMessage();
            }}
          >
            {isLoading ? (
              <ButtonSpinner color={"white"} />
            ) : (
              <BsSendFill
                fontSize={"20px"}
                className={message && "text-white"}
              />
            )}
          </VStack>
        </HStack>
      </VStack>
    </Box>
  );
};

export default MessageBody;
