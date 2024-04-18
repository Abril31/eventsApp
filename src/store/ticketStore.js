import { create } from "zustand";
import { loadStripe } from "@stripe/stripe-js";
import api from "../api/events";
import { persist } from "zustand/middleware";

// Carga la instancia de Stripe con tu clave pública
const stripePromise = loadStripe(
  "pk_test_51P1uzsRtxcncuebvqofmHPj5v0MnrsAj3c5rUj4GtgrE0Pj3LcCmd1Mxdx0wf1kj5AuTd7WR6fIEiIPFOquAvl5i0060tOGXTS"
); // Reemplaza "pk_test_tu_clave_publica" con tu clave pública de Stripe

export const useTicketStore = create(
  persist(
    (set, get) => ({
      cartTickets: [],
      count: 0,

      addToCartTickets: ({
        image,
        eventName,
        ticketPrice,
        idEvent,
        id_user,
        total,
        count,
        id_ticket,
        city,
        ticketType,
        location,
        quantityAvailable,
        price_cat,
      }) =>
        set((state) => {
          // Verificar si el ticket ya está en el carrito
          console.log("Valor de quantityAvailable:", quantityAvailable);

          const ticketIndex = state.cartTickets.findIndex(
            (ticket) => ticket.idEvent === idEvent
          );
          console.log("capturadeid", idEvent);

          // Actualizas solo las propiedades
          if (ticketIndex !== -1) {
            const updatedCartTickets = [...state.cartTickets];
            updatedCartTickets[ticketIndex] = {
              ...updatedCartTickets[ticketIndex],
              count: updatedCartTickets[ticketIndex].count + count,
              total:
                (updatedCartTickets[ticketIndex].count + count) * ticketPrice,
            };
            // Verificar si la cantidad disponible es suficiente
            if (quantityAvailable >= count) {
              updatedTicket.quantityAvailable -= count;
              updatedCartTickets[ticketIndex] = updatedTicket;
            } else {
              console.error(
                "La cantidad solicitada excede la cantidad disponible."
              );
              return state; // No actualiza el estado si no hay suficientes tickets disponibles
            }
            return {
              cartTickets: updatedCartTickets,
              count: state.count + count,
            };
          }
          if (quantityAvailable >= count) {
            return {
              cartTickets: [
                ...state.cartTickets,
                {
                  image,
                  eventName,
                  ticketPrice,
                  idEvent,
                  id_user,
                  total,
                  count,
                  id_ticket,
                  city,
                  ticketType,
                  location,
                  price_cat,
                  quantityAvailable: quantityAvailable - count,
                },
              ],
              count: state.count + count,
            };
          } else {
            console.error(
              "La cantidad solicitada excede la cantidad disponible."
            );
            return state;
          }
        }),
      removeFromCartTickets: (idEvent) =>
        set((state) => ({
          cartTickets: state.cartTickets.filter(
            (item) => item.idEvent !== idEvent
          ),
        })),

      incrementCount: (idEvent) =>
        set((state) => ({
          cartTickets: state.cartTickets.map((ticket) =>
            ticket.idEvent === idEvent
              ? {
                  ...ticket,
                  count: ticket.count + 1,
                  total: (ticket.count + 1) * ticket.ticketPrice,
                }
              : ticket
          ),
          count: state.count + 1,
        })),
      decrementCount: (idEvent) =>
        set((state) => ({
          cartTickets: state.cartTickets.map((ticket) =>
            ticket.idEvent === idEvent
              ? {
                  ...ticket,
                  count: Math.max(ticket.count - 1, 0),
                  total: Math.max(ticket.count - 1, 0) * ticket.ticketPrice,
                }
              : ticket
          ),
          count: Math.max(state.count - 1, 0),
        })),

      Payment: async () => {
        const stripe = await stripePromise;
        const { cartTickets } = get();
        console.log("aca pa", cartTickets);
        try {
          console.log("esto hay en prueba", PRUEBA);
          // Crear los items para el checkout
          const lineItems = cartTickets.map((ticket) => ({
            price: "price_1P6acSRtxcncuebvGcSkVrhg",
            // Obtener el precio del evento correspondiente , // Reemplaza 'priceId' con la clave del precio en Stripe
            quantity: ticket.count,
          }));

          // Redirigir al checkout de Stripe
          const { error } = await stripe.redirectToCheckout({
            lineItems,
            mode: "payment",
            successUrl: "http://localhost:5173/#/succes",
            cancelUrl: "http://localhost:5173/#/cart",
          });
          if (error) {
            console.error("Error al redirigir a la página de pago:", error);
          }
        } catch (error) {
          console.error("Error al procesar el pago:", error);
        }
      },
      checkout: async () => {
        const cartTickets = get().cartTickets;

        try {
          for (const ticket of cartTickets) {
            const response = await axios.post(
              "http://localhost:3001/api/v1/payment/success",
              {
                id_ticket: ticket.id_ticket,
                quantity: ticket.count,
                id_user: ticket.id_user,
                // Otros datos necesarios para la llamada
              }
            );
            console.log(
              "Respuesta de la API para ticket",
              ticket.idEvent,
              ":",
              response.data
            );
          }
          console.log("Proceso de tickets completado.");
        } catch (error) {
          console.error("Error al procesar los tickets:", error);
        }
      },

      clearTickets: () =>
        set((state) => ({
          cartTickets: [],
          count: 0,
        })),
    }),

    {
      name: "almacen-tickets",
    }
  )
);
