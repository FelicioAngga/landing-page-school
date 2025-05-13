import { IoIosSearch } from "react-icons/io";
import Footer from "./components/Footer";
import NewsItem from "./components/NewsItem";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getNews, NewsResponseType } from "./services/news-service";

export default function () {
  const [search, setSearch] = useState("");
  const [paginateData, setPaginateData] = useState({
    page: 1,
    limit: 6,
    search: "",
  });
  const { data: newsData } = useQuery<NewsResponseType>({
    queryKey: ["news", paginateData.page, paginateData.search],
    queryFn: () => getNews(paginateData),
  });

  const pageCount = Math.ceil((newsData?.total || 0) / 6);
  const handlePageClick = (event: any) => {
    setPaginateData((prev) => ({ ...prev, page: event.selected + 1 }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPaginateData((prev) => ({ ...prev, page: 1, search }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3 py-5 px-4 md:px-[60px] 2xl:py-7 2xl:px-28">
        <p className="w-fit mx-auto text-2xl md:text-3xl font-bold">
          Berita Terbaru
        </p>
        <div className="relative mx-auto w-fit mt-6">
          <IoIosSearch
            className="absolute inset-y-0 my-auto left-1.5"
            size={24}
          />
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari berita (Enter untuk mencari)"
            className="md:w-96 py-2 pr-3 pl-8 rounded border border-[#828282]"
          />
        </div>
        
        <div className="flex flex-wrap">
          {newsData?.data.map((item, idx) => <NewsItem key={idx} {...item} />)}
        </div>

        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          forcePage={paginateData.page - 1}
          pageCount={pageCount}
          previousLabel="Previous"
          renderOnZeroPageCount={null}
          className="flex flex-wrap mt-6 justify-center md:justify-end"
          previousClassName="rounded-l text-gray-600 font-medium cursor-pointer border border-gray-300 px-2 py-1.5"
          nextClassName="rounded-r text-gray-600 font-medium cursor-pointer border border-gray-300 px-4 py-1.5"
          pageClassName="border border-gray-300 px-3 py-1.5"
          activeClassName="bg-blue-500 text-white"
          breakClassName="border border-gray-300 px-3 py-1.5"
        />
      </div>
      <Footer />
    </form>
  );
}
