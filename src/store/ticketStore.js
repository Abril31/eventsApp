import { create } from "zustand";

export const useTicketStore = create((set) => ({
  ticketCounts: {},

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
        [ticketType]: Math.max((state.ticketCounts[ticketType] || 0) - 1, 0),
      },
    })),
}));
