import { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  HStack,
  Select,
  useToast,
  Radio,
  Stack,
  RadioGroup,
  Text,
} from "@chakra-ui/react";
import {
  applyJob,
  getAgencyAllJobs,
  userAllJobs,
} from "../../helpers/APIs/jobApis";
import { useNavigate, useParams } from "react-router-dom";
import { CurrentUserContext } from "../../Contexts/CurrentUser";
import { useSelector } from "react-redux";
import {
  FaFile,
  FaFileArchive,
  FaFileExcel,
  FaFileImage,
  FaFilePowerpoint,
  FaFileVideo,
  FaRegFilePdf,
  FaRegFileWord,
} from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useCookies } from "react-cookie";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import QuillToolbar, {
//   formats,
//   modules,
// } from "../Global/QuillToolbar/QuillToolbar";
import BtnSpinner from "../Skeletons/BtnSpinner";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

// Todo: updated soon
const jobApplySchema = Yup.object().shape({
  coverLetter: Yup.string().required("Cover Letter is required"),
});

const JobApply = ({ setPage, details }) => {
  const {
    trigger,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(jobApplySchema),
  });
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [showJobDetails, setShowJobDetails] = useState(false);
  const details_new = details[0];
  const profile = useSelector((state) => state?.profile);
  const [coverLetter, setCoverLetter] = useState("");
  const { hasAgency } = useContext(CurrentUserContext);
  const { hourly_rate } = profile.profile || [];
  const [cookies] = useCookies(["activeagency"]);
  const [isApplicant, setIsApplicant] = useState(
    cookies.activeagency ? "agency_member" : "freelancer"
  );

  const [desireHourlyRate, setDesireHourlyRate] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [bidDetails, setBidDetails] = useState({
    amount: details_new?.amount,
    type: details_new?.job_type == "fixed" ? "project" : null,
    customBidAmount: null,
    cover_letter: "",
  });

  useEffect(() => {
    setDesireHourlyRate(
      isApplicant === "freelancer"
        ? profile?.profile?.hourly_rate
        : profile?.agency?.agency_hourlyRate
    );
  }, [isApplicant]);

  const handleBudgetTypeChange = (value) => {
    setBidDetails((prev) => ({
      ...prev,
      type: value,
      customBidAmount: value === "milestone" ? null : prev.customBidAmount,
    }));
  };

  const calculateServiceFee = () => {
    const bidAmount =
      bidDetails.type === "project"
        ? bidDetails.amount
        : bidDetails.customBidAmount;
    return bidAmount - bidAmount * 0.05;
  };

  const toast = useToast();
  const navigate = useNavigate();

  const handleFixedJobSubmit = async () => {
    setIsLoading(true);
    const jobData = {
      job_id: id,
      desired_price:
        bidDetails.type === "project"
          ? bidDetails.amount
          : bidDetails.customBidAmount,
      job_type: bidDetails.type,
      cover_letter: coverLetter,
      file: selectedFile,
      applied_by: isApplicant,
    };
    // if applicant has been agency member then add agency_id
    if (isApplicant === "agency_member") {
      jobData.agency_id = profile.agency._id;
    }

    try {
      const response = await applyJob(jobData);
      handleSubmissionResponse(response);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  const handleHourlyJobSubmit = async () => {
    setIsLoading(true);
    const jobData = {
      job_id: id,
      desired_price: desireHourlyRate,
      job_type: "hourly",
      cover_letter: coverLetter,
      file: selectedFile,
      applied_by: isApplicant,
    };

    // if applicant has been agency member then add agency_id
    if (isApplicant === "agency_member") {
      jobData.agency_id = profile.agency._id;
    }

    try {
      const response = await applyJob(jobData);

      handleSubmissionResponse(response);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const handleSubmissionResponse = (response) => {
    const isSuccess = response?.code === 200;
    const toastMessage = isSuccess ? "Job Applied Successfully" : response?.msg;

    toast({
      title: toastMessage,
      position: "top",
      status: isSuccess ? "success" : "error",
      isClosable: true,
      duration: 2000,
    });

    if (isSuccess) {
      navigate("/find-job");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  // check file types and generate file icon
  const getFileTypeIcon = (fileName) => {
    const extension = fileName.split(".").pop().toLowerCase();

    switch (extension) {
      case "png":
      case "jpg":
      case "jpeg":
      case "gif":
      case "svg":
        return <FaFileImage />;
      case "mp4":
      case "avi":
      case "mov":
      case "mkv":
        return <FaFileVideo />;
      case "pdf":
        return <FaRegFilePdf />;
      case "zip":
        return <FaFileArchive />;
      case "doc":
      case "docx":
        return <FaRegFileWord />;
      case "xls":
      case "xlsx":
        return <FaFileExcel />;
      case "ppt":
      case "pptx":
        return <FaFilePowerpoint />;
      default:
        return <FaFile />;
    }
  };
  const fileIcon = selectedFile ? getFileTypeIcon(selectedFile.name) : null;

  return (
    <Box w="100%" pt={2} pb={6}>
      <Box className="flex gap-2 py-6">
        <img src="/icons/home.svg" alt="home" />
        <img src="/icons/chevron-right.svg" alt="arrow right" />
        <Box className="cursor-pointer" onClick={() => setPage(1)}>
          {details_new?.title}
        </Box>
        <img src="/icons/chevron-right.svg" alt="arrow right" />
        <Box>Submit Proposal</Box>
      </Box>

      <Box className="w-full flex justify-between pb-4 max-lg:flex-col max-lg:gap-4">
        <Box
          w="100%"
          className="lg:!flex-col-reverse lg:flex lg:justify-end lg:gap-4"
        >
          <Box className="w-full lg:w-[96%] border border-tertiary rounded-2xl p-10 bg-white h-max mb-4">
            <Box fontWeight="semibold" marginBottom="1" className="text-xl">
              Job Details
            </Box>
            <br />
            <Box
              className={
                showJobDetails
                  ? "capitalize line-clamp-none"
                  : "capitalize line-clamp-4"
              }
              dangerouslySetInnerHTML={{ __html: details_new?.description }}
            />
            <button
              className={
                details_new?.description?.length >= 350
                  ? "mt-4 text-[#16833E] underline"
                  : "hidden"
              }
              onClick={() => {
                setShowJobDetails(!showJobDetails);
              }}
            >
              {showJobDetails ? "less" : "more"}
            </button>
          </Box>
          {hasAgency && (
            <Box className="w-full lg:w-[96%] border border-tertiary rounded-2xl px-8 py-10 bg-white">
              <Box fontWeight="semibold" marginBottom="6" className="text-xl">
                Proposal Type
              </Box>
              <Box fontWeight="semibold">
                Do you want to submit the proposal as a freelancer or as an
                agency member?
              </Box>
              <RadioGroup
                onChange={setIsApplicant}
                value={isApplicant}
                marginTop="4"
              >
                <Stack>
                  <Radio size="lg" value="freelancer" colorScheme="green">
                    As a freelancer
                  </Radio>
                  <Radio size="lg" value="agency_member" colorScheme="green">
                    As an agency member
                  </Radio>
                </Stack>
              </RadioGroup>
            </Box>
          )}
        </Box>

        <Box w="70%" className="max-lg:!w-full">
          {details_new?.job_type == "fixed" && (
            <form onSubmit={handleSubmit(handleFixedJobSubmit)}>
              <Box w="full" className="w-full">
                <Box className="w-full">
                  {/* <Box className="border border-tertiary rounded-2xl p-10 mb-4 bg-white">
                    <Box fontWeight="semibold" mb={2}>
                      Select Budget Type
                    </Box>
                    <Select
                      value={bidDetails.type}
                      onChange={(e) => handleBudgetTypeChange(e.target.value)}
                    >
                      <option value="project">Project</option>
                      <option value="milestone">Milestone</option>
                    </Select>
                  </Box> */}

                  {bidDetails.type === "milestone" && (
                    <BidDetailsSection
                      label="Write Your Fee For The Contract"
                      placeholder="$100.00"
                      details={details_new}
                      bidAmount={bidDetails.customBidAmount}
                      setBidAmount={(value) =>
                        setBidDetails((prev) => ({
                          ...prev,
                          customBidAmount: value,
                        }))
                      }
                      serviceFee={calculateServiceFee()}
                    />
                  )}

                  {bidDetails.type === "project" && (
                    <BidDetailsSection
                      label="Write Your Fee For The Contract"
                      placeholder="$100.00"
                      bidAmount={bidDetails.amount}
                      setBidAmount={(value) =>
                        setBidDetails((prev) => ({ ...prev, amount: value }))
                      }
                      details={details_new}
                      serviceFee={calculateServiceFee()}
                    />
                  )}

                  <Box className="border border-tertiary rounded-2xl max-sm:px-2 p-10 bg-white">
                    <Box fontWeight="semibold" fontSize={"xl"} mb={2}>
                      Additional Details
                    </Box>
                    <Box marginBottom={"10px"}>Cover Letter</Box>
                    <Box width={"full"}>
                      {/* <QuillToolbar />
                      <ReactQuill
                        theme="snow"
                        value={coverLetter}
                        onChange={(value) => {
                          setCoverLetter(value);
                          setValue("coverLetter", value);
                          trigger("coverLetter");
                        }}
                        className="h-64 [&>*]:rounded-b-md"
                        modules={modules}
                        formats={formats}
                      /> */}
                      {errors.coverLetter && (
                        <Text size={"sm"} textColor={"red"}>
                          {errors.coverLetter.message}
                        </Text>
                      )}
                    </Box>

                    <Box textAlign="right" color="gray.300" mt={4}>
                      (0/500)
                    </Box>
                    <Box fontWeight="semibold" mb={8}>
                      Attachment
                    </Box>
                    <Box className="max-w-xl">
                      {selectedFile ? (
                        <div className="bg-white w-full py-4 px-3  rounded-lg shadow relative">
                          <div className="flex items-center justify-start gap-3">
                            <div className="text-5xl text-green-300">
                              {fileIcon}
                            </div>
                            <p>{selectedFile?.name}</p>
                          </div>
                          <span
                            className="h-7 w-7 bg-red-100/20 rounded-full absolute top-0 right-0 flex items-center justify-center cursor-pointer backdrop-blur backdrop-filter hover:bg-red-100 hover:text-red-500"
                            onClick={() => setSelectedFile(null)}
                          >
                            <IoMdClose className="text-2xl" />
                          </span>
                        </div>
                      ) : (
                        <label className="flex justify-center w-full h-20 px-4 transition bg-green-200 border-2 border-green-600 border-dashed rounded-md appearance-none cursor-pointer">
                          <span className="flex items-center space-x-2">
                            <span>
                              Drag or&nbsp;
                              <span className="text-green-600 underline">
                                upload
                              </span>
                              &nbsp;project files
                            </span>
                          </span>
                          <input
                            type="file"
                            name="file"
                            className="hidden"
                            onChange={handleFileChange}
                          />
                        </label>
                      )}
                    </Box>

                    <Button
                      isLoading={isLoading}
                      loadingText="Apply"
                      colorScheme="primary"
                      type="submit"
                      spinner={<BtnSpinner />}
                      marginTop={10}
                      rounded={"full"}
                      paddingBottom={"3px"}
                      paddingX={"40px"}
                    >
                      Apply
                    </Button>
                  </Box>
                </Box>
              </Box>
            </form>
          )}

          {details_new?.job_type == "hourly" && (
            <form onSubmit={handleSubmit(handleHourlyJobSubmit)}>
              <Box w="full">
                <Box className="border border-tertiary rounded-2xl p-10 mb-4 bg-white">
                  <Box fontWeight="semibold" mb={5} fontSize={"xl"}>
                    Select Proposal Rate
                  </Box>
                  <HStack justifyContent="space-between" fontSize="0.9rem">
                    <Box>Your Profile Rate: ${hourly_rate}/hr</Box>
                    <Box>Client Budget: ${details_new?.amount}/hr</Box>
                  </HStack>

                  <Box my={4}>What is your hourly rate for this job?</Box>
                  <input
                    className="rounded-md border border-tertiary p-1 w-full"
                    type="number"
                    value={desireHourlyRate}
                    onChange={(e) => setDesireHourlyRate(e.target.value)}
                  />

                  <HStack justify="space-between" mt={4}>
                    <Box fontWeight="semibold">5% Freelancer Service Fee</Box>
                    <Box fontWeight="semibold">
                      $
                      {desireHourlyRate
                        ? (desireHourlyRate * 0.05).toFixed(2)
                        : "0.00"}
                    </Box>
                  </HStack>

                  <HStack justify="space-between" mt={4}>
                    <Box fontWeight="semibold">You&apos;ll Receive</Box>
                    <Box fontWeight="semibold">
                      $
                      {desireHourlyRate
                        ? (desireHourlyRate * 0.95).toFixed(2)
                        : "0.00"}
                    </Box>
                  </HStack>
                </Box>

                <Box className="border border-tertiary rounded-2xl p-10 bg-white">
                  <Box fontWeight="semibold" mb={2} fontSize={"xl"}>
                    Additional Details
                  </Box>
                  <Box paddingBottom={"15px"}>Cover Letter</Box>
                  <Box width={"full"}>
                    {/* <QuillToolbar />
                    <ReactQuill
                      theme="snow"
                      value={coverLetter}
                      onChange={(value) => {
                        setCoverLetter(value);
                        setValue("coverLetter", value);
                        trigger("coverLetter");
                      }}
                      className="h-64 [&>*]:rounded-b-md"
                      modules={modules}
                      formats={formats}
                    /> */}
                    {errors.coverLetter && (
                      <Text size={"sm"} textColor={"red"}>
                        {errors.coverLetter.message}
                      </Text>
                    )}
                  </Box>

                  <Box textAlign="right" color="gray.300" mt={4}>
                    (0/500)
                  </Box>
                  <Box fontWeight="semibold" mt={4}>
                    Attachment
                  </Box>

                  <Box className="max-w-xl">
                    {selectedFile ? (
                      <div className="bg-white w-full py-4 px-3  rounded-lg shadow relative">
                        <div className="flex items-center justify-start gap-3">
                          <div className="text-5xl text-green-300">
                            {fileIcon}
                          </div>
                          <p>{selectedFile?.name}</p>
                        </div>
                        <span
                          className="h-7 w-7 bg-red-100/20 rounded-full absolute top-0 right-0 flex items-center justify-center cursor-pointer backdrop-blur backdrop-filter hover:bg-red-100 hover:text-red-500"
                          onClick={() => setSelectedFile(null)}
                        >
                          <IoMdClose className="text-2xl" />
                        </span>
                      </div>
                    ) : (
                      <label className="flex justify-center w-full h-20 px-4 transition bg-green-200 border-2 border-green-600 border-dashed rounded-md appearance-none cursor-pointer">
                        <span className="flex items-center space-x-2">
                          <span>
                            Drag or&nbsp;
                            <span className="text-green-600 underline">
                              upload
                            </span>
                            &nbsp;project files
                          </span>
                        </span>
                        <input
                          type="file"
                          name="file"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </label>
                    )}
                  </Box>

                  <Button
                    isLoading={isLoading}
                    loadingText="Apply"
                    colorScheme="primary"
                    type="submit"
                    spinner={<BtnSpinner />}
                    marginTop={10}
                    rounded={"full"}
                    paddingBottom={"3px"}
                    paddingX={"40px"}
                  >
                    Apply
                  </Button>
                </Box>
              </Box>
            </form>
          )}
        </Box>
      </Box>
    </Box>
  );
};

const BidDetailsSection = ({
  label,
  placeholder,
  bidAmount,
  setBidAmount,
  serviceFee,
  details,
}) => (
  <Box className="border border-tertiary rounded-2xl p-10 mb-4 bg-white">
    <Box
      fontWeight="semibold"
      mb={2}
      textTransform="capitalize"
      fontSize={"xl"}
    >
      {label}
    </Box>
    <p className="mb-2">Client Budget: ${details?.amount}</p>

    <input
      className="rounded-md border border-tertiary p-1 w-full"
      type="number"
      placeholder={placeholder}
      value={bidAmount}
      onChange={(e) => setBidAmount(e.target.value)}
      required
    />

    <HStack margin="5px 0" justify="space-between">
      <Box marginTop={"8px"}>5% Freelancer Service Fee</Box>
      <Box>${(bidAmount - serviceFee).toFixed(2)}</Box>
    </HStack>

    <HStack marginBottom="5px" justify="space-between">
      <Box fontWeight="semibold">You&apos;ll receive</Box>
      <Box fontWeight="semibold">${serviceFee.toFixed(2)}</Box>
    </HStack>
  </Box>
);

export default JobApply;
