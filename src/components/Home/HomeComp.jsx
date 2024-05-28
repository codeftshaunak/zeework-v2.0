import homesidbar from "../../assets/img/home-sidebar.png";
import girl from "../../assets/img/girl.png";
import StarIcon from "../../assets/icons/star";
import { useNavigate } from "react-router-dom";
import { Fade } from "react-awesome-reveal";

function WorkTeamCard({ title, description, icon }) {
  return (
    <div className="w-[420px] h-72 relative">
      <div className="w-[420px] h-72 left-0 top-0 absolute bg-white rounded-3xl border border-green-500" />
      <div className="left-[30px] top-[30px] absolute flex-col justify-start items-start gap-4 inline-flex">
        <div className="text-black text-[28px] font-bold font-['SF Pro Text'] leading-9">
          {title}
        </div>
        <div className="w-[360px] text-black text-lg font-normal font-['SF Pro Text'] leading-7">
          {description}
        </div>
      </div>
      <div className="w-16 h-16 left-[30px] top-[194px] absolute">
        <div className="w-16 h-16 left-0 top-0 absolute bg-green-500 rounded-full" />
        <div className="w-9 h-9 left-[6px] top-[6px] absolute origin-top-left ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="52"
            height="52"
            viewBox="0 0 52 52"
            fill="none"
          >
            <path
              d="M36.6066 26H15.3934"
              stroke="white"
              strokeWidth="2.625"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M27.0605 16.4541L36.6065 26L27.0605 35.546"
              stroke="white"
              strokeWidth="2.625"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="w-[182px] h-[182px] left-[257px] top-[130px] absolute">
        <div className="w-[136.50px] h-[126px] absolute">{icon}</div>
      </div>
    </div>
  );
}

function ReviewCard() {
  return (
    <div className="w-[420px] mt-9 p-6 bg-white rounded-3xl border border-green-500 flex-col justify-start items-start gap-4 inline-flex">
      <div className="justify-start items-start gap-2 inline-flex">
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
      </div>
      <div className="w-[372px] text-gray-600 text-xl font-medium font-['Lato'] leading-loose">
        For businesses with diverse services and offerings, our multi-page
        websites ensure every aspect of your company shines.
      </div>
      <div className="w-[371px] text-black text-2xl font-['SF Pro']">
        Madelyn Levin
      </div>
    </div>
  );
}

function FAQCard({ question, answer }) {
  return (
    <div className="w-[640px]  p-6 bg-white rounded-[20px] border border-gray-300 flex-col justify-start items-start gap-2 inline-flex">
      <div className="text-black text-2xl font-['SF Pro']">{question}</div>
      <div className="w-[592px] text-gray-600 text-xl font-normal font-['Lato'] leading-loose">
        {answer}
      </div>
    </div>
  );
}

function HomeComp() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="max-w-[1300px] mx-auto">
        {/* Section A */}
        <Fade>
          <div className="w-[1300px] h-[552px] relative flex bg-green-50 rounded-3xl mx-auto mt-6 pl-14">
            <div className="w-[672px] h-[318px] relative flex-col justify-start items-start gap-6 inline-flex">
              <div className="text-green-600 text-xl font-bold font-['SF Pro'] mt-16">
                The future of Work 🚀
              </div>
              <div className="flex-col justify-start items-start gap-6 flex">
                <div className="w-[672px]">
                  <span className="text-black text-5xl font-bold font-['SF Pro Text'] leading-[57.60px]">
                    Welcome to the <br />
                    World’s{" "}
                  </span>
                  <div className="w-[114px] h-[114px] absolute left-[28.5rem] top-[10.2rem] opacity-10 bg-green-500 rounded-full" />
                  <span className="text-green-600 text-5xl font-bold font-['SF Pro Text'] leading-[57.60px]">
                    Fastest Growing
                  </span>
                  <span className="text-black text-5xl font-bold font-['SF Pro Text'] leading-[57.60px]">
                    {" "}
                    Freelance Platform.
                  </span>
                </div>
                <div className="text-black text-2xl font-normal font-['SF Pro Text'] leading-9">
                  Forget the old rules. You can have the best people.
                  <br />
                  Right now. Right here.
                </div>
                <div className="flex items-center">
                  <div className="w-[194px] h-10 flex-col justify-start items-start gap-2.5 inline-flex">
                    <div
                      className="self-stretch h-10 px-3.5 py-2.5 bg-green-500 rounded-md shadow justify-center items-center gap-1 inline-flex cursor-pointer"
                      onClick={() => navigate("/signup")}
                    >
                      <div className="text-white text-sm font-medium font-['SF Pro Text'] leading-tight">
                        Become a Freelancer
                      </div>
                      <div className="w-5 h-5 relative">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <g id="24/arrow-up-right">
                            <path
                              id="Path"
                              d="M14.1673 5.83337L5.83398 14.1667"
                              stroke="white"
                              strokeWidth="1.75"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              id="Path_2"
                              d="M6.66602 5.83337H14.166V13.3334"
                              stroke="white"
                              strokeWidth="1.75"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="w-[168px] h-10 ml-4 flex-col justify-start items-start gap-2.5 inline-flex">
                    <div
                      className="self-stretch grow shrink basis-0 px-3.5 py-2.5 bg-gray-50 rounded-md shadow border border-gray-300 justify-center items-center gap-1 inline-flex cursor-pointer"
                      onClick={() => navigate("/signup")}
                    >
                      <div className="text-gray-700 text-sm font-medium font-['SF Pro Text'] leading-tight">
                        Hire a Freelancer
                      </div>
                      <div className="w-5 h-5 relative">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <g id="24/arrow-up-right">
                            <path
                              id="Path"
                              d="M14.1673 5.83337L5.83398 14.1667"
                              stroke="#374151"
                              strokeWidth="1.75"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              id="Path_2"
                              d="M6.66602 5.83337H14.166V13.3334"
                              stroke="#374151"
                              strokeWidth="1.75"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <img
              className="w-[620.98px] h-[695px] absolute -top-8 right-0"
              src={homesidbar}
            />
          </div>
        </Fade>

        {/* Section B */}
        <Fade>
          <div className="w-[595px] mt-[5.3rem] flex-col justify-start items-start gap-3 inline-flex">
            <div>
              <span className="text-black text-[42px] font-bold font-['SF Pro Text'] leading-[50.40px]">
                Why Online{" "}
              </span>
              <span className="text-green-600 text-[42px] font-bold font-['SF Pro Text'] leading-[50.40px]">
                Workteams
              </span>
              <span className="text-black text-[42px] font-bold font-['SF Pro Text'] leading-[50.40px]">
                ?
              </span>
            </div>
            <div className="text-black text-2xl font-normal font-['SF Pro Text'] leading-9">
              You can have the best people. Right now. Right here.
            </div>
            <div className="flex gap-5">
              <WorkTeamCard
                title={"Flexibility"}
                description={
                  "Ramp up and down, from short-term engagemennnts to full-time teams"
                }
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="163"
                    height="158"
                    viewBox="0 0 163 158"
                    fill="none"
                  >
                    <g id="Frame 26850">
                      <g id="Group 57">
                        <path
                          id="Vector"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M117.209 47.25H133.462C136.443 47.25 138.931 47.2499 140.975 47.3836C143.103 47.5228 145.115 47.8225 147.074 48.5967C152.026 50.5533 155.947 54.4741 157.904 59.4268C158.678 61.3861 158.977 63.3979 159.117 65.5253C159.25 67.5696 159.25 70.0574 159.25 73.0374V74.1621C159.253 81.9644 159.255 87.1227 157.763 91.6608C155.603 98.2331 151.219 103.846 145.367 107.536C141.326 110.084 136.322 111.334 128.752 113.224L127.07 113.644L118.438 115.083C114.098 115.806 109.731 116.349 105.349 116.711C105.35 116.36 105.35 115.996 105.35 115.621V108.379C105.35 106.852 105.35 105.516 105.275 104.408C105.195 103.235 105.018 102.038 104.524 100.848C103.423 98.189 101.311 96.0771 98.6528 94.9753C97.4621 94.4825 96.2651 94.3054 95.0926 94.2249C93.9838 94.1493 92.6489 94.1493 91.1208 94.15H90.88C89.3519 94.1493 88.017 94.1493 86.9082 94.2249C85.7357 94.3054 84.5387 94.4825 83.348 94.9753C80.6894 96.0771 78.5775 98.189 77.4764 100.848C76.9832 102.038 76.8059 103.235 76.7259 104.408C76.6503 105.516 76.6503 106.851 76.6504 108.379L76.6509 116.484C71.4068 115.968 66.1883 115.191 61.0149 114.157L58.416 113.637L53.8835 112.63C46.4534 110.982 41.5452 109.892 37.5385 107.561C31.1621 103.851 26.3916 97.9034 24.1531 90.874C22.7465 86.457 22.7479 81.4296 22.7502 73.8188L22.7504 72.7235C22.7503 69.8874 22.7503 67.5198 22.8716 65.5724C22.9978 63.5466 23.2694 61.6287 23.972 59.7519C25.9238 54.5374 30.0377 50.4234 35.2522 48.4716C37.129 47.7691 39.0469 47.4974 41.0727 47.3712C43.0201 47.2499 45.3877 47.25 48.2237 47.25H64.7915C64.8198 46.2109 64.8674 45.2469 64.9476 44.3615C65.1565 42.0572 65.6189 39.7755 66.8605 37.625C68.2428 35.2307 70.2311 33.2424 72.6254 31.8602C74.7759 30.6186 77.0578 30.1561 79.3622 29.9473C81.5406 29.7498 84.1964 29.7499 87.2743 29.75H94.7258C97.8044 29.7499 100.46 29.7498 102.639 29.9473C104.943 30.1561 107.225 30.6186 109.375 31.8602C111.769 33.2424 113.758 35.2307 115.141 37.625C116.382 39.7755 116.844 42.0572 117.053 44.3615C117.133 45.2469 117.181 46.2109 117.209 47.25ZM75.2954 47.25H106.706C106.682 46.5205 106.648 45.883 106.596 45.3093C106.453 43.7332 106.212 43.1611 106.047 42.875C105.586 42.0769 104.923 41.4142 104.125 40.9534C103.839 40.7882 103.267 40.5473 101.691 40.4044C100.043 40.255 97.8681 40.25 94.5004 40.25H87.5004C84.1327 40.25 81.9578 40.255 80.3093 40.4044C78.7336 40.5473 78.1617 40.7882 77.8754 40.9534C77.0774 41.4142 76.4146 42.0769 75.9537 42.875C75.7886 43.1611 75.5477 43.7332 75.4048 45.3093C75.3528 45.883 75.3183 46.5205 75.2954 47.25ZM75.2501 73.5C75.2501 70.6005 77.6003 68.25 80.5004 68.25H101.5C104.4 68.25 106.75 70.6005 106.75 73.5C106.75 76.3995 104.4 78.75 101.5 78.75H80.5004C77.6003 78.75 75.2501 76.3995 75.2501 73.5Z"
                          fill="#F3F4F6"
                        />
                        <path
                          id="Vector_2"
                          d="M87.4307 122.095C86.6502 122.041 86.3891 121.952 86.2932 121.912C85.5211 121.593 84.9079 120.98 84.588 120.207C84.5488 120.112 84.4592 119.85 84.406 119.07C84.3507 118.255 84.3486 117.186 84.3486 115.502V108.502C84.3486 106.819 84.3507 105.749 84.406 104.934C84.4592 104.154 84.5488 103.893 84.5887 103.797C84.9079 103.025 85.5211 102.411 86.2932 102.092C86.3891 102.052 86.6502 101.963 87.4307 101.909C88.2455 101.854 89.3151 101.852 90.9986 101.852C92.6821 101.852 93.7517 101.854 94.5665 101.909C95.347 101.963 95.6081 102.052 95.704 102.092C96.4761 102.411 97.0893 103.025 97.4085 103.797C97.4484 103.893 97.538 104.154 97.5912 104.934C97.6465 105.749 97.6486 106.819 97.6486 108.502V115.502C97.6486 117.186 97.6465 118.255 97.5912 119.07C97.538 119.85 97.4484 120.112 97.4085 120.207C97.0893 120.98 96.4761 121.593 95.704 121.912C95.6081 121.952 95.347 122.041 94.5665 122.095C93.7517 122.15 92.6821 122.152 90.9986 122.152C89.3151 122.152 88.2455 122.15 87.4307 122.095Z"
                          fill="#F3F4F6"
                        />
                        <path
                          id="Vector_3"
                          d="M95.092 129.776C93.9832 129.852 92.6483 129.852 91.1202 129.852H90.8794C89.3513 129.852 88.0164 129.852 86.9076 129.776C85.7351 129.695 84.5381 129.518 83.3474 129.026C80.8442 127.988 78.8247 126.055 77.6788 123.612C71.627 123.08 65.6056 122.216 59.6415 121.023L56.9696 120.489L51.8087 119.343C44.9686 117.833 39.0029 116.514 34.0175 113.614C32.5207 112.743 31.0956 111.772 29.75 110.711C29.753 119.446 29.8021 126.566 30.5655 132.245C31.4126 138.546 33.2249 143.851 37.4382 148.064C41.6517 152.277 46.9568 154.09 53.2575 154.937C59.3263 155.753 67.0426 155.752 76.6157 155.752H105.384C114.957 155.752 122.673 155.753 128.742 154.937C135.043 154.09 140.348 152.277 144.562 148.064C148.775 143.851 150.587 138.546 151.434 132.245C152.183 126.681 152.244 119.731 152.249 111.236C151.243 112.029 150.192 112.772 149.1 113.46C144.072 116.631 137.985 118.144 131.014 119.877L128.496 120.505L119.588 121.99C114.495 122.839 109.366 123.45 104.221 123.821C103.059 126.165 101.084 128.018 98.6522 129.026C97.4615 129.518 96.2645 129.695 95.092 129.776Z"
                          fill="#F3F4F6"
                        />
                      </g>
                    </g>
                  </svg>
                }
              />
              <WorkTeamCard
                title={"Cost Saving"}
                description={
                  "Pay only for hours worked. Hourly rates fit any budget."
                }
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="158"
                    height="158"
                    viewBox="0 0 158 158"
                    fill="none"
                  >
                    <g id="Frame 26790">
                      <g id="Layer 2">
                        <path
                          id="Vector"
                          d="M83.751 100.068C83.8806 101.598 84.4878 103.048 85.4868 104.214C86.4858 105.38 87.8261 106.202 89.318 106.564V93.5745C87.8264 93.9366 86.4864 94.7584 85.4875 95.9236C84.4885 97.0889 83.881 98.5387 83.751 100.068Z"
                          fill="#F3F4F6"
                        />
                        <path
                          id="Vector_2"
                          d="M96.6455 128.057C98.137 127.695 99.477 126.873 100.476 125.708C101.475 124.542 102.082 123.093 102.212 121.563C102.083 120.034 101.476 118.583 100.477 117.418C99.4776 116.252 98.1374 115.43 96.6455 115.067V128.057Z"
                          fill="#F3F4F6"
                        />
                        <path
                          id="Vector_3"
                          d="M118.145 71.0749C120.283 70.2701 122.071 68.7399 123.197 66.7512C124.322 64.7625 124.714 62.4418 124.303 60.194C123.892 57.9462 122.704 55.9142 120.948 54.4526C119.191 52.991 116.977 52.1927 114.692 52.1969H113.554L127.539 27.0269C127.895 26.387 128.029 25.6465 127.918 24.9224C127.806 24.1983 127.457 23.5319 126.925 23.0286C126.392 22.5252 125.707 22.2137 124.978 22.1432C124.249 22.0728 123.517 22.2473 122.898 22.6394C120.223 24.2582 117.206 25.2273 114.088 25.4688C112.845 25.4895 111.641 25.0312 110.727 24.189C108.679 22.5559 106.137 21.6666 103.518 21.6666C100.899 21.6666 98.3572 22.5559 96.3094 24.189C95.3887 25.013 94.1964 25.4686 92.9607 25.4686C91.725 25.4686 90.5327 25.013 89.6119 24.189C87.5666 22.556 85.0271 21.6666 82.4099 21.6666C79.7927 21.6666 77.2532 22.556 75.2079 24.189C74.2982 25.031 73.0986 25.4894 71.8591 25.4688C68.7448 25.2304 65.7308 24.2595 63.0629 22.6352C62.4435 22.2463 61.7123 22.0744 60.9845 22.1466C60.2567 22.2188 59.5735 22.5309 59.0425 23.0338C58.5114 23.5367 58.1627 24.2019 58.0511 24.9248C57.9395 25.6476 58.0715 26.387 58.4261 27.0266L72.4103 52.1969H71.2726C68.9876 52.1927 66.7736 52.991 65.0171 54.4526C63.2606 55.9142 62.0732 57.9462 61.6621 60.194C61.251 62.4418 61.6424 64.7625 62.7678 66.7512C63.8933 68.7399 65.6815 70.2701 67.8201 71.0749C57.968 79.6144 41.0776 97.9939 39.0205 120.685C38.7356 130.334 41.4307 139.836 46.7388 147.899C48.1997 150.387 50.2905 152.445 52.8005 153.868C55.3105 155.29 58.151 156.025 61.0357 155.999H124.929C127.813 156.025 130.652 155.291 133.161 153.869C135.67 152.448 137.761 150.391 139.221 147.904C144.532 139.84 147.229 130.336 146.944 120.685C144.887 97.9939 127.997 79.6144 118.145 71.0749ZM109.54 121.562C109.344 125.03 107.952 128.323 105.601 130.881C103.25 133.438 100.085 135.101 96.646 135.588V137.681C96.646 138.653 96.26 139.585 95.573 140.272C94.8859 140.959 93.954 141.345 92.9824 141.345C92.0107 141.345 91.0789 140.959 90.3918 140.272C89.7048 139.585 89.3188 138.653 89.3188 137.681V135.588C85.8794 135.101 82.715 133.438 80.3641 130.881C78.0132 128.323 76.621 125.03 76.4246 121.562C76.4246 120.591 76.8106 119.659 77.4976 118.972C78.1847 118.285 79.1165 117.899 80.0882 117.899C81.0598 117.899 81.9917 118.285 82.6788 118.972C83.3658 119.659 83.7518 120.591 83.7518 121.562C83.8818 123.092 84.4893 124.541 85.4883 125.707C86.4873 126.872 87.8272 127.694 89.3188 128.056V114.096C85.8791 113.608 82.7145 111.944 80.3635 109.387C78.0126 106.829 76.6207 103.536 76.4246 100.067C76.621 96.5991 78.0132 93.3062 80.3641 90.749C82.715 88.1917 85.8794 86.5281 89.3188 86.0412V83.9482C89.3188 82.9766 89.7048 82.0447 90.3918 81.3577C91.0789 80.6706 92.0107 80.2846 92.9824 80.2846C93.954 80.2846 94.8859 80.6706 95.573 81.3577C96.26 82.0447 96.646 82.9766 96.646 83.9482V86.0412C100.085 86.5281 103.25 88.1917 105.601 90.749C107.952 93.3062 109.344 96.5991 109.54 100.067C109.54 101.039 109.154 101.971 108.467 102.658C107.78 103.345 106.848 103.731 105.877 103.731C104.905 103.731 103.973 103.345 103.286 102.658C102.599 101.971 102.213 101.039 102.213 100.067C102.083 98.5378 101.476 97.088 100.477 95.9228C99.4775 94.7575 98.1375 93.9357 96.646 93.5736V107.534C100.086 108.021 103.25 109.685 105.601 112.243C107.952 114.8 109.344 118.094 109.54 121.562Z"
                          fill="#F3F4F6"
                        />
                      </g>
                    </g>
                  </svg>
                }
              />
              <WorkTeamCard
                title={"Access to Talent"}
                description={"Hire the best from around the world."}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="158"
                    height="158"
                    viewBox="0 0 158 158"
                    fill="none"
                  >
                    <g id="Frame 26851">
                      <g id="Group">
                        <path
                          id="Vector"
                          d="M136.162 100.509L48.8364 100.508C43.3239 101.043 39 105.701 39 111.354L45.9265 145.11C46.1703 150.89 51.0117 155.556 56.8214 155.556H128.179C133.988 155.556 138.831 150.89 139.07 145.11L145.918 112.165L146 111.356C146 105.703 141.674 101.045 136.162 100.509ZM134.624 144.387L134.579 144.798C134.504 148.247 131.634 151.057 128.179 151.057H56.8214C53.3673 151.057 50.4958 148.247 50.4207 144.798L43.5042 111.142C43.616 107.711 46.4424 104.955 49.9015 104.955L135.102 104.957C138.594 104.957 141.444 107.773 141.499 111.252L134.624 144.387Z"
                          fill="#F3F4F6"
                        />
                        <path
                          id="Vector_2"
                          d="M92.5019 76.4591C107.515 76.4591 119.732 64.2454 119.732 49.2287C119.732 34.2154 107.515 22 92.5019 22C77.4868 22 65.2715 34.2154 65.2715 49.2304C65.2715 64.2454 77.4868 76.4591 92.5019 76.4591Z"
                          fill="#F3F4F6"
                        />
                        <path
                          id="Vector_3"
                          d="M131.662 99.4858H136.161V99.0952V96.0117H136.101C135.494 84.8347 127.692 77.6845 115.846 77.6845H110.776C110.776 77.6828 110.778 77.6828 110.778 77.6828H74.2216H69.1515C57.3067 77.6828 49.5054 84.8331 48.896 96.0117H48.8359V99.0935V99.4858H53.3351H131.662Z"
                          fill="#F3F4F6"
                        />
                      </g>
                    </g>
                  </svg>
                }
              />
            </div>
          </div>
        </Fade>

        {/* Section C */}
        <Fade>
          <div className="w-[1300px] h-[452px] relative bg-green-600 rounded-3xl mt-20 px-14 pt-[4.38rem]">
            <div className="absolute top-2 right-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="462"
                height="95"
                viewBox="0 0 462 95"
                fill="none"
              >
                <path
                  opacity="0.3"
                  d="M0.537109 92H-0.462891V93H0.537109V92ZM0.537109 0.40332V-0.59668H-0.462891V0.40332H0.537109ZM57.8564 42.6787L57.7301 41.6867L56.8564 41.798V42.6787H57.8564ZM57.8564 43.9482H56.8564V44.9217L57.8296 44.9479L57.8564 43.9482ZM27.4512 18.8115V17.8115H26.4512V18.8115H27.4512ZM27.4512 37.0928H26.4512V38.0928H27.4512V37.0928ZM27.4512 52.5176V51.5176H26.4512V52.5176H27.4512ZM27.4512 73.5918H26.4512V74.5918H27.4512V73.5918ZM1.53711 92V0.40332H-0.462891V92H1.53711ZM0.537109 1.40332H45.6055V-0.59668H0.537109V1.40332ZM45.6055 1.40332C54.8316 1.40332 61.9996 3.51621 66.8377 7.25648C71.6429 10.9713 74.249 16.3654 74.249 23.1914H76.249C76.249 15.7986 73.3961 9.7987 68.061 5.67418C62.7587 1.5751 55.1049 -0.59668 45.6055 -0.59668V1.40332ZM74.249 23.1914V23.3184H76.249V23.1914H74.249ZM74.249 23.3184C74.249 32.6359 67.2145 40.4785 57.7301 41.6867L57.9828 43.6707C68.4301 42.3398 76.249 33.6786 76.249 23.3184H74.249ZM56.8564 42.6787V43.9482H58.8564V42.6787H56.8564ZM57.8296 44.9479C69.1294 45.2516 78.375 54.4266 78.375 65.2764H80.375C80.375 53.2746 70.1968 43.2796 57.8833 42.9486L57.8296 44.9479ZM78.375 65.2764V65.4033H80.375V65.2764H78.375ZM78.375 65.4033C78.375 73.1146 75.3256 79.4769 69.9385 83.9294C64.5336 88.3967 56.7001 91 47.0654 91V93C57.045 93 65.3663 90.3031 71.2126 85.471C77.0768 80.6242 80.375 73.6881 80.375 65.4033H78.375ZM47.0654 91H0.537109V93H47.0654V91ZM38.2422 17.8115H27.4512V19.8115H38.2422V17.8115ZM26.4512 18.8115V37.0928H28.4512V18.8115H26.4512ZM27.4512 38.0928H37.9248V36.0928H27.4512V38.0928ZM37.9248 38.0928C41.5198 38.0928 44.5568 37.1441 46.7155 35.3747C48.8934 33.5895 50.0967 31.0313 50.0967 28.0156H48.0967C48.0967 30.4589 47.1418 32.4393 45.4476 33.8279C43.7342 35.2324 41.1852 36.0928 37.9248 36.0928V38.0928ZM50.0967 28.0156V27.8887H48.0967V28.0156H50.0967ZM50.0967 27.8887C50.0967 24.8401 48.9953 22.2766 46.8862 20.492C44.7976 18.7248 41.8292 17.8115 38.2422 17.8115V19.8115C41.5106 19.8115 43.9694 20.6439 45.5943 22.0188C47.1986 23.3762 48.0967 25.3513 48.0967 27.8887H50.0967ZM39.1309 51.5176H27.4512V53.5176H39.1309V51.5176ZM26.4512 52.5176V73.5918H28.4512V52.5176H26.4512ZM27.4512 74.5918H38.9404V72.5918H27.4512V74.5918ZM38.9404 74.5918C43.2638 74.5918 46.7754 73.6112 49.223 71.6038C51.7016 69.571 52.9531 66.5973 52.9531 62.9277H50.9531C50.9531 66.1136 49.8878 68.472 47.9547 70.0574C45.9908 71.6681 42.996 72.5918 38.9404 72.5918V74.5918ZM52.9531 62.9277V62.8008H50.9531V62.9277H52.9531ZM52.9531 62.8008C52.9531 59.2662 51.6531 56.3919 49.1887 54.4257C46.7556 52.4845 43.3007 51.5176 39.1309 51.5176V53.5176C43.0226 53.5176 45.9788 54.4232 47.9414 55.9891C49.8728 57.53 50.9531 59.7973 50.9531 62.8008H52.9531ZM85.3711 92H84.3711V93H85.3711V92ZM85.3711 0.40332V-0.59668H84.3711V0.40332H85.3711ZM112.285 0.40332H113.285V-0.59668H112.285V0.40332ZM112.285 92V93H113.285V92H112.285ZM86.3711 92V0.40332H84.3711V92H86.3711ZM85.3711 1.40332H112.285V-0.59668H85.3711V1.40332ZM111.285 0.40332V92H113.285V0.40332H111.285ZM112.285 91H85.3711V93H112.285V91ZM120.82 92H119.82V93H120.82V92ZM120.82 75.1152L120.029 74.504L119.82 74.7741V75.1152H120.82ZM161.064 23.001L161.856 23.6122L162.064 23.3421V23.001H161.064ZM161.064 21.7314H162.064V20.7314H161.064V21.7314ZM121.138 21.7314H120.138V22.7314H121.138V21.7314ZM121.138 0.40332V-0.59668H120.138V0.40332H121.138ZM192.993 0.40332H193.993V-0.59668H192.993V0.40332ZM192.993 17.2246L193.785 17.8353L193.993 17.5655V17.2246H192.993ZM152.749 69.4023L151.957 68.7916L151.749 69.0615V69.4023H152.749ZM152.749 70.6719H151.749V71.6719H152.749V70.6719ZM194.453 70.6719H195.453V69.6719H194.453V70.6719ZM194.453 92V93H195.453V92H194.453ZM121.82 92V75.1152H119.82V92H121.82ZM121.612 75.7264L161.856 23.6122L160.273 22.3898L120.029 74.504L121.612 75.7264ZM162.064 23.001V21.7314H160.064V23.001H162.064ZM161.064 20.7314H121.138V22.7314H161.064V20.7314ZM122.138 21.7314V0.40332H120.138V21.7314H122.138ZM121.138 1.40332H192.993V-0.59668H121.138V1.40332ZM191.993 0.40332V17.2246H193.993V0.40332H191.993ZM192.201 16.6139L151.957 68.7916L153.541 70.0131L193.785 17.8353L192.201 16.6139ZM151.749 69.4023V70.6719H153.749V69.4023H151.749ZM152.749 71.6719H194.453V69.6719H152.749V71.6719ZM193.453 70.6719V92H195.453V70.6719H193.453ZM194.453 91H120.82V93H194.453V91ZM200.449 92H199.449V93H200.449V92ZM200.449 75.1152L199.658 74.504L199.449 74.7741V75.1152H200.449ZM240.693 23.001L241.485 23.6122L241.693 23.3421V23.001H240.693ZM240.693 21.7314H241.693V20.7314H240.693V21.7314ZM200.767 21.7314H199.767V22.7314H200.767V21.7314ZM200.767 0.40332V-0.59668H199.767V0.40332H200.767ZM272.622 0.40332H273.622V-0.59668H272.622V0.40332ZM272.622 17.2246L273.414 17.8353L273.622 17.5655V17.2246H272.622ZM232.378 69.4023L231.586 68.7916L231.378 69.0615V69.4023H232.378ZM232.378 70.6719H231.378V71.6719H232.378V70.6719ZM274.082 70.6719H275.082V69.6719H274.082V70.6719ZM274.082 92V93H275.082V92H274.082ZM201.449 92V75.1152H199.449V92H201.449ZM201.241 75.7264L241.485 23.6122L239.902 22.3898L199.658 74.504L201.241 75.7264ZM241.693 23.001V21.7314H239.693V23.001H241.693ZM240.693 20.7314H200.767V22.7314H240.693V20.7314ZM201.767 21.7314V0.40332H199.767V21.7314H201.767ZM200.767 1.40332H272.622V-0.59668H200.767V1.40332ZM271.622 0.40332V17.2246H273.622V0.40332H271.622ZM271.83 16.6139L231.586 68.7916L233.17 70.0131L273.414 17.8353L271.83 16.6139ZM231.378 69.4023V70.6719H233.378V69.4023H231.378ZM232.378 71.6719H274.082V69.6719H232.378V71.6719ZM273.082 70.6719V92H275.082V70.6719H273.082ZM274.082 91H200.449V93H274.082V91ZM280.078 92H279.078V93H280.078V92ZM280.078 75.1152L279.287 74.504L279.078 74.7741V75.1152H280.078ZM320.322 23.001L321.114 23.6122L321.322 23.3421V23.001H320.322ZM320.322 21.7314H321.322V20.7314H320.322V21.7314ZM280.396 21.7314H279.396V22.7314H280.396V21.7314ZM280.396 0.40332V-0.59668H279.396V0.40332H280.396ZM352.251 0.40332H353.251V-0.59668H352.251V0.40332ZM352.251 17.2246L353.043 17.8353L353.251 17.5655V17.2246H352.251ZM312.007 69.4023L311.215 68.7916L311.007 69.0615V69.4023H312.007ZM312.007 70.6719H311.007V71.6719H312.007V70.6719ZM353.711 70.6719H354.711V69.6719H353.711V70.6719ZM353.711 92V93H354.711V92H353.711ZM281.078 92V75.1152H279.078V92H281.078ZM280.87 75.7264L321.114 23.6122L319.531 22.3898L279.287 74.504L280.87 75.7264ZM321.322 23.001V21.7314H319.322V23.001H321.322ZM320.322 20.7314H280.396V22.7314H320.322V20.7314ZM281.396 21.7314V0.40332H279.396V21.7314H281.396ZM280.396 1.40332H352.251V-0.59668H280.396V1.40332ZM351.251 0.40332V17.2246H353.251V0.40332H351.251ZM351.459 16.6139L311.215 68.7916L312.799 70.0131L353.043 17.8353L351.459 16.6139ZM311.007 69.4023V70.6719H313.007V69.4023H311.007ZM312.007 71.6719H353.711V69.6719H312.007V71.6719ZM352.711 70.6719V92H354.711V70.6719H352.711ZM353.711 91H280.078V93H353.711V91ZM387.7 92H386.7V93H387.7V92ZM387.7 62.9912H388.7V62.7551L388.595 62.544L387.7 62.9912ZM356.406 0.40332V-0.59668H354.788L355.512 0.850534L356.406 0.40332ZM384.907 0.40332L385.826 0.00746727L385.565 -0.59668H384.907V0.40332ZM400.586 36.7754L399.668 37.1712L399.928 37.7754H400.586V36.7754ZM401.855 36.7754V37.7754H402.515L402.775 37.1685L401.855 36.7754ZM417.407 0.40332V-0.59668H416.747L416.488 0.0101757L417.407 0.40332ZM445.908 0.40332L446.803 0.850534L447.526 -0.59668H445.908V0.40332ZM414.614 62.9912L413.72 62.544L413.614 62.7551V62.9912H414.614ZM414.614 92V93H415.614V92H414.614ZM388.7 92V62.9912H386.7V92H388.7ZM388.595 62.544L357.301 -0.0438938L355.512 0.850534L386.806 63.4384L388.595 62.544ZM356.406 1.40332H384.907V-0.59668H356.406V1.40332ZM383.989 0.799173L399.668 37.1712L401.504 36.3795L385.826 0.00746727L383.989 0.799173ZM400.586 37.7754H401.855V35.7754H400.586V37.7754ZM402.775 37.1685L418.327 0.796465L416.488 0.0101757L400.936 36.3822L402.775 37.1685ZM417.407 1.40332H445.908V-0.59668H417.407V1.40332ZM445.014 -0.0438938L413.72 62.544L415.509 63.4384L446.803 0.850534L445.014 -0.0438938ZM413.614 62.9912V92H415.614V62.9912H413.614ZM414.614 91H387.7V93H414.614V91ZM447.461 93.5391C443.437 93.5391 440.179 92.1921 437.929 89.9644C435.679 87.7365 434.369 84.5587 434.369 80.7646H432.369C432.369 85.0322 433.852 88.7415 436.522 91.3855C439.192 94.0295 442.979 95.5391 447.461 95.5391V93.5391ZM434.369 80.7646C434.369 77.004 435.678 73.8248 437.93 71.5876C440.181 69.351 443.44 67.9902 447.461 67.9902V65.9902C442.976 65.9902 439.189 67.5176 436.521 70.1688C433.853 72.8192 432.369 76.5273 432.369 80.7646H434.369ZM447.461 67.9902C451.481 67.9902 454.741 69.351 456.992 71.5876C459.244 73.8248 460.553 77.004 460.553 80.7646H462.553C462.553 76.5273 461.069 72.8192 458.401 70.1688C455.733 67.5176 451.946 65.9902 447.461 65.9902V67.9902ZM460.553 80.7646C460.553 84.5587 459.243 87.7365 456.993 89.9644C454.743 92.1921 451.484 93.5391 447.461 93.5391V95.5391C451.943 95.5391 455.73 94.0295 458.4 91.3855C461.07 88.7415 462.553 85.0322 462.553 80.7646H460.553Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="w-[672px] text-white text-5xl font-bold font-['SF Pro Text'] leading-[57.60px]">
              Find talent your way.
            </div>
            <div className="w-[1142px] text-white text-2xl font-normal font-['SF Pro Text'] leading-9 mt-6">
              Work with the largest network of independent professionals and get
              things done—from quick turnarounds to big transformations.
            </div>

            <div className="w-[580px] h-[116px] relative overflow-hidden p-6 bg-white rounded-xl flex-col justify-center items-start gap-4 inline-flex mt-11">
              <div className="text-gray-700 text-[26px] font-semibold font-['SF Pro Text'] leading-7">
                Get Hired by the best Clients
              </div>
              <div
                className="justify-start items-center gap-3 inline-flex cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                <div className="text-green-600 text-base font-medium font-['SF Pro Text'] leading-normal">
                  Become a Freelancer
                </div>
                <div className="w-5 h-5 relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <g id="24/arrow-up-right">
                      <path
                        id="Path"
                        d="M14.1673 5.83337L5.83398 14.1667"
                        stroke="#16a34a"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        id="Path_2"
                        d="M6.66602 5.83337H14.166V13.3334"
                        stroke="#16a34a"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  </svg>
                </div>
              </div>
              <div className="absolute right-0 top-20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="341"
                  height="139"
                  viewBox="0 0 341 139"
                  fill="none"
                >
                  <path
                    d="M341 69.5C341 107.884 264.665 139 170.5 139C76.3355 139 0 107.884 0 69.5C0 31.1162 76.3355 0 170.5 0C264.665 0 341 31.1162 341 69.5Z"
                    fill="#F3F4F6"
                  />
                </svg>
              </div>
            </div>
            <div className="w-[580px] h-[116px] relative overflow-hidden p-6 bg-white rounded-xl flex-col justify-center items-start gap-4 inline-flex ml-6">
              <div className="text-gray-700 text-[26px] font-semibold font-['SF Pro Text'] leading-7">
                Post a Job and Hire a Pro
              </div>
              <div
                className="justify-start items-center gap-3 inline-flex cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                <div className="text-green-600 text-base font-medium font-['SF Pro Text'] leading-normal">
                  Hire Now
                </div>
                <div className="w-5 h-5 relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <g id="24/arrow-up-right">
                      <path
                        id="Path"
                        d="M14.1673 5.83337L5.83398 14.1667"
                        stroke="#16a34a"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        id="Path_2"
                        d="M6.66602 5.83337H14.166V13.3334"
                        stroke="#16a34a"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  </svg>
                </div>
              </div>
              <div className="absolute right-0 top-20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="341"
                  height="139"
                  viewBox="0 0 341 139"
                  fill="none"
                >
                  <path
                    d="M341 69.5C341 107.884 264.665 139 170.5 139C76.3355 139 0 107.884 0 69.5C0 31.1162 76.3355 0 170.5 0C264.665 0 341 31.1162 341 69.5Z"
                    fill="#F3F4F6"
                  />
                </svg>
              </div>
            </div>
          </div>
        </Fade>

        {/* Section D */}
        <Fade>
          <div className="w-[1279.50px] h-[702px] justify-start items-center gap-[67px] inline-flex mt-20">
            <div className="w-[574.50px] h-[549px] relative">
              <img className="w-100 left-[1px] top-0 absolute " src={girl} />
            </div>
            <div className="flex-col justify-start items-start gap-9 inline-flex">
              <div className="flex-col justify-start items-start gap-3 flex">
                <div className="w-[638px]">
                  <span className="text-black text-[42px] font-bold font-['SF Pro Text'] leading-[50.40px]">
                    Guaranteed{" "}
                  </span>
                  <span className="text-green-600 text-[42px] font-bold font-['SF Pro Text'] leading-[50.40px]">
                    work
                  </span>
                  <span className="text-black text-[42px] font-bold font-['SF Pro Text'] leading-[50.40px]">
                    .Guaranteed{" "}
                  </span>
                  <span className="text-green-600 text-[42px] font-bold font-['SF Pro Text'] leading-[50.40px]">
                    Payment
                  </span>
                  <span className="text-black text-[42px] font-bold font-['SF Pro Text'] leading-[50.40px]">
                    .
                  </span>
                </div>
                <div className="text-black text-2xl font-normal font-['SF Pro Text'] leading-9">
                  You can have the best people. Right now. Right here.
                </div>
              </div>
              <div className="flex-col justify-start items-start gap-4 flex">
                <div className="w-[638px] h-[162px] relative">
                  <div className="w-[638px] h-[162px] left-0 top-0 absolute bg-green-50 rounded-3xl border border-green-500" />
                  <div className="left-[550px] top-[74px] absolute text-green-600 text-5xl font-['SF Pro']">
                    01
                  </div>
                  <div className="w-[469px] h-[105px] left-[24px] top-[24px] absolute flex-col justify-start items-start gap-2 inline-flex">
                    <div className="text-black text-[28px] font-['SF Pro']">
                      See Work as it’s Done
                    </div>

                    <div className="w-[469px] text-gray-600 text-xl font-medium font-['Lato'] leading-loose">
                      Check in on your contractors as easily as if you were in
                      the same office.
                    </div>
                  </div>
                </div>
                <div className="w-[638px] h-[162px] relative">
                  <div className="w-[638px] h-[162px] left-0 top-0 absolute rounded-3xl border border-gray-300" />
                  <div className="left-[550px] top-[81px] absolute opacity-10 text-black text-5xl font-['SF Pro']">
                    02
                  </div>
                  <div className="w-[469px] h-[105px] left-[24px] top-[24px] absolute flex-col justify-start items-start gap-2 inline-flex">
                    <div className="text-black text-[28px] font-['SF Pro']">
                      Build a Team of Experts
                    </div>
                    <div className="w-[469px] text-gray-600 text-xl font-medium font-['Lato'] leading-loose">
                      Check in on your contractors as easily as if you were in
                      the same office.
                    </div>
                  </div>
                </div>
                <div className="w-[638px] h-[162px] relative">
                  <div className="w-[638px] h-[162px] left-0 top-0 absolute rounded-3xl border border-gray-300" />
                  <div className="left-[550px] top-[75px] absolute opacity-10 text-black text-5xl font-['SF Pro']">
                    03
                  </div>
                  <div className="w-[469px] h-[105px] left-[24px] top-[24px] absolute flex-col justify-start items-start gap-2 inline-flex">
                    <div className="text-black text-[28px] font-['SF Pro']">
                      Eliminate Payroll Hassle
                    </div>
                    <div className="w-[469px] text-gray-600 text-xl font-medium font-['Lato'] leading-loose">
                      Check in on your contractors as easily as if you were in
                      the same office.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fade>

        {/* Section E */}
        <Fade>
          <div className="w-[1300px] h-[220px] relative flex items-center justify-between bg-green-600 rounded-3xl mt-36 py-[3.75rem] px-[3.75rem]">
            <div className="flex-col justify-start items-start gap-4 inline-flex">
              <div className="text-white text-[40px] font-['SF Pro']">
                Crafting Your Digital Dreams into Reality.
              </div>
              <div className="text-white text-2xl font-normal font-['SF Pro Text'] leading-9">
                You can have the best people. Right now. Right here.
              </div>
            </div>
            <div
              className="w-[103px] h-10 flex-col justify-start items-start gap-2.5 inline-flex cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              <div className="self-stretch grow shrink basis-0 px-3.5 py-2.5 bg-gray-50 rounded-md shadow border border-gray-300 justify-center items-center gap-1 inline-flex">
                <div className="text-gray-700 text-sm font-medium font-['SF Pro Text'] leading-tight">
                  Join Us
                </div>
                <div className="w-5 h-5 relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                  >
                    <g id="24/arrow-up-right">
                      <path
                        id="Path"
                        d="M14.6663 5.83344L6.33301 14.1668"
                        stroke="#374151"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        id="Path_2"
                        d="M7.16699 5.83344H14.667V13.3334"
                        stroke="#374151"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
            <div className="absolute right-0" style={{ zIndex: "-1" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="462"
                height="95"
                viewBox="0 0 462 95"
                fill="none"
              >
                <path
                  opacity="0.3"
                  d="M0.537109 92H-0.462891V93H0.537109V92ZM0.537109 0.40332V-0.59668H-0.462891V0.40332H0.537109ZM57.8564 42.6787L57.7301 41.6867L56.8564 41.798V42.6787H57.8564ZM57.8564 43.9482H56.8564V44.9217L57.8296 44.9479L57.8564 43.9482ZM27.4512 18.8115V17.8115H26.4512V18.8115H27.4512ZM27.4512 37.0928H26.4512V38.0928H27.4512V37.0928ZM27.4512 52.5176V51.5176H26.4512V52.5176H27.4512ZM27.4512 73.5918H26.4512V74.5918H27.4512V73.5918ZM1.53711 92V0.40332H-0.462891V92H1.53711ZM0.537109 1.40332H45.6055V-0.59668H0.537109V1.40332ZM45.6055 1.40332C54.8316 1.40332 61.9996 3.51621 66.8377 7.25648C71.6429 10.9713 74.249 16.3654 74.249 23.1914H76.249C76.249 15.7986 73.3961 9.7987 68.061 5.67418C62.7587 1.5751 55.1049 -0.59668 45.6055 -0.59668V1.40332ZM74.249 23.1914V23.3184H76.249V23.1914H74.249ZM74.249 23.3184C74.249 32.6359 67.2145 40.4785 57.7301 41.6867L57.9828 43.6707C68.4301 42.3398 76.249 33.6786 76.249 23.3184H74.249ZM56.8564 42.6787V43.9482H58.8564V42.6787H56.8564ZM57.8296 44.9479C69.1294 45.2516 78.375 54.4266 78.375 65.2764H80.375C80.375 53.2746 70.1968 43.2796 57.8833 42.9486L57.8296 44.9479ZM78.375 65.2764V65.4033H80.375V65.2764H78.375ZM78.375 65.4033C78.375 73.1146 75.3256 79.4769 69.9385 83.9294C64.5336 88.3967 56.7001 91 47.0654 91V93C57.045 93 65.3663 90.3031 71.2126 85.471C77.0768 80.6242 80.375 73.6881 80.375 65.4033H78.375ZM47.0654 91H0.537109V93H47.0654V91ZM38.2422 17.8115H27.4512V19.8115H38.2422V17.8115ZM26.4512 18.8115V37.0928H28.4512V18.8115H26.4512ZM27.4512 38.0928H37.9248V36.0928H27.4512V38.0928ZM37.9248 38.0928C41.5198 38.0928 44.5568 37.1441 46.7155 35.3747C48.8934 33.5895 50.0967 31.0313 50.0967 28.0156H48.0967C48.0967 30.4589 47.1418 32.4393 45.4476 33.8279C43.7342 35.2324 41.1852 36.0928 37.9248 36.0928V38.0928ZM50.0967 28.0156V27.8887H48.0967V28.0156H50.0967ZM50.0967 27.8887C50.0967 24.8401 48.9953 22.2766 46.8862 20.492C44.7976 18.7248 41.8292 17.8115 38.2422 17.8115V19.8115C41.5106 19.8115 43.9694 20.6439 45.5943 22.0188C47.1986 23.3762 48.0967 25.3513 48.0967 27.8887H50.0967ZM39.1309 51.5176H27.4512V53.5176H39.1309V51.5176ZM26.4512 52.5176V73.5918H28.4512V52.5176H26.4512ZM27.4512 74.5918H38.9404V72.5918H27.4512V74.5918ZM38.9404 74.5918C43.2638 74.5918 46.7754 73.6112 49.223 71.6038C51.7016 69.571 52.9531 66.5973 52.9531 62.9277H50.9531C50.9531 66.1136 49.8878 68.472 47.9547 70.0574C45.9908 71.6681 42.996 72.5918 38.9404 72.5918V74.5918ZM52.9531 62.9277V62.8008H50.9531V62.9277H52.9531ZM52.9531 62.8008C52.9531 59.2662 51.6531 56.3919 49.1887 54.4257C46.7556 52.4845 43.3007 51.5176 39.1309 51.5176V53.5176C43.0226 53.5176 45.9788 54.4232 47.9414 55.9891C49.8728 57.53 50.9531 59.7973 50.9531 62.8008H52.9531ZM85.3711 92H84.3711V93H85.3711V92ZM85.3711 0.40332V-0.59668H84.3711V0.40332H85.3711ZM112.285 0.40332H113.285V-0.59668H112.285V0.40332ZM112.285 92V93H113.285V92H112.285ZM86.3711 92V0.40332H84.3711V92H86.3711ZM85.3711 1.40332H112.285V-0.59668H85.3711V1.40332ZM111.285 0.40332V92H113.285V0.40332H111.285ZM112.285 91H85.3711V93H112.285V91ZM120.82 92H119.82V93H120.82V92ZM120.82 75.1152L120.029 74.504L119.82 74.7741V75.1152H120.82ZM161.064 23.001L161.856 23.6122L162.064 23.3421V23.001H161.064ZM161.064 21.7314H162.064V20.7314H161.064V21.7314ZM121.138 21.7314H120.138V22.7314H121.138V21.7314ZM121.138 0.40332V-0.59668H120.138V0.40332H121.138ZM192.993 0.40332H193.993V-0.59668H192.993V0.40332ZM192.993 17.2246L193.785 17.8353L193.993 17.5655V17.2246H192.993ZM152.749 69.4023L151.957 68.7916L151.749 69.0615V69.4023H152.749ZM152.749 70.6719H151.749V71.6719H152.749V70.6719ZM194.453 70.6719H195.453V69.6719H194.453V70.6719ZM194.453 92V93H195.453V92H194.453ZM121.82 92V75.1152H119.82V92H121.82ZM121.612 75.7264L161.856 23.6122L160.273 22.3898L120.029 74.504L121.612 75.7264ZM162.064 23.001V21.7314H160.064V23.001H162.064ZM161.064 20.7314H121.138V22.7314H161.064V20.7314ZM122.138 21.7314V0.40332H120.138V21.7314H122.138ZM121.138 1.40332H192.993V-0.59668H121.138V1.40332ZM191.993 0.40332V17.2246H193.993V0.40332H191.993ZM192.201 16.6139L151.957 68.7916L153.541 70.0131L193.785 17.8353L192.201 16.6139ZM151.749 69.4023V70.6719H153.749V69.4023H151.749ZM152.749 71.6719H194.453V69.6719H152.749V71.6719ZM193.453 70.6719V92H195.453V70.6719H193.453ZM194.453 91H120.82V93H194.453V91ZM200.449 92H199.449V93H200.449V92ZM200.449 75.1152L199.658 74.504L199.449 74.7741V75.1152H200.449ZM240.693 23.001L241.485 23.6122L241.693 23.3421V23.001H240.693ZM240.693 21.7314H241.693V20.7314H240.693V21.7314ZM200.767 21.7314H199.767V22.7314H200.767V21.7314ZM200.767 0.40332V-0.59668H199.767V0.40332H200.767ZM272.622 0.40332H273.622V-0.59668H272.622V0.40332ZM272.622 17.2246L273.414 17.8353L273.622 17.5655V17.2246H272.622ZM232.378 69.4023L231.586 68.7916L231.378 69.0615V69.4023H232.378ZM232.378 70.6719H231.378V71.6719H232.378V70.6719ZM274.082 70.6719H275.082V69.6719H274.082V70.6719ZM274.082 92V93H275.082V92H274.082ZM201.449 92V75.1152H199.449V92H201.449ZM201.241 75.7264L241.485 23.6122L239.902 22.3898L199.658 74.504L201.241 75.7264ZM241.693 23.001V21.7314H239.693V23.001H241.693ZM240.693 20.7314H200.767V22.7314H240.693V20.7314ZM201.767 21.7314V0.40332H199.767V21.7314H201.767ZM200.767 1.40332H272.622V-0.59668H200.767V1.40332ZM271.622 0.40332V17.2246H273.622V0.40332H271.622ZM271.83 16.6139L231.586 68.7916L233.17 70.0131L273.414 17.8353L271.83 16.6139ZM231.378 69.4023V70.6719H233.378V69.4023H231.378ZM232.378 71.6719H274.082V69.6719H232.378V71.6719ZM273.082 70.6719V92H275.082V70.6719H273.082ZM274.082 91H200.449V93H274.082V91ZM280.078 92H279.078V93H280.078V92ZM280.078 75.1152L279.287 74.504L279.078 74.7741V75.1152H280.078ZM320.322 23.001L321.114 23.6122L321.322 23.3421V23.001H320.322ZM320.322 21.7314H321.322V20.7314H320.322V21.7314ZM280.396 21.7314H279.396V22.7314H280.396V21.7314ZM280.396 0.40332V-0.59668H279.396V0.40332H280.396ZM352.251 0.40332H353.251V-0.59668H352.251V0.40332ZM352.251 17.2246L353.043 17.8353L353.251 17.5655V17.2246H352.251ZM312.007 69.4023L311.215 68.7916L311.007 69.0615V69.4023H312.007ZM312.007 70.6719H311.007V71.6719H312.007V70.6719ZM353.711 70.6719H354.711V69.6719H353.711V70.6719ZM353.711 92V93H354.711V92H353.711ZM281.078 92V75.1152H279.078V92H281.078ZM280.87 75.7264L321.114 23.6122L319.531 22.3898L279.287 74.504L280.87 75.7264ZM321.322 23.001V21.7314H319.322V23.001H321.322ZM320.322 20.7314H280.396V22.7314H320.322V20.7314ZM281.396 21.7314V0.40332H279.396V21.7314H281.396ZM280.396 1.40332H352.251V-0.59668H280.396V1.40332ZM351.251 0.40332V17.2246H353.251V0.40332H351.251ZM351.459 16.6139L311.215 68.7916L312.799 70.0131L353.043 17.8353L351.459 16.6139ZM311.007 69.4023V70.6719H313.007V69.4023H311.007ZM312.007 71.6719H353.711V69.6719H312.007V71.6719ZM352.711 70.6719V92H354.711V70.6719H352.711ZM353.711 91H280.078V93H353.711V91ZM387.7 92H386.7V93H387.7V92ZM387.7 62.9912H388.7V62.7551L388.595 62.544L387.7 62.9912ZM356.406 0.40332V-0.59668H354.788L355.512 0.850534L356.406 0.40332ZM384.907 0.40332L385.826 0.00746727L385.565 -0.59668H384.907V0.40332ZM400.586 36.7754L399.668 37.1712L399.928 37.7754H400.586V36.7754ZM401.855 36.7754V37.7754H402.515L402.775 37.1685L401.855 36.7754ZM417.407 0.40332V-0.59668H416.747L416.488 0.0101757L417.407 0.40332ZM445.908 0.40332L446.803 0.850534L447.526 -0.59668H445.908V0.40332ZM414.614 62.9912L413.72 62.544L413.614 62.7551V62.9912H414.614ZM414.614 92V93H415.614V92H414.614ZM388.7 92V62.9912H386.7V92H388.7ZM388.595 62.544L357.301 -0.0438938L355.512 0.850534L386.806 63.4384L388.595 62.544ZM356.406 1.40332H384.907V-0.59668H356.406V1.40332ZM383.989 0.799173L399.668 37.1712L401.504 36.3795L385.826 0.00746727L383.989 0.799173ZM400.586 37.7754H401.855V35.7754H400.586V37.7754ZM402.775 37.1685L418.327 0.796465L416.488 0.0101757L400.936 36.3822L402.775 37.1685ZM417.407 1.40332H445.908V-0.59668H417.407V1.40332ZM445.014 -0.0438938L413.72 62.544L415.509 63.4384L446.803 0.850534L445.014 -0.0438938ZM413.614 62.9912V92H415.614V62.9912H413.614ZM414.614 91H387.7V93H414.614V91ZM447.461 93.5391C443.437 93.5391 440.179 92.1921 437.929 89.9644C435.679 87.7365 434.369 84.5587 434.369 80.7646H432.369C432.369 85.0322 433.852 88.7415 436.522 91.3855C439.192 94.0295 442.979 95.5391 447.461 95.5391V93.5391ZM434.369 80.7646C434.369 77.004 435.678 73.8248 437.93 71.5876C440.181 69.351 443.44 67.9902 447.461 67.9902V65.9902C442.976 65.9902 439.189 67.5176 436.521 70.1688C433.853 72.8192 432.369 76.5273 432.369 80.7646H434.369ZM447.461 67.9902C451.481 67.9902 454.741 69.351 456.992 71.5876C459.244 73.8248 460.553 77.004 460.553 80.7646H462.553C462.553 76.5273 461.069 72.8192 458.401 70.1688C455.733 67.5176 451.946 65.9902 447.461 65.9902V67.9902ZM460.553 80.7646C460.553 84.5587 459.243 87.7365 456.993 89.9644C454.743 92.1921 451.484 93.5391 447.461 93.5391V95.5391C451.943 95.5391 455.73 94.0295 458.4 91.3855C461.07 88.7415 462.553 85.0322 462.553 80.7646H460.553Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </Fade>
      </div>
      <Fade>
        <div className="bg-green-50 mt-20">
          <div className="max-w-[1300px] mx-auto py-[3.75rem]">
            <div className="flex items-center justify-between">
              <div className="flex-col justify-start items-start gap-4 inline-flex">
                <div>
                  <span className="text-stone-900 text-[42px] font-bold font-['SF Pro Text'] leading-[50.40px]">
                    What our{" "}
                  </span>
                  <span className="text-green-600 text-[42px] font-bold font-['SF Pro Text'] leading-[50.40px]">
                    happy customer
                  </span>
                  <span className="text-stone-900 text-[42px] font-bold font-['SF Pro Text'] leading-[50.40px]">
                    {" "}
                    says.
                  </span>
                </div>
                <div className="text-black text-2xl font-normal font-['SF Pro Text'] leading-9">
                  You can have the best people. Right now. Right here.
                </div>
              </div>
              <div className="w-[136px] h-[60px] justify-start items-start gap-4 inline-flex">
                <div className="w-[60px] h-[60px] relative">
                  <div className="w-[60px] h-[60px] left-0 top-0 absolute bg-white rounded-full" />
                  <div className="w-8 h-8 left-[14px] top-[14px] absolute">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <g id="Frame" clipPath="url(#clip0_3925_6643)">
                        <path
                          id="Vector"
                          d="M6.66699 16H25.3337"
                          stroke="#22C35E"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          id="Vector_2"
                          d="M6.66699 16L12.0003 21.3333"
                          stroke="#22C35E"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          id="Vector_3"
                          d="M6.66699 16.0001L12.0003 10.6667"
                          stroke="#22C35E"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_3925_6643">
                          <rect width="32" height="32" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="w-[60px] h-[60px] relative">
                  <div className="w-[60px] h-[60px] left-0 top-0 absolute bg-green-600 rounded-full" />
                  <div className="w-8 h-8 left-[46px] top-[46px] absolute origin-top-left -rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <g id="Frame" clipPath="url(#clip0_3925_6643)">
                        <path
                          id="Vector"
                          d="M6.66699 16H25.3337"
                          stroke="#FFFFFF"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          id="Vector_2"
                          d="M6.66699 16L12.0003 21.3333"
                          stroke="#FFFFFF"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          id="Vector_3"
                          d="M6.66699 16.0001L12.0003 10.6667"
                          stroke="#FFFFFF"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_3925_6643">
                          <rect width="32" height="32" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-5">
              <ReviewCard />
              <ReviewCard />
              <ReviewCard />
            </div>
          </div>
        </div>
      </Fade>

      <Fade>
        <div className="max-w-[1300px] mx-auto mt-20">
          <div className="w-[595px] h-[102px] flex-col justify-start items-start ">
            <div>
              <span className="text-stone-900 text-[42px] font-bold font-['SF Pro Text'] leading-[50.40px]">
                Frequently Asked{" "}
              </span>
              <span className="text-green-600 text-[42px] font-bold font-['SF Pro Text'] leading-[50.40px]">
                Question
              </span>
              <span className="text-stone-900 text-[42px] font-bold font-['SF Pro Text'] leading-[50.40px]">
                .
              </span>
            </div>
            <div className="text-black text-2xl font-normal font-['SF Pro Text'] leading-9">
              You can have the best people. Right now. Right here.
            </div>
          </div>

          <div className="flex flex-wrap gap-5 mt-[2.63rem]">
            <FAQCard
              question={"What services does your business offer?"}
              answer={`We create visually appealing and user-friendly websites and dashboards
            that effectively convey our clients' brand messages and enhance their
            online presence.`}
            />
            <FAQCard
              question={"Can you optimize websites for search engines?"}
              answer={`Yes, Optimizing your website for search engines helps improve its visibility and rankings, driving organic traffic and potential customers to your business.`}
            />
            <FAQCard
              question={"Why is a well-designed website important?"}
              answer={
                "A well-designed website enhances online presence, attracts visitors, and drives conversions."
              }
            />
            <FAQCard
              question={"What is your design process?"}
              answer={`We understand requirements, research, create designs, refine based on feedback, develop, test, and launch.`}
            />
            <FAQCard
              question={"Do you offer ongoing support?"}
              answer={`We take a deep dive into your technical & cultural requirements, and your long term goals.`}
            />
            <FAQCard
              question={"How can I get started?"}
              answer={`Contact us through our website or provided contact information for an initial consultation.`}
            />
          </div>
        </div>
      </Fade>
    </div>
  );
}

export default HomeComp;
