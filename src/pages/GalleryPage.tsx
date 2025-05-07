import Slider from "react-slick";
import NavigationBar from "../components/NavigationBar";
import { NextArrow, PrevArrow } from "../features/gallery/SliderArrow";
import Footer from "../features/news/components/Footer";

function GalleryPage() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoPlay: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  const classRoomImages = [
    "images/class1.png",
    "images/class2.png",
    "images/class3.jpg",
    "images/class4.jpg",
    "images/class5.jpg",
  ];

  const labImages = [
    "images/lab3.jpeg",
    "images/lab5.jpg",
    "images/lab4.jpg",
    "images/lab1.png",
    "images/lab2.png",
  ];

  const labCompImages = [
    "images/labComp1.png",
    "images/labComp2.png",
    "images/labComp3.jpg",
    "images/labComp4.jpg",
  ];

  const eventImages = [
    "images/event1.png",
    "images/event2.png",
    "images/event3.png",
    "images/event4.png",
    "images/event5.png",
  ];

  return (
    <div>
      <NavigationBar />

      <div className="flex flex-col gap-12 mt-10 pb-20">
        <div className="p-6 pt-4 bg-[#F0F0F0]">
          <p className="w-fit mx-auto font-bold text-2xl">Ruang Kelas</p>
          <Slider {...settings} className="mt-4">
            {classRoomImages.map((image, index) => (
              <div className="px-2" key={index}>
                <img
                  src={image}
                  alt="Classroom 1"
                  className="h-64 w-full object-cover rounded"
                />
              </div>
            ))}
          </Slider>
        </div>

        <div className="p-6 pt-4 bg-[#F0F0F0]">
          <p className="w-fit mx-auto font-bold text-2xl">Acara Sekolah</p>
          <Slider {...settings} className="mt-4">
            {eventImages.map((image, index) => (
              <div className="px-2" key={index}>
                <img
                  src={image}
                  alt="Classroom 1"
                  className="h-64 w-full object-cover rounded"
                />
              </div>
            ))}
          </Slider>
        </div>

        <div className="p-6 pt-4 bg-[#F0F0F0]">
          <p className="w-fit mx-auto font-bold text-2xl">Ruang Laboratorium</p>
          <Slider {...settings} className="mt-4">
            {labImages.map((image, index) => (
              <div className="px-2" key={index}>
                <img
                  src={image}
                  alt="Classroom 1"
                  className="h-64 w-full object-cover rounded"
                />
              </div>
            ))}
          </Slider>
        </div>

        <div className="p-6 pt-4 bg-[#F0F0F0]">
          <p className="w-fit mx-auto font-bold text-2xl">Lab Komputer</p>
          <Slider {...settings} className="mt-4">
            {labCompImages.map((image, index) => (
              <div className="px-2" key={index}>
                <img
                  src={image}
                  alt="Classroom 1"
                  className="h-64 w-full object-cover rounded"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default GalleryPage;
