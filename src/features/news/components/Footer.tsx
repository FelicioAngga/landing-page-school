import { FaCity, FaPhone } from "react-icons/fa6"
import { IoMdMail } from "react-icons/io"
import Button from "../../../components/Button"


function Footer() {
  return (
    <div className="py-8 md:py-10 px-4 md:px-[60px] 2xl:py-7 2xl:px-28 bg-[#EAF4FF]">
      <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-3">
        <div className="flex flex-col gap-5 items-center">
          <p className="text-2xl md:text-3xl font-bold">Hubungi Kami</p>
          <div className="flex gap-2 items-center">
            <FaPhone />
            <p>(061) 8460390</p>
          </div>
          <div className="flex gap-2 items-center">
            <IoMdMail />
            <p>sekolahletjen@gmail.com</p>
          </div>
          <div className="flex gap-2 items-center">
            <FaCity />
            <p>Jl Pinang Baris II, Gg Sekata</p>
          </div>
        </div>

        <div className="hidden md:block w-[2px] bg-black"></div>

        <div className="flex flex-col justify-center">
          <p className="text-2xl md:text-3xl font-bold text-center">Ayo Segera Daftarkan Anak Anda</p>
          <Button className="mt-4 flex justify-center mx-auto px-10 w-[90%] md:w-96">Pendaftaran Siswa</Button>
        </div>
      </div>
    </div>
  )
}

export default Footer