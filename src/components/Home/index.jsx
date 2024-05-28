import { useEffect } from "react";
import { Header } from "../../components/Header";
import { Footer } from "../Footer";
import { useSelector } from "react-redux";
import { useRouter } from 'next/router';
import HomeComponent from "../HomeComponent/HomeComponent";
import AutoPopup from "../Modals/AutoPopup";

const Home = () => {
  // const token = useSelector((state) => state.auth.authtoken);
  // const role = useSelector((state) => state.auth.role);
  // const router = userouter();

  // useEffect(() => {
  //   if (token) {
  //     if (role == 1) {
  //       router.push("/find-job");
  //     } else {
  //       router.push("/client-dashboard");
  //     }
  //   }
  // }, [token, role, router]);


  return (
    <>
      <AutoPopup />
      <Header />
      <HomeComponent />
      <Footer />
    </>
  );
};

export default Home;
