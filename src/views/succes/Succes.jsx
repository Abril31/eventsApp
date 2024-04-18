import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Succes.css";
import pago from "../../assets/icons/pago.svg";
import axios from "axios";
import { useTicketStore } from "../../store/ticketStore";

const Success = () => {
  const cartTickets = useTicketStore((state) => state.cartTickets);
  const clearTickets = useTicketStore((state) => state.clearTickets);

  useEffect(() => {
    const fetchData = async () => {
      try {
        for (const ticket of cartTickets) {
          const response = await axios.post(
            "http://localhost:3001/api/v1/payment/create-checkout-session",
            {
              id_ticket: ticket.id_ticket,
              quantity: ticket.count,
              id_user: ticket.id_user
              // Otros datos necesarios para la llamada
            }
          );
          console.log(
            "Respuesta de la API para el ticket",
            ticket.idEvent,
            ":",
            response.data
          );
        }
        console.log("Proceso de tickets completado.");
      } catch (error) {
        console.error("Error al procesar los tickets:", error);
      }
      await clearTickets();
    };
    
    fetchData();
  }, []); // El array de dependencias vacío asegura que el efecto se ejecute solo una vez
  
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="success-container">
        <img src={pago} className="mx-auto" />
        <h1 className="text-6xl font-bold text-green-500">
          payment successful
        </h1>
        <p className="text-2xl text-center mt-4 text-gray-700">
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
