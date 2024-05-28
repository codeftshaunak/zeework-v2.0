/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  HStack,
  Input,
  Text,
  VStack,
  Avatar,
  RadioGroup,
  Stack,
  Radio,
} from "@chakra-ui/react";
import { BiSearchAlt } from "react-icons/bi";
import { useSelector } from "react-redux";
import TalentCard from "./TalentCard";
import { useCallback, useEffect, useState } from "react";
import {
  getCategories,
  getFreelancers,
  getSkills,
  getSubCategory,
} from "../../helpers/APIs/freelancerApis";
import Select from "react-select";
import { useLocation } from "react-router-dom";
import TimerDownloadCard from "../Common/TimerDownloadCard";
import talentBanner from "../../assets/banner/search-talent-banner.jpg";
import { CiFilter } from "react-icons/ci";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export const Talents = () => {
  const profile = useSelector((state) => state.profile);
  const { name, profile_image, professional_role } = profile.profile || [];
  return (
    <div>
      <div className="py-6 px-8 flex">
        <div className="w-[75%]">
          <div className="flex justify-between">
            <HStack
              border={"1px solid #D1D5DA"}
              width={"32%"}
              borderRadius={"10px"}
              justifyContent={"center"}
              cursor={"pointer"}
              transition={"0.3s ease-in-out"}
              padding={"1rem 0.5rem"}
              _hover={{
                borderColor: "#22c55e",
              }}
            >
              <img
                src="/images/dashboard/zeework_proposals.png"
                alt="proposals"
              />
              <div>
                <div className="text-sm font-semibold">Find A Job</div>
                <div className="text-sm text-gray-300">
                  Search & apply to your next <br /> job now
                </div>
              </div>
            </HStack>
            <HStack
              border={"1px solid #D1D5DA"}
              width={"32%"}
              borderRadius={"10px"}
              justifyContent={"center"}
              cursor={"pointer"}
              transition={"0.3s ease-in-out"}
              padding={"1rem 0.5rem"}
              _hover={{
                borderColor: "#22c55e",
              }}
            >
              {" "}
              <img src="/images/dashboard/zeework_stats.png" alt="proposals" />
              <div>
                <div className="text-sm font-semibold">My Stats</div>
                <div className="text-sm text-gray-300">
                  Check your earnings & time spent working
                </div>
              </div>
            </HStack>
            <HStack
              border={"1px solid #D1D5DA"}
              width={"32%"}
              borderRadius={"10px"}
              justifyContent={"center"}
              cursor={"pointer"}
              transition={"0.3s ease-in-out"}
              padding={"1rem 0.5rem"}
              _hover={{
                borderColor: "#22c55e",
              }}
            >
              {" "}
              <img src="/images/dashboard/zeework_jobs.png" alt="proposals" />
              <div>
                <div className="text-sm font-semibold">My Jobs</div>
                <div className="text-sm text-gray-300">
                  View your active jobs & proposals
                </div>
              </div>
            </HStack>
          </div>
          <div className="text-xl font-semibold mt-4 capitalize">
            Here are jobs for you
          </div>
          <div className="flex gap-6 px-6 mt-4">
            <div className="text-sm font-medium text-primary border-b-2 border-primary p-2">
              Most Recent Jobs
            </div>
            {/* <div className="text-sm font-medium text-primary border-b-2 border-primary p-2">Best Matches</div> */}
            {/* <div className="text-sm font-medium text-gray-300 p-2">Most Recent Jobs</div> */}
          </div>
          {/* <div className="border border-tertiary rounded-2xl overflow-auto">
            <JobCard jobs={leatestJob} />
          </div> */}
          <div className="text-center p-5">
            <button className="bg-green-500 text-white px-4 py-2 rounded-md">
              See More
            </button>
          </div>
        </div>
        <div className="w-[25%] pl-6">
          <div className="h-[296px] border border-tertiary rounded-2xl">
            <div className="flex flex-col items-center gap-1 pt-6 pb-4 border-b border-tertiary">
              {profile_image == null ? (
                <Avatar name={name} />
              ) : (
                <img
                  src={profile_image}
                  alt="avatar"
                  className="h-[90px] w-[90px] rounded-full border-4 border-tertiary"
                />
              )}
              <div className="text-2xl font-medium cursor-pointer capitalize">
                {name}
              </div>
              <div className="text-sm text-gray-300">{professional_role}</div>
              <div className="flex items-center">
                <div className="star-filled"></div>
                <div className="star-filled"></div>
                <div className="star-filled"></div>
                <div className="star-filled"></div>
                <div className="star-filled"></div>
                <div className="text-sm font-medium">5.0 of 4 Reviews</div>
              </div>
            </div>
            <div className="p-4">
              <div className="text-sm text-gray-400">Complete your Profile</div>
              <div className="flex gap-4 items-center mt-3">
                <div className="w-[80%] h-[5px] bg-green-600 rounded-2xl"></div>
                <div className="text-xs font-semibold">100%</div>
              </div>
            </div>
          </div>
          <TimerDownloadCard />
        </div>
      </div>
    </div>
  );
};

export const SearchTalents = () => {
  const getSearchTermFromURL = () => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get("squery") || "";
  };
  const [page, setPage] = useState(1);
  const [skills, setSkills] = useState([]);
  const [freelancerData, setFreelancerData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState(getSearchTermFromURL());
  const [hourlyRateMin, setHourlyRateMin] = useState(null);
  const [hourlyRateMax, setHourlyRateMax] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState(null);
  const [categorySkills, setCategorySkills] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  // pagination details
  const totalPages = Math.ceil(freelancerData?.totalLength / 20);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  // search function
  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const searchText = form.searchText.value;
    setSearchText(searchText);
  };

  // Define fetchFreelancers function and also more
  const fetchFreelancers = useCallback(async () => {
    setLoading(true);
    // Construct URLSearchParams
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("page", page); // set page number
    if (skills.length > 0) queryParams.set("skills", skills.join(","));
    else queryParams.delete("skills");
    if (searchText) queryParams.set("squery", searchText);
    else queryParams.delete("squery");
    if (hourlyRateMin) queryParams.set("hourlyRateMin", hourlyRateMin);
    else queryParams.delete("hourlyRateMin");
    if (hourlyRateMax) queryParams.set("hourlyRateMax", hourlyRateMax);
    else queryParams.delete("hourlyRateMax");
    if (selectedCategories) queryParams.set("category", selectedCategories);
    else queryParams.delete("category");
    if (selectedSubCategory)
      queryParams.set("subCategory", selectedSubCategory);
    else queryParams.delete("subCategory");

    // Update the URL without navigating
    const newUrl = `?${queryParams.toString()}`;
    window.history.replaceState({}, "", newUrl);

    try {
      if (
        page ||
        skills?.length ||
        searchText ||
        hourlyRateMin ||
        hourlyRateMax ||
        selectedCategories ||
        selectedSubCategory?.length
      ) {
        const { body, code } = await getFreelancers(
          page,
          skills,
          searchText,
          hourlyRateMin,
          hourlyRateMax,
          selectedCategories,
          selectedSubCategory
        );

        if (code === 200) setFreelancerData(body);
      }
    } catch (error) {
      console.error("Error fetching freelancer data:", error);
    }
    setLoading(false);
  }, [
    page,
    skills,
    searchText,
    hourlyRateMin,
    hourlyRateMax,
    selectedSubCategory,
    selectedCategories,
  ]);

  // Fetch freelancers whenever dependencies change
  useEffect(() => {
    fetchFreelancers();
  }, [fetchFreelancers]);

  // Calling Category ApI
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { body, code } = await getCategories();
        if (code === 200) setCategoryData(body);
      } catch (error) {
        console.error("Error fetching freelancer data:", error);
      }
    };
    fetchCategory();
  }, []);

  // ===== get subcategory
  useEffect(() => {
    const fetchSubCategory = async () => {
      if (!selectedCategories) return;
      try {
        const { body, code } = await getSubCategory(selectedCategories);
        if (code === 200) setSubCategory(body);
      } catch (error) {
        console.error("Error fetching subcategory data:", error);
      }
    };
    fetchSubCategory();
  }, [selectedCategories]);

  // calling skills API
  useEffect(() => {
    const fetchSkills = async () => {
      if (!selectedCategories) return;
      try {
        const { body, code } = await getSkills(selectedCategories);
        if (code === 200) setCategorySkills(body);
      } catch (error) {
        console.error("Error fetching freelancer data:", error);
      }
    };
    fetchSkills();
  }, [selectedCategories]);

  const handleHourlyRateChange = (value) => {
    switch (value) {
      case "1":
        setHourlyRateMin(null);
        setHourlyRateMax(null);
        break;
      case "2":
        setHourlyRateMin(10);
        setHourlyRateMax(30);
        break;
      case "3":
        setHourlyRateMin(30);
        setHourlyRateMax(50);
        break;
      case "4":
        setHourlyRateMin(50);
        setHourlyRateMax(100);
        break;
      case "5":
        setHourlyRateMin(100);
        setHourlyRateMax(null);
        break;
      default:
        break;
    }
  };

  // category function
  const handleCategoryChange = (value) => {
    if (selectedCategories !== value) {
      setSelectedCategories(value);
      setSelectedSubCategory(null);
    }
  };

  // handel subcategory
  const handleSubCategoryChange = (value) => {
    setSelectedSubCategory(value);
  };

  return (
    <div className="w-full mx-auto">
      <div className="py-6 flex w-full">
        <div className="w-[40%] max-xl:hidden">
          {/* filtering items */}
          <VStack
            marginTop={"1rem"}
            alignItems={"start"}
            padding={5}
            gap={"5"}
            bgColor={"white"}
            rounded={"2xl"}
            width={"90%"}
          >
            <Text fontWeight={"500"} fontSize={"1.5rem"}>
              Find Talent
            </Text>
            <VStack alignItems={"flex-start"} justifyContent={"flex-start"}>
              <Text fontWeight={"600"}>Category</Text>
              <VStack padding={"0 0.5rem 0"} alignItems={"flex-start"} mt={1}>
                <RadioGroup defaultValue="2">
                  <Stack spacing={2} direction="column">
                    {categoryData?.map((category) => (
                      <VStack key={category._id} spacing={2} align="start">
                        <Radio
                          colorScheme="green"
                          value={category?._id}
                          isChecked={selectedCategories === category?._id}
                          onChange={() => handleCategoryChange(category?._id)}
                        >
                          {category?.category_name}
                        </Radio>
                        {selectedCategories === category?._id &&
                          subCategory.length > 0 && (
                            <VStack
                              spacing={2}
                              paddingLeft={5}
                              direction="column"
                              width={250}
                            >
                              <Select
                                className="w-full"
                                isMulti
                                options={subCategory.map((sub) => ({
                                  value: sub._id,
                                  label: sub.sub_category_name,
                                }))}
                                onChange={(selectedOptions) =>
                                  handleSubCategoryChange(selectedOptions)
                                }
                              />
                            </VStack>
                          )}
                      </VStack>
                    ))}
                  </Stack>
                </RadioGroup>
              </VStack>
            </VStack>

            <VStack
              alignItems={"flex-start"}
              justifyContent={"flex-start"}
              w={"full"}
            >
              <Text fontWeight={"600"}>Hourly Rate</Text>
              <RadioGroup
                padding={"0 0.5rem 0"}
                defaultValue="1"
                mt={1}
                onChange={(value) => handleHourlyRateChange(value)}
              >
                <Stack spacing={4} direction="column">
                  <Radio colorScheme="green" value="1">
                    Any hourly rate
                  </Radio>
                  <Radio colorScheme="green" value="2">
                    $10 - 30$
                  </Radio>
                  <Radio colorScheme="green" value="3">
                    $30 - 50$
                  </Radio>
                  <Radio colorScheme="green" value="4">
                    $50 - 100$
                  </Radio>
                  <Radio colorScheme="green" value="5">
                    $100 & above
                  </Radio>
                </Stack>
              </RadioGroup>
            </VStack>
          </VStack>
        </div>
        <div className="w-full mt-4">
          <div className="border border-[var(--bordersecondary)] rounded-2xl mb-4 overflow-hidden">
            <img src={talentBanner} className="" />
          </div>
          <div className="text-2xl font-semibold mb-4">
            Find Your Perfect Freelancer
          </div>

          <form onSubmit={handleSearch}>
            <HStack
              width={"100%"}
              justifyContent={"space-evenly"}
              marginX={"auto"}
              marginBottom={"0.9rem"}
            >
              <Input
                name="searchText"
                placeholder="Search for open positions..."
                bgColor={"white"}
                onKeyDown={(e) => {
                  if (e.key === "Enter");
                }}
              />
              <button
                type="button"
                onClick={() => {
                  setShowFilter(!showFilter);
                }}
                className="xl:hidden"
              >
                <Box
                  fontWeight={"800"}
                  fontSize={"1.5rem"}
                  border={"1px solid var(--primarycolor)"}
                  padding={"5px 10px"}
                  borderRadius={"5px"}
                  backgroundColor={"white"}
                  cursor={"pointer"}
                  color={"var(--primarycolor)"}
                  transition={"0.3s ease-in-out"}
                  _hover={{
                    backgroundColor: "var(--primarycolor)",
                    color: "#fff",
                  }}
                >
                  <CiFilter />
                </Box>
              </button>
              <button type="submit">
                <Box
                  fontWeight={"800"}
                  fontSize={"1.5rem"}
                  border={"1px solid var(--primarycolor)"}
                  padding={"5px 10px"}
                  borderRadius={"5px"}
                  backgroundColor={"var(--primarycolor)"}
                  cursor={"pointer"}
                  color={"white"}
                  transition={"0.3s ease-in-out"}
                  _hover={{
                    backgroundColor: "#fff",
                    color: "#000",
                  }}
                >
                  <BiSearchAlt />
                </Box>
              </button>
            </HStack>
          </form>
          <div
            className={`w-full xl:hidden ${showFilter === true ? "" : "hidden"
              }`}
          >
            {/* filtering items */}
            <VStack
              marginTop={"1rem"}
              alignItems={"start"}
              padding={5}
              gap={"5"}
              bgColor={"white"}
              rounded={"2xl"}
              width={"100%"}
            >
              <Text fontWeight={"500"} fontSize={"1.5rem"}>
                Find Talent
              </Text>
              <VStack alignItems={"flex-start"} justifyContent={"flex-start"}>
                <Text fontWeight={"600"}>Category</Text>
                <VStack padding={"0 0.5rem 0"} alignItems={"flex-start"} mt={1}>
                  <RadioGroup defaultValue="2">
                    <Stack spacing={2} direction="column">
                      {categoryData?.map((category) => (
                        <VStack key={category._id} spacing={2} align="start">
                          <Radio
                            colorScheme="green"
                            value={category?._id}
                            isChecked={selectedCategories === category?._id}
                            onChange={() => handleCategoryChange(category?._id)}
                          >
                            {category?.category_name}
                          </Radio>
                          {selectedCategories === category?._id &&
                            subCategory.length > 0 && (
                              <VStack
                                spacing={2}
                                paddingLeft={5}
                                direction="column"
                                width={250}
                              >
                                <Select
                                  className="w-full"
                                  isMulti
                                  options={subCategory.map((sub) => ({
                                    value: sub._id,
                                    label: sub.sub_category_name,
                                  }))}
                                  onChange={(selectedOptions) =>
                                    handleSubCategoryChange(selectedOptions)
                                  }
                                />
                              </VStack>
                            )}
                        </VStack>
                      ))}
                    </Stack>
                  </RadioGroup>
                </VStack>
              </VStack>

              <VStack
                alignItems={"flex-start"}
                justifyContent={"flex-start"}
                w={"full"}
              >
                <Text fontWeight={"600"}>Hourly Rate</Text>
                <RadioGroup
                  padding={"0 0.5rem 0"}
                  defaultValue="1"
                  mt={1}
                  onChange={(value) => handleHourlyRateChange(value)}
                >
                  <Stack spacing={4} direction="column">
                    <Radio colorScheme="green" value="1">
                      Any hourly rate
                    </Radio>
                    <Radio colorScheme="green" value="2">
                      $10 - 30$
                    </Radio>
                    <Radio colorScheme="green" value="3">
                      $30 - 50$
                    </Radio>
                    <Radio colorScheme="green" value="4">
                      $50 - 100$
                    </Radio>
                    <Radio colorScheme="green" value="5">
                      $100 & above
                    </Radio>
                  </Stack>
                </RadioGroup>
              </VStack>
            </VStack>
          </div>
          <div className=" mt-10 w-[100%]">
            <TalentCard
              freelancerData={freelancerData?.data}
              loading={loading}
            />
            {/* Pagination */}
            {pages?.length > 0 && (
              <div className="flex gap-5 justify-end mt-5 text-[var(--primarycolor)] font-semibold">
                <button
                  className={`flex gap-2 items-center ${freelancerData?.current_page === 1 && "text-gray-300"
                    }`}
                  onClick={() => setPage(freelancerData?.current_page - 1)}
                  disabled={freelancerData?.current_page === 1}
                >
                  <MdKeyboardArrowLeft className="text-2xl" />
                  Previous
                </button>
                <div>
                  {pages.map((page) => (
                    <button
                      key={page}
                      className={`mx-1 w-7 h-7 rounded-full border border-[var(--primarycolor)]  ${freelancerData?.current_page === page
                        ? "bg-[var(--primarycolor)] text-white"
                        : "bg-white"
                        }`}
                      onClick={() => setPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  className={`flex gap-2 items-center ${freelancerData?.current_page === pages[pages.length - 1] &&
                    "text-gray-300"
                    }`}
                  onClick={() => setPage(freelancerData?.current_page + 1)}
                  disabled={
                    freelancerData?.current_page === pages[pages.length - 1]
                  }
                >
                  Next <MdKeyboardArrowRight className="text-2xl" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
