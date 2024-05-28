import { Button, Image, Text, VStack, Avatar, Box } from "@chakra-ui/react";
import { useRouter } from 'next/router';

const ClientProfileCard = ({ data }) => {
  const { freelancerDetails, freelancer_id } = data;
  const router = useRouter();


  const sliceName = (fullName) => {
    let parts = fullName?.split(" ");
    let firstName = parts?.[0];
    let lastName = parts?.length > 1 ? parts[parts.length - 1][0] : "";
    return firstName + " " + lastName;
  };

  return (
    <VStack
      color="var(--primarytext)"
      background={"white"}
      width={"270px"}
      gap={5}
      border={"1px solid #DFDFDF"}
      borderRadius={"10px"}
      justifyContent={"space-between"}
      alignItems={"center"}
      padding={"1rem"}
      className="max-md:!w-full"
    >
      <VStack>
        <Avatar
          src={freelancerDetails[0]?.profile_image}
          name={freelancerDetails[0]?.name}
          size="xl"
        />
        <VStack gap={"0"}>
          <Text
            fontSize="1.2rem"
            fontWeight={"bold"}
            marginBottom={"0"}
            textTransform={"capitalize"}
          >
            {sliceName(freelancerDetails[0]?.name) + "."}
          </Text>
          <Text marginBottom={"0"} textAlign={"center"} fontSize={"sm"}>
            {data?.contract_title}
          </Text>
        </VStack>
      </VStack>
      <VStack gap={"0"} w="100%">
        <Button
          colorScheme="primary"
          size="sm"
          w={"100%"}
          onClick={() =>
            router(`/message/${freelancer_id}?contract_ref=${data._id}`)
          }
        >
          Message
        </Button>
      </VStack>
    </VStack>
  );
};

export default ClientProfileCard;
