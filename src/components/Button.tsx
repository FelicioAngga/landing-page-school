export default function Button({
  children,
  className,
  onClick,
  disabled = false,
}: {
  children: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`text-center font-bold bg-[#1469C2] text-white text-sm md:text-base px-4 2xl:py-4 py-3 rounded-xl disabled:bg-gray-400 ${className}`}
    >
      {children}
    </button>
  );
}
