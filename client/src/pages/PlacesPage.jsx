import React from "react";
import { Link, useParams } from "react-router-dom";
import PlaceForm from "./PlaceForm";
import PlaceCardPage from "./PlaceCardPage";

const PlacesPage = () => {
  const { action } = useParams();

  // Showing list of all pages
  return (
    <div className="flex-grow">
      {action !== "new" ? (
        <div>
          <div className="text-center mt-3 ">
            <div className="flex justify-between items-center mx-7 bg-gray-400 px-3 py-2 rounded-2xl">
              <h1 className="text-2xl text-red-700  font-mono ">
                Create new Place Listing
              </h1>
              <Link
                to="/account/places/new"
                className="bg-primary inline-flex text-white px-2 py-1.5 rounded-full gap-1"
              >
                <i className="fa-solid fa-plus text-xl mx-1 "></i>
                Add new places
              </Link>
            </div>
            {/* <hr className="border border-gray-400 mt-3"/> */}
          </div>
          <PlaceCardPage />
        </div>
      ) : (
        <div>
          <PlaceForm />
        </div>
      )}
    </div>
  );
};

export default PlacesPage;
