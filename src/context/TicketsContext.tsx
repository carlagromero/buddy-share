import React, { createContext, useContext, useState } from "react";
import { Event, Ticket, Buddy, Group } from "../types";
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
  assignments: Record<string, string>;
  message: string;
  setSelectedEventId: (id: string | null) => void;
  toggleTicketSelection: (ticketId: string) => void;
  assignTicket: (ticketId: string, buddyId: string) => void;
  autoAssignTickets: () => void;
  clearAssignments: () => void;
  setMessage: (message: string) => void;
  getTicketsForEvent: (eventId: string) => Ticket[];
  getBuddyById: (buddyId: string) => Buddy | undefined;
  completeShare: () => void;
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
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<string>("");

  const toggleTicketSelection = (ticketId: string) => {
    setSelectedTickets((prev) =>
      prev.includes(ticketId) ? prev : [...prev, ticketId]
    );
  };

  const assignTicket = (ticketId: string, buddyId: string) => {
    const assignedTicket = Object.entries(assignments).find(
      ([, buddy]) => buddy === buddyId
    )?.[0];

    const newAssignments = { ...assignments };

    if (assignedTicket) {
      delete newAssignments[assignedTicket];
    }

    newAssignments[ticketId] = buddyId;

    setAssignments(newAssignments);
  };

  const autoAssignTickets = () => {
    // Simple auto-assignment logic
    const buddiesIds = buddies.map((buddy) => buddy.id);

    const newAssignments = { ...assignments };
    selectedTickets.forEach((ticketId, index) => {
      if (index < buddiesIds.length) {
        newAssignments[ticketId] = buddiesIds[index];
      }
    });

    setAssignments(newAssignments);
  };

  const clearAssignments = () => {
    setAssignments({});
  };

  const getTicketsForEvent = (eventId: string) => {
    return tickets.filter((ticket) => ticket.eventId === eventId);
  };

  const getBuddyById = (buddyId: string) => {
    return buddies.find((buddy) => buddy.id === buddyId);
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
    setSelectedTickets([]);
    setAssignments({});
    setMessage("");
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
        setSelectedEventId,
        toggleTicketSelection,
        assignTicket,
        autoAssignTickets,
        clearAssignments,
        setMessage,
        getTicketsForEvent,
        getBuddyById,
        completeShare,
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
