import React from "react";
import Button from "../../components/Button";
import NavigationBar from "../../components/NavigationBar";
import Footer from "./components/Footer";
import LatestNews from "./components/LatestNews";
import SchoolLevel from "./components/SchoolLevel";

function LandingPage() {
  return (
    <React.Fragment>
      <NavigationBar />
      <div className="px-[60px] 2xl:px-28 py-5">
        <div className="relative">
          <img
            src="images/jumbotron.png"
            className="rounded-xl object-cover w-full max-h-[80vh]"
          />
          <div className="absolute bottom-9 right-4 text-right text-white">
            <p className="text-5xl font-black">Letjend Haryono M.T.</p>
            <p className="mt-3">
              Temukan minat Anda. Temukan orang-orang Anda.
              <br />
              Unggul dalam studi Anda. Terlibat dengan dunia.
            </p>
          </div>
        </div>

        <div className="flex justify-between mt-10 lg:gap-10">
          <img
            src="images/smile-kid-vector.png"
            alt=""
            className="max-w-[50%] 2xl:w-full rounded-sm object-cover"
          />
          <div className="flex flex-col justify-center gap-3">
            <p className="font-black text-4xl 2xl:text-5xl text-center whitespace-nowrap">
              Daftarkan Anak Anda
            </p>
            <p className="2xl:text-lg max-w-md text-center mx-auto">
              Kami menawarkan pendidikan berkualitas tinggi dan staf pengajar
              yang berdedikasi
            </p>
            <Button>Daftar Sekarang</Button>
          </div>
        </div>

        <SchoolLevel />
        <LatestNews />
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default LandingPage;
