import { useNavigate, useParams } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import { useQuery } from "@tanstack/react-query";
import { getNewsById, NewsDetailResponseType } from "../features/news/services/news-service";
import { BiChevronLeft } from "react-icons/bi";


function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = useQuery<NewsDetailResponseType>({
    queryKey: ["news", id],
    queryFn: () => getNewsById(id as string)
  })
  
  return (
    <div>
      <NavigationBar />
      <div className="mb-3 py-5 px-4 md:px-[60px] 2xl:py-7 2xl:px-28">
        <div className="flex items-center mb-5 font-medium cursor-pointer" onClick={() => navigate(-1)}>
          <BiChevronLeft size={30} />
          <p>Kembali</p>
        </div>
        <div className="flex flex-col-reverse md:flex-row gap-5 md:gap-10 justify-between">
          <div>
            <p className="text-3xl font-bold">{data?.title}</p>
            <p className="mt-3 md:mt-5">{data?.content}</p>
          </div>
          <img src={data?.thumbnail} loading="lazy" className="w-80 h-80 object-cover rounded-md" />
        </div>
      </div>
    </div>
  )
}

export default NewsDetail