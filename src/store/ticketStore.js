import { create } from "zustand";
import { loadStripe } from "@stripe/stripe-js";
import { persist } from "zustand/middleware";
import api from "../api/events";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_ID);

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
        price,
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
                  price,
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

        try {
          const lineItems = cartTickets.map((ticket) => ({
            price: ticket.price, // Utilizar el price_cat correspondiente de cada elemento
            quantity: ticket.count,
          }));

          // Eliminar duplicados en lineItems basados en el price
          const uniqueLineItems = lineItems.reduce((acc, current) => {
            const x = acc.find((item) => item.price === current.price);
            if (!x) {
              return acc.concat([current]);
            } else {
              return acc;
            }
          }, []);

          // Redirigir al checkout de Stripe
          const { error } = await stripe.redirectToCheckout({
            lineItems,
            mode: "payment",
            cancelUrl: "https://events-app-eta-ruddy.vercel.app/#/cart",

            successUrl: "https://events-app-eta-ruddy.vercel.app/#/succes",
          });
          if (error) {
            console.error("Error al redirigir a la página de pago:", error);
          }
        } catch (error) {
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
//comment
