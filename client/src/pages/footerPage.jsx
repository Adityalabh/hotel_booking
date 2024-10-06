import React from "react";

const FooterPage = () => {
  return (
    <footer className=" w-full mb-4">
      <hr className="border border-gray-300 w-full" />

      <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mt-7 ml-7 ">

        <ul className="flex flex-col gap-3">
          <h1 className="font-bold">Support</h1>
          <li>Help Center</li>
          <li>Get Helpwith safety issue</li>
          <li>Air Cover</li>
          <li>Cancellation</li>
        </ul>

        <ul  className="flex flex-col gap-3 ">
          <h1 className="font-bold">Hosting</h1>
          <li>Airbnb you home </li>
          <li>Hosting resources</li>
          <li>Community forum</li>
          <li>Hosting responsibility</li>
        </ul>

        <ul  className="flex flex-col gap-3">
          <h1 className="font-bold">Airbnb</h1>
          <li>Newsroom</li>
          <li>New features</li>
          <li>Careers</li>
          <li>Investors</li>
        </ul>
      </div>
    </footer>
  );
};

export default FooterPage;
