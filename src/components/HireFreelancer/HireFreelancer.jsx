import { useContext, useEffect, useState } from "react";
import ContractTerms from "./ContractTerms";
import FreelancerProfile from "./FreelancerProfile";
import JobDetails from "./JobDetails";
import { sendHireFreelancer } from "../../helpers/APIs/clientApis";
import { useToast, Checkbox } from "@chakra-ui/react";
import { useLocation, userouter } from "react-router-dom";
import BtnSpinner from "../Skeletons/BtnSpinner";
import { SocketContext } from "../../Contexts/SocketContext";

const HireFreelancerPage = () => {
  const { socket } = useContext(SocketContext);
  const location = useLocation();
  const { applied_by, agency_id, user_id, hourly_rate, agency_hourlyRate } =
    (location.state && location.state?.freelancerInfo) || {};
  const [isChecked, setIsChecked] = useState(false);
  const [isContinue, setIsContinue] = useState(false);
  const [formData, setFormData] = useState({
    hiring_team: "",
    job_title: "",
    contract_title: "",
    job_type: "hourly",
    hourly_rate:
      (applied_by === "agency_member" ? agency_hourlyRate : hourly_rate) || 0,
    weekly_limit: "40",
    allow_freelancer_manually_timelog: false,
    freelancer_id: user_id || agency_id,
    offer_to: applied_by === "agency_member" ? "agency" : "freelancer",
    applied_by: applied_by === "agency_member" ? "agency" : "freelancer",
    accept_terms_condition: isChecked,
  });
  const toast = useToast();
  const router = useRouter();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsContinue(true);

    try {
      const { code, msg, body } = await sendHireFreelancer(
        formData,
        applied_by === "agency_member" ? "agency" : "freelancer"
      );
      if (code === 200) {
        if (socket) {
          socket.emit(
            "card_message",
            {
              sender_id: body.client_id,
              receiver_id: body.freelancer_id,
              message: " ",
              message_type: "offer",
              contract_ref: body._id,
            },
            {
              title: body.job_title,
              type: "job_offer",
              job_type: body.job_type,
              amount: body.hourly_rate || body.budget,
              url: {
                freelancer: `/message/offer?job_id=${body.job_id}&offer_id=${body._id}`,
                client: `/client-jobDetails/${body.job_id}`,
              },
            }
          );
        }
        toast({
          title: msg,
          duration: 3000,
          isClosable: true,
          status: code === 200 ? "success" : "warning",
          position: "top-right",
        });
        router.push("/client-dashboard");
      }
    } catch (error) {
      console.log(error);
      toast({
        title: error?.response?.data?.msg,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
    setIsContinue(false);
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  useEffect(() => {
    if (!location.state?.freelancerInfo) router.push("/client-dashboard");
  }, [location.state?.freelancerInfo, router]);

  return (
    <section className="w-[80%]">
      <FreelancerProfile />
      <form action="" onSubmit={handleSubmit}>
        <JobDetails setFormData={setFormData} formData={formData} />
        <ContractTerms setFormData={setFormData} formData={formData} />
        <div className="border border-[lightgray] rounded-xl mt-4 py-6 px-10 bg-white">
          <div className="">
            <Checkbox
              colorScheme="primary"
              checked={isChecked}
              onChange={handleCheckboxChange}
            >
              Yes, I understand and agree to the
            </Checkbox>
            <span className="text-green-500">Zeework Terms of Service</span>,
            including the <span className="text-green-500">User Agreement</span>{" "}
            and <span className="text-green-500">Privacy Policy</span>
          </div>
          <div className="font-semibold text-right flex items-center justify-end gap-10 mt-10">
            <div
              className="text-green-500 cursor-pointer"
              onClick={() => router(-1)}
            >
              Cancel
            </div>
            <button
              className={`py-2 px-5 text-white cursor-pointer rounded-full bg-green-500 w-fit flex items-center ${(!isChecked || isContinue) && "opacity-50 cursor-not-allowed"
                }`}
              disabled={!isChecked || isContinue}
            >
              {isContinue && <BtnSpinner />}
              Continue
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default HireFreelancerPage;
