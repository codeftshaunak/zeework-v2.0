import { useState, useEffect, useContext } from "react";
import {
  Box,
  Text,
  Button,
  InputGroup,
  Input,
  useToast,
} from "@chakra-ui/react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { getCountries } from "../../helpers/APIs/freelancerApis";
import { addPaymentMethods } from "../../helpers/APIs/payments";
import { yupResolver } from "@hookform/resolvers/yup";
import { billingSchema } from "../../Schema/payments";
import BtnSpinner from "../Skeletons/BtnSpinner";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../Contexts/CurrentUser";

export const CardDetailsForm = () => {
  const { getUserDetails } = useContext(CurrentUserContext);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({ resolver: yupResolver(billingSchema) });
  const [countries, setCountries] = useState([]);
  const stripe = useStripe();
  const elements = useElements();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const getCountriesList = async () => {
      try {
        const { body, code } = await getCountries();
        if (code === 200)
          setCountries(
            body?.map((country) => ({
              name: country.name,
              value: country.name,
              label: country.name,
            }))
          );
      } catch (error) {
        console.error(error);
      }
    };

    getCountriesList();
  }, []);

  // handle add payment methods
  const onSubmit = async (data) => {
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    try {
      const { error, token } = await stripe.createToken(
        elements.getElement(CardNumberElement),
        {
          name: `${data.firstName} ${data.lastName}`,
          ...data,
        }
      );

      if (error) {
        console.error("Error creating token:", error?.message);
        toast({
          title: error?.message || "Please recheck card details!",
          status: "warning",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
      } else {
        const { code, msg } = await addPaymentMethods({ token });
        toast({
          title: msg,
          status: code === 200 ? "success" : "warning",
          duration: 3000,
          position: "top-right",
          isClosable: true,
        });

        // some action perform
        sessionStorage.setItem("paymentNotify", "true");
        await getUserDetails();
        if (code === 200) navigate("/client-dashboard");
      }
    } catch (error) {
      toast({
        title: error?.response?.data?.msg || "Something went wrong!",
        status: "warning",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
      console.error("Error processing token:", error);
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Text fontSize="lg" fontWeight="semibold" marginBottom={"10px"}>
        Card Details
      </Text>
      <Box>
        <Box
          gap={5}
          display={"grid"}
          border="1px solid var(--bordersecondary)"
          padding={5}
          rounded="lg"
          bgColor="var(--secondarycolor)"
        >
          <InputGroup display="grid">
            <Text fontWeight="semibold" marginBottom={"10px"}>
              Card Number
            </Text>
            <CardNumberElement className="px-4 py-2.5 rounded-md border border-[var(--bordersecondary)] bg-white" />
          </InputGroup>
          <InputGroup gap={5} flexDir={{ base: "column", md: "row" }}>
            <InputGroup display="grid">
              <Text fontWeight="semibold" marginBottom={"10px"}>
                Expiration Date
              </Text>
              <CardExpiryElement className="px-4 py-2.5 rounded-md border border-[var(--bordersecondary)] bg-white" />
            </InputGroup>
            <InputGroup display="grid">
              <Text fontWeight="semibold" marginBottom={"10px"}>
                CVC
              </Text>
              <CardCvcElement className="px-4 py-2.5 rounded-md border border-[var(--bordersecondary)] bg-white" />
            </InputGroup>
          </InputGroup>
        </Box>
      </Box>
      <Text
        fontSize="lg"
        fontWeight="semibold"
        marginTop={10}
        marginBottom={"10px"}
      >
        Billing Address
      </Text>
      <Box
        gap={5}
        display={"grid"}
        border="1px solid var(--bordersecondary)"
        padding={5}
        rounded="lg"
        bgColor="var(--secondarycolor)"
      >
        <InputGroup gap={5} flexDir={{ base: "column", xl: "row" }}>
          <InputGroup display="grid">
            <Text fontWeight="semibold" marginBottom={"10px"}>
              First Name
            </Text>
            <Input
              {...register("firstName")}
              placeholder="First Name"
              border="1px solid var(--bordersecondary)"
              bgColor={"white"}
            />
            {errors.firstName && (
              <Text size={"sm"} textColor={"red"}>
                {errors.firstName.message}
              </Text>
            )}
          </InputGroup>
          <InputGroup display="grid">
            <Text fontWeight="semibold" marginBottom={"10px"}>
              Last Name
            </Text>
            <Input
              {...register("lastName")}
              placeholder="Last Name"
              border="1px solid var(--bordersecondary)"
              bgColor={"white"}
            />
            {errors.lastName && (
              <Text size={"sm"} textColor={"red"}>
                {errors.lastName.message}
              </Text>
            )}
          </InputGroup>
        </InputGroup>
        <Box>
          <Text fontWeight="semibold" marginBottom={"10px"}>
            Country
          </Text>
          <Select
            {...register("address_country")}
            placeholder="Select Country"
            options={countries}
            onChange={(data) => {
              setValue("address_country", data.name),
                trigger("address_country");
            }}
          />
          {errors.address_country && (
            <Text size={"sm"} textColor={"red"}>
              {errors.address_country.message}
            </Text>
          )}
        </Box>
        <InputGroup gap={5} flexDir={{ base: "column", xl: "row" }}>
          <InputGroup display="grid">
            <Text fontWeight="semibold" marginBottom={"10px"}>
              City
            </Text>
            <Input
              {...register("address_city")}
              placeholder="City"
              border="1px solid var(--bordersecondary)"
              bgColor={"white"}
            />
            {errors.address_city && (
              <Text size={"sm"} textColor={"red"}>
                {errors.address_city.message}
              </Text>
            )}
          </InputGroup>
          <InputGroup display="grid">
            <Text fontWeight="semibold" marginBottom={"10px"}>
              Postal Code
            </Text>
            <Input
              {...register("address_zip")}
              placeholder="Postal Code"
              border="1px solid var(--bordersecondary)"
              bgColor={"white"}
            />
            {errors.address_zip && (
              <Text size={"sm"} textColor={"red"}>
                {errors.address_zip.message}
              </Text>
            )}
          </InputGroup>
        </InputGroup>
        <InputGroup display={"grid"}>
          <Text fontWeight="semibold" marginBottom={"10px"}>
            Address Line 1
          </Text>
          <Input
            {...register("address_line1")}
            type="text"
            placeholder="Address Line 1"
            border="1px solid var(--bordersecondary)"
            bgColor={"white"}
          />
        </InputGroup>
        {errors.address_line1 && (
          <Text size={"sm"} textColor={"red"}>
            {errors.address_line1.message}
          </Text>
        )}
        <InputGroup display={"grid"}>
          <Text fontWeight="semibold" marginBottom={"10px"}>
            Address Line 2 <span>(Optional)</span>
          </Text>
          <Input
            {...register("address_line2")}
            type="text"
            placeholder="Address Line 2"
            border="1px solid var(--bordersecondary)"
            bgColor={"white"}
          />
        </InputGroup>
      </Box>
      <Button
        isLoading={isLoading}
        type="submit"
        rounded="full"
        mt={6}
        colorScheme="primary"
        paddingX={isLoading ? 5 : 10}
        loadingText="Adding Card"
        spinner={<BtnSpinner />}
      >
        Save Details
      </Button>
    </form>
  );
};
