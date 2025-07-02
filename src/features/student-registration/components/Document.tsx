import Button from "../../../components/Button";
import type { UploadProps } from 'antd';
import { Upload } from 'antd';
import { useEffect, useState } from "react";
import { IoMdDocument } from "react-icons/io";
import { useAlert } from "../../../components/AlertContext";
import { fileToBase64 } from "../../../utils/base64";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createDocument, DocsTypeResponse, DocumentType, getDocumentType, updateDocument } from "../services/document-service";
import { StudentInformationType } from "../services/student-information-service";

type DocumentProps = {
  setSelectedTab: (tab: string) => void;
  applicantId?: number;
  documentData?: DocumentType[];
  studentData?: StudentInformationType;
};

function Document({ documentData, applicantId, setSelectedTab, studentData }: DocumentProps) {
  const { Dragger } = Upload;
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();
  const { data: docsType } = useQuery({
    queryFn: () => getDocumentType(),
    queryKey: ["document-type"],
    retryDelay: 1000 * 60 * 0.5,
  });

  const [familyCardInfo, setFamilyCardInfo] = useState({
    id: 0,
    preview: "",
    name: "",
    file: null,
  });

  const [birthCertificateInfo, setBirthCertificateInfo] = useState({
    id: 0,
    preview: "",
    name: "",
    file: null,
  });

  const [guardianIdInfo, setGuardianIdInfo] = useState({
    id: 0,
    preview: "",
    name: "",
    file: null,
  });

  const [educationCertificateInfo, setEducationCertificateInfo] = useState({
    id: 0,
    preview: "",
    name: "",
    file: null,
  });

  const [docsTypeInfo, setDocsTypeInfo] = useState({
    familyCardId: 0,
    birthCertificateId: 0,
    guardianId: 0,
    educationCertificateId: 0,
  });
  
  const propsFamilyCard: UploadProps = {
    name: 'file',
    multiple: false,
    onChange(info) {
      const file = info.file.originFileObj;
      if (file) {
        if (file?.size > 1024 * 1024) {
          showAlert({ message: "File size exceeds 1MB", type: "error" });
          return;
        }
        const previewUrl = URL.createObjectURL(file);
        setFamilyCardInfo(prev => ({
          ...prev,
          preview: previewUrl,
          name: info.file.name,
          file: file as any,
        }));
      }
    }
  };

  const propsBirthCertificate: UploadProps = {
    name: 'file',
    multiple: false,
    onChange(info) {
      const file = info.file.originFileObj;
      if (file) {
        if (file?.size > 1024 * 1024) {
          showAlert({ message: "File size exceeds 1MB", type: "error" });
          return;
        }
        const previewUrl = URL.createObjectURL(file);
        setBirthCertificateInfo(prev => ({
          ...prev,
          preview: previewUrl,
          name: info.file.name,
          file: file as any,
        }));
      }
    }
  };

  const propsGuardianIdCard: UploadProps = {
    name: 'file',
    multiple: false,
    onChange(info) {
      const file = info.file.originFileObj;
      if (file) {
        if (file?.size > 1024 * 1024) {
          showAlert({ message: "File size exceeds 1MB", type: "error" });
          return;
        }
        const previewUrl = URL.createObjectURL(file);
        setGuardianIdInfo(prev => ({
          ...prev,
          preview: previewUrl,
          name: info.file.name,
          file: file as any,
        }));
      }
    }
  };
  
  const propsEducationCertificate: UploadProps = {
    name: 'file',
    multiple: false,
    onChange(info) {
      const file = info.file.originFileObj;
      if (file) {
        if (file?.size > 1024 * 1024) {
          showAlert({ message: "File size exceeds 1MB", type: "error" });
          return;
        }
        const previewUrl = URL.createObjectURL(file);
        setEducationCertificateInfo(prev => ({
          ...prev,
          preview: previewUrl,
          name: info.file.name,
          file: file as any,
        }));
      }
    }
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: DocumentType[]) => {
      const promises = data.map(async (doc) => {
        if (doc.id) await updateDocument(doc);
        else await createDocument(doc);
      });
      await Promise.all(promises);
    },
    onSuccess: () => {
      showAlert({ message: "Dokumen berhasil diupload", type: "success" });
      if (!documentData?.length) setSelectedTab("Pembayaran");
      queryClient.invalidateQueries({ queryKey: ["document-information"] });
      queryClient.invalidateQueries({ queryKey: ["student-information"] });
    },
    onError: (error: any) => {
      showAlert({ message: error.message || "Gagal mengupload dokumen", type: "error" });
    },
  });

  async function handleNext() {
    const documentsToUpload = [];
    if (!applicantId) return;
    if (familyCardInfo.file) {
      const base64 = await fileToBase64(familyCardInfo.file);
      documentsToUpload.push({
        id: familyCardInfo.id,
        type_id: docsTypeInfo.familyCardId,
        applicant_id: applicantId,
        uploaded_file: base64,
        description: familyCardInfo.name,
        name: familyCardInfo.name
      });
    }
    if (birthCertificateInfo.file) {
      const base64 = await fileToBase64(birthCertificateInfo.file);
      documentsToUpload.push({
        id: birthCertificateInfo.id,
        type_id: docsTypeInfo.birthCertificateId,
        applicant_id: applicantId,
        uploaded_file: base64,
        description: birthCertificateInfo.name,
        name: birthCertificateInfo.name,
      });
    }
    if (guardianIdInfo.file) {
      const base64 = await fileToBase64(guardianIdInfo.file);
      documentsToUpload.push({
        id: guardianIdInfo.id,
        type_id: docsTypeInfo.guardianId,
        applicant_id: applicantId,
        uploaded_file: base64,
        description: guardianIdInfo.name,
        name: guardianIdInfo.name
      });
    }
    if (educationCertificateInfo.file) {
      const base64 = await fileToBase64(educationCertificateInfo.file);
      documentsToUpload.push({
        id: educationCertificateInfo.id,
        type_id: docsTypeInfo.educationCertificateId,
        applicant_id: applicantId,
        uploaded_file: base64,
        description: educationCertificateInfo.name,
        name: educationCertificateInfo.name
      });
    }

    if (documentsToUpload.length > 0) await mutateAsync(documentsToUpload);
    else if ((documentData?.length || 0) > 0) setSelectedTab("Pembayaran");
  }

  useEffect(() => {
    if (!docsType) return;

    const getTypeId = (name: string) => docsType.find((doc: DocsTypeResponse) => doc.name.toLowerCase() === name)?.id;

    const typeInfo = {
      familyCardId: getTypeId("kartu keluarga"),
      birthCertificateId: getTypeId("akta kelahiran"),
      guardianId: getTypeId("ktp orang tua"),
      educationCertificateId: getTypeId("ijazah"),
    };
    setDocsTypeInfo(typeInfo);

    if (!documentData?.length) return;
    const familyCard = documentData.find((doc) => doc.type_id === typeInfo.familyCardId);
    const birthCertificate = documentData.find((doc) => doc.type_id === typeInfo.birthCertificateId);
    const guardianId = documentData.find((doc) => doc.type_id === typeInfo.guardianId);
    const educationCertificate = documentData.find((doc) => doc.type_id === typeInfo.educationCertificateId);

    if (familyCard) {
      setFamilyCardInfo({
        id: familyCard.id || 0,
        preview: familyCard.uploaded_file,
        name: familyCard.description,
        file: null,
      });
    }
    if (birthCertificate) {
      setBirthCertificateInfo({
        id: birthCertificate.id || 0,
        preview: birthCertificate.uploaded_file,
        name: birthCertificate.description,
        file: null,
      });
    }
    if (guardianId) {
      setGuardianIdInfo({
        id: guardianId.id || 0,
        preview: guardianId.uploaded_file,
        name: guardianId.description,
        file: null,
      });
    }
    if (educationCertificate) {
      setEducationCertificateInfo({
        id: educationCertificate.id || 0,
        preview: educationCertificate.uploaded_file,
        name: educationCertificate.description,
        file: null,
      });
    }
  }, [documentData, docsType]);

  useEffect(() => {
    return () => {
      if (familyCardInfo.preview) URL.revokeObjectURL(familyCardInfo.preview);
      if (birthCertificateInfo.preview) URL.revokeObjectURL(birthCertificateInfo.preview);
      if (guardianIdInfo.preview) URL.revokeObjectURL(guardianIdInfo.preview);
      if (educationCertificateInfo.preview) URL.revokeObjectURL(educationCertificateInfo.preview);
    };
}, [familyCardInfo, birthCertificateInfo, guardianIdInfo, educationCertificateInfo]);

  return (
    <div className="mt-5 md:mt-12">
      <p className="text-2xl md:text-3xl font-bold text-center">Upload Dokumen</p>
      <div className="mt-5 flex flex-col gap-8">
        <div className="border p-4 rounded md:border-none md:p-0">
          <p className="font-medium mb-3">Kartu Keluarga <span className="text-red-500">*</span></p>
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-28">
            <div className="w-[320px]">
              <Dragger {...propsFamilyCard} accept="image/*" className="block h-[220px]" showUploadList={false} multiple={false} customRequest={() => {}}>
                <IoMdDocument size={48} className="text-gray-500 mx-auto" />
                <p className="mt-4 font-medium">Click to upload or drag your file here</p>
                <p className="font-medium text-sm">
                  Max files size 1MB
                </p>
              </Dragger>
            </div>
            {familyCardInfo.preview && (
              <div className="relative">
                <img className="size-[200px] object-cover rounded-lg" src={familyCardInfo.preview} />
                <p className="text-sm mt-1">{familyCardInfo.name}</p>
              </div>
            )}
          </div>
        </div>

        <div className="border p-4 rounded md:border-none md:p-0">
          <p className="font-medium mb-3">Akta Kelahiran <span className="text-red-500">*</span></p>
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-28">
            <div className="w-[320px]">
              <Dragger {...propsBirthCertificate} accept="image/*" className="block h-[220px]" showUploadList={false} multiple={false} customRequest={() => {}}>
                <IoMdDocument size={48} className="text-gray-500 mx-auto" />
                <p className="mt-4 font-medium">Click to upload or drag your file here</p>
                <p className="font-medium text-sm">
                  Max files size 1MB
                </p>
              </Dragger>
            </div>
            {birthCertificateInfo.preview && (
              <div className="relative">
                <img className="size-[200px] object-cover rounded-lg" src={birthCertificateInfo.preview} />
                <p className="text-sm mt-1">{birthCertificateInfo.name}</p>
              </div>
            )}
          </div>
        </div>

        <div className="border p-4 rounded md:border-none md:p-0">
          <p className="font-medium mb-3">KTP Orang Tua / Wali <span className="text-red-500">*</span></p>
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-28">
            <div className="w-[320px]">
              <Dragger {...propsGuardianIdCard} accept="image/*" className="block h-[220px]" showUploadList={false} multiple={false} customRequest={() => {}}>
                <IoMdDocument size={48} className="text-gray-500 mx-auto" />
                <p className="mt-4 font-medium">Click to upload or drag your file here</p>
                <p className="font-medium text-sm">
                  Max files size 1MB
                </p>
              </Dragger>
            </div>
            {guardianIdInfo.preview && (
              <div className="relative">
                <img className="size-[200px] object-cover rounded-lg" src={guardianIdInfo.preview} />
                <p className="text-sm mt-1">{guardianIdInfo.name}</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="border p-4 rounded md:border-none md:p-0">
          <p className="font-medium mb-3">Ijazah Terakhir {studentData?.level?.name !== "TK" && <span className="text-red-500">*</span>}</p>
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-28">
            <div className="w-[320px]">
              <Dragger {...propsEducationCertificate} accept="image/*" className="block h-[220px]" showUploadList={false} multiple={false} customRequest={() => {}}>
                <IoMdDocument size={48} className="text-gray-500 mx-auto" />
                <p className="mt-4 font-medium">Click to upload or drag your file here</p>
                <p className="font-medium text-sm">
                  Max files size 1MB
                </p>
              </Dragger>
            </div>
            {educationCertificateInfo.preview && (
              <div className="relative">
                <img className="size-[200px] object-cover rounded-lg" src={educationCertificateInfo.preview} />
                <p className="text-sm mt-1">{educationCertificateInfo.name}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Button 
        disabled={
          !familyCardInfo.preview ||
          !birthCertificateInfo.preview ||
          !guardianIdInfo.preview ||
          (!educationCertificateInfo.preview && studentData?.level?.name !== "TK") ||
          isPending
        }
        className="max-w-md flex justify-center mx-auto font-bold w-full mt-5" 
        onClick={handleNext}
      >
        Simpan dan Lanjutkan
      </Button>
    </div>
  );
}

export default Document;
