import React from 'react';
import AutoPopup from "../components/Modals/AutoPopup";
import Header from "../components/Header/Header";

const index = () => {
    return (
        <div>
            <AutoPopup />
            <Header />
        </div>
    )
}

export default index



// import { useEffect } from "react";
// import { Header } from "../../Components/Header";
// import { Footer } from "../../Components/Footer";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import HomeComponent from "../../Components/HomeComponent/HomeComponent";
// import AutoPopup from "../../Components/Modals/AutoPopup";

// const Home = () => {
//   // const token = useSelector((state) => state.auth.authtoken);
//   // const role = useSelector((state) => state.auth.role);
//   // const navigate = useNavigate();

//   // useEffect(() => {
//   //   if (token) {
//   //     if (role == 1) {
//   //       navigate("/find-job");
//   //     } else {
//   //       navigate("/client-dashboard");
//   //     }
//   //   }
//   // }, [token, role, navigate]);


//   return (
//     <>
//       <AutoPopup />
//       <Header />
//       <HomeComponent />
//       <Footer />
//     </>
//   );
// };

// export default Home;

