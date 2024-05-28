import { HStack, useToast, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FormStateProvider } from "../../Contexts/FormContext";
import Steps from "../JobCreate/Steps";
import FirstStep from "../JobCreate/FirstStep";
import SecondStep from "../JobCreate/SecondStep";
import FinalStep from "../JobCreate/FinalStep";
import Preview from "../JobCreate/Preview";
import HomeLayout from "../../Layouts/HomeLayout";
import { useNavigate, useLocation } from "react-router-dom";
import { updateJob } from "../../helpers/APIs/jobApis";

const UpdateJob = () => {
  const toast = useToast();
  const [step, setStep] = useState(1);
  // const [jobDetails, setJobDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  // const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const jobDetails = location.state && location?.state?.jobDetails;

  // const getJobDetails = async () => {
  //   console.log("click");
  //   try {
  //     const response = await getSingleJobDetails(id);
  //     setJobDetails(response?.[0]);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   getJobDetails();
  // }, [id]);

  const onSubmit = async (data) => {
    setIsLoading(true);

    const formData = new FormData();
    for (const key in data) {
      if (data[key] instanceof Array) {
        data[key].forEach((item) => formData.append(`${key}[]`, item));
        continue;
      }
      formData.append(key, data[key]);
    }
    // create the job using form state
    const { code, msg, body } = await updateJob(jobDetails?._id, formData);

    if (code === 200) {
      toast({
        title: msg,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      navigate(`/client-jobDetails/${jobDetails?._id}`, {
        state: { jobDetails: body },
      });
    } else {
      toast({
        title: msg,
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });

      navigate(-1);
    }
    setIsLoading(false);
  };

  // check job details
  useEffect(() => {
    if (!jobDetails) return navigate("/");
  }, []);

  return (
    <HomeLayout displaydir="row">
      <FormStateProvider>
        <Box marginTop={10}>
          {step < 4 ? (
            <HStack
              justifyContent={"space-around"}
              width={"full"}
              alignItems={"flex-start"}
            >
              <Steps step={step} setStep={setStep} />
              {step === 1 && (
                <FirstStep setStep={setStep} defaultValues={jobDetails} />
              )}
              {step === 2 && (
                <SecondStep setStep={setStep} defaultValues={jobDetails} />
              )}
              {step === 3 && (
                <FinalStep
                  setStep={setStep}
                  onCallback={onSubmit}
                  isLoading={isLoading}
                  defaultValues={jobDetails}
                />
              )}
              <Preview />
            </HStack>
          ) : null}
        </Box>
      </FormStateProvider>
    </HomeLayout>
  );
};

export default UpdateJob;
