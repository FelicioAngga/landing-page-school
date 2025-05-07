import { DatePicker, Input, Select } from "antd";
import Button from "../../../components/Button";

type StudentInformationProps = {
  setSelectedTab: (tab: string) => void;
}

function StudentInformation({ setSelectedTab }: StudentInformationProps) {
  function handleNext() {
    setSelectedTab("Informasi Wali");
  }

  return (
    <div className="mt-5 md:mt-12">
      <p className="text-2xl md:text-3xl font-bold text-center">
        Pendaftaran Siswa
      </p>

      <div className="mt-3 md:mt-5 w-fit mx-auto">
        <p className="2xl:text-lg font-bold">Data Siswa</p>
        <div className="mt-3 flex flex-col gap-4 md:w-[600px] px-6 py-4 border rounded-lg">
          <div>
            <p className="text-sm mb-1 font-medium">Nama Lengkap <span className="text-red-500">*</span></p>
            <Input
              placeholder="Nama Lengkap"
              className="py-2 text-sm border-gray-400 placeholder:text-[#A5A5A5]"
            />
          </div>

          <div className="flex gap-6">
            <div className="w-full">
              <p className="text-sm mb-1 font-medium">Tempat Lahir <span className="text-red-500">*</span></p>
              <Input
                placeholder="Tempat Lahir"
                className="py-2 text-sm border-gray-400 placeholder:text-[#A5A5A5]"
              />
            </div>
            <div className="w-full">
              <p className="text-sm mb-1 font-medium">Tanggal Lahir <span className="text-red-500">*</span></p>
              <DatePicker className="w-full py-2 text-sm border-gray-400 placeholder:text-[#A5A5A5]" />
            </div>
          </div>

          <div>
            <p className="text-sm mb-1 font-medium">Agama <span className="text-red-500">*</span></p>
            <Select
              placeholder="Pilih Agama"
              className="w-full h-10 text-sm rounded-md border border-gray-400 placeholder:text-[#A5A5A5]"
            >
              <Select.Option value="buddha">Buddha</Select.Option>
              <Select.Option value="kritenProtestan">
                Kristen Protestan
              </Select.Option>
              <Select.Option value="islam">Islam</Select.Option>
              <Select.Option value="hindu">Hindu</Select.Option>
              <Select.Option value="katolik">Katolik</Select.Option>
            </Select>
          </div>

          <div className="flex gap-6">
            <div className="w-full">
              <p className="text-sm mb-1 font-medium whitespace-nowrap">Jumlah Saudara <span className="text-red-500">*</span></p>
              <Input
                type="number"
                placeholder="Jumlah Saudara"
                className="py-2 text-sm border-gray-400 placeholder:text-[#A5A5A5]"
              />
            </div>

            <div className="w-full">
              <p className="text-sm mb-1 font-medium">Saudara Ke <span className="text-red-500">*</span></p>
              <Input
                type="number"
                placeholder="Saudara Ke"
                className="py-2 text-sm border-gray-400 placeholder:text-[#A5A5A5]"
              />
            </div>
          </div>

          <div>
            <p className="text-sm mb-1 font-medium">Tinggal Bersama <span className="text-red-500">*</span></p>
            <Select
              placeholder="Pilih Dimana Siswa Tinggal"
              className="w-full h-10 text-sm rounded-md border border-gray-400 placeholder:text-[#A5A5A5]"
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
            />
          </div>

          <div>
            <p className="text-sm mb-1 font-medium">No Telepon <span className="text-red-500">*</span></p>
            <Input
              type="number"
              placeholder="Status Diri Dalam Keluarga"
              className="py-2 text-sm border-gray-400 placeholder:text-[#A5A5A5]"
            />
          </div>

          <div>
            <p className="text-sm mb-1 font-medium">Pindahan dari Sekolah <span className="text-red-500">*</span></p>
            <Input
              placeholder="Pindahan dari Sekolah"
              className="py-2 text-sm border-gray-400 placeholder:text-[#A5A5A5]"
            />
          </div>

          <div>
            <p className="text-sm mb-1 font-medium">Alamat Siswa <span className="text-red-500">*</span></p>
            <Input
              placeholder="Alamat Siswa"
              className="py-2 text-sm border-gray-400 placeholder:text-[#A5A5A5]"
            />
          </div>

          <div>
            <p className="text-sm mb-1 font-medium">Jenjang Pendidikan yang Diinginkan <span className="text-red-500">*</span></p>
            <Select
              placeholder="Pilih Jenjang"
              className="w-full h-10 text-sm rounded-md border border-gray-400 placeholder:text-[#A5A5A5]"
            >
              <Select.Option value="sma3">SMA 3</Select.Option>
              <Select.Option value="sma2">SMA 2</Select.Option>
              <Select.Option value="sma1">SMA 1</Select.Option>
              <Select.Option value="smp3">SMP 3</Select.Option>
              <Select.Option value="smp2">SMP 2</Select.Option>
              <Select.Option value="smp1">SMP 1</Select.Option>
              <Select.Option value="sd6">SD 6</Select.Option>
              <Select.Option value="sd5">SD 5</Select.Option>
              <Select.Option value="sd4">SD 4</Select.Option>
              <Select.Option value="sd3">SD 3</Select.Option>
              <Select.Option value="sd2">SD 2</Select.Option>
              <Select.Option value="sd1">SD 1</Select.Option>
              <Select.Option value="tk">TK</Select.Option>
              <Select.Option value="pg">PG</Select.Option>
            </Select>
          </div>

          <div>
            <p className="text-sm mb-1 font-medium">Jurusan <span className="text-red-500">*</span></p>
            <Select
              placeholder="Pilih Jurusan"
              className="w-full h-10 text-sm rounded-md border border-gray-400 placeholder:text-[#A5A5A5]"
            >
              <Select.Option value="general">General</Select.Option>
              <Select.Option value="mipa">MIPA</Select.Option>
              <Select.Option value="ips">IPS</Select.Option>
            </Select>
          </div>
        </div>

        <Button className="font-bold w-full mt-5" onClick={handleNext}>Berikutnya</Button>
      </div>
    </div>
  );
}

export default StudentInformation;
