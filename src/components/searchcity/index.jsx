import { useContext, useState } from "react";
import { globalcontext } from "../../store";

const SearchCity = () => {
  const { search, setSearch, handleGetWeather } = useContext(globalcontext);

  return (
    <>
      <div className="flex space-x-4 justify-center">
        <input
          type="text"
          placeholder="Enter City Name"
          className=" border hover:border-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="bg-white p-1 rounded-lg" onClick={handleGetWeather}>
          Get Weather
        </button>
      </div>
      <div>
        <p>Error msg</p>
        <div>
          <p>recent rearches</p>
        </div>
      </div>
    </>
  );
};
export default SearchCity;
