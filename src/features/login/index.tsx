import { IoMdCheckmark, IoMdClose } from "react-icons/io";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { useAlert } from "../../components/AlertContext";
import { loginUser } from "./services/login-service";
import { isAuthenticated } from "../../utils/getAccessToken";
import useEncryption from "../../utils/useEncryption";

export default function () {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const { encrypt } = useEncryption();

  const [ready, setReady] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    emailError: "",
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const isApplicant = data?.data?.role_name === "Applicant";
      if (isApplicant) {
        navigate("/student-registration");
        showAlert({
          message: "Login berhasil!",
          type: "success",
        });
      } else {
        const encryptedData = encrypt("email=" + formData.email + "&password=" + formData.password)
        window.location.href = `https://eis-letjen.web.app/login?data=${encodeURIComponent(encryptedData)}`;
      }
    },
    onError: (error: Error) => {
      showAlert({ message: error.message || "Gagal login", type: "error" });
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!pattern.test(formData.email)) {
      setFormData((prev) => ({ ...prev, emailError: "Email tidak valid" }));
      return;
    }
    mutateAsync({ ...formData });
  }

  useEffect(() => {
    if (isAuthenticated()) navigate(-1);
    const timeoutId = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(timeoutId);
  }, []);

  if (!ready) return null;
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center py-6 px-4 h-[92vh]">
        <div className="md:w-[50%] xl:w-[40%] flex flex-col gap-20 md:gap-32 mb-3 pt-7 md:px-[60px] 2xl:pt-10 2xl:px-28">
          <div>
            <p className="text-2xl font-bold text-center md:text-3xl">Masuk</p>
            <p className="text-xs md:text-sm text-[#A5A5A5] mt-4 text-center">
              Masuk akun untuk melakukan pendaftaran siswa dan melihat proses
              pendaftaran siswa
            </p>
          </div>

          <div>
            <p className="font-medium">Email</p>
            <input
              type="text"
              placeholder="Masukkan email"
              className={`w-full py-2.5 px-3 rounded border mt-2 ${formData.emailError ? "border-red-500" : "border-[#A5A5A5]"}`}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <p className="text-xs text-red-500">{formData.emailError}</p>

            <div className="w-full mt-6">
              <p className="mb-2 font-medium">Kata sandi</p>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan kata sandi"
                  className="w-full py-2.5 px-3 rounded border border-[#A5A5A5]"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <div
                  className="absolute inset-y-0 flex items-center my-auto text-gray-600 cursor-pointer h-fit right-3"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>   
              <p
                className={`${
                  formData.password.length >= 6
                    ? "text-green-500"
                    : "text-[#828282]"
                } text-sm mt-2 flex justify-center items-center gap-1`}
              >
                {formData.password.length >= 6 ? (
                  <IoMdCheckmark size={18} />
                ) : (
                  <IoMdClose size={18} />
                )}
                minimal 6 karakter
              </p>
            </div>

            <Button
              disabled={!formData.email || formData.password.length < 6 || isPending}
              className="w-full mt-12 rounded-3xl"
            >
              Masuk
            </Button>
          </div>

          <p className="md:mt-auto text-sm text-[#828282] text-center">
            Belum punya akun?{" "}
            <span className="ml-1 text-blue-500 cursor-pointer" onClick={() => navigate("/register")}>Daftar disini</span>
          </p>
        </div>
        <img
          src="images/smile-kid-vector.png"
          alt=""
          className="hidden md:block w-[50%] xl:w-[60%] object-cover rounded-lg"
        />
      </div>
    </form>
  );
}
