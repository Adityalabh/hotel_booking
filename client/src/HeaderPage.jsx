import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContextProvider";

const HeaderPage = () => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <header className=" flex  py-3 justify-between items-center ">
        <Link to={"/"} className=" flex gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.2}
            stroke="red"
            className=" size-9 -rotate-90 "
            
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>

          <span className="font-bold text-2xl">WeStay</span>
        </Link>

        <div className="flex gap-2 border border-gray-400 rounded-full text-red-700  px-4 py-2  shadow-md shadow-red-300">
          <div>Any Where</div>
          <div className="border-l border-gray-400 "></div>
          <div>Any Week</div>
          <div className="border-l border-gray-400 "></div>
          <div className="pr-1">Any Time</div>
          
        </div>

        {/* If user is true means if user logged in which stores in uer states then redirect to account page */}
        <Link
          to={user ? "/account" : "/login"}
          className="flex items-center  gap-1 border border-gray-400 rounded-full px-3 py-1  shadow-md shadow-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>

          <button className=" rounded-full p-0.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {!!user && <div>{user.userName}</div>}
        </Link>
      </header>
      <hr />
    </div>
  );
};

export default HeaderPage;
