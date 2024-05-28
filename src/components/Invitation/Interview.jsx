import React, { useContext, useEffect, useState } from "react";
import { Box, HStack, Text, VStack, useToast } from "@chakra-ui/react";
import queryString from "query-string";
import {
  acceptInvitation,
  invitationDetails,
} from "../../helpers/APIs/freelancerApis";
import { useNavigate } from "react-router-dom";
import { JobDetailsSection } from "./JobDetails";
import { SocketContext } from "../../Contexts/SocketContext";
import Modal from "./Modal";
import { ClientDetailsSection } from "./ClientDetailsSection";
import InvitationSkeleton from "../Skeletons/InvitationSkeleton";
import DataNotAvailable from "../DataNotAvailable/DataNotAvailable";

const Interview = () => {
  const navigate = useNavigate();
  const currentUrl = window.location.href;
  const { job_id, invite_id } = queryString.parseUrl(currentUrl).query;
  const [openModal, setOpenModal] = useState(false);
  const [jobDetails, setJobDetails] = useState({});
  const [isLoading, setIsLoading] = useState({
    isLoading: false,
    statusValue: null,
  });
  const [loading, setLoading] = useState(true);

  const toast = useToast();
  const { socket } = useContext(SocketContext); // Use socket from context
  const getInvitationDetails = async () => {
    setLoading(true);
    try {
      const { body, code } = await invitationDetails(invite_id);
      if (code === 200) setJobDetails(body[0]);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getInvitationDetails();
  }, [invite_id]);

  const performAction = async ({ messages, statusValue }) => {
    setIsLoading({ isLoading: true, statusValue: statusValue });
    try {
      const { code, msg } = await acceptInvitation({
        job_id: job_id,
        invite_id: invite_id,
        status: statusValue,
      });

      if (code === 200 && statusValue == 1) {
        sendMessage(messages);
      }

      if (code === 200) {
        toast({
          title:
            statusValue == 1
              ? "You’ve accept the interview request"
              : "You’ve reject the interview request",
          duration: "3000",
          colorScheme: "green",
          position: "top-right",
        });
        navigate("/");
      } else {
        toast({
          title: msg,
          duration: "3000",
          colorScheme: "warning",
          position: "top-right",
        });
      }
    } catch (error) {
      toast({
        title: error?.response?.data?.msg || "Error performing action",
        duration: "3000",
        position: "top-right",
        status: "warning",
        isClosable: true,
      });
    }
    setIsLoading({ isLoading: false, statusValue: null });
  };

  const sendMessage = (message) => {
    if (socket) {
      socket.emit(
        "card_message",
        {
          sender_id: jobDetails?.receiver_id,
          receiver_id: jobDetails?.sender_id,
          message: message,
          // message_type: "invitation",
          contract_ref: jobDetails._id,
        },
        {
          title: jobDetails.job_details[0].title,
          type: "accepted_job_interview",
          job_type: jobDetails.job_details[0].job_type,
          amount: jobDetails.job_details[0].amount,
        }
      );
    }
  };

  useEffect(() => {
    if (socket) {
      socket.emit("connect_user", { user_id: jobDetails?.receiver_id });

      // Example: Listening for a custom event
      socket.on("chat_message", (data) => {
        // console.log("Received message:", data);
      });

      // Cleanup function
      return () => {
        // console.log("Socket disconnected");
        socket.off("chat_message");
      };
    }
  }, [socket, jobDetails]);

  const acceptInvite = (messages) =>
    performAction({ messages, statusValue: "1" });

  const rejectInvite = () => performAction({ statusValue: "2" });

  return (
    <Box width={"full"}>
      <Text
        fontWeight="500"
        fontSize={{ base: "3xl", lg: "4xl" }}
        marginTop={{ base: 3, sm: 5, lg: 10 }}
      >
        Invitation to Interview
      </Text>
      {loading ? (
        <InvitationSkeleton />
      ) : jobDetails ? (
        <div className="grid lg:grid-cols-3 sm:gap-5 mt-3 sm:mt-5 lg:mt-10">
          <JobDetailsSection jobDetails={jobDetails} />
          <ClientDetailsSection
            clientDetails={jobDetails?.client_details?.[0]}
            status={jobDetails?.status}
            setOpenModal={setOpenModal}
            rejectInvite={rejectInvite}
            isLoading={isLoading}
          />

          {openModal && (
            <Modal
              openModal={openModal}
              setOpenModal={setOpenModal}
              acceptInvite={acceptInvite}
              isLoading={isLoading}
            />
          )}
        </div>
      ) : (
        <DataNotAvailable onRefresh={getInvitationDetails} />
      )}
    </Box>
  );
};

export default Interview;
