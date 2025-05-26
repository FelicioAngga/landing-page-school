import { useNavigate } from "react-router-dom";
import parse, { domToReact } from "html-react-parser";

function NewsItem({
  id,
  title,
  content,
  thumbnail,
}: {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
}) {
  const navigate = useNavigate();
  const options = {
    replace: (domNode: any) => {
      if (domNode.type === 'tag') {
        const newProps = {
          ...domNode.attribs,
          className: 'inline',
        };
        return <span {...newProps}>{domToReact(domNode.children, options)}</span>;
      }
    },
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-10 justify-between shadow-lg rounded-xl py-3 px-4 border">
      <div className="w-full">
        <p className="md:text-lg 2xl:text-xl font-bold">{title}</p>
        <p className="text-[#637587] text-justify text-sm md:text-base 2xl:text-lg truncate max-w-xs">{parse(content, options)}</p>
        <button onClick={() => navigate(`news/${id}`)} className="mt-5 px-6 py-2.5 font-bold rounded-2xl bg-[#F0F2F5]">
          Baca
        </button>
      </div>
      <div className="w-full">
        <img src={thumbnail} className="ml-auto w-full md:w-[450px] h-[220px] object-cover rounded-xl" />
      </div>
    </div>
  );
}

export default NewsItem;
