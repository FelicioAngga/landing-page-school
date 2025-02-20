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
    <div className="flex gap-10 justify-between shadow-lg rounded-xl py-3 px-4">
      <div className="w-full">
        <p className="text-lg 2xl:text-xl font-bold">{title}</p>
        <p className="text-[#637587] text-justify 2xl:text-lg">{desc}</p>
        <button className="mt-5 px-6 py-2.5 font-bold rounded-2xl bg-[#F0F2F5]">
          Baca
        </button>
      </div>
      <div className="w-full">
        <img src={img} className="ml-auto w-[450px] rounded-xl" />
      </div>
    </div>
  );
}

export default NewsItem;
