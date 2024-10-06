import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const IndexPage = () => {
  let [placeData, setplaceData] = useState([]);

  useEffect(() => {
    axios.get("/index").then((response) => {
      setplaceData(response.data);
    });
  }, []);

  return (
    <div className=" min-h-screen grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3   lg:grid-cols-3 xl:grid-cols-4">
      {placeData.length > 0 &&
        placeData.map((place) => (
          <Link key={place._id} to={`/show/${place._id}`} className=" bg-gray-00 rounded-2xl p-2 ">
            <div className="flex">
              {place.photos.length > 0 && (
                <img className="max-h-[400px] aspect-square object-cover rounded-xl" src={`http://localhost:4000/uploads/${place.photos[0]}`} alt="" />
              )}
            </div>
            <div>
              <h2 className="font-semibold text-[18px] text-left truncate  mt-2">{place.title }</h2>
              <h3 >{place.address}</h3>
              <h3><span className="font-bold">₹{place.price}</span>&nbsp;night</h3>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default IndexPage;
