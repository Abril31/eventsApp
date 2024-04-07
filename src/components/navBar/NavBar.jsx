import { Link } from "react-router-dom";
import cart from "../../assets/icons/cart.svg";
const NavBar = () => {
  return (
    <div className="flex justify-between gap-10 bg-base text-xl h-16 items-center font-jomhuria">
      <div className="flex ml-5">
        <Link to="/">
          <h2 className="text-white border-r-4 border-otro pr-3 cursor-pointer my-5 mx-3">
            HOME
          </h2>
        </Link>
        <Link to="/about">
          <h2 className="text-white border-r-4 border-otro pr-3 cursor-pointer my-5 mx-3">
            ABOUT US
          </h2>
        </Link>
      </div>
      <div className="flex items-center">
        <h1 className="text-white text-4xl font-jomhuria mb-2">EventApp</h1>
      </div>
      <div className="flex gap-6 items-center my-2">
        <Link to="/cart">
          <h2 className="flex gap-3 align-middle justify-center items-center">
            <img src={cart} alt="tickets" />
          </h2>
        </Link>
        <div className="">
          <Link to="#">
            <h2 className="text-white cursor-pointer my-2 mx-3">Login</h2>
          </Link>
        </div>
        <div className="bg-button1 font-bold py-2 px-2 rounded mr-5">
          <h2 className="cursor-pointer text-base">Sign up</h2>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
