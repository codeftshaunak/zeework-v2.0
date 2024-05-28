import BillingAndPayments from "../../BillingAndPayments/BillingAndPayment";
import ChangeOldPassword from "../CommonSettings/ChangeOldPassword";

const ClientSettings = ({ step }) => {
  return (
    <div>
      {step === "password" && (
        <>
          <ChangeOldPassword />
        </>
      )}
      {step === "billing-payments" && (
        <>
          <BillingAndPayments />
        </>
      )}
    </div>
  );
};

export default ClientSettings;
