
function NavigationBar() {
  return (
    <div className="flex justify-between py-3 px-[60px] 2xl:py-5 2xl:px-28 border-b border-[#E5E8EB]">
      <div className="text-xl 2xl:text-2xl font-bold">
        Letjend Haryono M.T.
      </div>
      <div className="flex gap-9">
        <div className="text-lg 2xl:text-xl font-medium">
          Berita
        </div>
        <div className="text-lg 2xl:text-xl font-medium">
          Pendaftaran Siswa
        </div>
        <div className="text-lg 2xl:text-xl font-medium">
          Galeri Sekolah
        </div>
      </div>
    </div>
  )
}

export default NavigationBar