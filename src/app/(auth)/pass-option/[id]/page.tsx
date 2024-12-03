"use client";
import { OutlineCard } from "@/components/Form/Card";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { CiChat1, CiMail, CiUnlock } from "react-icons/ci";
import { GetApi } from "../../../../../lib/Action";
import { toast } from "react-toastify";
import { ToastOption } from "../../../../../lib/Data";

const Page = () => {
  const params = useParams();
  const InputStyles = {
    padding: "5px",
    height: "60px",
    "font-size": "30px",
    "text-align": "center",
    "font-weight": "bold",
  };
  const userId = params.id;
  const router = useRouter();

  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const [loading, setLoading] = useState({
    phone: false,
    email: false,
  });

  const handleSend = () => {
    router.push("/dashboard");
  };

  const handOption = async (
    e: React.MouseEvent<HTMLDivElement>,
    option: string
  ) => {
    if (option === "email") {
      try {
        setLoading({ ...loading, email: true });
        const response = await GetApi(`api/user/resend-otp/${userId}`);
        if (response.success) {
          setLoading({ ...loading, email: false });
          router.push(`/pass-code/${userId}`);
        } else {
          toast.error(response.message, ToastOption);
        }
      } catch (err: any) {
        console.log(err.message);
        toast.error(err.message, ToastOption);
        setLoading({ ...loading, email: false });
      } finally {
        setLoading({ ...loading, phone: false });
      }
    }
    if (option === "phone") {
      try {
        setLoading({ ...loading, phone: true });
        setErrMsg("");
        const response = await GetApi(`api/user/mobile-code/${userId}`);
        if (response.success) {
          setLoading({ ...loading, phone: false });
          router.push(`/mobile-code/${userId}`);
        } else {
          setErrMsg(response.message);
          toast.error(response.message, ToastOption);
        }
      } catch (err: any) {
        toast.error(err.message, ToastOption);
        setErrMsg(err.message);
      } finally {
        setLoading({ ...loading, phone: false });
      }

      // try {
      //   const res = await fetch(
      //     `${process.env.NEXT_PUBLIC_BASEURL}/api/user/mobile-code/${userId}`
      //   );
      //   const data = await res.json();
      //   if (res.ok) {
      //     router.push(`/pass-code/${userId}`);
      //   } else {
      //     alert("Failed to send code");
      //   }
      //   // router.push(`/mobile-code/${userId}`)
      // } catch (err) {
      //   console.log(err);
      // }
    }
  };
  return (
    <>
      <div className="login_container">
        <div className={`login_card`} style={{ padding: "15px" }}>
          <h4 className="text-[25px] mb-5 text-center">Select Other Option</h4>
          <div className="">
            <OutlineCard
              text="Email"
              handOutlineCard={(e: React.MouseEvent<HTMLDivElement>) =>
                handOption(e, "email")
              }
              loading={loading.email}
              icon={<CiMail size={25} />}
            />
            <OutlineCard
              text="Phone"
              handOutlineCard={(e: React.MouseEvent<HTMLDivElement>) =>
                handOption(e, "phone")
              }
              loading={loading.phone}
              icon={<CiChat1 size={25} />}
            />
            {/* <OutlineCard
              text="Secret questions"
              handOutlineCard={(e: React.MouseEvent<HTMLDivElement>) =>
                handOption(e, "secret")
              }
              icon={<CiUnlock size={25} />}
            /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
