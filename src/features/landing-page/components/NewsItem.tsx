function NewsItem({
  title,
  desc,
  img,
}: {
  title: string;
  desc: string;
  img: string;
}) {
  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-10 justify-between shadow-lg rounded-xl py-3 px-4 border">
      <div className="w-full">
        <p className="md:text-lg 2xl:text-xl font-bold">{title}</p>
        <p className="text-[#637587] text-justify text-sm md:text-base 2xl:text-lg">{desc}</p>
        <button className="mt-5 px-6 py-2.5 font-bold rounded-2xl bg-[#F0F2F5]">
          Baca
        </button>
      </div>
      <div className="w-full">
        <img src={img} className="ml-auto w-full md:w-[450px] rounded-xl" />
      </div>
    </div>
  );
}

export default NewsItem;
