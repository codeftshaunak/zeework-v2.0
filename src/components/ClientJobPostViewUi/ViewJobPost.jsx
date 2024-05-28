import { Button, useToast } from "@chakra-ui/react";
import { format, formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { FiEdit2, FiUser } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { TbFileDollar } from "react-icons/tb";
import { useLocation, userouter, useParams } from "react-router-dom";
import UniversalModal from "../Modals/UniversalModal";
import { deleteJob, getSingleJobDetails } from "../../helpers/APIs/jobApis";
import BtnSpinner from "../Skeletons/BtnSpinner";
import { useSelector } from "react-redux";
import StarRatings from "react-star-ratings";
import { IoLocation } from "react-icons/io5";

const ViewJobPost = () => {
  const toast = useToast();
  const location = useLocation();
  const router = useRouter();

  const { id } = useParams();
  const [jobDetails, setJobDetails] = useState(
    location?.state?.jobDetails ? location?.state?.jobDetails : {}
  );
  // const jobDetails = location.state && location?.state?.jobDetails;
  const [isModalType, setIsModalType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const profile = useSelector((state) => state.profile.profile) || {};
  const {
    avg_review,
    total_amount_spend,
    active_freelancers,
    hired_freelancers,
    job_open,
    job_posted,
    payment_verified,
    location: clientLocation,
  } = profile;
  const hireRate = ((hired_freelancers / job_posted) * 100).toFixed(0);
  const { _id, amount, description, experience, title } = jobDetails || [];

  const currentDate = new Date();
  const formattedTime = format(currentDate, "HH:mm");

  const createdAtAgo =
    jobDetails?.created_at &&
    formatDistanceToNow(new Date(jobDetails?.created_at), { addSuffix: true });

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await deleteJob(_id);
      if (response)
        toast({
          title: "Job post deleted successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      router.push("/client-dashboard");
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to delete job post!",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
    setIsModalType(null);
    setIsLoading(false);
  };

  const getJobDetails = async () => {
    if (jobDetails?._id) return;
    try {
      const { body, code } = await getSingleJobDetails(id);
      if (code === 200) setJobDetails(body[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getJobDetails();
  }, []);
  return (
    <>
      <div className="flex flex-col gap-8 md:flex-row w-full">
        <div className="border rounded-lg basis-full md:basis-3/4 border-slate-300 w-full bg-white">
          <div className="border-b">
            <div className="p-6 space-y-2">
              <h2 className="text-base font-semibold text-[#374151]">
                {title}
                <span className="text-sm ml-3 font-medium text-[#6B7280]">
                  Posted {createdAtAgo}
                </span>
              </h2>
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <TbFileDollar />
                  <p>${amount}.00</p>
                </div>
                <div className="flex items-center gap-2">
                  <FiUser />
                  <p>{experience}</p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="p-6 space-y-0"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
        <div className="mt-4 border rounded-lg basis-full md:mt-0 md:basis-1/4 border-slate-300 bg-white h-fit">
          <div className="p-6 border-b ">
            <div className="space-y-3">
              <div
                className="flex items-center gap-2 cursor-pointer w-fit hover:text-[var(--primarycolor)] transition"
                onClick={() => setIsModalType("update")}
              >
                <FiEdit2 className="text-[var(--primarycolor)]" />
                <p className="text-sm">Edit posting</p>
              </div>
              {/* <div className="flex items-center gap-2">
              <FiEye className="text-[var(--primarycolor)]" />
              <p className="text-sm">View posting</p>
            </div>
            <div className="flex items-center gap-2">
              <LiaRetweetSolid className="text-[var(--primarycolor)]" />
              <p className="text-sm">Reuse posting</p>
            </div> */}
              <div
                className="flex items-center gap-2 cursor-pointer w-fit hover:text-[var(--primarycolor)] transition"
                onClick={() => setIsModalType("delete")}
              >
                <RxCross1 className="text-[var(--primarycolor)]" />
                <p className="text-sm">Remove posting</p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-3 tracking-wide">
            <div>
              <h2 className="text-[#374151] text-lg font-semibold">
                About Yourself
              </h2>
            </div>
            <div>
              <h2 className="text-[#374151] text-base font-semibold ">
                Payment method {payment_verified ? "verified" : "unverified"}
              </h2>
              <div className="text-[#374151] text-sm flex items-center gap-1">
                <StarRatings
                  rating={avg_review}
                  starDimension="16px"
                  starSpacing="1px"
                  starRatedColor="#22C35E"
                  starEmptyColor="#d7f7e4"
                />
                <span className="ml-2">{avg_review}</span>
              </div>
            </div>
            <div>
              <h2 className="text-[#374151] text-base font-semibold flex items-center">
                <IoLocation /> {clientLocation}
              </h2>
              <p className="text-[#374151] text-sm">{formattedTime}</p>
            </div>
            <div>
              <h2 className="text-[#374151] text-base font-semibold ">
                {job_posted} jobs posted
              </h2>
              <p className="text-[#374151] text-sm">
                {hireRate}% hire rate, {job_open} open job
              </p>
            </div>
            <div>
              <h2 className="text-[#374151] text-base font-semibold ">
                ${total_amount_spend} total spent
              </h2>
              <p>
                {hired_freelancers} hire, {active_freelancers} active
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Delete and Update Job Post */}
      <UniversalModal isModal={isModalType} setIsModal={setIsModalType}>
        {isModalType === "delete" && (
          <>
            <p className="text-xl sm:text-2xl font-semibold">
              Are you sure you want to delete this job?
            </p>

            <div className="flex gap-5 sm:gap-10 mt-8 sm:mt-20">
              <Button
                colorScheme="primary"
                variant={"outline"}
                width={"full"}
                onClick={() => setIsModalType(null)}
              >
                No, I don&apos;t want to Delete
              </Button>
              <Button
                isLoading={isLoading}
                loadingText=" Yes, I want to Delete"
                colorScheme="primary"
                width={"full"}
                spinner={<BtnSpinner />}
                onClick={handleDelete}
              >
                Yes, I want to Delete
              </Button>
            </div>
          </>
        )}
        {isModalType === "update" && (
          <>
            <p className="text-xl sm:text-2xl font-semibold">
              Are you sure you want to update this job?
            </p>

            <div className="flex gap-5 sm:gap-10 mt-8 sm:mt-20">
              <Button
                colorScheme="primary"
                variant={"outline"}
                width={"full"}
                onClick={() => setIsModalType(null)}
              >
                No, I don&apos;t want to Update
              </Button>
              <Button
                isLoading={isLoading}
                colorScheme="primary"
                width={"full"}
                loadingText=" Yes, I want to Update"
                spinner={<BtnSpinner />}
                onClick={() =>
                  router(`/client-job-update/${_id}`, {
                    state: { jobDetails: jobDetails },
                  })
                }
              >
                Yes, I want to Update
              </Button>
            </div>
          </>
        )}
      </UniversalModal>
    </>
  );
};

export default ViewJobPost;
