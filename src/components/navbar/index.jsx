import { useContext } from "react";
import { TfiAlignLeft } from "react-icons/tfi";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { globalcontext } from "../../store";
const Navbar = () => {
  const { onclickNavbar, openNav } = useContext(globalcontext);

  return (
    <>
      <div className="flex justify-between items-center w-full px-4 pt-2 h-[60px] bg-gray-500">
        <div className="flex content-center space-x-1">
          <TiWeatherPartlySunny className="text-2xl "></TiWeatherPartlySunny>
          <p>AccurateWeather</p>
        </div>
        <TfiAlignLeft
          onClick={() => onclickNavbar()}
          className="lg:hidden"
        ></TfiAlignLeft>
        <ul
          className={`hidden list-none flex justify-center p-3 space-x-4 capitalize   
          } lg:flex `}
        >
          <li>home</li>
          <li>Contact Us</li>
        </ul>
      </div>
      <div className="bg-slate-300">
        <ul
          className={`list-none flex justify-center p-3 space-x-4 capitalize bg-slate-300 lg:hidden ${
            !openNav ? "hidden" : null
          } `}
        >
          <li>home</li>
          <li>Contact Us</li>
        </ul>
      </div>
    </>
  );
};
export default Navbar;
