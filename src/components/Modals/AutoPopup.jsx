import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import CTAButton from "../CTAButton";
import { useRouter } from "next/router";

const AutoPopup = () => {
  const [isModal, setIsModal] = useState(true);
  const router = useRouter();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setAnimate(true);
    }, 10000); // Close modal after 10 seconds

    // Clear the timeout when the component unmounts or when isModal becomes false
    return () => clearTimeout(timeoutId);
  }, [animate]);

  return (
    <div>
      {isModal && (
        <div
          className="fixed top-0 left-0 flex justify-center w-full z-[1000] max-sm:overflow-y-auto"
          style={{
            background: "rgb(0 0 0 / 78%)",
            height: "100%",
          }}
        >
          <div
            className={`transition-opacity ease-in-out duration-300 ${animate ? "opacity-100" : "opacity-0"
              }`}
          >
            <div className=" mx-auto max-w-[95%] lg:w-[900px] bg-white border rounded-md pb-5 relative mt-[10px] transition-opacity ease-in duration-700">
              <div className="flex w-full flex-col">
                <img
                  src="./images/zeework_popup_banner.jpg"
                  alt="zeework"
                  className="max-h-[350px] object-cover"
                />
                <div className="sm:px-0 px-2">
                  <h4 className="text-lg font-semibold capitalize text-center">
                    Welcome to the World&apos;s Newest Freelancer Platform.
                  </h4>
                  <p className="text-center text-sm mt-3 px-8 leading-5">
                    We&apos;re excited to now welcome Freelancers to join the
                    ZeeWork beta. Together we are building a new kind of <br />
                    Freelancer experience, one that is inclusive of your skills,
                    fair with payment and opportunity, helping you <br /> build a
                    career with some of the world&apos;s most impressive
                    emerging businesses.
                  </p>
                  <p className="text-center mt-3 text-sm">
                    Click below to join. You can now onboard for FREE ahead of
                    our launch to clients in Q3. 2024.
                  </p>
                  <h4 className="text-sm sm:text-[20px] font-bold capitalize text-center mt-3 leading-7">
                    Now Onboarding Freelancers. <br />
                    Sign up to join our
                    EXCLUSIVE Beta!
                  </h4>

                  <div className="flex justify-center">
                    <CTAButton
                      text={"Join Now For Free"}
                      bg={"#22C55E"}
                      color={"#ffff"}
                      fontSize="1.2rem"
                      height="2.5rem"
                      margin="1rem 0"
                      textAlign="center"
                      onClick={() => {
                        router.push("/signup");
                      }}
                    ></CTAButton>
                  </div>

                  <p className="text-center">
                    Already A Member?{" "}
                    <span
                      onClick={() => router.push("/login")}
                      className="text-green-600 font-bold cursor-pointer"
                    >
                      Click Here
                    </span>
                  </p>

                  <IoMdClose
                    className="text-2xl cursor-pointer absolute top-[10px] right-[10px] bg-slate-400"
                    onClick={() => {
                      setIsModal(false);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AutoPopup;
