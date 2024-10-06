import axios from "axios";
import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContextProvider";
import FooterPage from "./footerPage";

const LogoutPage = () => {
  const [redirect, setRedirect] = useState(false);
  const { user, setUser } = useContext(UserContext);

  async function logout() {
    await axios.post("/logout");
    setRedirect(true);
    setUser(null);
  }

  //this work after logout
  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className=" min-h-screen flex flex-col  justify-between">
      <div className=" text-center max-w-lg mx-auto mt-4  bg-gray-200">
        <div className="grid grid-cols-[1fr_2fr] p-7 gap-4 ">

          <div className="bg-gray-300 rounded-full px-5 py-5" >
          <i class="fa-solid fa-user text-8xl"></i>
          </div>

          <div className="text-xl flex flex-col justify-center items-start">
            <h2><span className="text-red-600">Username</span> : "{user.userName}"</h2>
            <h2><span className="text-red-600">Email</span> : "{user.email}"</h2>
          </div>

        </div>
        <button
          onClick={logout}
          className="primary mt-4 max-w-sm  py-2 rounded-full"
        >
          LogOut
        </button>
      </div>

      <div className="">
        <FooterPage />
      </div>
    </div>
  );
};

export default LogoutPage;
