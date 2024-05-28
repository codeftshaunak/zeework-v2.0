import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAgencyAllJobs, userAllJobs } from "../../helpers/APIs/jobApis";
import { getSingleJobDetails } from "../../helpers/APIs/jobApis";
import StarRatings from "react-star-ratings";
import JobDetailsSkeleton from "../Skeletons/JobDetailsSkeleton";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { LuBadgeX } from "react-icons/lu";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import UniversalModal from "../Modals/UniversalModal";
import { useForm } from "react-hook-form";
import { uploadImage } from "../../helpers/APIs/userApis";
import { agencyData, profileData } from "../../redux/authSlice/profileSlice";
import { Button } from "@chakra-ui/react";
import BtnSpinner from "../Skeletons/BtnSpinner";
import { IoMdCloudUpload } from "react-icons/io";
import {
  updateAgencyProfile,
  uploadSingleImage,
} from "../../helpers/APIs/agencyApis";

const JobDetails = ({ setPage, setDetails }) => {
  const profile = useSelector((state) => state.profile);
  const [cookies] = useCookies(["activeagency"]);
  const activeagency = cookies.activeagency;
  const { id } = useParams();
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [jobDetails, setJobDetails] = useState([]);
  const [isAlreadyApplied, setIsAlreadyApplied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isProfileImg = activeagency
    ? !!profile.agency.agency_profileImage
    : !!profile.profile.profile_image;
  const [isPopUp, setIsPopUp] = useState(false);
  const [isImgLoading, setIsImgLoading] = useState(false);
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  // upload profile photo of freelancer and agency
  const handleUploadPhoto = async (data) => {
    setIsImgLoading(true);
    try {
      // upload agency profile
      if (activeagency) {
        const formData = new FormData();
        formData.append("imageFile", data.file[0]);
        const { body: imgBody, code: imgCode } = await uploadSingleImage(
          formData
        );

        const { code, body } =
          imgCode === 200
            ? await updateAgencyProfile({
                agency_profileImage: imgBody.imageUrl,
              })
            : {};

        if (code === 200) {
          dispatch(agencyData({ agency: body }));
          setIsPopUp(false);
        }
      } else {
        // upload freelancer profile
        const formData = new FormData();
        formData.append("file", data.file[0]);

        const { code, body } = await uploadImage(formData);

        if (code === 200) {
          dispatch(profileData({ profile: body }));
          setIsPopUp(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
    setIsImgLoading(false);
  };

  const getDetails = async () => {
    setIsLoading(true);
    setJobDetails([]);
    try {
      const { code, body } = await getSingleJobDetails(id);
      if (code === 200) {
        setJobDetails(body);
        setDetails(body);
        const { applied_jobs } = activeagency
          ? await getAgencyAllJobs()
          : await userAllJobs();

        setIsAlreadyApplied(!!applied_jobs.find((item) => item?._id === id));
      }
    } catch (error) {
      console.error("Error fetching job Details:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getDetails();
  }, [id]);

  const dateObject = new Date(jobDetails[0]?.created_at);
  const currentTime = new Date();
  const timeDifference = currentTime - dateObject;

  const minutes = Math.floor((timeDifference / 1000 / 60) % 60);
  const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  // Construct the string representation
  const formattedTimeElapsed =
    days > 0
      ? `${days} day${days !== 1 ? "s" : ""} ago`
      : hours > 0
      ? `${hours} hour${hours !== 1 ? "s" : ""} ago`
      : `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;

  const clientDetails = jobDetails[0]?.client_details[0] || {};
  const {
    location,
    active_freelancers,
    hired_freelancers,
    total_amount_spend,
    job_open,
    avg_review,
    total_hours,
    job_posted,
    payment_verified,
  } = clientDetails;

  const hiredPercentage =
    (clientDetails?.hired_freelancers / clientDetails?.job_open) * 100;
  const clientHistory = jobDetails[0]?.client_history;
  const lastHistory = clientHistory?.slice(-1);

  // throwing job details skeleton
  if (isLoading || !jobDetails?.length) return <JobDetailsSkeleton />;

  return (
    <>
      <div className="w-full">
        <div className="py-2 w-full">
          <div className="flex gap-2 py-6">
            <Link to={"/"}>
              <img src="/icons/home.svg" alt="home" />
            </Link>
            <img src="/icons/chevron-right.svg" alt="arrow right" />
            <div className="capitalize">{jobDetails[0]?.title}</div>
          </div>
          <div className="w-full border border-tertiary rounded-2xl p-6 mb-4 bg-white ">
            <div className="flex justify-between items-center max-sm:flex-col max-sm:gap-2">
              <div className="flex flex-col gap-2 max-[570px]:flex-col max-sm:flex-row max-sm:items-center">
                <div className="flex max-[380px]:flex-col max-[380px]:items-center max-xl:flex-col">
                  <div className="font-semibold min-[380px]:mr-2 capitalize text-[20px]">
                    {jobDetails[0]?.title}{" "}
                  </div>
                  <div className="text-gray-300 mt-1 max-sm:mt-0 items-center flex">
                    {formattedTimeElapsed}
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex gap-2">
                    <img src="/icons/receipt.svg" alt="receipt" />{" "}
                    <div className="text-gray-300">
                      ${jobDetails[0]?.amount}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <img src="/icons/user.svg" alt="user" />{" "}
                    <div className="text-gray-300 capitalize">
                      {jobDetails[0]?.experience}
                    </div>
                  </div>
                </div>
              </div>
              {isAlreadyApplied ? (
                <button className=" bg-[#22c55e] text-secondary max-lg:text-[12px] font-semibold rounded h-[36px] px-4 disabled cursor-not-allowed leading-3">
                  You have already applied
                </button>
              ) : (
                <button
                  className="rounded font-semibold h-[36px] px-4 bg-[#22c55e] text-secondary"
                  onClick={() => {
                    if (isProfileImg) {
                      setPage(2);
                    } else {
                      setIsPopUp(true);
                    }
                  }}
                >
                  Apply for this job
                </button>
              )}
            </div>
          </div>
          <div className="w-full flex justify-between gap-4 lg:gap-0 lg:flex-row flex-col">
            <div className="w-full lg:w-[68%]">
              <div className="w-full border border-tertiary rounded-2xl p-6 capitalize bg-white h-max">
                <p className="font-semibold mb-6 text-xl">Details:</p>
                <div
                  className={
                    showJobDetails
                      ? "capitalize line-clamp-none"
                      : "capitalize line-clamp-4"
                  }
                  dangerouslySetInnerHTML={{
                    __html: jobDetails[0]?.description,
                  }}
                />
                <button
                  className={
                    jobDetails[0]?.description.length >= 350
                      ? "mt-4 text-[#16833E] underline"
                      : "hidden"
                  }
                  onClick={() => {
                    setShowJobDetails(!showJobDetails);
                  }}
                >
                  {showJobDetails ? "less" : "more"}
                </button>
                <div className="mt-10">
                  <p className="text-lg font-semibold mb-2">Attachments:</p>
                  <div>
                    <Link
                      to={jobDetails[0].file}
                      target="_blank"
                      className="text-[var(--primarycolor)]"
                    >
                      Attachment 1
                    </Link>
                  </div>
                </div>
              </div>
              <div className="w-full mt-4 border border-tertiary rounded-2xl p-6 bg-white h-max max-lg:block hidden">
                <div className="font-semibold mb-6 capitalize text-xl">
                  About the client
                </div>
                <div className="font-semibold">
                  Payment method{" "}
                  {payment_verified > 0 ? "verified" : "unverified"}
                </div>
                <div className="flex items-center mb-4">
                  {jobDetails?.length > 0 && (
                    <StarRatings
                      rating={Number(
                        jobDetails[0]?.client_details[0]?.avg_review
                      )}
                      starDimension="18px"
                      starSpacing="1px"
                      starRatedColor="#22C35E"
                      starEmptyColor="#d7f7e4"
                    />
                  )}
                  {avg_review} of {hired_freelancers} reviews
                </div>
                <div className="font-semibold">{location}</div>
                <div className="mb-4">01:18 am</div>
                <div className="font-semibold">{job_posted} jobs posted</div>
                <div className="mb-4">
                  {hiredPercentage.toFixed()}% hire rate, {job_open} open job
                </div>
                <div className="font-semibold">
                  ${total_amount_spend} total spent
                </div>
                <div className="mb-4">
                  {hired_freelancers} hire, {active_freelancers} active
                </div>
                <div className="font-semibold">
                  {hired_freelancers} hire, {active_freelancers} active
                </div>
                <div>{total_hours} hours</div>
              </div>
              <div className="w-full border border-tertiary rounded-2xl mt-4 bg-white">
                <div className="font-semibold p-6">Clients History</div>
                {clientHistory?.map(({ _id, title, amount, status }) => (
                  <div
                    key={_id}
                    className={
                      _id === lastHistory[0]._id
                        ? "border-b px-6 mb-4 bg-white border-transparent"
                        : "border-b px-6 mb-4 bg-white border-tertiary"
                    }
                  >
                    <Link to={`/find-job/${_id}`}>
                      <div className="font-semibold hover:text-blue-900">
                        {title}
                      </div>
                    </Link>

                    <div className="text-gray-200">
                      {status === "open" ? "Job in progress" : "Already done"}
                    </div>
                    <div className="w-full flex justify-between mb-4">
                      <div className="text-gray-300">Budget: ${amount}</div>
                      {/* <div className="text-gray-300">298 hrs @ $20.00</div> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full lg:w-[30%] border border-tertiary rounded-2xl p-6 bg-white h-max max-lg:hidden">
              <div className="font-semibold mb-6 capitalize text-xl">
                About the client
              </div>

              <div className="font-semibold flex items-center gap-1 mb-1">
                {payment_verified ? (
                  <RiVerifiedBadgeFill className="text-[#22C35E]" />
                ) : (
                  <LuBadgeX />
                )}
                <p>
                  Payment method {payment_verified ? "verified" : "unverified"}
                </p>
              </div>
              <div className="flex items-center mb-4">
                {jobDetails?.length > 0 && (
                  <StarRatings
                    rating={Number(
                      jobDetails[0]?.client_details[0]?.avg_review
                    )}
                    starDimension="18px"
                    starSpacing="1px"
                    starRatedColor="#22C35E"
                    starEmptyColor="#d7f7e4"
                  />
                )}
                {avg_review} of {hired_freelancers} reviews
              </div>
              <div className="font-semibold">{location}</div>
              <div className="mb-4">01:18 am</div>
              <div className="font-semibold">{job_posted} jobs posted</div>
              <div className="mb-4">
                {hiredPercentage.toFixed()}% hire rate, {job_open} open job
              </div>
              <div className="font-semibold">
                ${total_amount_spend} total spent
              </div>
              <div className="mb-4">
                {hired_freelancers} hire, {active_freelancers} active
              </div>
              <div className="font-semibold">
                {hired_freelancers} hire, {active_freelancers} active
              </div>
              <div>{total_hours} hours</div>
            </div>
          </div>
        </div>
      </div>

      {isPopUp && (
        <UniversalModal isModal={isPopUp} setIsModal={setIsPopUp}>
          <div className="grid gap-6 justify-center">
            <div className="w-[72px] h-[72px] flex items-center justify-center bg-green-50 rounded-full mx-auto">
              <IoMdCloudUpload className="text-4xl text-primary" />
            </div>
            <div className="text-gray-700 text-2xl font-medium font-['SF Pro Text'] leading-loose text-center mb-5">
              Upload your profile image before proceeding!
            </div>
          </div>
          <form onSubmit={handleSubmit(handleUploadPhoto)}>
            <div className="flex flex-col gap-[16px]">
              <div className="flex flex-col">
                <div className="flex flex-col gap-[2px]">
                  <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                    <input
                      {...register("file", {
                        required: "Please select an image!",
                      })}
                      type="file"
                      accept="image/*"
                      className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[var(--bordersecondary)] "
                      placeholder="Select an image"
                      onChange={() => trigger("file")}
                    />
                  </div>
                  {errors.file && (
                    <p className="text-sm text-red-500">
                      {errors.file.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="text-right mt-10">
              <Button
                isLoading={isImgLoading}
                loadingText="Uploading"
                colorScheme="primary"
                type="submit"
                paddingX={7}
                spinner={<BtnSpinner />}
              >
                Upload
              </Button>
            </div>
          </form>
        </UniversalModal>
      )}
    </>
  );
};

export default JobDetails;
