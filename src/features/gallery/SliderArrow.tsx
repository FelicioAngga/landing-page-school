const NextArrow = ({ onClick }: any) => {
  return (
    <div
      onClick={onClick}
      className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 cursor-pointer 
      bg-gray-700 text-white p-2 size-7 text-sm rounded-full hover:bg-gray-600 flex items-center"
    >
      ➤
    </div>
  );
};

const PrevArrow = ({ onClick }: any) => {
  return (
    <div
      onClick={onClick}
      className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 cursor-pointer rotate-180 
      bg-gray-700 text-white p-2 size-7 text-sm rounded-full hover:bg-gray-600 flex items-center"
    >
      ➤
    </div>
  );
};
export { NextArrow, PrevArrow };