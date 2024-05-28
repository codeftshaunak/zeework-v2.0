import {
  Box,
  Text,
  Radio,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CardDetailsForm } from "./CardDetailsForm";
import CurrentCard from "./CurrentCard";

// Load Stripe.js with your publishable key
const stripePromise = loadStripe(
  "pk_test_51OryqRKsSMFhuga1wGU0xYUfS6OYQeBJFnxgy7zecfvEB1SeiGAO2syLedWRGEHSyrKDXaLN17PcT2qMqWZTDbDr00fdtZ3B9S"
);

const BillingAndPayments = () => {
  return (
    <Box width="full">
      <Tabs
        position="relative"
        colorScheme="primary"
        padding={6}
        rounded="2xl"
        bgColor="white"
      >
        <TabList>
          <Tab fontWeight={"semibold"}>Current Card Details</Tab>
          <Tab fontWeight={"semibold"}>Add Billing Method</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Box mt={5}>
              <CurrentCard />
            </Box>
          </TabPanel>
          <TabPanel>
            <Box mt={5}>
              <Box marginBottom={6}>
                <Radio size="lg" colorScheme="primary" isChecked>
                  <Text fontSize="xl" fontWeight="semibold">
                    Payment Card
                  </Text>
                </Radio>
              </Box>

              <Box marginTop={1} className="w-full xl:w-[700px]">
                <Elements stripe={stripePromise}>
                  <CardDetailsForm />
                </Elements>
              </Box>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
      {/* <Box padding={6} rounded="2xl" bgColor="white">
        <Text
          fontSize="2xl"
          fontWeight="semibold"
          marginBottom={5}
          // marginTop={2}
        >
          Add Billing Method
        </Text>

      </Box> */}
    </Box>
  );
};

export default BillingAndPayments;
