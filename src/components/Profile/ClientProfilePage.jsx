import React, { useEffect, useState, useCallback } from "react";
import ProfileContainer from "./ProfileContainer";
import { BsLink45Deg } from "react-icons/bs";
import {
  Box,
  Button,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import ReviewCard from "./ReviewCard";
import { HStack, Avatar } from "@chakra-ui/react";
import { getAllDetailsOfUser, uploadImage } from "../../helpers/APIs/userApis";
import { CiLocationOn } from "react-icons/ci";
import { formatTime, getUserLocation } from "../../helpers/APIs/formet";
import { useRouter } from 'next/router';
import { getWorkHistory } from "../../helpers/APIs/freelancerApis";
import { useDispatch, useSelector } from "react-redux";
import UniversalModal from "../Modals/UniversalModal";
import { useForm } from "react-hook-form";
import BtnSpinner from "../Skeletons/BtnSpinner";
import { profileData } from "../../redux/authSlice/profileSlice";
import { updateClientProfile } from "../../helpers/APIs/clientApis";
import { useDropzone } from "react-dropzone";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../helpers/image/getCroppedImg";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { TiArrowBack, TiMinus, TiPlus, TiZoom } from "react-icons/ti";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { BiSolidCrop } from "react-icons/bi";

export const ClientProfilePage = () => {
  const profile = useSelector((state) => state.profile.profile);
  const [workHistory, setWorkHistory] = useState([]);
  const router = useRouter();

  const toast = useToast();
  const role = useSelector((state) => state.auth.role);
  const [isModal, setIsModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const dispatch = useDispatch();

  // include drag and drop with photo cropping features
  const [fileName, setFileName] = useState("");
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [fullImage, setFullImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [isCropped, setIsCropped] = useState(false);

  const {
    firstName,
    lastName,
    location,
    profile_image,
    briefDescription,
    businessName,
  } = profile || {};
  const [localTime, setLocalTime] = useState();

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

  const getWorkHistoryInfo = async () => {
    try {
      const { code, body } = await getWorkHistory();

      if (code === 200) setWorkHistory(body);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCopyProfileURL = () => {
    const profileURL = window.location.href;
    navigator.clipboard.writeText(profileURL);

    toast({
      title: "Zeework Profile Copied.",
      status: "success",
      duration: 3000,
      position: "top",
      isClosable: true,
    });
  };

  const handleOpenModal = (type) => {
    setModalType(type);
    setIsModal(true);
    setImageSrc(null);
    setFileName("");
  };

  // update profile photo
  const updateProfilePhoto = async () => {
    try {
      const formData = new FormData();
      formData.append("file", isCropped ? croppedImage[0] : fullImage[0]);

      const response = await uploadImage(formData);

      return response;
    } catch (error) {
      console.error(error);
    }
  };

  // Update client profile info
  const handleUpdateProfile = async (data) => {
    setIsLoading(true);
    let response;
    try {
      // update profile photo and other info
      if (modalType === "Profile Photo") {
        response = await updateProfilePhoto();
      } else {
        response = await updateClientProfile(data);
      }

      // dispatch profile info in redux
      if (response?.code === 200) {
        dispatch(
          profileData({
            profile: response.body,
          })
        );
      }
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
    setIsModal(false);
    setModalType("");
    setImageSrc(null);
    setFileName("");
    reset();
  };

  // handle photo drag 'n' drop with photo cropping
  const onDrop = useCallback((acceptedFiles) => {
    setFullImage(acceptedFiles);
    setFileName(acceptedFiles[0].name);
    setErrorMessage("");

    const reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]);
    reader.onload = () => {
      setImageSrc(reader.result);
    };
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    multiple: false,
  });

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCrop = async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      const file = new File([croppedImage], fileName, { type: "image/jpeg" });
      setCroppedImage([file]);
      setIsCropped(true);
    } catch (e) {
      console.error(e);
    }
  };

  const handleRevert = () => {
    setIsCropped(false);
  };

  useEffect(() => {
    getWorkHistoryInfo();
  }, []);
  return (
    <>
      <ProfileContainer>
        <div className="w-full sm:w-[90%] flex flex-col gap-[24px] m-auto">
          <div className=" w-full flex items-center justify-between border-2 py-[20px] px-[24px] border-[var(--primarycolor)] bg-green-50 rounded-xl max-sm:flex-col max-sm:gap-4">
            <div className="flex gap-[14px] items-center">
              <div style={{ position: "relative", padding: "10px" }}>
                <div
                  style={{
                    position: "absolute",
                    top: "0px",
                    left: "0px",
                    cursor: "pointer",
                    zIndex: "50",
                  }}
                >
                  <div
                    className="flex items-center justify-center w-8 h-8 bg-[#F9FAFB] hover:bg-slate-100 rounded-[6px] border-[1px] border-[var(--bordersecondary)]"
                    onClick={() => handleOpenModal("Profile Photo")}
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

                <Avatar
                  src={profile_image}
                  name={firstName + " " + lastName}
                  width={"60px"}
                  height={"60px"}
                />
              </div>
              <div className="flex flex-col justify-start gap-[10px]">
                <p className="text-[24px] text-[#374151] font-semibold">
                  {businessName}
                </p>
                <HStack className="text-[16px] text-[#374151] font-[400]">
                  <CiLocationOn />{" "}
                  <p className="capitalize">
                    {" "}
                    {location}, {localTime} local time
                  </p>
                </HStack>
              </div>
            </div>
            <div className="flex items-center gap-[12px]">
              <div
                className="flex items-center justify-center w-[36px] h-[36px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[var(--bordersecondary)] cursor-pointer hover:bg-slate-100"
                onClick={handleCopyProfileURL}
              >
                <BsLink45Deg width={"20px"} height={"20px"} />
              </div>
              <button
                className="py-[8px] px-[12px] rounded-[6px] text-[14px] font-500 text-[#fff] bg-[#22C55E]"
                onClick={() => router.push("/setting")}
              >
                Profile Settings
              </button>
            </div>
          </div>
          <div className="flex flex-col xl:flex-row gap-[24px]">
            <div className="flex flex-1 gap-[24px]  flex-col ">
              <div className="flex py-6 bg-white w-full xl:w-[400px] relative flex-col gap-[24px] border-[1px] px-[24px] border-[var(--bordersecondary)] rounded-lg">
                <p className="text-[20px] text-[#374151] font-[600]">
                  Client Stats
                </p>
                <VStack
                  backgroundColor={"#f4f5f787"}
                  height={"80px"}
                  shadow={"sm"}
                  justifyContent={"center"}
                >
                  <Text fontWeight={"600"} top={"8rem"} textAlign={"center"}>
                    Updated Client Stats <br /> Coming Soon
                  </Text>
                </VStack>
              </div>

              {/* <div className="flex py-6 bg-white w-[400px] relative flex-col gap-[24px] border-[1px] px-[24px] border-[var(--bordersecondary)] rounded-xl">
              <p className="text-[20px] text-[#374151] font-[600]">
                Client Stats
              </p>
              <hr className="text-[var(--bordersecondary)]" />
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="col-span-1">
                  <p className="text-2xl italic font-thin">$400</p>
                  <p className="text-gray-800 font-semibold mt-1">
                    Total Earnings
                  </p>
                </div>
                <div className="col-span-1">
                  <p className="text-2xl italic font-thin">40</p>
                  <p className="text-gray-800 font-semibold mt-1">Total Jobs</p>
                </div>
                <div className="col-span-1">
                  <p className="text-2xl italic font-thin">8000</p>
                  <p className="text-gray-800 font-semibold mt-1">
                    Total Hours
                  </p>
                </div>
              </div>
            </div> */}
            </div>
            <div className="flex-[2] flex flex-col gap-[24px]">
              <div className="flex flex-col gap-[24px]  border-[1px] py-8 px-[24px] border-[var(--bordersecondary)] bg-white rounded-xl">
                <div className="">
                  <div className="flex gap-[16px] justify-between">
                    <p className="text-[20px] text-[#374151] font-[600]">
                      Client Description
                    </p>{" "}
                    <div
                      className="flex items-center justify-center w-[28px] h-[28px] bg-[#F9FAFB] hover:bg-slate-100 cursor-pointer rounded-[6px] border-[1px] border-[var(--bordersecondary)] "
                      onClick={() => handleOpenModal("Brief Description")}
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
                </div>
                <p className="text-[14px] text-[#374151] font-[400] w-[400px]">
                  {briefDescription}
                </p>
              </div>
              <div className="border-[1px] pt-8 overflow-hidden border-[var(--bordersecondary)] bg-white rounded-xl">
                <div className="flex flex-col gap-6 px-6">
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

                {workHistory?.map((item, index) => (
                  <ReviewCard key={index} workDetails={item} role={role} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </ProfileContainer>

      {/* Updating Profile Information */}
      {isModal && (
        <UniversalModal
          isModal={isModal}
          setIsModal={setIsModal}
          title={`Update ${modalType}`}
        >
          <form onSubmit={handleSubmit(handleUpdateProfile)}>
            {modalType === "Profile Photo" && (
              <>
                <div className="flex flex-col gap-[16px]">
                  <div className="flex flex-col">
                    <div className="flex flex-col gap-[2px]">
                      {!imageSrc && (
                        <div
                          {...getRootProps()}
                          className={`w-[100%] ${fileName ? "py-5" : "py-8"
                            } px-3 outline-none border-2 rounded-md border-dashed border-primary cursor-pointer bg-green-100 font-medium tracking-wide`}
                        >
                          {!fileName && (
                            <RiUploadCloud2Fill className="text-green-300 text-6xl mx-auto" />
                          )}
                          <input
                            {...getInputProps()}
                            className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[var(--bordersecondary)]"
                            placeholder="Select an image"
                            onChange={() => {
                              const file = getInputProps().files[0];
                              if (file) {
                                setFileName(file.name);
                              }
                              setErrorMessage("");
                            }}
                          />

                          {isDragActive ? (
                            <p className="text-center ">
                              Drop the files here ...{" "}
                            </p>
                          ) : (
                            <p className="text-center ">
                              Drag &apos;n&apos; drop image file here, or click
                              to select file
                            </p>
                          )}
                        </div>
                      )}
                      {fileName && (
                        <p className="text-center mt-2 -mb-4 text-green-600">
                          {fileName}
                        </p>
                      )}
                      {errorMessage && (
                        <p className="text-sm text-red-500">{errorMessage}</p>
                      )}
                    </div>
                  </div>
                  {imageSrc && (
                    <>
                      <div className="relative w-full h-64">
                        <Cropper
                          image={imageSrc}
                          crop={crop}
                          zoom={zoom}
                          aspect={1}
                          showGrid={false}
                          onCropChange={isCropped ? undefined : setCrop}
                          onZoomChange={isCropped ? undefined : setZoom}
                          onCropComplete={onCropComplete}
                          cropShape={modalType === "Profile Photo" && "round"}
                        />
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <div className="flex items-center gap-1 w-full sm:w-96">
                          <TiMinus />
                          <Slider
                            aria-label="zoom-slider"
                            value={zoom}
                            min={1}
                            max={3}
                            step={0.1}
                            onChange={(val) => {
                              !isCropped && setZoom(val);
                            }}
                          >
                            <SliderTrack className="bg-slate-300">
                              <SliderFilledTrack bg={"slategrey"} />
                            </SliderTrack>
                            <SliderThumb boxSize={6}>
                              <Box className="text-slate-500" as={TiZoom} />
                            </SliderThumb>
                          </Slider>
                          <TiPlus />
                        </div>
                        <div className="flex items-center justify-center gap-5">
                          <button
                            type="button"
                            className={`flex items-center gap-1 ${!isCropped
                              ? "cursor-no-drop bg-slate-400"
                              : "bg-slate-500"
                              }   rounded py-1 px-3 text-white w-fit mt-2`}
                            onClick={handleRevert}
                            disabled={!isCropped}
                          >
                            <TiArrowBack /> Cancel
                          </button>
                          <button
                            type="button"
                            className={`flex items-center gap-1 ${isCropped
                              ? "cursor-no-drop bg-slate-400"
                              : "bg-slate-500"
                              }  rounded py-1 px-3 text-white w-fit mt-2`}
                            onClick={handleCrop}
                            disabled={isCropped}
                          >
                            {isCropped ? (
                              <>
                                <IoMdCheckmarkCircleOutline /> Cropped
                              </>
                            ) : (
                              <>
                                <BiSolidCrop /> Crop photo
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                {imageSrc && (
                  <div className="text-right mt-10">
                    <Button
                      isLoading={isLoading}
                      loadingText="Uploading"
                      colorScheme="primary"
                      onClick={() => handleUpdateProfile()}
                      paddingX={7}
                      spinner={<BtnSpinner />}
                    >
                      Upload
                    </Button>
                  </div>
                )}
              </>
            )}
            {modalType === "Brief Description" && (
              <div>
                <textarea
                  type="text"
                  className="w-full p-1 outline-none text-[#000] font-[400] border border-[var(--bordersecondary)] rounded"
                  placeholder="Description..."
                  {...register("briefDescription", {
                    required: "Please enter brief description!",
                  })}
                ></textarea>
                {errors.briefDescription && (
                  <p className="text-sm text-red-500">
                    {errors.briefDescription.message}
                  </p>
                )}
              </div>
            )}

            {/* On Submit Button */}
            {modalType !== "Profile Photo" && (
              <div className="text-right mt-5">
                <Button
                  isLoading={isLoading}
                  loadingText={"Updating"}
                  colorScheme="primary"
                  type="submit"
                  paddingX={7}
                  spinner={<BtnSpinner />}
                >
                  Update
                </Button>
              </div>
            )}
          </form>
        </UniversalModal>
      )}
    </>
  );
};
