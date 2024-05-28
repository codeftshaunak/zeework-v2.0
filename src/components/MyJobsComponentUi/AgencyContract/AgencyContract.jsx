import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button, Stack, Text, VStack } from "@chakra-ui/react";
import HorizontalCardSkeleton from "../../Skeletons/HorizontalCardSkeleton";
import { useNavigate } from "react-router-dom";
import ContractCard from "./ContractCard";

const AgencyContract = ({ contractList, loading }) => {
  const swiperRef = useRef();
  const navigate = useNavigate();

  return (
    <div className="w-full pb-7">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-12">
          <div>
            <h2 className="mt-8 mb-4 text-2xl font-medium">
              Agency Contract Jobs
            </h2>
          </div>

          {loading ? (
            <Stack
              paddingX={4}
              className="border border-[var(--bordersecondary)] rounded-lg"
            >
              <HorizontalCardSkeleton />
            </Stack>
          ) : contractList?.length > 0 ? (
            <div className="my-4">
              <Swiper
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{
                  768: {
                    // width: 768,
                    slidesPerView: 2,
                  },
                  1024: {
                    // width: 1024,
                    slidesPerView: 3,
                  },
                }}
                onBeforeInit={(swiper) => {
                  swiperRef.current = swiper;
                }}
              >
                {contractList?.length > 0 &&
                  contractList?.map((job, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <ContractCard job={job} />
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </div>
          ) : (
            <VStack
              alignItems={"center"}
              justifyContent={"center"}
              className="border border-[var(--bordersecondary)] rounded-lg"
              height={"10rem"}
              bgColor={"white"}
            >
              <Text
                fontSize={"1.2rem"}
                textTransform={"capitalize"}
                fontWeight={"600"}
                marginBottom={"10px"}
              >
                Currently No Contract Jobs
              </Text>
              <Button
                borderRadius={"25px"}
                fontWeight={"500"}
                backgroundColor={"var(--primarycolor)"}
                color={"white"}
                _hover={{
                  border: "1px solid var(--primarycolor)",
                  backgroundColor: "white",
                  color: "black",
                }}
                onClick={() => navigate("/find-job")}
              >
                Find Jobs Now
              </Button>
            </VStack>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgencyContract;
