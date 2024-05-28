import { useEffect } from "react";
import { Header } from "../../components/Header";
import { Footer } from "../Footer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomeComponent from "../HomeComponent/HomeComponent";
import AutoPopup from "../Modals/AutoPopup";

const Home = () => {
  // const token = useSelector((state) => state.auth.authtoken);
  // const role = useSelector((state) => state.auth.role);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (token) {
  //     if (role == 1) {
  //       navigate("/find-job");
  //     } else {
  //       navigate("/client-dashboard");
  //     }
  //   }
  // }, [token, role, navigate]);


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
