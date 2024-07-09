import { useContext, useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { globalcontext } from "../../store";
const FavoriteCities = () => {
  const API_KEY = "bd5e378503939ddaee76f12ad7a97608";
  const { favoriteCities, handleDeleteFavoriteCity } =
    useContext(globalcontext);
  const [favTempUnits, setFavTempUnits] = useState("C");
  const [favoriteCitiesData, setFavoriteCitiesData] = useState([]);

  // async function fetchfavdata(city) {
  //   // fetch the data  :
  //   const API_KEY = "bd5e378503939ddaee76f12ad7a97608";
  //   // const response = await fetch(url);

  //   const response = await fetch(
  //     `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bd5e378503939ddaee76f12ad7a97608`
  //   );
  //   const data = await response.json();
  //   console.log(data);
  //   setFavoriteCitiesData([...favoriteCitiesData, data]);
  // }

  useEffect(() => {
    const fetchWeatherData = async () => {
      const cityDataPromises = favoriteCities.map(async (obj) => {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${obj.city}&appid=${API_KEY}`
        );
        return await response.json();
      });

      const cityWeatherData = await Promise.all(cityDataPromises); // Wait for all promises to resolve
      if (cityWeatherData) {
        // console.log(cityWeatherData);
        setFavoriteCitiesData(cityWeatherData);
      }
    };
    // console.log("invoked");
    if (favoriteCities) {
      if (favoriteCities.length == 0) {
        setFavoriteCitiesData([]);
      }
      // console.log(favoriteCities);
      fetchWeatherData();
    }
  }, [favoriteCities]);

  // console.log(favoriteCitiesData);

  // useEffect(() => {
  //   fetchfavdata();
  // }, []);

  const convertFavTemperature = (temp) => {
    if (favTempUnits == "C") {
      let newTempC = parseInt(temp) - 273;
      return newTempC;
    } else if (favTempUnits == "F") {
      let newTempF = parseInt(((temp - 273.15) * 9) / 5 + 32);
      return newTempF;
    }
  };

  let presentDate = new Date();

  presentDate = presentDate.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
  });

  return (
    <>
      <div>
        {favoriteCitiesData && favoriteCitiesData.length > 0 ? (
          <div className="border border-green-300 flex  flex-col    p-3 ">
            <p className="text-center text-white text-xl mb-1">
              Favorite Cities
            </p>

            {favoriteCitiesData.map((city1, index) => {
              return (
                <div
                  className="flex bg-[#EEF5FF] p-2 justify-between rounded-md m-1"
                  key={index}
                >
                  <p className="text-[18px] text-[#265073] font-semibold ">
                    {city1?.name ? city1.name : "city name"}
                  </p>
                  <p className="text-[18px] text-[#265073] font-semibold ">
                    {presentDate}
                  </p>
                  <p className="text-[18px] text-[#265073] font-semibold ">
                    {city1.main?.temp
                      ? convertFavTemperature(city1.main["temp"])
                      : "temp"}
                    <span> C</span>
                  </p>
                  <p className="text-[18px] text-[#265073] font-semibold ">
                    {" "}
                    {city1?.weather && city1.weather.length > 0
                      ? city1.weather[0].description
                      : "description"}
                  </p>

                  <MdDeleteOutline
                    className="text-2xl text-red-500"
                    onClick={() =>
                      handleDeleteFavoriteCity(favoriteCities[index].id)
                    }
                  ></MdDeleteOutline>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-white text-xl mb-1 capitalize">
            Please Add Favorite Cities from Above
          </p>
        )}
      </div>
    </>
  );
};
export default FavoriteCities;

{
  /* <div className="flex items-center  space-x-2 border p-2 ml-1 border rounded-md capitalize mt-2 bg-white">
{" "}
<p>{city}</p>{" "}
<MdDeleteOutline className="text-2xl text-red-500"></MdDeleteOutline>
</div> */
}
