import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { Popover } from "antd";
import { getUser } from "../features/login/services/login-service";
import useScrollPosition from "../utils/useScrollPosition";

function NavigationBar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<any>();
  const scrollPosition = useScrollPosition();

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
    <div className={`fixed w-full z-50 transition-all duration-300 ${scrollPosition > 10 ? "top-2.5 px-4 md:px-[65px] 2xl:px-28" : "top-0"}`}>
      <div className={`bg-white transition-all flex justify-between ${scrollPosition > 10 ? "shadow-xl rounded-full" : "border-t-0"}
      items-center py-5 px-4 md:px-8 2xl:py-7 2xl:px-28 border border-[#E5E8EB]`}>
        <div
          onClick={() => navigate("/")}
          className="text-xl 2xl:text-2xl font-bold cursor-pointer"
        >
          Letjen Haryono M.T.
        </div>

        <div className="gap-6 hidden md:flex items-center">
          <div
            onClick={() => navigate("/news")}
            className="text-base lg:text-lg 2xl:text-xl font-medium cursor-pointer"
          >
            Berita
          </div>
          <div
            onClick={() => navigate("/student-registration")}
            className="text-base lg:text-lg 2xl:text-xl font-medium cursor-pointer"
          >
            Pendaftaran Siswa
          </div>
          <div
            onClick={() => navigate("/gallery")}
            className="text-base lg:text-lg 2xl:text-xl font-medium cursor-pointer"
          >
            Galeri Sekolah
          </div>
          {getUser()?.name ? (
            <Popover
              content={
                <div>
                  <div
                    onClick={() => {
                      localStorage.removeItem("accessToken");
                      localStorage.removeItem("user");
                      navigate("/login");
                    }}
                    className="lg:text-lg 2xl:text-xl font-medium cursor-pointer text-red-500"
                  >Logout</div>
                </div>
              }
            >
              <div className="flex items-center gap-2 lg:text-lg 2xl:text-xl cursor-pointer">
                <img className="size-6 lg:size-8 rounded-full" src="images/default-user.jpeg" />
                <p>{getUser()?.name}</p>
              </div>  
            </Popover>
          ) : (
            <div className="px-5 py-1.5 rounded cursor-pointer text-white bg-[#1469C2]" onClick={() => navigate("/login")}>
              Login
            </div>
          )}
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
            <div
              onClick={() => {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("user");
                navigate("/login");
              }}
              className="text-lg 2xl:text-xl font-medium cursor-pointer text-red-500"
            >
              Logout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;
