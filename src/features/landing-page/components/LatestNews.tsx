import NewsItem from "./NewsItem";

function LatestNews() {
  return (
    <div className="mt-24">
      <div className="flex justify-between">
        <p className="text-4xl font-bold">Berita Terbaru</p>
        <a href="#" className="h-fit my-auto underline font-bold text-[#637587]">Lihat Semua</a>
      </div>

      <div className="flex flex-col gap-5 mt-5">
        <NewsItem />
      </div>
    </div>
  )
}

export default LatestNews;