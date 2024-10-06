import React, { useEffect, useState } from "react";
import Perk from "./Perk";
import PhotoUploader from "../PhotoUploader";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";

const PlaceForm = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhoto, setAddedPhoto] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuest, setMaxGuest] = useState(1);
  const [price ,setPrice] = useState(1000);
  const [redirect, setRedirect] = useState(false);

  const commonStyle = {
    label: "text-2xl",
    checkboxlabel:
      "flex justify-start gap-2 items-center border border-gray-400 p-4  cursor-pointer",
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    try {
      axios.get(`/places/${id}`).then((response) => {
        const { data } = response;
        setTitle(data.title || "");
        setAddress(data.address || "");
        setAddedPhoto(data.photos || []);
        setPerks(data.perks || []);
        setDescription(data.description || "");
        setExtraInfo(data.extraInfo || "");
        setCheckIn(data.checkIn || "");
        setCheckOut(data.checkOut || "");
        setMaxGuest(data.maxGuest || 1);  
        setPrice(data.price || 1000);
      });
    } catch (err) {
      console.error("Error fetching place data:", err);
    }
  }, [id]);

  async function saveData(e) {
    const placeDatas = {
      title,
      address,
      addedPhoto,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuest,
      price,
    };
    e.preventDefault();

    if (id) {
      //update
      await axios.put("/places", { id, ...placeDatas });
    } else {
      //create Data
      await axios.post("/places", { ...placeDatas });
    }

    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div className="p-4 max-w-full bg-white -mt-7">
      <form encType="multipart/form-data" onSubmit={saveData}>
        <label htmlFor="title" className={commonStyle.label}>
          Title:
        </label>
        <input
          type="text"
          id="title"
          placeholder="Title for your house it shoud be catchy"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="address" className={commonStyle.label}>
          Address:
        </label>
        <input
          type="text"
          id="addres"
          placeholder="address...."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />

        <PhotoUploader addedPhoto={addedPhoto} onChange={setAddedPhoto} />

        <label htmlFor="description" className="text-2xl">
          Description:
        </label>
        <textarea
          id="description"
          placeholder="more details of house...."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <br />

        <label htmlFor="perks" className=" text-2xl">
          Perks:
        </label>
        {/* Checkbox */}

        <div className="">
          <Perk
            commonStyle={commonStyle.checkboxlabel}
            selected={perks}
            onChange={setPerks}
          />
        </div>

        <div>
          <label htmlFor="extraInfo" className="text-2xl">
            Extra Info:
          </label>
          <textarea
            name=""
            id="extraInfo"
            placeholder="Extra info like house rules etc.."
            value={extraInfo}
            onChange={(e) => setExtraInfo(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 ">
          <div>
            <label htmlFor="checkIn">Check In Time:</label>
            <input
              type="number"
              name=""
              id="checkIn"
              placeholder="2:00"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="checkOut">Check In Out:</label>
            <input
              type="number"
              name=""
              id="checkOut"
              placeholder="2:00"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="guestNum">Max Guest:</label>
            <input
              type="number"
              name=""
              id="guestNum"
              placeholder="2"
              value={maxGuest}
              onChange={(e) => setMaxGuest(e.target.value)}
              required
            />
          </div>

          <div className="">
            <label htmlFor="price">Price per night:</label>
            <input
              type="number"
              name=""
              id="price"
              placeholder="₹1000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
        </div>

        

        <div className="w-full px-8 my-7">
          <button type="submit" className=" primary ">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlaceForm;
