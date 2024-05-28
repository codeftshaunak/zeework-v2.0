import { BsInfoCircle } from "react-icons/bs";
import { useState } from "react";
import { useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";
import { useRouter } from 'next/router';

const CardVerificationNotify = () => {
  const role = useSelector((state) => state.auth.role);
  const [paymentStatus, setPaymentStatus] = useState(
    sessionStorage.getItem("paymentNotify")
  );
  const router = useRouter();


  const handleToastClose = () => {
    setPaymentStatus("true");
    sessionStorage.setItem("paymentNotify", "true");
  };

  return (
    <>
      {role == 2 && paymentStatus == "false" && (
        <div className="w-[85%] bg-green-100 py-4 relative shadow-sm rounded-lg mt-2">
          <div className="flex items-center justify-center gap-1 tracking-wide">
            <BsInfoCircle />{" "}
            <p className="capitalize">
              Don&apos;t forget to complete your profile with payment details
              and start your first hire!{" "}
              <span
                onClick={() => router.push("/setting/billing-payments")}
                className="cursor-pointer underline underline-offset-2 hover:no-underline transition font-bold text-[var(--primarycolor)]"
              >
                Click to Update Here
              </span>
            </p>
          </div>
          <div
            className="absolute top-2 right-3 cursor-pointer rounded-full hover:bg-white/10"
            onClick={handleToastClose}
          >
            <IoMdClose fontSize={"20px"} />
          </div>
        </div>
      )}
    </>
  );
};

export default CardVerificationNotify;
