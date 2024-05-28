import React from "react";

const PaymentMethod = () => {
  return (
    <div className="flex flex-col gap-[16px] py-[20px] px-[24px]">
      {/* <p className="text-[#374151] text-[16px] font-[600]">Payment Methods</p> */}
      {/* <PaymentCard />
      <PaymentCard />
      <PaymentCard /> */}
      {/* <button className="text-[14px] w-[250px] items-center gap-[8px] flex bg-[#22C35E] text-[#fff] font-[500]  py-[4px] px-[20px] rounded-md ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M7.99984 3.33301V12.6663"
            stroke="white"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3.3335 8.00033H12.6668"
            stroke="white"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p>Add new payment method</p>
      </button> */}
    </div>
  );
};

export default PaymentMethod;

export const PaymentCard = ({
  title,
  icon,
  modalType,
  setModalType,
  setIsModal,
}) => {
  return (
    <div className="flex w-full items-center justify-between p-[12px] border-[1px] border-[var(--bordersecondary)] rounded-[12px] bg-white">
      <div className="flex items-center gap-[8px] ">
        <div className="flex items-center justify-center w-[42px]  h-[42px] rounded-[10px] bg-[#F0FDF4] text-2xl">
          {!icon && (
            <img src="/images/freelancer_dashboard/payoneer.ico" alt="" />
          )}
          {icon}
        </div>
        <div className="flex-col gap-[4px]">
          <p className="text-[#374151] text-[16px] font-[600]">{title}</p>
        </div>
      </div>
      <div className="flex gap-[8px] items-center">
        <div
          className="flex items-center justify-center w-[28px] h-[28px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[var(--bordersecondary)] cursor-pointer"
          onClick={() => {
            setIsModal(true), setModalType(modalType);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M2.66699 13.3332H5.33366L12.3337 6.33321C13.07 5.59683 13.07 4.40292 12.3337 3.66654C11.5973 2.93016 10.4034 2.93016 9.66699 3.66654L2.66699 10.6665V13.3332"
              stroke="#6B7280"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 4.33301L11.6667 6.99967"
              stroke="#6B7280"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="flex items-center justify-center w-[28px] h-[28px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[var(--bordersecondary)]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M9.33333 7.33301V11.333"
              stroke="#6B7280"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.66634 7.33301V11.333"
              stroke="#6B7280"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2.66699 4.66634H13.3337"
              stroke="#6B7280"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3.33301 4.66699L3.99967 12.667C3.99967 13.4034 4.59663 14.0003 5.33301 14.0003H10.6663C11.4027 14.0003 11.9997 13.4034 11.9997 12.667L12.6663 4.66699"
              stroke="#6B7280"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 4.66667V2.66667C6 2.29848 6.29848 2 6.66667 2H9.33333C9.70152 2 10 2.29848 10 2.66667V4.66667"
              stroke="#6B7280"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
