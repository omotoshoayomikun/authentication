"use client";
import { OutlineCard } from "@/components/Form/Card";
import { useRouter } from "next/navigation";
import React from "react";
import { CiChat1, CiMail, CiUnlock } from "react-icons/ci";

const Page = () => {
  const InputStyles = {
    padding: "5px",
    height: "60px",
    "font-size": "30px",
    "text-align": "center",
    "font-weight": "bold",
  };
  const userId = "66e837074721419700244bcc";
  const router = useRouter();

  const handleSend = () => {
    router.push("/dashboard");
  };

  const handOption = async (
    e: React.MouseEvent<HTMLDivElement>,
    option: string
  ) => {
    if (option === "email") {
      router.push("/pass-code");
    }
    if (option === "phone") {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASEURL}/api/user/mobile-code/${userId}`
        );
        const data = await res.json();
        if (res.ok) {
          router.push(`/pass-code/${userId}`);
        } else {
          alert("Failed to send code");
        }
        // router.push(`/mobile-code/${userId}`)
      } catch (err) {
        console.log(err);
      }
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
              icon={<CiMail size={25} />}
            />
            <OutlineCard
              text="Phone"
              handOutlineCard={(e: React.MouseEvent<HTMLDivElement>) =>
                handOption(e, "phone")
              }
              icon={<CiChat1 size={25} />}
            />
            <OutlineCard
              text="Secret questions"
              handOutlineCard={(e: React.MouseEvent<HTMLDivElement>) =>
                handOption(e, "secret")
              }
              icon={<CiUnlock size={25} />}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
