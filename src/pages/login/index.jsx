import { useContext, useRef, useState } from "react";
import { CiUser } from "react-icons/ci";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { MdPassword } from "react-icons/md";
import CTAButton from "../../components/CTAButton"; // Adjust the path if necessary
import Divider from "../../components/Divider/Divider"; // Adjust the path if necessary
import {
  VStack,
  Flex,
  Input,
  IconButton,
  useToast,
  Skeleton,
  Button,
  Text,
} from "@chakra-ui/react";
import OnbardingCardLayout from "../../Layouts/CardLayout/OnbardingCardLayout.jsx"; // Adjust the path if necessary
import { signIn } from "../../helpers/APIs/apiRequest"; // Adjust the path if necessary
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setAuthData } from "../../redux/authSlice/authSlice"; // Adjust the path if necessary
import { getAllDetailsOfUser } from "../../helpers/APIs/userApis"; // Adjust the path if necessary
import { CurrentUserContext } from "../../Contexts/CurrentUser"; // Adjust the path if necessary
import BtnSpinner from "../../Components/Skeletons/BtnSpinner"; // Adjust the path if necessary

const Login = () => {
  const toast = useToast();
  const router = useRouter();
  const dispatch = useDispatch();
  const { getUserDetails } = useContext(CurrentUserContext);
  const passwordRef = useRef(null);

  const iconsStyle = {
    fontSize: "1.5rem",
    padding: "0.4rem",
    width: "110px",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    margin: "auto",
    border: "1px solid var(--bordersecondary)",
    borderRadius: "6px",
    backgroundColor: "var(--secondarycolor)",
  };

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginBtnLoading, setLoginBtnLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    setLoginBtnLoading(true);
    e.preventDefault();
    const response = await signIn(formData);
    setLoginBtnLoading(false);
    if (response.code === 200) {
      const { role, token } = response.body;
      dispatch(setAuthData({ role: role, authtoken: token }));
      getUserDetails();
      setLoading(true);
      const res = await getAllDetailsOfUser();
      const data = res?.body;
      const detailsFound =
        data?.categories?.length > 0 &&
        data?.skills?.length > 0 &&
        data?.hourly_rate;
      const clientDetailsFound =
        data?.businessName?.length > 0 && data?.briefDescription?.length > 0;

      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      await delay(1500);
      toast({
        title: response.msg,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      if (detailsFound || clientDetailsFound) {
        router.replace("/");
      } else {
        router.push("/onboarding");
      }

      setLoading(false);
    } else if (response.code === 403) {
      toast({
        title: response.msg,
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      setLoginBtnLoading(false);
    } else if (response.code === 405) {
      toast({
        title: response.msg,
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      router.push("/login");
    }
    setLoginBtnLoading(false);
    setLoading(false);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <OnbardingCardLayout title="Log In to ZeeWork">
      <br />
      <VStack width="100%" gap={6}>
        <Skeleton
          isLoaded={!loading}
          width={"full"}
          startColor="gray.100"
          endColor="gray.300"
        >
          <Flex
            border="1px solid var(--bordersecondary)"
            borderRadius="5px"
            width="100%"
            justifyContent="center"
            alignItems="center"
            overflow={"hidden"}
          >
            <CiUser
              style={{
                fontSize: "2rem",
                marginRight: "0.1rem",
                padding: "0.4rem",
              }}
            />
            <Input
              type="text"
              name="email"
              placeholder="Username Or Email"
              value={formData.email}
              onChange={handleChange}
              fontSize="1rem"
              width="100%"
              border="none"
              variant="unstyled"
              padding="0.5rem 0.5rem"
              rounded={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  passwordRef.current.focus();
                }
              }}
            />
          </Flex>
        </Skeleton>
        <Skeleton
          isLoaded={!loading}
          width={"full"}
          startColor="gray.100"
          endColor="gray.300"
        >
          <Flex
            border="1px solid var(--bordersecondary)"
            borderRadius="5px"
            width="100%"
            justifyContent="center"
            alignItems="center"
            overflow={"hidden"}
          >
            <MdPassword
              style={{
                fontSize: "2.1rem",
                marginRight: "0.1rem",
                padding: "0.5rem",
              }}
            />
            <Input
              ref={passwordRef}
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              variant="unstyled"
              fontSize="1rem"
              padding="0.5rem 0.5rem"
              border={"none"}
              rounded={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleLogin(e);
              }}
            />
            <IconButton
              aria-label={showPassword ? "Hide Password" : "Show Password"}
              icon={showPassword ? <BsEyeSlash /> : <BsEye />}
              onClick={toggleShowPassword}
              rounded={0}
            />
          </Flex>
          <Text
            fontWeight={500}
            marginTop={3}
            marginLeft={1}
            color="var(--primarycolor)"
            cursor={"pointer"}
            onClick={() => router.push("/forget-password")}
          >
            Forget Your Password?
          </Text>
        </Skeleton>

        <Skeleton isLoaded={!loading} startColor="gray.100" endColor="gray.300">
          <Button
            isLoading={loginBtnLoading}
            loadingText="Verifying"
            colorScheme="primary"
            type="submit"
            spinner={<BtnSpinner />}
            onClick={(e) => handleLogin(e)}
          >
            Continue with Email
          </Button>
        </Skeleton>
      </VStack>
      <br />
      <div>
        <Divider text="Don't have a ZeeWork account?" dwidth="60px" />
        <br />
        <Skeleton isLoaded={!loading} startColor="gray.100" endColor="gray.300">
          <CTAButton
            fontSize="1rem"
            text="Sign Up"
            border="1px solid var(--bordersecondary)"
            bg="var(--secondarycolor)"
          />
        </Skeleton>
      </div>
    </OnbardingCardLayout>
  );
};

export default Login;
