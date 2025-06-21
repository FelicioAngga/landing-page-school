import { FaFacebook, FaInstagram, FaLinkedin, FaPhone } from "react-icons/fa6"
import Button from "../../../components/Button"
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { useNavigate } from "react-router-dom";


function Footer() {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-white mb-4">Sekolah Letjen</h2>
            <p className="text-gray-400">
              Membentuk generasi masa depan yang cerdas, kreatif, dan berakhlak mulia.
            </p>
          </div>

          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-semibold text-white mb-4 uppercase">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li><a href="#" onClick={() => window.scrollTo(0, 0)} className="hover:text-blue-400 transition-colors">Beranda</a></li>
              <li><a href="/news" className="hover:text-blue-400 transition-colors">Berita</a></li>
              <li><a href="/gallery" className="hover:text-blue-400 transition-colors">Galeri Sekolah</a></li>
              <li><a href="/student-registration" className="hover:text-blue-400 transition-colors">Pendaftaran</a></li>
            </ul>
          </div>

          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-semibold text-white mb-4 uppercase">Hubungi Kami</h3>
            <div className="flex flex-col space-y-3">
              <div className="flex items-center gap-3">
                <FaPhone className="text-blue-400" />
                <span>(061) 8460390</span>
              </div>
              <div className="flex items-center gap-3">
                <IoMail className="text-blue-400" />
                <span>sekolahletjen@gmail.com</span>
              </div>
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-blue-400 mt-1 flex-shrink-0" />
                <span>Jl Pinang Baris II, Gg Sekata, Medan</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 uppercase">Ayo Bergabung</h3>
            <p className="mb-4 text-gray-400">Daftarkan putra-putri Anda sekarang juga!</p>
            <Button onClick={() => navigate("/student-registration")} className="w-full text-center flex justify-center">
              Pendaftaran Siswa
            </Button>
            <div className="flex justify-start space-x-4 mt-6">
              <a href="https://www.instagram.com/sekolah.letjenharyonomt/" aria-label="Instagram" className="flex items-center gap-2 text-gray-400 hover:text-white"><FaInstagram size={24}/>Instagram</a>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} Sekolah Letjen. Seluruh Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer