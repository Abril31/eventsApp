import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTicketStore = create(
  (set) => ({
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
  }),
  {
    name: "almacen-tickets",
  }
);
