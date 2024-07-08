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

  async function fetchData(param) {
    // fetch the data  :
    const API_KEY = "0ce42cb8cd2e08940db0b75a2d3935d6";
    // const response = await fetch(url);
    try {
      setFetching(true);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast/daily?q=${param}&appid=bd5e378503939ddaee76f12ad7a97608&cnt=6`
      );
      console.log(response);
      const data = await response.json();
      if (data && data != "") {
        console.log("data invoked");
        console.log(data);
        if (data.cod != "404") {
          setMyData(data);
          setPresentWeather(data.list[0]);
          setWeatherForecast(data.list);
          setFetching(false);
        } else {
          setErrorMsg(data.message);
        }
      }
    } catch (e) {
      console.log("errroinvlode");
      console.log(e);
      setErrorMsg(e);
      setFetching(false);
    }
  }

  useEffect(() => {
    fetchData("vizianagaram");
  }, []);

  console.log("errormsg" + errorMsg);

  const onclickNavbar = () => {
    console.log("nav bar clicked ");
    setOpenNav(!openNav);
  };
  const handleGetWeather = () => {
    console.log(search);
    if (search == "") {
      alert("Please Enter something");
    }
    if (search && search != "") {
      fetchData(search);
    }
  };

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
      }}
    >
      {children}
    </globalcontext.Provider>
  );
};

export default Localcontext;
