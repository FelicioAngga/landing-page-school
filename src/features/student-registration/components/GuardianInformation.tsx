import { DatePicker, Input, Select } from 'antd';
import Button from '../../../components/Button';

type GuardianInformationProps = {
  setSelectedTab: (tab: string) => void;
}

function GuardianInformation({ setSelectedTab }: GuardianInformationProps) {
  function handleNext() {
    setSelectedTab("Dokumen");
  }

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
                />
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
                <p className="text-sm mb-1 font-medium">Pendidikan Tertinggi <span className="text-red-500">*</span></p>
                <Input
                  placeholder="Pendidikan Tertinggi"
                  className="py-2 text-sm border-gray-400 placeholder:text-[#A5A5A5]"
                />
              </div>

              <div>
                <p className="text-sm mb-1 font-medium">Alamat <span className="text-red-500">*</span></p>
                <Input
                  placeholder="Alamat"
                  className="py-2 text-sm border-gray-400 placeholder:text-[#A5A5A5]"
                />
              </div>

              <div>
                <p className="text-sm mb-1 font-medium">Pekerjaan <span className="text-red-500">*</span></p>
                <Input
                  placeholder="Pekerjaan"
                  className="py-2 text-sm border-gray-400 placeholder:text-[#A5A5A5]"
                />
              </div>

              <div>
                <p className="text-sm mb-1 font-medium">No Telepon <span className="text-red-500">*</span></p>
                <Input
                  type='number'
                  placeholder="No Telepon"
                  className="py-2 text-sm border-gray-400 placeholder:text-[#A5A5A5]"
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
                />
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
                <p className="text-sm mb-1 font-medium">Pendidikan Tertinggi <span className="text-red-500">*</span></p>
                <Input
                  placeholder="Pendidikan Tertinggi"
                  className="py-2 text-sm border-gray-400 placeholder:text-[#A5A5A5]"
                />
              </div>

              <div>
                <p className="text-sm mb-1 font-medium">Alamat <span className="text-red-500">*</span></p>
                <Input
                  placeholder="Alamat"
                  className="py-2 text-sm border-gray-400 placeholder:text-[#A5A5A5]"
                />
              </div>

              <div>
                <p className="text-sm mb-1 font-medium">Pekerjaan <span className="text-red-500">*</span></p>
                <Input
                  placeholder="Pekerjaan"
                  className="py-2 text-sm border-gray-400 placeholder:text-[#A5A5A5]"
                />
              </div>

              <div>
                <p className="text-sm mb-1 font-medium">No Telepon <span className="text-red-500">*</span></p>
                <Input
                  type='number'
                  placeholder="No Telepon"
                  className="py-2 text-sm border-gray-400 placeholder:text-[#A5A5A5]"
                />
              </div>
            </div>
          </div>
        </div>

        <div className='mt-8 mx-auto w-fit lg:mx-0'>
          <p className="2xl:text-lg font-bold">Data Wali Siswa</p>
          <div className="mt-3 flex flex-col gap-4 md:w-[400px] lg:w-[420px] xl:w-[500px] 2xl:w-[600px] px-6 py-4 border rounded-lg">
            <div>
              <p className="text-sm mb-1 font-medium">Nama Ibu <span className="text-red-500">*</span></p>
              <Input
                placeholder="Nama Ayah"
                className="py-2 text-sm border-gray-400 placeholder:text-[#A5A5A5]"
              />
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
              <p className="text-sm mb-1 font-medium">Pendidikan Tertinggi <span className="text-red-500">*</span></p>
              <Input
                placeholder="Pendidikan Tertinggi"
                className="py-2 text-sm border-gray-400 placeholder:text-[#A5A5A5]"
              />
            </div>

            <div>
              <p className="text-sm mb-1 font-medium">Alamat <span className="text-red-500">*</span></p>
              <Input
                placeholder="Alamat"
                className="py-2 text-sm border-gray-400 placeholder:text-[#A5A5A5]"
              />
            </div>

            <div>
              <p className="text-sm mb-1 font-medium">Pekerjaan <span className="text-red-500">*</span></p>
              <Input
                placeholder="Pekerjaan"
                className="py-2 text-sm border-gray-400 placeholder:text-[#A5A5A5]"
              />
            </div>

            <div>
              <p className="text-sm mb-1 font-medium">No Telepon <span className="text-red-500">*</span></p>
              <Input
                type='number'
                placeholder="No Telepon"
                className="py-2 text-sm border-gray-400 placeholder:text-[#A5A5A5]"
              />
            </div>
          </div>
        </div>
      </div>
      <Button className="max-w-md flex justify-center mx-auto font-bold w-full mt-5" onClick={handleNext}>Berikutnya</Button>
    </div>
  )
}

export default GuardianInformation;
