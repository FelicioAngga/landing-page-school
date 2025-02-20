export default function Button({
  children,
  className,
  onClick,
}: {
  children: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-center font-bold bg-[#1469C2] text-white px-4 2xl:py-4 py-3 rounded-xl ${className}`}
    >
      {children}
    </button>
  );
}
