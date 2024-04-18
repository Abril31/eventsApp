import { useNavigate } from "react-router-dom";
import video from "../../assets/videos/video.mp4";
import entrar from "../../assets/icons/entrar.svg";
const LandingPage = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/home");
  };
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
      >
        <source src={video} type="video/mp4" />
      </video>
      <img
        src={entrar}
        className="absolute top-3/4 right-2/3  transform translate-x-1/2 -translate-y-1/2 px-8 py-3 cursor-pointer transition-transform hover:scale-150"
        onClick={handleButtonClick}
      />
    </div>
  );
};

export default LandingPage;
