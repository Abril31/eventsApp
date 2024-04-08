import { create } from "zustand";
import { persist } from "zustand/middleware";
export const useTicketStore = create(
  persist(
    (set) => ({
      ticketCounts: [],
      count: 0,

      incrementTicketCount: (ticketType) =>
        set((state) => ({
          ticketCounts: {
            ...state.ticketCounts,
            [ticketType]: (state.ticketCounts[ticketType] || 0) + 1,
          },
        })),

      decrementTicketCount: (ticketType) =>
        set((state) => ({
          ticketCounts: {
            ...state.ticketCounts,
            [ticketType]: Math.max(
              (state.ticketCounts[ticketType] || 0) - 1,
              0
            ),
          },
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
  )
);
