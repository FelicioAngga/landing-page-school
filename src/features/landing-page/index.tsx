import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import NavigationBar from "../../components/NavigationBar";
import Footer from "./components/Footer";
import LatestNews from "./components/LatestNews";
import SchoolLevel from "./components/SchoolLevel";

function LandingPage() {
  const navigate = useNavigate();
  return (
    <>
      <NavigationBar />
      <div className="px-4 md:px-[60px] 2xl:px-28 py-5">
        <div className="relative rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-15"></div>
          <img
            src="images/jumbotron.jpg"
            className="rounded-xl object-cover w-full h-96 md:h-auto md:max-h-[80vh]"
          />
          <div className="absolute bottom-9 right-4 text-right text-white">
            <p className="text-2xl md:text-5xl font-black">Letjen Haryono M.T.</p>
            <p className="mt-3 text-sm md:text-base">
              Temukan minat Anda. Temukan orang-orang Anda.
              <br />
              Unggul dalam studi Anda. Terlibat dengan dunia.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between mt-10 gap-4 lg:gap-10">
          <img
            src="images/smile-kid-vector.png"
            alt=""
            className="md:max-w-[50%] 2xl:w-full rounded-sm object-cover"
          />
          <div className="flex flex-col justify-center gap-3">
            <p className="font-black text-2xl md:text-3xl 2xl:text-5xl text-center whitespace-nowrap">
              Daftarkan Anak Anda
            </p>
            <p className="text-sm md:text-base 2xl:text-lg max-w-md text-center mx-auto">
              Kami menawarkan pendidikan berkualitas tinggi dan staf pengajar
              yang berdedikasi
            </p>
            <Button onClick={() => navigate("/student-registration")}>Daftar Sekarang</Button>
          </div>
        </div>

        <SchoolLevel />
        <LatestNews />
      </div>
      <Footer />
    </>
  );
}

export default LandingPage;
