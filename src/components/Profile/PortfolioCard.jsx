import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination, Navigation } from "swiper/modules";
import { RiDeleteBin2Fill, RiEdit2Fill } from "react-icons/ri";
import { HStack, VStack, Box, Button, useToast } from "@chakra-ui/react";
import UniversalModal from "../Modals/UniversalModal";
import { IoMdClose } from "react-icons/io";
import { FaCloudUploadAlt } from "react-icons/fa";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import BtnSpinner from "../Skeletons/BtnSpinner";
import {
  deleteFreelancerPortfolio,
  getSkills,
} from "../../helpers/APIs/freelancerApis";
import { useDispatch } from "react-redux";
import { profileData } from "../../redux/authSlice/profileSlice";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { IoArrowBack, IoArrowForwardSharp } from "react-icons/io5";

const selectStyle = {
  multiValue: (styles) => ({
    ...styles,
    backgroundColor: "#22C35E",
    color: "#fff",
  }),
  multiValueLabel: (styles) => ({
    ...styles,
    color: "#fff",
  }),
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? "#ccc" : provided.borderColor,
    boxShadow: state.isFocused ? "0 0 0 1px #ccc" : provided.boxShadow,
    "&:hover": {
      borderColor: state.isFocused ? "#ccc" : provided.borderColor,
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#d1f3dd" : null,
    ":hover": {
      ...provided[":hover"],
      backgroundColor: "#d1f3dd",
      color: "colorForTextOnGreen",
    },
  }),
};

const PortfolioCard = ({ portfolio, categories, viewAs }) => {
  const { project_name, attachements, project_description, technologies, _id } =
    portfolio;
  const [isHover, setIsHover] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isDetails, setIsDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const animatedComponents = makeAnimated();
  const [options, setOptions] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [portfolioInput, setPortfolioInput] = useState({
    project_name: "",
    project_description: "",
    technologies: "",
  });
  const dispatch = useDispatch();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const toast = useToast();
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  // Handle Media Image Uploaded
  const handleImageUpload = (e) => {
    const files = e.target.files;
    const newImages = [...selectedImages];

    // Calculate the number of images already selected
    const totalImagesSelected = newImages.length;

    // Calculate the maximum number of images that can be added
    const maxImagesToAdd = Math.min(3 - totalImagesSelected, files.length);

    // Add new images up to the maximum limit
    for (let i = 0; i < maxImagesToAdd; i++) {
      newImages.push(files[i]);
    }

    // Update the state with the new images
    setSelectedImages(newImages);
  };

  const handleImageDelete = (indexToRemove) => {
    const updatedImages = selectedImages.filter(
      (_, index) => index !== indexToRemove
    );
    setSelectedImages(updatedImages);
  };

  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };

  // get skills Methods
  const getCategorySkills = async () => {
    try {
      const validCategoryIds = categories?.filter((category) => category._id);
      const promises = validCategoryIds?.map(async ({ _id }) => {
        try {
          const { body, code } = await getSkills(_id);
          if (code === 200) {
            return body?.map((item) => ({
              value: item?.skill_name,
              label: item?.skill_name,
              _id: item?._id,
            }));
          } else {
            return [];
          }
        } catch (error) {
          console.error(`Error fetching skills for category ID ${_id}:`, error);
          return [];
        }
      });

      const results = await Promise.all(promises);
      const newSkillOptions = results.flat();

      setOptions(newSkillOptions);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  // handle to delete portfolio
  const handleDeletePortfolio = async () => {
    setIsLoading(true);
    try {
      const { body, code, msg } = await deleteFreelancerPortfolio(_id);
      if (code === 200) {
        dispatch(profileData({ profile: body }));
        toast({
          title: msg,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        toast({
          title: msg,
          status: "warning",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to delete portfolio!",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
    setIsLoading(false);
    setIsDeleteModal(false);
  };

  useEffect(() => {
    if (isModal) getCategorySkills();
  }, [isModal]);

  return (
    <>
      <div
        className="flex flex-col rounded-md -z-10 relative overflow-hidden w-full border"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div className="overflow-hidden">
          {attachements && (
            <Swiper
              pagination={{
                dynamicBullets: true,
              }}
              modules={[Pagination]}
            >
              {attachements?.length &&
                attachements?.map((item) => (
                  <SwiperSlide
                    key={item}
                    className="flex items-center justify-center"
                  >
                    <img
                      src={item}
                      className="h-48 object-cover rounded-t w-full"
                    />
                  </SwiperSlide>
                ))}
            </Swiper>
          )}
        </div>
        <p className="text-[14px] text-[var(--primarycolor)] cursor-pointer font-[600] border px-3 py-2 rounded-b">
          {project_name}
        </p>
        {isHover && !viewAs && (
          <Box
            transition={"0.6s ease-in-out"}
            className="h-48 w-full absolute top-0 left-0 bg-black/30 transition duration-300 z-10"
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
                  // backgroundColor: "transparent",
                  color: "var(--primarycolor)",
                }}
                onClick={() => setIsDetails(true)}
              >
                <BsFillInfoCircleFill cursor={"pointer"} fontSize={"20px"} />
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
                  // backgroundColor: "transparent",
                  color: "var(--primarycolor)",
                }}
                onClick={() => setIsModal(true)}
              >
                <RiEdit2Fill cursor={"pointer"} fontSize={"20px"} />
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
                  // backgroundColor: "transparent",
                  color: "var(--primarycolor)",
                }}
                onClick={() => setIsDeleteModal(true)}
              >
                <RiDeleteBin2Fill cursor={"pointer"} fontSize={"20px"} />
              </VStack>
            </HStack>
          </Box>
        )}
      </div>
      {/* Update Portfolio */}
      <UniversalModal
        isModal={isModal}
        setIsModal={setIsModal}
        title="Update Portfolio Project"
      >
        <div className="flex flex-col gap-[16px]">
          <div className="flex flex-col">
            <div className="flex flex-col gap-[2px]">
              <p className="text-[14px] font-[500] text-[#374151] mb-2">
                Project Name
              </p>
              <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                <input
                  required
                  type="text"
                  className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[var(--bordersecondary)] "
                  placeholder="Project Name"
                  onChange={(e) =>
                    setPortfolioInput({
                      ...portfolioInput,
                      project_name: e.target.value,
                    })
                  }
                />
              </div>
              <br />
            </div>
            <div className="flex flex-col gap-[2px]">
              <p className="text-[14px] font-[500] text-[#374151] mb-2">
                Project Description
              </p>
              <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                <textarea
                  required
                  type="text"
                  onChange={(e) =>
                    setPortfolioInput({
                      ...portfolioInput,
                      project_description: e.target.value,
                    })
                  }
                  className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[var(--bordersecondary)] "
                  placeholder="Description"
                />
              </div>
              <br />
            </div>
            <div className="flex flex-col gap-[2px]">
              <p className="text-[14px] font-[500] text-[#374151] mb-2">
                Technologies
              </p>
              <div className="w-[100%] outline-none border-[1px] rounded-md">
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  options={options}
                  onChange={handleChange}
                  required
                  styles={selectStyle}
                />
              </div>
            </div>
            <div className="flex flex-col gap-[2px] mt-6">
              <p className="text-[14px] font-[500] text-[#374151] mb-2">
                Media
              </p>
              <div className="w-[100%] p-[12px] outline-none border-[1px] rounded-md flex">
                <div className="flex">
                  {selectedImages?.map((image, index) => (
                    <div
                      key={index}
                      className="rounded border border-green-300 mr-2 relative"
                    >
                      <img
                        src={URL?.createObjectURL(image)}
                        alt={`Selected ${index + 1}`}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <span
                        className="h-5 w-5 bg-red-50/10 rounded-full absolute top-0 right-0 flex items-center justify-center cursor-pointer backdrop-blur backdrop-filter hover:bg-red-100 hover:text-red-500"
                        onClick={() => handleImageDelete(index)}
                      >
                        <IoMdClose />
                      </span>
                    </div>
                  ))}
                </div>

                {selectedImages.length < 3 && (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      name="file"
                      multiple
                      style={{ display: "none" }}
                      id="fileInput"
                      disabled={selectedImages.length >= 3}
                    />
                    <label htmlFor="fileInput">
                      <div
                        className={`w-24 h-20 border border-green-400 rounded cursor-pointer bg-green-100 hover:bg-green-200 flex flex-col items-center justify-center text-center`}
                      >
                        <span>
                          <FaCloudUploadAlt className="text-2xl text-center" />
                        </span>
                        <span className="font-semibold">
                          {selectedImages?.length > 0 ? "Add More" : "Add"}
                        </span>
                      </div>
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-2">
            <Button
              loadingText="Updating"
              colorScheme="primary"
              type="submit"
              spinner={<BtnSpinner />}
            >
              Update
            </Button>
          </div>
        </div>
      </UniversalModal>

      {/* Delete Portfolio */}
      <UniversalModal isModal={isDeleteModal} setIsModal={setIsDeleteModal}>
        <p className="text-xl sm:text-2xl font-semibold">
          Are you sure you want to delete this portfolio?
        </p>
        <br />
        <p>
          This action will delete &quot;{project_name}&quot; from all of your
          profiles. Are you sure to want to delete this portfolio project?
        </p>

        <div className="flex gap-5 sm:gap-10 mt-8 sm:mt-20">
          <Button
            colorScheme="primary"
            variant={"outline"}
            width={"full"}
            onClick={() => setIsDeleteModal(false)}
          >
            No, I don&apos;t want to Delete
          </Button>
          <Button
            isLoading={isLoading}
            loadingText="Deleting.."
            colorScheme="primary"
            width={"full"}
            spinner={<BtnSpinner />}
            onClick={handleDeletePortfolio}
          >
            Yes, I want to Delete
          </Button>
        </div>
      </UniversalModal>

      {/* View Portfolio Details */}
      <UniversalModal isModal={isDetails} setIsModal={setIsDetails} size="4xl">
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
              {attachements?.length &&
                attachements?.map((img, idx) => (
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
    </>
  );
};

export default PortfolioCard;
