import { useCountUp } from "react-countup";

function SchoolNumberInfo() {
  useCountUp({
    ref: 'activeStudentsCounter',
    end: 500,
    duration: 2,
    scrollSpyDelay: 50,
    enableScrollSpy: true,
    scrollSpyOnce: true,
  });
  useCountUp({
    ref: 'alumniCounter',
    end: 1100,
    duration: 2,
    scrollSpyDelay: 50,
    enableScrollSpy: true,
    scrollSpyOnce: true,
  });
  useCountUp({
    ref: 'yearCounter',
    end: 1980,
    duration: 2,
    scrollSpyDelay: 50,
    enableScrollSpy: true,
    separator: "",
    scrollSpyOnce: true,
  });
  useCountUp({
    ref: 'percentageCounter',
    end: 100,
    duration: 2,
    scrollSpyDelay: 50,
    enableScrollSpy: true,
    scrollSpyOnce: true,
  });

  return (
    <div className="mt-20">
      <p className="text-xl md:text-4xl font-semibold text-center mb-14">Infografis Letjen Haryono M.T.</p>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div data-aos="fade-up" className="relative size-fit h-96 rounded-xl overflow-hidden">
          <img src="images/teacher.png" className="w-80 h-96 object-cover" />
          <div className="absolute inset-0 z-50 flex flex-col justify-center h-full font-semibold text-3xl text-white">
            <p className="text-xl text-center">Dibentuk pada</p>
            <span className="text-center" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }} id="yearCounter" />
          </div>
          <div className="absolute bg-black size-full top-0 opacity-25"></div>
        </div>

        <div data-aos="fade-up"  data-aos-delay="50" className="relative size-fit h-96 rounded-xl overflow-hidden">
          <img src="images/event1.jpg" className="w-80 h-96 object-cover" />
          <div className="absolute inset-0 z-50 flex flex-col justify-center h-full font-semibold text-3xl text-white">
            <p className="text-xl text-center">Jumlah Siswa Aktif</p>
            <div className="flex justify-center">
              <span className="text-center" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }} id="activeStudentsCounter" />
              <p>+</p>
            </div>
          </div>
          <div className="absolute bg-black size-full top-0 opacity-25"></div>
        </div>

        <div data-aos="fade-up"  data-aos-delay="50" className="relative size-fit h-96 rounded-xl overflow-hidden">
          <img src="images/event5.jpg" className="w-80 h-96 object-cover" />
          <div className="absolute inset-0 z-50 flex flex-col justify-center h-full font-semibold text-3xl text-white">
            <p className="text-xl text-center">Jumlah Alumni</p>
            <div className="flex justify-center">
              <span className="text-center" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }} id="alumniCounter" />
              <p>+</p>
            </div>
          </div>
          <div className="absolute bg-black size-full top-0 opacity-25"></div>
        </div>

        <div data-aos="fade-up"  data-aos-delay="100" className="relative size-fit h-96 rounded-xl overflow-hidden">
          <img src="images/pg.jpg" className="w-80 h-96 object-cover" />
          <div className="absolute inset-0 z-50 flex flex-col justify-center h-full font-semibold text-3xl text-white">
            <p className="text-xl text-center">Persentase Kelulusan</p>
            <div className="flex justify-center">
              <span className="text-center" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }} id="percentageCounter" />
              <p>%</p>
            </div>
          </div>
          <div className="absolute bg-black size-full top-0 opacity-25"></div>
        </div>
      </div>
    </div>
  );
}

export default SchoolNumberInfo;
