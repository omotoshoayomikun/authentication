"use client";
import React, { useEffect, useState } from "react";
import Input, { Select } from "@/components/Form/Input";
import Image from "next/image";
import Link from "next/link";
import Modal from "react-modal";
import { Button1 } from "@/components/Form/Button";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ToastOption } from "../../../../lib/Data";
import { PostApi } from "../../../../lib/Action";

function Page() {
  const router = useRouter();

  type ValueType = {
    email: string;
    matric_no?: string;
    firstname: string;
    lastname: string;
    middlename: string;
    phone: string;
    department: string;
    year: string;
    type: string;
    program: string,
    password: string;
  };

  const [value, setValue] = useState<ValueType>({
    email: "",
    // matric_no: "",
    firstname: "",
    lastname: "",
    middlename: "",
    phone: "",
    department: "",
    year: "",
    program: "",
    type: "",
    password: "",
  });

  const [loading, setLoading] = useState({
    login: false,
  });
  
  const [errMsg, setErrMsg] = useState("");

  const [modelInfo, setModelInfo] = useState({
    matric_no: "",
    isOpen: false,
  })

  const Inputs = [
    {
      id: 1,
      label: "Last Name",
      name: "lastname",
      type: "text",
      required: true,
      placeholder: "Enter your last name",
    },
    {
      id: 2,
      label: "First Name",
      type: "text",
      name: "firstname",
      required: true,
      placeholder: "Enter your first name",
    },
    {
      id: 3,
      label: "Middle Name",
      type: "text",
      name: "middlename",
      required: true,
      placeholder: "Enter your middle name",
    },
    {
      id: 4,
      label: "Email",
      type: "email",
      name: "email",
      required: true,
      placeholder: "Enter your email address",
    },
    // {
    //   id: 5,
    //   label: "Matric No",
    //   type: "text",
    //   name: "matric_no",
    //   placeholder: "Enter your matric number",
    // },
    {
      id: 6,
      label: "Phone Number",
      maxLength: "11",
      type: "tel",
      name: "phone",
      required: true,
      placeholder: "Enter your phone number",
    },
  ];

  const SelectInputs = [
    {
      id: 1,
      label: "Department",
      name: "department",
      options: [{ value: "CS", label: "Computer Science" }],
      required: true,
    },
    {
      id: 2,
      label: "Year",
      name: "year",
      options: [
        { value: "22", label: "2022" },
        { value: "23", label: "2023" },
        { value: "24", label: "2024" },
        { value: "25", label: "2025" },
      ],
      required: true,
    },
    {
      id: 3,
      label: "Program",
      name: "program",
      options: [
        { value: "HND", label: "HND" },
        { value: "ND", label: "ND" },
      ],
      required: true,
    },
    {
      id: 4,
      label: "Type of Program",
      name: "type",
      options: [
        { value: "F", label: "Full Time" },
        { value: "P", label: "Part Time" },
      ],
      required: true,
    },
  ];

  console.log(value)

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

  const handleSelectOnchange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    setValue({ ...value, [name]: e.target.value.trim() });
  };

  const handlRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    
    try {
      setLoading({ ...loading, login: true });
      setErrMsg("");
      const response = await PostApi(`api/user/register`, value);
      if (response.success) {
        setErrMsg("");
        setModelInfo({
          matric_no: response.data.matric_no,
          isOpen: true,
        })
      } else {
        setErrMsg(response.message);
      }
    } catch (err:any) {
      setErrMsg(err.message);
    } finally {
      setLoading({ ...loading, login: false });
    }

  };

  const handleDone = () => {
    setModelInfo({...modelInfo, isOpen: false})
    router.push('/login')
  }

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
          <form onSubmit={(e) => handlRegister(e)}>
            <div className="mb-5 grid md:grid-cols-2 gap-4">
              {Inputs.map((input) => (
                <Input
                  key={input.id}
                  {...input}
                  value={value[input["name"] as keyof typeof value]}
                  handleOnchange={handleOnchange}
                />
              ))}
                {SelectInputs.map((input) => (
                  <Select
                    key={input.id}
                    {...input}
                    value={value[input["name"] as keyof typeof value]}
                    handleOnchange={handleSelectOnchange}
                  />
                ))}
            </div>
            <div className="text-center font-bold mt-[-12px] text-red-700">{errMsg}</div>
            <div className="">
              <Button1
                title="Register"
                type="submit"
                disabled={loading.login}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="flex items-center justify-center ">
        <Modal
          isOpen={modelInfo.isOpen}
          onRequestClose={() => setModelInfo({...modelInfo, isOpen: false})}
          contentLabel="success"
          className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-10"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
          <div className="bg-white rounded-3xl shadow-lg w-full max-w-md p-7 flex flex-col items-center m-3">
            <div className="p-3 mt-9 flex justify-center items-center">
              <img
                src="/images/success-icon.png"
                alt="success"
                width={100}
                height={100}
                className="w-full h-auto items-center"
              />
            </div>
            <div className="mb-4">
              <p className="font-semibold text-[26px] text-[#000000]">
                SUCCESSFULL
              </p>
            </div>
            <div className="flex justify-between items-center mb-4">
              <p className="font-medium text-center text-[16px] text-[#000000]">
                Your Matric No is <b className="text-[25px] text-green-700">{modelInfo.matric_no}</b>
              </p>
            </div>
            <button
              onClick={handleDone}
              className="mt-6 bg-[#ffff] z-20 font-montserrat py-3 px-20 text-[#8E1011] border-[1.5px] border-[#8E1011] rounded-full uppercase w-full h-[60px]"
            >
              done
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default Page;
