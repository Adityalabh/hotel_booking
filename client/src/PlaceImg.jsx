import React from "react";

const PlaceImg = ({ place,index,className}) => {
    if(!className){
        className = "object-cover"
    }
  return (
    <div>
      {place.photos.length > 0 && (
        <img
          src={`http://localhost:4000/uploads/${place.photos[index]}`}
          alt=""
          className={className}
        />
      )}
    </div>
  );
};

export default PlaceImg;
