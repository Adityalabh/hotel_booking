import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import PlaceImg from "../PlaceImg";

const PlaceCardPage = () => {
  const [place, setPlace] = useState([]);

  useEffect(() => {
    axios.get("/places").then(({ data }) => {
      setPlace(data);
    });
  }, []);

  // if(!place){
  //   return(
  //     <div>
  //       <h1>Add New Places  </h1>
  //     </div>
  //   )
  // }

  return (
    <div className="mt-5">
      {place.length > 0 ?(
        
        place.map((placeItem) => (
          <Link key={placeItem._id} to={`/account/places/${placeItem._id}`} className="flex gap-2 items-center  bg-gray-300 p-2 rounded-2xl lg:w-[90vw] ml-4 m-3">
            {/* IMAGE */}
            <div className="flex  max-h-[170px] max-w-[250px]">
              {/* {placeItem.photos.length > 0 && (
                <img
                  src={`http://localhost:4000/uploads/${placeItem.photos[0]}`}
                  alt=""
                  className="rounded-2xl object-cover p-1 "
                />
              )} */}
              <PlaceImg place={placeItem} index={0} className={"rounded-2xl object-cover p-1 "}/>
            </div>
            {/* INFO */}
            <div className="lg:ml-3">
                <h2 className=" line-clamp-1 text-xl font-bold">{placeItem.title}</h2>
                <p className="line-clamp-4 mt-2 text-sm text-left lg:w-2/3">{placeItem.description}</p>
                <p className="mt-2">₹<span className="font-bold ">{placeItem.price}</span>&nbsp;per night</p>
            </div>
          </Link>
        ))
      ):(
        <div className="text-center mt-12 text-2xl font-mono ">
          <h1>Add New Places Here......</h1>
        </div>
      )}
    </div>
  );
};

export default PlaceCardPage;
