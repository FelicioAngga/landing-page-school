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
    <div className="mt-6 flex flex-col gap-2 w-full md:w-1/2 xl:w-1/3 items-center">
      <div className="cursor-pointer" onClick={() => navigate(`/news/${id}`)}>
        <img
          src={thumbnail}
          alt=""
          className="rounded-lg w-72 md:w-[320px] 2xl:w-[420px] h-60 object-cover"
          loading="lazy"
        />
        <p className="text-lg md:text-xl font-bold">{title}</p>
        <div className="text-xs text-[#878787] w-56 truncate">
          {parse(content, options)}
        </div>
      </div>
    </div>
  );
}

export default NewsItem;
