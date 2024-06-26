import { Link } from "react-router-dom";
import facebook from "../../assets/icons/facebook.svg";
import insta from "../../assets/icons/insta.svg";
import tik from "../../assets/icons/tiktok.svg";

const Footer = () => {
  return (
    <footer className="bg-base text-white font-bold text-xl mt-10 flex flex-col">
      <div className="flex place-content-evenly text-xl mt-10 py-7">
        <div>
          <h2 className="mb-2">Top Categories</h2>
          <Link to="/categories/music">
            <p className="text-lg font-normal text-center">Music</p>
          </Link>
          <Link to="categories/food">
            <p className="text-lg font-normal text-center">Food</p>
          </Link>
          <Link to="/categories/art">
            <p className="text-lg font-normal text-center">Cultural and Arts</p>
          </Link>
          <Link to="/categories/entertainment">
            <p className="text-lg font-normal text-center">Entertainment</p>
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <h2>Follow Us</h2>
          <div className="flex ">
            <img src={facebook} />
            <img src={insta} />
            <img src={tik} />
          </div>
        </div>
        <div className="flex flex-col">
          <h2>Contact</h2>
          <p className="text-lg font-normal text-center">eventapp@gmail.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
