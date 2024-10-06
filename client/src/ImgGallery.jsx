import React, { useState } from "react";
import PhotosPage from "./pages/PhotosPage";

const ImgGallery = ({placeData}) => {
  const [showAllPhoto, setShowAllPhoto] = useState(false);

  if (showAllPhoto) {
    return (
      <div className="min-h-screen z-50 relative ">
        <PhotosPage
          className=""
          setShowAllPhoto={setShowAllPhoto}
          placeData={placeData}
        />
      </div>
    );
  }

  return (
    <div className=" relative grid gap-2  grid-cols-[2fr_1fr] lg:mx-7 rounded-3xl overflow-hidden">
      <div className="flex">
        {/* here ?.  checks if  placeData.photos is not null then get its [0] element*/}

        {placeData.photos?.[0] && (
          <img
            src={`http://localhost:4000/uploads/${placeData.photos[0]}`}
            alt=""
            className="object-cover cursor-pointer"
            onClick={() => setShowAllPhoto(true)}
          />
        )}
      </div>
      <div className="grid  gap-2 ">
        {placeData.photos?.[1] && (
          <img
            src={`http://localhost:4000/uploads/${placeData.photos[1]}`}
            alt=""
            className="aspect-square  object-cover cursor-pointer"
            onClick={() => setShowAllPhoto(true)}
          />
        )}

        <div className="">
          {placeData.photos?.[2] && (
            <img
              src={`http://localhost:4000/uploads/${placeData.photos[2]}`}
              alt=""
              className="aspect-square  object-cover cursor-pointer"
              onClick={() => setShowAllPhoto(true)}
            />
          )}
        </div>
      </div>

      {/* setShowAllPhoto button */}
      <button
        onClick={() => setShowAllPhoto(true)}
        className="z-30 bg-white p-2 m-3 absolute bottom-0 right-0 rounded-2xl cursor-pointer shadow-md hover:shadow-gray-900"
      >
        <i className="fa-solid fa-image"></i>
        <span className="ml-2">Show All Photos</span>
      </button>
    </div>
  );
};

export default ImgGallery;
