import { useEffect, useRef, useState } from "react";
import Title from "./Title";
import {
  getCategories,
  getSubCategory,
} from "../../../helpers/APIs/freelancerApis";
import { Box, Image, Text } from "@chakra-ui/react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
// import required modules
import { Pagination, Navigation } from "swiper/modules";
import ProjectCard from "../../AgencyUI/ProjectCard";

const LeftSide = ({ details }) => {
  const { agency_overview, agency_services, agency_skills, agency_portfolio } =
    details;
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const getCategory = async () => {
    try {
      const { body, code } = await getCategories();
      if (code === 200) setCategoryList(body);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const getSubCategoryList = async () => {
    try {
      if (agency_services?.category) {
        const { body, code } = await getSubCategory(agency_services?.category);
        if (code === 200) setSubCategoryList(body);
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const selectedCategory =
    categoryList?.find((item) => item._id === agency_services?.category) || {};
  const selectedSubCategory =
    subCategoryList?.find(
      (item) => item._id === agency_services?.subCategory
    ) || {};

  useEffect(() => {
    getCategory(), getSubCategoryList();
  }, []);

  return (
    <div className="space-y-16">
      <div>
        <Title>Overview</Title>
        <article className="">
          <div dangerouslySetInnerHTML={{ __html: agency_overview }} />
        </article>
      </div>
      <div>
        <Title>Services</Title>
        <Text marginBottom="0" fontSize={{ base: "1rem", md: "1.2rem" }}>
          {selectedCategory.category_name} /{" "}
          {selectedSubCategory.sub_category_name}
        </Text>
      </div>
      <div>
        <Title>Skills</Title>
        <div className="flex gap-2 flex-wrap">
          {agency_skills?.map((item) => (
            <Text
              key={item}
              textTransform={"capitalize"}
              paddingX={"15px"}
              paddingY={{ base: "4px", md: "6px" }}
              backgroundColor={"#E7F2EB"}
              color={"#355741"}
              borderRadius={"10px"}
            >
              {item}
            </Text>
          ))}
        </div>
      </div>
      <div>
        <Title>Projects</Title>
        {agency_portfolio?.length > 0 ? (
          <div className="sm:mr-12 relative mt-3 z-0">
            <Swiper
              breakpoints={{
                640: {
                  width: 640,
                  slidesPerView: 1,
                },

                768: {
                  width: 768,
                  slidesPerView: 2,
                },
                992: {
                  width: 992,
                  slidesPerView: 3,
                },
              }}
              spaceBetween={30}
              freeMode={true}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              modules={[Navigation, Pagination]}
            >
              {agency_portfolio?.map((item, index) => (
                <SwiperSlide key={index}>
                  <ProjectCard info={item} isPrivate={true} />
                </SwiperSlide>
              ))}
            </Swiper>
            {agency_portfolio?.length > 3 && (
              <>
                <button
                  ref={prevRef}
                  className="absolute top-1/2 -left-2 z-20 bg-green-100 rounded-full shadow -mt-4"
                >
                  <MdNavigateBefore className="text-3xl" />
                </button>
                <button
                  ref={nextRef}
                  className="absolute top-1/2 -right-2 z-20 bg-green-100 rounded-full shadow -mt-4"
                >
                  <MdNavigateNext className="text-3xl" />
                </button>
              </>
            )}
          </div>
        ) : (
          <Box marginTop={"20px"}>
            <Image
              src="./images/404not-added.png"
              width={"150px"}
              display={"block"}
              margin={"auto"}
            ></Image>
            <Text
              fontSize={"1.3rem"}
              textAlign={"center"}
              fontWeight={"600"}
              marginTop={"1.5rem"}
            >
              You haven&apos;t added any projects yet!
            </Text>
            <Text fontSize={"1rem"} textAlign={"center"}>
              Showcase your best work here.
            </Text>
          </Box>
        )}
      </div>
    </div>
  );
};

export default LeftSide;
