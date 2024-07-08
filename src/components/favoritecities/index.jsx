import { MdDeleteOutline } from "react-icons/md";
const FavoriteCities = () => {
  const arr = ["viazg ", "srikakulam", "vizianagaram"];
  return (
    <>
      <div className="border border-black flex flex-wrap  p-3  justify-start ">
        {arr.map((city) => {
          return (
            <div className="flex items-center  space-x-2 border p-2 ml-1 border rounded-md capitalize mt-2 bg-white">
              {" "}
              <p>{city}</p>{" "}
              <MdDeleteOutline className="text-2xl text-red-500"></MdDeleteOutline>
            </div>
          );
        })}
      </div>{" "}
    </>
  );
};
export default FavoriteCities;
