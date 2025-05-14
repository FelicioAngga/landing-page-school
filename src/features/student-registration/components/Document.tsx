import Button from "../../../components/Button";
import type { UploadProps } from 'antd';
import { Upload } from 'antd';
import { useEffect, useState } from "react";
import { IoMdDocument } from "react-icons/io";
import { useAlert } from "../../../components/AlertContext";
import { fileToBase64 } from "../../../utils/base64";

type DocumentProps = {
  setSelectedTab: (tab: string) => void;
};

function Document({ setSelectedTab }: DocumentProps) {
  const { Dragger } = Upload;
  const { showAlert } = useAlert();
  const [familyCardInfo, setFamilyCardInfo] = useState({
    preview: "",
    name: "",
    file: null,
  });

  const [birthCertificateInfo, setBirthCertificateInfo] = useState({
    preview: "",
    name: "",
    file: null,
  });

  const [guardianIdInfo, setGuardianIdInfo] = useState({
    preview: "",
    name: "",
    file: null,
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
        setFamilyCardInfo({
          preview: previewUrl,
          name: info.file.name,
          file: file as any,
        });
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
        setBirthCertificateInfo({
          preview: previewUrl,
          name: info.file.name,
          file: file as any,
        });
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
        setGuardianIdInfo({
          preview: previewUrl,
          name: info.file.name,
          file: file as any,
        });
      }
    }
  };

  async function handleNext() {
    if (familyCardInfo.file && birthCertificateInfo.file && guardianIdInfo.file) {
      const familyCardBase64 = await fileToBase64(familyCardInfo.file)
      const birthCertificateBase64 = await fileToBase64(birthCertificateInfo.file)
      const guardianIdBase64 = await fileToBase64(guardianIdInfo.file)
      
    }
    // setSelectedTab("Pembayaran");
  }

  useEffect(() => {
  return () => {
    if (familyCardInfo.preview) URL.revokeObjectURL(familyCardInfo.preview);
    if (birthCertificateInfo.preview) URL.revokeObjectURL(birthCertificateInfo.preview);
    if (guardianIdInfo.preview) URL.revokeObjectURL(guardianIdInfo.preview);
  };
}, [familyCardInfo, birthCertificateInfo, guardianIdInfo]);

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
          <p className="font-medium mb-3">Akte Lahir <span className="text-red-500">*</span></p>
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
      </div>
      <Button 
        disabled={familyCardInfo.file === null || birthCertificateInfo.file === null || guardianIdInfo.file === null}
        className="max-w-md flex justify-center mx-auto font-bold w-full mt-5" 
        onClick={handleNext}
      >
        Berikutnya
      </Button>
    </div>
  );
}

export default Document;
