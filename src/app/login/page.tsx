"use client";
import { localStorageMixins } from "@/localStorage.mixins";
import { postLogin } from "@/service/api/auth";
import { useRequest } from "ahooks";
import { CloseCircle } from "iconsax-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface LoginProps {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const [login, setLogin] = useState<LoginProps>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<boolean>(false);

  const { runAsync, loading } = useRequest(postLogin, { manual: true });

  const handleLogin = () => {
    runAsync(login)
      .then((res) => {
        console.log(res);
        localStorageMixins.set("access_token", res.result.access_token);
        localStorageMixins.set("profile", res.result.profile);
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  };

  // useEffect(() => {
  //   if (localStorageMixins.get(`access_token`)) {
  //     router.push("/");
  //   }
  // }, []);
  return (
    <div className={`flex items-center justify-center   w-full h-screen`}>
      <div
        className={` w-full max-w-[500px] h-full flex items-center bg-[#F0F0F0]  text-black px-6 py-3`}
      >
        <form className="w-full">
          <div
            className={`flex flex-col gap-10 p-6 bg-white rounded-lg shadow-lg w-full`}
          >
            <div className={`text-3xl text-center`}>Login</div>
            <div className={`flex flex-col gap-3`}>
              <div className="flex flex-col gap-2">
                <label htmlFor={`email`}>Email</label>
                <input
                  value={login.email}
                  onChange={(e) => {
                    setLogin({ ...login, email: e.target.value });
                    setError(false);
                  }}
                  className={`px-3 py-2 border rounded-lg border-opacity-20 border-black focus:outline-none focus:border-primary focus:border-2 focus:shadow-md transition-all duration-150 active:outline-none`}
                  placeholder={`Enter email`}
                  id={`email`}
                  type={`text`}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor={`email`}>Password</label>
                <input
                  value={login.password}
                  onChange={(e) => {
                    setLogin({ ...login, password: e.target.value });
                    setError(false);
                  }}
                  className={`px-3 py-2 border rounded-lg border-opacity-20 border-black focus:outline-none focus:border-primary focus:border-2 focus:shadow-sm transition-all duration-150 active:outline-none`}
                  placeholder={`Enter password`}
                  id={`email`}
                  type={`password`}
                  required
                />
              </div>
              {error && (
                <div
                  className={`flex items-center gap-2   text-red-500 rounded-lg px-2`}
                >
                  {/* <CloseCircle /> */}
                  Invalid Email/Password
                </div>
              )}
            </div>

            <div>
              <button
                disabled={loading}
                onClick={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}
                className={`bg-primary hover:bg-orange-700 text-white px-5 py-2 rounded-lg w-full transition-all duration-150 disabled:bg-gray-500`}
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
