import { Heading, Box, Flex, Avatar } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

const FreelancerProfile = () => {
  const location = useLocation();
  const {
    firstName,
    lastName,
    professional_role,
    profile_image,
    agency_name,
    agency_profileImage,
  } = (location.state && location.state?.freelancerInfo) || {};

  return (
    <Flex
      marginTop="25"
      width="100%"
      gap="3"
      border="1px solid lightgray"
      rounded="xl"
      paddingY="6"
      paddingX="10"
      bgColor={"white"}
      alignItems="center"
    >
      <Avatar
        name={firstName ? `${firstName} ${lastName}` : agency_name}
        src={firstName ? profile_image : agency_profileImage}
        size="lg"
      />
      <Box>
        <Heading as="h4" size="md" className="text-green-600">
          {firstName ? `${firstName} ${lastName}` : agency_name}
        </Heading>
        <Heading as="h5" size="sm" className="text-gray-600 tracking-wide">
          {firstName ? professional_role : "Agency Member"}
        </Heading>
        <Box display="flex" gap="100px" marginTop="10px">
          <Box>
            {/* <Heading as="h6" size="xs" className="text-gray-600">
              Dhaka, Bangladesh
            </Heading> */}
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default FreelancerProfile;
