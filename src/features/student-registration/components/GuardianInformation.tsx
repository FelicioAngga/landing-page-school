import { DatePicker, Input, Radio, Select } from 'antd';
import Button from '../../../components/Button';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GuardianInformationType, saveGuardianInformation, updateGuardianInformation } from '../services/guardian-information-service';
import { useAlert } from '../../../components/AlertContext';

type GuardianInformationProps = {
  applicantId?: number;
  guardianData?: GuardianInformationType[];
  setSelectedTab: (tab: string) => void;
}

function GuardianInformation({ guardianData, applicantId, setSelectedTab }: GuardianInformationProps) {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();
  const emptyParent = {
    name: "",
    religion: null,
    place_of_birth: "",
    date_of_birth: null,
    highest_education: "",
    address: "",
    job: "",
    phone: ""
  }
  type ParentType = 'father' | 'mother' | 'guardian';
  const [guardianRadio, setGuardianRadio] = useState<"father" | "mother" | "guardian">("guardian");
  const [parents, setParents] = useState<Record<ParentType, typeof emptyParent>>({
    father: { ...emptyParent },
    mother: { ...emptyParent },
    guardian: { ...emptyParent }
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (guardianData?.length || 0) > 0 ? updateGuardianInformation : saveGuardianInformation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guardian-information"] });
      queryClient.invalidateQueries({ queryKey: ["student-information"] });
      if (!((guardianData?.length || 0) > 0)) setSelectedTab("Dokumen");
      window.scrollTo({ top: 0, behavior: "smooth" });
      showAlert({
        message: "Data berhasil disimpan!",
        type: "success",
      });
    },
    onError: (error) => {
      showAlert({ message: error.message || "Gagal Menyimpan", type: "error" });
    }
  });

  function handleNext() {
    if (!applicantId) {
      showAlert({ message: "Silahkan lengkapi informasi siswa terlebih dahulu", type: "error" });
      return;
    }
    const dataToSave: GuardianInformationType[] = [];
    dataToSave.push({
      ...parents.father,
      id: guardianData?.find((guardian) => guardian.relation === "father")?.id,
      religion: parents.father.religion || "",
      date_of_birth: dayjs(parents.father.date_of_birth as any).format("YYYY-MM-DD"),
      relation: "father",
      applicant_id: applicantId,
    });
    dataToSave.push({
      ...parents.mother,
      id: guardianData?.find((guardian) => guardian.relation === "mother")?.id,
      religion: parents.mother.religion || "",
      date_of_birth: dayjs(parents.mother.date_of_birth as any).format("YYYY-MM-DD"),
      relation: "mother",
      applicant_id: applicantId,
    });
    dataToSave.push({
      ...parents.guardian,
      id: guardianData?.find((guardian) => guardian.relation === "guardian")?.id,
      religion: parents.guardian.religion || "",
      date_of_birth: dayjs(parents.guardian.date_of_birth as any).format("YYYY-MM-DD"),
      relation: "guardian",
      applicant_id: applicantId,
    });

    mutateAsync(dataToSave);
  }

  useEffect(() => {
    if (!guardianData) return;

    const updated = { father: {...emptyParent}, mother: {...emptyParent}, guardian: {...emptyParent} };
    guardianData.forEach((guardian) => {
      const { relation } = guardian;
      if (relation === "father" || relation === "mother" || relation === "guardian") {
        updated[relation] = {
          name: guardian.name || "",
          religion: guardian.religion || null as any,
          place_of_birth: guardian.place_of_birth || "",
          date_of_birth: guardian.date_of_birth || null as any,
          highest_education: guardian.highest_education || "",
          address: guardian.address || "",
          job: guardian.job || "",
          phone: guardian.phone || "",
        };
      }
    });
    setParents(updated);
  }, [guardianData]);

  function isAllFieldsFilled(exceptions: string[] = ["job"]) {
    return Object.values(parents).every((parent) => {
      return Object.entries(parent).every(([key, value]) => {
        if (exceptions.includes(key)) return true;
        if (typeof value === "string") {
          return value.trim() !== "";
        }
        return value !== null && value !== undefined;
      });
    });
  }

  useEffect(() => {
    if (guardianRadio === "father") {
      setParents((prev) => ({
        ...prev,
        guardian: { ...prev.father },
      }));
    } else if (guardianRadio === "mother") {
      setParents((prev) => ({
        ...prev,
        guardian: { ...prev.mother },
      }));
    }
  }, [parents.father, parents.mother])

  return (
    <div className="mt-5 md:mt-12">
      <p className="text-2xl md:text-3xl font-bold text-center">
        Pendaftaran Siswa
      </p>

      <div className="mt-3 md:mt-5 w-fit mx-auto">
        <div className="flex flex-wrap gap-4 2xl:gap-20 justify-center lg:justify-between">
          <div>
            <p className="2xl:text-lg font-bold">Data Ayah Siswa</p>
            <div className="mt-3 flex flex-col gap-4 md:w-[400px] lg:w-[420px] xl:w-[500px] 2xl:w-[600px] px-6 py-4 border rounded-lg">
              <div>
                <p className="text-sm mb-1 font-medium">Nama Ayah <span className="text-red-500">*</span></p>
                <Input
                  placeholder="Nama Ayah"
                  className="py-2 text-sm border-gray-400 placeholder:text-[#A5A5A5]"
                  value={parents.father.name}
                  onChange={(e) => setParents({ ...parents, father: { ...parents.father, name: e.target.value } })}
                />
              </div>

              <div>
                <p className="text-sm mb-1 font-medium">Agama <span className="text-red-500">*</span></p>
                <Select
                  placeholder="Pilih Agama"
                  className="w-full h-10 text-sm rounded-md border border-gray-400 placeholder:text-[#A5A5A5]"
                  value={parents.father.religion}
                  onChange={(value) => setParents({ ...parents, father: { ...parents.father, religion: value } })}
                >
                  <Select.Option value="Buddha">Buddha</Select.Option>
                  <Select.Option value="Kriten Protestan">
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
                  <p className="text-sm mb-1 font-medium">Tempat Lahir <span className="text-red-500">*</span></p>
                  <Input
                    placeholder="Tempat Lahir"
                    className="py-2 text-sm border-gray-400 placeholder:text-[#A5A5A5]"
                    value={parents.father.place_of_birth}
                    onChange={(e) => setParents({ ...parents, father: { ...parents.father, place_of_birth: e.target.value } })}
                  />
                </div>
                <div className="w-full">
                  <p className="text-sm mb-1 font-medium">Tanggal Lahir <span className="text-red-500">*</span></p>
                  <DatePicker 
                    maxDate={dayjs(new Date())}
                    className="w-full py-2 text-sm border-gray-400 placeholder:text-[#A5A5A5]" 
                    value={parents.father.date_of_birth ? dayjs(parents.father.date_of_birth) : null}
                    onChange={(date) => setParents({ ...parents, father: { ...parents.father, date_of_birth: dayjs(date).format("YYYY-MM-DD") as any } })}
                  />
                </div>
              </div>

              <div>
                <p className="text-sm mb-1 font-medium">Pendidikan Tertinggi <span className="text-red-500">*</span></p>
                <Select
                  className="w-full h-10 text-sm rounded-md border border-gray-400 placeholder:text-[#A5A5A5]"
                  placeholder="Pilih Pendidikan Tertinggi"
                  value={parents.father.highest_education || null}
                  onChange={(value) =>
                    setParents({ ...parents, father: { ...parents.father, highest_education: value } })
                  }
                >
                  <Select.Option value="Tidak Sekolah">Tidak Sekolah</Select.Option>
                  <Select.Option value="TK">TK</Select.Option>
                  <Select.Option value="SD">SD</Select.Option>
                  <Select.Option value="SMP">SMP</Select.Option>
                  <Select.Option value="SMA">SMA</Select.Option>
                  <Select.Option value="S1">S1</Select.Option>
                  <Select.Option value="S2">S2</Select.Option>
                  <Select.Option value="S3">S3</Select.Option>
                </Select>
              </div>

              <div>
                <p className="text-sm mb-1 font-medium">Alamat <span className="text-red-500">*</span></p>
                <Input
                  placeholder="Alamat"
                  className="py-2 text-sm border-gray-400 placeholder:text-[#A5A5A5]"
                  value={parents.father.address}
                  onChange={(e) => setParents({ ...parents, father: { ...parents.father, address: e.target.value } })}
                />
              </div>

              <div>
                <p className="text-sm mb-1 font-medium">Pekerjaan</p>
                <Input
                  placeholder="Pekerjaan"
                  className="py-2 text-sm border-gray-400 placeholder:text-[#A5A5A5]"
                  value={parents.father.job}
                  onChange={(e) => setParents({ ...parents, father: { ...parents.father, job: e.target.value } })}
                />
              </div>

              <div>
                <p className="text-sm mb-1 font-medium">No Telepon <span className="text-red-500">*</span></p>
                <Input
                  type='number'
                  placeholder="No Telepon"
                  className="py-2 text-sm border-gray-400 placeholder:text-[#A5A5A5]"
                  value={parents.father.phone}
                  onChange={(e) => setParents({ ...parents, father: { ...parents.father, phone: e.target.value } })}
                />
              </div>
            </div>
          </div>

          <div className='mt-8 lg:mt-0'>
            <p className="2xl:text-lg font-bold">Data Ibu Siswa</p>
            <div className="mt-3 flex flex-col gap-4 md:w-[400px] lg:w-[420px] xl:w-[500px] 2xl:w-[600px] px-6 py-4 border rounded-lg">
              <div>
                <p className="text-sm mb-1 font-medium">Nama Ibu <span className="text-red-500">*</span></p>
                <Input
                  placeholder="Nama Ayah"
                  className="py-2 text-sm border-gray-400 placeholder:text-[#A5A5A5]"
                  value={parents.mother.name}
                  onChange={(e) => setParents({ ...parents, mother: { ...parents.mother, name: e.target.value } })}
                />
              </div>

              <div>
                <p className="text-sm mb-1 font-medium">Agama <span className="text-red-500">*</span></p>
                <Select
                  placeholder="Pilih Agama"
                  className="w-full h-10 text-sm rounded-md border border-gray-400 placeholder:text-[#A5A5A5]"
                  value={parents.mother.religion}
                  onChange={(value) => setParents({ ...parents, mother: { ...parents.mother, religion: value } })}
                >
                  <Select.Option value="Buddha">Buddha</Select.Option>
                  <Select.Option value="Kriten Protestan">
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
                  <p className="text-sm mb-1 font-medium">Tempat Lahir <span className="text-red-500">*</span></p>
                  <Input
                    placeholder="Tempat Lahir"
                    className="py-2 text-sm border-gray-400 placeholder:text-[#A5A5A5]"
                    value={parents.mother.place_of_birth}
                    onChange={(e) => setParents({ ...parents, mother: { ...parents.mother, place_of_birth: e.target.value } })}
                  />
                </div>
                <div className="w-full">
                  <p className="text-sm mb-1 font-medium">Tanggal Lahir <span className="text-red-500">*</span></p>
                  <DatePicker 
                    maxDate={dayjs(new Date())}
                    className="w-full py-2 text-sm border-gray-400 placeholder:text-[#A5A5A5]" 
                    value={parents.mother.date_of_birth ? dayjs(parents.mother.date_of_birth) : null}
                    onChange={(date) => setParents({ ...parents, mother: { ...parents.mother, date_of_birth: dayjs(date).format("YYYY-MM-DD") as any } })}
                  />
                </div>
              </div>

              <div>
                <p className="text-sm mb-1 font-medium">Pendidikan Tertinggi <span className="text-red-500">*</span></p>
                <Select
                  className="w-full h-10 text-sm rounded-md border border-gray-400 placeholder:text-[#A5A5A5]"
                  placeholder="Pilih Pendidikan Tertinggi"
                  value={parents.mother.highest_education || null}
                  onChange={(value) =>
                    setParents({ ...parents, mother: { ...parents.mother, highest_education: value } })
                  }
                >
                  <Select.Option value="Tidak Sekolah">Tidak Sekolah</Select.Option>
                  <Select.Option value="TK">TK</Select.Option>
                  <Select.Option value="SD">SD</Select.Option>
                  <Select.Option value="SMP">SMP</Select.Option>
                  <Select.Option value="SMA">SMA</Select.Option>
                  <Select.Option value="S1">S1</Select.Option>
                  <Select.Option value="S2">S2</Select.Option>
                  <Select.Option value="S3">S3</Select.Option>
                </Select>
              </div>

              <div>
                <p className="text-sm mb-1 font-medium">Alamat <span className="text-red-500">*</span></p>
                <Input
                  placeholder="Alamat"
                  className="py-2 text-sm border-gray-400 placeholder:text-[#A5A5A5]"
                  value={parents.mother.address}
                  onChange={(e) => setParents({ ...parents, mother: { ...parents.mother, address: e.target.value } })}
                />
              </div>

              <div>
                <p className="text-sm mb-1 font-medium">Pekerjaan</p>
                <Input
                  placeholder="Pekerjaan"
                  className="py-2 text-sm border-gray-400 placeholder:text-[#A5A5A5]"
                  value={parents.mother.job}
                  onChange={(e) => setParents({ ...parents, mother: { ...parents.mother, job: e.target.value } })}
                />
              </div>

              <div>
                <p className="text-sm mb-1 font-medium">No Telepon <span className="text-red-500">*</span></p>
                <Input
                  type='number'
                  placeholder="No Telepon"
                  className="py-2 text-sm border-gray-400 placeholder:text-[#A5A5A5]"
                  value={parents.mother.phone}
                  onChange={(e) => setParents({ ...parents, mother: { ...parents.mother, phone: e.target.value } })}
                />
              </div>
            </div>
          </div>
        </div>

        <div className='mt-8 mx-auto w-fit lg:mx-0'>
          <p className="2xl:text-lg font-bold">Data Wali Siswa</p>
          <Radio.Group
            className="mt-2"
            options={[
              { label: "Samakan dengan Ayah", value: "father" },
              { label: "Samakan dengan Ibu", value: "mother" },
              { label: "Isi Data Wali", value: "guardian" },
            ]}
            value={guardianRadio}
            onChange={(e) => {
              setGuardianRadio(e.target.value as "father" | "mother" | "guardian");
              if (e.target.value === "father") {
                setParents({ ...parents, guardian: { ...parents.father } });
              } else if (e.target.value === "mother") {
                setParents({ ...parents, guardian: { ...parents.mother } });
              } else {
                setParents({ ...parents, guardian: { ...emptyParent } });
              }
            }}
          />
          <div className="mt-3 flex flex-col gap-4 md:w-[400px] lg:w-[420px] xl:w-[500px] 2xl:w-[600px] px-6 py-4 border rounded-lg">
            <div>
              <p className="text-sm mb-1 font-medium">Nama Wali <span className="text-red-500">*</span></p>
              <Input
                placeholder="Nama Wali"
                className="py-2 text-sm border-gray-400 placeholder:text-[#A5A5A5]"
                value={parents.guardian.name}
                onChange={(e) => setParents({ ...parents, guardian: { ...parents.guardian, name: e.target.value } })}
                disabled={guardianRadio !== "guardian"}
              />
            </div>

            <div>
              <p className="text-sm mb-1 font-medium">Agama <span className="text-red-500">*</span></p>
              <Select
                placeholder="Pilih Agama"
                className="w-full h-10 text-sm rounded-md border border-gray-400 placeholder:text-[#A5A5A5]"
                value={parents.guardian.religion}
                onChange={(value) => setParents({ ...parents, guardian: { ...parents.guardian, religion: value } })}
                disabled={guardianRadio !== "guardian"}
              >
                <Select.Option value="Buddha">Buddha</Select.Option>
                <Select.Option value="Kriten Protestan">
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
                <p className="text-sm mb-1 font-medium">Tempat Lahir <span className="text-red-500">*</span></p>
                <Input
                  placeholder="Tempat Lahir"
                  className="py-2 text-sm border-gray-400 placeholder:text-[#A5A5A5]"
                  value={parents.guardian.place_of_birth}
                  onChange={(e) => setParents({ ...parents, guardian: { ...parents.guardian, place_of_birth: e.target.value } })}
                  disabled={guardianRadio !== "guardian"}
                />
              </div>
              <div className="w-full">
                <p className="text-sm mb-1 font-medium">Tanggal Lahir <span className="text-red-500">*</span></p>
                <DatePicker 
                  maxDate={dayjs(new Date())}
                  className="w-full py-2 text-sm border-gray-400 placeholder:text-[#A5A5A5]" 
                  value={parents.guardian.date_of_birth ? dayjs(parents.guardian.date_of_birth) : null}
                  onChange={(date) => setParents({ ...parents, guardian: { ...parents.guardian, date_of_birth: dayjs(date).format("YYYY-MM-DD") as any } })}
                  disabled={guardianRadio !== "guardian"}
                />
              </div>
            </div>

            <div>
              <p className="text-sm mb-1 font-medium">Pendidikan Tertinggi <span className="text-red-500">*</span></p>
              <Select
                className="w-full h-10 text-sm rounded-md border border-gray-400 placeholder:text-[#A5A5A5]"
                placeholder="Pilih Pendidikan Tertinggi"
                value={parents.guardian.highest_education || null}
                onChange={(value) =>
                  setParents({ ...parents, guardian: { ...parents.guardian, highest_education: value } })
                }
                disabled={guardianRadio !== "guardian"}
              >
                <Select.Option value="Tidak Sekolah">Tidak Sekolah</Select.Option>
                <Select.Option value="TK">TK</Select.Option>
                <Select.Option value="SD">SD</Select.Option>
                <Select.Option value="SMP">SMP</Select.Option>
                <Select.Option value="SMA">SMA</Select.Option>
                <Select.Option value="S1">S1</Select.Option>
                <Select.Option value="S2">S2</Select.Option>
                <Select.Option value="S3">S3</Select.Option>
              </Select>
            </div>

            <div>
              <p className="text-sm mb-1 font-medium">Alamat <span className="text-red-500">*</span></p>
              <Input
                placeholder="Alamat"
                className="py-2 text-sm border-gray-400 placeholder:text-[#A5A5A5]"
                value={parents.guardian.address}
                onChange={(e) => setParents({ ...parents, guardian: { ...parents.guardian, address: e.target.value } })}
                disabled={guardianRadio !== "guardian"}
              />
            </div>

            <div>
              <p className="text-sm mb-1 font-medium">Pekerjaan</p>
              <Input
                placeholder="Pekerjaan"
                className="py-2 text-sm border-gray-400 placeholder:text-[#A5A5A5]"
                value={parents.guardian.job}
                onChange={(e) => setParents({ ...parents, guardian: { ...parents.guardian, job: e.target.value } })}
                disabled={guardianRadio !== "guardian"}
              />
            </div>

            <div>
              <p className="text-sm mb-1 font-medium">No Telepon <span className="text-red-500">*</span></p>
              <Input
                type='number'
                placeholder="No Telepon"
                className="py-2 text-sm border-gray-400 placeholder:text-[#A5A5A5]"
                value={parents.guardian.phone}
                onChange={(e) => setParents({ ...parents, guardian: { ...parents.guardian, phone: e.target.value } })}
                disabled={guardianRadio !== "guardian"}
              />
            </div>
          </div>
        </div>
      </div>
      <Button 
        className="max-w-md flex justify-center mx-auto font-bold w-full mt-5" 
        onClick={handleNext}
        disabled={!isAllFieldsFilled() || isPending}
      >
        Simpan dan Lanjutkan
      </Button>
    </div>
  )
}

export default GuardianInformation;
