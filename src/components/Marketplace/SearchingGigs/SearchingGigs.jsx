import HorizontalCardSkeleton from "../../Skeletons/HorizontalCardSkeleton";
import GigCards from "../GigCards/GigCards";

const SearchingGigs = ({ gigs, isLoading }) => {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-medium md:text-left">Searching Gigs</h1>
      <div className="py-4">
        {isLoading ? <HorizontalCardSkeleton /> : <GigCards gigs={gigs} />}
        {!isLoading && !gigs?.length && (
          <p className="rounded-lg shadow p-4 border bg-white text-center">
            No gigs found matching the search criteria
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchingGigs;
