import { IoMdCheckmark, IoMdClose } from "react-icons/io";
import Button from "../../components/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "./services/register-service";
import { useAlert } from "../../components/AlertContext";

export default function () {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    emailError: "",
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      if (data) {
        navigate("/login");
        showAlert({
          message: "Pendaftaran berhasil, silahkan login",
          type: "success",
        });
      }
    },
    onError: (error: Error) => {
      showAlert({ message: error.message || "Gagal mendaftar", type: "error" });
    },
  });

  function handleSubmit() {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!pattern.test(formData.email)) {
      setFormData((prev) => ({ ...prev, emailError: "Email tidak valid" }));
      return;
    }
    mutateAsync({
      ...formData,
    });
  }

  return (
    <div>
      <div className="flex justify-center py-6 px-4 h-[92vh]">
        <div className="md:w-[50%] xl:w-[40%] flex flex-col gap-20 md:gap-24 mb-3 pt-7 md:px-[60px] 2xl:pt-10 2xl:px-28">
          <div>
            <p className="text-2xl md:text-3xl font-bold text-center">
              Pendaftaran Akun
            </p>
            <p className="text-xs md:text-sm text-[#A5A5A5] mt-4 text-center">
              Daftar akun terlebih dahulu untuk melakukan pendaftaran siswa
            </p>
          </div>

          <div>
            <p className="font-medium">Nama</p>
            <input
              type="text"
              placeholder="Masukkan nama"
              className="w-full py-2.5 px-3 rounded border border-[#A5A5A5] mt-2"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <p className="font-medium mt-6">Email</p>
            <input
              type="email"
              placeholder="Masukkan email"
              className={`w-full py-2.5 px-3 rounded border mt-2 ${formData.emailError ? "border-red-500" : "border-[#A5A5A5]"}`}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value, emailError: "" })
              }
            />
            <p className="text-xs text-red-500">{formData.emailError}</p>

            <div className="mt-6 w-full">
              <p className="font-medium mb-2">Password</p>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan password"
                  className="w-full py-2.5 px-3 rounded border border-[#A5A5A5]"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <div
                  className="absolute inset-y-0 h-fit my-auto right-3 flex items-center cursor-pointer text-gray-600"
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
                6 characters minimum
              </p>
            </div>

            <Button
              disabled={
                !formData.email ||
                !formData.name ||
                formData.password.length < 6 ||
                isPending
              }
              onClick={handleSubmit}
              className="w-full rounded-3xl mt-12"
            >
              Sign Up
            </Button>
          </div>

          <p className="md:mt-auto text-sm text-[#828282] text-center">
            Sudah punya akun?{" "}
            <span
              className="ml-1 text-blue-500 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login disini
            </span>
          </p>
        </div>
        <img
          src="images/smile-kid-vector.png"
          alt=""
          className="hidden md:block w-[50%] xl:w-[60%] object-cover rounded-lg"
        />
      </div>
    </div>
  );
}
