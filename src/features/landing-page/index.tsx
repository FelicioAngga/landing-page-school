import NavigationBar from "../../components/NavigationBar";
import Footer from "./components/Footer";
import LatestNews from "./components/LatestNews";
import SchoolNumberInfo from "./components/SchoolNumberInfo";
import { NextArrow, PrevArrow } from "../gallery/SliderArrow";
import Slider from "react-slick";
import useScrollPosition from "../../utils/useScrollPosition";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import SchoolActivity from "./components/SchoolActivity";

function LandingPage() {
  const navigate = useNavigate();
  const offsetY = useScrollPosition();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoPlay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const classRoomImages = [
    "images/tk.jpg",
    "images/sd.jpg",
    "images/smp.jpg",
    "images/sma.jpg",
  ];

  return (
    <div className="relative">
      <NavigationBar />
      <div className="pb-5">
        <div className="relative overflow-hidden min-h-screen md:h-auto md:max-h-screen flex items-center justify-center bg-white">
          <div 
            className="absolute inset-0 w-full h-full"
            style={{ transform: `translateY(${offsetY * 0.5}px)` }}
          >
            <img
              src="images/jumbotron.jpg"
              className="rounded-xl object-cover w-full min-h-screen md:h-auto md:max-h-screen"
            />
          </div>
          
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="relative z-10 bottom-0 right-0 text-right text-white p-4 md:p-8">
            <h1 className="text-center text-3xl md:text-5xl font-black" style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.7)' }}>
              Letjen Haryono M.T.
            </h1>
            <p className="mt-5 text-center text-base md:text-lg" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>
              Temukan minat Anda. Temukan orang-orang Anda.
              <br />
              Unggul dalam studi Anda. Terlibat dengan dunia.
            </p>
            <Button onClick={() => navigate("/student-registration")} className="flex mt-5 !px-12 !rounded mx-auto">Daftar Sekarang</Button>
          </div>
        </div>

        <div className="mt-4 md:pt-24 pb-8 px-4 md:px-[60px] 2xl:px-28">
         <div className="flex flex-col md:flex-row md:gap-20 lg:gap-40 justify-between">
            <div className="relative slider-container w-full md:w-[35%]">
              <Slider {...settings} autoplay className="mt-4">
                {classRoomImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt="Classroom 1"
                    className="h-80 md:h-[500px] object-cover rounded"
                  />
                ))}
              </Slider>
            </div>
            <div className="pt-10 md:pt-3 md:w-[65%]">
              <p className="text-xl md:text-3xl font-semibold">Tentang Sekolah</p>
              <p className="mt-5 text-sm md:text-base text-justify">
                Yayasan Perguruan Letjen Haryono M.T. adalah lembaga pendidikan yang
                berkomitmen untuk menyediakan pendidikan berkualitas tinggi
                dengan pendekatan yang inovatif dan inklusif. Kami percaya bahwa
                setiap anak memiliki potensi unik yang perlu dikembangkan.
              </p>
              <p className="mt-8 text-justify">Di sekolah kami bukan hanya menyediakan pendidikan kami membentuk karakter,
                menggali potensi, dan menumbuhkan semangat belajar seumur hidup. kami percaya bahwa setiap anak punya potensi luar biasa. 
                Tugas kami adalah membantu mereka menemukannya, memupuknya, dan membawanya tumbuh hingga siap menghadapi dunia.
              </p>
            </div>
          </div>
        </div>

        <div className="px-4 md:px-[60px] 2xl:px-28">
          <SchoolNumberInfo />
        </div>
        <SchoolActivity />
        <div className="px-4 md:px-[60px] 2xl:px-28">
          <LatestNews />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;
