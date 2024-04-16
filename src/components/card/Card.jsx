import { formatDate, formatHour } from "../../helpers/formatters";
import locationIcon from "../../assets/icons/location.svg";

import { Link, NavLink } from "react-router-dom";
import { Rating } from "../rating/Rating";

const Card = ({
  id,
  name,
  image,
  city,
  description,
  startDate,
  endDate,
  startHour,
  endHour,
  eventType,
  location,
  category,
  access,
  rating,
}) => {
  //Formateando fechas
  const formattedStartDate = formatDate(startDate);
  //Formateando horas
  const formattedStartHour = formatHour(startHour);

  return (
    <div className=" w-full h-full flex items-center justify-center hover:shadow-2xl hover:scale-105 transition duration-300">
      <div className="h-full w-full bg-gradient-to-r from-deco  to-button1 p-1 bg-white">
        <div className=" h-full w-full bg-white relative">
          <div className="relative">
            <h3 className="flex justify-end gap-1 align-middle text-xl text-left font-semibold w-1/2 bg-otro absolute bottom-0 right-0 z-10 rounded-tl-full">
              <img src={locationIcon} alt="Icono de ubicación" className="" />
              <span className="mt-1 mr-3 font-extrabold">{city}</span>
            </h3>
            <div>
              <Link to={`/evento/${id}`}>
                <img
                  src={image}
                  className="w-full h-80 object-cover relative z-0 cursor-pointer"
                />
              </Link>
            </div>
          </div>

          <div className="text-center text-xl font-semibold p-2">
            <p>
              {name} <span className="text-deco">/ {category}</span>
            </p>
            <div>
              <p>{location}</p>
              <p className="text-sm">
                {formattedStartDate} - {formattedStartHour} - {access}
              </p>
              <hr className="mt-2" />
            </div>
            <div className="flex justify-between mx-4 my-1">
              <div className="flex items-center gap-3">
                <Rating rating={rating} /> <p>({rating})</p>
              </div>
              <NavLink
                to={`/evento/${id}`}
                className="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-deco text-button1"
              >
                <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-deco top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                <span className="relative text-deco transition duration-300 group-hover:text-white ease">
                  + Info
                </span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
