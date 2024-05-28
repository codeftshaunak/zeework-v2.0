import { useRef, useState } from "react";
import { HStack, VStack, Box } from "@chakra-ui/react";
import {
  RiDeleteBin2Fill,
  RiEdit2Fill,
  RiInformationFill,
} from "react-icons/ri";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Navigation } from "swiper/modules";
import UniversalModal from "../Modals/UniversalModal";
import { IoArrowBack, IoArrowForwardSharp } from "react-icons/io5";

const ProjectCard = ({ info, setIsDeleteAgencyId, isPrivate }) => {
  const {
    project_name,
    project_images,
    project_description,
    technologies,
    _id,
  } = info || {};
  const [isHover, setIsHover] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <>
      <div className="w-full p-3 border rounded-md -z-0">
        <div
          className="h-40 sm:h-48 w-full bg-cover rounded-md relative transition duration-300 overflow-hidden"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <img
            src={project_images?.[0]}
            alt=""
            className="h-40 sm:h-48 w-full bg-cover rounded-md"
          />
          {isHover && (
            <Box
              transition={"0.6s ease-in-out"}
              className="h-40 sm:h-48 w-full absolute top-0 left-0 bg-black/30 transition duration-300"
            >
              <HStack
                fontSize={"2.5rem"}
                position={"absolute"}
                transform={"translate(-50%, -50%)"}
                top={"50%"}
                left={"50%"}
              >
                <VStack
                  backgroundColor={"white"}
                  borderRadius={"50%"}
                  width={"40px"}
                  height={"40px"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  transition={"0.6s ease-in-out"}
                  cursor={"pointer"}
                  _hover={{
                    border: "2px solid var(--primarycolor)",
                    color: "var(--primarycolor)",
                  }}
                  onClick={() => {
                    setModalType("details"), setIsModal(true);
                  }}
                >
                  <RiInformationFill cursor={"pointer"} fontSize={"25px"} />
                </VStack>
                {!isPrivate && (
                  <>
                    <VStack
                      backgroundColor={"white"}
                      borderRadius={"50%"}
                      width={"40px"}
                      height={"40px"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      transition={"0.6s ease-in-out"}
                      cursor={"pointer"}
                      _hover={{
                        border: "2px solid var(--primarycolor)",
                        color: "var(--primarycolor)",
                      }}
                    >
                      <RiEdit2Fill fontSize={"25px"} />
                    </VStack>
                    <VStack
                      backgroundColor={"white"}
                      borderRadius={"50%"}
                      width={"40px"}
                      height={"40px"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      transition={"0.6s ease-in-out"}
                      cursor={"pointer"}
                      _hover={{
                        border: "2px solid var(--primarycolor)",
                        color: "var(--primarycolor)",
                      }}
                      onClick={() => setIsDeleteAgencyId(_id)}
                    >
                      <RiDeleteBin2Fill cursor={"pointer"} fontSize={"25px"} />
                    </VStack>
                  </>
                )}
              </HStack>
            </Box>
          )}
        </div>
        <h4 className="text-lg sm:text-xl font-semibold capitalize text-gray-800 mt-1 sm:h-12">
          {project_name.slice(0, 50)}
        </h4>
      </div>

      {/* View Project Details */}
      {modalType === "details" && (
        <UniversalModal isModal={isModal} setIsModal={setIsModal} size="4xl">
          <p
            className={`text-2xl sm:text-4xl font-semibold pb-3 px-5 -mx-6 ${
              isScrolled && "border-b shadow"
            }`}
          >
            {project_name}
          </p>
          <div
            onScroll={(e) => {
              setIsScrolled(e.target.scrollTop !== 0);
            }}
            className={`overflow-y-scroll h-[600px] bg-white}`}
            style={{
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            <div className="rounded-lg overflow-hidden relative">
              <Swiper
                slidesPerView={1}
                freeMode={true}
                modules={[Navigation]}
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
              >
                {project_images?.length &&
                  project_images?.map((img, idx) => (
                    <SwiperSlide key={idx}>
                      <img src={img} className="w-full h-fit" />
                    </SwiperSlide>
                  ))}
              </Swiper>
              <>
                <button
                  ref={prevRef}
                  className="absolute top-1/2 left-0 z-20 bg-green-100 rounded-full shadow -mt-4"
                >
                  <IoArrowBack className="text-4xl p-2 text-green-500" />
                </button>
                <button
                  ref={nextRef}
                  className="absolute top-1/2 right-0 z-20 bg-green-100 rounded-full shadow -mt-4"
                >
                  <IoArrowForwardSharp className="text-4xl p-2 text-green-500" />
                </button>
              </>
            </div>
            <div className="flex gap-3 mt-5">
              {technologies?.map((item) => (
                <span
                  key={item}
                  className="py-1 px-3 h-fit bg-slate-100 rounded-md"
                >
                  {item}
                </span>
              ))}
            </div>{" "}
            <div>
              <p className="mt-8 font-semibold text-lg">Description:</p>
              {showFullDescription ? (
                <>{project_description}</>
              ) : (
                <>
                  {project_description.length > 100 ? (
                    <>
                      {project_description.slice(0, 100)}{" "}
                      <button
                        className="text-blue-500 cursor-pointer"
                        onClick={toggleDescription}
                      >
                        See more
                      </button>
                    </>
                  ) : (
                    <>{project_description}</>
                  )}
                </>
              )}
            </div>
          </div>
        </UniversalModal>
      )}
    </>
  );
};

export default ProjectCard;
