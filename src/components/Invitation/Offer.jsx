import { useContext, useEffect, useState } from "react";
import { Box, Text, useToast } from "@chakra-ui/react";
import queryString from "query-string";
import {
  updateOfferRequest,
  offerDetails,
} from "../../helpers/APIs/freelancerApis";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../Contexts/SocketContext";
import Modal from "./Modal";
import { ClientDetailsSection } from "./ClientDetailsSection";
import ConfirmModalCommon from "../ConfirmationModal/ConfirmationModalCommon";
import InvitationSkeleton from "../Skeletons/InvitationSkeleton";
import { OfferDetails } from "./OfferDetails";
import { useDispatch } from "react-redux";
import { setMyJobsData } from "../../redux/pagesSlice/pagesSlice";
import DataNotAvailable from "../DataNotAvailable/DataNotAvailable";

const Offer = () => {
  const navigate = useNavigate();
  const currentUrl = window.location.href;
  const { offer_id, job_id } = queryString.parseUrl(currentUrl).query;
  const [openModal, setOpenModal] = useState(false);
  const [jobDetails, setJobDetails] = useState();
  const [reject, setReject] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();
  const { socket } = useContext(SocketContext); // Use socket from context
  const [isLoading, setIsLoading] = useState({
    isLoading: false,
    statusValue: null,
  });
  const [loading, setLoading] = useState(false);

  const getInvitationDetails = async () => {
    setLoading(true);
    try {
      const { body, code } = await offerDetails(offer_id);
      if (code === 200) setJobDetails(body[0]);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getInvitationDetails();
  }, [offer_id]);

  const performAction = async ({ messages, statusValue }) => {
    setIsLoading({
      isLoading: true,
      statusValue: null,
    });
    try {
      const { code, msg, message } = await updateOfferRequest({
        // job_id: job_id,
        offer_id: offer_id,
        status: statusValue,
      });

      if (code === 200) {
        toast({
          title: msg,
          duration: 3000,
          status: "success",
          position: "top-right",
        });
        sendMessage(messages, statusValue);
        navigate("/my-jobs");
        dispatch(setMyJobsData({ userJobs: {} }));
      } else {
        toast({
          title: message,
          duration: 3000,
          status: "warning",
          position: "top-right",
        });
      }
    } catch (error) {
      toast({
        title: error?.response?.data?.msg || "Error performing action",
        duration: 3000,
        position: "top-right",
        status: "warning",
        isClosable: true,
      });
    }
    setIsLoading({
      isLoading: false,
      statusValue: null,
    });
  };

  const handleRejectOffer = async () => {
    setIsLoading({
      isLoading: true,
      statusValue: null,
    });
    try {
      const res = await updateOfferRequest({
        // job_id: job_id,
        offer_id: offer_id,
        status: "rejected",
      });

      if (res.code === 200) {
        // sendMessage("", "rejected");
        toast({
          title: res.msg,
          duration: 3000,
          status: "success",
          position: "top-right",
        });
        navigate("/my-jobs");
      } else {
        toast({
          title: res.msg || res.message,
          duration: 3000,
          status: "warning",
          position: "top-right",
        });
      }
    } catch (error) {
      toast({
        title: error?.response?.data?.msg || "Error performing action",
        duration: 3000,
        position: "top-right",
        status: "warning",
        isClosable: true,
      });
    }
    setIsLoading({
      isLoading: false,
      statusValue: null,
    });
  };

  const sendMessage = (message, statusValue) => {
    if (socket) {
      socket.emit(
        "card_message",
        {
          sender_id: jobDetails?.freelancer_id,
          receiver_id: jobDetails.client_id,
          message: message,
          // message_type: "offer",
          contract_ref: jobDetails._id,
        },
        {
          title: jobDetails?.job_title,
          type: `${statusValue}_job_offer`,
          job_type: jobDetails?.job_type,
          amount: jobDetails?.hourly_rate || jobDetails?.budget,
          url: {
            client: `/contract/${jobDetails._id}`,
            freelancer: `/active-job/submit/${jobDetails._id}`,
          },
        }
      );
    }
  };

  useEffect(() => {
    if (socket) {
      socket.emit("connect_user", { user_id: jobDetails?.freelencer_id });

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
    performAction({ messages, statusValue: "accepted" });
  const rejectInvite = () => setReject(true);

  return (
    <Box width={"full"}>
      <br />
      <br />
      <h2 className="my-3 text-2xl font-bold text-[1.6rem] text-[#374151]">
        Job Offer Details
      </h2>
      {loading ? (
        <InvitationSkeleton />
      ) : jobDetails?.client_details ? (
        <div className="grid grid-cols-3 gap-5 mt-5">
          {/* <JobDetailsSection jobDetails={jobDetails} /> */}
          <OfferDetails jobDetails={jobDetails} />
          <ClientDetailsSection
            clientDetails={jobDetails?.client_details[0]}
            status={jobDetails?.status}
            setOpenModal={setOpenModal}
            rejectInvite={rejectInvite}
            offer={true}
          />
          {openModal && (
            <Modal
              setOpenModal={setOpenModal}
              openModal={openModal}
              acceptInvite={acceptInvite}
              offer={true}
              isLoading={isLoading}
            />
          )}
          {reject && (
            <ConfirmModalCommon
              setOpenModal={setReject}
              openModal={reject}
              title={"Reject The Offer"}
              handleSubmit={handleRejectOffer}
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

export default Offer;
