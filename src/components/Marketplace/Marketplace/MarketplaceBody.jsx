import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getCategories } from "../../../helpers/APIs/freelancerApis";
import MarketplaceHeader from "../MarketHeader/MarketHeader";
import LatestGig from "../LatestGigs/LatestGig";
import Recommended from "../RecommendedGigs/Recommended";
import { getSearchGigs } from "../../../helpers/APIs/gigApis";
import SearchingGigs from "../SearchingGigs/SearchingGigs";

const MarketplaceBody = () => {
  const [isSearch, setIsSearch] = useState(false);
  const [searchingGigs, setSearchingGigs] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [isLoadingSearch, setIsLoadingSearch] = useState([]);
  const location = useLocation();

  const getCategory = async () => {
    const { body, code } = await getCategories();
    if (code === 200)
      setCategoryOptions(
        body?.map((item) => ({
          value: item._id,
          label: item.category_name,
        }))
      );
  };

  useEffect(() => {
    getCategory();
  }, []);

  // Parse URL parameters from the location object
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryId = searchParams.get("category");
    const skills = searchParams.get("tech")
      ? searchParams.get("tech").split(",")
      : [];
    const minPrice = searchParams.get("min");
    const maxPrice = searchParams.get("max");
    const searchText = searchParams.get("searchText");

    if (categoryId || skills.length || minPrice || maxPrice || searchText) {
      const query = {
        ...(skills.length && { skills }),
        ...(categoryId && { categoryId }),
        ...(searchText && { searchText }),
        ...(minPrice && { minPrice }),
        ...(maxPrice && { maxPrice }),
      };

      setIsSearch(true);
      getSearchingGigs(query);
    }
  }, [location]);

  // find searching gigs
  const getSearchingGigs = async (query) => {
    setIsLoadingSearch(true);

    try {
      const { code, body } = await getSearchGigs(query);
      if (code === 200) {
        setSearchingGigs(body);
      } else {
        setSearchingGigs([]);
      }
    } catch (error) {
      console.error(error);
      setSearchingGigs([]);
    }
    setIsLoadingSearch(false);
  };

  return (
    <>
      <MarketplaceHeader category={categoryOptions} />
      {isSearch && (
        <SearchingGigs gigs={searchingGigs} isLoading={isLoadingSearch} />
      )}
      <LatestGig />
      <Recommended />
    </>
  );
};

export default MarketplaceBody;
