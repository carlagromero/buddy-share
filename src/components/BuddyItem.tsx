import React from "react";
import { Buddy, Ticket } from "../types";
import { useTickets } from "../context/TicketsContext";
import { getAvatarSrc } from "../utils/helpers";

interface BuddyItemProps {
  buddy: Buddy;
  availableTickets: Ticket[];
}

const BuddyItem: React.FC<BuddyItemProps> = ({ buddy, availableTickets }) => {
  const { assignments, assignTicket } = useTickets();

  // Find tickets already assigned to this buddy
  const assignedTickets = Object.entries(assignments)
    .filter(([, value]) => value.buddyId === buddy.id)
    .map(([ticketId]) => ticketId);

  const handleAssignTicket = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const ticketId = e.target.value;
    if (ticketId) {
      assignTicket(ticketId, buddy.id);
    }
  };

  return (
    <div className="flex items-center justify-between border-b border-gray-200 py-3">
      <div className="flex items-center">
        <img
          src={buddy.avatar || getAvatarSrc(buddy.name)}
          alt={buddy.name}
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <h4 className="font-medium">{buddy.name}</h4>
          <p className="text-sm text-gray-600">{buddy.relationship}</p>
        </div>
      </div>

      <div className="flex items-center">
        <select
          className="block w-48 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          onChange={handleAssignTicket}
          value={assignedTickets[0] || ""}
        >
          <option value="">Assign a ticket</option>
          {availableTickets.map((ticket) => (
            <option
              key={ticket.id}
              value={ticket.id}
              disabled={
                assignedTickets.includes(ticket.id) ||
                (Object.keys(assignments).includes(ticket.id) &&
                  assignments[ticket.id].buddyId !== buddy.id)
              }
            >
              Section {ticket.section}, Row {ticket.row}, Seat {ticket.seat}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default BuddyItem;
