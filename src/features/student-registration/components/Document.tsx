import Button from "../../../components/Button";
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import { FiTrash } from "react-icons/fi";
import { IoMdDocument } from "react-icons/io";

type DocumentProps = {
  setSelectedTab: (tab: string) => void;
};

function Document({ setSelectedTab }: DocumentProps) {
  const { Dragger } = Upload;
  const propsFamilyCard: UploadProps = {
    name: 'file',
    multiple: false,
    // action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  const propsBirthCertificate: UploadProps = {
    name: 'file',
    multiple: false,
    // action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  const propsGuardianIdCard: UploadProps = {
    name: 'file',
    multiple: false,
    // action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  function handleNext() {
    setSelectedTab("Pembayaran");
  }

  return (
    <div className="mt-5 md:mt-12">
      <p className="text-2xl md:text-3xl font-bold text-center">Upload Dokumen</p>
      <div className="mt-5 flex flex-col gap-8">
        <div className="border p-4 rounded md:border-none md:p-0">
          <p className="font-medium mb-3">Kartu Keluarga <span className="text-red-500">*</span></p>
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-28">
            <div className="w-[320px]">
              <Dragger {...propsFamilyCard} className="block h-[220px]">
                <IoMdDocument size={48} className="text-gray-500 mx-auto" />
                <p className="mt-4 font-medium">Click to upload or drag your file here</p>
                <p className="font-medium text-sm">
                  Max files size 1MB
                </p>
              </Dragger>
            </div>
            <div className="relative">
              <img className="size-[200px] object-cover rounded-lg" src="images/smile-kid-vector.png" />
              <div className="absolute top-2 right-2 bg-white p-2 rounded-lg cursor-pointer"><FiTrash className="text-red-500" /></div>
              <p className="text-sm mt-1">foto.jpg</p>
            </div>
          </div>
        </div>

        <div className="border p-4 rounded md:border-none md:p-0">
          <p className="font-medium mb-3">Akte Lahir <span className="text-red-500">*</span></p>
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-28">
            <div className="w-[320px]">
              <Dragger {...propsBirthCertificate} className="block h-[220px]">
                <IoMdDocument size={48} className="text-gray-500 mx-auto" />
                <p className="mt-4 font-medium">Click to upload or drag your file here</p>
                <p className="font-medium text-sm">
                  Max files size 1MB
                </p>
              </Dragger>
            </div>
            <div className="relative">
              <img className="size-[200px] object-cover rounded-lg" src="images/smile-kid-vector.png" />
              <div className="absolute top-2 right-2 bg-white p-2 rounded-lg cursor-pointer"><FiTrash className="text-red-500" /></div>
              <p className="text-sm mt-1">foto.jpg</p>
            </div>
          </div>
        </div>

        <div className="border p-4 rounded md:border-none md:p-0">
          <p className="font-medium mb-3">KTP Orang Tua / Wali <span className="text-red-500">*</span></p>
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-28">
            <div className="w-[320px]">
              <Dragger {...propsGuardianIdCard} className="block h-[220px]">
                <IoMdDocument size={48} className="text-gray-500 mx-auto" />
                <p className="mt-4 font-medium">Click to upload or drag your file here</p>
                <p className="font-medium text-sm">
                  Max files size 1MB
                </p>
              </Dragger>
            </div>
            <div className="relative">
              <img className="size-[200px] object-cover rounded-lg" src="images/smile-kid-vector.png" />
              <div className="absolute top-2 right-2 bg-white p-2 rounded-lg cursor-pointer"><FiTrash className="text-red-500" /></div>
              <p className="text-sm mt-1">foto.jpg</p>
            </div>
          </div>
        </div>
      </div>
      <Button className="max-w-md flex justify-center mx-auto font-bold w-full mt-5" onClick={handleNext}>Berikutnya</Button>
    </div>
  );
}

export default Document;
