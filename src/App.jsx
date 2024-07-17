import "./App.css";
import Display from "./components/display";
import FavoriteCities from "./components/favoritecities";
import Navbar from "./components/navbar";
import SearchCity from "./components/searchcity";
import Localcontext from "./store";

function App() {
  return (
    <>
      <Localcontext>
        <Navbar></Navbar>
        <main className="bg-contain  bg-center bg-no-repeat mybackground  min-h-[100vh] h-full pt-1  ">
          <div className=" bg-[#265073] min-w-[380px] w-[96%] md:w-[800px] mt-5 p-2 mx-auto ">
            <Display></Display>
            <SearchCity></SearchCity>
            <FavoriteCities></FavoriteCities>
          </div>
        </main>
      </Localcontext>
    </>
  );
}

export default App;
