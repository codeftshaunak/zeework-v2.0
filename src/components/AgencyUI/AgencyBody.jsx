import React from "react";
import { Box, VStack } from "@chakra-ui/react";
import AgencyLeftbar from "./AgencyLeftbar";
import AgencyRightBar from "./AgencyRightBar";
import AgencyMembers from "./AgencyMembers";

const AgencyBody = ({ agency, setAgency }) => {
  return (
    <AgencyBodyLayout>
      <VStack>
        <Box
          display={{ lg: "flex" }}
          width={"95%"}
          paddingY={"20px"}
          position={"relative"}
        >
          <AgencyLeftbar agency={agency} setAgency={setAgency} />
          <AgencyRightBar agency={agency} setAgency={setAgency} />
        </Box>
        <Box display={{ lg: "flex" }}
          width={"95%"}
          paddingY={"20px"}
          position={"relative"}>
          <AgencyMembers setAgency={setAgency} />
        </Box>
      </VStack>
    </AgencyBodyLayout>
  );
};

//  agency body layout
export const AgencyBodyLayout = ({ children }) => {
  return (
    <Box
      width={"100%"}
      display={"flex"}
      justifyContent={"center"}
      className="shadow-sm border p-4 bg-white"
    >
      {children}
    </Box>
  );
};

export default AgencyBody;
