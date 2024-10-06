import React, { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Link, Navigate, useParams } from "react-router-dom";
import { UserContext } from "./UserContextProvider";

const Pricebadge = ({ placeData }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuest, setMaxGuest] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [redirect, setRedirect] = useState(``);
  const { user } = useContext(UserContext);

  //   const {id} = useParams();

  useEffect(() => {
    if (user) {
      setName(user.userName);
      setEmail(user.email);
    }
  }, [user]);

  if (!placeData.price) {
    return <div>Loading.........</div>;
  }

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function handleBooking(e) {
    // const data = {};
    e.preventDefault();
    try {
      const response = await axios.post(`/bookings`, {
        place: placeData._id,
        checkIn,
        checkOut,
        maxGuest,
        name,
        email,
        phoneNumber,
        bookingPrice: numberOfNights * placeData.price,
      });
      alert("Booking Successful");
      //to get the id of newly created data
      const bookingId = response.data._id;
      setRedirect(`/account/bookings`);
      console.log(bookingId);
      
    } catch (err) {
      alert("booking failed");
    }
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  // if(!user){
  //   return(

  //   )
  // }

  return (
    <div>
      {user ? (
        <form
          onSubmit={handleBooking}
          className=" flex flex-col justify-center px-4 py-3 -ml-4 rounded-3xl mt-7 lg:ml-4  bg-white max-h-auto max-w-sm shadow shadow-gray-700"
        >
          <h1 className="text-xl text-center">
            Price: &#8377;{placeData.price.toLocaleString("en-IN")} /per night
          </h1>
          <div className="border border-gray-400 rounded-3xl mt-2 p-3 ">
            <div className="flex  ">
              <div className="border-r border-gray-400 p-2 ">
                <label htmlFor="Checkin">CheckIn:</label>
                <input
                  type="date"
                  id="Checkin"
                  className="cursor-pointer"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  required
                />
              </div>
              <div className="p-2 ">
                <label htmlFor="checkout">Checkout:</label>
                <input
                  type="date"
                  className="outline-hidden cursor-pointer"
                  id="checkout"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="border-t border-gray-400 p-2">
              <label htmlFor="">Number of guest:</label>
              <input
                type="number"
                className="border border-gray-400 rounded-xl "
                value={maxGuest}
                onChange={(e) => setMaxGuest(e.target.value)}
                required
              />
            </div>

            {numberOfNights > 0 && (
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border bg-red!  border-gray-400 rounded-xl"
                  required
                />

                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-gray-400 rounded-xl"
                  required
                />

                <label>Phone number:</label>
                <input
                  type="number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="border border-gray-400 rounded-xl"
                  required
                />
              </div>
            )}
          </div>

          <button
            //   onClick={handleBooking}
            type="submit"
            className="rounded-2xl p-2 mt-2 bg-red-600 text-white hover:bg-red-700"
          >
            Book Ticket
            {numberOfNights > 0 && (
              <span>
                &nbsp;&#8377;
                {(numberOfNights * placeData.price).toLocaleString("en-IN")}
              </span>
            )}
          </button>
        </form>
      ) : (
        <div className=" flex flex-col justify-center px-4 py-3 -ml-4 rounded-3xl mt-12 lg:ml-4  bg-white max-h-auto max-w-sm shadow shadow-gray-700">
          <h1 className="text-md ml-4 font-bold text-center">Please Login:</h1>
          <Link
            to={`/Login`}
            className=" text-center rounded-2xl p-2 mt-2 bg-red-600 text-white hover:bg-red-700"
          >
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default Pricebadge;
