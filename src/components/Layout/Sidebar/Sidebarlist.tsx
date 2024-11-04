import { ISidebarList } from "@/util/type";
import Link from "next/link";
import React from "react";
import { AiOutlineDashboard } from "react-icons/ai";

function Sidebarlist() {
  const Lists: ISidebarList[] = [
    {
      title: "Dashboard",
      url: "",
    },
    {
      title: "Home",
      url: "",
    },
    {
      title: "Update Passport",
      url: "",
    },
    {
      title: "Print FORM B ",
      url: "",
    },
    {
      title: "Print Admission Letter",
      url: "",
    },
    {
      title: "Print Application Slip",
      url: "",
    },
    {
      title: "Fill Siwes Form",
      url: "",
    },
    {
      title: "Payment Query",
      url: "",
    },
  ];

  return (
    <>
      {Lists.map((list, index) => (
        <div key={index} className="w-full border-b-[1px] border-[#021933]">
          <Link
            href={list.url}
            className="py-[14px] px-6 text-[--side-text-color] flex gap-3 items-center"
          >
            <i><AiOutlineDashboard size={23} color="#ff9d01" /></i>
            <span className="text-[15px]">{list.title}</span>
          </Link>
        </div>
      ))}
    </>
  );
}

export default Sidebarlist;
