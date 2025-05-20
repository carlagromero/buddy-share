import React, { createContext, useContext, useState } from "react";
import { Event, Ticket, Buddy, Group, ModeView } from "../types";
import {
  mockEvents,
  mockTickets,
  mockBuddies,
  mockGroups,
} from "../data/mockData";

interface TicketsContextType {
  events: Event[];
  tickets: Ticket[];
  buddies: Buddy[];
  groups: Group[];
  selectedEventId: string | null;
  selectedTickets: string[];
  assignments: Record<string, { buddyId: string; isComboBox?: boolean }>;
  message: string;
  modeView: ModeView;
  setSelectedEventId: (id: string | null) => void;
  toggleTicketSelection: (ticketId: string) => void;
  assignTicket: (ticketId: string, buddyId: string) => void;
  setComboBoxForTicket: (ticketId: string, isComboBox: boolean) => void;
  clearAssignments: (ticketId?: string) => void;
  setMessage: (message: string) => void;
  getTicketsForEvent: (eventId: string) => Ticket[];
  getBuddyById: (buddyId: string) => Buddy | undefined;
  completeShare: () => void;
  setModeView: (modeView: ModeView) => void;
  resetState: () => void;
}

const TicketsContext = createContext<TicketsContextType | undefined>(undefined);

export const TicketsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [events] = useState<Event[]>(mockEvents);
  const [tickets] = useState<Ticket[]>(mockTickets);
  const [buddies] = useState<Buddy[]>(mockBuddies);
  const [groups] = useState<Group[]>(mockGroups);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
  const [assignments, setAssignments] = useState<
    Record<string, { buddyId: string; isComboBox?: boolean }>
  >({});
  const [message, setMessage] = useState<string>("");
  const [modeView, setModeView] = useState<ModeView>("groups");

  const toggleTicketSelection = (ticketId: string) => {
    setSelectedTickets((prev) =>
      prev.includes(ticketId) ? prev : [...prev, ticketId]
    );
  };

  const assignTicket = (ticketId: string, buddyId: string) => {
    const assignedTicket = Object.entries(assignments).find(
      ([, value]) => value.buddyId === buddyId
    )?.[0];

    const newAssignments = { ...assignments };

    if (assignedTicket) {
      delete newAssignments[assignedTicket];
    }

    newAssignments[ticketId] = {
      buddyId,
      isComboBox: assignments[ticketId]?.isComboBox ?? false,
    };

    setAssignments(newAssignments);
  };

  const setComboBoxForTicket = (ticketId: string, isComboBox: boolean) => {
    const assignedTicket = Object.entries(assignments).find(
      ([id]) => ticketId === id
    )?.[0];

    const newAssignments = { ...assignments };

    if (assignedTicket) {
      delete newAssignments[assignedTicket];
    }

    newAssignments[ticketId] = {
      buddyId: assignments[ticketId]?.buddyId ?? "",
      isComboBox,
    };

    setAssignments(newAssignments);
  };

  const clearAssignments = (ticketId?: string) => {
    if (ticketId) {
      const newAssignments = { ...assignments };
      delete newAssignments[ticketId];
      setAssignments(newAssignments);
      return;
    }

    setAssignments({});
  };

  const getTicketsForEvent = (eventId: string) => {
    return tickets.filter((ticket) => ticket.eventId === eventId);
  };

  const getBuddyById = (buddyId: string) => {
    return buddies.find((buddy) => buddy.id === buddyId);
  };

  const resetState = () => {
    setSelectedEventId(null);
    setSelectedTickets([]);
    setAssignments({});
    setMessage("");
  };

  const completeShare = () => {
    // In a real app, this would handle the API call to share tickets
    console.log("Sharing tickets:", {
      eventId: selectedEventId,
      tickets: selectedTickets,
      assignments,
      message,
    });

    // Reset state after sharing
    resetState();
  };

  return (
    <TicketsContext.Provider
      value={{
        events,
        tickets,
        buddies,
        groups,
        selectedEventId,
        selectedTickets,
        assignments,
        message,
        modeView,
        setSelectedEventId,
        toggleTicketSelection,
        assignTicket,
        setComboBoxForTicket,
        clearAssignments,
        setMessage,
        getTicketsForEvent,
        getBuddyById,
        completeShare,
        resetState,
        setModeView,
      }}
    >
      {children}
    </TicketsContext.Provider>
  );
};

export const useTickets = (): TicketsContextType => {
  const context = useContext(TicketsContext);
  if (context === undefined) {
    throw new Error("useTickets must be used within a TicketsProvider");
  }
  return context;
};
