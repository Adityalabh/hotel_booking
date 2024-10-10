import React from "react";

const Perk = ({commonStyle,selected,onChange}) => {

 function handleChange(e){
    const{name,checked} = e.target;
    if(checked){
        onChange([...selected,name]);
    }else{
        onChange([...selected.filter(selectedName => selectedName !== name)]);
    }
    // console.log(name,checked,selected);
 }

  return (
    <div className="my-5 grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4  ">
      <label className={commonStyle}>
        <input type="checkbox" name="wifi" checked={selected.includes("wifi")} onChange={handleChange}/>
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
            d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
          />
        </svg>

        <span>Wifi</span>
      </label>
      <label className={commonStyle}>
        <input type="checkbox" name="parking" id="" checked={selected.includes("parking")} onChange={handleChange}/>
        <i className="fa-solid fa-square-parking"></i>

        <span>Free Parking</span>
      </label>
      <label className={commonStyle}>
        <input type="checkbox" name="tv" id=""  checked={selected.includes("tv")} onChange={handleChange}/>
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
            d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z"
          />
        </svg>

        <span>Tv</span>
      </label>

      <label className={commonStyle}>
        <input type="checkbox" name="radio" id="" checked={selected.includes("radio")} onChange={handleChange}/>
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
            d="m3.75 7.5 16.5-4.125M12 6.75c-2.708 0-5.363.224-7.948.655C2.999 7.58 2.25 8.507 2.25 9.574v9.176A2.25 2.25 0 0 0 4.5 21h15a2.25 2.25 0 0 0 2.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169A48.329 48.329 0 0 0 12 6.75Zm-1.683 6.443-.005.005-.006-.005.006-.005.005.005Zm-.005 2.127-.005-.006.005-.005.005.005-.005.005Zm-2.116-.006-.005.006-.006-.006.005-.005.006.005Zm-.005-2.116-.006-.005.006-.005.005.005-.005.005ZM9.255 10.5v.008h-.008V10.5h.008Zm3.249 1.88-.007.004-.003-.007.006-.003.004.006Zm-1.38 5.126-.003-.006.006-.004.004.007-.006.003Zm.007-6.501-.003.006-.007-.003.004-.007.006.004Zm1.37 5.129-.007-.004.004-.006.006.003-.004.007Zm.504-1.877h-.008v-.007h.008v.007ZM9.255 18v.008h-.008V18h.008Zm-3.246-1.87-.007.004L6 16.127l.006-.003.004.006Zm1.366-5.119-.004-.006.006-.004.004.007-.006.003ZM7.38 17.5l-.003.006-.007-.003.004-.007.006.004Zm-1.376-5.116L6 12.38l.003-.007.007.004-.004.007Zm-.5 1.873h-.008v-.007h.008v.007ZM17.25 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm0 4.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
          />
        </svg>

        <span>Radio</span>
      </label>

      <label className={commonStyle}>
        <input type="checkbox" name="pets" id="" checked={selected.includes("pets")} onChange={handleChange}/>
        <i className="fa-solid fa-dog"></i>
        <span>Pets</span>
      </label>

      <label className={commonStyle}>
        <input type="checkbox" name="entrance" checked={selected.includes("entrance")} onChange={handleChange}/>
        <i className="fa-solid fa-door-open"></i>
        <span>Private entrance</span>
      </label>
    </div>
  );
};

export default Perk;
