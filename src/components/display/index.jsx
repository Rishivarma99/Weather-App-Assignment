import { useContext, useEffect, useState } from "react";
import { globalcontext } from "../../store";

const Display = () => {
  const { search, myData, presentWeather, weatherForecast } =
    useContext(globalcontext);

  const [tempUnits, setTempUnits] = useState("C");
  const [convertedTemp, setConvertedTemp] = useState(null);

  // console.log(myData);
  // console.log(presentWeather);
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

      setConvertedTemp(newTemp);
    } else if (tempUnits == "F") {
      // let newTemp = parseInt(((temp - 273.15) * 9) / 5 + 32);
      setConvertedTemp(parseInt(((temp - 273.15) * 9) / 5 + 32));
    }
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
      convertTemperature(presentWeather["temp"].day);
    }
  }, [tempUnits, presentWeather]);

  return (
    <div className="h-full w-full border p-3">
      {/* to display present weather */}
      <div className="">
        <p className=" capitalize">
          {" "}
          <span>{myData != null ? myData.city.name : "City Name"}, </span>
          <span>{myData != null ? myData.city.country : "Country"}</span>
        </p>
        {/* date */}
        <p> {presentWeather ? convertToDate(presentWeather.dt) : "Date"}</p>
        <p>
          {presentWeather != null
            ? presentWeather.weather[0].description
            : "description"}{" "}
        </p>
        <p>
          {" "}
          {presentWeather != null
            ? convertedTemp != null
              ? convertedTemp
              : convertTemperature(presentWeather["temp"].day)
            : "Temperature"}
          {" " + tempUnits}
        </p>
        <button
          className="border"
          onClick={handleToggle}
        >{`Toggle F <=> C`}</button>
      </div>
    </div>
  );
};

export default Display;
