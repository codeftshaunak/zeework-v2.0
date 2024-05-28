/* eslint-disable react/prop-types */
import { VStack } from "@chakra-ui/react";
import { Header, AuthHeader } from "../../components/Header";
import { useSelector } from "react-redux";
import Notifications from "../../Components/NotifyToast/Notifications";

const HomeLayout = (props) => {
  const token = useSelector((state) => state.auth.authtoken);
  const role = useSelector((state) => state.auth.role);

  return (
    <VStack width={"full"} spacing={0} gap={props.gap ? props.gap : 0}>
      {token ? <AuthHeader role={role} /> : <Header />}
      <Notifications />
      <VStack
        width={props.width ? props.width : "85%"}
        gap={props.gap ? props.gap : "60px"}
        bg={props.bg}
      >
        {props.children}
      </VStack>
    </VStack>
  );
};

export default HomeLayout;
