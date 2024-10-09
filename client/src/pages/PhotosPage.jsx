import React from "react";

const PhotosPage = ({placeData,setShowAllPhoto}) => {
  
  // showing list of all photos after clicking show button on photos
  return (
    <div className="-mt-[100px] bg-black z-50 p-2 max-w-full text-white">
      <h1 className="text-3xl pt-12 pb-4 px-12">All places photos:</h1>
      <button
        onClick={() => setShowAllPhoto(false)}
        className=" right-0 mr-11 -mt-7 rounded-2xl py-2 px-3 fixed bg-inherit"
      >
        <i className="fa-solid fa-x "></i>
      </button>

      {placeData.photos.length > 0 &&
        placeData.photos.map((photo) => (
          <div className=" my-4" key={photo}>
            <img
              src={`https://hotel-booking-2-gafy.onrender.com/uploads/${photo}`}
              alt=""
              className="mx-auto w-[60vw] max-h-[600px] object-cover rounded-2xl mb-3 "
            />
          </div>
        ))}
    </div>
  );
};

export default PhotosPage;
