import React from "react";
import HeaderPage from "./HeaderPage";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  // const location = useLocation();
  // const noHeader = ['']
  return (
    //here outlet is used for nested routing which serves as a placeholder for rendering matched child routes.
    <div className="flex flex-col relative overflow-x-hidden min-h-screen  ">
      <div className=" fixed w-[100vw] z-10 px-3 shadow-sm shadow-red-700 bg-white">
        <HeaderPage />
      </div>
      <div className="  pt-[100px] bg-gray-200 w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
