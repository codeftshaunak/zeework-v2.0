import { Box, Radio, RadioGroup, Stack, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { getSkills } from "../../../helpers/APIs/freelancerApis";

export const SearchFilter = ({ categoryOptions }) => {
  const [skillsOption, setSkillsOption] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("");
  const navigate = useNavigate();

  const findSkills = async () => {
    try {
      const { code, body } = await getSkills(selectedCategory.value);
      if (code === 200)
        setSkillsOption(
          body?.map((item) => ({
            value: item._id,
            label: item.skill_name,
          }))
        );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setSkillsOption([]);
    setSelectedSkills([]);
    if (selectedCategory?.value) findSkills();
  }, [selectedCategory]);

  useEffect(() => {
    const queryParams = [];
    const searchParams = new URLSearchParams(location.search);
    const searchText = decodeURIComponent(searchParams.get("searchText"));

    if (searchText !== "null") {
      queryParams.push(`searchText=${searchText}`);
    }

    if (selectedCategory.value) {
      queryParams.push(`category=${selectedCategory.value}`);
    }

    if (selectedSkills.length > 0) {
      const skillsQuery = selectedSkills.map((skill) => skill.label).join(",");
      queryParams.push(`tech=${skillsQuery}`);
    }

    if (selectedPrice) {
      const priceRange = selectedPrice.split("-");
      const minPrice = priceRange[0];
      const maxPrice = priceRange[1] || "";
      queryParams.push(`min=${minPrice}`);
      if (maxPrice) {
        queryParams.push(`max=${maxPrice}`);
      }
    }

    const queryString = queryParams.join("&");

    navigate(`/marketplace?${queryString}`, { replace: true });
  }, [selectedCategory, selectedPrice, selectedSkills, navigate]);

  return (
    <Box
      alignItems={"start"}
      gap={"5"}
      display={"flex"}
      justifyContent={"center"}
    >
      <Box className="w-full lg:w-[350px] bg-white px-7 py-5 rounded-2xl border border-[var(--bordersecondary)]">
        <Text fontWeight={"500"} fontSize={"1.5rem"} paddingBottom={"0rem"}>
          Filters
        </Text>
        <VStack alignItems={"flex-start"} w={"full"} marginTop={"10px"}>
          <Text fontWeight={"600"} mb={1}>
            Category
          </Text>
          <Select
            placeholder="Select Your Category"
            className="w-full"
            closeMenuOnSelect={true}
            options={categoryOptions}
            onChange={(value) => setSelectedCategory(value)}
            value={selectedCategory}
          />
        </VStack>
        <VStack alignItems={"flex-start"} w={"full"} marginTop={"10px"}>
          <Text fontWeight={"600"} mb={1}>
            Technology
          </Text>
          <Select
            placeholder="Select Your Category"
            className="w-full"
            isMulti={true}
            isDisabled={!skillsOption?.length}
            closeMenuOnSelect={false}
            options={skillsOption}
            onChange={(value) => setSelectedSkills(value)}
            value={selectedSkills}
          />
        </VStack>
        <VStack
          alignItems={"flex-start"}
          justifyContent={"flex-start"}
          marginTop={5}
        >
          <Text fontWeight={"600"} mb={1}>
            Price Range
          </Text>
          <VStack
            alignItems={"flex-start"}
            className="max-lg:!flex-row gap-4 max-[540px]:!flex-col"
          >
            <div className="min-w-max flex flex-col">
              <VStack
                alignItems={"flex-start"}
                justifyContent={"flex-start"}
                w={"full"}
                marginLeft={5}
              >
                <RadioGroup
                  colorScheme="primary"
                  defaultValue=""
                  onChange={(value) => setSelectedPrice(value)}
                >
                  <Stack spacing={2} direction="column">
                    <Radio colorScheme="green" value="">
                      Any Price Range
                    </Radio>
                    <Radio colorScheme="green" value="10-100">
                      $10 - $100
                    </Radio>
                    <Radio colorScheme="green" value="100-500">
                      $100 - $500
                    </Radio>
                    <Radio colorScheme="green" value="500-">
                      $500 - $1000 or above
                    </Radio>
                  </Stack>
                </RadioGroup>
              </VStack>
            </div>
          </VStack>
        </VStack>
      </Box>
    </Box>
  );
};
