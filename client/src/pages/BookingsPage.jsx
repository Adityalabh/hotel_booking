import axios from "axios";
import React, { useEffect, useState } from "react";
import PlaceImg from "../PlaceImg";
import { Link } from "react-router-dom";
import BookingInfo from "../BookingInfo";

const BookingsPage = () => {
  const [bookingData, setBookingData] = useState([]);

  useEffect(() => {
    axios.get(`/bookings`).then(({ data }) => {
      setBookingData(data);
    });
  }, []);

  return (
    // Showing list of bookings
    <div className="min-h-screen flex flex-col gap-2">
      {bookingData.length > 0 ? (
        bookingData.map((booking) => (
          <Link
            to={`/account/bookings/${booking._id}`}
            key={booking._id}
            className="ml-4 mt-6 flex gap-2 bg-gray-300 rounded-2xl overflow-hidden max-w-[85vw] "
          >
            <div className="w-48 ">
              <PlaceImg
                place={booking.place}
                index={0}
                className={"aspect-square "}
              />
            </div>
            <div className="ml-3 mt-4">
              <h1 className="text-xl font-bold">{booking.place.title}</h1>
              <BookingInfo booking={booking} priceStyle={"text-red-600"}/>
            </div>
          </Link>
        ))
      ) : (
        <div className="text-center mt-9 text-2xl font-mono ">
          <h1>No Booking... 🙄</h1>
        </div>
      )}
    </div>
  );
};

export default BookingsPage;
