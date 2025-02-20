import NewsItem from "./NewsItem";

function LatestNews() {
  return (
    <div className="mt-24">
      <div className="flex justify-between">
        <p className="text-4xl font-bold">Berita Terbaru</p>
        <a
          href="#"
          className="h-fit my-auto underline font-bold text-[#637587]"
        >
          Lihat Semua
        </a>
      </div>

      <div className="flex flex-col gap-8 mt-5">
        {dummy.map((item, idx) => (
          <NewsItem {...item} key={idx} />
        ))}
      </div>
    </div>
  );
}

export default LatestNews;

const dummy = [
  {
    title: "Pendaftaran siswa/i tahun ajaran 2025/2026",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    img: "images/dummy-news.png",
  },
  {
    title: "Pendaftaran siswa/i tahun ajaran 2025/2026",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    img: "images/dummy-news.png",
  },
  {
    title: "Pendaftaran siswa/i tahun ajaran 2025/2026",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    img: "images/sd.png",
  },
];
