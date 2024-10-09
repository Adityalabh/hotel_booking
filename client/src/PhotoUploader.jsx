import React, { useState } from "react";
import axios from "axios";

const PhotoUploader = ({ addedPhoto, onChange }) => {
  const [photoLink, setPhotoLink] = useState("");

  async function uploadByLink(e) {
    e.preventDefault();

    //here after post asynchronous request image newname comes stored by the name of filename
    //which later stored in setAddedPhoto state
    try{
      const { data: filename } = await axios.post("/upload-by-link", {
        link: photoLink,
      });
  
      //here Onchange work as a prop which we send in updater state
      onChange((prevdata) => {
        return [...prevdata, filename];
      });
      setPhotoLink("");
    }catch(err){
      alert("invalid photo");
      return;
    }
  }

  async function uploadPhoto(e) {
    const files = e.target.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("photos", files[i]); //photo is the fieldname
      //here  For each file, the formData.append('photos', files[i]) method adds the file to the FormData
    }

    try {
      const { data: filenames } = await axios.post("/uploads", formData);
      onChange((prevData) => [...prevData, ...filenames]); // Assume the server returns an array of filenames
    } catch (err) {
      console.error("Error uploading photos", err);
    }
  
  }

  function removePhoto(e, givenPhoto) {
    e.preventDefault();
    onChange([
      ...addedPhoto.filter((selectedPhoto) => selectedPhoto !== givenPhoto),
    ]);
  }

  function makeMainPhoto (e,givenPhoto){
    // here we getting selected photo and then we creating array of other non slected photos 
    // and then re-submitting givenphoto first and then non selected photos

    e.preventDefault();
    const nonSelectedPhoto = addedPhoto.filter(selectedPhoto => selectedPhoto !== givenPhoto);
    const newSelectedPhoto = [givenPhoto,...nonSelectedPhoto];
    onChange(newSelectedPhoto);
    //or simply in short
    // onChange([givenPhoto,...addedPhoto.filter(selectedPhoto => selectedPhoto !== givenPhoto)]);
  }

  return (
    <div className="mt-3">
      <label htmlFor="photos" className="text-2xl pt-2">
        Photos:
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          name=""
          id="photos"
          placeholder="Add at least 3 photo using link...jpg or local upload"
          value={photoLink}
          onChange={(e) => setPhotoLink(e.target.value)}
        />
        <button
          className="w-1/3 lg:max-w-[150px] rounded-full px-2 py-2 font-semibold"
          onClick={uploadByLink}
        >
          Add Photo
        </button>
      </div>

      <div className="mt-3">
        <div className="flex flex-wrap  mb-3 ">
          {addedPhoto.length > 0 &&
            addedPhoto.map((link, index) => (
              <div key={index} className="flex relative">
                <div>
                  <img
                    src={"http://localhost:4000/uploads/" + link}
                    alt=""
                    className="rounded-2xl shadow-sm  p-1 max-h-[250px] object-cover "
                  />
                </div>
                {/* DELETE */}
                <button
                  onClick={(e) => removePhoto(e, link)}
                  className="z-100 absolute bottom-0 right-0 m-1.5 p-1  text-gray-200 bg-black bg-opacity-30 hover:opacity-70 cursor-pointer rounded-full "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
                {/* Star  */}
                <button onClick={(e)=>{makeMainPhoto(e,link)}} className="z-100 absolute bottom-0 left-0 m-1.5 p-1  text-gray-200 bg-black bg-opacity-30 hover:opacity-70 cursor-pointer rounded-full ">
                  {link !== addedPhoto[0] ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              </div>
            ))}
        </div>

        <label className="flex justify-center gap-1 py-2  mb-3 bg-gray-200 rounded-full items-center cursor-pointer max-w-[170px]">
          <input
            type="file"
            multiple
            className=" hidden "
            onChange={uploadPhoto}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
            />
          </svg>
          Local Upload 
        </label>
      </div>
    </div>
  );
};

export default PhotoUploader;
