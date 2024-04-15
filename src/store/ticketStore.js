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
        city,
        ticketType,
        location,
        quantityAvailable,
      }) =>
        set((state) => {
          // Verificar si el ticket ya está en el carrito
          const ticketIndex = state.cartTickets.findIndex(
            (ticket) => ticket.idEvent === idEvent
          );
          console.log("capturadeid",idEvent)
          
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

        checkout: async (totalAmount) => {
          const stripe = await stripePromise;
        
          try {
            // Realiza la petición al endpoint utilizando Axios
            console.log("Procesando pago...");
            const cartTickets = get().cartTickets;
            const eventNames = cartTickets.map((item) => item.eventName).join(", ");
            console.log("Datos en cartTickets:", cartTickets);
        
            // Aquí asumimos que todos los tickets en el carrito pertenecen al mismo evento
            // y tomamos el idEvent del primer ticket. Si este no es el caso, necesitarás
            // ajustar este código para manejar múltiples idEvents.
            const idEvent = cartTickets[0]?.idEvent;
            console.log("id", idEvent);
            
          const quantity = cartTickets.reduce((total, ticket) => total + ticket.count, 0);
            console.log("quantity", quantity);
            const userData = JSON.parse(localStorage.getItem('userData'));
            const id_user = userData?.id_user || userData?.user_id;
            console.log("id_user", id_user);
        
            const response = await axios.post(
              "http://localhost:3001/api/v1/payment/create-checkout-session",
              {
                eventName: eventNames,
                eventPrice: totalAmount,
                id_ticket: idEvent,
                quantity: quantity,
                id_user:id_user,
                
                
              }
            );

          const session = response.data;
          console.log("Sesión deee pago creada:", session);

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
