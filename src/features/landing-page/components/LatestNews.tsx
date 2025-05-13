import { useNavigate } from "react-router-dom";
import NewsItem from "./NewsItem";
import { getNews, NewsResponseType } from "../../news/services/news-service";
import { useQuery } from "@tanstack/react-query";

function LatestNews() {
  const navigate = useNavigate();
  const { data: newsData } = useQuery<NewsResponseType>({
    queryKey: ["news"],
    queryFn: () => getNews({
      limit: 3,
      page: 1,
      search: "",
    }),
  });
  
  return (
    <div className="mt-16 md:mt-24">
      <div className="flex justify-between">
        <p className="text-2xl md:text-4xl font-bold">Berita Terbaru</p>
        <a
          onClick={() => navigate("/news")}
          className="text-sm md:text-base h-fit my-auto underline font-bold text-[#637587]"
        >
          Lihat Semua
        </a>
      </div>

      <div className="flex flex-col gap-8 mt-5">
        {newsData?.data.map((item, idx) => (
          <NewsItem {...item} key={idx} />
        ))}
      </div>
    </div>
  );
}

export default LatestNews;

