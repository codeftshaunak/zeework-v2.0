import { Box, Avatar } from "@chakra-ui/react";
import CTAButton from "../CTAButton";
import { RiArrowDropDownLine } from "react-icons/ri";
import { BsSearch } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { AiFillSetting } from "react-icons/ai";
import { BiExit, BiHelpCircle } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthData } from "../../redux/authSlice/authSlice";
import { clearProfileData } from "../../redux/authSlice/profileSlice";
import { FaUsers } from "react-icons/fa";
import { IoBagCheck } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import useNotificationListener from "../../hooks/useNotificationListener";
import { restorePagesState } from "../../redux/pagesSlice/pagesSlice";
import { useRouter } from 'next/router'; // Import useRouter for client-side navigation
import NavItem from './NavItem'

const Header = () => {
  const router = useRouter(); // useRouter for client-side navigation
  const [isSelectModal, setIsSelectModal] = useState(false);
  const selectModalRef = useRef(null);

  const navigation = [
    { title: "Find Talent", href: "/my-jobs" },
    { title: "Find Work", href: "/find-job" },
    { title: "Why ZeeWork", href: "/my-stats" },
  ];

  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [selectedRole, setSelectedRole] = useState("job");
  const [searchTerm, setSearchTerm] = useState(null);

  const handleSelectedValue = (value) => {
    setSelectedRole(value);
    setIsSelectModal(false);
  };

  const handleSearch = () => {
    const searchTermEncoded = encodeURIComponent(searchTerm);

    if (selectedRole === "job") {
      router.push(`/search-job?squery=${searchTermEncoded}`); // Use router.push for client-side navigation
    } else if (selectedRole === "talent") {
      router.push(`/search-freelancers?squery=${searchTermEncoded}`); // Use router.push for client-side navigation
    }
  };

  const handleClickOutside = (event) => {
    if (
      selectModalRef.current &&
      !selectModalRef.current.contains(event.target)
    ) {
      setIsSelectModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, [isSelectModal]);
  return (
    <nav className="bg-white shadow-slate-700 fixed lg:sticky w-full z-50 ">
      <div className="mx-auto w-[85%] max-w-[1200px]">
        <div className=" flex items-center sm:justify-between h-16 mx-auto">
          <div className=" inset-y-0 left-0 flex flex-1 items-center min-[840px]:hidden">
            {/* <!-- Mobile menu button--> */}
            {openMobileMenu ? (
              <button
                className="flex items-center justify-between p-2 rounded-md hover:text-white focus:outline-none  focus:text-white transition duration-150 ease-in-out"
                aria-label="Main menu"
                aria-expanded="false"
                onClick={() => setOpenMobileMenu(!openMobileMenu)}
              >
                <svg
                  width="30px"
                  height="30px"
                  viewBox="0 -0.5 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 11.4697L13.0303 12.5303ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303ZM13.0303 11.4697L8.03033 6.46967L6.96967 7.53033L11.9697 12.5303L13.0303 11.4697Z"
                    fill="#000000"
                  />
                </svg>
              </button>
            ) : (
              <button
                className="flex items-center justify-between py-2 rounded-md text-gray-400 hover:text-gray-400 focus:outline-none focus:text-gray-400 transition duration-150 ease-in-out"
                aria-label="Main menu"
                aria-expanded="false"
                onClick={() => setOpenMobileMenu(!openMobileMenu)}
              >
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                {/* <!-- Icon when menu is open. --> */}
                <svg
                  className="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
          <div className="flex items-center justify-center min-[840px]:justify-start flex-1">
            <div className="flex justify-evenly gap-x-5">
              <div className="flex-shrink-0">
                <p
                  className="text-[22px] font-bold text-green-500 cursor-pointer text-right"
                  onClick={() => router.push("/")}
                >
                  <img
                    src="./images/zeework_logo.png"
                    style={{
                      width: "100px",
                      marginTop: "3px",
                    }}
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="hidden min-[840px]:block ">
            <div className="flex gap-[50px]">
              {navigation &&
                navigation?.length > 0 &&
                navigation.map((item, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <NavItem key={i} title={item.title} url={item.href} />
                    <RiArrowDropDownLine className="h-8" />
                  </div>
                ))}
            </div>
          </div>
          <div className="right-0 flex justify-end items-center flex-1 sm:static sm:inset-auto sm:ml-6">
            <div className="flex gap-1 whitespace-no-wrap items-center justify-center my-2 py-2 border border-transparent text-base leading-6 font-medium rounded-md  focus:outline-none focus:shadow-outline-indigo transition ease-in-out duration-150">
              <div className="relative">
                {openSearch && (
                  <div className="mt-2 w-full left-0 top-0 rounded-md">
                    <div className="flex mt-2">
                      <div className="flex items-center border-[var(--bordersecondary)] border-[1px] py-2 pl-4 rounded-full justify-between">
                        <div className="flex items-center gap-4">
                          {/* <BsSearch /> */}
                          <input
                            placeholder="Search"
                            type="text"
                            className="border-none outline-none text-[13px]"
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handelSearch();
                              }
                            }}
                            value={searchTerm || ""}
                          />
                        </div>
                        <div className="relative">
                          <p
                            className="px-3 capitalize cursor-pointer flex items-center gap-2"
                            onClick={(event) => {
                              event.stopPropagation(),
                                setIsSelectModal(!isSelectModal);
                            }}
                          >
                            {selectedRole} <IoIosArrowDown />
                          </p>{" "}
                          {isSelectModal && (
                            <ul
                              className="absolute top-9 right-2 bg-white rounded-md shadow-md overflow-hidden w-48 z-50"
                              ref={selectModalRef}
                            >
                              <li
                                className="px-3 py-1 hover:bg-slate-100 cursor-pointer"
                                onClick={() => {
                                  handelSelectedValue("job");
                                }}
                              >
                                <div className="flex gap-2">
                                  <IoBagCheck className="text-xl" />{" "}
                                  <div>
                                    <p>Jobs</p>{" "}
                                    <p className="text-[12px] -mt-1">
                                      Apply to job posted
                                    </p>
                                  </div>
                                </div>
                              </li>
                              <li
                                className="px-3 py-1 hover:bg-slate-100 cursor-pointer"
                                onClick={() => handelSelectedValue("talent")}
                              >
                                <div className="flex gap-2">
                                  <FaUsers className="text-xl" />{" "}
                                  <div>
                                    <p>Talent</p>{" "}
                                    <p className="text-[12px] -mt-1">
                                      Hire professionals
                                    </p>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-3 sm:mt-2">
                <button
                  onClick={() => {
                    setOpenSearch(!openSearch);
                  }}
                >
                  <svg
                    width="20px"
                    height="30px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                      stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <Box
                className="hidden sm:flex whitespace-no-wrap items-center justify-center my-2 py-2 border border-transparent text-base leading-6 font-medium rounded-md  focus:shadow-outline-indigo  transition ease-in-out duration-150"
                width={"210px"}
              >
                <CTAButton
                  onClick={() => router.push("/login")}
                  text={"Log In"}
                  fontSize="1rem"
                  height="2.5rem"
                  className="mr-2"
                ></CTAButton>
                <CTAButton
                  onClick={() => router.push("/signup")}
                  text={"Sign Up"}
                  bg={"#22C55E"}
                  color={"#ffff"}
                  fontSize="1rem"
                  height="2.5rem"
                ></CTAButton>
              </Box>
            </div>
          </div>


        </div>
      </div>

      {/* <!--
    Mobile menu, toggle classes based on menu state.

    Menu open: "block", Menu closed: "hidden"
  --> */}
      {openMobileMenu && (
        <div className="md:block lg:hidden">
          <div className="px-2 pt-2 pb-3 flex justify-center items-center flex-col">
            {navigation.map(({ href, title }) => (
              <a
                href={href}
                className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
                key={title}
              >
                {title}
              </a>
            ))}
            <div className="gap-4 w-full sm:hidden flex justify-center">
              <Box
                style={boxStyle}
                className="mt-3 ml-2"
                justifyContent={"space-between"}
                width={"210px"}
              >
                <CTAButton
                  onClick={() => router.push("/login")}
                  text={"Log In"}
                  fontSize="1rem"
                  height="2.5rem"
                ></CTAButton>
                <CTAButton
                  onClick={() => router.push("/signup")}
                  text={"Sign Up"}
                  bg={"#22C55E"}
                  color={"#ffff"}
                  fontSize="1rem"
                  height="2.5rem"
                ></CTAButton>
              </Box>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export const AuthHeader = ({ role }) => {
  const [openSearch, setOpenSearch] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isActiveInput, setIsActiveInput] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [cookie, setCookie] = useCookies(["activeagency"]);
  const [isSelectModal, setIsSelectModal] = useState(false);
  const router = useRouter();
  const { pathname } = router;
  const isMessagePage = pathname.startsWith("/message");
  const activeAgency = cookie?.activeagency;

  const selectModalRef = useRef(null);
  const profile = useSelector((state) => state.profile);
  const { profile_image, firstName, lastName, professional_role } =
    profile.profile || [];


  // Create a Set to store unique receiver_id values
  const uniqueReceiverIds = new Set(
    notifications?.map((notification) => notification?.sender_id)
  );

  const handleProfileButton = (event) => {
    setOpenInfo(!openInfo);
    event.stopPropagation();
  };

  const dispatch = useDispatch();

  const handleLogout = () => {
    setCookie("activeagency", false);
    dispatch(clearAuthData()); // Dispatch the clearAuthData action to reset the state
    dispatch(clearProfileData()); // Dispatch the clearAuthData action to reset the state
    dispatch(restorePagesState());
    router.push("/login");
  };

  const handleUserProfile = () => {
    router.push("/profile");
  };


  const navigation = [
    { title: "Find Work", href: "/find-job" },
    { title: "My Jobs", href: "/my-jobs" },
    { title: "My Stats", href: "/my-stats" },
    { title: "Message", href: "/message" },
    { title: "Notifications", href: "" },
  ];

  const client_navigation = [
    { title: "Dashboard", href: "/client-dashboard" },
    { title: "My Stats", href: "/my-stats" },
    { title: "Marketplace", href: "/marketplace" },
    { title: "Message", href: "/message" },
  ];

  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [selectedRole, setSelectedRole] = useState(
    role == 2 ? "talent" : "job"
  );
  const [searchTerm, setSearchTerm] = useState(null);

  // ======= search for jobs and talent

  const handelSelectedValue = (value) => {
    setSelectedRole(value);
    setIsSelectModal(false);
  };

  const handelSearch = () => {
    const searchTermEncoded = encodeURIComponent(searchTerm);

    if (selectedRole === "job") {
      router(`/search-job?searchTerm=${searchTermEncoded}`);
    } else if (selectedRole === "talent") {
      router(`/search-freelancers?squery=${searchTermEncoded}`);
    }
  };

  // handle close select option when click on outside
  const handleClickOutside = (event) => {
    if (
      selectModalRef.current &&
      !selectModalRef.current.contains(event.target)
    ) {
      setOpenInfo(false);
      setIsSelectModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, [isSelectModal, openInfo]);

  // get notifications
  useNotificationListener(
    (data) => {
      setNotifications((prev) => [...prev, data]);
    },
    [isMessagePage],
    !isMessagePage
  );

  return (
    <nav className="bg-white w-full shadow-slate-700 border-b-[1px] items-center">
      <div className="w-full mx-auto px-2 sm:px-6 lg:px-8 sm:py-1 justify-between">
        <div className=" flex w-[90%] m-auto items-center md:justify-between justify-between h-16">
          <div className="inset-y-0 left-0 flex items-center sm:hidden">
            {/* <!-- Mobile menu button--> */}
            {openMobileMenu ? (
              <button
                className="flex items-center flex-1 justify-between p-2 rounded-md hover:text-white focus:outline-none  focus:text-white transition duration-150 ease-in-out"
                aria-label="Main menu"
                aria-expanded="false"
                onClick={() => setOpenMobileMenu(!openMobileMenu)}
              >
                <svg
                  width="30px"
                  height="30px"
                  viewBox="0 -0.5 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 11.4697L13.0303 12.5303ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303ZM13.0303 11.4697L8.03033 6.46967L6.96967 7.53033L11.9697 12.5303L13.0303 11.4697Z"
                    fill="#000000"
                  />
                </svg>
              </button>
            ) : (
              <button
                className="flex items-center justify-between py-2 rounded-md text-gray-400 hover:text-gray-400 focus:outline-none focus:text-gray-400 transition duration-150 ease-in-out"
                aria-label="Main menu"
                aria-expanded="false"
                onClick={() => setOpenMobileMenu(!openMobileMenu)}
              >
                {/* <!-- Icon when menu is closed. -->
          <!--
            Heroicon name: menu

            Menu open: "hidden", Menu closed: "block"
          --> */}
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                {/* <!-- Icon when menu is open. --> */}
                <svg
                  className="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
          <div className="flex items-center flex-1 max-sm:justify-center">
            <div className="flex md:w-[130px] items-center">
              <p
                className="text-[22px] font-bold text-green-500 cursor-pointer text-right mb-0 pb-0"
                onClick={() => router.push("/")}
              >
                <img
                  src="/images/zeework_logo.png"
                  style={{
                    width: "100px",
                    marginTop: "3px",
                    margin: "auto",
                  }}
                />
              </p>
            </div>
            <div className="hidden sm:flex sm:ml-2 md:ml-6 flex-1 max-lg:justify-center">
              <div className="flex  gap-2 min-[920px]:gap-9">
                <NavItem
                  title={role == 1 ? "Find Work" : "Dashboard"}
                  url={role == 1 ? "/find-job" : "/client-dashboard"}
                />
                {role == 1 && <NavItem title={"My Jobs"} url={"/my-jobs"} />}
                <NavItem title={"My Stats"} url="/my-stats" />
                {role == 2 && (
                  <NavItem title={"Marketplace"} url={"/marketplace"} />
                )}
                <NavItem
                  title={"Messages"}
                  url="/message"
                  isNotification={uniqueReceiverIds?.size}
                />
              </div>
            </div>
          </div>
          <div className="right-0 flex sm:block items-center sm:static sm:inset-auto md:ml-6 sm:pr-0">
            <div className="hidden sm:hidden lg:flex whitespace-no-wrap items-center justify-center my-2 pl-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md  focus:outline-none focus:shadow-outline-indigo transition ease-in-out duration-150">
              <div className="flex w-[320px] xl:w-[350px] mr-3">
                {/* ========== search ======= */}
                <div
                  className={`flex w-[350px] items-center rounded-full border-[var(--bordersecondary)] border-[1px] justify-between mr-3 bg-[#F0F2F5]
                  `}
                  onMouseEnter={() => setIsHover(true)}
                  onMouseLeave={() => setIsHover(false)}
                >
                  <div
                    className={`w-full rounded-full flex items-center gap-2 py-2 pl-4 ${isHover || isActiveInput
                      ? "bg-white border-r border-[var(--bordersecondary)]"
                      : "bg-[#F0F2F5]"
                      }`}
                  >
                    <BsSearch />
                    <input
                      placeholder="Search"
                      type="text"
                      className={`border-none outline-none text-[15px] bg-transparent`}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onFocus={() => setIsActiveInput(true)}
                      onBlur={() => setIsActiveInput(false)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handelSearch();
                        }
                      }}
                      value={searchTerm || ""}
                    />
                  </div>

                  <div className="relative">
                    <p
                      className="px-3 capitalize cursor-pointer flex items-center gap-2"
                      onClick={(event) => {
                        setIsSelectModal(!isSelectModal),
                          event.stopPropagation();
                      }}
                    >
                      {selectedRole} <IoIosArrowDown />
                    </p>{" "}
                    {isSelectModal && (
                      <ul
                        className="absolute top-9 right-2 bg-white rounded-md shadow-md overflow-hidden w-48 z-50"
                        ref={selectModalRef}
                      >
                        <li
                          className="px-3 py-1 hover:bg-slate-100 cursor-pointer"
                          onClick={() => {
                            handelSelectedValue("job");
                          }}
                        >
                          <div className="flex gap-2">
                            <IoBagCheck className="text-xl" />{" "}
                            <div>
                              <p>Jobs</p>{" "}
                              <p className="text-[12px] -mt-1">
                                Apply to job posted
                              </p>
                            </div>
                          </div>
                        </li>
                        <li
                          className="px-3 py-1 hover:bg-slate-100 cursor-pointer"
                          onClick={() => handelSelectedValue("talent")}
                        >
                          <div className="flex gap-2">
                            <FaUsers className="text-xl" />{" "}
                            <div>
                              <p>Talent</p>{" "}
                              <p className="text-[12px] -mt-1">
                                Hire professionals
                              </p>
                            </div>
                          </div>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-3 relative">
                <div
                  className="flex items-center justify-center rounded-full w-[36px] h-[36px] cursor-pointer"
                  onClick={(e) => handleProfileButton(e)}
                >
                  <Avatar
                    textColor={"black"}
                    src={
                      role == 1
                        ? activeAgency
                          ? profile?.agency?.agency_profileImage
                          : profile_image
                        : profile_image
                    }
                    name={
                      activeAgency
                        ? profile?.agency?.agency_name
                        : firstName + " " + lastName
                    }
                    boxSize="40px"
                  />
                </div>

                {openInfo && (
                  <div
                    className="absolute bg-white p-2 rounded-lg right-[36px] top-3 w-[120px] gap-5 border-slate-200 border transition-all z-50"
                    ref={selectModalRef}
                  >
                    <div
                      className="flex  items-center w-full cursor-pointer mt-1 hover:bg-gray-200/20 py-1 px-2 rounded"
                      onClick={handleUserProfile}
                    >
                      <CgProfile />
                      <p className="text-sm ml-2">Profiles</p>
                    </div>
                    <div
                      className="flex items-center w-full cursor-pointer mt-1 hover:bg-gray-200/20 py-1 px-2 rounded"
                      onClick={() => {
                        router.push("/setting"), setOpenInfo(false);
                      }}
                    >
                      <AiFillSetting />
                      <p className="text-sm ml-2">Setting</p>
                    </div>

                    <div
                      className="flex items-center w-full cursor-pointer my-1 hover:bg-gray-200/20 py-1 px-2 rounded"
                      onClick={() => {
                        router.push("/help"), setOpenInfo(false);
                      }}
                    >
                      <BiHelpCircle />
                      <p className="text-sm ml-2">Help</p>
                    </div>

                    <div
                      className="flex  items-center w-full cursor-pointer my-1 hover:bg-gray-200/20 py-1 px-2 rounded"
                      onClick={() => handleLogout()}
                    >
                      <BiExit />
                      <p className="text-sm ml-2">Logout</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:hidden relative flex items-center gap-6 mr-4">
            {openSearch && (
              <div className="ml-3 absolute -right-10 -bottom-[72px] max-[420px]:w-[260px] max-[360px]:w-[220px] w-[320px] bg-white rounded-lg border-[var(--bordersecondary)] border">
                <div className="w-full left-0 bottom-0 lg:hidden">
                  <div className="flex items-center w-full py-1 px-2 justify-between">
                    <div className="flex items-center gap-4">
                      <input
                        placeholder="Search"
                        type="text"
                        className="border-none w-[60%] outline-none text-[15px]"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handelSearch();
                          }
                        }}
                        value={searchTerm || ""}
                      />
                    </div>

                    <div className="relative">
                      <p
                        className="px-3 capitalize cursor-pointer flex items-center gap-2"
                        onClick={() => setIsSelectModal(!isSelectModal)}
                      >
                        {selectedRole} <IoIosArrowDown />
                      </p>{" "}
                      {isSelectModal && (
                        <ul className="absolute top-9 right-2 bg-white rounded-md shadow-md overflow-hidden w-48 z-50">
                          <li
                            className="px-3 py-1 hover:bg-slate-100 cursor-pointer"
                            onClick={() => {
                              handelSelectedValue("job");
                            }}
                          >
                            <div className="flex gap-2">
                              <IoBagCheck className="text-xl" />{" "}
                              <div>
                                <p>Jobs</p>{" "}
                                <p className="text-[12px] -mt-1">
                                  Apply to job posted
                                </p>
                              </div>
                            </div>
                          </li>
                          <li
                            className="px-3 py-1 hover:bg-slate-100 cursor-pointer"
                            onClick={() => handelSelectedValue("talent")}
                          >
                            <div className="flex gap-2">
                              <FaUsers className="text-xl" />{" "}
                              <div>
                                <p>Talent</p>{" "}
                                <p className="text-[12px] -mt-1">
                                  Hire professionals
                                </p>
                              </div>
                            </div>
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <button
            className="lg:hidden mr-4"
            onClick={() => {
              setOpenSearch(!openSearch);
            }}
          >
            <svg
              width="30px"
              height="30px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className="hidden sm:flex lg:hidden gap-3 relative ">
            <div
              className="flex items-center justify-center rounded-full w-[36px] h-[36px] cursor-pointer"
              onClick={(e) => handleProfileButton(e)}
            >
              <Avatar
                src={profile_image}
                name={firstName && firstName + " " + lastName}
                boxSize="40px"
              />
            </div>
            {openInfo && (
              <div
                className="absolute bg-white p-2 rounded-lg right-[36px] top-3 w-[120px] gap-5 border-slate-200 border transition-all z-50"
                ref={selectModalRef}
              >
                <div
                  className="flex justify-start gap-4 items-center w-full cursor-pointer mt-1 hover:bg-gray-200/20 py-1 px-2 rounded"
                  onClick={handleUserProfile}
                >
                  <CgProfile />
                  <p className="text-sm">Profile</p>
                </div>
                <div
                  className="flex justify-start gap-4 items-center w-full cursor-pointer mt-1 hover:bg-gray-200/20 py-1 px-2 rounded"
                  onClick={() => {
                    router.push("/setting"), setOpenInfo(false);
                  }}
                >
                  <AiFillSetting />
                  <p className="text-sm">Setting</p>
                </div>
                <div
                  className="flex justify-start gap-4 items-center w-full cursor-pointer my-1 hover:bg-gray-200/20 py-1 px-2 rounded"
                  onClick={() => {
                    router.push("/help"), setOpenInfo(false);
                  }}
                >
                  <BiHelpCircle />
                  <p className="text-sm ml-2">Help</p>
                </div>

                <div
                  className="flex justify-start gap-4 items-center w-full cursor-pointer my-1 hover:bg-gray-200/20 py-1 px-2 rounded"
                  onClick={() => handleLogout()}
                >
                  <BiExit />
                  <p className="text-sm">Logout</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {openMobileMenu && (
        <div className="block sm:hidden">
          <div className="flex flex-col items-center ">
            {role === 1 && (
              <div className="flex-1 px-2 pt-2 pb-3 flex justify-center flex-col text-center">
                {navigation.map(({ href, title }) => (
                  <a
                    href={href}
                    className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
                    key={title}
                  >
                    {title}
                  </a>
                ))}
              </div>
            )}
            {role === 2 && (
              <div className="flex-1 px-2 pt-2 pb-3 flex justify-center flex-col text-center">
                {client_navigation.map(({ href, title }) => (
                  <a
                    href={href}
                    className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
                    key={title}
                  >
                    {title}
                  </a>
                ))}
              </div>
            )}
            <div className="w-full bg-green-50/80 h-[100px] items-center flex justify-center">
              <div className="mx-3 items-center flex gap-3 my-3">
                <div className="flex sm:hidden gap-3 relative ">
                  <div
                    className="flex items-center justify-center rounded-full w-[36px] h-[36px] cursor-pointer"
                    onClick={(e) => handleProfileButton(e)}
                  >
                    {profile_image != "null" && profile_image != null ? (
                      <img
                        src={profile_image}
                        style={{ borderRadius: "20px" }}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Avatar
                        name={firstName + " " + lastName}
                        boxSize="40px"
                      />
                    )}
                  </div>

                  {openInfo && (
                    <div
                      className="absolute bg-white p-2 rounded-lg left-[36px] top-3 w-[120px] gap-5 border-slate-200 border transition-all z-50"
                      ref={selectModalRef}
                    >
                      <div
                        className="flex justify-start gap-4 items-center w-full cursor-pointer mt-1 hover:bg-gray-200/20 py-1 px-2 rounded"
                        onClick={handleUserProfile}
                      >
                        <CgProfile />
                        <p className="text-sm">Profile</p>
                      </div>
                      <div
                        className="flex justify-start gap-4 items-center w-full cursor-pointer mt-1 hover:bg-gray-200/20 py-1 px-2 rounded"
                        onClick={() => {
                          router.push("/setting"), setOpenInfo(false);
                        }}
                      >
                        <AiFillSetting />
                        <p className="text-sm">Setting</p>
                      </div>
                      <div className="flex justify-start gap-4 items-center w-full cursor-pointer mt-1 hover:bg-gray-200/20 py-1 px-2 rounded">
                        <BiHelpCircle />
                        <p className="text-sm">Help</p>
                      </div>

                      <div
                        className="flex justify-start gap-4 items-center w-full cursor-pointer my-1 hover:bg-gray-200/20 py-1 px-2 rounded"
                        onClick={() => handleLogout()}
                      >
                        <BiExit />
                        <p className="text-sm">Logout</p>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-gray-700 font-medium text-[14px]">
                    {firstName + " " + lastName}
                  </p>
                  <p className="text-gray-700 text-[14px]">
                    {professional_role}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
