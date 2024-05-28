import {
  Avatar,
  HStack,
  VStack,
  Box,
  Input,
  Flex,
  Text,
  Skeleton,
} from "@chakra-ui/react";
import { BsSendFill } from "react-icons/bs";

export const MessageUsersSkeleton = () => {
  return (
    <div>
      <Flex
        className="h-[90px] w-full border rounded-2xl bg-white mt-[2rem] cursor-pointer opacity-50"
        cursor={"not-allowed"}
        alignItems={"center"}
      >
        <Flex
          align="center"
          alignItems={"center"}
          justify="between"
          py={2}
          px={4}
        >
          <Box width="85px">
            <Avatar size="md" round="20px" />
          </Box>
          <Box width="full" marginLeft={4}>
            <Skeleton width={"100px"} height={3}></Skeleton>
            <Skeleton width={"120px"} height={2} marginTop={3}></Skeleton>
            <Skeleton width={18} height={2} marginTop={2}></Skeleton>
          </Box>
        </Flex>
      </Flex>
    </div>
  );
};

export const MessageBodySkeleton = () => {
  return (
    <Box
      width="100%"
      px={"20px"}
      marginLeft={"1.5rem"}
      py={"1rem"}
      borderRadius={"15px"}
      position={"relative"}
      height={"80%"}
      overflow={"hidden"}
      className="border shadow-sm bg-white"
      cursor={"not-allowed"}
    >
      <Flex
        borderBottom="1px"
        borderColor="gray.400"
        h="60px"
        py={2}
        gap={3}
        alignItems={"center"}
      >
        <Avatar size="md" round="20px" />
        <Flex flexDir="column">
          <Skeleton width={16} height={3}></Skeleton>
          <Skeleton width={40} height={2} marginTop={3}></Skeleton>
        </Flex>
      </Flex>

      <VStack
        alignItems={"start"}
        width={"100%"}
        height={"100%"}
        position={"relative"}
      >
        <Box
          height={"69vh"}
          overflowY={"auto"}
          width={"100%"}
          display={"flex"}
          flexDir={"column"}
          justifyContent={"flex-start"}
        >
          <HStack marginTop={2}>
            <Avatar size="md" round="20px" opacity={"0.5"} />
            <Flex flexDir="column" gap={2}>
              <Skeleton height={3} width={"100px"} rounded={"sm"}></Skeleton>
              <Skeleton width={"450px"} height={2} rounded={"sm"}></Skeleton>
            </Flex>
          </HStack>
          <HStack marginLeft={"auto"}>
            <VStack justifyContent={"end"} alignItems={"end"}>
              <Skeleton height={3} width={"100px"} rounded={"sm"}></Skeleton>
              <Skeleton width={"450px"} height={2} rounded={"sm"}></Skeleton>
            </VStack>
            <Avatar size="md" round="20px" opacity={"0.5"} />
          </HStack>
          <HStack alignItems={"start"} marginTop={2}>
            <Avatar size="md" round="20px" opacity={"0.5"} />
            <Flex flexDir="column" gap={2}>
              <Skeleton height={3} width={"100px"} rounded={"sm"}></Skeleton>
              <Skeleton width={"450px"} height={2} rounded={"sm"}></Skeleton>
            </Flex>
          </HStack>
          <HStack marginLeft={"auto"}>
            <VStack justifyContent={"end"} alignItems={"end"}>
              <Skeleton height={3} width={"100px"} rounded={"sm"}></Skeleton>
              <Skeleton width={"450px"} height={2} rounded={"sm"}></Skeleton>
            </VStack>
            <Avatar size="md" round="20px" opacity={"0.5"} />
          </HStack>
        </Box>
        <HStack
          marginTop={"1rem"}
          width={"43%"}
          margin={"auto"}
          height={"35px"}
          padding={"0 10px"}
          justifyContent={"space-between"}
          position={"fixed"}
          bottom={"3rem"}
          className="rounded"
        >
          <Input placeholder="Write your message here" width={"95%"} disabled />
          <VStack
            border={"1px solid gray"}
            height={"40px"}
            width={"50px"}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius={"5px"}
            borderColor={"ButtonFace"}
          >
            <BsSendFill fontSize={"20px"} />
          </VStack>
        </HStack>
      </VStack>
    </Box>
  );
};
