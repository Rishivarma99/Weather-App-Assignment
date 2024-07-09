import { useContext } from "react";
import { TfiAlignLeft } from "react-icons/tfi";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { globalcontext } from "../../store";
const Navbar = () => {
  const { onclickNavbar, openNav } = useContext(globalcontext);

  return (
    <>
      <div className="flex justify-between items-center w-full px-4 pt-2 h-[60px] bg-[#EEF5FF]">
        <div className="flex content-center items-center space-x-2">
          <TiWeatherPartlySunny className="text-3xl text-black   "></TiWeatherPartlySunny>
          <p className="text-[18px] text-[#176B87] font-serif  font-semibold">
            Accurate Weather
          </p>
        </div>
        <TfiAlignLeft
          onClick={() => onclickNavbar()}
          className="text-[#071952] text-2xl   lg:hidden"
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
