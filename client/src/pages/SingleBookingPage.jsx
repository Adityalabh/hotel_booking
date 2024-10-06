import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImgGallery from "../ImgGallery";
import BookingInfo from "../BookingInfo";

const SingleBookingPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState([]);

  useEffect(() => {
    if (!id) {
      return;
    }
    try {
      axios.get(`/bookings/${id}`).then(({ data }) => {
        setBooking(data);
      });
      console.log(booking);
    } catch (err) {
      console.log("err Occured", err);
    }
  }, [id]);

  if (!booking.place || !booking) {
    return <div className="min-h-screen text-2xl text-center">Loading....</div>;
  }

  return (
    <div className="min-h-screen px-7 ml-7 max-w-[80vw]">
      <div className="lg:mx-8 mb-3">

        {/* Title */}
        <h1 className="text-2xl lg:text-3xl font-semibold mb-2">
          {booking.place.title}
        </h1>
        {/* Address */}
        <a
          className="text-xl  curosr-pointer underline"
          href={`https://maps.google.com/?q=${booking.place.address}`}
        >
          <span>
            <i className="fa-solid fa-location-dot"></i>
          </span>
          &nbsp;{booking.place.address}
        </a>
      </div>

      <div className="">
        <ImgGallery placeData={booking.place} />
      </div>
      
      <h1 className="text-3xl pl-7 mt-7 font-semibold">Booking Information </h1>
      <div className="pl-7 text-xl my-7 bg-green-600 ml-7 text-white rounded-2xl py-3">
        <BookingInfo booking={booking} priceStlye={"text-black"}/>
      </div>

    </div>
  );
};

export default SingleBookingPage;
