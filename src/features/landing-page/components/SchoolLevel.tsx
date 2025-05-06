function SchoolLevel() {
  return (
    <div className="mt-16 flex flex-col gap-16 md:gap-24">
      <div className="flex flex-col-reverse md:flex-row gap-3 md:gap-10 justify-between">
        <div>
          <p className="text-2xl md:text-3xl font-bold">Playgroup</p>
          <p className="mt-1 md:mt-4 2xl:mt-6 text-[#637587] text-justify 2xl:text-xl max-w-[80vw]">
            Jenjang pendidikan prasekolah yang ditujukan untuk anak usia 2–4
            tahun. Tujuannya adalah untuk mengenalkan anak pada lingkungan
            belajar yang menyenangkan melalui permainan, interaksi sosial, dan
            kegiatan kreatif. Playgroup membantu perkembangan motorik, kognitif,
            serta sosial-emosional anak sebelum memasuki Taman Kanak-Kanak (TK).
          </p>
        </div>
        <img
          src="/images/pg.png"
          className="object-cover 2xl:w-[60%] rounded-xl"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-3 md:gap-10 justify-between">
        <img
          src="/images/pg.png"
          className="object-cover 2xl:w-[60%] rounded-xl"
        />
        <div>
          <p className="text-2xl md:text-3xl font-bold">Taman Kanak-kanak (TK)</p>
          <p className="mt-1 md:mt-4 2xl:mt-6 text-[#637587] text-justify 2xl:text-xl max-w-[80vw]">
            Jenjang pendidikan prasekolah yang ditujukan untuk anak usia 4–6
            tahun sebelum masuk ke Sekolah Dasar (SD). Pendidikan di TK lebih
            terstruktur dibandingkan Playgroup, dengan fokus pada pengembangan
            kognitif, sosial, emosional, serta keterampilan motorik anak melalui
            metode bermain sambil belajar.
          </p>
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row gap-3 md:gap-10 justify-between">
        <div>
          <p className="text-2xl md:text-3xl font-bold">Sekolah Dasar (SD)</p>
          <p className="mt-1 md:mt-4 2xl:mt-6 text-[#637587] text-justify 2xl:text-xl max-w-[80vw]">
            Jenjang pendidikan formal pertama yang wajib diikuti oleh anak-anak
            usia 6–12 tahun. SD biasanya berlangsung selama 6 tahun (kelas 1–6).
            Kurikulumnya mencakup mata pelajaran seperti Matematika, Bahasa
            Indonesia, IPA, IPS, Pendidikan Agama, serta Seni dan Olahraga. Di
            tahap ini, anak-anak mulai diajarkan keterampilan dasar seperti
            membaca, menulis, dan berhitung.
          </p>
        </div>
        <img
          src="/images/sd.png"
          className="object-cover 2xl:w-[60%] rounded-xl"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-3 md:gap-10 justify-between">
        <img
          src="/images/smp.png"
          className="object-cover 2xl:w-[60%] rounded-xl"
        />
        <div>
          <p className="text-2xl md:text-3xl font-bold">Sekolah Menengah Pertama (SMP)</p>
          <p className="mt-1 md:mt-4 2xl:mt-6 text-[#637587] text-justify 2xl:text-xl max-w-[80vw]">
            Jenjang pendidikan menengah pertama yang berlangsung selama 3 tahun
            (kelas 7–9), umumnya untuk siswa berusia 12–15 tahun. Di tingkat
            ini, mata pelajaran lebih kompleks dibandingkan SD, mencakup bidang
            ilmu seperti Fisika, Biologi, Kimia, Sejarah, dan Bahasa Inggris
            yang lebih mendalam. SMP menjadi masa transisi dari pembelajaran
            dasar menuju pembelajaran yang lebih analitis dan mandiri.
          </p>
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row gap-3 md:gap-10 justify-between">
        <div>
          <p className="text-2xl md:text-3xl font-bold">Sekolah Menengah Akhir (SMA)</p>
          <p className="mt-1 md:mt-4 2xl:mt-6 text-[#637587] text-justify 2xl:text-xl max-w-[80vw]">
            Jenjang pendidikan menengah atas yang berlangsung selama 3 tahun
            (kelas 10–12). Siswa SMA biasanya memilih jurusan yang lebih
            spesifik, seperti IPA, IPS, atau Bahasa, sesuai dengan minat dan
            rencana mereka untuk melanjutkan pendidikan ke perguruan tinggi atau
            memasuki dunia kerja. Kurikulumnya lebih mendalam, dengan fokus pada
            pemahaman konsep dan pemecahan masalah di berbagai bidang ilmu.
          </p>
        </div>
        <img
          src="/images/sma.png"
          className="object-cover 2xl:w-[60%] rounded-xl"
        />
      </div>
    </div>
  );
}

export default SchoolLevel;
