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
  addBuddy: (buddy: Omit<Buddy, "id">) => void;
  removeBuddy: (buddyId: string) => void;
  createGroup: (newGroup: Omit<Group, "id">, groupName?: string) => void;
  addBuddyToGroup: (buddyId: string, groupId: string) => void;
  removeGroup: (group: Group) => void;
}

const TicketsContext = createContext<TicketsContextType | undefined>(undefined);

export const TicketsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [events] = useState<Event[]>(mockEvents);
  const [tickets] = useState<Ticket[]>(mockTickets);
  const [buddies, setBuddies] = useState<Buddy[]>(mockBuddies);
  const [groups, setGroups] = useState<Group[]>(mockGroups);
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

  const addBuddy = (buddy: Omit<Buddy, "id">) => {
    const newBuddy: Buddy = {
      id: Math.random().toString(),
      name: buddy.name,
      phone: buddy.phone,
      avatar: buddy.avatar,
      isActive: buddy.isActive,
    };

    setBuddies((prevBuddies) => [...prevBuddies, newBuddy]);
  };

  const createGroup = (group: Omit<Group, "id">, groupName?: string) => {
    const newGroup: Group = {
      id: Math.random().toString(),
      name: group.name,
      buddies: [],
    };

    setGroups((prevGroups) => {
      const existingGroupIndex = groups.findIndex(group => group.name === groupName)
      if(existingGroupIndex >= 0) {
        const newGroups = [...prevGroups]
        newGroups[existingGroupIndex] = {
          ...newGroups[existingGroupIndex],
          name: newGroup.name
        }
        return newGroups
      }

      return [...prevGroups, newGroup]
    });
  }

  const addBuddyToGroup = (buddyId: string, groupId: string) => {
    setGroups(prevGroups => {
      const groupIndex = prevGroups.findIndex(group => group.id === groupId)
      if (groupIndex !== -1) {
        const newGroups = [...prevGroups]
        newGroups[groupIndex].buddies.push(buddyId)
        return newGroups
      }
      return prevGroups
    })
  }

  const removeBuddy = (buddyId: string) => {
    const groupIndex = groups.findIndex(group => group.buddies.includes(buddyId))
    if (groupIndex !== -1) {
      const newGroups = [...groups]
      newGroups[groupIndex].buddies = newGroups[groupIndex].buddies.filter(id => id !== buddyId)
      setGroups(newGroups)
      return
    }
    setBuddies(prevBuddies => prevBuddies.filter(buddy => buddy.id !== buddyId))
  }

  const removeGroup = (group: Group) => {
    for(const buddyId of group.buddies) {
      removeBuddy(buddyId)
    }

    setGroups(prevGroups => prevGroups.filter(g => g.id !== group.id))
  }

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
        addBuddy,
        removeBuddy,
        createGroup,
        addBuddyToGroup,
        removeGroup
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
