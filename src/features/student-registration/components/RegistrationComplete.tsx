import { BsMailbox2 } from "react-icons/bs";
import Button from "../../../components/Button";
import { StudentInformationType } from "../services/student-information-service";
import { useNavigate } from "react-router-dom";

function RegistrationComplete({
  studentData,
}: {
  studentData?: StudentInformationType;
}) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-5 justify-center items-center py-5 px-4 md:px-[60px] 2xl:py-7 2xl:px-28 min-h-[80vh]">
      <BsMailbox2 className="mx-auto lg:text-7xl 2xl:text-8xl" />
      <p className="text-center lg:text-4xl 2xl:text-5xl font-bold text-[#4757C0]">
        Pendaftaran Siswa Berhasil
      </p>
      <div className="flex gap-2 items-center">
        <p className="text-center font-medium text-lg">Status pendaftaran saat ini:</p>
        <div className={`font-medium text-base px-3 py-1 rounded-md text-white ${studentData?.state === "draft" ? "bg-[#FFA726]" : "bg-[#28C76F]"}`}>
          {studentData?.state === "draft" ? "Sedang Diproses" : "Disetujui"}
        </div>
      </div>
      <Button onClick={() => navigate("/")} className="mt-3 lg:px-20">Kembali ke beranda</Button>
    </div>
  );
}

export default RegistrationComplete;
