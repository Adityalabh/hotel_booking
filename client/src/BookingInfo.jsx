import { differenceInCalendarDays, format } from "date-fns";
import React from "react";

const BookingInfo = ({booking ,priceStyle}) => {
  return (
    <div className="pt-3">
      <div className=" ml-1">
        <h3>
          Booking date &rarr;&nbsp;
          {format(new Date(booking.createdAt), "dd-MM-yyyy")}
        </h3>

        <h3>
          Check in time &rarr; &nbsp;
          <i className="fa-regular fa-calendar text-gray-600"></i>&nbsp;
          {format(new Date(booking.checkIn), "dd-MM-yyyy")}
        </h3>
        <h3>
          Check out time &rarr;&nbsp;
          <i className="fa-regular fa-calendar text-gray-600"></i>&nbsp;
          {format(new Date(booking.checkOut), "dd-MM-yyyy")}
        </h3>

        <h3 className="">
          {differenceInCalendarDays(
            new Date(booking.checkOut),
            new Date(booking.checkIn)
          )}
          nights&nbsp;
          <i class="fa-regular fa-moon"></i>&nbsp;|&nbsp;
          <span className={`font-extrabold ${priceStyle}`} >
            &#8377;{booking.bookingPrice.toLocaleString("en-IN")}
          </span>
        </h3>
      </div>
    </div>
  );
};

export default BookingInfo;
