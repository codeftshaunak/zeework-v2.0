import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  HStack,
  Box,
  Input,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  Select,
  useToast,
} from "@chakra-ui/react";
import { getCategories, getCountries } from "../../helpers/APIs/freelancerApis";
import { getSubCategory } from "../../helpers/APIs/freelancerApis";
import { createAgency } from "../../helpers/APIs/agencyApis";
import { useRouter } from 'next/router';
import { CurrentUserContext } from "../../Contexts/CurrentUser";
import BtnSpinner from "../Skeletons/BtnSpinner";

const CreateForm = () => {
  const { handleSubmit, watch, register } = useForm();
  const { getUserDetails } = useContext(CurrentUserContext);
  const selectedCategory = watch("agency_services.category");
  const [countries, setCountries] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const router = useRouter();

  const toast = useToast();

  const getCountriesList = async () => {
    try {
      const { code, body } = await getCountries();
      if (code === 200) setCountries(body);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategoryList = async () => {
    try {
      const { body, code } = await getCategories();
      if (code === 200) setCategory(body);
    } catch (error) {
      console.log(error);
    }
  };

  const getSubCategoryList = async (category_id) => {
    try {
      const { body, code } = await getSubCategory(category_id);
      if (code === 200) setSubCategories(body);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCountriesList();
    getCategoryList();
  }, []);

  useEffect(() => {
    if (selectedCategory) getSubCategoryList(selectedCategory);
  }, [selectedCategory]);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const { code, msg } = await createAgency({
        ...data,
        agency_location: JSON.parse(data.agency_location),
      });
      console.log(code, msg);
      if (code === 200) {
        toast({
          title: msg,
          status: "success",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
        getUserDetails();

        router(-1);
      } else {
        toast({
          title: msg,
          status: "warning",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <HStack width={"100%"} margin={"auto"} alignItems={"center"}>
      <Box
        p={4}
        width={["90%", "60%"]}
        margin={"auto"}
        padding={"20px 40px"}
        borderRadius={"15px"}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full shadow p-9 rounded-lg bg-white"
        >
          <FormControl mb={5}>
            <FormLabel fontSize={"xl"}>Agency Name</FormLabel>
            <Input
              {...register("agency_name")}
              placeholder="ZeeWork"
              fontSize={"1.1rem"}
              required
            />
          </FormControl>
          <FormControl mb={5}>
            <FormLabel fontSize={"xl"}>Agency Overview</FormLabel>
            <Textarea
              {...register("agency_overview")}
              fontSize={"1.1rem"}
              placeholder="This is an agency with highly creating value. We provide services to people who need to start there business."
              required
            />
          </FormControl>
          <FormControl mb={5}>
            <FormLabel fontSize={"xl"}>Agency Tagline</FormLabel>
            <Input
              {...register("agency_tagline")}
              fontSize={"1.1rem"}
              placeholder="We are working for create impact on the world"
              required
            />
          </FormControl>
          <FormControl mb={5}>
            <FormLabel fontSize={"xl"}>Agency Location</FormLabel>
            <Select
              {...register("agency_location")}
              fontSize={"1.1rem"}
              placeholder="Select Your Category"
              required
            >
              {countries?.map((country, index) => (
                <option key={index} value={JSON.stringify(country)}>
                  {country.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl mb={5}>
            <FormLabel fontSize={"xl"}>Services Category</FormLabel>
            <Select
              {...register("agency_services.category")}
              fontSize={"1.1rem"}
              placeholder="Select Your Category"
              required
            >
              {category?.map((country, index) => (
                <option key={index} value={country._id}>
                  {country?.category_name}
                </option>
              ))}
            </Select>
          </FormControl>

          {subCategories?.length > 0 && (
            <FormControl mb={5}>
              <FormLabel fontSize={"xl"}>Services Sub-Category</FormLabel>
              <Select
                {...register("agency_services.subCategory")}
                placeholder="Select Your Sub-Category"
                fontSize={"1.1rem"}
                required
              >
                {subCategories?.map((subCategory) => (
                  <option key={subCategory._id} value={subCategory._id}>
                    {subCategory.sub_category_name}
                  </option>
                ))}
              </Select>
            </FormControl>
          )}
          <Box textAlign={"right"}>
            <Button
              isLoading={loading}
              loadingText="Submit"
              colorScheme="primary"
              type="submit"
              spinner={<BtnSpinner />}
              marginTop={3}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </HStack>
  );
};

export default CreateForm;
