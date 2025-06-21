import Slider from "react-slick";

function SchoolActivity() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoPlay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <></>,
    prevArrow: <></>,
  };

  return (
    <div className="mt-20">
      <div data-aos="fade-up" className="relative slider-container">
        <Slider {...settings} autoplay className="mt-4">
          <div className="relative max-h-[85vh] overflow-hidden">
            <img src='images/event3.jpg' className="min-h-[50vh] md:min-h-max object-cover 2xl:object-[0_-160px]" />
            <div className="absolute bg-black top-0 size-full opacity-40"></div>
            <div className="absolute inset-0 flex flex-col gap-3 justify-top pt-16 items-center text-white">
              <p className="text-xl md:text-4xl font-semibold">Boy's Brigade (BB)</p>
              <p className='text-sm md:text-base max-w-2xl text-center'>Sekolah menawarkan Boys' Brigade sebagai salah satu kegiatan sekolah yang nantinya akan menjadi wadah pembinaan karakter, kepemimpinan, dan pelayanan bagi siswa sekolah dasar hingga menengah.</p>
            </div>
            <div className="absolute inset-x-0 bottom-10 flex justify-center text-white">
              <p className='text-sm md:text-base max-w-3xl text-center'>Boys’ Brigade (BB) adalah organisasi internasional yang telah berdiri sejak 1883. Di Indonesia, BB menjadi mitra pendidikan
              karakter yang terpercaya, membentuk generasi muda yang kuat secara rohani, mental, dan sosial.</p>
            </div>
          </div>

          <div className="relative max-h-[85vh] overflow-hidden">
            <img src='images/event4.jpg' className="min-h-[50vh] md:min-h-max object-cover 2xl:object-[0_-140px]" />
            <div className="absolute bg-black top-0 size-full opacity-40"></div>
            <div className="absolute inset-0 flex flex-col gap-3 justify-top pt-16 items-center text-white">
              <p className="text-xl md:text-4xl font-semibold">Bazar</p>
              <p className='text-sm md:text-base max-w-2xl text-center'>Sebagai bagian dari program <strong>Entrepreneurship Education</strong>, siswa belajar langsung bagaimana mengelola bisnis kecil—mulai dari konsep, produksi, hingga pemasaran.</p>
            </div>
          </div>
          
          <div className="relative max-h-[85vh] overflow-hidden">
            <img src='images/event2.png' className="min-h-[50vh] md:h-[85vh] w-full md:min-h-max object-cover 2xl:object-[0_-160px]"/>
            <div className="absolute bg-black top-0 size-full opacity-40"></div>
            <div className="absolute inset-0 flex flex-col gap-3 justify-top pt-16 items-center text-white">
              <p className="text-xl md:text-4xl font-semibold">Pertunjukkan Tari Siswa Untuk Acara Tamatan</p>
              <p className='text-sm md:text-base max-w-2xl text-center'>Sebagai bagian dari program <strong>Entrepreneurship Education</strong>, siswa belajar langsung bagaimana mengelola bisnis kecil—mulai dari konsep, produksi, hingga pemasaran.</p>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  )
}

export default SchoolActivity;
