import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import Button from "../../../components/Button";
import { IoMdDocument } from 'react-icons/io';
import { FiTrash } from 'react-icons/fi';

type PaymentProps = {
  setSelectedTab: (tab: string) => void;
};

function Payment({ setSelectedTab }: PaymentProps) {
  const { Dragger } = Upload;
  const props: UploadProps = {
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
    setSelectedTab("");
  }
  
  return (
    <div className="mt-5 md:mt-12">
      <p className="text-2xl md:text-3xl font-bold text-center">Pembayaran</p>
      <div className="my-8">
        <table className="font-medium text-[13px] md:text-base">
          <tbody>

            <tr className="border border-gray-400 sm:border-none">
              <td>Uang Pembangunan</td>
              <td className="py-1 px-0.5 md:px-4">:</td>
              <td className="whitespace-nowrap">Rp. {(2000000).toLocaleString()}</td>
            </tr>
            <tr className="border border-gray-400 sm:border-none">
              <td>Uang Sekolah TK A/B</td>
              <td className="py-1 px-0.5 md:px-4">:</td>
              <td className="whitespace-nowrap">Rp. {(305000).toLocaleString()}</td>
            </tr>
            <tr className="border border-gray-400 sm:border-none">
              <td>Uang Sekolah SD Kelas I Sampai Kelas V</td>
              <td className="py-1 px-0.5 md:px-4">:</td>
              <td className="whitespace-nowrap">Rp. {(285000).toLocaleString()}</td>
            </tr>
            <tr className="border border-gray-400 sm:border-none">
              <td>Uang Sekolah SD Kelas VI</td>
              <td className="py-1 px-0.5 md:px-4">:</td>
              <td className="whitespace-nowrap">Rp. {(295000).toLocaleString()}</td>
            </tr>
            <tr className="border border-gray-400 sm:border-none">
              <td>Uang Sekolah SMP Kelas I Sampai Kelas II</td>
              <td className="py-1 px-0.5 md:px-4">:</td>
              <td className="whitespace-nowrap">Rp. {(335000).toLocaleString()}</td>
            </tr>
            <tr className="border border-gray-400 sm:border-none">
              <td>Uang Sekolah SMP Kelas III</td>
              <td className="py-1 px-0.5 md:px-4">:</td>
              <td className="whitespace-nowrap">Rp. {(345000).toLocaleString()}</td>
            </tr>
            <tr className="border border-gray-400 sm:border-none">
              <td>Uang Sekolah SMA Kelas I Sampai Kelas II</td>
              <td className="py-1 px-0.5 md:px-4">:</td>
              <td className="whitespace-nowrap">Rp. {(345000).toLocaleString()}</td>
            </tr>
            <tr className="border border-gray-400 sm:border-none">
              <td>Uang Sekolah SMA Kelas III</td>
              <td className="py-1 px-0.5 md:px-4">:</td>
              <td className="whitespace-nowrap">Rp. {(355000).toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="border p-4 rounded md:border-none md:p-0">
        <p className="font-medium mb-3">Bukti Pembayaran <span className="text-red-500">*</span></p>
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-28">
          <div className="w-[320px]">
            <Dragger {...props} className="block h-[220px]">
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
      <Button className="max-w-md flex justify-center mx-auto font-bold w-full mt-5" onClick={handleNext}>Simpan</Button>
    </div>
  )
}

export default Payment;
