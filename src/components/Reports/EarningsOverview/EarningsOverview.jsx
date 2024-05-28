import { VStack, HStack } from "@chakra-ui/react";
import HorizontalCardSkeleton from "../../Skeletons/HorizontalCardSkeleton";
import { useState } from "react";
import AvailableDetails from "./AvailableDetails";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import InReview from "./InReview";
import InProgress from "./InProgress";

const EarningsOverview = ({ balance, isLoading }) => {
  const [availableBalanceDetails, setAvailableBalanceDetails] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [inReview, setInReview] = useState(false);

  const onClick = ({ theme }) => {
    if (theme === "in-progress") {
      setInProgress(!inProgress);
      setAvailableBalanceDetails(false);
      setInReview(false);
    }
    if (theme === "in-review") {
      setInProgress(false);
      setAvailableBalanceDetails(false);
      setInReview(!inReview);
    }
    if (theme === "available") {
      setInProgress(false);
      setAvailableBalanceDetails(!availableBalanceDetails);
      setInReview(false);
    }
  };

  const [cookies] = useCookies(["activeagency"]);
  const activeagency = cookies.activeagency;
  const availableBalance =
    useSelector((state) => state.profile.profile?.available_balance) || 0;

  return (
    <div>
      <h2 className="mt-8 mb-8  text-[25px] font-semibold">
        Earnings Overview
      </h2>

      {isLoading ? (
        <HorizontalCardSkeleton />
      ) : (
        <HStack className="max-md:!flex-col" justifyContent={"space-between"}>
          <VStack
            width={"400px"}
            height={"10rem"}
            backgroundColor={"#ffff"}
            border={"1px solid #D1D5DA"}
            borderRadius={"10px"}
            cursor={"pointer"}
            alignItems={"center"}
            justifyContent={"center"}
            _hover={{
              border: "1px solid var(--primarycolor)",
              transition: "0.3s ease-in-out",
            }}
            className="max-md:!w-full"
            onClick={() => onClick({ theme: "in-progress" })}
          >
            <p className="font-semibold text-4xl mb-5">
              ${balance?.progress?.toFixed(2)}
            </p>
            <p className="text-lg capitalize">In Progress</p>
          </VStack>

          <VStack
            width={"400px"}
            height={"10rem"}
            backgroundColor={"#ffff"}
            border={"1px solid #D1D5DA"}
            borderRadius={"10px"}
            cursor={"pointer"}
            alignItems={"center"}
            justifyContent={"center"}
            _hover={{
              border: "1px solid var(--primarycolor)",
              transition: "0.3s ease-in-out",
            }}
            className="max-md:!w-full"
            onClick={() => onClick({ theme: "in-review" })}
          >
            <p className="font-semibold text-4xl mb-5">
              ${balance?.review?.toFixed(2)}
            </p>
            <p className="text-xl capitalize">In review</p>
          </VStack>

          <VStack
            width={"400px"}
            height={"10rem"}
            backgroundColor={"#ffff"}
            border={
              availableBalanceDetails
                ? "1px solid var(--primarycolor)"
                : "1px solid #D1D5DA"
            }
            borderRadius={"10px"}
            cursor={"pointer"}
            alignItems={"center"}
            justifyContent={"center"}
            _hover={{
              border: "1px solid var(--primarycolor)",
              transition: "0.3s ease-in-out",
            }}
            className="max-md:!w-full"
            onClick={() => onClick({ theme: "available" })}
          >
            <p className="font-semibold text-4xl mb-5">
              $
              {activeagency
                ? balance?.available?.toFixed(2)
                : availableBalance?.toFixed(2)}
            </p>
            <p className="text-lg">Available</p>
          </VStack>
        </HStack>
      )}
      {availableBalanceDetails && (
        <AvailableDetails
          balance={
            activeagency
              ? balance?.available?.toFixed(2)
              : availableBalance?.toFixed(2)
          }
        />
      )}
      {inReview && <InReview />}
      {inProgress && <InProgress />}
    </div>
  );
};

export default EarningsOverview;
