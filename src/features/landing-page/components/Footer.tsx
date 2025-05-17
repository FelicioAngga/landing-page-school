import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";

function Footer() {
  const navigate = useNavigate();
  return (
    <div className="mt-20 py-10 md:py-16 bg-[#EAF4FF]">
      <p className="text-2xl md:text-4xl font-black text-center">Ayo Segera Daftarkan Anak Anda</p>
      <Button onClick={() => navigate("/student-registration")} className="mt-12 flex justify-center mx-auto px-10 w-[90%] md:w-96">Pendaftaran Siswa</Button>

      <p className="text-[#828282] text-center mt-12 text-sm md:text-base">
        © 2023 Letjend Haryono M.T. <span className="ml-2">All rights reserved.</span>
      </p>
    </div>
  );
}

export default Footer;
