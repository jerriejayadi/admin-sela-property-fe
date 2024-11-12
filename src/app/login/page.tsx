"use client";
import FeedbackModals from "@/components/Atoms/Modals/FeedbackModals";
import { localStorageMixins } from "@/localStorage.mixins";
import { postLogin, PostLoginGoogle } from "@/service/api/auth";
import { useGoogleLogin } from "@react-oauth/google";
import { useRequest } from "ahooks";
import { AxiosError } from "axios";
import { CloseCircle, Google, Warning2 } from "iconsax-react";
import Image from "next/image";
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
  const [access_token, setAccessToken] = useState<string>("");
  const [failedModal, setFailedModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<AxiosError | any>();

  const { runAsync, loading } = useRequest(postLogin, { manual: true });

  const handleLogin = () => {
    runAsync(login)
      .then((res) => {
        localStorageMixins.set("access_token", res.result.access_token);
        localStorageMixins.set("profile", res.result.profile);
        router.push("/");
      })
      .catch((err) => {
        setError(true);
      });
  };

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      onSuccessGoogleLogin(tokenResponse);
    },
  });

  const onSuccessGoogleLogin = async (googleResponse: any) => {
    try {
      // code request to backend
      const tokenGoogle = googleResponse?.access_token;
      PostLoginGoogle({ token: tokenGoogle })
        .then((res) => {
          localStorageMixins.set("access_token", res.result.access_token);
          localStorageMixins.set("profile", res.result.profile);
          setAccessToken(res.result.access_token);
        })
        .catch((error) => {
          setFailedModal(true);
          setErrorMessage(error);
        });
    } catch (error) {
      // catch some error
    }
  };

  useEffect(() => {
    if (localStorageMixins.get(`access_token`)) {
      router.push("/");
    }
  }, [access_token]);
  return (
    <div className={`flex items-center justify-center   w-full h-screen`}>
      <div
        className={` w-full max-w-[500px] h-full flex items-center bg-[#F0F0F0]  text-black px-6 py-3`}
      >
        <form className="w-full">
          <div
            className={`flex flex-col gap-6 p-6 bg-white rounded-lg shadow-lg w-full`}
          >
            <div>
              <p className={`text-3xl`}>Login</p>
              <p className={`text-lg mt-2 text-gray-400`}>
                Login to Sela Admin Dashboard
              </p>
            </div>

            {/* <div className={`flex flex-col gap-3`}>
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
                  <CloseCircle />
                  Invalid Email/Password
                </div>
              )}
            </div> */}

            <div>
              {/* <button
                disabled={loading}
                onClick={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}
                className={`bg-primary hover:bg-orange-700 text-white px-5 py-2 rounded-lg w-full transition-all duration-150 disabled:bg-gray-500`}
              >
                Login
              </button>
              <div className="relative flex items-center py-4">
                <div className="flex-grow border-t border-gray-400"></div>
                <span className="flex-shrink mx-4 text-gray-400">or</span>
                <div className="flex-grow border-t border-gray-400"></div>
              </div> */}

              <button
                type={`button`}
                onClick={() => {
                  googleLogin();
                }}
                className={`w-full flex items-center justify-center rounded-md  px-3 py-2 gap-4 bg-primary text-white border border-primary active:brightness-90 md:hover:brightness-90 transition-all duration-150`}
              >
                {/* <Image
                  alt={`google-icons`}
                  src={`/icons/google.png`}
                  width={1000}
                  height={1000}
                  className={`size-8 bg-white rounded-md p-1`}
                />{" "} */}
                <Google variant={`Bold`} />
                Sign in with Google
              </button>
            </div>
          </div>
        </form>
      </div>
      <FeedbackModals
        icons={<Warning2 className={`size-20`} />}
        title={"Failed to Login"}
        open={failedModal}
        onClose={function (): void {
          setFailedModal(false);
        }}
        actionText="Try Again"
        onAction={() => {
          setFailedModal(false);
        }}
      >
        <p>
          {errorMessage?.response?.status} -{" "}
          {errorMessage?.response?.data?.message}
        </p>
        <p className={`mt-1`}>
          {errorMessage?.response.status === 401 &&
            "Your email may be not registered. Contact the Admin for further information"}
          {errorMessage?.response.status === 500 &&
            "There is an error on our side. Please try again later!"}
        </p>
      </FeedbackModals>
    </div>
  );
}
