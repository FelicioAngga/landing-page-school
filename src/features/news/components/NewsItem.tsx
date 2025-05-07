function NewsItem() {
  return (
    <div className="flex flex-col gap-2">
      <img
        src="images/smile-kid-vector.png"
        alt=""
        className="rounded-lg w-72 md:w-[320px] h-60 object-cover"
      />
      <p className="text-lg md:text-xl font-bold">Bahaya Covid-19</p>
      <p className="text-xs text-[#878787] w-72 md:w-[320px] text-justify">
        The level of digitalization going on across the world today is immense
        and cannot be overlooked because it is literally in our faces.
      </p>
    </div>
  );
}

export default NewsItem;
