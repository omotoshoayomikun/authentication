"use client";
import React, { useRef, useState } from "react";
import Input from "@/components/Form/Input";
import Image from "next/image";
import Link from "next/link";
import { Button1 } from "@/components/Form/Button";
import { useRouter } from "next/navigation";
import { CgSpinner } from "react-icons/cg";

function Page() {
  const router = useRouter();
  const InputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [value, setValue] = useState({
    matric_no: "",
    password: "",
  });
  const [loading, setLoading] = useState({
    login: false,
  });
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const Inputs = [
    {
      id: 1,
      label: "Matric No",
      name: "matric_no",
      type: "text",
      placeholder: "Enter your matric no",
    },
    {
      id: 2,
      label: "Password",
      type: "password",
      name: "password",
      placeholder: "Enter your password",
    },
  ];

  const handlOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    setValue({ ...value, [name]: e.target.value.trim() });
  };

  const handlLogin = async () => {
    let hasError = false;

    InputRefs.current.forEach((input, index) => {
      if (input && input.value.trim() === "") {
        input.style.borderColor = "red";
        hasError = true;
      } else if (input) {
        input.style.borderColor = "#c2c2c2";
      }
    });

    if (hasError) {
      setError(true);
      return;
    }

    try {
      setErrMsg("");
      setLoading({ ...loading, login: true });
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURL}/api/user/login`,
        {
          method: "POST",
          body: JSON.stringify(value),
        }
      );

      const data = await res.json();
      console.log(data)
      if(res.ok) {
        router.push(`pass-code/${data.data.user_id}`);
        setLoading({ ...loading, login: false });
      } else {
        setLoading({ ...loading, login: false });
        setErrMsg(data.message);
      }

    } catch (err: any) {
      console.log(err.message);
      setLoading({ ...loading, login: false });
      setErrMsg("An Error occurred. Resend!!!");
    }
  };

  return (
    <>
      <div className={`login_container`}>
        <div className={`login_card`}>
          <div className="flex justify-center items-center flex-col">
            <Image
              src="/images/logo2.png"
              alt="Logo image"
              width={190}
              height={40}
            />
            <hr className="mt-[1rem] mb-[1rem] border-t-1.5 border-t-[rgba(0,0,0,.1)] border-solid w-full" />
            <h3 className="mb-5 text-[22px] font-bold">ND/HND LOGIN</h3>
          </div>
          <div>
            {Inputs.map((input, index) => (
              <div className="mb-5" key={input.id}>
                <Input
                  {...input}
                  value={value[input["name"] as keyof typeof value]}
                  handleOnchange={handlOnChange}
                  ref={(el: HTMLInputElement | null) => {
                    InputRefs.current[index] = el;
                  }}
                />
              </div>
            ))}
            <div className="text-center font-bold mt-[-12px] text-red-700">{errMsg}</div>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <input type="checkbox" name="" id="" />
                <small className="font-bold text-[12px]">Remember Me</small>
              </div>
              <div className="">
                <Link
                  href=""
                  className="text-[15px] text-[--anchor-text-color] cursor-pointer"
                >
                  Forget Password
                </Link>
              </div>
            </div>
            <div className="">
              <Button1
                title={`Login`}
                handleClick={handlLogin}
                disabled={loading.login}
              />
            </div>
            <div className="ml-auto mr-auto w-[max-content] mt-2">
              <Link
                href="/register"
                className="text-center text-[--anchor-text-color] text-[12px]"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
