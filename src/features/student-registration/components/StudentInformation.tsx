import { DatePicker, Input, Select } from "antd";
import Button from "../../../components/Button";
import { useEffect, useState } from "react";
import { useAlert } from "../../../components/AlertContext";
import dayjs from "dayjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getGrades, saveStudentInformation, StudentInformationType, updateStudentInformation } from "../services/student-information-service";

type StudentInformationProps = {
  setSelectedTab: (tab: string) => void;
  studentData?: StudentInformationType;
};

function StudentInformation({ studentData, setSelectedTab }: StudentInformationProps) {
  const { showAlert } = useAlert();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: "",
    placeOfBirth: "",
    dateOfBirth: null,
    religion: null,
    siblingsCount: "",
    siblingOrder: "",
    livingWith: null,
    familyStatus: "",
    phoneNumber: "",
    previousSchool: "",
    address: "",
    level_id: null,
    major: null,
    nisn: "",
    identity_no: "",
  });

  const { data: gradeData } = useQuery({
    queryFn: getGrades,
    queryKey: ["grades"]
  })
  
  const { mutateAsync, isPending } = useMutation({
    mutationFn: studentData?.id ? updateStudentInformation : saveStudentInformation,
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["student-information"] });
        setSelectedTab("Informasi Wali");
        window.scrollTo({ top: 0, behavior: "smooth" });
        showAlert({
          message: "Data berhasil disimpan!",
          type: "success",
        });
      }
    },
    onError: (error: Error) => {
      showAlert({ message: error.message || "Gagal Menyimpan", type: "error" });
    },
  })

  function handleNext() {
    if (!isAllFieldsFilled()) {
      showAlert({
        type: "error",
        message: "Semua data harus diisi.",
      })
      return;
    }
    mutateAsync({
      id: studentData?.id,
      full_name: formData.name || "",
      identity_no: formData?.identity_no || "",
      nisn: formData?.nisn || "",
      place_of_birth: formData.placeOfBirth,
      date_of_birth: dayjs(formData.dateOfBirth as any).format("YYYY-MM-DD"),
      address: formData.address,
      phone: formData.phoneNumber,
      religion: formData.religion as any,
      child_sequence: parseInt(formData.siblingOrder.toString()),
      number_of_siblings: parseInt(formData.siblingsCount.toString()),
      level_id: formData.level_id as any,
      living_with: formData.livingWith as any,
      child_status: formData.familyStatus,
      school_origin: formData.previousSchool,
      registration_grade: gradeData?.find(grade => grade.id === formData.level_id)?.name as any,
      registration_major: formData.major as any,
    });
  }

  function isAllFieldsFilled(exceptions: string[] = ["identity_no", "nisn"]) {
    return Object.entries(formData).every(([key, value]) => {
      if (key === "nisn" && formData.level_id !== 1 && !value) return false;
      if (exceptions.includes(key)) return true;
      if (typeof value === "string") return value.trim() !== "";
      return value !== null && value !== undefined;
    });
  }

  useEffect(() => {
  if (studentData) {
    setFormData({
      name: studentData.full_name || "",
      identity_no: studentData.identity_no || "",
      nisn: studentData.nisn || "",
      placeOfBirth: studentData.place_of_birth || "",
      dateOfBirth: studentData.date_of_birth ? dayjs(studentData.date_of_birth) : null as any,
      religion: studentData.religion || null as any,
      siblingsCount: studentData.number_of_siblings || "" as any,
      siblingOrder: studentData.child_sequence || "" as any,
      livingWith: studentData.living_with || null as any,
      familyStatus: studentData.child_status || "",
      phoneNumber: studentData.phone || "",
      previousSchool: studentData.school_origin || "",
      address: studentData.address || "",
      level_id: studentData.level_id || null as any,
      major: studentData.registration_major || null as any,
    });
  }
}, [studentData]);

  return (
    <div className="mt-5 md:mt-12">
      <p className="text-2xl md:text-3xl font-bold text-center">
        Pendaftaran Siswa
      </p>

      <div className="mt-3 md:mt-5 w-fit mx-auto">
        <p className="2xl:text-lg font-bold">Data Siswa</p>
        <div className="mt-3 flex flex-col gap-4 md:w-[600px] px-6 py-4 border rounded-lg">
          <div>
            <p className="text-sm mb-1 font-medium">
              Nama Lengkap <span className="text-red-500">*</span>
            </p>
            <Input
              placeholder="Nama Lengkap"
              className="py-2 text-sm border-gray-400 placeholder:text-[#A5A5A5]"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div>
            <p className="text-sm mb-1 font-medium">
              NIK
            </p>
            <Input
              type="number"
              placeholder="NIK"
              className="py-2 text-sm border-gray-400 placeholder:text-[#A5A5A5]"
              value={formData.identity_no}
              onChange={(e) =>
                setFormData({ ...formData, identity_no: e.target.value })
              }
            />
          </div>
          <div>
            <p className="text-sm mb-1 font-medium">
              NISN {formData.level_id !== 1 && <span className="text-red-500">*</span>}
            </p>
            <Input
              type="number"
              placeholder="NISN"
              className="py-2 text-sm border-gray-400 placeholder:text-[#A5A5A5]"
              value={formData.nisn}
              onChange={(e) =>
                setFormData({ ...formData, nisn: e.target.value })
              }
            />
          </div>
          <div className="flex gap-6">
            <div className="w-full">
              <p className="text-sm mb-1 font-medium">
                Tempat Lahir <span className="text-red-500">*</span>
              </p>
              <Input
                placeholder="Tempat Lahir"
                className="py-2 text-sm border-gray-400 placeholder:text-[#A5A5A5]"
                value={formData.placeOfBirth}
                onChange={(e) =>
                  setFormData({ ...formData, placeOfBirth: e.target.value })
                }
              />
            </div>
            <div className="w-full">
              <p className="text-sm mb-1 font-medium">
                Tanggal Lahir <span className="text-red-500">*</span>
              </p>
              <DatePicker
                className="w-full py-2 text-sm border-gray-400 placeholder:text-[#A5A5A5]"
                placeholder="Tanggal Lahir"
                allowClear={false}
                value={formData.dateOfBirth ? dayjs(formData.dateOfBirth) : null}
                maxDate={dayjs(new Date())}
                onChange={(date) => {
                    setFormData({ ...formData, dateOfBirth: dayjs(date).format("YYYY-MM-DD") as any })
                  }
                }
              />
            </div>
          </div>

          <div>
            <p className="text-sm mb-1 font-medium">
              Agama <span className="text-red-500">*</span>
            </p>
            <Select
              placeholder="Pilih Agama"
              className="w-full h-10 text-sm rounded-md border border-gray-400 placeholder:text-[#A5A5A5]"
              value={formData.religion}
              onChange={(value) => setFormData({ ...formData, religion: value })}
            >
              <Select.Option value="Buddha">Buddha</Select.Option>
              <Select.Option value="Kristen Protestan">
                Kristen Protestan
              </Select.Option>
              <Select.Option value="Islam">Islam</Select.Option>
              <Select.Option value="Hindu">Hindu</Select.Option>
              <Select.Option value="Katolik">Katolik</Select.Option>
              <Select.Option value="Konghucu">Konghucu</Select.Option>
            </Select>
          </div>

          <div className="flex gap-6">
            <div className="w-full">
              <p className="text-sm mb-1 font-medium whitespace-nowrap">
                Jumlah Saudara <span className="text-red-500">*</span>
              </p>
              <Input
                type="number"
                placeholder="Jumlah Saudara"
                className="py-2 text-sm border-gray-400 placeholder:text-[#A5A5A5]"
                value={formData.siblingsCount}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    siblingsCount: e.target.value,
                  })
                }
              />
            </div>

            <div className="w-full">
              <p className="text-sm mb-1 font-medium">
                Saudara Ke <span className="text-red-500">*</span>
              </p>
              <Input
                type="number"
                placeholder="Saudara Ke"
                className="py-2 text-sm border-gray-400 placeholder:text-[#A5A5A5]"
                value={formData.siblingOrder}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    siblingOrder: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div>
            <p className="text-sm mb-1 font-medium">
              Tinggal Bersama <span className="text-red-500">*</span>
            </p>
            <Select
              placeholder="Pilih Dimana Siswa Tinggal"
              className="w-full h-10 text-sm rounded-md border border-gray-400 placeholder:text-[#A5A5A5]"
              value={formData.livingWith}
              onChange={(value) =>
                setFormData({ ...formData, livingWith: value })
              }
            >
              <Select.Option value="parent">Orang Tua</Select.Option>
              <Select.Option value="family">Keluarga</Select.Option>
              <Select.Option value="outsider">Kerabat Jauh</Select.Option>
              <Select.Option value="other">Lainnya</Select.Option>
            </Select>
          </div>

          <div>
            <p className="text-sm mb-1 font-medium">
              Status Diri Dalam Keluarga
              <span className="text-red-500">*</span>
            </p>
            <Input
              placeholder="Status Diri Dalam Keluarga"
              className="py-2 text-sm border-gray-400 placeholder:text-[#A5A5A5]"
              value={formData.familyStatus}
              onChange={(e) =>
                setFormData({ ...formData, familyStatus: e.target.value })
              }
            />
          </div>

          <div>
            <p className="text-sm mb-1 font-medium">
              No Telepon <span className="text-red-500">*</span>
            </p>
            <Input
              type="number"
              placeholder="No Telepon"
              className="py-2 text-sm border-gray-400 placeholder:text-[#A5A5A5]"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phoneNumber: e.target.value,
                })
              }
            />
          </div>

          <div>
            <p className="text-sm mb-1 font-medium">
              Pindahan dari Sekolah <span className="text-red-500">*</span>
            </p>
            <Input
              placeholder="Pindahan dari Sekolah"
              className="py-2 text-sm border-gray-400 placeholder:text-[#A5A5A5]"
              value={formData.previousSchool}
              onChange={(e) =>
                setFormData({ ...formData, previousSchool: e.target.value })
              }
            />
          </div>

          <div>
            <p className="text-sm mb-1 font-medium">
              Alamat Siswa <span className="text-red-500">*</span>
            </p>
            <Input
              placeholder="Alamat Siswa"
              className="py-2 text-sm border-gray-400 placeholder:text-[#A5A5A5]"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </div>

          <div>
            <p className="text-sm mb-1 font-medium">
              Jenjang Pendidikan yang Diinginkan{" "}
              <span className="text-red-500">*</span>
            </p>
            <Select
              placeholder="Pilih Jenjang"
              className="w-full h-10 text-sm rounded-md border border-gray-400 placeholder:text-[#A5A5A5]"
              value={formData.level_id}
              onChange={(value) =>
                setFormData({ ...formData, major: null, level_id: value })
              }
            >
              {gradeData?.map((grade: any) => (
                <Select.Option key={grade.id} value={grade.id}>
                  {grade.name}
                </Select.Option>
              ))}
            </Select>
          </div>

          <div>
            <p className="text-sm mb-1 font-medium">
              Jurusan <span className="text-red-500">*</span>
            </p>
            <Select
              placeholder="Pilih Jurusan"
              className="w-full h-10 text-sm rounded-md border border-gray-400 placeholder:text-[#A5A5A5]"
              value={formData.major}
              onChange={(value) => setFormData({ ...formData, major: value })}
            >
              <Select.Option value="General">General</Select.Option>
              {formData.level_id === 4 && (
                <>
                  <Select.Option value="MIPA">MIPA</Select.Option>
                  <Select.Option value="IPS">IPS</Select.Option>
                </>
              )}
            </Select>
          </div>
        </div>

        <Button 
          className="font-bold w-full mt-5" 
          onClick={handleNext}
          disabled={!isAllFieldsFilled() || isPending} 
        >
          Berikutnya
        </Button>
      </div>
    </div>
  );
}

export default StudentInformation;
