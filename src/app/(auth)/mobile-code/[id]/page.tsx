"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button1 } from "@/components/Form/Button";
import Input from "@/components/Form/Input";
import { IInput } from "@/util/type";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RiMessage2Fill } from "react-icons/ri";
// import styles from "./Form.module.css";

const Page = () => {
  const InputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  const [value, setValue] = useState({
    first: "",
    second: "",
    third: "",
    fourth: "",
  });

  const handleVerify = () => {
    // router.push("/dashboard");
  };

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
  // Initialize the ref array to match the length of Values
  // useEffect(() => {
  //   InputRefs.current = InputRefs.current.slice(0, Inputs.length);
  // }, [Inputs.length]);

  
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

  const handleResendOtp = () => {

  }

  return (
    <>
      <div className="login_container">
        <div className={`login_card`} style={{ paddingTop: "1.5rem" }}>
          <div className="text-center text-[ --anchor-text-color] flex justify-center mb-4">
            <RiMessage2Fill size={90} color="#0051a9" />
          </div>
          <h4 className="text-[17px] text-center">Please check your phone</h4>
          <p className="text-center text-[14px] text-[--side-text-color]">
            We&apos;ve sent a code to your phone number
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
          <div className="mt-2">
            <div className="text-[13px] text-center  text-[--side-text-color]">
              Didn&apos;t get the code?{" "}
              <span
                className="underline text-[--anchor-text-color] cursor-pointer"
                onClick={handleResendOtp}
              >
                Click to send
              </span>
            </div>
          </div>
          <div className="flex justify-center">
            <Button1
              title="Verify"
              handleClick={handleVerify}
              styles={{ width: "max-content", paddingInline: "40px" }}
            />
          </div>
          <div className="flex justify-center mt-2 text-[--anchor-text-color] cursor-pointer">
            <Link href="/pass-option">Login using another means</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
