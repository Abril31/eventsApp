import { Link } from "react-router-dom";
import "./Succes.css";
import pago from "../../assets/icons/pago.svg"

const Success = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="success-container">
      <img src={pago} className="mx-auto" />
      <h1 className="text-6xl font-bold text-green-500">
      payment successful
        </h1>
        <p className="text-2xl text-center mt-4">
        Thank you for your purchase. Enjoy the event.
        </p>
        <div className="mt-8">
          <Link to="/" className="btn btn-primary">
          Go to the home page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;