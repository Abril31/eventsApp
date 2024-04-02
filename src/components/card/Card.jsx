import { formatDate, formatHour } from "../../helpers/formatters";
import locationIcon from "../../assets/icons/location.svg";
import tickets from "../../assets/icons/tickets.svg";
import comments from "../../assets/icons/comments.svg";
import eye from "../../assets/icons/closedEye.svg";
import { Link } from "react-router-dom";

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
}) => {
  //Formateando fechas
  const formattedStartDate = formatDate(startDate);
  //Formateando horas
  const formattedStartHour = formatHour(startHour);

  return (
    <div className=" w-full h-full flex items-center justify-center cursor-pointer hover:shadow-2xl hover:scale-105 transition duration-300">
      <Link to={`/evento/${id}`}>
        <div className="h-full w-full bg-gradient-to-r from-deco  to-button1 p-1 bg-white">
          <div className=" h-full w-full bg-white relative">
            <div className="relative">
              <h3 className="flex justify-end gap-1 align-middle text-xl text-left font-semibold w-1/2 bg-otro absolute bottom-0 right-0 z-10 rounded-tl-full">
                <img src={locationIcon} alt="Icono de ubicación" className="" />
                <span className="mt-1 mr-3 font-extrabold">{city}</span>
              </h3>
              <div>
                <img
                  src={image}
                  className="w-full h-80 object-cover relative z-0"
                />
              </div>
            </div>

            <div className="text-center text-xl font-semibold p-2">
              <p>
                {name} <span className="text-deco">/ {category}</span>
              </p>
              <div>
                <p>{location}</p>
                <p className="text-sm">
                  {formattedStartDate} - {formattedStartHour}
                </p>
                <hr className="mt-2" />
              </div>
              <div className="flex justify-between mx-4 my-1">
                <img src={eye} alt="Ojo cerrado" />
                <img src={comments} alt="Comentarios" />
                <img src={tickets} alt="Compra tickets" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
