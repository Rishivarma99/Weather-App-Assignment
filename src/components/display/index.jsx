import { useContext, useEffect, useState } from "react";
import { globalcontext } from "../../store";

const Display = () => {
  const {
    search,
    myData,
    presentWeather,
    weatherForecast,
    favoriteCities,
    setFavoriteCities,
    handleAddFavoriteCity,
  } = useContext(globalcontext);

  const [tempUnits, setTempUnits] = useState("C");
  const [convertedTemp, setConvertedTemp] = useState(null);

  // console.log(myData);
  // (presentWeather);
  // console.log(weatherForecast);

  const convertToDate = (time) => {
    const timeInMs = time * 1000;
    const date = new Date(timeInMs);
    const formattedDate = date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
    return formattedDate;
  };

  const convertTemperature = (temp) => {
    if (tempUnits == "C") {
      let newTemp = parseInt(temp) - 273;

      return newTemp;
    } else if (tempUnits == "F") {
      let newTemp = parseInt(((temp - 273.15) * 9) / 5 + 32);
      return newTemp;
    }
  };

  const hanldePresentTemperaturUnits = (temp) => {
    let newTemp = convertTemperature(presentWeather["temp"].day);
    setConvertedTemp(newTemp);
  };

  const handleToggle = () => {
    if (tempUnits == "C") {
      setTempUnits("F");
    } else {
      setTempUnits("C");
    }
  };
  // use efect invokes when we want to convert temperature using toggle button or when presentweather changes for new city
  useEffect(() => {
    if (presentWeather != null) {
      hanldePresentTemperaturUnits(presentWeather["temp"].day);
    }
  }, [tempUnits, presentWeather]);

  return (
    <div className="h-full w-full  p-2 mb-2 ">
      {/* to display present weather */}
      {presentWeather ? (
        <div className="flex flex-col items-center ">
          <p className="capitalize text-3xl text-[#9AD0C2] font-semibold mb-2 tracking-wider">
            {" "}
            <span>{myData != null ? myData.city.name : "City Name"}, </span>
            <span className="font-semibold">
              {myData != null ? myData.city.country : "Country"}
            </span>
          </p>
          {/* date */}
          <p className="capitalize text-[18px]  text-[#9AD0C2] font-normal mb-1">
            {" "}
            {presentWeather ? convertToDate(presentWeather.dt) : "Date"}
          </p>
          <p className="capitalize text-2xl text-[#9AD0C2] font-normal mb-1">
            {presentWeather != null
              ? presentWeather.weather[0].description
              : "description"}{" "}
          </p>
          <p className="capitalize text-3xl text-[#9AD0C2] font-normal mb-2">
            {" "}
            {presentWeather != null
              ? convertedTemp != null
                ? convertedTemp
                : convertTemperature(presentWeather["temp"].day)
              : "Temperature"}
            {" " + tempUnits}
          </p>
          <div className="flex space-x-4 mb-2">
            <button
              className="border border-[#344C64] rounded-lg p-1  text-[#344C64] font-semibold bg-[#2D9596]"
              onClick={handleToggle}
            >{`Toggle F <=> C`}</button>
            <button
              className="border border-[#344C64] rounded-lg p-1  text-[#344C64] font-semibold bg-[#2D9596]"
              onClick={() => handleAddFavoriteCity(myData.city.name)}
            >
              Add to Favorites
            </button>
          </div>
        </div>
      ) : (
        "fetc hing"
      )}

      {/* weather forecast :  */}

      <div className="flex flex-col  justify-center mx-auto ">
        {weatherForecast && weatherForecast.length > 0
          ? weatherForecast.map((day1, index) => {
              return (
                <div
                  className="flex  bg-[#9AD0C2] m-1 rounded-md p-1  w-[97%]  "
                  key={index}
                >
                  <p className="text-base text-[#265073] font-medium w-[50%]">
                    {day1?.dt ? convertToDate(day1.dt) : "date"}
                  </p>
                  <p className="text-base text-[#265073] font-medium w-[40%]">
                    {day1?.weather.length > 0
                      ? day1.weather[0].description
                      : "description"}
                  </p>
                  <p className="text-base text-[#265073] font-medium w-[8%]">
                    {day1?.temp ? convertTemperature(day1.temp["day"]) : "temp"}{" "}
                    {" " + tempUnits}
                  </p>
                </div>
              );
            })
          : "fetchinig"}
      </div>
    </div>
  );
};

export default Display;
