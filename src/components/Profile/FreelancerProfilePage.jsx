import { useEffect, useState } from "react";
import ProfileContainer from "./ProfileContainer";
import SkillCard from "./SkillCard";
import { BsLink45Deg, BsPlus } from "react-icons/bs";
import PortfolioCard from "./PortfolioCard";
import ReviewCard from "./ReviewCard";
import { HStack, VStack, Avatar, Text, useToast } from "@chakra-ui/react";
import { CiLocationOn } from "react-icons/ci";
import { formatTime, getUserLocation } from "../../helpers/APIs/formet";
import { ProfileModal } from "./ProfileModal";
import AlertDeleteDialog from "./DeleteModal";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ProfileGigCards } from "../Gigs/SingleGig/ProfileGigCards";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
// import required modules
import { FreeMode, Pagination } from "swiper/modules";
import { getWorkHistory } from "../../helpers/APIs/freelancerApis";
import { getAssociatedAgency } from "../../helpers/APIs/agencyApis";
import { RiCloseCircleFill, RiVerifiedBadgeFill } from "react-icons/ri";
import { format } from "date-fns";
import { MainButtonRounded } from "../Button/MainButton";

export const FreelancerProfilePage = ({ viewAs }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalPage, setModalPage] = useState("");
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [workHistory, setWorkHistory] = useState([]);
  const [id, setId] = useState({ id: "", type: "" });
  const [associateAgency, setAssociateAgency] = useState({});

  const profile = useSelector((state) => state.profile);
  const {
    firstName,
    lastName,
    profile_image,
    location,
    professional_role,
    hourly_rate,
    description,
    skills,
    experience,
    education,
    portfolio,
  } = profile.profile || [];

  const [localTime, setLocalTime] = useState();
  const toast = useToast();
  function openModal() {
    setModalIsOpen(true);
  }

  const findWorkHistory = async () => {
    try {
      const { code, body } = await getWorkHistory();
      if (code === 200) setWorkHistory(body);
    } catch (error) {
      console.error(error);
    }
  };

  const associatedAgency = async () => {
    try {
      const { code, body } = await getAssociatedAgency();
      if (code === 200) setAssociateAgency(body);
    } catch (error) {
      console.error(error);
    }
  };

  async function getCurrentTimeAndLocation() {
    try {
      const currentDate = new Date();
      const currentTime = formatTime(currentDate);
      const location = await getUserLocation();
      setLocalTime(currentTime);
      return console.log(
        `${location.latitude}, ${location.longitude} - ${currentTime} local time`
      );
    } catch (error) {
      return error;
    }
  }

  setTimeout(() => {
    getCurrentTimeAndLocation();
  }, 1000);

  function closeModal() {
    setModalIsOpen(false);
    setModalPage("");
  }

  const [storedData, setStoredData] = useState(null);
  const openEditModal = (edu) => {
    setStoredData(edu);
    setModalPage("Update Education");
    openModal();
  };

  const openEditBasicModal = (title, rate, desc) => {
    const basicInformation = {
      professional_role: title,
      hourly_rate: rate,
      description: desc,
    };
    setStoredData(basicInformation);
    setModalPage("Basic Information");
    openModal();
  };

  const openExperienceEditModal = (edu) => {
    setStoredData(edu);
    setModalPage("experienceUpdated");
    openModal();
  };

  const openEditSkills = () => {
    setStoredData(skills);
    setModalPage("skills");
    openModal();
  };

  const handleDelete = (id, type) => {
    setId({ id, type });
    setDeleteModalOpen(true);
  };

  const handleCopyProfileURL = () => {
    const profileURL = `${window.location.origin}/freelancer/${profile?.profile?.user_id}`;
    navigator.clipboard.writeText(profileURL);

    toast({
      title: "Zeework Profile Copied.",
      status: "success",
      duration: 3000,
      position: "top",
      isClosable: true,
    });
  };

  useEffect(() => {
    findWorkHistory();
    associatedAgency();
  }, []);

  return (
    <ProfileContainer>
      <div className="w-[100%] justify-center m-auto flex flex-col gap-[24px]">
        <div className="w-[100%] bg-white flex items-center justify-between border-[1px] py-8 px-[24px] border-[var(--bordersecondary)] rounded-lg max-sm:flex-col max-sm:gap-4">
          <div className="flex gap-[14px] items-center max-[380px]:gap-0">
            <div style={{ position: "relative", padding: "10px" }}>
              {!viewAs && (
                <div
                  style={{
                    position: "absolute",
                    top: "0px",
                    left: "0px",
                    cursor: "pointer",
                    zIndex: "1",
                  }}
                >
                  <div
                    className="flex items-center justify-center w-8 h-8 bg-[#F9FAFB] rounded-[6px] border-[1px] border-[var(--bordersecondary)]"
                    onClick={() => {
                      setModalPage("Update profile photo");
                      openModal();
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M2.66699 13.3332H5.33366L12.3337 6.33321C13.07 5.59683 13.07 4.40292 12.3337 3.66654C11.5973 2.93016 10.4034 2.93016 9.66699 3.66654L2.66699 10.6665V13.3332"
                        stroke="#6B7280"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 4.33301L11.6667 6.99967"
                        stroke="#6B7280"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              )}

              {!profile_image ||
                profile_image == "null" ||
                profile_image === null ? (
                <Avatar
                  name={firstName + " " + lastName}
                  width={"60px"}
                  height={"60px"}
                />
              ) : (
                <img
                  src={profile_image}
                  className="w-[60px] object-cover h-[60px] rounded-full shadow-md"
                />
              )}
            </div>
            <div className="flex flex-col justify-start">
              <p className="text-[24px] max-[380px]:text-sm text-[#374151] font-semibold pl-3">
                {firstName + " " + lastName?.slice(0, 1) + "."}
              </p>
              <HStack className="text-[16px] max-[380px]:text-xs text-[#374151] font-[400]">
                <CiLocationOn />
                <p className="capitalize">
                  {location}, {localTime} local time
                </p>
              </HStack>
            </div>
          </div>
          <div className="flex items-center gap-[12px]">
            <div
              className="flex items-center cursor-pointer justify-center w-[36px] h-[36px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[var(--bordersecondary)] max-sm:hidden"
              onClick={handleCopyProfileURL}
            >
              <BsLink45Deg width={"20px"} height={"20px"} />
            </div>
            {!viewAs && (
              <button
                className="py-[8px] px-[12px] rounded-[6px] text-[14px] font-500 text-[#fff] bg-[#22C55E]"
                onClick={() => navigate("/setting")}
              >
                Profile Settings
              </button>
            )}
          </div>
        </div>

        <div className="flex gap-[24px] w-full">
          <div className="flex w-[30%] gap-[24px] flex-col max-lg:hidden">
            {/* ==================== Freelance Stats ====================== */}
            <div className="w-full flex py-6 bg-white  relative flex-col gap-[24px] border-[1px] px-[24px] border-[var(--bordersecondary)] rounded-lg">
              <p className="text-[20px] text-[#374151] font-[600]">
                Freelance Stats
              </p>
              <VStack
                backgroundColor={"#f4f5f787"}
                height={"80px"}
                shadow={"sm"}
                justifyContent={"center"}
              >
                <Text fontWeight={"600"} top={"8rem"} textAlign={"center"}>
                  Updated Freelancer Stats <br /> Coming Soon
                </Text>
              </VStack>
            </div>

            {/* ==================== View associated agency ====================== */}
            {associateAgency?.agency_details && (
              <div className="w-full flex py-6 bg-white  relative flex-col gap-3 border-[1px] px-[24px] border-[var(--bordersecondary)] rounded-lg">
                <p className="text-[20px] text-[#374151] font-[600]">
                  Associate with
                </p>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <Avatar
                    name={associateAgency?.agency_details?.agency_name}
                    src={associateAgency?.agency_details?.agency_profileImage}
                  />
                  <div className="text-gray-600">
                    <p
                      className="font-medium text-primary flex items-center gap-1 cursor-pointer"
                      onClick={() =>
                        navigate(`/agency/${associateAgency?.agency_id}`)
                      }
                    >
                      {associateAgency?.agency_details?.agency_name}{" "}
                      {associateAgency?.agency_details?.agency_officeLocation
                        ?.country &&
                        `from ${associateAgency?.agency_details?.agency_officeLocation?.country}`}
                      {/* {associateAgency?.agency_details?.agency_verified && (
                      <RiVerifiedBadgeFill />
                    )} */}
                    </p>
                    <p className="flex items-center gap-1 font-medium">
                      From{" "}
                      {format(new Date(associateAgency?.join_date), "MM/yy")} to{" "}
                      {associateAgency?.leave_date
                        ? format(new Date(associateAgency.leave_date), "MM/yy")
                        : "Present"}
                    </p>
                    {/* <p className="flex items-baseline gap-1">
                      <span className="font-semibold">{100}%</span>{" "}
                      <span className="text-sm">Job Success</span>
                    </p> */}
                  </div>
                </div>
              </div>
            )}

            {/* ==================== Education ====================== */}
            <div className="flex w-full flex-col gap-[24px] border-[1px] py-8 px-[24px] border-[var(--bordersecondary)] rounded-lg bg-white">
              <div className="flex items-center justify-between">
                <p className="text-[20px] text-[#374151] font-[600]">
                  Education
                </p>
                {!viewAs && (
                  <div className="flex items-center justify-center w-[28px] h-[28px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[var(--bordersecondary)]">
                    <BsPlus
                      width={"16px"}
                      height={"16px"}
                      cursor={"pointer"}
                      onClick={() => {
                        setModalPage("education");
                        openModal();
                      }}
                    />
                  </div>
                )}
              </div>
              {education?.length > 0 &&
                education?.map((edu, index) => (
                  <div className="flex flex-col gap-[8px]" key={index}>
                    <div className="flex items-center justify-between">
                      <p className="text-[16px] text-[#374151] font-[600]">
                        {edu?.institution}
                      </p>
                      <div className="flex items-center gap-[12px]">
                        {!viewAs && (
                          <div
                            className="flex items-center justify-center w-[28px] h-[28px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[var(--bordersecondary)] cursor-pointer"
                            onClick={() => {
                              openEditModal(edu);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                            >
                              <path
                                d="M2.66699 13.3332H5.33366L12.3337 6.33321C13.07 5.59683 13.07 4.40292 12.3337 3.66654C11.5973 2.93016 10.4034 2.93016 9.66699 3.66654L2.66699 10.6665V13.3332"
                                stroke="#6B7280"
                                strokeWidth="1.25"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M9 4.33301L11.6667 6.99967"
                                stroke="#6B7280"
                                strokeWidth="1.25"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        )}
                        {!viewAs && (
                          <div
                            className="flex items-center justify-center w-[28px] h-[28px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[var(--bordersecondary)] cursor-pointer"
                            onClick={() => handleDelete(edu._id, "education")}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                            >
                              <path
                                d="M9.33333 7.33301V11.333"
                                stroke="#6B7280"
                                strokeWidth="1.25"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M6.66634 7.33301V11.333"
                                stroke="#6B7280"
                                strokeWidth="1.25"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M2.66699 4.66634H13.3337"
                                stroke="#6B7280"
                                strokeWidth="1.25"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M3.33301 4.66699L3.99967 12.667C3.99967 13.4034 4.59663 14.0003 5.33301 14.0003H10.6663C11.4027 14.0003 11.9997 13.4034 11.9997 12.667L12.6663 4.66699"
                                stroke="#6B7280"
                                strokeWidth="1.25"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M6 4.66667V2.66667C6 2.29848 6.29848 2 6.66667 2H9.33333C9.70152 2 10 2.29848 10 2.66667V4.66667"
                                stroke="#6B7280"
                                strokeWidth="1.25"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-[14px] text-[#374151] font-[400]">
                      {edu?.degree_name}
                    </p>
                    <p className="text-[14px] text-[#374151] font-[400]">
                      {edu?.end_date}
                    </p>
                  </div>
                ))}
            </div>
            {/* ==================== Education ====================== */}
            {/* ==================== Experience ====================== */}
            <div className="flex flex-col gap-[24px] border-[1px] py-8 px-[24px] border-[var(--bordersecondary)] rounded-lg  bg-white">
              <div className="flex items-center justify-between">
                <p className="text-[20px] text-[#374151] font-[600]">
                  Experience
                </p>
                {!viewAs && (
                  <div className="flex items-center justify-center w-[28px] h-[28px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[var(--bordersecondary)]">
                    <BsPlus
                      width={"16px"}
                      height={"16px"}
                      cursor={"pointer"}
                      onClick={() => {
                        setModalPage("experience");
                        openModal();
                      }}
                    />
                  </div>
                )}
              </div>
              {experience?.length > 0 &&
                experience?.map((experience, index) => {
                  const startDate = new Date(experience.start_date);
                  const endDate = new Date(experience.end_date);
                  const startYear = startDate.getFullYear();
                  const endYear = endDate.getFullYear();
                  return (
                    <div className="flex flex-col gap-[8px]" key={index}>
                      <div className="flex items-center justify-between">
                        <p className="text-[16px] text-[#374151] font-[600]">
                          {experience?.company_name}
                        </p>
                        <div className="flex items-center gap-[12px]">
                          {!viewAs && (
                            <div
                              className="flex items-center justify-center w-[28px] h-[28px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[var(--bordersecondary)] cursor-pointer"
                              onClick={() => {
                                openExperienceEditModal(experience);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                              >
                                <path
                                  d="M2.66699 13.3332H5.33366L12.3337 6.33321C13.07 5.59683 13.07 4.40292 12.3337 3.66654C11.5973 2.93016 10.4034 2.93016 9.66699 3.66654L2.66699 10.6665V13.3332"
                                  stroke="#6B7280"
                                  strokeWidth="1.25"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M9 4.33301L11.6667 6.99967"
                                  stroke="#6B7280"
                                  strokeWidth="1.25"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          )}
                          {!viewAs && (
                            <div
                              className="flex items-center justify-center w-[28px] h-[28px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[var(--bordersecondary)] cursor-pointer"
                              onClick={() =>
                                handleDelete(experience._id, "experience")
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                              >
                                <path
                                  d="M9.33333 7.33301V11.333"
                                  stroke="#6B7280"
                                  strokeWidth="1.25"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M6.66634 7.33301V11.333"
                                  stroke="#6B7280"
                                  strokeWidth="1.25"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M2.66699 4.66634H13.3337"
                                  stroke="#6B7280"
                                  strokeWidth="1.25"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M3.33301 4.66699L3.99967 12.667C3.99967 13.4034 4.59663 14.0003 5.33301 14.0003H10.6663C11.4027 14.0003 11.9997 13.4034 11.9997 12.667L12.6663 4.66699"
                                  stroke="#6B7280"
                                  strokeWidth="1.25"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M6 4.66667V2.66667C6 2.29848 6.29848 2 6.66667 2H9.33333C9.70152 2 10 2.29848 10 2.66667V4.66667"
                                  stroke="#6B7280"
                                  strokeWidth="1.25"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="text-[14px] text-[#374151]  font-bold">
                        {experience?.position}
                      </p>
                      <p className="text-[14px] text-[#374151] font-[400]">
                        {experience?.job_location} | {startYear} to {endYear}
                      </p>
                      <p className="text-[14px] text-[#374151] font-[400]">
                        {experience?.job_description}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="w-full lg:w-[70%] flex flex-col gap-[24px]">
            {/* ==================== Basic info ====================== */}
            <div className="flex flex-col gap-5  border-[1px] py-8 px-[24px] border-[var(--bordersecondary)] rounded-lg bg-white">
              <div className="flex gap-[16px] justify-between">
                <p className="text-[20px] text-[#374151] font-[600] w-[100%]">
                  {professional_role}
                </p>

                <div className="flex gap-5">
                  <p className="text-[20px] text-[#374151] font-[600]">
                    ${hourly_rate}/hr
                  </p>
                  {!viewAs && (
                    <div
                      className="flex items-center justify-center w-[28px] h-[28px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[var(--bordersecondary)] cursor-pointer"
                      onClick={() => {
                        openEditBasicModal(
                          professional_role,
                          hourly_rate,
                          description
                        );
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M2.66699 13.3332H5.33366L12.3337 6.33321C13.07 5.59683 13.07 4.40292 12.3337 3.66654C11.5973 2.93016 10.4034 2.93016 9.66699 3.66654L2.66699 10.6665V13.3332"
                          stroke="#6B7280"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9 4.33301L11.6667 6.99967"
                          stroke="#6B7280"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              <div className="h-max">
                <div
                  className={`${showDetails ? "line-clamp-none" : "line-clamp-3"
                    }`}
                  dangerouslySetInnerHTML={{ __html: description }}
                ></div>
                <button
                  className={`${description.length >= 300
                    ? "underline text-[#16833E]"
                    : "hidden"
                    } `}
                  onClick={() => {
                    setShowDetails(!showDetails);
                  }}
                >
                  {showDetails ? "less" : "more"}
                </button>
              </div>
            </div>
            {/* ===================== skills ============= */}
            <div className="flex flex-col gap-[24px]  border-[1px] py-8 px-[24px] border-[var(--bordersecondary)] rounded-lg bg-white">
              {!viewAs && (
                <div className="flex items-center justify-between">
                  <p className="text-[20px] text-[#374151] font-[600]">
                    Skills
                  </p>
                  <div
                    className="flex items-center justify-center w-[28px] h-[28px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[var(--bordersecondary)] cursor-pointer"
                    onClick={() => openEditSkills()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M2.66699 13.3332H5.33366L12.3337 6.33321C13.07 5.59683 13.07 4.40292 12.3337 3.66654C11.5973 2.93016 10.4034 2.93016 9.66699 3.66654L2.66699 10.6665V13.3332"
                        stroke="#6B7280"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 4.33301L11.6667 6.99967"
                        stroke="#6B7280"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-3 gap-4 max-sm:grid-cols-1">
                {skills?.length > 0 &&
                  skills?.map((skill, idx) => {
                    return <SkillCard title={skill} key={idx} />;
                  })}
              </div>
            </div>
            {/* ======================= portfolio =============== */}
            <>
              {" "}
              <div className="flex flex-col gap-[24px]  border-[1px] py-8 px-[24px] border-[var(--bordersecondary)] rounded-lg bg-white">
                <div className="flex items-center justify-between">
                  <p className="text-[20px] text-[#374151] font-[600]">
                    Portfolio Projects
                  </p>
                  {!viewAs && (
                    <div
                      className="flex items-center justify-center w-[28px] h-[28px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[var(--bordersecondary)] cursor-pointer"
                      onClick={() => {
                        setModalPage("Add new project");
                        openModal();
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M8.00033 3.33301V12.6663"
                          stroke="#6B7280"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M3.33301 8.00033H12.6663"
                          stroke="#6B7280"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="-z-0">
                  {portfolio?.length ? (
                    <Swiper
                      slidesPerView={1}
                      spaceBetween={30}
                      freeMode={true}
                      breakpoints={{
                        768: {
                          // width: 768,
                          slidesPerView: 2,
                        },
                        1024: {
                          // width: 1024,
                          slidesPerView: 3,
                        },
                      }}
                      pagination={{
                        clickable: true,
                      }}
                      modules={[FreeMode, Pagination]}
                    >
                      {portfolio?.length > 0 &&
                        portfolio?.map((port, idx) => (
                          <SwiperSlide key={idx}>
                            <PortfolioCard
                              key={idx}
                              portfolio={port}
                              categories={profile?.profile?.categories}
                            />
                          </SwiperSlide>
                        ))}
                    </Swiper>
                  ) : (
                    <div className="flex justify-center">
                      <button
                        className="text-start px-3 py-1 rounded-md border-2 border-[var(--primarytextcolor)] hover:text-white hover:bg-[var(--primarytextcolor)] transition h-fit w-fit font-semibold mt-3"
                        onClick={() => {
                          setModalPage("Add new project");
                          openModal();
                        }}
                      >
                        Add Portfolio For Attract Client & Get Offer
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
            {/* ==================== GIGS ====================== */}
            <div className="flex flex-col gap-[24px]  border-[1px] pt-[20px] px-[24px] border-[var(--bordersecondary)] rounded-lg bg-white">
              <div>
                <p className="text-[20px] text-[#374151] font-[600] pb-3">
                  {viewAs ? "Freelancer Gigs" : "Your Gigs"}
                </p>
                <hr />
                <br />
                <p className="mt-3">
                  Projects are a new way to earn on ZeeWork that helps you do
                  more of the work you love to do. Create project offerings that
                  highlight your strengths and attract more clients.
                </p>
                <br />
                {!viewAs && (
                  <button
                    className="text-start px-5 py-1 rounded-full border-2 border-[var(--primarytextcolor)] hover:text-white hover:bg-[var(--primarytextcolor)] transition h-fit w-fit font-semibold mt-3"
                    onClick={() => navigate("/freelancer/gig")}
                  >
                    Manage Gigs
                  </button>
                )}
                <div className="mt-10 w-full">
                  <ProfileGigCards />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4"></div>
            </div>

            <div className="hidden flex-[0.5] gap-[24px] flex-col w-full max-lg:flex">
              <div className="flex flex-col gap-[24px] border-[1px] py-8 px-[24px] border-[var(--bordersecondary)] rounded-lg bg-white">
                <div className="flex items-center justify-between">
                  <p className="text-[20px] text-[#374151] font-[600]">
                    Education
                  </p>
                  {!viewAs && (
                    <div className="flex items-center justify-center w-[28px] h-[28px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[var(--bordersecondary)]">
                      <BsPlus
                        width={"16px"}
                        height={"16px"}
                        cursor={"pointer"}
                        onClick={() => {
                          setModalPage("education");
                          openModal();
                        }}
                      />
                    </div>
                  )}
                </div>
                {education?.length > 0 &&
                  education?.map((edu, index) => (
                    <div className="flex flex-col gap-[8px]" key={index}>
                      <div className="flex items-center justify-between">
                        <p className="text-[16px] text-[#374151] font-[600]">
                          {edu?.institution}
                        </p>
                        <div className="flex items-center gap-[12px]">
                          {!viewAs && (
                            <div
                              className="flex items-center justify-center w-[28px] h-[28px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[var(--bordersecondary)] cursor-pointer"
                              onClick={() => {
                                openEditModal(edu);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                              >
                                <path
                                  d="M2.66699 13.3332H5.33366L12.3337 6.33321C13.07 5.59683 13.07 4.40292 12.3337 3.66654C11.5973 2.93016 10.4034 2.93016 9.66699 3.66654L2.66699 10.6665V13.3332"
                                  stroke="#6B7280"
                                  strokeWidth="1.25"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M9 4.33301L11.6667 6.99967"
                                  stroke="#6B7280"
                                  strokeWidth="1.25"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          )}
                          {!viewAs && (
                            <div
                              className="flex items-center justify-center w-[28px] h-[28px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[var(--bordersecondary)] cursor-pointer"
                              onClick={() => handleDelete(edu._id, "education")}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                              >
                                <path
                                  d="M9.33333 7.33301V11.333"
                                  stroke="#6B7280"
                                  strokeWidth="1.25"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M6.66634 7.33301V11.333"
                                  stroke="#6B7280"
                                  strokeWidth="1.25"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M2.66699 4.66634H13.3337"
                                  stroke="#6B7280"
                                  strokeWidth="1.25"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M3.33301 4.66699L3.99967 12.667C3.99967 13.4034 4.59663 14.0003 5.33301 14.0003H10.6663C11.4027 14.0003 11.9997 13.4034 11.9997 12.667L12.6663 4.66699"
                                  stroke="#6B7280"
                                  strokeWidth="1.25"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M6 4.66667V2.66667C6 2.29848 6.29848 2 6.66667 2H9.33333C9.70152 2 10 2.29848 10 2.66667V4.66667"
                                  stroke="#6B7280"
                                  strokeWidth="1.25"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="text-[14px] text-[#374151] font-[400]">
                        {edu?.degree_name}
                      </p>
                      <p className="text-[14px] text-[#374151] font-[400]">
                        {edu?.end_date}
                      </p>
                    </div>
                  ))}
              </div>
              <div className="flex flex-col gap-[24px] border-[1px] py-8 px-[24px] border-[var(--bordersecondary)] rounded-lg bg-white">
                <div className="flex items-center justify-between">
                  <p className="text-[20px] text-[#374151] font-[600]">
                    Experience
                  </p>
                  {!viewAs && (
                    <div className="flex items-center justify-center w-[28px] h-[28px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[var(--bordersecondary)]">
                      <BsPlus
                        width={"16px"}
                        height={"16px"}
                        cursor={"pointer"}
                        onClick={() => {
                          setModalPage("experience");
                          openModal();
                        }}
                      />
                    </div>
                  )}
                </div>
                {experience?.length > 0 &&
                  experience?.map((experience, index) => {
                    const startDate = new Date(experience.start_date);
                    const endDate = new Date(experience.end_date);
                    const startYear = startDate.getFullYear();
                    const endYear = endDate.getFullYear();
                    return (
                      <div className="flex flex-col gap-[8px]" key={index}>
                        <div className="flex items-center justify-between">
                          <p className="text-[16px] text-[#374151] font-[600]">
                            {experience?.company_name}
                          </p>
                          <div className="flex items-center gap-[12px]">
                            {!viewAs && (
                              <div
                                className="flex items-center justify-center w-[28px] h-[28px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[var(--bordersecondary)] cursor-pointer"
                                onClick={() => {
                                  openExperienceEditModal(experience);
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                >
                                  <path
                                    d="M2.66699 13.3332H5.33366L12.3337 6.33321C13.07 5.59683 13.07 4.40292 12.3337 3.66654C11.5973 2.93016 10.4034 2.93016 9.66699 3.66654L2.66699 10.6665V13.3332"
                                    stroke="#6B7280"
                                    strokeWidth="1.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M9 4.33301L11.6667 6.99967"
                                    stroke="#6B7280"
                                    strokeWidth="1.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                            )}
                            {!viewAs && (
                              <div
                                className="flex items-center justify-center w-[28px] h-[28px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[var(--bordersecondary)] cursor-pointer"
                                onClick={() =>
                                  handleDelete(experience._id, "experience")
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                >
                                  <path
                                    d="M9.33333 7.33301V11.333"
                                    stroke="#6B7280"
                                    strokeWidth="1.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M6.66634 7.33301V11.333"
                                    stroke="#6B7280"
                                    strokeWidth="1.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M2.66699 4.66634H13.3337"
                                    stroke="#6B7280"
                                    strokeWidth="1.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M3.33301 4.66699L3.99967 12.667C3.99967 13.4034 4.59663 14.0003 5.33301 14.0003H10.6663C11.4027 14.0003 11.9997 13.4034 11.9997 12.667L12.6663 4.66699"
                                    stroke="#6B7280"
                                    strokeWidth="1.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M6 4.66667V2.66667C6 2.29848 6.29848 2 6.66667 2H9.33333C9.70152 2 10 2.29848 10 2.66667V4.66667"
                                    stroke="#6B7280"
                                    strokeWidth="1.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="text-[14px] text-[#374151]  font-bold">
                          {experience?.position}
                        </p>
                        <p className="text-[14px] text-[#374151] font-[400]">
                          {experience?.job_location} | {startYear} to {endYear}
                        </p>
                        <p className="text-[14px] text-[#374151] font-[400]">
                          {experience?.job_description}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div>
            {/* ================= work history ====================== */}
            <div className="border-[1px] pt-8 overflow-hidden border-[var(--bordersecondary)] bg-white rounded-xl">
              <div className="flex flex-col gap-6 px-6 ">
                {" "}
                <div className="flex items-center justify-between">
                  <p className="text-[20px] text-[#374151] font-[600]">
                    Work History
                  </p>
                </div>
                <div className="flex flex-col gap-[6px]">
                  <p className="text-[14px] text-[#22C35E] font-[600] cursor-pointer">
                    Completed Jobs
                  </p>
                  <div className="h-[2px] w-[60px] bg-[#22C35E]"></div>
                </div>
              </div>

              {workHistory.length ? (
                workHistory?.map((item, index) => (
                  <ReviewCard key={index} workDetails={item} />
                ))
              ) : (
                <p className="p-6 text-center">No completed jobs yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <ProfileModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        modalPage={modalPage}
        storedData={storedData}
        inputChange={setStoredData}
        setModalIsOpen={setModalIsOpen}
      />
      {deleteModalOpen ? (
        <AlertDeleteDialog
          modalIsOpen={setDeleteModalOpen}
          id={id}
          deleteModalPage={modalPage}
          setModalIsOpen={setDeleteModalOpen}
        />
      ) : (
        <></>
      )}
    </ProfileContainer>
  );
};
