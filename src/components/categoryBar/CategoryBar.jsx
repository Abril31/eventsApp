import React from "react";
import { Link } from "react-router-dom";
import { AdvancedImage } from "@cloudinary/react";
import {
  artImg,
  enterImg,
  fairImg,
  foodImg,
  musicImg,
  sportImg,
  techImg,
} from "../../configs/cloudinary";

const CategoryBar = () => {
  return (
    <>
      <h1 className="mx-40 my-10 w-3/12 px-10 font-extrabold text-3xl">
        EXPLORE CATEGORIES
      </h1>
      <div className="flex justify-center gap-16 my-5">
        <Link to="/categories/music">
          <div className="flex flex-col items-center gap-3">
            <AdvancedImage cldImg={musicImg} />
            <h3 className="text-center">MUSIC</h3>
          </div>
        </Link>

        <Link to="/categories/sports">
          <div className="flex flex-col items-center gap-3">
            <AdvancedImage cldImg={sportImg} />
            <h3 className="text-center">SPORTS</h3>
          </div>
        </Link>

        <Link to="/categories/fair">
          <div className="flex flex-col items-center gap-3">
            <AdvancedImage cldImg={fairImg} />
            <h3 className="text-center">FAIRS</h3>
          </div>
        </Link>

        <Link to="categories/tech">
          <div className="flex flex-col items-center gap-3">
            <AdvancedImage cldImg={techImg} />
            <h3 className="text-center">TECHNOLOGY</h3>
          </div>
        </Link>

        <Link to="/categories/art">
          <div className="flex flex-col items-center gap-3">
            <AdvancedImage cldImg={artImg} />
            <h1 className="text-center"> CULTURAL & ARTS</h1>
          </div>
        </Link>

        <Link to="/categories/food">
          <div className="flex flex-col items-center  gap-3">
            <AdvancedImage cldImg={foodImg} />
            <h3 className="text-center">FOOD</h3>
          </div>
        </Link>
        <Link to="/categories/entertainment">
          <div className="flex flex-col items-center  gap-3">
            <AdvancedImage cldImg={enterImg} />
            <h3 className="text-center">ENTERTAINMENT</h3>
          </div>
        </Link>
      </div>
    </>
  );
};

export default CategoryBar;
