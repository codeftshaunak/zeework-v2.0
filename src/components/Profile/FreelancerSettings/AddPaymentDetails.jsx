import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, useToast, Box } from "@chakra-ui/react";
import { addPaymentMethods } from "../../../helpers/APIs/payments";
import { addBankSchema } from "../../../Schema/payments";
import { PaymentCard } from "../PaymentMethod";
import { FaPaypal } from "react-icons/fa";
import { CiBank } from "react-icons/ci";
import BtnSpinner from "../../Skeletons/BtnSpinner";
import UniversalModal from "../../Modals/UniversalModal";

const addAccountSchema = (type) => {
  if (type === "bank") {
    return addBankSchema;
  }
};

const AddPaymentDetails = () => {
  const [isModal, setIsModal] = useState(false);
  const [formType, setFormType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addAccountSchema(formType)),
  });
  const toast = useToast();

  // save payment info
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const { code, msg } = await addPaymentMethods({
        payment_method: formType,
        payment_details: data,
      });

      toast({
        title: msg,
        status: code === 200 ? "success" : "warning",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
    setIsModal(false);
    setFormType("");
    reset();
  };

  const handleCancel = () => {
    setIsModal(false);
    setFormType("");
    reset();
  };

  useEffect(() => {
    reset();
    if (!isModal) setFormType("");
  }, [isModal]);

  return (
    <>
      <div>
        <div className="flex flex-col gap-[8px] py-[20px] px-[24px] w-full ">
          <p className="text-[#374151] text-2xl font-[600] mb-4">
            Select Payment Gateway
          </p>
          <div className="flex flex-col xl:flex-row gap-[8px]">
            <PaymentCard
              title="Bank Transfer"
              icon={<CiBank />}
              modalType={"bank"}
              setModalType={setFormType}
              setIsModal={setIsModal}
            />
            <PaymentCard
              title="Paypal"
              icon={<FaPaypal />}
              modalType={"paypal"}
              setModalType={setFormType}
              setIsModal={setIsModal}
            />
            <PaymentCard
              title="Payoneer"
              icon={null}
              modalType={"payoneer"}
              setModalType={setFormType}
              setIsModal={setIsModal}
            />
          </div>

          <div className="text-right mt-5 flex justify-start gap-3 mb-1">
            <Button
              colorScheme="primary"
              variant={"outline"}
              paddingX={8}
              onClick={handleCancel}
              size={"sm"}
            >
              Cancel
            </Button>
            <Button
              loadingText="Saving"
              colorScheme="primary"
              type="submit"
              paddingX={10}
              size={"sm"}
              spinner={<BtnSpinner />}
            >
              Save
            </Button>
          </div>
        </div>
      </div>

      {/* Update Account Information */}
      <UniversalModal
        isModal={isModal}
        setIsModal={setIsModal}
        title={`Add your ${formType} here`}
      >
        <Box
          className="overflow-y-auto"
          style={{ maxHeight: `calc(100vh - 10vh)` }}
          sx={{
            "&::-webkit-scrollbar": {
              width: "0px",
            },
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* add bank info */}
            {formType == "bank" && (
              <div className="grid gap-4">
                <div className="flex flex-col gap-1">
                  <p className="mb-4 text-justify">
                    Our form is built to cater to banks worldwide. Please enter
                    all information that is relevant to your bank.
                  </p>

                  <label htmlFor="bank-name" className="font-semibold">
                    Bank Name:
                  </label>
                  <input
                    {...register("bank_name")}
                    type="text"
                    id="bank-name"
                    placeholder="Enter Bank Name"
                    className="border px-3 py-2 rounded-md focus:outline-none"
                  />
                  {errors.bank_name && (
                    <p className="text-sm text-red-500 -mt-1">
                      {errors.bank_name.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="account-number" className="font-semibold">
                    Account Number:
                  </label>
                  <input
                    {...register("account_number")}
                    type="text"
                    id="account-number"
                    placeholder="Enter Account Number"
                    className="border px-3 py-2 rounded-md focus:outline-none"
                  />
                  {errors.account_number && (
                    <p className="text-sm text-red-500 -mt-1">
                      {errors.account_number.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="iban" className="font-semibold">
                      IBAN:
                    </label>
                    <input
                      {...register("iban")}
                      type="text"
                      id="iban"
                      placeholder="Enter IBAN"
                      className="border px-3 py-2 rounded-md focus:outline-none"
                    />
                    {errors.iban && (
                      <p className="text-sm text-red-500 -mt-1">
                        {errors.iban.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="sort-code" className="font-semibold">
                      Sort Code:
                    </label>
                    <input
                      {...register("sort_code")}
                      type="text"
                      id="sort-code"
                      placeholder="Enter Sort Code"
                      className="border px-3 py-2 rounded-md focus:outline-none"
                    />
                    {errors.sort_code && (
                      <p className="text-sm text-red-500 -mt-1">
                        {errors.sort_code.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="routing-number" className="font-semibold">
                      Routing Number:
                    </label>
                    <input
                      {...register("routing_number")}
                      type="text"
                      id="routing-number"
                      placeholder="Enter Routing Number"
                      className="border px-3 py-2 rounded-md focus:outline-none"
                    />
                    {errors.routing_number && (
                      <p className="text-sm text-red-500 -mt-1">
                        {errors.routing_number.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="bic-swift-code" className="font-semibold">
                      BIC/SWIFT Code:
                    </label>
                    <input
                      {...register("bic_swift_code")}
                      type="text"
                      id="bic-swift-code"
                      placeholder="Enter BIC/SWIFT Code"
                      className="border px-3 py-2 rounded-md focus:outline-none"
                    />
                    {errors.bic_swift_code && (
                      <p className="text-sm text-red-500 -mt-1">
                        {errors.bic_swift_code.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="first-name" className="font-semibold">
                      First Name:
                    </label>
                    <input
                      {...register("first_name")}
                      type="text"
                      id="first-name"
                      placeholder="Enter First Name"
                      className="border px-3 py-2 rounded-md focus:outline-none"
                    />
                    {errors.first_name && (
                      <p className="text-sm text-red-500 -mt-1">
                        {errors.first_name.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="last-name" className="font-semibold">
                      Last Name:
                    </label>
                    <input
                      {...register("last_name")}
                      type="text"
                      id="last-name"
                      placeholder="Enter Last Name"
                      className="border px-3 py-2 rounded-md focus:outline-none"
                    />
                    {errors.last_name && (
                      <p className="text-sm text-red-500 -mt-1">
                        {errors.last_name.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="address" className="font-semibold">
                    Address:
                  </label>
                  <input
                    {...register("address")}
                    type="text"
                    id="address"
                    placeholder="Enter Address"
                    className="border px-3 py-2 rounded-md focus:outline-none"
                  />
                  {errors.address && (
                    <p className="text-sm text-red-500 -mt-1">
                      {errors.address.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="personal-details" className="font-semibold">
                    Personal Details:{" "}
                    <span className="text-gray-300">(Optional)</span>
                  </label>
                  <textarea
                    {...register("personal_details")}
                    id="personal-details"
                    placeholder="Enter Personal Details"
                    className="border px-3 py-2 rounded-md focus:outline-none"
                  ></textarea>
                  {errors.personal_details && (
                    <p className="text-sm text-red-500 -mt-1">
                      {errors.personal_details.message}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* add paypal info */}
            {formType == "paypal" && (
              <>
                <h2 htmlFor="paypal" className="mb-2">
                  Please Write Your Paypal Connected Email
                </h2>
                <div className="w-[300px] py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                  <input
                    type="text"
                    className=" w-full focus:outline-none py-2 text-[14px] text-[#9CA3AF] font-[400] border-[var(--bordersecondary)] "
                    placeholder="Email"
                  />
                </div>
              </>
            )}

            {/* add payoneer info */}
            {formType == "payoneer" && (
              <>
                <h2 htmlFor="paypal" className="mb-2">
                  Please Write Your Paypal Connected Email
                </h2>
                <div className="w-[300px] py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                  <input
                    type="text"
                    className=" w-full focus:outline-none py-2 text-[14px] text-[#9CA3AF] font-[400] border-[var(--bordersecondary)] "
                    placeholder="Email"
                  />
                </div>
              </>
            )}

            <div className="text-right mt-10 flex justify-end gap-10 mb-1">
              <Button
                colorScheme="primary"
                variant={"outline"}
                paddingX={10}
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                isLoading={isLoading}
                loadingText="Submit"
                colorScheme="primary"
                type="submit"
                paddingX={10}
                spinner={<BtnSpinner />}
              >
                Submit
              </Button>
            </div>
          </form>
        </Box>
      </UniversalModal>
    </>
  );
};

export default AddPaymentDetails;
