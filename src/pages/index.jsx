import React from 'react';
import AutoPopup from "../components/Modals/AutoPopup";
import Header from "../components/Header/Header";
import HomeComponent from "../components/HomeComponent/HomeComponent"

const index = () => {
    return (
        <div>
            <AutoPopup />
            <Header />
            <HomeComponent />

        </div>
    )
}

export default index



// import { useEffect } from "react";
// import { Header } from "../../Components/Header";
// import { Footer } from "../../Components/Footer";
// import { useSelector } from "react-redux";
// import { useRouter } from 'next/router';
// import HomeComponent from "../../Components/HomeComponent/HomeComponent";
// import AutoPopup from "../../Components/Modals/AutoPopup";

// const Home = () => {
//   // const token = useSelector((state) => state.auth.authtoken);
//   // const role = useSelector((state) => state.auth.role);
//   // const router = userouter();

//   // useEffect(() => {
//   //   if (token) {
//   //     if (role == 1) {
//   //       router.push("/find-job");
//   //     } else {
//   //       router.push("/client-dashboard");
//   //     }
//   //   }
//   // }, [token, role, router]);


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

