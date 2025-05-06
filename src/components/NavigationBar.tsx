import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

function NavigationBar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<any>();

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="flex justify-between items-center py-5 px-4 md:px-[60px] 2xl:py-7 2xl:px-28 border-b border-[#E5E8EB] relative">
      <div
        onClick={() => navigate("/")}
        className="text-xl 2xl:text-2xl font-bold cursor-pointer"
      >
        Letjend Haryono M.T.
      </div>

      <div className="gap-9 hidden md:flex">
        <div
          onClick={() => navigate("/news")}
          className="text-lg 2xl:text-xl font-medium cursor-pointer"
        >
          Berita
        </div>
        <div
          onClick={() => navigate("/student-registration")}
          className="text-lg 2xl:text-xl font-medium cursor-pointer"
        >
          Pendaftaran Siswa
        </div>
        <div
          onClick={() => navigate("/gallery")}
          className="text-lg 2xl:text-xl font-medium cursor-pointer"
        >
          Galeri Sekolah
        </div>
      </div>

      <button onClick={() => setIsOpen(true)} className="md:hidden text-2xl">
        <FaBars />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-40"></div>
      )}

      <div
        ref={menuRef}
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-6 space-y-6">
          <div className="flex justify-end">
            <button onClick={() => setIsOpen(false)} className="text-2xl">
              <FaTimes />
            </button>
          </div>
          <div
            onClick={() => handleNavigate("/news")}
            className="text-lg font-medium cursor-pointer"
          >
            Berita
          </div>
          <div
            onClick={() => handleNavigate("/student-registration")}
            className="text-lg font-medium cursor-pointer"
          >
            Pendaftaran Siswa
          </div>
          <div
            onClick={() => handleNavigate("/gallery")}
            className="text-lg font-medium cursor-pointer"
          >
            Galeri Sekolah
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;
