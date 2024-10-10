import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContextProvider";

const IndexPage = () => {
  let [placeData, setplaceData] = useState([]);
  const {user} = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(()=>{
    if(!user){
      navigate('/login');
    }
  },[]);

  useEffect(() => {
    axios.get("/index").then((response) => {
      setplaceData(response.data);
    });
  }, []);

  return (
    // showing list all places
    <div className=" min-h-screen grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3   lg:grid-cols-3 xl:grid-cols-4">
      {placeData.length > 0 &&
        placeData.map((place) => (
          <Link key={place._id} to={`/show/${place._id}`} className=" bg-gray-00 rounded-2xl p-2 ">
            <div className="flex">
              {place.photos.length > 0 && (
                <img className="max-h-[400px] aspect-square object-cover rounded-xl" src={`https://hotel-booking-6-277c.onrender.com/uploads/${place.photos[0]}`} alt="" />
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
