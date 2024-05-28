import { Swiper, SwiperSlide } from "swiper/react";
import { IoArrowBack, IoArrowForwardSharp } from "react-icons/io5";
import { Button, Tooltip } from "@chakra-ui/react";

// Import Swiper styles
import "swiper/css";
// import required modules
import { Navigation } from "swiper/modules";

import { useRef } from "react";
import { useRouter } from 'next/router';
import HorizontalCardSkeleton from "../../Skeletons/HorizontalCardSkeleton";

export const GigCard = ({ data, isPurchaseReq, tabIndex }) => {
  const { title, images, pricing, _id, status, user_details } = data || {};
  const { firstName, lastName, profile_image } = user_details || {};
  const router = useRouter();


  return (
    <div
      className="w-full rounded-lg shadow p-4 border bg-white flex flex-col justify-between cursor-pointer"
      onClick={() =>
        router(`/gig-details/${_id}`, {
          state: { status: isPurchaseReq ? "pending" : status },
        })
      }
    >
      <div>
        <img
          className="w-full h-40 object-cover rounded"
          src={images?.[0]}
          alt="gig img"
        />
        <div className=" pt-4 border-t">
          <div className="flex items-center">
            <img
              src={profile_image}
              alt="user"
              className="inline-block w-[30px] h-[30px] border border-gray-200 rounded-full shadow-md object-cover cursor-pointer mb-3 border-solid"
            />
            <p className="font-semibold text-xs ml-2 mb-2">
              {firstName + " " + lastName?.slice(0, 1) + "."}
            </p>
          </div>
          <div className="text-left text-md">
            <Tooltip hasArrow label={title} bg="gray.500" placement="top">
              {title?.length > 50
                ? `I will ${title.slice(0, 50)}..`
                : `I will  ${title}`}
            </Tooltip>
          </div>
          <div className="flex flex-col justify-start items-start mt-2">
            <p className="text-gray-700 text-sm">
              Delivery time - Est. {pricing?.delivery_days} days
            </p>
            <p className="font-semibold text-md items-center">
              From ${pricing?.service_price}
            </p>
          </div>
        </div>

        <div className="flex">
          {
            tabIndex === 0 && (
              <button
                className="bg-primary px-[10px] py-[3px] rounded-sm text-white mt-2 font-semibold"
                onClick={() => router(`/gig-details/${_id}`)}
                disabled={isPurchaseReq || tabIndex === 1 || tabIndex === 2}
              >
                {isPurchaseReq ? "Requested" : "Order Now"}
              </button>
            )
            // (
            //   <>
            //     <Button
            //       colorScheme="primary"
            //       rounded={"lg"}
            //       paddingTop={"3px"}
            //       paddingBottom={"3px"}
            //       paddingX={"20px"}
            //       onClick={() =>
            //         router(`/gig-details/${_id}`, { state: { status } })
            //       }
            //     >
            //       Details
            //     </Button>
            //   </>
            // )
          }
        </div>
      </div>
    </div>
  );
};

const GigDisplayCards = ({ allOffers, purchasesReq, tabIndex, isLoading }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="w-full relative -z-0 px-2">
      {isLoading ? (
        <HorizontalCardSkeleton />
      ) : (
        <>
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              768: {
                // width: 768,
                slidesPerView: 2,
              },
              1280: {
                // width: 1024,
                slidesPerView: 3,
              },
            }}
            freeMode={true}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
          >
            {allOffers?.map((gig, index) => (
              <SwiperSlide key={index} className="w-full">
                <GigCard
                  data={gig}
                  isPurchaseReq={
                    purchasesReq &&
                    purchasesReq?.some((item) => item.gig_id === gig._id)
                  }
                  tabIndex={tabIndex}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          {allOffers?.length > 2 && (
            <>
              <button
                ref={prevRef}
                className="absolute top-1/2 -left-2 z-20 bg-green-100 rounded-full shadow -mt-4"
              >
                <IoArrowBack className="text-4xl p-2 text-green-500" />
              </button>
              <button
                ref={nextRef}
                className="absolute top-1/2 -right-2 z-20 bg-green-100 rounded-full shadow -mt-4"
              >
                <IoArrowForwardSharp className="text-4xl p-2 text-green-500" />
              </button>
            </>
          )}
        </>
      )}
      {!isLoading && !allOffers?.length && (
        <p className="py-6">You haven&apos;t gigs!</p>
      )}
    </div>
  );
};

export default GigDisplayCards;
