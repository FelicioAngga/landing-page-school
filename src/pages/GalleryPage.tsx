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
    "images/class1.jpg",
    "images/sd.jpg",
    "images/class3.jpg",
    "images/class4.jpg",
    "images/class5.jpg",
  ];

  const labImages = [
    "images/lab4.png",
    "images/lab3.jpeg",
    "images/lab1.png",
    "images/lab2.png",
  ];

  const labCompImages = [
    "images/labComp1.png",
    "images/labComp3.jpg",
    "images/labComp4.jpg",
  ];

  const eventImages = [
    {
      src: "images/event1.jpg",
      name: "Acara Kelulusan"
    },
    {
      src: "images/event2.jpg",
      name: "Acara Tahunan"
    },
    {
      src: "images/event3.jpg",
      name: "Drumband"
    },
    {
      src: "images/event4.jpg",
      name: "Bazaar Sekolah"
    },
    {
      src: "images/event5.jpg",
      name: "Foto Bersama"
    },
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
              <div className="relative px-2" key={index}>
                <img
                  src={image.src}
                  alt="Event 1"
                  className="h-64 w-full object-cover rounded z-10"
                />
                <div className="transition-opacity rounded bg-black opacity-0 hover:opacity-40 absolute peer top-0 h-64 w-[444px]"></div>
                <div className="transition-opacity opacity-0 peer-hover:opacity-100 absolute text-white top-[45%] inset-x-0 mx-auto w-fit">{image.name}</div>
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
