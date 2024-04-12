import React from "react";
import { useNavigate } from "react-router-dom";
import goBack from "../../assets/icons/left.svg";

export const BackButton = () => {
  const navigate = useNavigate();
  const back = () => {
    navigate(-1);
  };
  return (
    <button
      className="bg-deco text-button1 text-2xl justify-center gap-3 font-bold px-2 rounded cursor-pointer mt-7 mx-auto hover:bg-gray-600"
      onClick={back}
    >
      <img src={goBack} />
    </button>
  );
};
