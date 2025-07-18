import type { UploadProps } from 'antd';
import { Upload } from 'antd';
import Button from "../../../components/Button";
import { IoMdDocument } from 'react-icons/io';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { useAlert } from '../../../components/AlertContext';
import { createDocument, DocsTypeResponse, DocumentType, getDocumentType, updateDocument } from '../services/document-service';
import { useEffect, useState } from 'react';
import { fileToBase64 } from '../../../utils/base64';
import { StudentInformationType } from '../services/student-information-service';

type PaymentProps = {
  applicant_id: number | undefined;
  documentData?: DocumentType[];
  studentData?: StudentInformationType;
};

function Payment({ documentData, applicant_id, studentData }: PaymentProps) {
  const { Dragger } = Upload;
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();

  const { data: docsType } = useQuery({
    queryFn: () => getDocumentType(),
    queryKey: ["document-type"],
    retryDelay: 1000 * 60 * 0.5,
  });

  const [isRegistrationComplete, setIsRegistrationComplete] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState({
    id: 0,
    preview: "",
    name: "",
    file: null,
  });

  const props: UploadProps = {
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
        setPaymentInfo(prev => ({
          ...prev,
          preview: previewUrl,
          name: info.file.name,
          file: file as any,
        }));
      }
    }
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: documentData?.find(doc => doc.type_id === 
      docsType?.find((docType: any) => docType.name.toLowerCase() === "bukti pembayaran")?.id) ? updateDocument : createDocument,
    onSuccess: () => {
      showAlert({ message: "Bukti pembayaran berhasil diupload", type: "success" });
      queryClient.invalidateQueries({
        queryKey: ["document-information"],
      });
      queryClient.invalidateQueries({ queryKey: ["student-information"] });
    },
    onError: (error: any) => {
      showAlert({ message: error.message || "Gagal mengupload bukti pembayaran", type: "error" });
    },
  });
  
  async function handleNext() {
    if (!paymentInfo.file || !applicant_id) return;
    const base64 = await fileToBase64(paymentInfo.file);
    const docPaymentTypeId = docsType?.find((doc: DocsTypeResponse) => doc.name.toLowerCase() === "bukti pembayaran")?.id;
    const docPayment = documentData?.find((doc: DocumentType) => doc.type_id === docPaymentTypeId);
    mutateAsync({
      id: docPayment?.id,
      type_id: docPaymentTypeId,
      applicant_id,
      uploaded_file: base64,
      description: paymentInfo.name,
      name: paymentInfo.name,
    });
  }

  useEffect(() => {
    if (!documentData?.length || !docsType) return;
    const docPaymentTypeId = docsType?.find((doc: DocsTypeResponse) => doc.name.toLowerCase() === "bukti pembayaran")?.id;
    const docPayment = documentData?.find((doc: DocumentType) => doc.type_id === docPaymentTypeId);
    if (docPayment?.id) setIsRegistrationComplete(true);
    setPaymentInfo({
      id: docPayment?.id || 0,
      preview: docPayment?.uploaded_file || "",
      name: docPayment?.description || "",
      file: null,
    })
  }, [documentData, docsType]);

  useEffect(() => {
    if (paymentInfo.preview) return () => URL.revokeObjectURL(paymentInfo.preview);
  }, [paymentInfo])
  
  if (studentData?.state === "draft" && studentData?.documents?.length > 0) return (
    <div>
      <p className="mt-5 text-2xl md:text-3xl font-bold text-center">Pendaftaran Siswa</p>
      <div className="mt-8">
        <p className="text-center text-lg">Pendaftaran anda masih dalam proses verifikasi, silahkan tunggu 1x24 jam hingga data anda disetujui.</p>
        <div className="text-center text-lg">Setelah data diverifikasi anda dapat melakukan pembayaran</div>
      </div>
    </div>
  )

  if (studentData?.state === "rejected" && !isRegistrationComplete) return (
    <div>
      <p className="mt-5 text-2xl md:text-3xl font-bold text-center">Pendaftaran Siswa</p>
      <div className="mt-8">
        <p className="text-center text-lg">Pendaftaran anda ditolak, silahkan perbaiki data anda.</p>
        <div className="text-center text-lg">Setelah data diperbaiki, silahkan tunggu 1x24 jam hingga data anda disetujui.</div>
      </div>
    </div>
  )
  
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
            {studentData?.level?.name === "TK" && (
              <tr className="border border-gray-400 sm:border-none">
                <td>Uang Sekolah TK A/B</td>
                <td className="py-1 px-0.5 md:px-4">:</td>
                <td className="whitespace-nowrap">Rp. {(305000).toLocaleString()}</td>
              </tr>
            )}
            {studentData?.level?.name === "SD" && (
              <>
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
              </>
            )}
            {studentData?.level?.name === "SMP" && (
              <>
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
              </>
            )}
            {studentData?.level?.name === "SMA" && (
              <>
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
              </>
            )}
          </tbody>
        </table>
      </div>
      <div className="border p-4 rounded md:border-none md:p-0">
        <p className="font-medium mb-3">Bukti Pembayaran <span className="text-red-500">*</span></p>
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-28">
          <div className="w-[320px]">
            <Dragger {...props} accept="image/*" className="block h-[220px]" showUploadList={false} multiple={false} customRequest={() => {}}>
              <IoMdDocument size={48} className="text-gray-500 mx-auto" />
              <p className="mt-4 font-medium">Click to upload or drag your file here</p>
              <p className="font-medium text-sm">
                Max files size 1MB
              </p>
            </Dragger>
          </div>
          {paymentInfo.preview && (
            <div className="relative">
              <img className="size-[200px] object-cover rounded-lg" src={paymentInfo.preview} />
              <p className="text-sm mt-1">{paymentInfo.name}</p>
            </div>
          )}
        </div>
      </div>
      <Button 
        className="max-w-md flex justify-center mx-auto font-bold w-full mt-5" 
        disabled={!paymentInfo.preview || isPending} 
        onClick={handleNext}
        >
          Simpan
      </Button>
    </div>
  )
}

export default Payment;
