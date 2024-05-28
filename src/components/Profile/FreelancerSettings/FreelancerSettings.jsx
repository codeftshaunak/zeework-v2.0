import ChangeOldPassword from "../CommonSettings/ChangeOldPassword";
import AddPaymentDetails from "./AddPaymentDetails";

const FreelancerSettings = ({ step }) => {
  return (
    <div>
      {step === "password" && (
        <>
          <ChangeOldPassword />
        </>
      )}
      {step === "billing-payments" && (
        <>
          <AddPaymentDetails />
        </>
      )}
    </div>
  );
};

export default FreelancerSettings;
