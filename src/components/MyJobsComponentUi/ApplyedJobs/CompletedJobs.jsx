import { VStack, Text, Button, Box, Image, Stack } from "@chakra-ui/react";
import { useRouter } from 'next/router';
import HorizontalCardSkeleton from "../../Skeletons/HorizontalCardSkeleton";

const CompletedJobs = ({ completedJobs, loading }) => {
  const router = useRouter();

  return (
    <div className="my-3 space-y-4">
      <h2 className="mt-8 mb-4 text-2xl font-medium">Completed Jobs</h2>
      {loading ? (
        <Stack
          paddingX={4}
          className="border border-[var(--bordersecondary)] rounded-lg"
        >
          <HorizontalCardSkeleton />
        </Stack>
      ) : (
        <>
          {completedJobs?.length > 0 ? (
            <div className="m-auto w-[100%] border border-[var(--bordersecondary)] p-5 rounded-lg bg-white">
              <div className="flex justify-center gap-5 flex-wrap">
                {completedJobs?.map((item, index) => (
                  <VStack
                    key={index}
                    className="border p-4 m-2 rounded w-[280px] my-auto mx-auto relative cursor-pointer bg-white"
                    onClick={() => router(`/job/complete/${item?._id}`)}
                  >
                    <Image
                      src="./images/complete_job.png"
                      width="50px"
                      height="50px"
                    />
                    <Box textAlign="center" my={2} width="100%">
                      <Text
                        width="100%"
                        fontSize="1rem"
                        fontWeight={400}
                        lineHeight={"1"}
                      >
                        {item?.contract_title}
                      </Text>
                      <VStack
                        justifyContent="space-around"
                        width="200px"
                        margin="auto"
                        gap="1px"
                      >
                        <Text
                          fontSize="0.8rem"
                          color="gray.700"
                          fontWeight="600"
                        >
                          Budget: ${item?.budget}
                        </Text>
                      </VStack>
                    </Box>
                    <Box
                      position="absolute"
                      fontWeight="600"
                      backgroundColor="var(--primarycolor)"
                      padding="1px 8px"
                      color="white"
                      top="10px"
                      borderRadius="5px"
                      right="10px"
                    >
                      <Text>Completed</Text>
                    </Box>
                  </VStack>
                ))}
              </div>
            </div>
          ) : (
            <VStack
              alignItems="center"
              justifyContent="center"
              height="10rem"
              className="border border-[var(--bordersecondary)] rounded-lg bg-white"
            >
              <Text
                fontSize="1.2rem"
                mb={"1.2rem"}
                textTransform="capitalize"
                fontWeight="600"
              >
                No Jobs Are Currently Complete
              </Text>
              <Button
                borderRadius="25px"
                fontWeight="500"
                backgroundColor="var(--primarycolor)"
                color="white"
                _hover={{
                  border: "1px solid var(--primarycolor)",
                  backgroundColor: "white",
                  color: "black",
                }}
                onClick={() => router.push("/find-job")}
              >
                Find Jobs Now
              </Button>
            </VStack>
          )}
        </>
      )}
    </div>
  );
};

export default CompletedJobs;
