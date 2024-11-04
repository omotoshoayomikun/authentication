"use client";
import React, { useEffect, useState } from "react";
import Input from "@/components/Form/Input";
import Image from "next/image";
import Link from "next/link";
import { Button1 } from "@/components/Form/Button";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ToastOption } from "../../../../lib/Data";

function Page() {
  const router = useRouter();

  type ValueType = {
    email: string;
    matric_no: string;
    firstname: string;
    lastname: string;
    middlename: string;
    phone: string;
    password: string;
  };

  const [value, setValue] = useState<ValueType>({
    email: "",
    matric_no: "",
    firstname: "",
    lastname: "",
    middlename: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState({
    login: false,
  });

  const Inputs = [
    {
      id: 1,
      label: "Last Name",
      name: "lastname",
      type: "text",
      placeholder: "Enter your last name",
    },
    {
      id: 2,
      label: "First Name",
      type: "text",
      name: "firstname",
      placeholder: "Enter your first name",
    },
    {
      id: 3,
      label: "Middle Name",
      type: "text",
      name: "middlename",
      placeholder: "Enter your middle name",
    },
    {
      id: 4,
      label: "Email",
      type: "email",
      name: "email",
      placeholder: "Enter your email address",
    },
    {
      id: 5,
      label: "Matric No",
      type: "text",
      name: "matric_no",
      placeholder: "Enter your matric number",
    },
    {
      id: 6,
      label: "Phone Number",
      type: "tel",
      name: "phone",
      placeholder: "Enter your phone number",
    },
  ];

  useEffect(() => {
    setValue((prevValue) => ({
      ...prevValue,
      password: prevValue.lastname,
    }));
  }, [value.lastname]);

  const handleOnchange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    setValue({ ...value, [name]: e.target.value.trim() });
  };

  const handlRegister = async () => {
    const BaseUrl = process.env.NEXT_PUBLIC_BASEURL;
    try {
      setLoading({ ...loading, login: true });
      const response = await fetch(`${BaseUrl}/api/user/register`, {
        method: "POST",
        body: JSON.stringify(value),
      });

     const res = await response.json();

      if(response.ok) {
        toast.success(res.message, ToastOption);
        router.push("/login");
      } else {
        toast.error("An Error!!!!", ToastOption);
        setLoading({ ...loading, login: false });
      }

    } catch (err: any) {
      setLoading({ ...loading, login: false });
      toast.error(err.message, ToastOption);
      console.log(err)
    }

  };

  return (
    <>
      <div className={`login_container`}>
        <div className={`reg_card `}>
          <div className="flex justify-center items-center flex-col">
            <Image
              src="/images/logo2.png"
              alt="Logo image"
              width={190}
              height={40}
            />
            <hr className="mt-[1rem] mb-[1rem] border-t-1.5 border-t-[rgba(0,0,0,.1)] border-solid w-full" />
            {/* <h3 className="mb-5 text-[22px] font-bold">ND/HND LOGIN</h3> */}
          </div>
          <div>
            <div className="mb-5 grid md:grid-cols-2 gap-4">
              {Inputs.map((input) => (
                <Input
                key={input.id}
                  {...input}
                  value={value[input["name"] as keyof typeof value]}
                  handleOnchange={handleOnchange}
                />
              ))}
            </div>
            <div className="flex justify-between mt-3">
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
              <Button1 title="Register"  disabled={loading.login} handleClick={handlRegister} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
