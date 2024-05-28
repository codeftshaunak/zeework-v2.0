import { useEffect, useState } from "react";
import { VStack, Text, HStack, Button } from "@chakra-ui/react";
import { RiEdit2Fill } from "react-icons/ri";
import UniversalModal from "../Modals/UniversalModal";
import { updateAgencyProfile } from "../../helpers/APIs/agencyApis";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select/creatable";
import BtnSpinner from "../Skeletons/BtnSpinner";
import { FiPlus } from "react-icons/fi";
import {
  getCategories,
  getSkills,
  getSubCategory,
} from "../../helpers/APIs/freelancerApis";
// import { AgencyUpdatedModal } from "./ProfileUpdated";

const AgencyServices = ({ agency, setAgency }) => {
  const { agency_services, agency_skills } = agency || {};
  const { category, subCategory } = agency_services || {};
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [categoriesInfo, setCategoriesInfo] = useState({});
  const [subCategories, setSubCategories] = useState([]);
  const [skills, setSkills] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [modalType, setIsModalType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { control, register, handleSubmit, reset } = useForm();

  const handleUpdate = (type) => {
    setIsModal(true);
    setIsModalType(type);
  };

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
      if (category) {
        const { body, code } = await getSubCategory(category);
        if (code === 200) setSubCategoryList(body);
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const selectedCategory =
    categoryList?.find((item) => item._id === category) || {};
  const selectedSubCategory =
    subCategoryList?.find((item) => item._id === subCategory) || {};

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    getSubCategoryList();
  }, [category]);

  // -------- get Services data
  const getService = async () => {
    if (!categoriesInfo?.categories && modalType === "Services") {
      const { body, code } = await getCategories();
      if (code === 200)
        setCategoriesInfo({ ...categoriesInfo, categories: body });
    } else if (categoriesInfo?.selectedId) {
      const { body, code } = await getSubCategory(categoriesInfo?.selectedId);
      if (code === 200) setSubCategories(body);
    }
  };

  // --------- get Skills data
  const getAllSkills = async () => {
    if (modalType === "Skills" || modalType === "Projects") {
      try {
        const { body, code } = await getSkills(
          agency_services?.category,
          agency_services?.category
        );
        if (code === 200)
          setSkills(
            body?.map((item) => ({
              label: item.skill_name,
              value: item.skill_name,
            }))
          );
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getService();
    if (modalType === "Skills") getAllSkills();
  }, [categoriesInfo, modalType]);

  // handle update info
  const onSubmit = async (data) => {
    setIsLoading(true);
    let updatedData =
      modalType === "Sub Category"
        ? {
            agency_services: JSON.parse(data.agency_services),
          }
        : data;

    try {
      const { body, code } = await updateAgencyProfile(updatedData);

      if (code === 200) setAgency(body);
    } catch (error) {
      console.log(error);
    }
    setIsModal(false);
    setIsLoading(false);
    reset();
  };

  return (
    <>
      <VStack
        alignItems="flex-start"
        gap={{ base: 2, md: 5 }}
        width={{ base: "full", md: "50%" }}
      >
        <HStack marginBottom={"0.5rem"} marginTop={"1rem"}>
          <Text
            fontSize={{ base: "1.3rem", md: "1.7rem", lg: "2rem" }}
            fontWeight={"600"}
            marginBottom={"0"}
          >
            Services
          </Text>
          <VStack
            backgroundColor={"white"}
            borderRadius={"50%"}
            width={"20px"}
            border={"1px solid var(--primarycolor)"}
            height={"20px"}
            alignItems={"center"}
            justifyContent={"center"}
            transition={"0.6s ease-in-out"}
            cursor={"pointer"}
            mt={1}
            _hover={{
              border: "2px solid var(--primarycolor)",
              backgroundColor: "transparent",
              color: "var(--primarycolor)",
            }}
            onClick={() => handleUpdate("Services")}
          >
            {agency_services ? <RiEdit2Fill /> : <FiPlus fontSize={"15px"} />}
          </VStack>
        </HStack>
        {selectedCategory && (
          <HStack
            className="border p-3 md:p-4 rounded-md"
            width="100%"
            justifyContent="space-between"
          >
            <Text marginBottom="0" fontSize={{ base: "1rem", md: "1.2rem" }}>
              {selectedCategory.category_name} /{" "}
              {selectedSubCategory.sub_category_name}
            </Text>
            <HStack>
              <VStack
                backgroundColor="white"
                borderRadius="50%"
                width="30px"
                border="1px solid var(--primarycolor)"
                height="30px"
                alignItems="center"
                justifyContent="center"
                transition="0.6s ease-in-out"
                cursor="pointer"
                _hover={{
                  border: "2px solid var(--primarycolor)",
                  backgroundColor: "transparent",
                  color: "var(--primarycolor)",
                }}
                onClick={() => handleUpdate("Sub Category")}
              >
                <RiEdit2Fill fontSize="15px" />
              </VStack>
            </HStack>
          </HStack>
        )}

        <HStack marginBottom={"0.5rem"} marginTop={"1rem"}>
          <Text
            fontSize={{ base: "1.3rem", md: "1.7rem", lg: "2rem" }}
            fontWeight={"600"}
            marginBottom={"0"}
          >
            Skills
          </Text>
          <VStack
            backgroundColor={"white"}
            borderRadius={"50%"}
            width={"20px"}
            border={"1px solid var(--primarycolor)"}
            height={"20px"}
            alignItems={"center"}
            justifyContent={"center"}
            transition={"0.6s ease-in-out"}
            cursor={"pointer"}
            mt={1}
            _hover={{
              border: "2px solid var(--primarycolor)",
              backgroundColor: "transparent",
              color: "var(--primarycolor)",
            }}
            onClick={() => handleUpdate("Skills")}
          >
            {agency_skills?.length ? (
              <RiEdit2Fill />
            ) : (
              <FiPlus fontSize={"15px"} />
            )}
          </VStack>
        </HStack>
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
      </VStack>
      {/* Updated Information */}
      {/* {isModal && (
        <AgencyUpdatedModal
          isModal={isModal}
          setIsModal={setIsModal}
          title={"Sub Category"}
          setAgency={setAgency}
          data={subCategoryList}
        />
      )} */}
      {isModal && (
        <UniversalModal
          isModal={isModal}
          setIsModal={setIsModal}
          title={`Update ${modalType}`}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* update services */}
            {modalType === "Services" && (
              <>
                <p className="font-semibold">Select Category</p>
                <select
                  className="px-3 py-1 border rounded w-full"
                  {...register("agency_services.category", {
                    onChange: (e) => {
                      setCategoriesInfo({
                        ...categoriesInfo,
                        selectedId: e.target.value,
                      });
                    },
                  })}
                  required
                >
                  {categoriesInfo &&
                    categoriesInfo?.categories?.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.category_name}
                      </option>
                    ))}
                </select>
                {
                  <>
                    <p className="mt-5 font-semibold">Select Sub Category</p>
                    <select
                      className="px-3 py-1 border rounded w-full"
                      {...register("agency_services.subCategory")}
                      required
                      disabled={!categoriesInfo?.selectedId}
                    >
                      {subCategories?.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.sub_category_name}
                        </option>
                      ))}
                    </select>
                  </>
                }
              </>
            )}
            {modalType === "Sub Category" && (
              <>
                <p className="mt-5 font-semibold">Select Sub Category</p>
                <select
                  className="px-3 py-1 border rounded w-full"
                  {...register("agency_services")}
                  required
                >
                  {subCategoryList.map((item) => (
                    <option
                      key={item._id}
                      value={JSON.stringify({
                        subCategory: item._id,
                        category: item.category_id,
                      })}
                    >
                      {item.sub_category_name}
                    </option>
                  ))}
                </select>
              </>
            )}
            {/* update skills */}
            {modalType === "Skills" && skills?.length > 0 && (
              <Controller
                control={control}
                name="agency_skills"
                render={({ field: { onChange, ref } }) => (
                  <Select
                    inputRef={ref}
                    closeMenuOnSelect={false}
                    onChange={(val) => onChange(val.map((c) => c.value))}
                    options={skills}
                    isMulti
                    required
                  />
                )}
              />
            )}

            <div className="text-right mt-10">
              <Button
                isLoading={isLoading}
                loadingText="Submit"
                colorScheme="primary"
                type="submit"
                spinner={<BtnSpinner />}
              >
                Submit
              </Button>
            </div>
          </form>
        </UniversalModal>
      )}
    </>
  );
};

export default AgencyServices;
