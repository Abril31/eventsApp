import React from "react";
import { useNavigate } from "react-router-dom";
import goBack from "../../assets/icons/back.svg";

export const BackButton = () => {
  const navigate = useNavigate();
  const back = () => {
    navigate(-1);
  };
  return (
    <button
      className="bg-deco text-button1 text-3xl justify-center gap-3 font-bold py-2 px-10 rounded cursor-pointer mx-auto mt-16 hover:bg-gray-600"
      onClick={back}
    >
      <img src={goBack} />
    </button>
  );
};
