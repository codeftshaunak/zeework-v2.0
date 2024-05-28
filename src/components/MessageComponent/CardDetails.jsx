import { Box, Text } from "@chakra-ui/react";
import { useRouter } from 'next/router';

const CardDetails = ({ message, user_id, role }) => {
  const { title, type, job_type, amount, url, position } =
    message?.card_details || {};
  const router = useRouter();


  return (
    <>
      <Box
        bgColor={"gray.50"}
        rounded={8}
        paddingX={5}
        paddingY={3}
        className="shadow"
      >
        <Text className="font-medium capitalize text-md">
          {type?.replace(/_/g, " ")}
        </Text>
        <Box className="border-l-2 border-green-500 pl-2 mt-1">
          {title && (
            <Text fontSize={"0.8rem"} fontWeight={"600"}>
              Title: {title}
            </Text>
          )}
          {position && (
            <Text fontSize={"0.8rem"} fontWeight={"600"}>
              Position: {position}
            </Text>
          )}
          {job_type && (
            <Text className="capitalize" fontSize={"0.8rem"}>
              Type: {job_type}
            </Text>
          )}
          {job_type &&
            amount &&
            (job_type ? (
              <Text fontSize={"0.8rem"} fontWeight={"600"}>
                {job_type === "fixed"
                  ? `Budget: $${amount}`
                  : `Hourly Rate: $${amount}`}
              </Text>
            ) : (
              <Text fontSize={"0.8rem"} fontWeight={"600"}>
                Price: ${amount}
              </Text>
            ))}
        </Box>
        {url && (
          <Text
            cursor={"pointer"}
            className="font-medium text-green-500 ml-1 w-fit tracking-wide text-sm"
            mt={1}
            onClick={() =>
              role == 1
                ? url?.agency
                  ? message.sender_id === user_id
                    ? router(url.agency)
                    : router(url.freelancer)
                  : router(url.freelancer)
                : url?.client && router(url.client)
            }
          >
            Details
          </Text>
        )}
      </Box>
    </>
  );
};

export default CardDetails;
