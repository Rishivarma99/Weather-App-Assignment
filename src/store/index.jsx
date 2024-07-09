import { createContext, useEffect, useState } from "react";

export const globalcontext = createContext(null);

const Localcontext = ({ children }) => {
  const [openNav, setOpenNav] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [myData, setMyData] = useState(null);
  const [presentWeather, setPresentWeather] = useState(null);
  const [weatherForecast, setWeatherForecast] = useState(null);
  const [search, setSearch] = useState("");
  const [favoriteCities, setFavoriteCities] = useState([]);
  const [favErrorMsg, setFavErrorMsg] = useState(null);
  const [favFetching, setFavFetching] = useState(false);
  // to implement local storage
  const [latestSearches, setlatestSearches] = useState([]);

  const handleLatestSearches = (searchValue) => {
    console.log("handle latest searches invoked");
    let NewLatestSearches = [...latestSearches, searchValue];
    if (NewLatestSearches.length > 3) {
      // NewLatestSearches = NewLatestSearches.splice(0, 1);
      NewLatestSearches.shift();
    }
    localStorage.setItem("searches", JSON.stringify(NewLatestSearches));
    setlatestSearches(NewLatestSearches);
  };

  useEffect(() => {
    const storedSearches = localStorage.getItem("searches");
    if (storedSearches) {
      setlatestSearches(JSON.parse(storedSearches));
    }
  }, []);
  // to get weather in search
  console.log(latestSearches);

  const handleGetWeather = (cityName) => {
    console.log(cityName);
    if (cityName == "") {
      alert("Please Enter something");
    }
    if (cityName && cityName != "") {
      handleLatestSearches(cityName);
      fetchData(cityName);
      setSearch("");
    }
  };

  async function fetchData(param) {
    // fetch the data  :
    const API_KEY = "bd5e378503939ddaee76f12ad7a97608";
    // const response = await fetch(url);
    try {
      setFetching(true);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast/daily?q=${param}&appid=${API_KEY}&cnt=6`
      );
      // console.log(response);
      const data = await response.json();
      if (data) {
        setFetching(true);
        // console.log("data invoked");
        // console.log(data);
        if (data.cod != "404") {
          setMyData(data);
          setPresentWeather(data.list[0]);
          setWeatherForecast(data.list);
          setFetching(false);
          setErrorMsg(null);
        } else {
          setErrorMsg(data.message);
          setFetching(false);
        }
      }
    } catch (e) {
      console.log("error invlode at fetching main data");
      // console.log(e);
      setErrorMsg(e);
      setFetching(false);
    }
  }
  useEffect(() => {
    fetchData("vizianagaram");
  }, []);

  const onclickNavbar = () => {
    console.log("nav bar clicked ");
    setOpenNav(!openNav);
  };

  const handleAddFavoriteCity = (cityName) => {
    console.log(cityName);
    addFavoriteCity(cityName);
  };
  const handleDeleteFavoriteCity = (cityId) => {
    // console.log(cityId);
    removeFavoriteCity(cityId);
  };

  useEffect(() => {
    async function fetchMyData() {
      const response = await fetch("http://localhost:5000/cities");
      const data = await response.json();
      if (data) {
        // console.log("printing dat");
        // console.log(data);
        setFavoriteCities(data);
      }
    }

    fetchMyData();
  }, []);

  // ADING AND REMOVING FAVORITE CITY

  const addFavoriteCity = async (city) => {
    try {
      const response = await fetch("http://localhost:5000/cities", {
        method: "POST",
        headers: { "Content-Type": "appilication/json" },
        body: JSON.stringify({ city }),
      });
      if (!response.ok) {
        throw new Error("error adding favorite city");
      }
      const data = await response.json();
      if (data) {
        // console.log(data);
        setFavoriteCities([...favoriteCities, data]);
      }
    } catch (e) {
      console.error("Error adding favorite city:", e);
    }
  };

  const removeFavoriteCity = async (cityId) => {
    try {
      const response = await fetch(`http://localhost:5000/cities/${cityId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("error REMOVING favorite city");
      }
      const data = await response.json();
      if (data) {
        // console.log(data);
        setFavoriteCities(
          favoriteCities.filter((cityName) => cityName.id !== cityId)
        );
      }
    } catch (e) {
      console.error("Error adding favorite city:", e);
    }
  };

  // console.log(favoriteCities);
  return (
    <globalcontext.Provider
      value={{
        onclickNavbar,
        openNav,
        fetching,
        errorMsg,
        myData,
        presentWeather,
        weatherForecast,
        search,
        setSearch,
        handleGetWeather,
        favoriteCities,
        setFavoriteCities,
        handleAddFavoriteCity,
        handleDeleteFavoriteCity,
        latestSearches,
      }}
    >
      {children}
    </globalcontext.Provider>
  );
};

export default Localcontext;
