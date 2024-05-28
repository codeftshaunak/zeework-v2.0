import { useRef } from "react";
import ActiveJobCard from "../ActiveJobCard";
import { Swiper, SwiperSlide } from "swiper/react";

const ActiveJobSlider = ({ activeJobList }) => {
  // const [activeJobList, setActiveJobList] = useState([]);

  const swiperRef = useRef();
  // const userAllJobsDatas = async () => {
  //   try {
  //     const response = await userAllJobs();
  //     console.log(response);
  //     setActiveJobList(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   userAllJobsDatas();
  // }, []);

  // console.log(activeJobList, "activeJobList+++++")

  return (
    <div>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          768: {
            // width: 768,
            slidesPerView: 2,
          },
          1024: {
            // width: 1024,
            slidesPerView: 3,
          },
        }}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {activeJobList?.length > 0 &&
          activeJobList?.map((job, index) => {
            return (
              <SwiperSlide key={index}>
                <ActiveJobCard job={job} />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};

export default ActiveJobSlider;
