import { useState } from "react";
import StudentInformation from "./components/StudentInformation";
import GuardianInformation from "./components/GuardianInformation";

export default function () {
  const [selectedTab, setSelectedTab] = useState("Informasi Siswa");

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
          onClick={() => setSelectedTab("Informasi Wali")}
        >
          Informasi Wali
        </div>
        <div
          className={`text-sm md:text-base font-medium md:font-bold basis-[45%] md:basis-auto ${
            selectedTab === "Dokumen" ? "bg-[#1469C2]" : "bg-gray-400"
          } text-white px-0.5 py-3 w-32 md:w-44 text-center rounded-md cursor-pointer hover:opacity-95`}
          onClick={() => setSelectedTab("Dokumen")}
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

      {selectedTab === "Informasi Siswa" && <StudentInformation setSelectedTab={setSelectedTab} />}
      {selectedTab === "Informasi Wali" && <GuardianInformation setSelectedTab={setSelectedTab} />}
    </div>
  );
}
