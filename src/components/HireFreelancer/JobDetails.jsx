import { Heading, Text, Box, Select, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getClientJobs } from "../../helpers/APIs/clientApis";

const JobDetails = ({ formData, setFormData }) => {
  const [jobsTitle, setJobsTitle] = useState([]);
  const profile = useSelector((state) => state?.profile?.profile);

  // Fetch Job Title
  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobsData = await getClientJobs();
        setJobsTitle(jobsData);
      } catch (error) {
        console.error("Error fetching job titles:", error);
      }
    };

    fetchData();
  }, []);

  // update form data and dispatch to Redux
  const handleFormDataChange = (key, value) => {
    let updatedFormData = { ...formData };

    if (key === "job_title") {
      // Parse the string back to a job object
      const selectedJob = JSON.parse(value);

      // Extract job_type, job_id, and title from the selected job
      const { _id: job_id, title } = selectedJob;

      // Update form data with job_type, job_id, and title
      updatedFormData = {
        ...updatedFormData,
        job_title: title,
        job_id: job_id,
      };
    } else {
      updatedFormData[key] = value;
    }

    setFormData(updatedFormData);
  };

  return (
    <Box
      marginTop="4"
      width="100%"
      gap="2"
      border="1px solid lightgray"
      rounded="xl"
      paddingY="6"
      paddingX="10"
      bgColor={"white"}
    >
      <Heading as="h4" size="md">
        Job Details
      </Heading>
      <Box marginTop="30">
        <Heading as="h5" size="sm" marginBottom={"1rem"}>
          Hiring Team
        </Heading>
        <Select
          placeholder="Select Team"
          marginTop="8px"
          maxWidth="2xl"
          value={formData.hiring_team}
          onChange={(e) => handleFormDataChange("hiring_team", e.target.value)}
          required
        >
          <option
            value={`${
              profile?.businessName && profile?.businessName !== "null"
                ? profile.businessName
                : profile?.name
            }
            &apos;s Team`}
          >
            {profile?.businessName && profile?.businessName !== "null"
              ? profile.businessName
              : profile?.name}
            &apos;s Team
          </option>
        </Select>
      </Box>
      <Box marginTop="30">
        <Heading as="h5" size="sm" display="flex" gap="1" marginBottom={"1rem"}>
          Related Job Posting <Text color="gray">(Optional)</Text>
        </Heading>
        <Select
          placeholder="Select an open job post"
          marginTop="8px"
          maxWidth="2xl"
          onChange={(e) => handleFormDataChange("job_title", e.target.value)}
          required
        >
          {jobsTitle &&
            jobsTitle?.map((job) => (
              <option
                key={job._id}
                value={JSON.stringify(job)}
                className="px-2 tracking-wide"
              >
                {job?.title}
              </option>
            ))}
        </Select>
      </Box>
      <Box marginTop="30">
        <Heading as="h5" size="sm" marginBottom={"8px"}>
          Contract Title
        </Heading>
        <Input
          placeholder="Basic usage"
          marginTop="8px"
          maxWidth="2xl"
          value={formData?.contract_title}
          onChange={(e) =>
            handleFormDataChange("contract_title", e.target.value?.slice(0, 50))
          }
          required
        />
      </Box>
    </Box>
  );
};

export default JobDetails;
