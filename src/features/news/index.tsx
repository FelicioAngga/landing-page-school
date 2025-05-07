import { IoIosSearch } from "react-icons/io";
import Footer from "./components/Footer";
import NewsItem from "./components/NewsItem";
import ReactPaginate from "react-paginate";
import { useState } from "react";

export default function () {
  const [itemOffset, setItemOffset] = useState(0);
  const pageCount = Math.ceil(44 / 6);
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * 6) % 44;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}, itemOffset ${itemOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
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
            placeholder="Cari berita"
            className="md:w-96 py-2 pr-3 pl-8 rounded border border-[#828282]"
          />
        </div>

        <div className="mt-10 flex flex-col items-center md:flex-row md:justify-between gap-6 flex-wrap">
          {Array.from({ length: 6 }, (_, index) => (
            <NewsItem key={index} />
          ))}
        </div>

        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="Previous"
          renderOnZeroPageCount={null}
          className="flex flex-wrap mt-12 justify-center md:justify-end"
          previousClassName="rounded-l text-gray-600 font-medium cursor-pointer border border-gray-300 px-2 py-1.5"
          nextClassName="rounded-r text-gray-600 font-medium cursor-pointer border border-gray-300 px-4 py-1.5"
          pageClassName="border border-gray-300 px-3 py-1.5"
          activeClassName="bg-blue-500 text-white"
        />
      </div>
      <Footer />
    </>
  );
}
