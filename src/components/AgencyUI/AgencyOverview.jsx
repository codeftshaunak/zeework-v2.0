// import ReactQuill from "react-quill";
// import QuillToolbar, {
//   formats,
//   modules,
// } from "../Global/QuillToolbar/QuillToolbar";
import { useCallback, useState } from "react";
import { updateAgencyProfile } from "../../helpers/APIs/agencyApis";
import UniversalModal from "../Modals/UniversalModal";
import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import BtnSpinner from "../Skeletons/BtnSpinner";
import { RiEdit2Fill } from "react-icons/ri";
import { FiPlus } from "react-icons/fi";

const AgencyOverview = ({ overview: overviewValue, setAgency }) => {
  const [isModal, setIsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [overview, setOverview] = useState(overviewValue);

  // Memoize the setOverview function
  const handleOverviewChange = useCallback((value) => {
    setOverview(value);
  }, []);

  // handle update info
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const { body, code } = await updateAgencyProfile({
        agency_overview: overview,
      });

      if (code === 200) setAgency(body);
    } catch (error) {
      console.log(error);
    }
    setIsModal(false);
    setIsLoading(false);
  };

  return (
    <>
      <div>
        <HStack marginBottom={"0.5rem"} marginTop={"1rem"}>
          <Text
            fontSize={{ base: "1.3rem", md: "1.7rem", lg: "2rem" }}
            fontWeight={"600"}
            marginBottom={"0"}
          >
            Overview
          </Text>
          <VStack
            backgroundColor={"white"}
            borderRadius={"50%"}
            width={"20px"}
            border={"1px solid var(--primarycolor)"}
            height={"20px"}
            alignItems={"center"}
            justifyContent={"center"}
            transition={"0.6s ease-in-out"}
            cursor={"pointer"}
            mt={1}
            _hover={{
              border: "2px solid var(--primarycolor)",
              backgroundColor: "transparent",
              color: "var(--primarycolor)",
            }}
            onClick={() => setIsModal(true)}
          >
            {overviewValue ? <RiEdit2Fill /> : <FiPlus fontSize={"15px"} />}
          </VStack>
        </HStack>
        {overviewValue && (
          <article className="">
            <div dangerouslySetInnerHTML={{ __html: overviewValue }} />
          </article>
        )}
      </div>

      {/* update overview */}
      {isModal && (
        <UniversalModal
          isModal={isModal}
          setIsModal={setIsModal}
          title={`Update Profile Overview`}
        >
          {
            <div className="">
              {/* <QuillToolbar />
              <ReactQuill
                theme="snow"
                value={overview}
                onChange={handleOverviewChange}
                className="h-64 [&>*]:rounded-b-md"
                modules={modules}
                formats={formats}
              /> */}
            </div>
          }
          <div className="text-right mt-10">
            <Button
              isLoading={isLoading}
              loadingText="Submit"
              colorScheme="primary"
              type="submit"
              spinner={<BtnSpinner />}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </UniversalModal>
      )}
    </>
  );
};

export default AgencyOverview;
