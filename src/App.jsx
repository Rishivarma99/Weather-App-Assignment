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
        <main className="bg-slate-400 pt-5 h-[100vh] ">
          <div className="bg-slate-600 w-[96%] mt-20 p-2 mx-auto ">
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
