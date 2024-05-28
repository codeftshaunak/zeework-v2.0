import UniversalModal from "../../Modals/UniversalModal";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Radio,
  RadioGroup,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import Select from "react-select";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { getPaidFreelancerWithdrawal } from "../../../helpers/APIs/payments";
import BtnSpinner from "../../Skeletons/BtnSpinner";
import { FaCheckCircle } from "react-icons/fa";
import { CurrentUserContext } from "../../../Contexts/CurrentUser";

const GetFreelancerPaid = ({ isModal, setIsModal, balance }) => {
  const { getUserDetails } = useContext(CurrentUserContext);
  const { register, handleSubmit, errors, setValue, trigger } = useForm();
  const [amountType, setAmountType] = useState("all");
  const [customAmount, setCustomAmount] = useState(0);
  const paymentDetails = useSelector(
    (state) => state.profile.profile?.payment_details
  );
  const [paymentMethods] = useState([
    {
      label: paymentDetails?.payment_method?.toUpperCase(),
      value: paymentDetails?.payment_info?.email,
    },
  ]);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessBody, setIsSuccessBody] = useState(!isModal && null);

  // handle balance withdrawal
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const reqBody = {
        withdraw_amount: amountType === "all" ? balance : data?.withdraw_amount,
        payment_method: {
          payment_method: data.payment_method?.label?.toLowerCase(),
          payment_info: {
            email: data?.payment_method?.value,
          },
        },
      };
      const { code, body, msg, message } = await getPaidFreelancerWithdrawal(
        reqBody
      );
      if (code === 200) {
        getUserDetails(), setIsSuccessBody(body);
      }

      toast({
        title: code === 200 ? msg : message,
        status: code === 200 ? "success" : "warning",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <div>
      {isModal && (
        <UniversalModal isModal={isModal} setIsModal={setIsModal}>
          {isSuccessBody ? (
            <div>
              <p className="text-lg flex items-center gap-1 mb-1">
                <FaCheckCircle className="text-2xl text-green-500" />{" "}
                Congratulation! You&apos;ve successfully withdrawn funds.
              </p>
              <hr />
              <div>
                <p className="text-xl sm:text-2xl font-semibold my-4">
                  Payment details
                </p>
                <hr />
                <div className="flex flex-col gap-1 mt-4 tracking-wide">
                  <p className="text-lg  font-semibold">Payment method</p>
                  <p className="capitalize">
                    {isSuccessBody?.payment_method?.payment_method}
                  </p>
                </div>
                <div className="flex gap-1 justify-between font-semibold text-lg mt-4 mb-2">
                  <p>Withdraw Amount</p>{" "}
                  <p>${isSuccessBody?.withdraw_amount}</p>
                </div>
                <hr />
                <div className="flex gap-1 justify-between text-gray-300 my-2">
                  <p>Withdrawal Fee </p> <p>$0.00</p>
                </div>
                <div className="flex gap-1 justify-between font-bold text-xl mt-5">
                  <p>Total Amount</p> <p>${isSuccessBody?.withdraw_amount}</p>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <p className="text-2xl font-semibold mb-5">Get paid now</p>
              <div className="flex flex-col sm:flex-row gap-1 text-lg sm:text-xl font-semibold tracking-wide">
                <p>Available balance</p>
                <p className="text-xl sm:text-2xl">${balance}</p>
              </div>
              <div className="flex flex-col gap-2 mt-5 tracking-wide">
                <p className="text-lg sm:text-xl font-semibold">
                  Payment method
                </p>
                <Select
                  placeholder="Select payment method"
                  options={paymentMethods}
                  {...register("payment_method", { required: true })}
                  onChange={(data) => {
                    setValue("payment_method", data);
                    trigger("payment_method");
                  }}
                />
                {errors?.payment_method && (
                  <p className="text-red-500">Payment method is required</p>
                )}
              </div>
              <div className="flex flex-col gap-1 font-semibold my-5 tracking-wide">
                <p className="text-lg sm:text-xl">Amount</p>
                <RadioGroup onChange={setAmountType} value={amountType}>
                  <Stack>
                    <Radio size="md" value="all" colorScheme="green">
                      ${balance}
                    </Radio>
                    <Radio size="md" value="custom" colorScheme="green">
                      Other amount
                    </Radio>
                  </Stack>
                </RadioGroup>
                {amountType === "custom" && (
                  <InputGroup width={"fit-content"}>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      fontSize="1.2em"
                      paddingRight={1}
                    >
                      $
                    </InputLeftElement>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      {...register("withdraw_amount")}
                      onChange={(e) => {
                        setCustomAmount(e.target?.value),
                          setValue("withdraw_amount", e.target?.value),
                          trigger("withdraw_amount");
                      }}
                      paddingLeft={7}
                      className="placeholder-slate-300"
                    />
                  </InputGroup>
                )}
              </div>
              <hr />
              <div className="text-gray-300 my-4">
                <div className="flex gap-1 justify-between">
                  <p>Withdrawal Fee (per payment)</p> <p>$0.00</p>
                </div>
                <small>Other bank fees may apply</small>
              </div>
              <hr />
              <div className="flex gap-1 justify-between font-semibold text-lg sm:text-xl mt-2">
                <p>Total Amount</p>{" "}
                <p>${amountType === "all" ? balance : customAmount}</p>
              </div>
              <div className="flex gap-7 justify-end mt-7">
                <button
                  className="text-green-500 font-semibold"
                  onClick={() => setIsModal(false)}
                >
                  Cancel
                </button>
                <Button
                  isLoading={isLoading}
                  loadingText="Get Paid"
                  colorScheme="primary"
                  spinner={<BtnSpinner />}
                  paddingX={10}
                  rounded={"full"}
                  type="submit"
                >
                  Get Paid
                </Button>
              </div>
            </form>
          )}
        </UniversalModal>
      )}
    </div>
  );
};

export default GetFreelancerPaid;
