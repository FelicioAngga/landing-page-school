import { useState } from "react";
import StudentInformation from "./components/StudentInformation";
import GuardianInformation from "./components/GuardianInformation";
import Document from "./components/Document";
import Payment from "./components/Payment";
import { useQuery } from "@tanstack/react-query";
import { getStudentInformation } from "./services/student-information-service";
import { useAlert } from "../../components/AlertContext";
import { getGuardianInformation } from "./services/guardian-information-service";

export default function () {
  const { showAlert } = useAlert();
  const [selectedTab, setSelectedTab] = useState("Informasi Siswa");
  const { data: studentData } = useQuery({
    queryFn: getStudentInformation,
    queryKey: ["student-information"],
    retryDelay: 1000 * 60 * 0.5,
  });

  const { data: guardianData } = useQuery({
    queryFn: () => getGuardianInformation(studentData?.id),
    queryKey: ["guardian-information", studentData?.id],
    retryDelay: 1000 * 60 * 0.5,
  });

  return (
    <div className="py-5 px-4 md:px-[60px] 2xl:py-7 2xl:px-28">
      <div className="flex flex-wrap gap-2 md:gap-5 justify-center md:justify-start">
        <div
          className={`text-sm md:text-base font-medium md:font-bold basis-[45%] md:basis-auto ${
            selectedTab === "Informasi Siswa" ? "bg-[#1469C2]" : "bg-gray-400"
          } text-white px-0.5 py-3 w-32 md:w-44 text-center rounded-md cursor-pointer hover:opacity-95`}
          onClick={() => setSelectedTab("Informasi Siswa")}
        >
          Informasi Siswa
        </div>
        <div
          className={`text-sm md:text-base font-medium md:font-bold basis-[45%] md:basis-auto ${
            selectedTab === "Informasi Wali" ? "bg-[#1469C2]" : "bg-gray-400"
          } text-white px-0.5 py-3 w-32 md:w-44 text-center rounded-md cursor-pointer hover:opacity-95`}
          onClick={() => studentData?.id ? setSelectedTab("Informasi Wali") : showAlert({ message: "Silahkan lengkapi informasi siswa terlebih dahulu", type: "error" })}
        >
          Informasi Wali
        </div>
        <div
          className={`text-sm md:text-base font-medium md:font-bold basis-[45%] md:basis-auto ${
            selectedTab === "Dokumen" ? "bg-[#1469C2]" : "bg-gray-400"
          } text-white px-0.5 py-3 w-32 md:w-44 text-center rounded-md cursor-pointer hover:opacity-95`}
          onClick={() => guardianData.length > 0 ? setSelectedTab("Dokumen") : showAlert({ message: "Silahkan lengkapi informasi wali terlebih dahulu", type: "error" })}
        >
          Dokumen
        </div>
        <div
          className={`text-sm md:text-base font-medium md:font-bold basis-[45%] md:basis-auto ${
            selectedTab === "Pembayaran" ? "bg-[#1469C2]" : "bg-gray-400"
          } text-white px-0.5 py-3 w-32 md:w-44 text-center rounded-md cursor-pointer hover:opacity-95`}
          onClick={() => setSelectedTab("Pembayaran")}
        >
          Pembayaran
        </div>
      </div>

      {selectedTab === "Informasi Siswa" && (
        <StudentInformation
          studentData={studentData}
          setSelectedTab={setSelectedTab}
        />
      )}
      {selectedTab === "Informasi Wali" && (
        <GuardianInformation
          applicantId={studentData?.id}
          guardianData={guardianData}
          setSelectedTab={setSelectedTab}
        />
      )}
      {selectedTab === "Dokumen" && (
        <Document setSelectedTab={setSelectedTab} />
      )}
      {selectedTab === "Pembayaran" && (
        <Payment setSelectedTab={setSelectedTab} />
      )}
    </div>
  );
}
