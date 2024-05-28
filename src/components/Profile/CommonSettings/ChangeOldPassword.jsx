import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { changePasswordSchema } from "../../../Schema/user-schema";
import { Button, useToast } from "@chakra-ui/react";
import { changeOldPassword } from "../../../helpers/APIs/jobApis";
import BtnSpinner from "../../Skeletons/BtnSpinner";

const ChangeOldPassword = () => {
  const [passLoading, setPassLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
  });
  const toast = useToast();

  // changes old password
  const changePassword = async (data) => {
    setPassLoading(true);
    try {
      const { code, msg } = await changeOldPassword({
        old_password: data.old_password,
        new_password: data.new_password,
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
    setPassLoading(false);
    reset();
  };

  const handleCancel = () => {
    reset();
  };
  return (
    <div>
      {" "}
      <form onSubmit={handleSubmit(changePassword)}>
        <div className="flex flex-col gap-[8px] py-[20px] px-[24px] w-full ">
          <p className="text-[#374151] text-2xl font-[600] mb-4">
            Change Password
          </p>
          <div className="flex flex-col gap-1 w-full lg:w-80 mb-3">
            <label htmlFor="old_password" className="font-semibold mb-2">
              Old Password
            </label>
            <input
              {...register("old_password")}
              type="password"
              id="new_password"
              placeholder="Enter Old Password"
              className="border px-3 py-2 rounded-md focus:outline-none"
            />
            {errors.old_password && (
              <p className="text-sm text-red-500 -mt-1">
                {errors.old_password.message}
              </p>
            )}
          </div>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex flex-col gap-1 w-full lg:w-80">
              <label htmlFor="new_password" className="font-semibold mb-2">
                New Password
              </label>
              <input
                {...register("new_password")}
                type="password"
                id="new_password"
                placeholder="Enter New Password"
                className="border px-3 py-2 rounded-md focus:outline-none"
              />
              {errors.new_password && (
                <p className="text-sm text-red-500 -mt-1">
                  {errors.new_password.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1 w-full lg:w-80">
              <label htmlFor="confirm_password" className="font-semibold mb-2">
                Confirm New Password
              </label>
              <input
                {...register("confirm_password")}
                type="password"
                id="confirm_password"
                placeholder="Enter Confirm Password"
                className="border px-3 py-2 rounded-md focus:outline-none"
              />
              {errors.confirm_password && (
                <p className="text-sm text-red-500 -mt-1">
                  {errors.confirm_password.message}
                </p>
              )}
            </div>
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
              isLoading={passLoading}
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
      </form>
    </div>
  );
};

export default ChangeOldPassword;
