import { useState } from "react";
import { Box, HStack, Image, Input, VStack } from "@chakra-ui/react";
import { BiSearchAlt } from "react-icons/bi";
import { CiFilter } from "react-icons/ci";

import { SearchFilter } from "./SearchFilter";
import { useNavigate } from "react-router-dom";

const MarketplaceHeader = ({ category }) => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearch = () => {
    const queryParams = new URLSearchParams(location.search);
    if (searchText.trim() !== "") {
      queryParams.set("searchText", searchText);
    } else {
      queryParams.delete("searchText");
    }
    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
    navigate(newUrl);
  };

  return (
    <HStack
      width={"full"}
      justifyContent={"space-between"}
      alignItems={"start"}
      marginTop={"10px"}
      marginBottom={5}
      gap={5}
    >
      <SearchFilter categoryOptions={category} />
      <VStack justifyContent={"space-between"}>
        <HStack
          width={"100%"}
          justifyContent={"space-evenly"}
          borderRadius={"0.75rem"}
          className="border border-tertiary overflow-hidden"
        >
          <Image
            src="/images/marketplace.png"
            className=" w-[100%] object-cover"
          />
        </HStack>

        <VStack
          width={"100%"}
          justifyContent={"space-evenly"}
          marginX={"auto"}
        // marginTop={12}
        >
          <div className="w-full flex gap-2 items-center rounded-md">
            <Input
              placeholder="Find your perfect gig ..."
              bgColor={"white"}
              height={"110px"}
              paddingLeft={"1.8rem"}
              fontSize={"1.5rem"}
              value={searchText}
              onChange={handleSearchTextChange}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearch();
                }
              }}
            />

            <button type="button" className="lg:hidden">
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
            <Box
              fontWeight={"800"}
              fontSize={"4.5rem"}
              border={"1px solid var(--primarycolor)"}
              padding={"15px 15px"}
              borderRadius={"5px"}
              backgroundColor={"var(--primarycolor)"}
              cursor={"pointer"}
              color={"white"}
              transition={"0.3s ease-in-out"}
              _hover={{
                backgroundColor: "#fff",
                color: "#000",
              }}
              onClick={handleSearch}
            >
              <BiSearchAlt />
            </Box>
          </div>
        </VStack>
      </VStack>
    </HStack>
  );
};

export default MarketplaceHeader;
