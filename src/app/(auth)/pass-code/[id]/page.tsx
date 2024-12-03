"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button1 } from "@/components/Form/Button";
import Input from "@/components/Form/Input";
import { IInput } from "@/util/type";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { MdMarkEmailRead } from "react-icons/md";
import { CgSpinner } from "react-icons/cg";
import { GetApi, VerityPostApi } from "../../../../../lib/Action";
// import styles from "./Form.module.css";

const Inputs = [
  {
    id: 1,
    maxLenght: 1,
    name: "first",
  },
  {
    id: 2,
    maxLenght: 1,
    name: "second",
  },
  {
    id: 3,
    maxLenght: 1,
    name: "third",
  },
  {
    id: 4,
    maxLenght: 1,
    name: "fourth",
  },
];

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const InputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [value, setValue] = useState({
    first: "",
    second: "",
    third: "",
    fourth: "",
  });
  const [loading, setLoading] = useState({
    verify: false,
    resend: false,
  });
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const [time, setTime] = useState(300);
  useEffect(() => {
    if (time === 0) return;

    const timer = setInterval(() => {
      setTime(time - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}m:${seconds}s`;
  };

  const updateTimer = (tyme:number) => {
    // if (time === 0) return;
    setInterval(() => {
      setTime(tyme - 1);
    }, 1000);

  }

  const [code, setCode] = useState(``);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    name: string
  ) => {
    // const { value } = e.target;

    setValue({ ...value, [name]: e.target.value.trim() });

    if (e.target.value.length === 1 && index < InputRefs.current.length - 1) {
      InputRefs.current[index + 1]?.focus();
    }
  };
  // console.log(value);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (
      e.key === "Backspace" &&
      index > 0 &&
      (e.target as HTMLInputElement).value === ""
    ) {
      InputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendOtp = async () => {

    try {
      setLoading({ ...loading, resend: true });
      const response = await GetApi(`api/user/resend-otp/${params.id}`);
      if (response.success) {
        setTime(300);
        // updateTimer(300);
        setLoading({ ...loading, resend: false });
      }
    } catch (err: any) {
      console.log(err.message);
      setLoading({ ...loading, resend: false });
    }
  };

  const handleVerify = async () => {
    let hasError = false;
    InputRefs.current.forEach((input, index) => {
      if (input && input.value.trim() === "") {
        input.style.borderColor = "red";
        hasError = true;
      } else if (input) {
        input.style.borderColor = "#007bff";
      }
    });

    if (hasError) {
      setError(true);
      return;
    }

    const code = `${value.first}${value.second}${value.third}${value.fourth}`;
    console.log(code);
    if (
      value.first !== "" &&
      value.second &&
      value.third !== "" &&
      value.fourth !== ""
    ) {


      
    
    try {
      setLoading({ ...loading, verify: true });
      setErrMsg("");
      const response = await VerityPostApi(`api/user/verify-otp/${params.id}`, {code: code});
      if (response.success) {
        setLoading({ ...loading, verify: false });
        router.replace("/dashboard");

      } else {
        InputRefs.current.forEach((input, index) => {
          if (input) {
            input.style.borderColor = "red";
          }
        });


      setErrMsg(response.message);
      }
    } catch (err:any) {
        InputRefs.current.forEach((input, index) => {
          if (input) {
            input.style.borderColor = "red";
          }
        });


      setErrMsg(err.message);
    } finally {
      setLoading({ ...loading, verify: false });
    }

    }
  };

  return (
    <>
      <div className="login_container">
        <div className={`login_card`} style={{ paddingTop: "1.5rem" }}>
          <div className="text-center text-[ --anchor-text-color] flex justify-center mb-4">
            <MdMarkEmailRead size={90} color="#0051a9" />
          </div>
          <h4 className="text-[17px] text-center">Please check your email</h4>
          <p className="text-center text-[14px] text-[--side-text-color]">
            We&apos;ve sent a code to your registered mail
          </p>
          <p className="text-center text-[14px] text-[--side-text-color] mb-5 mt-2">
            The OTP will expire in {formatTime(time)}
          </p>
          <div className="flex justify-between gap-3">
            {Inputs.map((input, index) => (
              <div key={index}>
                <input
                  className={`bg-transparent w-full p-1 h-16 text-[30px] text-center rounded-lg border-solid border-[--anchor-text-color] border-[1px] font-bold mt-1`}
                  type="text"
                  value={value[input["name"] as keyof typeof value]}
                  onChange={(e) => handleChange(e, index, input.name)}
                  maxLength={1}
                  ref={(el: HTMLInputElement | null) => {
                    InputRefs.current[index] = el;
                  }}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              </div>
            ))}
          </div>
          <div className="text-center font-bold mt-2 text-red-700">
            {errMsg}
          </div>
          <div className="mt-2">
            <div className="text-[13px] text-center flex justify-center items-center text-[--side-text-color]">
              Didn&apos;t get the code?{" "}
              {loading.resend ? (
                <CgSpinner size={20} className="animate-spin ml-2" />
              ) : (
                <span
                  className="underline text-[--anchor-text-color] cursor-pointer ml-2"
                  onClick={handleResendOtp}
                >
                  Click to send
                </span>
              )}
            </div>
          </div>
          <div className="flex justify-center">
            <Button1
              title="Verify"
              handleClick={handleVerify}
              styles={{ width: "max-content", paddingInline: "40px" }}
              disabled={loading.verify}
            />
          </div>
          <div className="flex justify-center mt-2 text-[--anchor-text-color] cursor-pointer">
            <Link href={`/pass-option/${params.id}`}>
              Login using another means
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
