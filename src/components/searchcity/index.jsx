import { useContext, useState } from "react";
import { globalcontext } from "../../store";

const SearchCity = () => {
  const { errorMsg, search, setSearch, handleGetWeather, latestSearches } =
    useContext(globalcontext);

  return (
    <>
      <div className="flex justify-between   p-1 md:justify-center md:space-x-3 ">
        <input
          type="text"
          placeholder="Enter City Name"
          className=" border hover:border-blue-500 bg-[#F1FADA]   p-1 rounded-md text-xl text-[#071952] font-semibold w-[60%] uppercase ms-2 placeholder:text-[#071952] placeholder:font-light   "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="bg-[#FF7F3E] text-white w-[30%] p-1 rounded-lg font-semibold text-base"
          onClick={() => handleGetWeather(search)}
        >
          Get Weather
        </button>
      </div>
      <div>
        {errorMsg != null ? (
          <p className="text-red-500 text-2xl text-center font-medium">
            {errorMsg}
          </p>
        ) : null}
        {/* <div> */}

        {latestSearches && latestSearches.length > 0 ? (
          <div className="flex space-x-3 ms-4 p-1 items-center my-2">
            <p className="text-white">Recent Searches : </p>{" "}
            {latestSearches.map((searchValue) => {
              return (
                <button
                  className="rounded-md bg-[#FF7F3E] p-1 text-white text-base capitalize"
                  onClick={() => handleGetWeather(searchValue)}
                >
                  {searchValue}
                </button>
              );
            })}
          </div>
        ) : (
          <p> Latest Searches</p>
        )}
      </div>
      {/* </div> */}
    </>
  );
};
export default SearchCity;
