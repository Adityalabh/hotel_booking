import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import PhotosPage from "./PhotosPage";
import Pricebadge from "../Pricebadge";
import ImgGallery from "../ImgGallery";
import FooterPage from "./footerPage.jsx";

const ShowPage = () => {
  const { id } = useParams();
  const [placeData, setPlaceData] = useState([]);
  // const [showAllPhoto, setShowAllPhoto] = useState(false);

  useEffect(() => {
    if (!id) {
      return <div>Loading.......</div>;
    }
    axios
      .get(`/show/${id}`)
      .then(({ data }) => {
        setPlaceData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle error as needed
      });
  }, [id]);

  if (!placeData) {
    <div>Loading......</div>;
  }

  let commonStyle = {
    head: "text-3xl  mt-5 mb-3 lg:ml-6",
    cont: "text-justify pl- text-lg leading-relaxed max-w-[80vw] lg:ml-6",
    rules: "text-md my-3 text-gray-500 pl-3 lg:ml-3 -ml-3",
  };

  return (
    <div className="pb-7 w-full">
      <div className="px-8  ">
        {/* Title */}
        <div className=" lg:mx-8 mb-3">
          <h1 className="text-2xl lg:text-3xl font-semibold mb-2">
            {placeData.title}
          </h1>
          {/* Address */}
          <a
            className="text-xl  curosr-pointer underline"
            href={`https://maps.google.com/?q=${placeData.address}`}
          >
            <span>
              <i className="fa-solid fa-location-dot"></i>
            </span>
            &nbsp;{placeData.address}
          </a>
        </div>

        {/* Photos */}
        <ImgGallery placeData={placeData} />

        {/* Description */}
        <div className="grid lg:grid-cols-[2fr_1fr] max-w-[90vw]">
          <div>
            <h2 className={commonStyle.head}>Description</h2>
            <p className={commonStyle.cont}>{placeData.description}</p>
          </div>

          {/* Price */}
          <Pricebadge placeData={placeData} />
        </div>

        {/* ExtraInfo */}
        <div>
          <h2 className={commonStyle.head}>Extra Info</h2>
          <p className={commonStyle.cont}>{placeData.extraInfo}</p>
        </div>

        {/* House Rules */}
        <div className="">
          <h2 className={commonStyle.head}>House rules</h2>
          <div>
            <h2 className={commonStyle.rules}>
              <span>
                <i className="fa-regular fa-clock mr-3 text-xl"></i>
              </span>
              Check-in: {placeData.checkIn}:00 am
            </h2>
            <h2 className={commonStyle.rules}>
              <span>
                <i className="fa-regular fa-clock mr-3 text-xl"></i>
              </span>
              Checkout before: {placeData.checkOut}:00 pm
            </h2>
            <h2 className={commonStyle.rules}>
              <i className="fa-solid fa-users text-xl mr-3 "></i> Max guest
              {placeData.maxGuest}
            </h2>
          </div>
        </div>
      </div>
      <div className="">
        <FooterPage />
      </div>
    </div>
  );
};

export default ShowPage;
