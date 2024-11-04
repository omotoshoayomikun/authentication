import React from "react";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="w-full h-full flex">
        <div className="w-[280px] h-[100vh] fixed top-0 left-0">
          <Sidebar />
        </div>
        <div className="w-full ml-[280px]">
          <Navbar />
          <div className="p-8">{children}</div>
        </div>
      </div>
    </>
  );
}

export default Layout;
