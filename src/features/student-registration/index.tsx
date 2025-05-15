import { useEffect, useState } from "react";
import StudentInformation from "./components/StudentInformation";
import GuardianInformation from "./components/GuardianInformation";
import Document from "./components/Document";
import Payment from "./components/Payment";
import { useQuery } from "@tanstack/react-query";
import { getStudentInformation } from "./services/student-information-service";
import { useAlert } from "../../components/AlertContext";
import { getGuardianInformation } from "./services/guardian-information-service";
import { DocsTypeResponse, DocumentType, getDocumentInformation, getDocumentType } from "./services/document-service";
import RegistrationComplete from "./components/RegistrationComplete";

export default function () {
  const { showAlert } = useAlert();
  const [isRegistrationComplete, setIsRegistrationComplete] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Informasi Siswa");
  const { data: studentData } = useQuery({
    queryFn: getStudentInformation,
    queryKey: ["student-information"],
    retryDelay: 1000 * 60 * 0.5,
  });

  const { data: docsType } = useQuery({
    queryFn: () => getDocumentType(),
    queryKey: ["document-type"],
    retryDelay: 1000 * 60 * 0.5,
  });

  const { data: guardianData } = useQuery({
    queryFn: () => getGuardianInformation(studentData?.id),
    queryKey: ["guardian-information", studentData?.id],
    retryDelay: 1000 * 60 * 0.5,
  });

  const { data: documentData } = useQuery({
    queryFn: () => getDocumentInformation(studentData?.id),
    queryKey: ["document-information", studentData?.id],
    retryDelay: 1000 * 60 * 0.5,
  });

  useEffect(() => {
    if (!documentData?.length || !docsType?.length) return;
    const docPaymentTypeId = docsType?.find((doc: DocsTypeResponse) => doc.name === "pembayaran")?.id;
    const docPayment = documentData?.find((doc: DocumentType) => doc.type_id === docPaymentTypeId);
    if (docPayment?.id) setIsRegistrationComplete(true);
  }, [documentData, docsType])

  if (isRegistrationComplete) return <RegistrationComplete studentData={studentData} />;
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
          onClick={() => documentData.length > 0 ? setSelectedTab("Pembayaran") : showAlert({ message: "Silahkan lengkapi dokumen terlebih dahulu", type: "error" })}
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
        <Document documentData={documentData} applicantId={studentData?.id} setSelectedTab={setSelectedTab} />
      )}
      {selectedTab === "Pembayaran" && (
        <Payment documentData={documentData} applicant_id={studentData?.id} />
      )}
    </div>
  );
}
