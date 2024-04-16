import { FaStar } from "react-icons/fa6";
import { FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export const Rating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<FaStar color="orange" key={i} />);
    } else if (i === fullStars && hasHalfStar) {
      stars.push(<FaStarHalfAlt color="orange" stroke="black" key={i} />);
    } else {
      stars.push(<FaRegStar color="gray" key={i} />);
    }
  }
  return <div className="flex gap-1">{stars}</div>;
};

export const SingleRating = ({ value }) => {
  const fullStars = Math.floor(value);
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<FaStar color="orange" key={i} />);
    } else {
      stars.push(<FaRegStar color="gray" key={i} />);
    }
  }
  return (
    <div className="flex items-center gap-2">
      <span className="flex gap-3">{stars}</span>
      <span>({value})</span>
    </div>
  );
};
