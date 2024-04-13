import { create } from "zustand";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
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
      }) =>
        set((state) => {
          // Verificar si el ticket ya está en el carrito
          const ticketIndex = state.cartTickets.findIndex(
            (ticket) => ticket.idEvent === idEvent
          );

          // Actualizas solo las propiedades
          if (ticketIndex !== -1) {
            const updatedCartTickets = [...state.cartTickets];
            updatedCartTickets[ticketIndex] = {
              ...updatedCartTickets[ticketIndex],
              count: updatedCartTickets[ticketIndex].count + count,
            };
            return {
              cartTickets: updatedCartTickets,
              count: state.count + count,
            };
          }

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
              },
            ],
            count: state.count + count,
          };
        }),
      removeFromCartTickets: (idEvent) =>
        set((state) => ({
          cartTickets: state.cartTickets.filter(
            (item) => item.idEvent !== idEvent
          ),
        })),

      incrementCount: () =>
        set((state) => ({
          count: state.count + 1,
        })),

      decrementCount: () =>
        set((state) => ({
          count: Math.max(state.count - 1, 0),
        })),

      checkout: async (totalAmount) => {
        const stripe = await stripePromise;

        try {
          // Realiza la petición al endpoint utilizando Axios
          console.log("Procesando pago...");
          const eventNames = get()
            .cartTickets.map((item) => item.eventName)
            .join(", "); // Convierte la lista de nombres de eventos en una cadena separada por comas
          const response = await axios.post(
            "http://localhost:3001/api/v1/payment/create-checkout-session",
            {
              eventName: eventNames, // Pasa la cadena de nombres de eventos separada por comas
              eventPrice: totalAmount,
            }
          );

          const session = response.data;
          console.log("Sesión de pago creada:", session);

          // Cuando se haya creado la sesión de pago, redirige al usuario a la página de pago de Stripe
          const result = await stripe.redirectToCheckout({
            sessionId: session.id,
          });

          if (result.error) {
            // Muestra un mensaje de error al usuario si algo sale mal
            console.error("Error al procesar el pago:", result.error.message);
          }
        } catch (error) {
          // Maneja cualquier error que pueda ocurrir durante la petición
          console.error("Error al procesar el pago:", error);
        }
      },
    }),
    {
      name: "almacen-tickets",
    }
  )
);
