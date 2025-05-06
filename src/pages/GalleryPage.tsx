import Slider from "react-slick";
import NavigationBar from "../components/NavigationBar";
import { NextArrow, PrevArrow } from "../features/gallery/SliderArrow";

function GalleryPage() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <div>
      <NavigationBar />

      <div className="mt-10 p-6 pt-4 bg-[#F0F0F0]">
        <p className="w-fit mx-auto font-bold text-2xl">Ruang Kelas</p>
        <Slider {...settings} className="mt-4">
          <div className="px-2">
            <img src="images/class1.png" alt="Classroom 1" />
          </div>
          <div className="px-2">
            <img src="images/class2.png" alt="Classroom 1" />
          </div>
          <div className="px-2">
            <img src="images/class2.png" alt="Classroom 1" />
          </div>
        </Slider>
        
      </div>
    </div>
  )
}

export default GalleryPage;
