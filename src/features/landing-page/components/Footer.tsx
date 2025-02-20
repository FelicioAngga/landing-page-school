import Button from "../../../components/Button";

function Footer() {
  return (
    <div className="mt-20 py-16 bg-[#EAF4FF]">
      <p className="text-4xl font-black text-center">Ayo Segera Daftarkan Anak Anda</p>
      <Button className="mt-12 flex justify-center mx-auto px-10 w-96">Pendaftaran Siswa</Button>

      <p className="text-[#828282] text-center mt-12">
        © 2023 Letjend Haryono M.T. <span className="ml-2">All rights reserved.</span>
      </p>
    </div>
  );
}

export default Footer;
